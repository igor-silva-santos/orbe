#!/usr/bin/env python3
"""Registra veredito do supervisor IA/QA na planilha humana oficial."""

from __future__ import annotations

import argparse
import csv
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PLANILHA = ROOT / "cenarios-camadas" / "execucao" / "QA-EXECUCAO-HUMANA-511.csv"

VEREDITOS = {"PASS", "FAIL", "BLOQUEADO"}


def now_date() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%d")


def main() -> int:
    parser = argparse.ArgumentParser(description="Atualiza uma linha da planilha humana 511.")
    parser.add_argument("--id", required=True, help="ID_Cenario, ex. CT-RN-HOME-003-F")
    parser.add_argument("--veredito", required=True, choices=sorted(VEREDITOS))
    parser.add_argument("--evidencia", required=True, help="Caminho ou URL da evidência")
    parser.add_argument("--executor", default="Supervisor IA")
    parser.add_argument("--conta", default="")
    parser.add_argument("--obs", default="")
    args = parser.parse_args()

    if not PLANILHA.is_file():
        print(f"Planilha ausente. Rode: python3 docs/regras-negocio/scripts/gerar-planilha-execucao-humana.py")
        return 1

    rows: list[dict] = []
    with PLANILHA.open(encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        fieldnames = reader.fieldnames or []
        for row in reader:
            rows.append(row)

    found = False
    for row in rows:
        if row.get("ID_Cenario") != args.id:
            continue
        found = True
        row["QA_Executor"] = args.executor
        row["Data_Execucao"] = now_date()
        row["Conta_QA"] = args.conta
        row["Veredito_Humano"] = args.veredito
        row["Evidencia"] = args.evidencia
        row["Observacao"] = args.obs
        break

    if not found:
        print(f"ID não encontrado na planilha: {args.id}")
        return 1

    with PLANILHA.open("w", encoding="utf-8-sig", newline="") as f:
        w = csv.DictWriter(f, fieldnames=fieldnames)
        w.writeheader()
        w.writerows(rows)

    print(f"OK: {args.id} -> {args.veredito}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
