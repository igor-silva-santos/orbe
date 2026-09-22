#!/usr/bin/env python3
"""Valida pacote cenarios-camadas: 511 regras × 3 camadas (F, N, E)."""

from __future__ import annotations

import csv
import sys
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RULES_CSV = ROOT / "regras-negocio-qa.csv"
SCENARIOS_CSV = ROOT / "cenarios-camadas" / "cenarios-teste-camadas.csv"
EXPECTED_SUFFIXES = {"F", "N", "E"}
EXPECTED_CAMADAS = {"Feliz", "Negativo", "Exploratório"}


def main() -> int:
    rule_ids = {r["ID"] for r in csv.DictReader(RULES_CSV.open(encoding="utf-8-sig"))}
    rows = list(csv.DictReader(SCENARIOS_CSV.open(encoding="utf-8-sig")))

    by_rule: dict[str, set[str]] = defaultdict(set)
    camadas: dict[str, set[str]] = defaultdict(set)
    for row in rows:
        rid = row["ID_Regra"]
        by_rule[rid].add(row["ID_Cenario"])
        camadas[rid].add(row.get("Camada_Testagem", ""))

    missing_rules = rule_ids - by_rule.keys()
    extra_rules = by_rule.keys() - rule_ids

    bad_layers = []
    for rid in rule_ids:
        if rid not in by_rule:
            continue
        suffixes = set()
        for cid in by_rule[rid]:
            part = cid.split("-")[-1]
            suffixes.add(part)
        if suffixes != EXPECTED_SUFFIXES:
            bad_layers.append((rid, sorted(suffixes)))
        if camadas[rid] != EXPECTED_CAMADAS:
            bad_layers.append((rid, f"camadas={camadas[rid]}"))

    print(f"Regras no inventário: {len(rule_ids)}")
    print(f"Linhas no pacote camadas: {len(rows)}")
    print(f"Regras com cenários: {len(by_rule)}")
    print(f"Esperado por regra: 3 (F, N, E) -> total {len(rule_ids) * 3}")

    ok = True
    if missing_rules:
        ok = False
        print(f"ERRO: {len(missing_rules)} regras sem cenário no pacote camadas")
    if extra_rules:
        ok = False
        print(f"ERRO: {len(extra_rules)} regras no pacote sem correspondência no inventário")
    if len(rows) != len(rule_ids) * 3:
        ok = False
        print(f"ERRO: contagem de linhas {len(rows)} != {len(rule_ids) * 3}")
    if bad_layers:
        ok = False
        print(f"ERRO: {len(bad_layers)} regras com camadas/sufixos incompletos (amostra: {bad_layers[:5]})")

    if ok:
        print(f"\nOK: {len(rule_ids)}/{len(rule_ids)} regras com Feliz + Negativo + Exploratório.")
        return 0
    return 1


if __name__ == "__main__":
    sys.exit(main())
