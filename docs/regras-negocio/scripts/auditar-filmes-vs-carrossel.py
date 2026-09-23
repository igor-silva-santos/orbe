#!/usr/bin/env python3
"""Compara filmes futuros na listagem vs payload do carrossel (homepage)."""

from __future__ import annotations

import json
import sys
import urllib.request

BASE = "https://orbe-seven.vercel.app"


def get_json(path: str):
    with urllib.request.urlopen(f"{BASE}{path}", timeout=120) as r:
        return json.load(r)


def main() -> int:
    home = get_json("/api/homepage")
    filmes_home = home.get("filmes") or []
    ids_home = {f.get("id") for f in filmes_home if f.get("id")}

    listagem = get_json("/api/filmes?filtro=futuros&limit=200")
    if isinstance(listagem, dict):
        items = (
            listagem.get("results")
            or listagem.get("items")
            or listagem.get("filmes")
            or []
        )
    else:
        items = listagem

    faltando = []
    for f in items:
        fid = f.get("id")
        if fid and fid not in ids_home:
            faltando.append(
                {
                    "id": fid,
                    "titulo": f.get("titulo_api") or f.get("title"),
                    "data": f.get("data_lancamento_api") or f.get("releaseDate"),
                }
            )

    print(f"Home carrossel: {len(ids_home)} filmes")
    print(f"Listagem futuros (amostra): {len(items)}")
    print(f"Só em /filmes (não na home): {len(faltando)}")
    for row in faltando[:25]:
        print(f"  - [{row['id']}] {row['titulo']} ({row['data']})")
    if len(faltando) > 25:
        print(f"  ... +{len(faltando) - 25}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
