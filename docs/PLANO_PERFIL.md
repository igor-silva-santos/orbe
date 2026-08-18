# Plano de Ação — Perfil Logado, Personalização e Match

**Documento vivo** para desenvolvimento do Orbe Nerd.  
**Última atualização:** agosto de 2026  
**Fonte da verdade:** decisões das conversas de planejamento (agosto/2026). A spec técnica v1.0 (PDF) é referência histórica apenas.

### Processo de entrega (produção)

- **Uma sprint por vez** — sem MVPs nem demos parciais.
- Cada sprint: implementar → testes (BE + FE + build) → PR → validar em produção → próxima sprint.
- Branch: `cursor/sprint-N-<nome>-07a0`
- Critérios de aceite da sprint devem passar antes do merge.

---

## 1. Visão e princípios

### O que estamos construindo

Transformar o Orbe de um **hub de lançamentos** em um **hub pessoal nerd**: cada usuário logado tem biblioteca, desejos, feed personalizado e sistema de Match (solo e em dupla).

### Princípios de produto (não negociáveis)

| Princípio | Decisão |
|-----------|---------|
| Perfil | **Privado** — sem perfil público |
| Configuração modular | Tudo em `/configuracoes` ("Meu Orbe"), **não** na home |
| Algoritmo | Deve ser **completo e explicável**, não genérico |
| Avaliação ao finalizar | Nota (gostei/amei/não gostei) **obrigatória**; comentário **opcional** |
| Spec antiga | Só consulta — não implementar o que foi descartado |

### O que já existe no código (reaproveitar)

| Recurso | Onde | Status |
|---------|------|--------|
| Interações (`favorito`, `quero_assistir`, `acompanhando`, `assistido`, `oculto`) | `preferencias_usuario_midia` + `useMidiaInteraction` | API + UI nos cards |
| RatingModal | `RatingModal.tsx` + `RatingModalWrapper` | Funcional |
| Watchlist API | `GET/POST /api/watchlist` | API pronta, sem UI |
| `User.preferencias` JSON | `schema.prisma` | Subutilizado |
| `User.quer_avaliar` | schema + auth | Sem toggle na UI |
| CalendarModal | `CalendarModal.tsx` | Funcional |
| SuperModal | `SuperModal.tsx` | Funcional, sem deep link |
| Carrosséis temporais | `MediaCarousel`, `AnimeCarousel` | Fixos na home |
| Detetive Digital | `detetive.ts` | Cinema BR, pré-venda |
| GameMode (co-op, multiplayer) | `JogoOnGameMode` | Dados no banco |
| Continuações / TMDB recs | `continuacoesService.ts` | Base para Match |

---

## 2. Mapa de dependências entre fases

```
Sprint 0 (docs + schema)
    ↓
Sprint 1 (Biblioteca + Desejos UI) ──────────────────┐
    ↓                                                   │
Sprint 2 (Oculto + interações → perfil)                │
    ↓                                                   │
Sprint 3 (Deep links + compartilhar)                   │
    ↓                                                   │
Sprint 4 (Modelo PreferenciasOrbe + config API)        │
    ↓                                                   │
Sprint 5 (Wizard onboarding)                           │
    ↓                                                   │
Sprint 6 (Carrosséis personalizados na home)           │
    ↓                                                   │
Sprint 7 (TasteProfile + triangulação) ←───────────────┘
    ↓
Sprint 8 (Match Solo)
    ↓
Sprint 9 (Match Duo)
    ↓
Sprint 10 (Integrações: Detetive, notificações, calendário)
    ↓
Sprint 11 (Polish: spec antiga + extras)
```

---

## 3. Modelo de dados unificado (referência para todas as sprints)

### 3.1 `User.preferencias` — estrutura alvo

