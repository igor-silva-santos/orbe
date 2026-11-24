# Plano detalhado — Marco M2 (Android + base web)

| Campo | Valor |
|--------|--------|
| **Data** | 24/11/2026 |
| **Pré-requisito** | P0 aplicado (branch atual), scaffold `apps/orbe-mobile` M0/M1 parcial |
| **Decisão de produto** | Expo · APK no site · **sem** iOS pago ([`decisoes-produto-mobile.md`](decisoes-produto-mobile.md)) |
| **Escopo M2** | Navegação nativa, **Home completa**, **Filmes** (piloto), **Busca**, **Notif-A** + VAPID em staging, **1º APK** publicável |

Este documento é o **roteiro de implementação** — nenhum passo aqui assume que você já rodou testes; marque ✅ conforme validar.

---

## 1. Objetivo do M2 (aceite de produto)

| # | Critério | Como validar |
|---|----------|----------------|
| A1 | Usuário logado vê **4 carrosséis** na Home (filmes, séries, animes, jogos) com scroll horizontal fluido | Dispositivo ou emulador Android |
| A2 | Aba **Filmes** lista com paginação ou “carregar mais” e pelo menos 1 filtro (ex.: mês) | Scroll + filtro altera lista |
| A3 | **Busca** retorna resultados agrupados ou por categoria (mínimo: filmes + 1 outro tipo) | Query `batman` (ou similar) |
| A4 | Modal in-app de **notificações** na web mostra texto e data (Notif-A) | Navegador logado |
| A5 | **Push web** funciona em staging com VAPID (subscribe + 1 push de teste) | Chrome + service worker |
| A6 | **APK** assinado hospedado em HTTPS; página `/app/android` com link ativo | `NEXT_PUBLIC_ANDROID_APK_URL` |

---

## 2. O que já existe (não refazer)

| Item | Local |
|------|--------|
| Login + token Secure Store | `apps/orbe-mobile/app/login.tsx`, `src/auth.ts` |
| Prévia Home (só filmes) | `app/index.tsx` |
| P0 API (cache, WS, listas, notificações mapper web) | commits locais / branch `cursor/expo-android-p0-c710` se você pushou |
| Doc distribuição | [`distribuicao-android-apk.md`](distribuicao-android-apk.md) |
| Página download | `frontend/src/app/app/android/page.tsx` |

---

## 3. Arquitetura alvo no app (M2)

```
apps/orbe-mobile/
├── app/
│   ├── _layout.tsx          # Tabs + auth guard
│   ├── (tabs)/
│   │   ├── _layout.tsx      # Tab bar: Início | Filmes | Busca | Conta
│   │   ├── index.tsx        # Home (4 carrosséis)
│   │   ├── filmes.tsx       # Listagem piloto
│   │   ├── busca.tsx        # Search
│   │   └── conta.tsx        # Perfil + logout + versão
│   ├── login.tsx
│   └── filme/[id].tsx       # Detalhe mínimo (M2.5 — opcional no mesmo sprint)
├── src/
│   ├── api/
│   │   ├── client.ts        # fetch + Bearer + timeout
│   │   ├── homepage.ts
│   │   ├── filmes.ts
│   │   └── search.ts
│   ├── components/
│   │   ├── MediaCarousel.tsx
│   │   ├── MediaCard.tsx
│   │   └── FilterChipRow.tsx
│   ├── types/
│   │   └── media.ts         # subset dos tipos do web
│   └── theme.ts             # cores Pulp (#E8482B, #0B0B10)
```

**Dependências npm a acrescentar no M2** (você roda `npm install`):

| Pacote | Uso |
|--------|-----|
| `@shopify/flash-list` | Listas performáticas |
| `expo-image` | Posters com cache |
| `react-native-reanimated` | Gestos leves nos carrosséis (opcional M2; pode ser M3) |

**Não incluir ainda:** push nativo FCM (M5), offline SQLite (M4+), refresh token (P1 backend).

---

## 4. API — endpoints que o M2 consome

| Uso | Método | Rota | Query / auth | Resposta relevante |
|-----|--------|------|--------------|-------------------|
| Home | GET | `/api/homepage` | Pública (cache) | `{ filmes, series, animes, jogos }[]` cards |
| Filmes | GET | `/api/filmes` | `page`, `limit`, `mes`, `ano`, `filtro`, `genero` | `{ results, total }` |
| Filtros filmes | GET | `/api/filmes/filtros` | — | gêneros, anos (opcional chips) |
| Detalhe filme | GET | `/api/filmes/:tmdbId/details` | Bearer opcional | payload grande — **só se** fizer tela `[id]` |
| Busca | GET | `/api/pesquisa` | `q` (≥2 chars), `category` opcional | `{ filmes, series, animes, jogos, … }` |
| Login | POST | `/api/auth/login` | body | `{ token, user }` |
| Eu | GET | `/api/auth/me` | Bearer | perfil na aba Conta |

