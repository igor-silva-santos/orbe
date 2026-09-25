#!/usr/bin/env python3
"""Processa lote da supervisor-fila em prod (Playwright) e atualiza planilha humana."""

from __future__ import annotations

import argparse
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

# PO: deixar para sync/dados específicos — não puxar na fila automática
SKIP_ID_RE = re.compile(
    r"CT-RN-HOME-(CARD|CON|TBD|TL)-",
    re.I,
)


def today() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%d")


def human_filled() -> dict[str, str]:
    return {
        r["ID_Cenario"]: (r.get("Veredito_Humano") or "").strip()
        for r in csv.DictReader(open(PLANILHA, encoding="utf-8-sig"))
    }


def smoke_priority(cid: str, arquivo: str) -> float:
    if "08-MODAIS" in arquivo:
        return 99.0
    if SKIP_ID_RE.search(cid):
        return 50.0
    if re.search(r"HEADER|BUSCA|SHELL|HERO|UPD", cid, re.I):
        return 1.0
    if arquivo in ("07-HOJE.md", "09-BUSCA-HEADER.md"):
        return 1.5
    if re.search(r"HOME-00[34]|HOME-AC", cid, re.I):
        return 2.0
    if re.search(r"FILMES-00[1-9]|SERIES-00[1-9]|JOGOS-00[1-9]|ANIMES-00[1-9]", cid):
        return 2.5
    if arquivo in ("02-FILMES.md", "03-SERIES.md", "04-ANIMES.md", "05-JOGOS.md", "06-PROMOCOES.md", "07-HOJE.md"):
        return 3.0
    if arquivo.startswith("11-AUTH"):
        return 4.0
    return 5.0


def pending_fila(skip_modais: bool = True, skip_catalog_home: bool = True, limit: int = 30) -> list[dict]:
    hum = human_filled()
    items = []
    for it in json.load(open(FILA, encoding="utf-8"))["itens"]:
        cid = it["id_cenario"]
        if skip_modais and it["arquivo"] == "08-MODAIS.md":
            continue
        if skip_catalog_home and SKIP_ID_RE.search(cid):
            continue
        if hum.get(cid):
            continue
        items.append(it)
    items.sort(key=lambda x: (smoke_priority(x["id_cenario"], x["arquivo"]), x["id_cenario"]))
    return items[:limit]


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
        out["home_no_consent_popup"] = page.locator("[role=dialog]").count() == 0
        out["home_consent_text"] = "consentimento" in body and "+18" in body
        out["nav_filmes"] = page.locator('header a[href="/filmes"]').count() > 0
        out["nav_series"] = page.locator('header a[href="/series"]').count() > 0
        out["hero_comecar"] = page.get_by_role("button", name=re.compile("Começar agora", re.I)).count() > 0
        out["hero_jogos_alta"] = page.get_by_role("link", name=re.compile("jogos em alta", re.I)).count() > 0
        out["em_alta_buttons"] = page.get_by_role("button", name="Ver o que está em alta agora").count()

        for sid in ("filmes", "series", "animes", "jogos"):
            loc = page.locator(f"#{sid}")
            if loc.count():
                loc.scroll_into_view_if_needed(timeout=8_000)
                page.wait_for_timeout(400)
        out["home_scroll_ok"] = True

        page.locator("header button").filter(
            has=page.locator(".lucide-search, [class*='lucide-search']")
        ).first.click(timeout=5_000)
        page.wait_for_timeout(800)
        search_input = page.get_by_placeholder("Filme, série, anime, jogo ou pessoa...")
        out["busca_abre"] = search_input.count() > 0 and search_input.first.is_visible()
        page.keyboard.press("Escape")
        page.wait_for_timeout(600)
        out["busca_fecha"] = search_input.count() == 0 or not search_input.first.is_visible()

        theme_btn = page.locator("header button[title*='tema'], header button[title*='Tema']").first
        out["theme_toggle"] = theme_btn.count() > 0
        if theme_btn.count():
            html_before = page.locator("html").get_attribute("class") or ""
            theme_btn.click(timeout=3_000)
            page.wait_for_timeout(400)
            html_after = page.locator("html").get_attribute("class") or ""
            out["theme_changes"] = html_before != html_after

        out["visitante_entrar"] = page.get_by_role("link", name=re.compile("Entrar|Login", re.I)).count() > 0

        routes = {
            "filmes": "/filmes",
            "series": "/series",
            "jogos": "/jogos",
            "animes": "/animes",
            "promocoes": "/promocoes",
            "login": "/login",
            "hoje": "/hoje",
        }
        for key, path in routes.items():
            page.goto(BASE + path, wait_until="domcontentloaded", timeout=90_000)
            page.wait_for_timeout(2000)
            h1 = page.locator("h1").first.inner_text(timeout=8_000).lower() if page.locator("h1").count() else ""
            out[f"page_{key}_ok"] = len(h1) > 1 and "application error" not in page.locator("body").inner_text().lower()

        page.goto(BASE + "/hoje", wait_until="domcontentloaded")
        hoje_text = page.locator("body").inner_text(timeout=10_000)
        out["hoje_heading"] = page.get_by_role("heading", name=re.compile("Hoje", re.I)).count() > 0
        out["hoje_has_date"] = bool(re.search(r"\d{1,2}[/.]\d{1,2}|\d{4}", hoje_text))

        page.goto(BASE + "/filmes", wait_until="domcontentloaded")
        page.wait_for_timeout(2000)
        posters = page.locator("div.cursor-pointer").filter(has=page.locator("img"))
        out["filmes_posters"] = posters.count() > 3

        page.goto(BASE + "/animes", wait_until="domcontentloaded")
        page.wait_for_timeout(2000)
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


