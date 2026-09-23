#!/usr/bin/env python3
"""Smoke pós-sync: contagem by-year e year-tbd para um intervalo de anos."""

from __future__ import annotations

import argparse
import json
import sys
import urllib.request

DEFAULT_BASE = "https://orbe-seven.vercel.app"


def count(path: str, base: str) -> int:
    with urllib.request.urlopen(f"{base}{path}", timeout=120) as r:
        data = json.load(r)
    return len(data) if isinstance(data, list) else 0


def main() -> int:
    p = argparse.ArgumentParser()
    p.add_argument("--start", type=int, default=2027)
    p.add_argument("--end", type=int, default=2030)
    p.add_argument("--base", default=DEFAULT_BASE)
    p.add_argument("--min-by-year", type=int, default=1, help="Falha se by-year < N")
    args = p.parse_args()

    failed = False
    for year in range(args.start, args.end + 1):
        by_year = count(f"/api/filmes/by-year?year={year}", args.base)
        tbd = count(f"/api/filmes/year-tbd?year={year}", args.base)
        ok = by_year >= args.min_by_year or tbd >= args.min_by_year
        status = "OK" if ok else "FAIL"
        print(f"{status} {year}: by-year={by_year} year-tbd={tbd}")
        if not ok:
            failed = True

    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
