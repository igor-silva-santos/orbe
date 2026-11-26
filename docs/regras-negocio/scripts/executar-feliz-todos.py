#!/usr/bin/env python3
"""Executa todos os manifests Feliz em sequência (produção)."""

import subprocess
import sys
from pathlib import Path

MANIFEST_DIR = Path(__file__).resolve().parents[1] / "cenarios-camadas" / "execucao" / "manifests"
SCRIPT = Path(__file__).resolve().parent / "executar-feliz-lote.py"


def main() -> int:
    out_dir = sys.argv[1] if len(sys.argv) > 1 else "prod"
    executor = sys.argv[2] if len(sys.argv) > 2 else "QA multitask sequencial"
    manifests = sorted(MANIFEST_DIR.glob("*.json"))
    for m in manifests:
        rc = subprocess.call(
            [
                sys.executable,
                str(SCRIPT),
                m.name,
                "--executor",
                executor,
                "--out-dir",
                out_dir,
            ]
        )
        if rc != 0:
            print("Falha no lote", m.name, file=sys.stderr)
            return rc
    return 0


if __name__ == "__main__":
    sys.exit(main())
