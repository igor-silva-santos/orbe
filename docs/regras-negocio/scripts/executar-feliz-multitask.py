#!/usr/bin/env python3
"""Executa manifests Feliz em ondas paralelas (multitask QA por tela)."""

import subprocess
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

MANIFEST_DIR = Path(__file__).resolve().parents[1] / "cenarios-camadas" / "execucao" / "manifests"
SCRIPT = Path(__file__).resolve().parent / "executar-feliz-lote.py"
WAVE_SIZE = 4


def run_one(manifest: Path, out_dir: str, executor: str) -> int:
    return subprocess.call(
        [
            sys.executable,
            str(SCRIPT),
            manifest.name,
            "--executor",
            executor,
            "--out-dir",
            out_dir,
        ]
    )


def main() -> int:
    out_dir = sys.argv[1] if len(sys.argv) > 1 else "prod-rodada-2"
    executor = sys.argv[2] if len(sys.argv) > 2 else "QA sênior multitask rodada 2 (pós-deploy)"
    manifests = sorted(MANIFEST_DIR.glob("*.json"))
    failed = []
    for i in range(0, len(manifests), WAVE_SIZE):
        wave = manifests[i : i + WAVE_SIZE]
        with ThreadPoolExecutor(max_workers=len(wave)) as pool:
            futures = {pool.submit(run_one, m, out_dir, executor): m for m in wave}
            for fut in as_completed(futures):
                m = futures[fut]
                rc = fut.result()
                if rc != 0:
                    failed.append(m.name)
    if failed:
        print("Falhas:", failed, file=sys.stderr)
        return 1
    print("OK:", len(manifests), "lotes em", out_dir)
    return 0


if __name__ == "__main__":
    sys.exit(main())