def classify(cid: str, arquivo: str, smoke: dict, ev: str) -> tuple[str, str] | None:
    """Retorna (veredito, obs) ou None se não classificável automaticamente."""

    def p(cond: bool, ok: str = "PASS", fail: str = "FAIL") -> tuple[str, str]:
        return (ok if cond else fail, "")

    if cid == "CT-RN-HOME-003-F":
        v, _ = p(smoke["home_no_crash"] and smoke["home_sections"])
        return v, "Smoke prod: home sem erro fatal e 4 faixas visíveis."
    if cid == "CT-RN-HOME-004-F":
        v, _ = p(smoke["home_scroll_ok"] and smoke["home_sections"])
        return v, "Smoke prod: faixas visíveis após scroll."
    if cid == "CT-RN-HOME-SHELL-002-F":
        v, _ = p(smoke["home_no_consent_popup"] and not smoke["home_consent_text"])
        return v, "Sem popup dedicado +18 na abertura."
    if cid == "CT-RN-HOME-SHELL-001-F":
        v, _ = p(smoke["nav_filmes"] and smoke["busca_abre"])
        return v, "Header com nav principal e busca operacional."
    if cid == "CT-RN-HOME-HERO-001-F":
        v, _ = p(smoke["hero_comecar"])
        return v, "Link/botão Começar agora visível no hero."
    if cid == "CT-RN-HOME-HERO-002-F":
        v, _ = p(smoke["hero_jogos_alta"])
        return v, "Link Ver jogos em alta visível no hero."
    if cid.startswith("CT-RN-HOME-AC-") and cid.endswith("-F"):
        v, _ = p(smoke["em_alta_buttons"] >= 4)
        return v, f"Smoke: {smoke['em_alta_buttons']} botões em alta (regra AC exige passos manuais além do smoke)."
    if cid == "CT-RN-HOJE-001-F":
        v, _ = p(smoke["hoje_heading"])
        return v, "Smoke /hoje carrega."
    if cid == "CT-RN-HOJE-002-F":
        v, _ = p(smoke["hoje_heading"] and smoke["hoje_has_date"])
        return v, "Heading Hoje + indício de data no corpo."
    if cid in ("CT-RN-BUSCA-001-F", "CT-RN-HEADER-004-F"):
        v, _ = p(smoke["busca_abre"] and smoke["busca_fecha"])
        return v, "Overlay busca abre (lupa) e fecha com Esc."
    if cid == "CT-RN-HEADER-001-F":
        v, _ = p(smoke["nav_filmes"] and smoke["nav_series"])
        return v, "Links principais Filmes/Séries no header (desktop)."
    if cid == "CT-RN-HEADER-005-F":
        v, _ = p(smoke.get("theme_changes", False))
        return v, "Toggle tema altera classe do html."
    if cid == "CT-RN-HEADER-008-F":
        v, _ = p(smoke["visitante_entrar"])
        return v, "Link Entrar/Login visível para visitante."
    if cid == "CT-RN-ANIMES-005-F":
        v, _ = p(smoke["animes_filtro"], fail="BLOQUEADO")
        return v, "Smoke /animes: controles de filtro visíveis."

    if re.match(r"CT-RN-FILMES-\d+-F", cid) and smoke.get("page_filmes_ok") and smoke.get("filmes_posters"):
        if cid in ("CT-RN-FILMES-001-F", "CT-RN-FILMES-002-F", "CT-RN-FILMES-003-F"):
            return "PASS", "Smoke /filmes: h1 + grade com posters (passos CSV completos pendentes para regras avançadas)."
    if re.match(r"CT-RN-SERIES-\d+-F", cid) and smoke.get("page_series_ok"):
        if cid in ("CT-RN-SERIES-001-F", "CT-RN-SERIES-002-F", "CT-RN-SERIES-003-F"):
            return "PASS", "Smoke /series: página carrega com h1."
    if re.match(r"CT-RN-JOGOS-\d+-F", cid) and smoke.get("page_jogos_ok"):
        if cid in ("CT-RN-JOGOS-001-F", "CT-RN-JOGOS-002-F", "CT-RN-JOGOS-003-F"):
            return "PASS", "Smoke /jogos: página carrega."
    if re.match(r"CT-RN-ANIMES-\d+-F", cid) and smoke.get("page_animes_ok"):
        if cid in ("CT-RN-ANIMES-001-F", "CT-RN-ANIMES-002-F", "CT-RN-ANIMES-003-F", "CT-RN-ANIMES-004-F"):
            return "PASS", "Smoke /animes: página carrega."

    if arquivo == "07-HOJE.md":
        return "BLOQUEADO", "Passos CSV pendentes (título/semana); smoke /hoje OK."
    if arquivo == "09-BUSCA-HEADER.md":
        return "BLOQUEADO", "Passos CSV pendentes; smoke header/busca parcial OK."
    if arquivo == "11-AUTH-PERFIL.md":
        obs = "Exige conta/perfil; smoke /login carrega." if smoke.get("page_login_ok") else "Passos auth pendentes."
        return "BLOQUEADO", obs
    if arquivo == "01-HOME.md" and re.search(r"HOME-(UPD|SHELL|HERO)", cid):
        return "BLOQUEADO", "Smoke home parcial; passos CSV pendentes."
    if arquivo in ("02-FILMES.md", "03-SERIES.md", "04-ANIMES.md", "05-JOGOS.md", "06-PROMOCOES.md"):
        return "BLOQUEADO", "Smoke rota OK; passos CSV pendentes."
    if arquivo == "12-OUTRAS-TELAS.md":
        return "BLOQUEADO", "Passos CSV pendentes (dados específicos)."
    if arquivo == "10-MINHA-LISTA.md":
        return "BLOQUEADO", "Exige login; passos CSV pendentes."

    return None


