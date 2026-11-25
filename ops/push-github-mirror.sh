#!/usr/bin/env bash
# Espelha a branch atual no GitHub (uso local, uma vez ou sob demanda).
# Requer: GITHUB_MIRROR_TOKEN (PAT fine-grained com Contents: Read and write no repo orbe).
set -euo pipefail
BRANCH="${1:-$(git branch --show-current)}"
TOKEN="${GITHUB_MIRROR_TOKEN:?Defina GITHUB_MIRROR_TOKEN}"
REMOTE_URL="https://x-access-token:${TOKEN}@github.com/igor-silva-santos/orbe.git"
git remote remove github 2>/dev/null || true
git remote add github "$REMOTE_URL"
git push github "HEAD:refs/heads/${BRANCH}" --force-with-lease
echo "OK: ${BRANCH} → github"