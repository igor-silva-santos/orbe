#!/usr/bin/env python3
"""Monta pacote JSON+MD para agente QA sênior avaliar robô 511 + E2E."""

from __future__ import annotations

import csv
import json
import os
import subprocess
import sys
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EXEC = ROOT / "cenarios-camadas" / "execucao"

_metrics_dir = os.environ.get("METRICAS_511_OUT_DIR")
METRICAS_CSV = (
    Path(_metrics_dir) / "metricas-reais-511.csv"
    if _metrics_dir
    else EXEC / "metricas-reais-511" / "metricas-reais-511.csv"
)
FILA_JSON = EXEC / "supervisor-fila-qa.json"
E2E_JSON = Path(
    sys.argv[1] if len(sys.argv) > 1 else EXEC / "e2e-playwright-report.json"
)
_out = Path(os.environ.get("PACOTE_QA_OUT_DIR", str(EXEC)))
OUT_JSON = _out / "pacote-supervisor-qa.json"
OUT_MD = _out / "pacote-supervisor-qa.md"
PROMPT_MD = _out / "PROMPT-SUPERVISOR-IA.md"


def now_iso() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def load_metrics() -> list[dict]:
    if not METRICAS_CSV.is_file():
        return []
    with METRICAS_CSV.open(encoding="utf-8-sig") as f:
        return list(csv.DictReader(f))


def load_e2e() -> dict:
    if not E2E_JSON.is_file():
        return {"status": "missing", "path": str(E2E_JSON)}
    return json.loads(E2E_JSON.read_text(encoding="utf-8"))


def main() -> int:
    rows = load_metrics()
    cnt = Counter(r.get("Veredito", "") for r in rows)
    fails = [r for r in rows if r.get("Veredito") == "FAIL"]
    pendentes = [r for r in rows if r.get("Veredito") == "PENDENTE_QA_HUMANO"][:40]

    e2e = load_e2e()
    e2e_summary = {"status": e2e.get("status", "ok")}
    if "suites" in e2e:
        stats = e2e.get("stats", {})
        e2e_summary = {
            "expected": stats.get("expected", 0),
            "unexpected": stats.get("unexpected", 0),
            "skipped": stats.get("skipped", 0),
            "duration_ms": stats.get("duration", 0),
        }

    validar = None
    try:
        p = subprocess.run(
            [sys.executable, str(ROOT / "scripts" / "validar-sync-anos.py"), "--start", "2027", "--end", "2030"],
            capture_output=True,
            text=True,
            timeout=120,
        )
        validar = {"exit_code": p.returncode, "stdout": p.stdout.strip()}
    except Exception as e:
        validar = {"error": str(e)}

    pacote = {
        "gerado_em": now_iso(),
        "ambiente": "https://orbe-seven.vercel.app",
        "robo_511": {
            "fonte": str(METRICAS_CSV.relative_to(ROOT)),
            "total": len(rows),
            "contagem": dict(cnt),
            "fail_amostra": fails[:60],
            "pendente_amostra": pendentes,
        },
        "e2e_playwright": e2e_summary,
        "e2e_report_path": str(E2E_JSON),
        "validar_sync_2027_2030": validar,
        "fila_supervisor": str(FILA_JSON.relative_to(ROOT)) if FILA_JSON.is_file() else None,
        "instrucoes_agente": [
            "Comparar FAIL do robô com passos em cenarios-teste-camadas.csv — muitos 08-MODAIS são falso FAIL.",
            "Reexecutar no browser cenários FAIL e amostra PENDENTE; registrar em QA-EXECUCAO-HUMANA-511.csv.",
            "E2E PASS não substitui 511 — só smoke de home/filmes.",
            "Console: ver QA-CONSOLE-TRIAGEM.md (WS, SW, TMDB).",
        ],
    }

    EXEC.mkdir(parents=True, exist_ok=True)
    OUT_JSON.write_text(json.dumps(pacote, ensure_ascii=False, indent=2), encoding="utf-8")

    md = f"""# Pacote — avaliação supervisor IA

Gerado: {pacote['gerado_em']}

## Robô 511 (`executar-feliz-excelencia-todos.py`)

| Veredito | Qtd |
| --- | ---: |
"""
    for k in ("PASS", "FAIL", "PENDENTE_QA_HUMANO"):
        md += f"| {k} | {cnt.get(k, 0)} |\n"
    md += f"""
Artefatos: `metricas-reais-511/metricas-reais-511.csv`, `.html`, JSON por tela.

## E2E Playwright (produção)

```json
{json.dumps(e2e_summary, ensure_ascii=False, indent=2)}
```

Relatório completo: `{E2E_JSON.name}`

## Sync 2027–2030 (smoke)

```
{validar.get('stdout', validar) if validar else '-'}
```

## Arquivo para o agente

- **`pacote-supervisor-qa.json`** — contexto estruturado
- **`PROMPT-SUPERVISOR-IA.md`** — prompt de avaliação
- **`supervisor-fila-qa.json`** — fila priorizada (rode `gerar-fila-supervisor-qa.py` após o robô)
"""
    OUT_MD.write_text(md, encoding="utf-8")

    PROMPT_MD.write_text(
        f"""# Prompt — Supervisor QA IA (avaliar robô + E2E)

Você é **QA sênior** do Orbe. Produção: https://orbe-seven.vercel.app

## Entrada

1. Leia `{OUT_JSON.name}` (mesma pasta).
2. Leia `metricas-reais-511/metricas-reais-511.csv` (511 linhas).
3. Leia relatório E2E: `{E2E_JSON.name}`.
4. Fila: `supervisor-fila-qa.json` (se existir).

## Sua missão

1. **Auditar o robô:** para cada **FAIL**, diga se é bug real, falso positivo do script, ou precisa de passo manual (ex. modais).
2. **Auditar o E2E:** os testes em `e2e/` cobrem só smoke — liste lacunas vs carrossel 2027–2030 e `/filmes`.
3. **Plano de ação:** priorize IDs a reexecutar no browser; use `supervisor-qa-registrar.py` para gravar veredito humano.
4. **Não** aceite 138 PASS como meta PO — meta é 511 vereditos humanos/IA na planilha.

## Saída esperada

- Tabela: `ID_Cenario` | veredito robô | sua avaliação | ação (PASS/FAIL/BLOQUEADO/re-testar)
- Lista de bugs DEV confirmados (com evidência).
- Nota se E2E está alinhado ou precisa novos casos.

Dados do pacote (resumo): robô {dict(cnt)} · E2E {e2e_summary}
""",
        encoding="utf-8",
    )

    print(f"OK {OUT_JSON}")
    print(f"OK {OUT_MD}")
    print(f"OK {PROMPT_MD}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