**CORS:** em produção a API precisa incluir o scheme do app **não se aplica** a chamadas HTTP diretas (sem browser). Emulador: `10.0.2.2:3001`. Dispositivo físico: IP LAN ou URL pública HTTPS.

**Contrato de card:** alinhar com o que `/homepage` já devolve (`titulo_curado`, `titulo_api`, `poster_url_api`, ids externos). Tipar em `src/types/media.ts` copiando **só campos usados** de `frontend/src/types/index.ts` (evita pacote `shared` gigante no M2).

---

## 5. Tarefas por pacote (ordem de implementação)

### Pacote M2-A — Cliente HTTP e navegação (app)

| ID | Tarefa | Arquivos | Esforço |
|----|--------|----------|---------|
| A1 | Extrair `api/client.ts` com `getJson`, timeout 30s, header `Authorization` | `src/api/client.ts` | P |
| A2 | Refatorar `login` para `client.ts`; mover homepage para `homepage.ts` | `src/api.ts` → módulos | P |
| A3 | Trocar `Stack` por **Tabs** `(tabs)/_layout` | `app/_layout.tsx`, novo `(tabs)/` | M |
| A4 | Auth guard: sem token → `/login` | `app/_layout` ou hook `useAuth` | P |
| A5 | Tema Pulp em `theme.ts` + StatusBar | `src/theme.ts` | P |

### Pacote M2-B — Home (quatro carrosséis)

| ID | Tarefa | Detalhe |
|----|--------|---------|
| B1 | `MediaCard`: poster `expo-image`, título 2 linhas, onPress | Reutilizar em Home e Filmes |
| B2 | `MediaCarousel`: `FlashList` horizontal, `estimatedItemSize` | Inspirar em `MediaCarousel.tsx` web, **sem** copiar DOM |
| B3 | `(tabs)/index.tsx`: um `useQuery` em `/homepage`, 4 seções | Loading / erro / pull-to-refresh |
| B4 | Medir: 1º paint &lt; 3s em API produção **não verificado** até você medir | Anotar em `plano-m2-android.md` §9 |

### Pacote M2-C — Filmes (piloto de listagem)

| ID | Tarefa | Detalhe |
|----|--------|---------|
| C1 | `(tabs)/filmes.tsx` | `GET /filmes?page=1&limit=24` |
| C2 | Filtro mínimo | Chip “Este mês” usando `mes`/`ano` como no web (`FilmesClient`) |
| C3 | Paginação | `onEndReached` → `page++` até `results.length < limit` |
| C4 | (Opcional M2) | `app/filme/[id].tsx` — só título, sinopse, poster; sem SuperModal |

### Pacote M2-D — Busca

| ID | Tarefa | Detalhe |
|----|--------|---------|
| D1 | `(tabs)/busca.tsx` | Input debounce 400ms, mínimo 2 caracteres |
| D2 | Chamar `GET /pesquisa?q=` | Listar filmes primeiro; abas séries/animes depois |
| D3 | Empty state e erro de rede | Mensagem PT-BR |

### Pacote M2-E — Conta

| ID | Tarefa | Detalhe |
|----|--------|---------|
| E1 | `(tabs)/conta.tsx` | E-mail de `GET /auth/me` |
| E2 | Logout | `clearToken()` + replace `/login` |
| E3 | Versão | `expo-constants` `version` + `apiUrl` debug |

### Pacote M2-F — Notif-A + VAPID (web/staging)

