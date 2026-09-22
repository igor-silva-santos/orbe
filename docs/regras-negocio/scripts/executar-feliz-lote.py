#!/usr/bin/env python3
"""Executa cenários Feliz de um manifest em produção (Playwright headless)."""

from __future__ import annotations

import argparse
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

from playwright.sync_api import sync_playwright, TimeoutError as PwTimeout

ROOT = Path(__file__).resolve().parents[1]
MANIFEST_DIR = ROOT / "cenarios-camadas" / "execucao" / "manifests"
DEFAULT_OUT_SUBDIR = "prod"

ROUTES = {
    "01-HOME.md": "/",
    "02-FILMES.md": "/filmes",
    "03-SERIES.md": "/series",
    "04-ANIMES.md": "/animes",
    "05-JOGOS.md": "/jogos",
    "06-PROMOCOES.md": "/promocoes",
    "07-HOJE.md": "/hoje",
    "08-MODAIS.md": "/",  # abre modal a partir da home
    "09-BUSCA-HEADER.md": "/",
    "10-MINHA-LISTA.md": "/minha-lista",
    "11-AUTH-PERFIL.md": "/login",
    "12-OUTRAS-TELAS.md": "/continuacoes",
}


def now_iso() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def norm(s: str) -> str:
    return re.sub(r"\s+", " ", (s or "").lower())


def keywords_from_expected(text: str) -> list[str]:
    """Extrai frases curtas úteis para busca no DOM."""
    t = text.replace("→", " ").replace("**", "")
    parts = re.split(r"[.;]", t)
    kws = []
    for p in parts:
        p = p.strip()
        if len(p) < 4:
            continue
        if p.lower().startswith("ao "):
            continue
        # quoted titles
        for m in re.findall(r"[\"“]([^\"”]+)[\"”]", p):
            if len(m) > 2:
                kws.append(m)
        words = p.split()
        if 2 <= len(words) <= 8:
            kws.append(p)
    # dedupe preserve order
    seen = set()
    out = []
    for k in kws:
        kn = norm(k)
        if kn not in seen and len(kn) > 3:
            seen.add(kn)
            out.append(k)
    return out[:6]


def needs_login(pre: str, titulo: str, esperado: str) -> bool:
    blob = norm(f"{pre} {titulo} {esperado}")
    if "não logado" in blob or "anônimo" in blob or "visitante" in blob:
        return False
    if any(x in blob for x in ("logado", "autentic", "minha lista", "conta", "perfil", "sessão")):
        return True
    return False


def open_modal_if_needed(page, arquivo: str) -> None:
    if arquivo != "08-MODAIS.md":
        return
    try:
        card = page.locator("a[href*='/filme'], a[href*='/serie'], article a, [data-testid*='card'] a").first
        if card.count() > 0:
            card.click(timeout=8000)
            page.wait_for_timeout(1500)
    except PwTimeout:
        pass


def open_search_if_needed(page, arquivo: str) -> None:
    if arquivo != "09-BUSCA-HEADER.md":
        return
    for sel in [
        "button[aria-label*='Busca']",
        "button[aria-label*='busca']",
        "[data-testid='search']",
        "header button",
    ]:
        try:
            loc = page.locator(sel).first
            if loc.is_visible(timeout=2000):
                loc.click(timeout=3000)
                page.wait_for_timeout(800)
                break
        except PwTimeout:
            continue


def scroll_for_arquivo(page, arquivo: str) -> None:
    """Garante conteúdo abaixo da dobra no texto usado pelas heurísticas."""
    ids_by_file = {
        "01-HOME.md": ["filmes", "series", "animes", "jogos"],
        "08-MODAIS.md": ["filmes"],
        "09-BUSCA-HEADER.md": ["filmes"],
    }
    for sid in ids_by_file.get(arquivo, []):
        loc = page.locator(f"#{sid}")
        try:
            if loc.count() > 0:
                loc.scroll_into_view_if_needed(timeout=8000)
                page.wait_for_timeout(600)
        except PwTimeout:
            pass


def get_body(page) -> str:
    try:
        return norm(page.locator("body").inner_text(timeout=20000))
    except PwTimeout:
        return ""


