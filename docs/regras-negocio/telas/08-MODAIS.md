# Regras de negócio — Modais (SuperModal e subcomponentes)

Documentação derivada do código em `frontend/src/components/modals/` e subpastas. Cada regra referencia o arquivo e trecho que a implementa.

## SuperModal (`SuperModal.tsx`)

| ID | Regra | Descrição | Evidência |
|----|-------|-----------|-----------|
| RN-MODAL-001 | Abertura condicional | O overlay só renderiza quando `isSuperModalOpen` é verdadeiro e existem `midia` e `type` em `superModalData`. | `frontend/src/components/modals/SuperModal.tsx` (linhas 317–317) |
| RN-MODAL-002 | Fechamento por rota | Se o usuário navega para outra rota enquanto o modal está aberto, o modal fecha sem chamar `history.back()`. | `frontend/src/components/modals/SuperModal.tsx` (linhas 47–60) |
| RN-MODAL-003 | Carregamento de detalhes | Ao abrir, o modal zera modo edição, limpa `details` e busca `GET /{type}s/{id}/details` com timeout `DETAILS_TIMEOUT_MS`. Requisições duplicadas para o mesmo par `type-id` são ignoradas. | `frontend/src/components/modals/SuperModal.tsx` (linhas 62–93); `frontend/src/lib/api.ts` |
| RN-MODAL-004 | Fallback em erro de API | Se a busca de detalhes falha, `details` recebe o stub `midia` já conhecido; a UI de erro só aparece se `details` permanecer nulo após o fluxo (cenário atípico). | `frontend/src/components/modals/SuperModal.tsx` (linhas 75–77, 279–284) |
| RN-MODAL-005 | Histórico do navegador | Com o modal aberto, empilha `history.pushState({ modal: 'super' })` uma vez; fechar com botão/overlay/Escape chama `history.back()` apenas se esse estado foi empilhado. `popstate` fecha o modal sem voltar de novo. | `frontend/src/components/modals/SuperModal.tsx` (linhas 97–146) |
| RN-MODAL-006 | Scroll do body | `document.body.style.overflow = 'hidden'` enquanto aberto; restaura `auto` ao fechar ou no cleanup do effect. | `frontend/src/components/modals/SuperModal.tsx` (linhas 129–143) |
| RN-MODAL-007 | Fechar por overlay | Clique no backdrop (fora do card) fecha o modal (`e.target === e.currentTarget`). | `frontend/src/components/modals/SuperModal.tsx` (linha 323) |
| RN-MODAL-008 | Escape fecha | Tecla Escape previne default e chama `handleClose`. | `frontend/src/components/modals/SuperModal.tsx` (linhas 115–118) |
| RN-MODAL-009 | Premiações no topo | Se houver `premiacoes` em `details` ou no stub `midia`, exibe `AwardsBlock` acima do conteúdo. | `frontend/src/components/modals/SuperModal.tsx` (linhas 319–341) |
| RN-MODAL-010 | Modo edição admin | Botão de edição visível apenas se `user.role === 'admin'`. Alterna `isEditMode` e renderiza formulários por tipo. | `frontend/src/components/modals/SuperModal.tsx` (linhas 328–331, 287–299) |
| RN-MODAL-011 | Conteúdo por tipo | Em visualização: `AnimeModalContent`, `FilmeModalContent`, `SerieModalContent` ou `JogoModalContent`. Tipos desconhecidos retornam `null`. | `frontend/src/components/modals/SuperModal.tsx` (linhas 302–314) |
| RN-MODAL-012 | Loading de detalhes | Enquanto `isLoadingDetails`, mostra `LoadingIndicator` com mensagem fixa. | `frontend/src/components/modals/SuperModal.tsx` (linhas 268–273) |
| RN-MODAL-013 | Abertura fecha busca | `openSuperModal` no store define `isSearchOpen: false` para o detalhe não ficar atrás da busca. | `frontend/src/stores/appStore.ts` (linhas 257–263) |

## Calendário (`CalendarModal.tsx` + `handleCalendarAction` em SuperModal)

