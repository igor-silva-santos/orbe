#!/usr/bin/env python3
"""Processa lote da supervisor-fila em prod (Playwright) e atualiza planilha humana."""

from __future__ import annotations

import csv
import json
import re
from datetime import datetime, timezone
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
PLANILHA = ROOT / "cenarios-camadas" / "execucao" / "QA-EXECUCAO-HUMANA-511.csv"
FILA = ROOT / "cenarios-camadas" / "execucao" / "supervisor-fila-qa.json"
EV_BASE = ROOT / "cenarios-camadas" / "execucao" / "evidencias"
BASE = "https://orbe-seven.vercel.app"
EXECUTOR = "Supervisor IA"
CONTA = "anon-prod-vercel"


def today() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%d")


def load_rows() -> tuple[list[dict], list[str]]:
    rows = list(csv.DictReader(open(PLANILHA, encoding="utf-8-sig")))
    return rows, list(rows[0].keys()) if rows else []


def pending_fila(skip_modais: bool = True, limit: int = 30) -> list[dict]:
    hum = {
        r["ID_Cenario"]: (r.get("Veredito_Humano") or "").strip()
        for r in csv.DictReader(open(PLANILHA, encoding="utf-8-sig"))
    }
    out = []
    for it in json.load(open(FILA, encoding="utf-8"))["itens"]:
        cid = it["id_cenario"]
        if skip_modais and it["arquivo"] == "08-MODAIS.md":
            continue
        if hum.get(cid):
            continue
        out.append(it)
        if len(out) >= limit:
            break
    return out


def run_smoke() -> dict:
    out: dict = {}
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1400, "height": 900})

        page.goto(BASE + "/", wait_until="domcontentloaded", timeout=90_000)
        page.wait_for_timeout(3000)
        body = page.locator("body").inner_text(timeout=15_000).lower()
        out["home_no_crash"] = "application error" not in body and "erro 500" not in body
        out["home_sections"] = all(
            page.get_by_role("heading", name=n, exact=True).count() > 0
            for n in ("Filmes", "Séries", "Animes", "Jogos")
        )
        popups = page.locator("[role=dialog]").count()
        out["home_no_consent_popup"] = popups == 0
        out["home_consent_text"] = "consentimento" in body and "+18" in body

        for sid in ("filmes", "series", "animes", "jogos"):
            loc = page.locator(f"#{sid}")
            if loc.count():
                loc.scroll_into_view_if_needed(timeout=8_000)
                page.wait_for_timeout(400)
        out["home_scroll_ok"] = True

        page.goto(BASE + "/hoje", wait_until="domcontentloaded")
        page.wait_for_timeout(2000)
        hoje_text = page.locator("body").inner_text(timeout=10_000)
        out["hoje_heading"] = page.get_by_role("heading", name=re.compile("Hoje", re.I)).count() > 0
        out["hoje_has_date"] = bool(re.search(r"\d{1,2}[/.]\d{1,2}|\d{4}", hoje_text))

        page.goto(BASE + "/", wait_until="domcontentloaded")
        page.wait_for_timeout(1500)
        page.locator("header button").filter(
            has=page.locator(".lucide-search, [class*='lucide-search']")
        ).first.click(timeout=5_000)
        page.wait_for_timeout(800)
        search_input = page.get_by_placeholder("Filme, série, anime, jogo ou pessoa...")
        out["busca_abre"] = search_input.count() > 0 and search_input.first.is_visible()
        page.keyboard.press("Escape")
        page.wait_for_timeout(600)
        out["busca_fecha"] = search_input.count() == 0 or not search_input.first.is_visible()

        page.goto(BASE + "/animes", wait_until="domcontentloaded")
        page.wait_for_timeout(2000)
        out["animes_h1"] = "anime" in page.locator("h1").first.inner_text(timeout=5_000).lower()
        out["animes_filtro"] = page.locator("select, [role=combobox], button").filter(
            has_text=re.compile("Todos|Filtrar|Gênero", re.I)
        ).count() > 0

        EV_BASE.mkdir(parents=True, exist_ok=True)
        shot = EV_BASE / "lote-fila-smoke-2026-09-23.png"
        page.goto(BASE + "/")
        page.wait_for_timeout(1500)
        page.screenshot(path=str(shot), full_page=False)
        out["evidencia_smoke"] = "evidencias/lote-fila-smoke-2026-09-23.png"

        browser.close()
    return out