```typescript
interface PreferenciasOrbe {
  // --- Personalização geral ---
  personalizacaoAtiva: boolean;
  onboardingCompleto: boolean;
  dataUltimoOnboarding: string | null;

  // --- Popup mensal ---
  popup: {
    naoMostrar: boolean;
    ultimaExibicao: string | null; // ISO date
  };

  // --- Perfil de gosto (TasteProfile) ---
  tasteProfile: {
    tiposAtivos: ('filme' | 'serie' | 'anime' | 'jogo')[];
    generosFavoritos: { tipo: string; ids: number[] }[];
    plataformasJogo: number[];           // IDs JogoPlataforma
    titulosReferencia: {
      tipo: 'filme' | 'serie' | 'anime' | 'jogo';
      externalId: number;                // tmdbId, malId ou igdbId
      titulo: string;
      fonte: 'orbe' | 'tmdb' | 'igdb' | 'anilist';
    }[];
    generosInferidos: number[];
    keywords: string[];
    ultimaAtualizacao: string;
  };

  // --- Carrosséis modulares ---
  carrosseis: {
    id: 'filmes' | 'series' | 'animes' | 'jogos';
    visivel: boolean;
    ordem: number;
    filtroPersonalizado: boolean;        // true = só compatíveis com perfil
    filtroAcompanhando: boolean;         // só anime/série: só status acompanhando
  }[];

  // --- Avaliação ---
  querAvaliar: boolean;                  // espelha User.quer_avaliar
}
```

### 3.2 Novas tabelas (Sprint 4+)

```prisma
model UserOnboardingResposta {
  id          Int      @id @default(autoincrement())
  userId      Int
  perguntaId  String   // ex: "q_tipos_midia", "q_generos_filme"
  resposta    Json
  respondidoEm DateTime @default(now())
  user        User     @relation(fields: [userId], references: [id])
}

model MatchSession {
  id              String   @id @default(uuid())
  codigo          String   @unique  // "ORBE-7X2K"
  criadorId       Int
  parceiroId      Int?
  modo            String   // "solo" | "duo"
  categoria       String   // "filme" | "serie" | "anime" | "jogo"
  submodo         String?  // "coop" | "multiplayer" | "qualquer" | "agora" | "surpresa" | ...
  contexto        Json?    // mood, tempo, ancora, plataforma (solo)
  ancoraA         Json?
  ancoraB         Json?
  sugestoes       Json     // MatchSuggestion[]
  resultadoId     Int?
  status          String   // "aguardando" | "escolhendo" | "votando" | "concluido"
  criadoEm        DateTime @default(now())
  criador         User     @relation("MatchCriador", fields: [criadorId], references: [id])
  parceiro        User?    @relation("MatchParceiro", fields: [parceiroId], references: [id])
}
```

### 3.3 Status de interação — semântica no produto

| Status | Lista no perfil | Efeito no algoritmo |
|--------|-----------------|---------------------|
| `quero_assistir` | Desejos | Boost leve em similares |
| `favorito` | Favoritos (ou aba em Desejos) | Boost forte |
| `acompanhando` | Em andamento | Filtro "só acompanhando" em anime/série |
| `assistido` | Biblioteca | Reforça gosto; não reaparece em Match |
| `oculto` | — | Excluído de carrosséis e Match |

---

## 4. Sprints detalhadas

---

### Sprint 0 — Fundação e documentação

**Objetivo:** Alinhar tipos, defaults e critérios antes de codar features de perfil.

#### Entregáveis

- [x] Este documento versionado em `docs/PLANO_PERFIL.md`
- [x] Tipos TypeScript `PreferenciasOrbe`, `TasteProfile`, `CarouselConfig` em `frontend/src/types/`
- [x] Tipos espelhados no backend (`api/src/preferenciasOrbe.ts`)
- [x] Defaults de `carrosseis` e `tasteProfile` vazios para usuários existentes
- [x] Atualizar `orbe-1/ESTADO_DO_PROJETO.md` com link para este plano

#### Tarefas

| # | Tarefa | Arquivo(s) |
|---|--------|------------|
| 0.1 | Criar interfaces TS compartilhadas | `frontend/src/types/perfil.ts` |
| 0.2 | Criar tipos no backend | `api/src/preferenciasOrbe.ts` |
| 0.3 | Função `getDefaultPreferenciasOrbe()` | ambos |
| 0.4 | Migration opcional: garantir `preferencias` não null com defaults | `prisma/migrations/` |

#### Critérios de aceite

- [x] Tipos compilam sem erro em FE e BE
- [x] `GET /api/users/me` retorna `preferencias` com shape documentado (mesmo que vazio)
- [x] Nenhuma regressão em login/perfil existente

#### Notas de contexto

