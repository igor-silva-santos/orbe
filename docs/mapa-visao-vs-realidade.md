# Mapa: visão vs. realidade — Orbe Nerd (FASE 2)

| Campo | Valor |
|--------|--------|
| **Data** | 24/11/2026 |
| **Base técnica** | [`docs/auditoria-codigo.md`](auditoria-codigo.md) (FASE 1, análise estática; runtime **não verificado**) |
| **Objetivo** | Cruzar o que o projeto **promete** com o que o código e a documentação **mostram hoje**, e medir distância até “produto final” (web estável + app nativo de verdade, conforme sua missão em 4 fases). |

---

## 1. Fontes usadas (visão, planos, especificações)

| Arquivo | Papel na visão |
|---------|----------------|
| [`README.md`](../README.md) | Proposta, stack, roadmap aberto (deploy, watchlist, notificações, PWA) |
| [`llm.md`](../llm.md) | Posicionamento público: hub de **lançamentos/estreias**, páginas, palavras-chave |
| [`DESIGN.md`](../DESIGN.md) | Identidade **Pulp Gráfico** escolhida |
| [`docs/DEV.md`](DEV.md) | Stack, estrutura, GitLab como gate de produção |
| [`docs/PRODUCAO.md`](PRODUCAO.md) | Checklist deploy (estado **documentado** em ago/2026; vigência em prod **não verificada**) |
| [`docs/SYNC_INICIAL.md`](SYNC_INICIAL.md) | Sync inicial / backfill |
| [`docs/DEPLOY_GITLAB.md`](DEPLOY_GITLAB.md) | Fluxo GitLab → produção |
| [`docs/render-deploy.md`](render-deploy.md) | Deploy API Render |
| [`orbe-1/ESTADO_DO_PROJETO.md`](../orbe-1/ESTADO_DO_PROJETO.md) | Visão original vs. estado (rev. **ago/2026**) |
| [`orbe-1/FUNCIONALIDADES.md`](../orbe-1/FUNCIONALIDADES.md) | Inventário funcional (rev. **ago/2026**) |
| [`orbe-1/README.md`](../orbe-1/README.md) | Índice do arquivo histórico |
| [`frontend/README.md`](../frontend/README.md) | Spec legada (Next 15, mocks, Python) — **desatualizado** |
| [`api/MINHA_LISTA_ANIMES.md`](../api/MINHA_LISTA_ANIMES.md) | Spec da Minha Lista + extensão Crunchyroll |
| **Conversa FASE 1–4** (nov/2026) | App **nativo real** (não WebView), performance, notificações, distribuição sem loja paga |
| [`docs/auditoria-codigo.md`](auditoria-codigo.md) | Evidências de bugs e lacunas atuais |

**Não encontrados no repositório (mencionados só em `orbe-1`):** specs locais (`watchlist_spec.md`, `contexto-projeto.md`, etc.) — **não verificados**.

---

## 2. Síntese: estamos no caminho?

| Dimensão | Veredicto |
|----------|-----------|
| **Visão de produto (hub nerd BR)** | **Sim, no eixo certo** — catálogo temporal, Detetive, promoções e interações existem com profundidade rara para projeto solo. |
| **Visão de “acompanhar sem perder estreia”** | **Parcialmente fora do rumo operacional** — listas e notificações estão quebradas ou incompletas; lembretes automáticos (`scheduleChecker`) não estão ligados. |
| **Visão PWA** | **Parcial** — Serwist/manifest/sw existem; README ainda trata PWA como “não iniciado”; bugs de SW e push impedem confiar. |
| **Visão app nativo (sua missão)** | **Ainda não começou** — API dá base de leitura; conta, listas, push FCM/APNs e contratos estáveis **bloqueiam** portar agora. |
| **Produção estável** | **Documentação pessimista** (`PRODUCAO.md`); estado real nov/2026 **não verificado** (demo Vercel pode estar OK ou degradada). |

**Honestidade:** o núcleo **descoberta + dados** está muito mais maduro que o núcleo **conta + retenção** (lista, alerta, push, tempo real). Isso é o oposto do que o marketing (`llm.md`) e o hero prometem para usuário logado.

---

## 3. Matriz — funcionalidade desejada × realidade

**Colunas:**  
- **Existe?** — sim / parcial / não  
- **Estado** — resumo alinhado à FASE 1  
- **Distância** — pequena | média | grande | bloqueio