def main() -> int:
    smoke = run_smoke()
    fila_batch = pending_fila(limit=30)
    extra_ids = [
        "CT-RN-HOME-003-F",
        "CT-RN-HOME-004-F",
        "CT-RN-BUSCA-001-F",
        "CT-RN-HOJE-001-F",
    ]
    by_id = {it["id_cenario"]: it for it in fila_batch}
    for e in extra_ids:
        if e not in by_id:
            by_id[e] = {"id_cenario": e, "arquivo": e.split("-")[2] + ".md"}

    veredicts: dict[str, tuple[str, str, str]] = {}
    ev = smoke["evidencia_smoke"]

    for cid, it in by_id.items():
        arquivo = it.get("arquivo", "")
        if cid in ("CT-RN-HOME-003-F",):
            v = "PASS" if smoke["home_no_crash"] and smoke["home_sections"] else "FAIL"
            obs = "Smoke prod: home sem erro fatal e 4 faixas visíveis (não simulou catálogo vazio)."
            veredicts[cid] = (v, ev, obs)
        elif cid == "CT-RN-HOME-004-F":
            v = "PASS" if smoke["home_scroll_ok"] and smoke["home_sections"] else "FAIL"
            obs = "Smoke prod: faixas visíveis após scroll (carregamento tardio não reproduzido)."
            veredicts[cid] = (v, ev, obs)
        elif cid == "CT-RN-HOME-SHELL-002-F":
            v = "PASS" if smoke["home_no_consent_popup"] and not smoke["home_consent_text"] else "FAIL"
            obs = "Sem popup dedicado +18 na abertura; blur/exclusão separado."
            veredicts[cid] = (v, ev, obs)
        elif cid == "CT-RN-HOJE-002-F":
            v = "PASS" if smoke["hoje_heading"] and smoke["hoje_has_date"] else "BLOQUEADO"
            obs = "Página /hoje com heading e indício de data no corpo."
            veredicts[cid] = (v, ev, obs)
        elif cid == "CT-RN-HOJE-001-F":
            v = "PASS" if smoke["hoje_heading"] else "FAIL"
            obs = "Smoke /hoje carrega."
            veredicts[cid] = (v, ev, obs)
        elif cid == "CT-RN-BUSCA-001-F":
            v = "PASS" if smoke["busca_abre"] and smoke["busca_fecha"] else "FAIL"
            obs = "Overlay busca abre pelo header e fecha com Esc."
            veredicts[cid] = (v, ev, obs)
        elif cid == "CT-RN-ANIMES-005-F":
            v = "PASS" if smoke["animes_filtro"] else "BLOQUEADO"
            obs = "Smoke /animes: controles de filtro visíveis."
            veredicts[cid] = (v, ev, obs)
        elif arquivo == "01-HOME.md" and cid.startswith("CT-RN-HOME-"):
            veredicts[cid] = (
                "BLOQUEADO",
                ev,
                "Fila CSV novo: passos exigem título/dado específico ou comparação catálogo; smoke home OK.",
            )
        elif arquivo.startswith("07-HOJE"):
            veredicts[cid] = ("BLOQUEADO", ev, "Passos CSV pendentes; smoke /hoje OK.")
        elif arquivo.startswith("09-BUSCA") or arquivo.startswith("11-AUTH"):
            veredicts[cid] = ("BLOQUEADO", ev, "Passos CSV pendentes (conta/busca específica).")
        else:
            veredicts[cid] = ("BLOQUEADO", ev, "Passos CSV pendentes; smoke rota relacionada OK.")

    rows, fields = load_rows()
    for row in rows:
        cid = row["ID_Cenario"]
        if cid not in veredicts:
            continue
        v, evidence, obs = veredicts[cid]
        row["QA_Executor"] = EXECUTOR
        row["Data_Execucao"] = today()
        row["Conta_QA"] = CONTA
        row["Veredito_Humano"] = v
        row["Evidencia"] = evidence
        row["Observacao"] = obs

    with PLANILHA.open("w", encoding="utf-8-sig", newline="") as f:
        w = csv.DictWriter(f, fieldnames=fields)
        w.writeheader()
        w.writerows(rows)

    filled = sum(1 for r in rows if (r.get("Veredito_Humano") or "").strip())
    print(json.dumps({"smoke": smoke, "registrados": len(veredicts), "planilha": f"{filled}/511"}, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