- Não alterar comportamento da home nesta sprint
- `perfil_publico` permanece no schema mas não será usado na UI

---

### Sprint 1 — Biblioteca e Desejos (UI do perfil)

**Objetivo:** Implementar o que a spec antiga pedia e nunca virou tela — galerias do perfil.

**Depende de:** Sprint 0

#### Entregáveis

- [ ] `/perfil` refatorado como hub com navegação lateral ou abas
- [ ] `/perfil/biblioteca` — filmes, séries, animes, jogos finalizados
- [ ] `/perfil/desejos` — unificação de `quero_assistir` + watchlist API
- [ ] `/perfil/acompanhando` — séries e animes em progresso
- [ ] Filtro na biblioteca: Todos | Amei | Gostei | Não gostei | Sem nota
- [ ] Modal de confirmação ao remover item de Desejos ou Favoritos (spec antiga)
- [ ] Editar avaliação na biblioteca (reabre fluxo de nota)

#### Tarefas backend

| # | Tarefa | Endpoint / arquivo |
|---|--------|-------------------|
| 1.1 | `GET /api/me/biblioteca?tipo=filme&avaliacao=amei` | `api/src/profileRoutes.ts` ou novo `bibliotecaRoutes.ts` |
| 1.2 | `GET /api/me/desejos` — merge `quero_assistir` + `watchlistItems` | mesmo |
| 1.3 | `GET /api/me/acompanhando` | mesmo |
| 1.4 | Incluir poster, título, data_conclusao (`data_interacao` quando status=assistido) | mappers existentes |

#### Tarefas frontend

| # | Tarefa | Arquivo |
|---|--------|---------|
| 1.5 | Layout hub do perfil | `frontend/src/app/perfil/layout.tsx` |
| 1.6 | Página biblioteca com abas e filtros de nota | `frontend/src/app/perfil/biblioteca/page.tsx` |
| 1.7 | Página desejos com abas por tipo | `frontend/src/app/perfil/desejos/page.tsx` |
| 1.8 | Página acompanhando | `frontend/src/app/perfil/acompanhando/page.tsx` |
| 1.9 | `ConfirmRemoveModal` reutilizável | `frontend/src/components/perfil/ConfirmRemoveModal.tsx` |
| 1.10 | `BibliotecaCard` com badge de nota (amei/gostei/não) | `frontend/src/components/perfil/` |
| 1.11 | Hook `useBiblioteca`, `useDesejos` | `frontend/src/lib/hooks/` |

#### Critérios de aceite

- Usuário logado vê todos os itens `assistido` na biblioteca, agrupados por tipo
- Filtro "Amei" mostra só itens com `avaliacao=amei`
- Desejos mostra `quero_assistir` e itens da watchlist API sem duplicar
- Remover da lista pede confirmação; cancelar não altera nada
- Clicar no card abre SuperModal
- Usuário não logado é redirecionado para `/login`

#### Notas de contexto (spec antiga)

- Galeria com abas era §4.9 da spec v1.0
- Avaliação editável na biblioteca era §4.9
- Watchlist: reaproveitar `GET /api/watchlist`, não criar endpoint paralelo

---

### Sprint 2 — Oculto nos carrosséis + refinamento de interações

**Objetivo:** `oculto` ("Não me interessa") passa a filtrar a home; interações conectadas ao perfil.

**Depende de:** Sprint 1

#### Entregáveis

- [ ] Títulos com `status=oculto` não aparecem em carrosséis da home
- [ ] Títulos ocultos não aparecem em `/filmes`, `/series`, etc. (listagens) para usuário logado
- [ ] Opção em configurações futuras: "Ver itens ocultos" (preparar flag, default false)
- [ ] Ao marcar "Não me interessa", toast com "Desfazer" (5s)
- [ ] Dashboard `/perfil` com resumo: contagem biblioteca, desejos, acompanhando

#### Tarefas backend

| # | Tarefa |
|---|--------|
| 2.1 | `GET /api/homepage` e carrosséis: se `Authorization`, excluir `midia_id`+`tipo` com `oculto` |
| 2.2 | Helper `getOcultosForUser(userId): Set<string>` cacheável 5min |
| 2.3 | Aplicar mesmo filtro em `by-month`, `by-year` quando autenticado |

