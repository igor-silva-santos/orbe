#!/usr/bin/env python3
"""Gera fila priorizada para supervisor IA a partir das métricas reais + CSV de cenários."""

from __future__ import annotations

import csv
import json
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
METRICAS = ROOT / "cenarios-camadas" / "execucao" / "metricas-reais-511" / "metricas-reais-511.csv"
CENARIOS = ROOT / "cenarios-camadas" / "cenarios-teste-camadas.csv"
OUT_DIR = ROOT / "cenarios-camadas" / "execucao"
OUT_JSON = OUT_DIR / "supervisor-fila-qa.json"
OUT_MD = OUT_DIR / "supervisor-fila-qa.md"

PRIORITY = {
    "FAIL": 1,
    "PENDENTE_QA_HUMANO": 2,
    "PASS": 3,
}

TIPO_BOOST = {
    "catalogo": -0.3,
    "catalogo_ui": -0.2,
    "passo_a_passo": 0,
    "manual_obrigatorio": 0.1,
    "smoke": 0.2,
}


def load_cenarios() -> dict[str, dict]:
    by_id: dict[str, dict] = {}
    with CENARIOS.open(encoding="utf-8-sig") as f:
        for row in csv.DictReader(f):
            if row.get("Camada_Testagem") != "Feliz":
                continue
            by_id[row["ID_Cenario"]] = row
    return by_id


def score_item(veredito: str, tipo: str, regra: str, arquivo: str) -> float:
    base = float(PRIORITY.get(veredito, 9))
    base += TIPO_BOOST.get(tipo, 0)
    if arquivo == "08-MODAIS.md" and veredito == "FAIL":
        base -= 0.5
    if "carrossel" in (regra or "").lower() or "HOME" in (regra or ""):
        base -= 0.1
    return base


def main() -> int:
    if not METRICAS.is_file():
        print(f"Métricas não encontradas: {METRICAS}")
        return 1

    cenarios = load_cenarios()
    items: list[dict] = []

    with METRICAS.open(encoding="utf-8-sig") as f:
        for row in csv.DictReader(f):
            cid = row["ID_Cenario"]
            cen = cenarios.get(cid, {})
            veredito = row["Veredito"]
            tipo = row.get("Tipo_Execucao", "")
            item = {
                "id_cenario": cid,
                "id_regra": row["ID_Regra"],
                "arquivo": row["Arquivo"],
                "veredito_robo": veredito,
                "tipo_execucao_robo": tipo,
                "evidencia_robo": row.get("Evidencia", ""),
                "passos_executados_robo": row.get("Passos_Executados", ""),
                "nome_regra": cen.get("Nome_Regra", ""),
                "passos": cen.get("Passos", ""),
                "resultado_esperado": cen.get("Resultado_Esperado", ""),
                "tela": cen.get("Tela_Resumo", ""),
                "prioridade_score": score_item(
                    veredito, tipo, row["ID_Regra"], row["Arquivo"]
                ),
                "acao_supervisor": (
                    "reproduzir_e_corrigir_veredito"
                    if veredito in ("FAIL", "PENDENTE_QA_HUMANO")
                    else "amostragem_opcional"
                ),
            }
            items.append(item)

    items.sort(key=lambda x: (x["prioridade_score"], x["id_cenario"]))

    counts = Counter(i["veredito_robo"] for i in items)
    payload = {
        "gerado_em": datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z"),
        "ambiente": "https://orbe-seven.vercel.app",
        "fonte_metricas": str(METRICAS.relative_to(ROOT)),
        "resumo": dict(counts),
        "instrucoes": "Ver QA-SUPERVISOR-IA.md — processar itens por prioridade_score ascendente.",
        "itens": items,
    }

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    OUT_JSON.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")

    lines = [
        "# Fila supervisor IA — 511 Feliz",
        "",
        f"Gerado: {payload['gerado_em']}",
        "",
        "## Resumo robô",
        "",
    ]
    for k, v in sorted(counts.items(), key=lambda kv: PRIORITY.get(kv[0], 99)):
        lines.append(f"- **{k}**: {v}")
    lines.extend(["", "## Próximos 30 (maior prioridade)", ""])
    for it in items[:30]:
        lines.append(
            f"- `{it['id_cenario']}` ({it['veredito_robo']}) — {it['id_regra']} — {it['evidencia_robo'][:80]}"
        )
    lines.append("")
    lines.append(f"Lista completa: `{OUT_JSON.name}`")
    OUT_MD.write_text("\n".join(lines), encoding="utf-8")

    print(f"OK: {len(items)} itens -> {OUT_JSON}")
    print(f"OK: checklist -> {OUT_MD}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
