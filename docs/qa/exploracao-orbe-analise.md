# Análise da exploração Orbe (automática)

## Metodologia

1. **6 áreas sequenciais** (simulam “agentes” com contexto isolado por domínio): shell, home, catálogos, promoções, hoje/outras, modais+busca.
2. **Coleta**: `console.error`, exceções de página, HTTP ≥400 em `/api/`, falhas de rede relevantes, lentidão, interações sem efeito.
3. **Referência humana**: `docs/regras-negocio/` (511 cenários) — o robô **não** cobre todos; cobre varredura repetível + cliques principais.

## Ruído filtrado (não é bug de produto)

| Padrão | Motivo |
|--------|--------|
| `net::ERR_ABORTED` em `/_rsc=` | Prefetch/cancelamento de RSC do Next ao trocar de rota |
| Erros de favicon / CSP / ResizeObserver | Ambiente / browser |

## Achados que exigem olho humano

- **Lentidão** em abrir SuperModal na home (>15s em alguns runs): pode ser API de detalhes ou rede; monitorar `/api/` nos traces Playwright.
- **Hoje sem cards**: se todas as seções estiverem desligadas no `localStorage` ou API vazia — mensagem esperada; explorer agora reativa chips antes de clicar.
- **511 cenários** restantes: login, minha-lista logada, admin, extensão instalada, edge cases de continuações — rodar planilha QA ou ampliar explorer com credenciais de teste.

## Como repetir após cada deploy

```bash
cd frontend && npm run test:e2e:explore
```

Arquivos: `exploracao-orbe-latest.json` + `.md`.

## Próximos passos sugeridos

1. Credenciais E2E (`ORBE_TEST_USER`) para `/minha-lista`, `/perfil`, `/configuracoes`.
2. Specs paralelos por área (`ORBE_EXPLORE_AREA=home`) para CI mais rápido.
3. Gravar trace em falhas `interaction` / `missing_ui` (já `retain-on-failure` no Playwright).