#### Tarefas frontend

| # | Tarefa |
|---|--------|
| 2.4 | Passar token nas chamadas de carrossel quando logado |
| 2.5 | Toast desfazer em `useMidiaInteraction` para `nao_me_interessa` |
| 2.6 | Cards no perfil dashboard com números |

#### Critérios de aceite

- Marcar filme como oculto → some da home após refresh (ou invalidação)
- Desfazer no toast restaura visibilidade
- Visitante não logado vê catálogo completo (sem filtro oculto)

---

### Sprint 3 — Deep links e compartilhamento do SuperModal

**Objetivo:** Links compartilháveis para títulos; base para convidar parceiro ao Match depois.

**Depende de:** Sprint 1 (opcional: pode paralelizar com Sprint 2)

#### Entregáveis

- [ ] Rotas `/titulo/[tipo]/[id]` abrem SuperModal automaticamente
- [ ] Botão "Compartilhar" no SuperModal (clipboard + Web Share API)
- [ ] Open Graph: `og:title`, `og:image`, `og:description` por título
- [ ] URLs estáveis: `filme`/`serie` usam tmdbId; `anime` malId; `jogo` igdbId

#### Tarefas

| # | Tarefa | Arquivo |
|---|--------|---------|
| 3.1 | Rota dinâmica | `frontend/src/app/titulo/[tipo]/[id]/page.tsx` |
| 3.2 | Abrir modal via query ou store ao montar página | `appStore.openSuperModal` |
| 3.3 | `generateMetadata` para OG | mesma rota |
| 3.4 | Botão compartilhar | `SuperModal.tsx` ou `ShareButton.tsx` |
| 3.5 | `middleware.ts`: `/titulo/*` público (não exige login) | `middleware.ts` |

#### Critérios de aceite

- Link `orbe.app/titulo/filme/550` abre modal de Fight Club em desktop e mobile
- Preview no WhatsApp mostra poster e título
- Compartilhar copia URL canônica
- Fechar modal em página `/titulo/...` volta para `/` ou histórico

---

### Sprint 4 — API e UI "Meu Orbe" (configurações)

**Objetivo:** Persistir e editar toda configuração de personalização em `/configuracoes`.

**Depende de:** Sprint 0

#### Entregáveis

- [ ] Seção **"Meu Orbe"** em `/configuracoes`
- [ ] Toggle: ativar/desativar personalização (reverte home ao padrão)
- [ ] Toggle: receber lembrete mensal de personalização
- [ ] Toggle: `quer_avaliar` (modal de nota ao finalizar) — spec antiga
- [ ] Config de carrosséis: visibilidade, ordem (drag-and-drop), filtro personalizado, filtro acompanhando (anime)
- [ ] Botões: "Refazer questionário", "Reverter toda personalização"
- [ ] Endpoints CRUD de preferências

#### Tarefas backend

| # | Tarefa | Endpoint |
|---|--------|----------|
| 4.1 | GET config merge com defaults | `GET /api/me/orbe-config` |
| 4.2 | PATCH parcial | `PATCH /api/me/orbe-config` |
| 4.3 | POST reset total | `POST /api/me/orbe-config/reset` |
| 4.4 | Validar shape com Zod | `api/src/validation.ts` |
| 4.5 | Migration `UserOnboardingResposta` (opcional nesta sprint) | prisma |

#### Tarefas frontend

| # | Tarefa |
|---|--------|
| 4.6 | `MeuOrbeSettings.tsx` em configuracoes |
| 4.7 | `CarouselConfigEditor` — lista reordenável |
| 4.8 | Sincronizar `quer_avaliar` com `User.quer_avaliar` no PATCH perfil |

#### Critérios de aceite

- Desativar personalização → próximo load da home usa 4 carrosséis fixos padrão
- Reordenar jogos antes de filmes → após salvar, ordem persiste
- Ocultar carrossel de animes → não renderiza na home
- Reverter zera `tasteProfile` e restaura carrosséis default

#### Defaults de carrosséis