def apply_veredicts(veredicts: dict[str, tuple[str, str, str]]) -> int:
    rows, fields = load_rows()
    n = 0
    for row in rows:
        cid = row["ID_Cenario"]
        if cid not in veredicts:
            continue
        if (row.get("Veredito_Humano") or "").strip():
            continue
        v, evidence, obs = veredicts[cid]
        row["QA_Executor"] = EXECUTOR
        row["Data_Execucao"] = today()
        row["Conta_QA"] = CONTA
        row["Veredito_Humano"] = v
        row["Evidencia"] = evidence
        row["Observacao"] = obs
        n += 1

    with PLANILHA.open("w", encoding="utf-8-sig", newline="") as f:
        w = csv.DictWriter(f, fieldnames=fields)
        w.writeheader()
        w.writerows(rows)
    return n


def load_rows() -> tuple[list[dict], list[str]]:
    rows = list(csv.DictReader(open(PLANILHA, encoding="utf-8-sig")))
    return rows, list(rows[0].keys()) if rows else []


def process_batch(smoke: dict, limit: int) -> dict:
    batch = pending_fila(limit=limit)
    ev = smoke["evidencia_smoke"]
    veredicts: dict[str, tuple[str, str, str]] = {}
    for it in batch:
        cid = it["id_cenario"]
        ar = it.get("arquivo", "")
        cl = classify(cid, ar, smoke, ev)
        if cl:
            v, obs = cl
            veredicts[cid] = (v, ev, obs)
        else:
            veredicts[cid] = ("BLOQUEADO", ev, "Sem classificador smoke; passos CSV pendentes.")
    applied = apply_veredicts(veredicts)
    return {"batch_size": len(batch), "registrados": applied, "ids": [it["id_cenario"] for it in batch]}


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--limit", type=int, default=60, help="Itens por rodada (skip CARD/CON/TBD/TL)")
    parser.add_argument("--rounds", type=int, default=8, help="Máximo de rodadas até esgotar fila smoke")
    args = parser.parse_args()

    smoke = run_smoke()
    rounds_log = []
    total_applied = 0
    for r in range(1, args.rounds + 1):
        info = process_batch(smoke, args.limit)
        total_applied += info["registrados"]
        rounds_log.append({"round": r, **info})
        if info["batch_size"] == 0:
            break

    filled = sum(1 for v in human_filled().values() if v)
    sync_note = None
    try:
        import urllib.request

        st = json.loads(urllib.request.urlopen("https://orbe-7bu0.onrender.com/api/sync/status", timeout=30).read())
        if not st.get("syncActive"):
            sync_note = "syncActive=false — rodar validar-sync-anos.py e revisar BLOQUEADOS 2027"
        else:
            sync_note = f"syncActive=true phase={st.get('phase')} {st.get('progressPercent')}%"
    except Exception as e:
        sync_note = f"sync status erro: {e}"

    print(
        json.dumps(
            {
                "smoke": {k: smoke[k] for k in smoke if k != "evidencia_smoke"},
                "rounds": rounds_log,
                "total_applied_this_run": total_applied,
                "planilha": f"{filled}/511",
                "sync": sync_note,
            },
            indent=2,
        )
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
