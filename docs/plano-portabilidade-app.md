# Plano de portabilidade — app nativo Orbe Nerd (FASE 4)

| Campo | Valor |
|--------|--------|
| **Data** | 24/11/2026 |
| **Entradas** | [`auditoria-codigo.md`](auditoria-codigo.md), [`mapa-visao-vs-realidade.md`](mapa-visao-vs-realidade.md), [`roadmap.md`](roadmap.md), [`plano-performance-notificacoes.md`](plano-performance-notificacoes.md) |
| **Método** | Decisão arquitetural + pesquisa documental (custos citados com fonte; **não** validamos checkout nem impostos BR) |
| **Premissa** | App **nativo de verdade** (não WebView). API Express/Prisma **continua** como backend único. |

---

## 1. Recomendação: **React Native com Expo**

### 1.1 Comparativo honesto

| Opção | Prós | Contras | Custo típico | Curva (time atual) |
|--------|------|---------|--------------|-------------------|
| **React Native (Expo)** | Mesmo ecossistema **React + TypeScript** do frontend; Expo simplifica build, push, OTA; FCM integrado; grande comunidade BR | Dois targets nativos ainda existem (painel, gestos); performance de listas longas exige FlashList/Reanimated | **$0** no plano Free Expo (limites de build); lojas separadas abaixo | **Média** — reaproveita mentalidade de componentes e Zustand |
| **Flutter** | UI fluida, um engine; Material/HIG via widgets | **Nova** linguagem (Dart), zero reaproveitamento do Next; design system refeito do zero | Android/iOS: mesmo custo de loja; CI própria | **Alta** |
| **Nativo Kotlin + Swift** | Máximo de polish, gestos, biometria, offline fino | **Dois codebases** completos; toda API client duplicada; manutenção 2× | 2× esforço de time (ou 2 devs) | **Muito alta** para projeto solo/pequeno |
| **Capacitor / PWA “instalável”** | Reaproveita 100% do site; deploy rápido | **É WebView** — você excluiu explicitamente; push/limites iOS; “não parece app grande” | Barato | Baixa, mas **não atende requisito** |
| **Tauri / Electron mobile** | — | Ecossistema mobile imaturo para consumidor | — | **Descartado** |

### 1.2 Por que Expo (e não só “RN bare”)