```typescript
const DEFAULT_CARROSSEIS = [
  { id: 'filmes', visivel: true, ordem: 0, filtroPersonalizado: false, filtroAcompanhando: false },
  { id: 'series', visivel: true, ordem: 1, filtroPersonalizado: false, filtroAcompanhando: false },
  { id: 'animes', visivel: true, ordem: 2, filtroPersonalizado: false, filtroAcompanhando: false },
  { id: 'jogos', visivel: true, ordem: 3, filtroPersonalizado: false, filtroAcompanhando: false },
];
```

---

### Sprint 5 — Wizard de onboarding

**Objetivo:** Fluxo de perguntas para montar o perfil de gosto; popup mensal de opt-in.

**Depende de:** Sprint 4

#### Entregáveis

- [ ] `OnboardingModal` — wizard multi-step
- [ ] Popup mensal (1×/mês se não personalizou) com checkbox "Não mostrar novamente"
- [ ] Passos do wizard conforme produto (abaixo)
- [ ] Busca híbrida Orbe + TMDB/IGDB para títulos referência
- [ ] Salvar respostas em `UserOnboardingResposta` + `tasteProfile`

#### Passos do wizard

| Passo | Conteúdo | Validação |
|-------|----------|-----------|
| 0 | Opt-in: "Quer que o Orbe se adapte a você?" | Sim → continua; Não → fecha |
| 1 | Tipos de mídia (multi): filmes, séries, animes, jogos | ≥1 |
| 2a | Se jogos: plataformas (multi): PC, PS, Xbox, Nintendo | ≥1 se jogos marcado |
| 2b | Se filmes: gêneros (multi) | ≥1 se filmes marcado |
| 3 | Títulos referência: 5–10 por tipo ativo | Busca Orbe → fallback externo |
| 4 | Resumo + confirmar | POST onboarding |

#### Tarefas backend — busca externa

| # | Tarefa | Detalhe |
|---|--------|---------|
| 5.1 | `GET /api/onboarding/search?tipo=filme&q=` | Orbe primeiro; se <5 resultados, TMDB `/search/movie` |
| 5.2 | Debounce + rate limit 20 req/min/user | `searchRateLimiter` |
| 5.3 | Cache Redis query 24h | `tmdb:search:movie:{q}` |
| 5.4 | Salvar só `externalId` + título no onboarding; import lazy no sync | não bloquear wizard |
| 5.5 | `POST /api/me/onboarding` | persiste respostas + `onboardingCompleto=true` |

#### Tarefas frontend

| # | Tarefa |
|---|--------|
| 5.6 | `OnboardingModal`, steps, progress bar |
| 5.7 | `TitleSearchPicker` — multi-select 5–10 |
| 5.8 | `MonthlyPersonalizationPrompt` — lógica 1×/mês + `popup.naoMostrar` |
| 5.9 | Disparo: primeiro login; depois mensal conforme config |

#### Critérios de aceite

- Usuário completa wizard → `personalizacaoAtiva=true`, `onboardingCompleto=true`
- Buscar filme inexistente no Orbe → aparece resultado TMDB com badge
- Checkbox "não mostrar" impede popup por 30 dias ou até reativar em config
- Pular wizard → home permanece padrão

#### Nota TMDB

Onboarding com 5–10 títulos e debounce **não** sobrecarrega API. Ver regras na seção 5.1 do plano (cache, Orbe primeiro).

---

### Sprint 6 — Home modular e feed personalizado

**Objetivo:** Home respeita config de carrosséis; filtro de compatibilidade quando ativo.

**Depende de:** Sprint 4, Sprint 5 (parcial), Sprint 7 (filtro fino — pode stub com gêneros)

#### Entregáveis

- [ ] `HomeClient` dinâmico: renderiza carrosséis conforme `carrosseis[]` ordenados e visíveis
- [ ] `ModularCarousel` — delega para `MediaCarousel` / `AnimeCarousel`
- [ ] Logado + `personalizacaoAtiva` → `GET /api/me/feed` em vez de `/api/homepage`
- [ ] Toggle por carrossel na UI: "Só para mim" / "Mostrar todos" (sessão ou persistido em config)
- [ ] Fallback: visitante ou personalização off → home atual

#### Tarefas backend