| Visão / funcionalidade desejada | Existe? | Estado (evidência) | Distância |
|--------------------------------|---------|-------------------|-----------|
| **Hub único filmes/séries/animes/jogos** | Sim | ✅ Catálogo, rotas, carrosséis (`routes/*`, páginas `app/*`) | **Pequena** (polimento, performance Fase 3) |
| **Lançamentos por mês/temporada** | Sim | ✅ Carrosséis temporais; ⚠️ data congelada em animes (`mediaRoutesHelpers.ts:271`) | **Pequena** (correção pontual) |
| **Busca unificada** | Sim | ✅ `SearchOverlay`, `/api/pesquisa` | **Pequena** (performance 🧪) |
| **“O que tem hoje” / agenda** | Sim | ✅ `/hoje`, `/api/hoje` | **Pequena** |
| **Detetive Digital (cinema BR)** | Sim | ⚠️ Implementado; notificações sem push completo | **Média** |
| **Promoções / jogos grátis** | Sim | ⚠️ `deals/*`, `/promocoes`; cron agressivo | **Média** (confiabilidade + perf) |
| **Premiações e eventos** | Sim | ✅ Rotas + scrape | **Pequena** |
| **Continuações / sagas** | Sim | ✅ `/continuacoes` | **Pequena** |
| **Contexto BR (ingresso, dublagem)** | Sim | ✅ Ingresso, flags PT-BR no sync | **Pequena** |
| **Conta: registro/login/perfil** | Parcial | ✅ Login; ⚠️ sem refresh/reset/exclusão | **Média** |
| **Interações (favorito, status, nota)** | Sim | ⚠️ Sem apagar interação de forma clara | **Média** |
| **Watchlist sincronizada (README roadmap)** | Parcial | UI **animes** (`/minha-lista/*`) + extensão; ❌ **PK global** quebra multiusuário; watchlist legada duplicada | **Bloqueio** → depois **média** (filmes/séries/jogos “em breve”) |
| **Extensão Crunchyroll** | Sim | ⚠️ Fluxo completo no código; segurança da ponte; mojibake | **Média** |
| **Notificações (lista + alertas)** | Parcial | ❌ Contrato API↔UI; ⚠️ `scheduleChecker` morto; push parcial | **Bloqueio** |
| **Notificações em tempo real** | Parcial | ❌ WebSocket; ⚠️ polling pós-sync funciona | **Bloqueio** |
| **Push web (PWA)** | Parcial | Código VAPID + `usePushNotifications`; E2E **não verificado** | **Média** |
| **PWA / uso offline** | Parcial | Serwist + `manifest.ts`; ❌ matcher SW errado; roadmap diz “não iniciado” | **Média–grande** |
| **Design Pulp Gráfico** | Parcial | `DESIGN.md` vs tokens em `globals.css` (doc `orbe-1` cita Anime-Pop) | **Média** (só UI) |
| **Deploy produção estável** | Parcial | Docs antigos listam bloqueios; demo URLs existem | **Média–grande** (**não verificado** hoje) |
| **Dados atualizados pós-sync** | Parcial | ❌ Invalidação Redis ineficaz | **Bloqueio** (percepção de “site lento/desatualizado”) |
| **Comunidade (comentários)** | Não | Removido de propósito | **Cortado** — manter fora |
| **Monetização `/apoie`** | Parcial | Stub na UI | **Pequena–média** (produto, não engenharia crítica) |
| **App nativo Android/iOS** | Não | Só web + extensão | **Grande** (após P0 web) |
| **App “empresa” (gestos, offline, push nativo, biometria)** | Não | Não há projeto RN/Flutter/Kotlin/Swift | **Grande** |
| **Distribuição sem taxa de loja** | Não | Não documentado no repo até Fase 4 | **Média** (planejamento) |

---

## 4. Divergências importantes (documentação × código × sua missão)

| Tema | Visão / doc | Realidade (nov/2026) |
|------|-------------|---------------------|
| Watchlist | `orbe-1`: “sem UI” | **UI existe** para animes; filmes/séries/jogos “em breve” (`minha-lista/page.tsx`) |
| PWA | README: checkbox aberto | **Serwist** no `package.json`, `sw.ts`, `manifest.ts` — PWA **iniciada**, não finalizada |
| Notificações | `FUNCIONALIDADES`: `scheduleChecker` gera alertas | Arquivo **não importado** no servidor (FASE 1) |
| WebSocket | Docs: refresh pós-sync | **Conexão rejeitada** (origem CORS) |
| Backend | `frontend/README`: Python | **Express** |
| Produção | `PRODUCAO.md` ago/2026: Vercel blocked | **Pode ter mudado** — **não verificado** |
| Seu objetivo | App nativo premium | Stack atual é **só web**; portar antes de corrigir P0 duplicaria bugs |

