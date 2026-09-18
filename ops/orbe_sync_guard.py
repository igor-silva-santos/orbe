#!/usr/bin/env python3
"""Opera├º├úo segura do sync do Orbe, sem deploy e sem registrar segredos."""

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
# GitLab.com free mata o job em ~60 min. O watch externo (Cloudflare) cobre o resto.
WATCH_INTERVAL_SECONDS = int(os.environ.get("ORBE_WATCH_INTERVAL_SECONDS", "240"))
WATCH_MAX_MINUTES = int(os.environ.get("ORBE_WATCH_MAX_MINUTES", "50"))


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
        # N├úo imprime corpo ou cabe├ºalhos para evitar vazamento acidental.
        raise RuntimeError(f"{path} respondeu HTTP {error.code}") from error
    except (urllib.error.URLError, TimeoutError) as error:
        raise RuntimeError(f"{path} indispon├¡vel: {error.reason}") from error


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


def watch_until_idle(initial: dict) -> int:
    deadline = time.monotonic() + WATCH_MAX_MINUTES * 60
    status = initial
    rounds = 0
    while time.monotonic() < deadline:
        if status.get("syncActive") is not True:
            print("Sync inativo ÔÇö ping encerrado.")
            return 0
        remaining = int(deadline - time.monotonic())
        print(f"Watch #{rounds + 1}: ativo phase={status.get('phase')} pct={status.get('progressPercent')} restante={remaining}s")
        time.sleep(WATCH_INTERVAL_SECONDS)
        request_json("/api/health")
        status = public_status()
        rounds += 1
    print(
        f"Limite de {WATCH_MAX_MINUTES} min atingido com sync ainda ativo. "
        "O Cloudflare Worker deve continuar o ping.",
        file=sys.stderr,
    )
    return 0


def maybe_resume() -> dict:
    status = public_status()
    if status.get("syncActive") is True:
        print("Sync j├í est├í ativo; nenhuma chamada mutativa foi feita.")
        return status

    if not (status.get("resumeAvailable") is True or status.get("interrupted") is True):
        print("N├úo h├í checkpoint interrompido retom├ível; nenhuma chamada mutativa foi feita.")
        return status

    secret = os.environ.get("SYNC_SECRET")
    if not secret:
        print("Vari├ível protegida SYNC_SECRET n├úo configurada.", file=sys.stderr)
        raise RuntimeError("SYNC_SECRET ausente")

    request_json("/api/run-sync-resume", method="POST", secret=secret)
    print("Uma ├║nica retomada autorizada foi solicitada.")
    for _ in range(4):
        time.sleep(15)
        status = public_status()
        if status.get("syncActive") is True:
            print("Retomada confirmada: sync ativo.")
            return status
    print("A API aceitou a retomada, mas syncActive n├úo ficou true em 60 segundos.", file=sys.stderr)
    raise RuntimeError("resume sem syncActive")


def main() -> int:
    if ACTION not in {"health", "status", "resume", "watch"}:
        print("ORBE_OPS_ACTION deve ser health, status, resume ou watch.", file=sys.stderr)
        return 2

    print(f"A├º├úo operacional: {ACTION}")
    request_json("/api/health")
    print("API online.")

    if ACTION == "health":
        return 0

    if ACTION == "status":
        public_status()
        return 0

    try:
        status = maybe_resume()
    except RuntimeError as error:
        if str(error) == "SYNC_SECRET ausente":
            return 2
        return 1

    if ACTION == "resume":
        return 0

    return watch_until_idle(status)


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except (RuntimeError, json.JSONDecodeError) as error:
        print(f"Falha operacional: {error}", file=sys.stderr)
        raise SystemExit(1)
