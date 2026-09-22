#!/usr/bin/env python3
"""Consolida JSON parciais de execução em CSV + relatório HTML para auditor."""

from __future__ import annotations

import csv
import json
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EXEC_DIR = ROOT / "cenarios-camadas" / "execucao" / "prod"
OUT_CSV = ROOT / "cenarios-camadas" / "execucao" / "relatorio-feliz-producao.csv"
OUT_HTML = ROOT / "cenarios-camadas" / "execucao" / "relatorio-feliz-producao.html"
EXPECTED = 511


def main() -> None:
    rows: list[dict] = []
    for path in sorted(EXEC_DIR.glob("*.json")):
        data = json.loads(path.read_text(encoding="utf-8"))
        for c in data.get("cenarios", []):
            rows.append(
                {
                    "Arquivo": data.get("arquivo", path.stem),
                    "ID_Cenario": c.get("id", ""),
                    "ID_Regra": c.get("regra", ""),
                    "Resultado": c.get("resultado", "NAO_EXECUTADO"),
                    "Evidencia": c.get("evidencia", ""),
                    "Executor": c.get("executor", ""),
                    "Testado_Em": c.get("testado_em", ""),
                }
            )
    rows.sort(key=lambda r: r["ID_Cenario"])
    fields = list(rows[0].keys()) if rows else [
        "Arquivo", "ID_Cenario", "ID_Regra", "Resultado", "Evidencia", "Executor", "Testado_Em"
    ]
    OUT_CSV.parent.mkdir(parents=True, exist_ok=True)
    with OUT_CSV.open("w", encoding="utf-8-sig", newline="") as f:
        w = csv.DictWriter(f, fieldnames=fields)
        w.writeheader()
        w.writerows(rows)

    from collections import Counter
    cnt = Counter(r["Resultado"] for r in rows)
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    html = f"""<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><title>Execução Feliz — Produção</title>
<style>
body{{font-family:system-ui;margin:24px}} .kpi{{display:inline-block;margin-right:24px}}
table{{border-collapse:collapse;width:100%;font-size:13px}} th,td{{border:1px solid #eee;padding:6px}}
.pass{{color:#15803d;font-weight:700}} .fail{{color:#b91c1c;font-weight:700}} .bloq{{color:#b45309}}
</style></head><body>
<h1>Cenários Feliz — produção (orbe-seven.vercel.app)</h1>
<p>Gerado: {now} · Total registrado: {len(rows)} / {EXPECTED}</p>
<div>
<span class="kpi"><strong>{cnt.get('PASS',0)}</strong> PASS</span>
<span class="kpi"><strong>{cnt.get('FAIL',0)}</strong> FAIL</span>
<span class="kpi"><strong>{cnt.get('BLOQUEADO',0)}</strong> BLOQUEADO</span>
<span class="kpi"><strong>{cnt.get('NAO_EXECUTADO',0)}</strong> NÃO EXEC.</span>
</div>
<table><thead><tr><th>Cenário</th><th>Regra</th><th>Resultado</th><th>Evidência</th></tr></thead><tbody>
"""
    for r in rows:
        res = r["Resultado"]
        cls = "pass" if res == "PASS" else "fail" if res == "FAIL" else "bloq"
        html += f"<tr><td>{r['ID_Cenario']}</td><td>{r['ID_Regra']}</td><td class='{cls}'>{res}</td><td>{r['Evidencia'][:200]}</td></tr>\n"
    html += "</tbody></table></body></html>"
    OUT_HTML.write_text(html, encoding="utf-8")
    print(f"Linhas: {len(rows)}")
    print("Contagem:", dict(cnt))
    if len(rows) < EXPECTED:
        print(f"AVISO: faltam {EXPECTED - len(rows)} cenários")
    print(OUT_CSV)
    print(OUT_HTML)


if __name__ == "__main__":
    main()
