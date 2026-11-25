#!/usr/bin/env python3
"""
Executa os 511 Feliz com passos ampliados (métricas reais).
Saída: execucao/metricas-reais-511.csv + JSON por tela + dashboard HTML.
QA_EMAIL/QA_PASSWORD opcionais; com QA_AUTO_REGISTER=1 cria conta descartável e exclui no fim.
"""

from __future__ import annotations

import csv
import json
import os
import re
import secrets
import subprocess
import sys
import time
import urllib.error
import urllib.request
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path

from playwright.sync_api import sync_playwright, TimeoutError as PwTimeout

ROOT = Path(__file__).resolve().parents[1]
MANIFEST_DIR = ROOT / "cenarios-camadas" / "execucao" / "manifests"
OUT_DIR = Path(os.environ.get("METRICAS_511_OUT_DIR", "")).resolve() if os.environ.get("METRICAS_511_OUT_DIR") else (
    ROOT / "cenarios-camadas" / "execucao" / "metricas-reais-511"
)
BASE = "https://orbe-seven.vercel.app"

ROUTES = {
    "01-HOME.md": "/",
    "02-FILMES.md": "/filmes",
    "03-SERIES.md": "/series",
    "04-ANIMES.md": "/animes",
    "05-JOGOS.md": "/jogos",
    "06-PROMOCOES.md": "/promocoes",
    "07-HOJE.md": "/hoje",
    "08-MODAIS.md": "/",
    "09-BUSCA-HEADER.md": "/",
    "10-MINHA-LISTA.md": "/minha-lista",
    "11-AUTH-PERFIL.md": "/login",
    "12-OUTRAS-TELAS.md": "/continuacoes",
}


def now_iso() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def norm(s: str) -> str:
    return re.sub(r"\s+", " ", (s or "").lower())


def needs_login(pre: str, titulo: str, esperado: str, arquivo: str) -> bool:
    if arquivo in ("10-MINHA-LISTA.md", "11-AUTH-PERFIL.md"):
        blob = norm(f"{pre} {titulo} {esperado}")
        if "não logado" in blob or "visitante" in blob:
            return False
        return True
    blob = norm(f"{pre} {titulo} {esperado}")
    if "não logado" in blob or "anônimo" in blob or "visitante" in blob:
        return False
    return any(x in blob for x in ("logado", "autentic", "minha lista", "sessão"))


def goto(page, path: str) -> None:
    try:
        page.goto(BASE + path, wait_until="networkidle", timeout=90000)
    except PwTimeout:
        page.goto(BASE + path, wait_until="domcontentloaded", timeout=90000)
    page.wait_for_timeout(800)


def scroll_sections(page) -> None:
    for sid in ("filmes", "series", "animes", "jogos"):
        loc = page.locator(f"#{sid}")
        try:
            if loc.count():
                loc.scroll_into_view_if_needed(timeout=5000)
                page.wait_for_timeout(400)
        except PwTimeout:
            pass


