# Regras de negócio — Busca (`SearchOverlay`) e Header

## SearchOverlay (`frontend/src/components/modals/SearchOverlay.tsx`)

| ID | Regra | Descrição | Evidência |
|----|-------|-----------|-----------|
| RN-BUSCA-001 | Visibilidade | Overlay só renderiza com `isSearchOpen` verdadeiro no store global. | `SearchOverlay.tsx` (linha 211) |
| RN-BUSCA-002 | Histórico e Escape | Mesmo padrão do SuperModal: `pushState({ modal: 'search' })`, `Escape` e `popstate` fecham; ao fechar pode chamar `history.back()`. | `SearchOverlay.tsx` (linhas 40–94) |
| RN-BUSCA-003 | Reset ao fechar | Fechar limpa query, categoria (`todos`), resultados de mídia e pessoas. | `SearchOverlay.tsx` (linhas 47–50) |
| RN-BUSCA-004 | Em alta sem query | Com overlay aberto e lista vazia, busca até 20 itens em `realApi.getTrending`. | `SearchOverlay.tsx` (linhas 96–106) |
| RN-BUSCA-005 | Mínimo de caracteres | Busca na API só com query trimada com length ≥ 2; abaixo disso zera resultados e não carrega. | `SearchOverlay.tsx` (linhas 108–124) |
| RN-BUSCA-006 | Debounce | Requisições aguardam 350 ms após mudança de query/categoria; respostas obsoletas são descartadas por `searchRequestIdRef`. | `SearchOverlay.tsx` (linhas 126–172) |
| RN-BUSCA-007 | Categorias de API | `todos` e `pessoas` mapeiam categoria especial; demais repassam `filmes` \| `series` \| `animes` \| `jogos` para `realApi.search`. | `SearchOverlay.tsx` (linhas 130–136) |
| RN-BUSCA-008 | Agregação de mídia | Resultados de mídia são união plana de filmes, séries, animes e jogos retornados. | `SearchOverlay.tsx` (linhas 138–144) |
| RN-BUSCA-009 | Pessoas na busca | `pessoas` e `dubladores` viram `PersonSearchItem` com `kind` distinto. | `SearchOverlay.tsx` (linhas 145–159) |
| RN-BUSCA-010 | Exibição por categoria UI | Com query: filtra grupos conforme chip selecionado; `pessoas` esconde grids de mídia. | `SearchOverlay.tsx` (linhas 175–199, 306–320) |
| RN-BUSCA-011 | Seção pessoas | Mostra grid de pessoas só se query ≥ 2 chars, categoria `todos` ou `pessoas`, e há resultados. | `SearchOverlay.tsx` (linhas 202–205, 321–333) |
| RN-BUSCA-012 | Contagem de resultados | Total = soma dos grupos de mídia visíveis + pessoas quando `showPeople`. | `SearchOverlay.tsx` (linhas 207–209) |
| RN-BUSCA-013 | Interações no card | Cada `MidiaCard` usa `useMidiaInteraction` e `userInteractions` do store (mesmas regras de lista/login). | `SearchOverlay.tsx` (linhas 10–11, 226–233) |
| RN-BUSCA-014 | Foco visual | Prop `isFocused` ligada a `focusedIndex` (estado preparado; navegação por teclado não implementada no arquivo). | `SearchOverlay.tsx` (linhas 34, 230) |
| RN-BUSCA-015 | Estados vazios | Sem query e sem trending: “Nenhum conteúdo em alta”. Com query e zero resultados: mensagem com termo buscado. | `SearchOverlay.tsx` (linhas 335–341) |

## PersonSearchCard (`frontend/src/components/search/PersonSearchCard.tsx`)

| ID | Regra | Descrição | Evidência |
|----|-------|-----------|-----------|
| RN-BUSCA-020 | Rotas por tipo | `pessoa` → `/pessoa/{id}`; `dublador` → `/dublador/{id}`. | `PersonSearchCard.tsx` (linha 17) |
| RN-BUSCA-021 | Retorno à busca | Antes de navegar, grava `sessionStorage['orbe:returnTo'] = 'search'` e fecha o overlay. | `PersonSearchCard.tsx` (linhas 22–24) |
| RN-BUSCA-022 | Labels | Subtítulo “Ator / equipe” vs “Dublador” conforme `kind`. | `PersonSearchCard.tsx` (linhas 41–43) |

## Header (`frontend/src/components/layout/Header.tsx`)

| ID | Regra | Descrição | Evidência |
|----|-------|-----------|-----------|
| RN-HEADER-001 | Navegação principal | Links fixos: Filmes, Séries, Animes, Jogos, Continuações, Hoje (desktop `lg+`). | `Header.tsx` (linhas 25–32, 127–132) |
| RN-HEADER-002 | Menu “Mais” | Dropdown com Promoções, Eventos, Jogos em Alta, Premiações, Minha Lista (`/minha-lista/animes`), Extensão CR. | `Header.tsx` (linhas 34–41, 133–157) |
| RN-HEADER-003 | Link ativo | `pathname === href` aplica estilo primário/semi-bold; item “Mais” destaca se qualquer `moreLinks` está ativo. | `Header.tsx` (linhas 61–62, 96–101, 137) |
| RN-HEADER-004 | Busca global | Ícone de busca chama `openSearch()` e fecha menu mobile. | `Header.tsx` (linhas 74–77, 163–168) |
| RN-HEADER-005 | Tema | Alterna claro/escuro via `useTheme().toggleTheme` e callback opcional `onThemeToggle`. | `Header.tsx` (linhas 84–87, 170–176) |
| RN-HEADER-006 | Notificações | Ícone abre `openNotificationModal`; badge se `notificationCount > 0`, cap “9+”. | `Header.tsx` (linhas 79–82, 178–187) |
| RN-HEADER-007 | Usuário autenticado | Menu: Minha lista (`/minha-lista`), Meu Perfil, Sair (`logout` + redirect `/`). | `Header.tsx` (linhas 190–227, 89–94) |
| RN-HEADER-008 | Visitante desktop | Links Entrar e Inscreva-se (`/login`, `/register`) visíveis em `md+`. | `Header.tsx` (linhas 229–243) |
| RN-HEADER-009 | Menu mobile | Em `< lg`, hamburger lista catálogo, descobrir (moreLinks) e bloco auth (lista/perfil ou login/register). | `Header.tsx` (linhas 255–338) |
| RN-HEADER-010 | Fechar dropdowns | Clique fora do menu “Mais” fecha; overlay fixo fecha menu do usuário. | `Header.tsx` (linhas 64–72, 342–344) |

## Integração busca ↔ modal ↔ header

| ID | Regra | Descrição | Evidência |
|----|-------|-----------|-----------|
| RN-HEADER-020 | Card na busca abre modal | `MidiaCard` chama `openSuperModal`, que fecha busca automaticamente (RN-MODAL-013). | `appStore.ts` (257–263); `MidiaCard.tsx` (218–220) |
| RN-HEADER-021 | Voltar da pessoa | Página pessoa lê `orbe:returnTo === 'search'` e reabre busca após `router.back()`. | `pessoa/[id]/page.tsx` (74–80) |
