# Extensão Chrome Orbe (rascunho)

Pasta reservada para a extensão que sincronizará listas externas com a conta Orbe.

## Estado atual

- Manifest V3 mínimo com popup placeholder.
- A API já expõe `POST /api/watchlist/sync` para itens no formato legado (IndexedDB da extensão antiga).
- A lista “oficial” do app usa `preferencias_usuario_midia` e a página `/minha-lista` (`GET /api/me/lista`).

## Próximos passos (quando as regras de produto estiverem fechadas)

1. Autenticação OAuth ou token copiado do Orbe (definir com segurança).
2. Mapear status da extensão → `status` da API (`quero_assistir`, `acompanhando`, etc.).
3. Resolver `tmdbId` / `anilistId` / `igdbId` antes do sync.
4. Publicar na Chrome Web Store com ícones e permissões mínimas.

## Desenvolvimento local

1. Abra `chrome://extensions`.
2. Ative **Modo do desenvolvedor**.
3. **Carregar sem compactação** → selecione esta pasta `extension/`.