| ID | Regra | Descrição | Evidência |
|----|-------|-----------|-----------|
| RN-MODAL-020 | Autenticação obrigatória | Adicionar eventos ao calendário exige `isAuthenticated`; caso contrário toast de erro e fecha o submodal. | `frontend/src/components/modals/SuperModal.tsx` (linhas 171–175) |
| RN-MODAL-021 | Opções por tipo de mídia | Filme: lançamento ou ingresso (formulário data/hora/local). Anime: lançamento ou eventos recorrentes semanais. Série e jogo: apenas lançamento único. | `frontend/src/components/modals/CalendarModal.tsx` (linhas 43–109) |
| RN-MODAL-022 | Recorrência anime/série | Com `recurring: true` e tipo `anime` ou `serie`, gera um evento por episódio (contagem `episodes` ou `numberOfEpisodes` ou default 12), espaçados 7 dias. | `frontend/src/components/modals/SuperModal.tsx` (linhas 187–205) |
| RN-MODAL-023 | Lançamento sem data | Evento de estreia (`release`) sem `baseDate` encerra com warn e fecha modal, sem persistir. | `frontend/src/components/modals/SuperModal.tsx` (linhas 178–184) |
| RN-MODAL-024 | Ingresso cinema | Tipo `ticket` monta evento `cinema` com data, hora e local do formulário. | `frontend/src/components/modals/SuperModal.tsx` (linhas 217–228) |
| RN-MODAL-025 | Persistência API | Eventos válidos são enviados via `orbeNerdApi.addCalendarEvents`; sucesso/erro via toast. | `frontend/src/components/modals/SuperModal.tsx` (linhas 236–244) |
| RN-MODAL-026 | Botão calendário no filme | Em `FilmeModalContent`, botão “Adicionar ao Calendário” só aparece se a data de lançamento é futura (`releaseDate > now`). | `frontend/src/components/modals/super-modal/FilmeModalContent.tsx` (linhas 39–42, 88–92) |

## Avaliação (`RatingModal` + `RatingModalWrapper`)

| ID | Regra | Descrição | Evidência |
|----|-------|-----------|-----------|
| RN-MODAL-030 | Fluxo no card | “Já Assisti” / “Já Joguei” no `MidiaCard` abre `RatingModal` (não passa por `useMidiaInteraction`). Desabilitado se a mídia ainda não lançou (`!hasReleased`). | `frontend/src/components/media/MidiaCard.tsx` (linhas 214–227) |
| RN-MODAL-031 | Status persistido | Avaliação grava `status: 'assistido'` para qualquer tipo (inclusive jogo). | `frontend/src/components/modals/RatingModalWrapper.tsx` (linhas 24–26) |
| RN-MODAL-032 | Campos da avaliação | POST `/me/interactions` com `avaliacao` (`gostei` \| `amei` \| `nao_gostei`) e `comentario` opcional. | `frontend/src/components/modals/RatingModalWrapper.tsx` (linhas 36–48) |
| RN-MODAL-033 | Token obrigatório | Sem token em `localStorage`, toast e fecha modal sem salvar. | `frontend/src/components/modals/RatingModalWrapper.tsx` (linhas 29–34) |

## Filme — visualização (`FilmeModalContent`, `FilmeInfoBlock`)

| ID | Regra | Descrição | Evidência |
|----|-------|-----------|-----------|
| RN-MODAL-040 | Título e pôster | Usa `resolveFilmeTitle` e `resolveFilmePoster` para exibição. | `frontend/src/components/modals/super-modal/FilmeModalContent.tsx` (linhas 44–45, 75–76) |
| RN-MODAL-041 | Onde assistir | Provedores de streaming deduplicados; exclui nome contendo “tmdb”. Se não há streaming nem cinema conhecido, mostra “Desconhecido”. | `frontend/src/components/modals/super-modal/FilmeModalContent.tsx` (linhas 26–69, 126–128) |
| RN-MODAL-042 | Ingresso | Botão ingresso visível se estreia cinema, em cartaz, tem sessões, pré-venda ou link; compra só se `tem_sessoes === true`. | `frontend/src/components/modals/super-modal/FilmeModalContent.tsx` (linhas 45–54, 94–100) |
| RN-MODAL-043 | Trailer | Prioriza trailer oficial; senão primeiro trailer; senão primeiro vídeo. | `frontend/src/components/modals/super-modal/FilmeModalContent.tsx` (linhas 35–37) |
| RN-MODAL-044 | Elenco → pessoa | Link `/pessoa/{id}` grava `orbe:superModalReturn` com `{ type: 'filme', id: tmdbId }` e fecha SuperModal. | `frontend/src/components/modals/super-modal/FilmeModalContent.tsx` (linhas 193–201) |
| RN-MODAL-045 | Continuações no modal | Aba extra via `ContinuacoesSuperModalTabs` com `tipo="filme"` e `tmdbId`. | `frontend/src/components/modals/super-modal/FilmeModalContent.tsx` (linha 233) |

## Série — visualização (`SerieModalContent`, `SerieSeasonDrawer`)

| ID | Regra | Descrição | Evidência |
|----|-------|-----------|-----------|
| RN-MODAL-050 | Streaming | Mescla `streamingProviders` e `plataformas_api`, deduplica e filtra TMDB como provedor. | `frontend/src/components/modals/super-modal/SerieModalContent.tsx` (linhas 39–54) |
| RN-MODAL-051 | Elenco → pessoa | Mesmo padrão de retorno ao SuperModal com `{ type: 'serie', id }`. | `frontend/src/components/modals/super-modal/SerieModalContent.tsx` (linhas 141–149) |
| RN-MODAL-052 | Calendário na série | Prop `openCalendarModal` existe mas não há botão de calendário na UI de série (apenas filme futuro dispara fluxo explícito na UI). | `frontend/src/components/modals/super-modal/SerieModalContent.tsx` (interface linha 22; sem uso de `openCalendarModal` no corpo) |
| RN-MODAL-053 | Continuações | `ContinuacoesSuperModalTabs` com `tipo="serie"`. | `frontend/src/components/modals/super-modal/SerieModalContent.tsx` (grep `ContinuacoesSuperModalTabs`) |

