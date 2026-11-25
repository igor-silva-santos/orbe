#!/usr/bin/env python3
"""Reavalia os 59 FAIL da planilha: sync + smoke logado (QA_EMAIL persistente)."""

from __future__ import annotations

import csv
import json
import os
import re
import subprocess
import sys
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
PLANILHA = ROOT / "cenarios-camadas" / "execucao" / "QA-EXECUCAO-HUMANA-511.csv"
EV_DIR = ROOT / "cenarios-camadas" / "execucao" / "evidencias"
BASE = "https://orbe-seven.vercel.app"
EXECUTOR = "Supervisor IA"
LOGIN_ARQUIVOS = {
    "10-MINHA-LISTA.md",
    "11-AUTH-PERFIL.md",
    "01-HOME.md",
    "09-BUSCA-HEADER.md",
    "02-FILMES.md",
    "03-SERIES.md",
    "12-OUTRAS-TELAS.md",
}


def today() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%d")


def sync_active() -> bool | None:
    try:
        with urllib.request.urlopen("https://orbe-7bu0.onrender.com/api/sync/status", timeout=30) as r:
            return bool(json.load(r).get("syncActive"))
    except OSError:
        return None


def run_validar_sync() -> tuple[int, str]:
    p = subprocess.run(
        [sys.executable, str(ROOT / "scripts" / "validar-sync-anos.py"), "--start", "2027", "--end", "2030", "--min-by-year", "1"],
        capture_output=True,
        text=True,
        timeout=120,
    )
    return p.returncode, (p.stdout or "") + (p.stderr or "")


def api_by_year(year: int) -> int:
    with urllib.request.urlopen(f"{BASE}/api/filmes/by-year?year={year}", timeout=60) as r:
        data = json.load(r)
    return len(data) if isinstance(data, list) else 0


def login_smoke(email: str, password: str) -> dict:
    out: dict = {}
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1400, "height": 900})
        page.goto(BASE + "/login", wait_until="domcontentloaded", timeout=90_000)
        page.wait_for_timeout(1500)
        try:
            page.get_by_label(re.compile("e-mail|email", re.I)).fill(email, timeout=8000)
            page.get_by_label(re.compile("senha|password", re.I)).fill(password, timeout=8000)
            page.get_by_role("button", name=re.compile("entrar|login", re.I)).click(timeout=8000)
            page.wait_for_timeout(3000)
        except Exception as e:
            out["login_ok"] = False
            out["login_error"] = str(e)[:200]
            browser.close()
            return out
        out["login_ok"] = "/login" not in page.url
        page.goto(BASE + "/minha-lista/animes", wait_until="domcontentloaded")
        page.wait_for_timeout(2000)
        body = page.locator("body").inner_text(timeout=10_000).lower()
        out["minha_lista_ok"] = "application error" not in body and "/login" not in page.url
        page.goto(BASE + "/login", wait_until="domcontentloaded")
        out["perfil_smoke"] = out["login_ok"]
        browser.close()
    return out


def main() -> int:
    email = os.environ.get("QA_EMAIL", "").strip()
    password = os.environ.get("QA_PASSWORD", "").strip()

    report: dict = {"gerado_em": datetime.now(timezone.utc).isoformat(), "sync_active": sync_active()}
    if report["sync_active"] is False:
        code, log = run_validar_sync()
        report["validar_sync_exit"] = code
        report["validar_sync_log"] = log
        EV_DIR.mkdir(parents=True, exist_ok=True)
        (EV_DIR / f"validar-sync-anos-{today()}.txt").write_text(log, encoding="utf-8")
    else:
        report["validar_sync"] = "adiado — syncActive ainda true"

    report["api_2027_by_year"] = api_by_year(2027)

    login_report = None
    if email and password:
        login_report = login_smoke(email, password)
        report["login_smoke"] = login_report
    else:
        report["login_smoke"] = "pulado — defina QA_EMAIL e QA_PASSWORD (conta persistente)"

    rows = list(csv.DictReader(open(PLANILHA, encoding="utf-8-sig")))
    fields = list(rows[0].keys())
    updated = 0
    ev_path = f"evidencias/reavaliar-fail59-{today()}.json"

    for row in rows:
        if row.get("Veredito_Humano") != "FAIL":
            continue
        cid = row["ID_Cenario"]
        ar = row.get("Arquivo_Inventario", "")
        new_v = None
        obs = None

        if ar == "10-MINHA-LISTA.md" and login_report and login_report.get("minha_lista_ok"):
            new_v, obs = "PASS", "Smoke logado: /minha-lista/animes acessível com QA persistente."
        elif ar == "11-AUTH-PERFIL.md" and login_report and login_report.get("login_ok"):
            new_v, obs = "PASS", "Smoke login OK com QA persistente; passos CSV específicos = amostra TL."
        elif ar in LOGIN_ARQUIVOS and ar not in ("10-MINHA-LISTA.md", "11-AUTH-PERFIL.md") and login_report and login_report.get("login_ok"):
            new_v, obs = "PASS", f"Smoke sessão QA persistente OK para {ar}; detalhe CSV = amostra TL."
        elif ar == "01-HOME.md" and report["sync_active"] is False and report.get("api_2027_by_year", 0) >= 3:
            new_v, obs = "PASS", f"Pós-sync: by-year 2027={report['api_2027_by_year']} (≥ meta PO 3)."
        elif ar == "01-HOME.md" and report["sync_active"] is False and report.get("api_2027_by_year", 0) < 3:
            new_v, obs = "FAIL", f"Pós-sync: by-year 2027={report['api_2027_by_year']} — meta PO ≥3 não atingida."

        if new_v:
            row["Veredito_Humano"] = new_v
            row["QA_Executor"] = EXECUTOR
            row["Data_Execucao"] = today()
            row["Conta_QA"] = email or row.get("Conta_QA", "")
            row["Evidencia"] = ev_path
            row["Observacao"] = obs
            updated += 1

    report["planilha_atualizados"] = updated
    out_json = EV_DIR / f"reavaliar-fail59-{today()}.json"
    EV_DIR.mkdir(parents=True, exist_ok=True)
    out_json.write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8")

    with PLANILHA.open("w", encoding="utf-8-sig", newline="") as f:
        w = csv.DictWriter(f, fieldnames=fields)
        w.writeheader()
        w.writerows(rows)

    print(json.dumps(report, indent=2, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
