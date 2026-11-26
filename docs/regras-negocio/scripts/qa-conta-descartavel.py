#!/usr/bin/env python3
"""
Cria conta QA em produção (register) e opcionalmente exclui no teardown (DELETE /users/me).
Uso:
  export QA_AUTO_REGISTER=1   # gera email qa+...@ se QA_EMAIL vazio
  python3 qa-conta-descartavel.py create
  python3 qa-conta-descartavel.py delete   # exige QA_EMAIL, QA_PASSWORD e token em QA_TOKEN ou arquivo
"""

from __future__ import annotations

import json
import os
import secrets
import sys
import time
import urllib.error
import urllib.request

BASE = os.environ.get("ORBE_BASE_URL", "https://orbe-seven.vercel.app").rstrip("/")
API = BASE if "/api" in BASE else BASE  # frontend rewrites; API calls use same host paths


def api(method: str, path: str, body: dict | None = None, token: str | None = None) -> tuple[int, dict | str]:
    url = f"{BASE}{path}"
    data = None
    headers = {"Content-Type": "application/json"}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    if body is not None:
        data = json.dumps(body).encode("utf-8")
    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            raw = resp.read().decode("utf-8")
            if resp.status == 204 or not raw:
                return resp.status, ""
            return resp.status, json.loads(raw)
    except urllib.error.HTTPError as e:
        raw = e.read().decode("utf-8")
        try:
            return e.code, json.loads(raw)
        except json.JSONDecodeError:
            return e.code, raw


def creds() -> tuple[str, str, str]:
    email = os.environ.get("QA_EMAIL", "").strip()
    password = os.environ.get("QA_PASSWORD", "").strip()
    if not email and os.environ.get("QA_AUTO_REGISTER") == "1":
        email = f"qa.orbe+{int(time.time())}.{secrets.token_hex(4)}@discard.test"
    if not password:
        password = os.environ.get("QA_DEFAULT_PASSWORD", "QaOrbeTest8!")
    nome = os.environ.get("QA_NOME", "QA Orbe Descartável")
    if not email:
        print("Defina QA_EMAIL ou QA_AUTO_REGISTER=1", file=sys.stderr)
        sys.exit(1)
    return nome, email, password


def cmd_create() -> None:
    nome, email, password = creds()
    code, body = api("POST", "/api/auth/register", {"nome": nome, "email": email, "password": password})
    if code not in (200, 201):
        print(f"register falhou {code}: {body}", file=sys.stderr)
        sys.exit(1)
    token = body.get("token") if isinstance(body, dict) else None
    out = {"email": email, "password": password, "token": token}
    print(json.dumps(out, indent=2))
    path = os.environ.get("QA_CREDS_FILE")
    if path:
        with open(path, "w", encoding="utf-8") as f:
            json.dump(out, f)


def cmd_delete() -> None:
    _, email, password = creds()
    token = os.environ.get("QA_TOKEN", "").strip()
    creds_file = os.environ.get("QA_CREDS_FILE")
    if not token and creds_file and os.path.isfile(creds_file):
        with open(creds_file, encoding="utf-8") as f:
            token = json.load(f).get("token", "")
    if not token:
        code, body = api("POST", "/api/auth/login", {"email": email, "password": password})
        if code != 200:
            print(f"login falhou {code}: {body}", file=sys.stderr)
            sys.exit(1)
        token = body.get("token") if isinstance(body, dict) else ""
    code, body = api("DELETE", "/api/users/me", {"password": password}, token=token)
    if code != 204:
        print(f"delete falhou {code}: {body}", file=sys.stderr)
        sys.exit(1)
    print("conta excluída:", email)


def main() -> None:
    if len(sys.argv) < 2:
        print("Uso: qa-conta-descartavel.py create|delete", file=sys.stderr)
        sys.exit(1)
    if sys.argv[1] == "create":
        cmd_create()
    elif sys.argv[1] == "delete":
        cmd_delete()
    else:
        sys.exit(1)


if __name__ == "__main__":
    main()