| # | Tarefa |
|---|--------|
| 6.1 | `GET /api/me/feed` — retorna `{ carrosseis: [{ id, titulo, items }] }` |
| 6.2 | Por carrossel: se `filtroPersonalizado`, aplicar score mínimo (stub Sprint 6; completo Sprint 7) |
| 6.3 | Se `filtroAcompanhando` em anime/série: só `status=acompanhando` |
| 6.4 | Excluir `oculto` sempre |
| 6.5 | Cache por userId TTL 10min; invalidar em PATCH config ou nova interação |

#### Tarefas frontend

| # | Tarefa |
|---|--------|
| 6.6 | Refatorar `HomeClient.tsx` — loop em `carrosseis` |
| 6.7 | `CarouselFilterToggle` — "Só para mim" / "Todos" |
| 6.8 | SSR: homepage pública unchanged; client fetch feed se logado |

#### Critérios de aceite

- Usuário sem personalização vê home idêntica à atual
- Ocultar "jogos" em config → seção jogos não aparece
- Filtro anime "só acompanhando" → só títulos com essa interação
- Ordem filmes → jogos → animes persiste após reload

---

### Sprint 7 — TasteProfile e triangulação

**Objetivo:** Motor de gosto que alimenta carrosséis, wizard e Match.

**Depende de:** Sprint 5, Sprint 1

#### Entregáveis

- [ ] `tasteProfileService.ts` — construir e atualizar vetor de gosto
- [ ] Triangulação a partir de títulos referência + biblioteca (amei/gostei)
- [ ] `compatibilityScore(userId, midiaId, tipo)` → 0–100
- [ ] Recálculo debounced ao: onboarding, nova interação, editar nota
- [ ] Integrar score real no `GET /api/me/feed` (substituir stub Sprint 6)

#### Algoritmo de triangulação (filmes exemplo)

```
Para cada título referência:
  buscar gêneros, keywords TMDB, diretor, elenco principal

generosInferidos = interseção com peso (quantos títulos compartilham)
keywords = top 10 por frequência
tom = agregar keywords de mood TMDB

Score para candidato em lançamento:
  generoMatch     × 0.35  (gêneros inferidos ∩ gêneros do filme)
  keywordMatch    × 0.20
  qualidade       × 0.15  (vote_average normalizado, min 6.0)
  proximidadeData × 0.15
  novidade        × 0.10  (não está na biblioteca)
  interacaoBoost  × 0.05  (favoritos similares)

Penalidades: oculto, nao_gostei em similar, já assistido
```

#### Tarefas

| # | Tarefa | Arquivo |
|---|--------|---------|
| 7.1 | Extrair features de filme/série/anime/jogo | `tasteProfileService.ts` |
| 7.2 | `buildTasteProfile(userId)` | mesmo |
| 7.3 | `scoreCandidate(profile, midia, tipo)` | mesmo |
| 7.4 | Job ou hook pós-interação: `recalculateTasteProfile(userId)` | `userRoutes.ts` |
| 7.5 | Testes unitários com fixtures | `tasteProfile.test.ts` |

#### Critérios de aceite

- Usuário com 5 filmes sci-fi referência → carrossel filmes prioriza sci-fi em lançamento
- Score ≥ 50 aparece com filtro "Só para mim"; < 50 oculto
- Marcar `amei` em filme → recálculo em < 30s
- Testes cobrem triangulação com 3 títulos mock

---

### Sprint 8 — Match Solo

**Objetivo:** "A melhor companhia é você" — recomendação contextual para assistir/jogar agora.

**Depende de:** Sprint 7

#### Entregáveis

- [ ] `/perfil/match` com entrada **Match Solo** e **Match Duo** (duo stub ou link)
- [ ] Fluxo Solo: categoria → mood → tempo → âncora opcional → resultado
- [ ] Modos: Agora, Surpresa, Rewatch, Backlog, Maratona, Desafio
- [ ] Solo Score com explicação em bullets
- [ ] Ações: Assistir/Jogar (abre modal), Guardar em desejos, Próxima sugestão
- [ ] Histórico em `/perfil/match/historico`

#### Solo Score (referência)

```
solo_score =
  sim(sessao, candidato)      × 0.35
+ sim(perfil, candidato)      × 0.30
+ fit_contexto(mood, tempo)   × 0.20
+ novidade                    × 0.10
+ qualidade                   × 0.05
```