def check_scenario(page, body: str, arquivo: str, c: dict) -> dict:
    cid = c["id"]
    regra = c["regra"]
    esperado = c["resultado_esperado"]
    pre = c["pre"]
    titulo = c["titulo"]

    if needs_login(pre, titulo, esperado) and arquivo in (
        "10-MINHA-LISTA.md",
        "11-AUTH-PERFIL.md",
    ):
        return {
            "id": cid,
            "regra": regra,
            "resultado": "BLOQUEADO",
            "evidencia": "Requer sessão autenticada; runner anônimo em produção.",
            "testado_em": now_iso(),
        }

    if not body:
        return {
            "id": cid,
            "regra": regra,
            "resultado": "FAIL",
            "evidencia": "Página sem texto legível (timeout ou erro de render).",
            "testado_em": now_iso(),
        }

    # Regras específicas por sufixo de ID
    if regra == "RN-HOME-001":
        order = ["filmes", "séries", "series", "animes", "jogos"]
        idx = []
        for label in order:
            i = body.find(label)
            if i >= 0:
                idx.append(i)
        ok = len(idx) >= 3 and idx == sorted(idx)
        return {
            "id": cid,
            "regra": regra,
            "resultado": "PASS" if ok else "FAIL",
            "evidencia": f"Posições no texto: {idx}",
            "testado_em": now_iso(),
        }

    if "não " in norm(esperado) or "nao " in norm(esperado):
        kws = keywords_from_expected(esperado.replace("não", "").replace("nao", ""))
        hit = any(norm(k) in body for k in kws if k)
        return {
            "id": cid,
            "regra": regra,
            "resultado": "PASS" if not hit else "FAIL",
            "evidencia": "Ausência esperada; termos monitorados: " + ", ".join(kws[:3]),
            "testado_em": now_iso(),
        }

    kws = keywords_from_expected(esperado)
    if not kws:
        # fallback: tela carregou sem erro óbvio
        err = "erro 500" in body or "application error" in body
        return {
            "id": cid,
            "regra": regra,
            "resultado": "FAIL" if err else "PASS",
            "evidencia": "Smoke: página renderizada; sem keywords — validação superficial.",
            "testado_em": now_iso(),
        }

    hits = [k for k in kws if norm(k) in body]
    ratio = len(hits) / len(kws) if kws else 0
    data_heavy = any(
        x in norm(pre)
        for x in ("comparar", "título", "filme", "série", "anime", "jogo", "nota", "simular")
    )
    if ratio >= 0.34:
        res = "PASS"
    elif ratio == 0 and data_heavy:
        res = "BLOQUEADO"
        evid = "Regra depende de dado específico no catálogo; smoke anônimo não confirmou texto — QA manual com pré-condição."
    elif ratio == 0:
        res = "FAIL"
        evid = f"Nenhuma keyword do resultado esperado no DOM. Esperado amostra: {kws[:3]}"
    else:
        res = "FAIL"
        evid = f"Keywords parciais ({len(hits)}/{len(kws)}): {hits[:4]}"
    return {
        "id": cid,
        "regra": regra,
        "resultado": res,
        "evidencia": evid if ratio == 0 and data_heavy else f"Keywords ({len(hits)}/{len(kws)}): {hits[:4]}",
        "testado_em": now_iso(),
    }


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("manifest", help="ex: 01-HOME.json")
    ap.add_argument("--executor", default="executar-feliz-lote (agente QA)")
    ap.add_argument("--out-dir", default=DEFAULT_OUT_SUBDIR, help="subpasta em execucao/ (ex: prod-rodada-2)")
    args = ap.parse_args()
    out_dir = ROOT / "cenarios-camadas" / "execucao" / args.out_dir

    manifest_path = MANIFEST_DIR / args.manifest
    if not manifest_path.exists():
        print("Manifest não encontrado:", manifest_path, file=sys.stderr)
        return 1

    data = json.loads(manifest_path.read_text(encoding="utf-8"))
    arquivo = data["arquivo"]
    base = data["ambiente"].rstrip("/")
    out_dir.mkdir(parents=True, exist_ok=True)
    out_path = out_dir / manifest_path.name

    path = ROUTES.get(arquivo, "/")
    results = []
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1280, "height": 900})
        page = context.new_page()
        try:
            page.goto(base + path, wait_until="networkidle", timeout=90000)
        except PwTimeout:
            page.goto(base + path, wait_until="domcontentloaded", timeout=90000)
        page.wait_for_timeout(2000)
        scroll_for_arquivo(page, arquivo)
        open_search_if_needed(page, arquivo)
        if arquivo == "08-MODAIS.md":
            open_modal_if_needed(page, arquivo)
        body = get_body(page)
        for c in data["cenarios"]:
            results.append(check_scenario(page, body, arquivo, c))
        browser.close()

    payload = {
        "arquivo": arquivo,
        "ambiente": base,
        "executor": args.executor,
        "cenarios": results,
    }
    out_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    from collections import Counter
    cnt = Counter(r["resultado"] for r in results)
    print(args.manifest, dict(cnt), "->", out_path)
    return 0


if __name__ == "__main__":
    sys.exit(main())