| ID | Tarefa | Onde | Nota |
|----|--------|------|------|
| F1 | Confirmar mapper | `frontend/src/lib/notifications.ts` | Já corrigido no P0 — **testar** |
| F2 | Gerar VAPID | Máquina local: `npx web-push generate-vapid-keys` | **Não commitar** chave privada |
| F3 | Injetar env na API staging | `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, `VAPID_SUBJECT=mailto:...` | Render/Railway |
| F4 | Teste push | Import CR ou rota admin que chama `createNotification({ sendPush: true })` | T2–T3 em `plano-performance-notificacoes.md` |
| F5 | Banner push | `PushOptInBanner` na home ou conta web | Opcional |

**Fora do M2:** FCM no app nativo, `DevicePushToken`, dedupe `scheduleChecker`.

### Pacote M2-G — Primeiro APK no site

| ID | Tarefa | Referência |
|----|--------|------------|
| G1 | Ícones reais em `apps/orbe-mobile/assets/` | 1024 icon, adaptive, splash |
| G2 | `EXPO_PUBLIC_API_URL` apontando **produção** no profile `production-apk` | `eas.json` env |
| G3 | `eas build -p android --profile production-apk` | [`distribuicao-android-apk.md`](distribuicao-android-apk.md) |
| G4 | Upload APK (Vercel Blob, R2, GitHub Release — **você escolhe**) | HTTPS |
| G5 | Vercel `NEXT_PUBLIC_ANDROID_APK_URL` | Redeploy frontend |
| G6 | Página `/app/android` + SHA-256 na página (editar page.tsx se quiser campo estático) | Confiança do usuário |

---

## 6. Paralelismo sugerido (você + agente)

| Semana de foco | Você (manual) | Agente (código, após seu OK) |
|----------------|---------------|------------------------------|
| 1 | Rodar P0 tests + `npm install` mobile | M2-A, M2-B |
| 2 | VAPID em staging, testar notificações web | M2-C, M2-D, M2-E |
| 3 | `eas build`, hospedar APK, env Vercel | Polish + doc SHA na página |

*(“Semana” é organização sua — não é estimativa de agente.)*

---

## 7. Testes M2 (checklist)

### App Android

- [ ] Login com conta de teste
- [ ] Home: 4 seções não vazias (se API prod populada)
- [ ] Filmes: trocar filtro mês muda lista
- [ ] Busca: 2+ caracteres retorna itens
- [ ] Conta: logout volta ao login
- [ ] Modo avião após login: Home mostra erro amigável (sem crash)
- [ ] APK release: instala em dispositivo físico (fontes desconhecidas)

### Web (Notif-A)

- [ ] Modal notificações: mensagem legível + data PT-BR
- [ ] Push: permissão → subscribe → 1 notificação recebida
- [ ] Clique na notificação abre URL (`sw.ts`)

### Regressão P0

- [ ] Dois usuários: mesmo anime no catálogo → ambos 200
- [ ] Invalidação cache remove chaves `cache:v4:*`

---

## 8. Comandos (para você executar)

### Instalar deps do app após M2-A (exemplo)

```bash
cd /workspace/apps/orbe-mobile
npm install @shopify/flash-list expo-image
```

```powershell
powershell.exe -ExecutionPolicy Bypass -Command "Set-Location /workspace/apps/orbe-mobile; npm install @shopify/flash-list expo-image"
```

### VAPID

```bash
cd /workspace/api
npx web-push generate-vapid-keys
```

Coloque as chaves no `.env` da API (staging/produção), **não** no Git.

### Build APK

```bash
cd /workspace/apps/orbe-mobile
eas build -p android --profile production-apk
```

### Frontend APK URL

```bash
# Exemplo após upload — no painel Vercel, Environment Variables:
# NEXT_PUBLIC_ANDROID_APK_URL=https://orbe-seven.vercel.app/downloads/orbe-nerd-0.1.0.apk
```

---

## 9. Registro de medições M2 (preencher)

| Data | Home TTFB API | App Home load | Busca `q=duna` | APK URL live |
|------|---------------|---------------|----------------|--------------|
| — | — | — | — | — |

---

## 10. Riscos e cortes se atrasar

| Se atrasar… | Cortar | Manter |
|-------------|--------|--------|
| Tempo | Detalhe `filme/[id]` | Home + Filmes + Busca |
| VAPID bloqueado | Push (F4) para M2.1 | Notif-A in-app |
| EAS fila longa | Build local Gradle | Mesmo APK objetivo |

---

## 11. Depois do M2 (M3 preview)

- **Minha Lista animes** no app (depende lista P0 estável em prod)
- **Interações** (favorito) no card
- **expo-notifications** + FCM
- Pacote `packages/shared` com OpenAPI ou Zod único
- Biometria no login (unlock token)

---

## 12. “Pacotes autorizados” — o que é isso?

**Não é download nem licença.** São só os **blocos de trabalho** da tabela acima (M2-A … M2-G).

| Você responde… | Significado |
|----------------|-------------|
| **“faz tudo do M2”** | Implementar A–G conforme o plano |
| **“só app, sem VAPID/APK”** | A–E (código mobile); F–G ficam com você |
| **“M2-A até M2-E”** | Núcleo do app (feito em `cursor/m2-android-c710`) |

**API:** `https://orbe-7bu0.onrender.com/api` (Render + `app.json` / `eas.json`).

**Próximo manual:** `npm install` em `apps/orbe-mobile`, `npx expo start`, login, testar abas. APK = pacote **M2-G** (`eas build`).