`fit_contexto`: mapeamento mood → gêneros/keywords (relaxar → slice-of-life; assustar → horror).

#### Tarefas backend

| # | Tarefa |
|---|--------|
| 8.1 | `POST /api/me/match/solo` — body: categoria, mood, tempo, submodo, ancora? |
| 8.2 | Retorna 3 sugestões com `soloScore`, `explicacao[]` |
| 8.3 | Modo Backlog: candidatos só de `quero_assistir` |
| 8.4 | Modo Rewatch: candidatos só biblioteca com amei/gostei |
| 8.5 | Persistir `MatchSession` modo=solo |

#### Critérios de aceite

- Modo Agora com mood Relaxar + 2h não sugere filme de terror 3h
- Surpresa funciona sem input além da categoria
- Explicação mostra pelo menos 3 razões legíveis
- Guardar em desejos cria `quero_assistir`

---

### Sprint 9 — Match Duo (Harmony Match)

**Objetivo:** Dois usuários encontram título em comum — filme, série, anime ou jogo (incl. co-op).

**Depende de:** Sprint 7, Sprint 8 (componentes UI)

#### Entregáveis

- [ ] Sala com código `ORBE-XXXX`
- [ ] Link convite: `/perfil/match/entrar/CODIGO` ou `/match/CODIGO`
- [ ] Cada um escolhe 1 âncora; opcional filtros (plataformas comuns)
- [ ] Submodo jogos: Co-op | Multiplayer | Qualquer
- [ ] Harmony Score + 3 sugestões + votação
- [ ] Resultado: "Assistir juntos" → marca `assistido_junto` opcional
- [ ] Histórico duo no perfil

#### Harmony Score (referência)

```
harmony =
  sim(sessaoA, cand) × 0.30
+ sim(sessaoB, cand) × 0.30
+ sim(zonaAB, cand)  × 0.20
+ qualidade          × 0.08
+ novidade           × 0.07
+ surpresa           × 0.05

zonaAB = interseção gêneros/plataformas − vetos (oculto, nao_gostei)

Candidatos:
  recs(ancoraA) ∩ recs(ancoraB)  ∪  top vetorial A  ∪  top vetorial B
```

#### Tarefas backend

| # | Tarefa |
|---|--------|
| 9.1 | `POST /api/me/match/duo/criar` → codigo |
| 9.2 | `POST /api/me/match/duo/:codigo/entrar` |
| 9.3 | `PATCH` ancoraA / ancoraB |
| 9.4 | `POST .../calcular` → sugestões |
| 9.5 | `POST .../votar` |
| 9.6 | Co-op: hard filter `GameMode` + interseção plataformas |
| 9.7 | WebSocket ou polling 3s para estado da sala (escolhendo/votando) |

#### Critérios de aceite

- Dois browsers: criar sala, entrar, escolher âncoras, receber mesma lista de 3
- Jogo co-op: sugestões só com modo cooperativo nas plataformas em comum
- Voto unânime em 1 sugestão → status concluido
- Código expira em 24h

---

### Sprint 10 — Integrações (Detetive, notificações, calendário)

**Objetivo:** Conectar perfil ao que já funciona no Orbe.

**Depende de:** Sprint 1, Sprint 5

#### Entregáveis

- [ ] Desejos: badge "Em cartaz" / "Pré-venda" via Detetive
- [ ] Notificação: estreia em 7d/1d para itens em desejos (estender `scheduleChecker`)
- [ ] Notificação: filme em desejos entrou em pré-venda
- [ ] Match/Desejos: "Adicionar ao calendário" pós-resultado
- [ ] Interações refinam TasteProfile (fechar loop Sprint 7)

#### Tarefas

| # | Tarefa |
|---|--------|
| 10.1 | Enriquecer `GET /api/me/desejos` com flags `emCartaz`, `emPrevenda` |
| 10.2 | `scheduleChecker`: além de interações, incluir `quero_assistir` |
| 10.3 | Detetive pós-validação pré-venda: notificar usuários com desejo |
| 10.4 | Botão calendário no resultado do Match |

#### Critérios de aceite

- Filme na wishlist com pré-venda ativa mostra badge no card de desejos
- Usuário recebe notificação quando desejo estreia em 7 dias

---

### Sprint 11 — Polish (spec antiga + extras)

