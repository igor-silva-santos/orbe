#!/usr/bin/env bash
# Uso: ./ops/apk-sha256.sh caminho/orbe-nerd.apk
# Copie o hash para NEXT_PUBLIC_ANDROID_APK_SHA256 no Vercel.
set -euo pipefail
if [[ $# -lt 1 ]]; then
  echo "Uso: $0 arquivo.apk" >&2
  exit 1
fi
sha256sum "$1" | awk '{print toupper($1)}'