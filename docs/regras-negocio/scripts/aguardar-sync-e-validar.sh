#!/usr/bin/env bash
# Poll até syncActive=false, então validar-sync-anos 2027–2030.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
EV="$ROOT/cenarios-camadas/execucao/evidencias"
mkdir -p "$EV"
DATE="$(date -u +%Y-%m-%d)"
LOG="$EV/validar-sync-anos-${DATE}.txt"

echo "[$(date -u -Iseconds)] aguardando syncActive=false..."
while true; do
  active="$(curl -sS https://orbe-7bu0.onrender.com/api/sync/status | python3 -c "import sys,json; print(json.load(sys.stdin).get('syncActive'))")"
  if [[ "$active" == "False" || "$active" == "false" ]]; then
    break
  fi
  sleep 120
done

echo "[$(date -u -Iseconds)] sync parado; rodando validar-sync-anos..."
{
  echo "=== $(date -u -Iseconds) ==="
  python3 "$ROOT/scripts/validar-sync-anos.py" --start 2027 --end 2030 --min-by-year 1
} | tee "$LOG"
echo "[$(date -u -Iseconds)] salvo em $LOG"
