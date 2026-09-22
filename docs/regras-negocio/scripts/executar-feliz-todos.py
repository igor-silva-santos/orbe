#!/usr/bin/env python3
"""Executa todos os manifests Feliz em sequência (produção)."""

import subprocess
import sys
from pathlib import Path

MANIFEST_DIR = Path(__file__).resolve().parents[1] / "cenarios-camadas" / "execucao" / "manifests"
SCRIPT = Path(__file__).resolve().parent / "executar-feliz-lote.py"


def main() -> int:
    manifests = sorted(MANIFEST_DIR.glob("*.json"))
    for m in manifests:
        rc = subprocess.call([sys.executable, str(SCRIPT), m.name, "--executor", "QA multitask sequencial"])
        if rc != 0:
            print("Falha no lote", m.name, file=sys.stderr)
            return rc
    return 0


if __name__ == "__main__":
    sys.exit(main())