def api_register(email: str, password: str, nome: str) -> str | None:
    url = f"{BASE}/api/auth/register"
    body = json.dumps({"nome": nome, "email": email, "password": password}).encode("utf-8")
    req = urllib.request.Request(
        url, data=body, headers={"Content-Type": "application/json"}, method="POST"
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            return data.get("token")
    except urllib.error.HTTPError as e:
        print(f"register HTTP {e.code}: {e.read().decode()[:200]}", file=sys.stderr)
        return None


def api_delete_account(email: str, password: str, token: str) -> bool:
    url = f"{BASE}/api/users/me"
    body = json.dumps({"password": password}).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=body,
        headers={"Content-Type": "application/json", "Authorization": f"Bearer {token}"},
        method="DELETE",
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            return resp.status == 204
    except urllib.error.HTTPError as e:
        print(f"delete account HTTP {e.code}", file=sys.stderr)
        return False


def provision_qa_credentials() -> tuple[str, str, str | None, bool]:
    email = os.environ.get("QA_EMAIL", "").strip()
    password = os.environ.get("QA_PASSWORD", "").strip()
    if email and password:
        return email, password, None, False
    if os.environ.get("QA_AUTO_REGISTER") != "1":
        return "", "", None, False
    email = f"qa.orbe+{int(time.time())}.{secrets.token_hex(4)}@discard.test"
    password = os.environ.get("QA_DEFAULT_PASSWORD", "QaOrbeTest8!")
    nome = os.environ.get("QA_NOME", "QA Orbe Automático")
    token = api_register(email, password, nome)
    os.environ["QA_EMAIL"] = email
    os.environ["QA_PASSWORD"] = password
    if token:
        os.environ["QA_TOKEN"] = token
    return email, password, token, True


def super_modal_visible(page) -> bool:
    return page.locator(".super-modal-content").count() > 0


def open_modal_from_home_carousel(page, section: str) -> bool:
    """Clica card (MidiaCard), não o link de navegação da seção."""
    goto(page, "/")
    scroll_sections(page)
    card = page.locator(f"{section} div.cursor-pointer").filter(has=page.locator("img")).first
    try:
        card.click(timeout=10_000)
        page.wait_for_timeout(2000)
        return super_modal_visible(page)
    except PwTimeout:
        return False


def open_modal_from_filmes_page(page) -> bool:
    goto(page, "/filmes")
    card = page.locator("div.cursor-pointer").filter(has=page.locator("img")).first
    try:
        card.click(timeout=10_000)
        page.wait_for_timeout(2000)
        return super_modal_visible(page)
    except PwTimeout:
        return False


def modal_section_for_rule(rid: str, titulo: str, pre: str) -> str:
    blob = norm(f"{rid} {titulo} {pre}")
    if "jogo" in blob:
        return "#jogos"
    if "anime" in blob:
        return "#animes"
    if "série" in blob or "serie" in blob or "séries" in blob:
        return "#series"
    return "#filmes"


def try_login(page, token: str | None = None) -> bool:
    email = os.environ.get("QA_EMAIL", "").strip()
    password = os.environ.get("QA_PASSWORD", "").strip()
    if token:
        goto(page, "/")
        page.evaluate("(t) => localStorage.setItem('token', t)", token)
        page.reload(wait_until="domcontentloaded")
        page.wait_for_timeout(1500)
        if "/login" not in page.url:
            return True
    if not email or not password:
        return False
    goto(page, "/login")
    try:
        page.get_by_label(re.compile("e-mail|email", re.I)).fill(email, timeout=5000)
        page.get_by_label(re.compile("senha|password", re.I)).fill(password, timeout=5000)
        page.get_by_role("button", name=re.compile("entrar|login", re.I)).click(timeout=5000)
        page.wait_for_timeout(2500)
        return "/login" not in page.url
    except PwTimeout:
        return False


def run_rule(page, arquivo: str, c: dict, logged_in: bool) -> dict:
    rid = c["regra"]
    cid = c["id"]
    pre, titulo, esp = c["pre"], c["titulo"], c["resultado_esperado"]
    passos_n = 0
    evidencia = ""

    if needs_login(pre, titulo, esp, arquivo) and not logged_in:
        return result(
            cid,
            rid,
            arquivo,
            "PENDENTE_QA_HUMANO",
            "Conta QA necessária — definir QA_EMAIL/QA_PASSWORD ou QA executa manual.",
            0,
            "login",
        )

    path = ROUTES.get(arquivo, "/")
    goto(page, path)
    passos_n += 1

    if arquivo == "01-HOME.md":
        scroll_sections(page)
        passos_n += 1

    # --- handlers por regra ---
    if rid == "RN-HOME-001":
        body = norm(page.locator("body").inner_text(timeout=15000))
        keys = ["filmes", "séries", "series", "animes", "jogos"]
        pos = [body.find(k) for k in keys if body.find(k) >= 0]
        ok = len(pos) >= 3 and pos == sorted(pos)
        return result(cid, rid, arquivo, "PASS" if ok else "FAIL", f"Ordem índices: {pos}", passos_n, "passo_a_passo")

    if rid == "RN-HOME-002":
        links = [
            ("#filmes", "Filmes", "/filmes"),
            ("#series", "Séries", "/series"),
            ("#animes", "Animes", "/animes"),
            ("#jogos", "Jogos", "/jogos"),
        ]
        fails = []
        for sel, name, expect_path in links:
            goto(page, "/")
            scroll_sections(page)
            passos_n += 1
            try:
                page.locator(sel).get_by_role("link", name=name, exact=True).click(timeout=8000)
                page.wait_for_timeout(1200)
                if expect_path not in page.url:
                    fails.append(name)
            except PwTimeout:
                fails.append(name)
        if not fails:
            return result(cid, rid, arquivo, "PASS", "Navegação Filmes/Séries/Animes/Jogos OK", passos_n, "passo_a_passo")
        return result(cid, rid, arquivo, "FAIL", f"Falhou: {fails}", passos_n, "passo_a_passo")

    if rid.startswith("RN-HOME-EA"):
        goto(page, "/")
        scroll_sections(page)
        n = page.get_by_role("button", name="Ver o que está em alta agora").count()
        passos_n += 2
        if n >= 4:
            return result(cid, rid, arquivo, "PASS", f"{n} botões em alta visíveis", passos_n, "passo_a_passo")
        return result(cid, rid, arquivo, "FAIL", f"Esperado 4 botões em alta, encontrado {n}", passos_n, "passo_a_passo")

    if arquivo in ("02-FILMES.md", "03-SERIES.md"):
        h1 = page.locator("h1").first.inner_text(timeout=8000) if page.locator("h1").count() else ""
        passos_n += 1
        if len(norm(h1)) < 2:
            return result(cid, rid, arquivo, "FAIL", "Página sem h1", passos_n, "smoke")
        return result(
            cid,
            rid,
            arquivo,
            "PENDENTE_QA_HUMANO",
            f"Página OK (h1={h1[:50]}) — robô não cobre passos da regra; QA/supervisor executa CSV.",
            passos_n,
            "manual_obrigatorio",
        )

    if arquivo == "08-MODAIS.md":
        section = modal_section_for_rule(rid, titulo, pre)
        passos_n += 1
        opened = open_modal_from_home_carousel(page, section)
        if not opened:
            passos_n += 1
            opened = open_modal_from_filmes_page(page)
        passos_n += 1
        if not opened:
            return result(
                cid,
                rid,
                arquivo,
                "PENDENTE_QA_HUMANO",
                "Card/modal não abriu — QA confirma passos da regra no CSV.",
                passos_n,
                "catalogo_ui",
            )
        blob = norm(f"{titulo} {pre} {esp}")
        if "esc" in blob or "tecla" in blob:
            page.keyboard.press("Escape")
            page.wait_for_timeout(800)
            if super_modal_visible(page):
                return result(cid, rid, arquivo, "FAIL", "Esc não fechou SuperModal", passos_n, "passo_a_passo")
            return result(cid, rid, arquivo, "PASS", "SuperModal abriu e Esc fechou", passos_n, "passo_a_passo")
        if "fora" in blob or "overlay" in blob or "clique fora" in blob:
            page.locator(".fixed.inset-0").first.click(position={"x": 5, "y": 5}, timeout=5000)
            page.wait_for_timeout(800)
            if super_modal_visible(page):
                return result(cid, rid, arquivo, "FAIL", "Clique fora não fechou modal", passos_n, "passo_a_passo")
            return result(cid, rid, arquivo, "PASS", "SuperModal abriu e clique fora fechou", passos_n, "passo_a_passo")
        return result(
            cid,
            rid,
            arquivo,
            "PENDENTE_QA_HUMANO",
            "SuperModal aberto (.super-modal-content) — QA valida restante dos passos da regra.",
            passos_n,
            "modal_parcial",
        )

    if "comparar" in norm(c["passos"]) or "título" in norm(pre):
        return result(
            cid,
            rid,
            arquivo,
            "PENDENTE_QA_HUMANO",
            "Exige título/dado específico no catálogo — QA preenche planilha humana.",
            passos_n,
            "catalogo",
        )

    # smoke: página sem erro fatal
    body = norm(page.locator("body").inner_text(timeout=12000))
    passos_n += 1
    if "application error" in body or "erro 500" in body:
        return result(cid, rid, arquivo, "FAIL", "Erro de aplicação no body", passos_n, "smoke")
    if len(body) < 200:
        return result(cid, rid, arquivo, "FAIL", "Conteúdo insuficiente na página", passos_n, "smoke")

    return result(
        cid,
        rid,
        arquivo,
        "PENDENTE_QA_HUMANO",
        "Smoke OK — QA deve executar passos completos do CSV e registrar evidência.",
        passos_n,
        "manual_obrigatorio",
    )


def result(cid, regra, arquivo, veredito, evidencia, passos, tipo):
    return {
        "id": cid,
        "regra": regra,
        "arquivo": arquivo,
        "veredito": veredito,
        "evidencia": evidencia,
        "passos_executados": passos,
        "tipo_execucao": tipo,
        "testado_em": now_iso(),
        "executor": "executar-feliz-excelencia-todos (QA automatizado passo a passo)",
    }


def main() -> int:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    all_rows: list[dict] = []
    by_file: dict[str, list] = {}
    qa_email, qa_password, qa_token, auto_registered = provision_qa_credentials()
    auto_account = auto_registered

    scenarios = []
    for mf in sorted(MANIFEST_DIR.glob("*.json")):
        data = json.loads(mf.read_text(encoding="utf-8"))
        for c in data["cenarios"]:
            c["_arquivo"] = data["arquivo"]
            scenarios.append(c)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1280, "height": 900})
        page = context.new_page()
        logged_in = try_login(page, qa_token)

        for i, c in enumerate(scenarios, 1):
            row = run_rule(page, c["_arquivo"], c, logged_in)
            all_rows.append(row)
            by_file.setdefault(c["_arquivo"], []).append(row)
            if i % 50 == 0:
                print(f"... {i}/511", file=sys.stderr)

        browser.close()

    if auto_account and qa_token:
        if api_delete_account(qa_email, qa_password, qa_token):
            print("Conta QA descartável excluída.", file=sys.stderr)
        else:
            subprocess.run(
                [
                    sys.executable,
                    str(ROOT / "scripts" / "qa-conta-descartavel.py"),
                    "delete",
                ],
                env=os.environ.copy(),
                check=False,
            )

    # JSON por tela
    for ar, rows in by_file.items():
        slug = ar.replace(".md", ".json")
        (OUT_DIR / slug).write_text(
            json.dumps({"arquivo": ar, "ambiente": BASE, "cenarios": rows}, ensure_ascii=False, indent=2),
            encoding="utf-8",
        )

    # CSV métricas
    csv_path = OUT_DIR / "metricas-reais-511.csv"
    fields = [
        "ID_Cenario",
        "ID_Regra",
        "Arquivo",
        "Veredito",
        "Tipo_Execucao",
        "Passos_Executados",
        "Evidencia",
        "Testado_Em",
    ]
    with csv_path.open("w", encoding="utf-8-sig", newline="") as f:
        w = csv.DictWriter(f, fieldnames=fields)
        w.writeheader()
        for r in all_rows:
            w.writerow(
                {
                    "ID_Cenario": r["id"],
                    "ID_Regra": r["regra"],
                    "Arquivo": r["arquivo"],
                    "Veredito": r["veredito"],
                    "Tipo_Execucao": r["tipo_execucao"],
                    "Passos_Executados": r["passos_executados"],
                    "Evidencia": r["evidencia"],
                    "Testado_Em": r["testado_em"],
                }
            )

    cnt = Counter(r["veredito"] for r in all_rows)
    html = f"""<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Métricas reais 511 Feliz</title>
<style>body{{font-family:system-ui;margin:24px}} .kpi{{display:inline-block;margin:12px 24px 12px 0;font-size:18px}}
.pass{{color:#15803d;font-weight:700}} .fail{{color:#b91c1c}} .pend{{color:#b45309}}
table{{border-collapse:collapse;width:100%;font-size:12px}} th,td{{border:1px solid #eee;padding:6px}}</style></head><body>
<h1>Métricas reais — 511 cenários Feliz</h1><p>Gerado: {now_iso()} · Ambiente: {BASE}</p>
<p>Login QA: {"sim (" + os.environ.get("QA_EMAIL", "") + ")" if os.environ.get("QA_EMAIL") else "não — PENDENTE_QA_HUMANO em cenários logados"}</p>
<div>
<span class="kpi pass">PASS: {cnt.get('PASS',0)}</span>
<span class="kpi fail">FAIL: {cnt.get('FAIL',0)}</span>
<span class="kpi pend">PENDENTE_QA_HUMANO: {cnt.get('PENDENTE_QA_HUMANO',0)}</span>
</div>
<p><strong>Meta PO:</strong> zerar PENDENTE na <a href="../QA-EXECUCAO-HUMANA-511.csv">planilha humana</a> com prints e TL.</p>
<table><thead><tr><th>Cenário</th><th>Veredito</th><th>Tipo</th><th>Evidência</th></tr></thead><tbody>
"""
    for r in all_rows:
        cls = "pass" if r["veredito"] == "PASS" else "fail" if r["veredito"] == "FAIL" else "pend"
        html += f"<tr><td>{r['id']}</td><td class='{cls}'>{r['veredito']}</td><td>{r['tipo_execucao']}</td><td>{r['evidencia'][:120]}</td></tr>\n"
    html += "</tbody></table></body></html>"
    (OUT_DIR / "metricas-reais-511.html").write_text(html, encoding="utf-8")

    print("Métricas:", dict(cnt), "total", len(all_rows))
    print(csv_path)
    return 0


if __name__ == "__main__":
    sys.exit(main())