## Anime — visualização (`AnimeModalContent`, `AnimeInfoBlock`)

| ID | Regra | Descrição | Evidência |
|----|-------|-----------|-----------|
| RN-MODAL-060 | Sinopse HTML | Remove tags HTML da sinopse e sanitiza texto; fallback “(não informado)”. | `frontend/src/components/modals/super-modal/AnimeModalContent.tsx` (linhas 30–31, 139–142) |
| RN-MODAL-061 | Pin semanal | Usuário autenticado vê botão “Fixar na semana” / “Na sua semana” via `useAnimeWeeklyPin`. | `frontend/src/components/modals/super-modal/AnimeModalContent.tsx` (linhas 132–173) |
| RN-MODAL-062 | Plataformas | Lista deduplicada por nome; Crunchyroll mostra só ícone (sem label textual). | `frontend/src/components/modals/super-modal/AnimeModalContent.tsx` (linhas 33–42, 186–199) |
| RN-MODAL-063 | Personagem / dublador | Cards permitem alternar JP vs PT-BR quando há dubladores; link `/dublador/{id}` fecha SuperModal. | `frontend/src/components/modals/super-modal/AnimeModalContent.tsx` (linhas 44–129) |
| RN-MODAL-064 | Rankings | Exibe no máximo 6 entradas de ranking com tradução de tipo/contexto. | `frontend/src/components/modals/super-modal/AnimeModalContent.tsx` (linhas 284–299) |

## Jogo — visualização (`JogoModalContent`, `JogoInfoBlock`, `JogoPlatformLinks`, `PcRequirementsDrawer`)

| ID | Regra | Descrição | Evidência |
|----|-------|-----------|-----------|
| RN-MODAL-070 | Requisitos PC | Drawer de requisitos só se jogo é PC/Steam (`steam_app_id` ou nome de plataforma matching) e há `pc_requirements`. | `frontend/src/components/modals/super-modal/JogoModalContent.tsx` (linhas 26–57) |
| RN-MODAL-071 | Desenvolvedora | Links para `/desenvolvedora/{igdbId}` no bloco de informações. | `frontend/src/components/modals/super-modal/JogoInfoBlock.tsx` (linhas 66–78) |
| RN-MODAL-072 | Steam no modal | Preço Steam no modal quando há dados de preço ou `steam_app_id`. | `frontend/src/components/modals/super-modal/JogoInfoBlock.tsx` (linhas 31–35) |

## Edição admin (formulários `*EditForm`)

| ID | Regra | Descrição | Evidência |
|----|-------|-----------|-----------|
| RN-MODAL-080 | Salvar filme | Admin edita campos curados (`titulo_curado`, `sinopse_curada`, `poster_curado`, etc.) e persiste com `realApi.updateFilme(id, formData)` onde `id` é o TMDB. | `frontend/src/components/modals/super-modal/FilmeEditForm.tsx` (linhas 23–29) |
| RN-MODAL-081 | Cancelar edição | Cancelar apenas sai do modo edição sem reverter API (`handleCancel` no SuperModal). | `frontend/src/components/modals/SuperModal.tsx` (linhas 153–155) |
| RN-MODAL-082 | Tipos editáveis | Formulários existem para filme, série, anime e jogo; outros tipos mostram mensagem de indisponibilidade. | `frontend/src/components/modals/SuperModal.tsx` (linhas 287–299) |

## Continuações embutidas (`ContinuacoesSuperModalTabs`)

| ID | Regra | Descrição | Evidência |
|----|-------|-----------|-----------|
| RN-MODAL-090 | Busca lazy | Carrega `getContinuacoesFilme` ou `getContinuacoesSerie` conforme `tipo` e `tmdbId`. | `frontend/src/components/continuacoes/ContinuacoesSuperModalTabs.tsx` (linhas 20–42) |
| RN-MODAL-091 | Ocultar vazio | Se não há itens de continuação nem universo, não renderiza nada. | `frontend/src/components/continuacoes/ContinuacoesSuperModalTabs.tsx` (linhas 58–60) |
| RN-MODAL-092 | Abas dinâmicas | Aba padrão é “Continuação” se houver sequência; senão “Universo”. Só exibe abas com conteúdo. | `frontend/src/components/continuacoes/ContinuacoesSuperModalTabs.tsx` (linhas 62–79) |