---

## 5. O que falta para “finalizar” a visão original (web)

1. **Corrigir confiança do produto logado** — listas multiusuário, notificações visíveis, push confiável.  
2. **Dados frescos** — cache invalidate + (opcional) WS.  
3. **Fechar watchlist** — animes estável → replicar modelo para outros tipos **ou** cortar escopo explícito no README.  
4. **Operação** — um único caminho de deploy documentado e testado; variáveis (`NEXT_PUBLIC_API_URL`, `API_PROXY_ORIGIN`, VAPID).  
5. **Alinhar docs** — `frontend/README`, `orbe-1`, README roadmap vs. Serwist/Minha Lista.

---

## 6. O que está fora de rumo (ou deveria ser adiado)

| Item | Recomendação |
|------|----------------|
| **Dois modelos de watchlist** (`WatchlistItem` + `WatchlistAnime`) | **Unificar ou depreciar** um; manter dois aumenta bug e confusão. |
| **Comentários sociais** | **Cortado** — não reabrir sem decisão de produto. |
| **10 temas em `design-preview/`** | **Adiar** polimento visual massivo até P0 estável; manter Pulp como norte (`DESIGN.md`). |
| **Crons pesados no mesmo processo HTTP** | **Adiar** arquitetura multi-serviço até tráfego exigir; mas **medir** lentidão (Fase 3). |
| **App nativo agora** | **Adiar** até P0/P1 web; senão você embala lentidão e notificações quebradas em outro shell. |
| **Capacitor/WebView “rápido”** | **Fora do rumo** da sua missão (você pediu produto nativo real). |

---

## 7. O que cortar ou declarar “não agora”

- **Filmes/séries/jogos na Minha Lista** — já está “em breve”; pode **cortar do roadmap público** até animes 100% estável.  
- **Guia interativo / chat em `/ajuda`** — placeholder; cortar ou substituir por FAQ estático.  
- **GitHub Actions legados** se GitLab é fonte da verdade — reduzir duplicidade (**decisão sua**).  
- **Perfil público** — toggle sem efeito; cortar UI ou implementar (**decisão sua**).

---

## 8. Distância até sua visão ampliada (web + app nativo)

```
Descoberta / catálogo (visão llm.md)     ████████████████░░  ~85%  (bugs pontuais + cache)
Pipeline de dados / sync                 ███████████████░░░░  ~75%  (invalidação, curadoria)
Experiência logada (lista, alertas)      ████░░░░░░░░░░░░░░  ~25%  (bloqueios P0)
PWA como produto                         ██████░░░░░░░░░░░░  ~35%  (código existe, qualidade ?)
App nativo “grande empresa”              ░░░░░░░░░░░░░░░░░░   ~0%  (só planejamento Fase 4)
```

*Percentuais são **juízo de engenharia** com base na auditoria estática, não métricas de negócio.*

---

## 9. Perguntas que só você pode responder (visão)

1. **Prioridade de mídia na lista:** animes + Crunchyroll são o **núcleo** único por anos, ou você quer **paridade** filmes/séries/jogos antes de considerar “watchlist pronta”?  
2. **Público-alvo do app nativo:** só você e early adopters, ou **milhares** de usuários simultâneos (impacta lista, rate limit, infra)?  
3. **Produção hoje:** demo `orbe-seven.vercel.app` + Render são **oficiais** e com DB novo Supabase, ou ainda há ambiente “quebrado” do `PRODUCAO.md`?  
4. **Notificações:** o que é **must-have** — só “estreia / episódio”, ou também promoções, Detetive, sync? WhatsApp entra na visão?  
5. **Monetização:** `/apoie` é **P2 cosmetico** ou requisito para sustentar API paga (TMDB, Render)?  
6. **iOS vs Android:** qual plataforma importa **mais** para distribuição sem loja (Android APK first é aceitável)?  
7. **Conteúdo adulto (+18):** no app nativo precisa **mesmo rigor** que a web (idade, App Store guidelines)?  
8. **Unificação watchlist:** pode **desligar** `WatchlistItem` legado e ficar só em `WatchlistAnime` + interações TMDB?  
9. **Nome/marca no app:** “Orbe Nerd” fixo ou white-label futuro?  
10. **Offline:** quais telas **precisam** funcionar sem rede (só lista? catálogo em cache?)?  

---

*Próximo entregável: [`docs/roadmap.md`](roadmap.md) (prioridades P0–P2). Aguardando sua aprovação para **FASE 3** (performance + notificações).*