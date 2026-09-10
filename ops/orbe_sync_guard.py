#!/usr/bin/env python3
"""Operação segura do sync do Orbe, sem deploy e sem registrar segredos."""

from __future__ import annotations

import json
import os
import sys
import time
import urllib.error
import urllib.request


API_URL = os.environ.get("ORBE_API_URL", "https://orbe-7bu0.onrender.com").rstrip("/")
ACTION = os.environ.get("ORBE_OPS_ACTION", "status").strip().lower()
TIMEOUT_SECONDS = 150


def request_json(path: str, *, method: str = "GET", secret: str | None = None) -> dict:
    headers = {"Accept": "application/json", "User-Agent": "orbe-gitlab-ops/1.0"}
    if secret:
        headers["x-sync-secret"] = secret

    request = urllib.request.Request(
        f"{API_URL}{path}",
        method=method,
        headers=headers,
        data=b"" if method == "POST" else None,
    )
    try:
        with urllib.request.urlopen(request, timeout=TIMEOUT_SECONDS) as response:
            body = response.read().decode("utf-8")
            if response.status < 200 or response.status >= 300:
                raise RuntimeError(f"{path} respondeu HTTP {response.status}")
            return json.loads(body) if body else {}
    except urllib.error.HTTPError as error:
        # Não imprime corpo ou cabeçalhos para evitar vazamento acidental.
        raise RuntimeError(f"{path} respondeu HTTP {error.code}") from error
    except (urllib.error.URLError, TimeoutError) as error:
        raise RuntimeError(f"{path} indisponível: {error.reason}") from error


def public_status() -> dict:
    status = request_json("/api/sync/status")
    summary = {
        "syncActive": status.get("syncActive"),
        "interrupted": status.get("interrupted"),
        "resumeAvailable": status.get("resumeAvailable"),
        "phase": status.get("phase"),
        "progressPercent": status.get("progressPercent"),
        "lastProgressAt": status.get("lastProgressAt"),
    }
    print("Status:", json.dumps(summary, ensure_ascii=False, separators=(",", ":")))
    return status


def main() -> int:
    if ACTION not in {"health", "status", "resume"}:
        print("ORBE_OPS_ACTION deve ser health, status ou resume.", file=sys.stderr)
        return 2

    print(f"Ação operacional: {ACTION}")
    request_json("/api/health")
    print("API online.")

    if ACTION == "health":
        return 0

    status = public_status()
    if ACTION == "status":
        return 0

    if status.get("syncActive") is True:
        print("Sync já está ativo; nenhuma chamada mutativa foi feita.")
        return 0

    if not (status.get("resumeAvailable") is True and status.get("interrupted") is True):
        print("Não há checkpoint interrompido retomável; nenhuma chamada mutativa foi feita.")
        return 0

    secret = os.environ.get("SYNC_SECRET")
    if not secret:
        print("Variável protegida SYNC_SECRET não configurada.", file=sys.stderr)
        return 2

    request_json("/api/run-sync-resume", method="POST", secret=secret)
    print("Uma única retomada autorizada foi solicitada.")

    # Confirma apenas a aceitação/início. O keepalive é responsabilidade separada.
    for _ in range(4):
        time.sleep(15)
        status = public_status()
        if status.get("syncActive") is True:
            print("Retomada confirmada: sync ativo.")
            return 0

    print("A API aceitou a retomada, mas syncActive não ficou true em 60 segundos.", file=sys.stderr)
    return 1


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except (RuntimeError, json.JSONDecodeError) as error:
        print(f"Falha operacional: {error}", file=sys.stderr)
        raise SystemExit(1)
