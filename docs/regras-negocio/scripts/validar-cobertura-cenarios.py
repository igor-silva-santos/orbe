#!/usr/bin/env python3
"""Valida que cada ID_Regra do inventário tem ≥1 cenário na planilha oficial."""

from __future__ import annotations

import csv
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RULES_CSV = ROOT / "regras-negocio-qa.csv"
SCENARIOS_CSV = ROOT / "cenarios-teste.csv"


def load_ids(path: Path, column: str) -> set[str]:
    with path.open(encoding="utf-8-sig", newline="") as f:
        return {row[column].strip() for row in csv.DictReader(f) if row.get(column, "").strip()}


def main() -> int:
    if not RULES_CSV.is_file():
        print(f"ERRO: inventário não encontrado: {RULES_CSV}", file=sys.stderr)
        return 2
    if not SCENARIOS_CSV.is_file():
        print(f"ERRO: planilha de cenários não encontrada: {SCENARIOS_CSV}", file=sys.stderr)
        return 2

    rule_ids = load_ids(RULES_CSV, "ID")
    scenario_rows: list[dict[str, str]] = list(
        csv.DictReader(SCENARIOS_CSV.open(encoding="utf-8-sig", newline=""))
    )
    scenario_rule_ids = {r.get("ID_Regra", "").strip() for r in scenario_rows if r.get("ID_Regra", "").strip()}

    missing = sorted(rule_ids - scenario_rule_ids)
    orphan = sorted(scenario_rule_ids - rule_ids)
    empty_scenario = [
        r["ID_Regra"]
        for r in scenario_rows
        if not (r.get("Passos") or "").strip() or (r.get("Status_Elaboracao") or "").strip() == "A elaborar"
    ]

    print(f"Regras no inventário: {len(rule_ids)}")
    print(f"Regras com ≥1 linha na planilha: {len(scenario_rule_ids & rule_ids)}")
    print(f"Linhas na planilha de cenários: {len(scenario_rows)}")

    ok = True
    if missing:
        ok = False
        print(f"\nFALTA cenário para {len(missing)} regra(s):")
        for rid in missing[:50]:
            print(f"  - {rid}")
        if len(missing) > 50:
            print(f"  ... e mais {len(missing) - 50}")

    if orphan:
        ok = False
        print(f"\nCenários com ID_Regra inválido ({len(orphan)}):")
        for rid in orphan[:20]:
            print(f"  - {rid}")

    # Aviso (não falha cobertura mínima): ainda não elaborados
    not_ready = [r for r in scenario_rows if (r.get("Status_Elaboracao") or "").strip() in ("A elaborar", "")]
    if not_ready:
        print(f"\nAVISO: {len(not_ready)} linha(s) ainda 'A elaborar' ou sem passos (auditoria TL deve bloquear).")

    tl_pending = [r for r in scenario_rows if (r.get("TL_Auditoria") or "").strip() in ("Pendente", "")]
    approved = [r for r in scenario_rows if (r.get("TL_Auditoria") or "").strip() == "Aprovado"]
    print(f"\nTL: Pendente={len(tl_pending)} | Aprovado={len(approved)} (linhas, não regras)")

    if ok and len(missing) == 0:
        print("\nOK: 511/511 regras com pelo menos 1 linha de cenário na planilha.")
        return 0

    print("\nFALHA: cobertura incompleta ou IDs órfãos.")
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