**Objetivo:** Detalhes que melhoram UX sem mudar direção.

**Depende de:** Sprints anteriores conforme item

| # | Item | Origem | Prioridade |
|---|------|--------|------------|
| 11.1 | Ícone "Novo" em card para `acompanhando` quando sai episódio | Spec §4.3 | Média |
| 11.2 | Contagem regressiva anime no card | Spec §4.3 | Baixa |
| 11.3 | Buscas populares da semana no SearchOverlay | Spec §4.5 | Baixa |
| 11.4 | WebSocket push para notificações (bolinha real-time) | Spec §2 | Média |
| 11.5 | Estatísticas no dashboard perfil (este mês, streak) | Ideia nova | Média |
| 11.6 | Retrospectiva anual | Futuro | Baixa |
| 11.7 | Import Letterboxd CSV / Steam | Futuro | Baixa |
| 11.8 | Deprecar UI de `perfil_publico` (manter campo) | Decisão | Baixa |

---

## 5. Referência rápida — APIs novas (consolidado)

| Método | Rota | Sprint |
|--------|------|--------|
| GET | `/api/me/biblioteca` | 1 |
| GET | `/api/me/desejos` | 1 |
| GET | `/api/me/acompanhando` | 1 |
| GET/PATCH | `/api/me/orbe-config` | 4 |
| POST | `/api/me/orbe-config/reset` | 4 |
| GET | `/api/onboarding/search` | 5 |
| POST | `/api/me/onboarding` | 5 |
| GET | `/api/me/feed` | 6 |
| POST | `/api/me/match/solo` | 8 |
| POST | `/api/me/match/duo/criar` | 9 |
| POST | `/api/me/match/duo/:codigo/entrar` | 9 |
| POST | `/api/me/match/duo/:codigo/calcular` | 9 |

---

## 6. O que NÃO fazer (decisões explícitas)

- Perfil público / match entre desconhecidos
- Comentários sociais
- Reimplementar watchlist paralela (usar API existente)
- Seguir ordem de carrosséis da spec (Filmes, Animes, Séries, Jogos) — ordem é configurável
- Backend Python/FastAPI
- JustWatch na v1
- Teclado virtual TV na busca (nice-to-have isolado)

---

## 7. Checklist de contexto por sprint (para não perder o fio)

Antes de iniciar cada sprint, confirmar:

- [ ] Branch `cursor/<nome>-07a0` criada
- [ ] Sprint anterior mergeada ou dependências stubadas
- [ ] Tipos em `perfil.ts` atualizados se necessário
- [ ] Testes manuais: login, home anônima, home logada
- [ ] PR com referência a este doc e número da sprint

---

## 8. Ordem sugerida de execução

```
Sprint 0  →  1  →  2  →  3
                ↓
              4  →  5  →  6  →  7  →  8  →  9  →  10  →  11
```

**Paralelização possível:** Sprint 3 pode rodar em paralelo com Sprint 2 após Sprint 1.

**MVP mínimo para demo:** Sprints 0 + 1 + 4 + 5 + 6 (perfil + wizard + home filtrada básica).

**MVP Match:** adicionar Sprints 7 + 8.

---

## 8.1 Entregas por sprint (produção)

Cada sprint é entregue completa e validada em produção antes da próxima:

| Sprint | Entrega em produção |
|--------|---------------------|
| 0 | ✅ Tipos + merge de preferências no GET/PATCH perfil |
| 1 | Biblioteca + Desejos + Acompanhando (UI) |
| 2 | Oculto filtra carrosséis |
| … | (ver seções acima) |

---

## Documentos relacionados

| Arquivo | Conteúdo |
|---------|----------|
| `orbe-1/ESTADO_DO_PROJETO.md` | Estado geral do repo |
| `orbe-1/FUNCIONALIDADES.md` | Inventário implementado |
| `docs/PRODUCAO.md` | Deploy |
| Spec PDF v1.0 | Referência histórica (não versionada) |

---

*Este plano consolida: conversas de planejamento (personalização, wizard, Match Solo/Duo, biblioteca, desejos, compartilhamento) + itens válidos da spec antiga (galerias perfil, confirmação remoção, quer_avaliar, oculto, calendário, Detetive, watchlist API).*
