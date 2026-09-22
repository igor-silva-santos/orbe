#!/usr/bin/env python3
"""Gera QA-EXECUCAO-HUMANA-511.csv — um Feliz por linha para o time preencher."""

import csv
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "cenarios-camadas" / "cenarios-teste-camadas.csv"
OUT = ROOT / "cenarios-camadas" / "execucao" / "QA-EXECUCAO-HUMANA-511.csv"

FIELDS = [
    "ID_Cenario",
    "ID_Regra",
    "Nome_Regra",
    "Tela",
    "Arquivo_Inventario",
    "QA_Executor",
    "Data_Execucao",
    "Conta_QA",
    "Veredito_Humano",
    "Evidencia",
    "TL_Validado",
    "Observacao",
]


def main() -> None:
    rows = []
    with SRC.open(encoding="utf-8-sig") as f:
        for r in csv.DictReader(f):
            if r["Camada_Testagem"] != "Feliz":
                continue
            rows.append(
                {
                    "ID_Cenario": r["ID_Cenario"],
                    "ID_Regra": r["ID_Regra"],
                    "Nome_Regra": r["Nome_Regra"],
                    "Tela": r["Tela_Resumo"],
                    "Arquivo_Inventario": r["Arquivo_Inventario"],
                    "QA_Executor": "",
                    "Data_Execucao": "",
                    "Conta_QA": "",
                    "Veredito_Humano": "",
                    "Evidencia": "",
                    "TL_Validado": "",
                    "Observacao": "",
                }
            )
    rows.sort(key=lambda x: x["ID_Cenario"])
    OUT.parent.mkdir(parents=True, exist_ok=True)
    with OUT.open("w", encoding="utf-8-sig", newline="") as f:
        w = csv.DictWriter(f, fieldnames=FIELDS)
        w.writeheader()
        w.writerows(rows)
    print(f"OK: {len(rows)} linhas -> {OUT}")


if __name__ == "__main__":
    main()