- Repositório já é **TypeScript end-to-end** (`frontend/`, `api/`).
- Estado e padrões: **Zustand**, hooks, `date-fns`, validação (Zod no FE — candidato a pacote `shared`).
- **Expo Router** dá file-based routing parecido com App Router.
- **expo-notifications** + **FCM** cobre Android; iOS exige APNs (via conta Apple).
- Builds: **Expo Build** free tier — até **15 Android + 15 iOS builds/mês** (fila baixa prioridade), segundo [expo.dev/pricing](https://expo.dev/pricing) (**verificado na pesquisa desta fase**; confira antes de comprar).
- Alternativa: build local com `eas build --local` = **$0** de nuvem, só sua máquina/macOS para iOS.

### 1.3 O que **não** reaproveita direto

- Componentes **Next.js** (`next/image`, `app/`, SSR, Serwist).
- **Tailwind** no mobile: usar **NativeWind** ou tokens exportados de `globals.css` (espelhar **Pulp** do `DESIGN.md`).
- Rotas BFF do Next (`app/api/*`) — o app fala **direto** na API Express (com mesmos JWT).

### 1.4 Pré-requisitos bloqueantes (antes do primeiro commit mobile)

Concluir **P0 do [`roadmap.md`](roadmap.md)** — especialmente listas, notificações, cache. Portar sem isso = app nativo com bugs herdados.

---

## 2. Arquitetura-alvo

```
┌─────────────────────────────────────────────────────────────┐
│  Clientes                                                    │
│  ┌──────────┐  ┌──────────────┐  ┌────────────────────────┐ │
│  │ Next.js  │  │ Expo (iOS/   │  │ Extensão Chrome        │ │
│  │ (web)    │  │  Android)    │  │ (Crunchyroll bridge)   │ │
│  └────┬─────┘  └──────┬───────┘  └───────────┬────────────┘ │
│       │               │                       │              │
│       └───────────────┼───────────────────────┘              │
│                       │ HTTPS  /api/v1… (futuro)             │
└───────────────────────┼──────────────────────────────────────┘
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  API Express (monólito atual → evoluir)                      │
│  • Auth JWT (+ refresh em P1)                                │
│  • Catálogo, search, interações, lista, notificações       │
│  • NotificationDispatch: web | fcm | apns                   │
│  • Redis cache (leitura)                                     │
└───────────────────────┼──────────────────────────────────────┘
                        ▼
              PostgreSQL (Prisma) + Redis opcional
```

### 2.1 API única

| Decisão | Detalhe |
|---------|---------|
| Base URL | `https://<api>/api` hoje; introduzir prefixo **`/api/v1`** sem quebrar web (proxy Next mantém `/api` → v1). |
| Contratos | Pacote monorepo `packages/shared` (tipos OpenAPI gerados ou Zod compartilhado) — **Notif-A** na web primeiro. |
| BFF Next | Mantém só o que é web-specific (cookie session, imagens IGDB proxy). App **não** depende de rotas `frontend/app/api/*`. |
| Versionamento | Header `X-Client: orbe-app/1.0.0` para telemetria e rate limit por cliente. |

### 2.2 Autenticação

| Hoje | Alvo |
|------|------|
| JWT 7d, localStorage + cookie httpOnly no web | **Access** curto (15–60 min) + **refresh** rotacionável em tabela `RefreshToken` |
| App | **Secure Store** (Expo) para refresh; access em memória |
| Biometria | `expo-local-authentication` desbloqueia refresh, não substitui login inicial |

**Não verificado:** requisitos exatos App Store para “Sign in with Apple” se houver login social no futuro.

### 2.3 Camada de dados no app

- **@tanstack/react-query** (já no `package.json` web, pouco usado — **padrão oficial** no app) para cache, stale-while-revalidate, retry.
- **Persistência:** `expo-sqlite` ou MMKV para: sessão, última homepage, fila de **Minha Lista** pendente (offline).
- **Offline (escopo sensato):** catálogo **não** offline completo (muito grande); offline = **lista + notificações lidas + última home em cache**.
- **Imagens:** CDN TMDB/IGDB com cache nativo (`expo-image`).

### 2.4 Design system compartilhado

| Token | Web | App |
|-------|-----|-----|
| Cor accent Pulp `#E8482B` / `#FF5A36` | `globals.css` | `theme.ts` |
| Tipografia Russo One / Bricolage | `layout.tsx` | `expo-font` + fallback system |
| Cards de mídia | `MidiaCard.tsx` | **reimplementar** com gestos (não copiar DOM) |
| Dark/light | `useTheme` | `expo-system-ui` + mesmo enum |

Material no Android: usar **Navigation Material 3** sem abandonar identidade Orbe (cor primária Pulp). iOS: tab bar + large titles onde fizer sentido (HIG).

### 2.5 Push (ligação com Fase 3B)

- Backend: modelo `DevicePushToken` (ver `plano-performance-notificacoes.md`).
- App: FCM token → `POST /notifications/register-device`.
- Deeplinks: `orbe://anime/:id`, `orbe://filme/:tmdbId` → Expo Router groups.

---

## 3. Ordem de migração (telas / valor)

Priorizar **núcleo de valor**: descobrir lançamento → detalhe → acompanhar (lista) → alertas.

| Onda | Telas / fluxos | Dependências backend | Valor |
|------|----------------|----------------------|--------|
| **M0** | Shell: login, registro, tab Home vazia, config API URL dev | P0 auth | Smoke |
| **M1** | **Home** (4 carrosséis) + **Hoje** resumido | cache/perf OK | Mesma proposta `llm.md` |
| **M2** | **Busca** + listagens **Filmes** (1 tipo piloto) | search trigram opcional | Prova de lista performática |
| **M3** | **Detalhe** filme + interações (favorito, quero ver) | interações API estáveis | Conta útil |
| **M4** | **Minha Lista animes** + progresso | **P0.1 lista** | Diferencial Crunchyroll |
| **M5** | **Notificações** inbox + push + deeplink | P0.4 + FCM | Retenção |
| **M6** | Séries, animes, jogos, promoções, perfil | incremental | Paridade web |
| **M7** | Biometria, widgets (Android), atalhos iOS | polish | “Sensação grande empresa” |

**Corte consciente:** `/admin`, sync logs, **extensão** permanece web-only na v1 mobile (deep link para `/extensao` se necessário).

---

## 4. Distribuição **sem** depender de loja paga

> Valores em **USD** conforme documentação oficial consultada em **nov/2026**; câmbio/IOF Brasil **não calculados**.

### 4.1 Android

| Canal | Custo | Como | Limitações |
|-------|-------|------|------------|
| **APK/AAB direto (sideload)** | **$0** | Hospedar APK no seu site/CDN + página com hash SHA-256; usuário habilita “fontes desconhecidas” | Sem auto-update confiável sem mecanismo próprio; usuário avançado; Play Protect pode alertar |
| **Firebase App Distribution** | **$0** (produto no-cost no Spark) | Upload AAB/APK; até **500 testers/projeto**, **1000 releases/app**, release expira **150 dias** ([Firebase FAQ](https://firebase.google.com/docs/app-distribution/troubleshooting)) | Não é loja pública; cada tester instala app Firebase |
| **Link próprio + expo-updates** | Expo Update: **1k MAU free** ([expo.dev/pricing](https://expo.dev/pricing)) | OTA de JS; binário nativo ainda precisa distribuir | MAU acima do free = pago |
| **F-Droid** | **$0** | Build reproduzível, código aberto, fila de revisão comunitária | App deve ser **FOSS**-compatível; libs proprietárias (Google Play Services em alguns módulos) complicam; processo lento |
| **Google Play** | **US$ 25 único** ([Play Console Help](https://support.google.com/googleplay/android-developer/answer/6112435)) | Loja oficial, updates automáticas | **Não** é “sem pagar loja”, mas é barato |

**Recomendação Android beta:** APK assinado + **Firebase App Distribution** para círculo fechado; site `orbe-…/app/android` com link e instruções PT-BR.

### 4.2 iOS — honestidade

| Canal | Custo | Possível? |
|-------|-------|-----------|
| **Conta Apple gratuita (Xcode)** | **$0** | Instalar só em **dispositivos próprios**; certificado de desenvolvimento expira (~**7 dias** para free provisioning em builds não-App-Store — comportamento clássico; **confirme** na doc atual do Xcode ao usar) |
| **TestFlight** | Requer **Apple Developer Program** **US$ 99/ano** ([developer.apple.com/programs](https://developer.apple.com/programs/)) | Até 10k testers externos; **padrão** para beta iOS |
| **IPA ad hoc (paga)** | **$99/ano** | Até **100 devices/ano** registrados no perfil ad hoc | Gestão manual de UDIDs |
| **PWA instalável (Safari)** | **$0** | Ícone na home, push limitado, sem slot App Store | **Não** é app nativo; performance e APIs inferiores |
| **App Store pública** | **$99/ano** | Único caminho “oficial” de update amplo no iOS | Revisão Apple |
| **Alternativas / sideload (UE, etc.)** | Variável | Ecossistema em mudança; **não** é base confiável para produto BR em 2026 sem assessoria jurídica |

**O que NÃO dá para fazer de graça no iOS (com honestidade):**

- Distribuir para **muitos usuários** com updates confiáveis **sem** os **US$ 99/ano** (salvo PWA ou contas dev de 7 dias para hobby).
- Push APNs em produção sem certificados ligados a conta paga (**não verificado** em ambiente de teste free nesta sessão).

**Recomendação iOS:** até haver receita ou PIX `/apoie`, priorizar **Android + web PWA push**; iOS beta só se aceitar **$99/ano** ou audiência muito pequena em dispositivos pessoais.

### 4.3 Brasil / região

- Cobrança Apple/Google em USD com possível conversão — **não verificado** fatura BR.
- APK direto é **legal** para distribuição própria; responsabilidade de atualização e segurança é sua.

---

## 5. Marcos (milestones) e critérios de aceite

| Marco | Entregável | Critério de aceite |
|-------|------------|-------------------|
| **G0 — Prontidão backend** | P0 roadmap fechado | Checklist FASE 1 §10 manual passa; contrato notificações OK |
| **G1 — Monorepo mobile** | `apps/orbe-mobile` Expo 52+, EAS configurado | `eas build` Android debug instala em 1 device; chama `GET /health` |
| **G2 — Auth** | Login + refresh + secure store | Sessão persiste 7 dias com biometria opcional; logout revoga refresh |
| **G3 — Home M1** | 4 carrosséis + pull-to-refresh | Scroll 60 fps em device médio (subjetivo); payload < web mobile |
| **G4 — Lista M4** | Minha Lista animes | 2 usuários, mesmos animes, sem 500; sync parcial offline enfileirado |
| **G5 — Push M5** | FCM + inbox | T8/T9 do plano notificações; toque abre tela certa |
| **G6 — Beta fechada** | Firebase App Distrib. + página download Android | 10 testers instalam sem Play; política privacidade atualizada |
| **G7 — iOS (opcional)** | TestFlight **se** $99 aprovado | 5 testers iOS; mesmo fluxo G3–G5 |
| **G8 — Loja (opcional)** | Play $25 | 1 versão pública “early access” |

---

## 6. Stack técnica sugerida (app)

| Camada | Escolha |
|--------|---------|
| Runtime | Expo SDK alinhado ao RN estável (**versão exata: fixar na G1**, não verificado aqui) |
| Navegação | Expo Router (tabs + stack) |
| UI | NativeWind 4 ou Tamagui; Reanimated 3; `@shopify/flash-list` |
| Estado server | TanStack Query |
| Estado local | Zustand (paridade mental com web) |
| Auth token | `expo-secure-store` |
| Push | `expo-notifications` + Firebase project |
| Biometria | `expo-local-authentication` (G7+) |
| Testes | Maestro ou Detox E2E em login + home |

Estrutura monorepo proposta (quando você aprovar implementação):

```
apps/orbe-mobile/     # Expo
packages/shared/      # tipos, zod schemas, constants API
api/                  # existente
frontend/             # existente
```

---

## 7. Riscos

| Risco | Mitigação |
|-------|-----------|
| API instável (listas, cache) | G0 obrigatório |
| Custo iOS | Android-first; PWA para iPhone leve |
| Expo free build queue 90+ min | Build local ou Starter $19/mês |
| Review Play (política conteúdo +18) | Mesmas regras `AdultContentModal` |
| Duplicar UI 100% | Aceitar paridade **funcional**, não pixel-perfect v1 |

---

## 8. Próximas ações (sua decisão — sem código até OK)

1. Aprovar **React Native + Expo** como única stack mobile.  
2. Confirmar **Android-first** e se **US$ 99/ano Apple** entra no orçamento.  
3. Autorizar **Pacotes P0 + G1** (backend + scaffold `apps/orbe-mobile`) — então forneço plano de arquivos e comandos `git`/`eas` para você executar.  
4. Responder perguntas da [`mapa-visao-vs-realidade.md`](mapa-visao-vs-realidade.md) §9 (foco lista, notificações, offline).

---

## 9. Resumo executivo

- **Recomendação única:** **React Native (Expo)** — alinhado a TypeScript/React, menor tempo até beta, FCM nativo, caminho para polish “empresa” com Reanimated + design tokens Pulp.  
- **Não use** Capacitor/WebView como produto principal — contradiz sua missão.  
- **Distribuição sem loja:** viável **bem** no **Android** (APK + Firebase grátis); no **iOS**, sem pagar fica restrito a **PWA** ou **hobby 7 dias** — TestFlight exige **~US$ 99/ano**.  
- **Ordem:** estabilizar API (P0) → app M0–M5 → beta Android → iOS se orçado.

---

*FASE 4 concluída. Missão em 4 fases: **todos os entregáveis** estão em `docs/` (`auditoria-codigo.md`, `mapa-visao-vs-realidade.md`, `roadmap.md`, `plano-performance-notificacoes.md`, `plano-portabilidade-app.md`). Implementação aguarda sua aprovação explícita por pacote.*