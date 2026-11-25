#!/usr/bin/env bash
# Publica a master do GitLab em github.com/igor-silva-santos/orbe.
# Se o GitHub estiver à frente, faz merge. Não reescreve a master do GitHub.
set -euo pipefail

TOKEN="${GITHUB_MIRROR_TOKEN:-${GH_MIRROR_TOKEN:-}}"
if [ -z "${TOKEN}" ]; then
  echo "GITHUB_MIRROR_TOKEN não chegou neste job."
  echo "GitLab → Settings → CI/CD → Variables → GITHUB_MIRROR_TOKEN"
  echo "  • Tipo: Variable. Masked. Environment: All."
  echo "  • Protect variable LIGADO somente se a branch master for protegida."
  echo "  • Protect variable DESLIGADO se a master não for protegida (senão o job vê o token vazio)."
  echo "No GitHub, crie um fine-grained token só no repo igor-silva-santos/orbe:"
  echo "  • Contents: Read and write"
  echo "  • Workflows: Read and write"
  exit 1
fi

SHA="${CI_COMMIT_SHA:-$(git rev-parse HEAD)}"
REPO_URL="https://github.com/igor-silva-santos/orbe.git"
BASIC="$(printf 'x-access-token:%s' "${TOKEN}" | base64 -w 0)"
AUTH=( -c "http.extraHeader=Authorization: Basic ${BASIC}" )

echo "Commit do GitLab: ${SHA}"

HTTP_CODE="$(curl -sS -o /tmp/gh-repo.json -w '%{http_code}' \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Accept: application/vnd.github+json" \
  "https://api.github.com/repos/igor-silva-santos/orbe")"
echo "API GitHub HTTP ${HTTP_CODE}"
if [ "${HTTP_CODE}" != "200" ]; then
  head -c 300 /tmp/gh-repo.json || true
  echo
  echo "O token não leu o repositório. Confira o valor no GitLab, sem aspas e sem espaço no fim."
  exit 1
fi

git fetch --unshallow 2>/dev/null || true
git "${AUTH[@]}" fetch "${REPO_URL}" "+refs/heads/master:refs/remotes/github/master"

if ! git rev-parse --verify --quiet refs/remotes/github/master >/dev/null; then
  echo "GitHub ainda não tem master. Enviando este commit."
  git "${AUTH[@]}" push "${REPO_URL}" "${SHA}:refs/heads/master"
  echo "OK: https://github.com/igor-silva-santos/orbe/commit/${SHA}"
  exit 0
fi

GH="$(git rev-parse refs/remotes/github/master)"
echo "GitHub master: ${GH}"

if git merge-base --is-ancestor "${SHA}" "${GH}"; then
  echo "A master do GitHub já contém este commit."
  exit 0
fi

push_ref() {
  local ref="$1"
  if ! git "${AUTH[@]}" push "${REPO_URL}" "${ref}:refs/heads/master" 2>/tmp/push.log; then
    echo "--- git push ---"
    cat /tmp/push.log
    if grep -qi 'workflow' /tmp/push.log; then
      echo "O token precisa de Workflows: Read and write no repo orbe."
    fi
    if grep -qi 'protected' /tmp/push.log; then
      echo "A master do GitHub recusou push direto. Libere o token nessa regra, ou desligue a exigência de pull request na master."
    fi
    exit 1
  fi
}

if git merge-base --is-ancestor "${GH}" "${SHA}"; then
  echo "A master do GitHub está atrás. Enviando fast-forward."
  push_ref "${SHA}"
  echo "OK: https://github.com/igor-silva-santos/orbe/commit/${SHA}"
  exit 0
fi

echo "As masters divergiram. Juntando o que já está no GitHub a este commit, sem force."
git config user.email "gitlab-ci@orbenerd.local"
git config user.name "GitLab Mirror"
if ! git merge --no-ff --no-edit -m "merge: preserva a master do GitHub ao espelhar o GitLab" refs/remotes/github/master; then
  echo "Conflito ao juntar as duas masters. Arquivos:"
  git diff --name-only --diff-filter=U || true
  echo "Nada foi forçado no GitHub."
  exit 1
fi

MERGED="$(git rev-parse HEAD)"
push_ref "${MERGED}"
echo "OK: https://github.com/igor-silva-santos/orbe/commit/${MERGED}"
