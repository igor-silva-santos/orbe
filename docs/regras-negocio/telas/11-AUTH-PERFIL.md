# Regras de negócio — Autenticação, Perfil e Configurações

## Login (`app/login/page.tsx`)

| ID | Regra | Descrição | Evidência |
|----|-------|-----------|-----------|
| RN-AUTH-001 | Campos obrigatórios | Email (`type=email`) e senha são `required` no formulário. | `login/page.tsx` (linhas 72–100) |
| RN-AUTH-002 | Fluxo de sucesso | `loginWithCredentials` → `saveToken` implícito → `establishBrowserSession(token)` → `login(user)` no store → redirect `safeRedirectPath(redirect query)`. | `login/page.tsx` (26–31); `lib/auth/session.ts` (36–39); `lib/session.ts` (8–12) |
| RN-AUTH-003 | Erro genérico | Falha de API mostra toast “Ocorreu um erro ao tentar fazer login”. | `login/page.tsx` (32–34) |
| RN-AUTH-004 | Redirect seguro | Parâmetro `redirect` só aceita path relativo único; bloqueia `//` e `/\`. | `lib/session.ts` (8–12) |
| RN-AUTH-005 | UI senha | Toggle mostrar/ocultar senha. | `login/page.tsx` (linhas 102–108) |
| RN-AUTH-006 | Link cadastro | Rodapé aponta `/register`. | `login/page.tsx` (129–136) |

## Registro (`app/register/page.tsx`)

| ID | Regra | Descrição | Evidência |
|----|-------|-----------|-----------|
| RN-AUTH-010 | Senha mínima | `MIN_PASSWORD_LENGTH = 8`; validação client antes do submit e `minLength` no input. | `register/page.tsx` (linhas 12, 28–30, 131) |
| RN-AUTH-011 | Confirmação | Senha e confirmar devem coincidir; toast se divergirem. | `register/page.tsx` (32–35) |
| RN-AUTH-012 | Campos | Nome, email e senhas obrigatórios. | `register/page.tsx` (79–165) |
| RN-AUTH-013 | Pós-registro | Mesmo fluxo de sessão do login: token, cookie, `login(user)`, redirect seguro. | `register/page.tsx` (40–45) |
| RN-AUTH-014 | Erro API | Toast com `error.message` se `Error`, senão mensagem genérica. | `register/page.tsx` (46–48) |

## Sessão global (`AppProvider`, store, middleware)

| ID | Regra | Descrição | Evidência |
|----|-------|-----------|-----------|
| RN-AUTH-020 | Bootstrap | Ao carregar app, `bootstrapSession()` restaura usuário via token; se falhar, limpa token. | `AppProvider.tsx` (27–35); `lib/auth/session.ts` (24–32) |
| RN-AUTH-021 | Dados pós-login | Com usuário válido, carrega notificações, interações e pins da semana de anime. | `AppProvider.tsx` (37–57) |
| RN-AUTH-022 | Persistência Zustand | Store persiste `user`, `isAuthenticated`, `theme`, `userInteractions`, `fastScrollEnabled`; reidrata `isAuthenticated` se há `user`. | `appStore.ts` (310–321) |
| RN-AUTH-023 | Logout | `logout` limpa token (`clearSession`), usuário, notificações, interações e pins semanais. | `appStore.ts` (138–148); `lib/auth/session.ts` (54–57) |
| RN-AUTH-024 | Cookie sessão | `establishBrowserSession` POST `/api/auth/session`; cookie httpOnly 7 dias em produção `secure`. | `lib/session.ts` (14–38) |
| RN-AUTH-025 | Role normalizada | API: `admin` ou default `user` em `normalizeUser`. | `lib/auth/session.ts` (8–16) |

## Perfil (`app/perfil/page.tsx`)

| ID | Regra | Descrição | Evidência |
|----|-------|-----------|-----------|
| RN-AUTH-030 | Proteção rota | Middleware exige sessão; página ainda redireciona login se `getUserProfile` falhar. | `middleware.ts`; `perfil/page.tsx` (24–27) |
| RN-AUTH-031 | Dados exibidos | Nome, email, role (Administrador vs Explorador), avatar remoto só se host permitido (`isAllowedRemoteImageHost`). | `perfil/page.tsx` (82–100, 11) |
| RN-AUTH-032 | Bio | Texto da bio ou placeholder convidando a editar em configurações. | `perfil/page.tsx` (152–154) |
| RN-AUTH-033 | Conta | Email, membro desde (`data_criacao` pt-BR), visibilidade Público/Privado (`perfil_publico`). | `perfil/page.tsx` (158–177) |
| RN-AUTH-034 | Atalhos | Links: Minha lista, Configurações. | `perfil/page.tsx` (104–117) |
| RN-AUTH-035 | Admin sync | Role `admin`: link `/admin/sync-logs` e botão temporário para baixar log de sync (`/sync/logs?filter=sync`). | `perfil/page.tsx` (118–138) |

## Configurações (`app/configuracoes/page.tsx`)

| ID | Regra | Descrição | Evidência |
|----|-------|-----------|-----------|
| RN-AUTH-040 | Proteção | Mesmo padrão perfil: middleware + redirect se falha ao carregar perfil. | `configuracoes/page.tsx` (21–35) |
| RN-AUTH-041 | Campos editáveis | Nome, URL avatar, bio, toggle perfil público (default `true` se ausente na API). | `configuracoes/page.tsx` (16–29, 90–145) |
| RN-AUTH-042 | Salvar | `updateUserProfile` com objeto `{ nome, bio, avatar, perfil_publico }`; feedback success/error inline. | `configuracoes/page.tsx` (41–57, 72–77) |
| RN-AUTH-043 | Privacidade copy | Toggle “Perfil Público” descreve visibilidade de lista e favoritos para outros usuários. | `configuracoes/page.tsx` (133–137) |
| RN-AUTH-044 | Sem alteração de senha | Página não expõe troca de senha ou email (apenas perfil público básico). | `configuracoes/page.tsx` (arquivo completo) |

## Relação Header ↔ rotas protegidas

| ID | Regra | Descrição | Evidência |
|----|-------|-----------|-----------|
| RN-AUTH-050 | Minha lista no menu | Usuário logado acessa `/minha-lista` pelo header (user menu e mobile). | `Header.tsx` (203–210, 303–308) |
| RN-AUTH-051 | Perfil no menu | Link `/perfil` no menu usuário; configurações só via perfil ou botão dedicado. | `Header.tsx` (211–218); `perfil/page.tsx` (111–117) |
