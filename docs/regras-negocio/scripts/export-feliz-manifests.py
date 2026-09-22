#!/usr/bin/env python3
"""Exporta manifests JSON por tela (cenários Feliz) para execução em produção."""

import csv
import json
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CSV_PATH = ROOT / "cenarios-camadas" / "cenarios-teste-camadas.csv"
OUT = ROOT / "cenarios-camadas" / "execucao" / "manifests"
PROD = "https://orbe-seven.vercel.app"


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    by_file: dict[str, list] = defaultdict(list)
    with CSV_PATH.open(encoding="utf-8-sig") as f:
        for r in csv.DictReader(f):
            if r["Camada_Testagem"] != "Feliz":
                continue
            by_file[r["Arquivo_Inventario"]].append(
                {
                    "id": r["ID_Cenario"],
                    "regra": r["ID_Regra"],
                    "titulo": r["Titulo_Cenario"],
                    "passos": r["Passos"],
                    "resultado_esperado": r["Resultado_Esperado"],
                    "pre": r["Pre_condicoes_TestE"],
                    "tela": r["Tela_Resumo"],
                }
            )
    for arquivo, items in sorted(by_file.items()):
        slug = arquivo.replace(".md", "")
        payload = {
            "arquivo": arquivo,
            "ambiente": PROD,
            "total": len(items),
            "cenarios": items,
        }
        (OUT / f"{slug}.json").write_text(
            json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8"
        )
        print(slug, len(items))
    print("total", sum(len(v) for v in by_file.values()))


if __name__ == "__main__":
    main()
