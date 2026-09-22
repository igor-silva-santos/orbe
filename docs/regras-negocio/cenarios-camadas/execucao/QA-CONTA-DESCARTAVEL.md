# Conta QA descartável — criar e excluir

**Público:** agentes QA, QA sênior, automação Playwright  
**Produção:** https://orbe-seven.vercel.app  

O PO autorizou **conta própria por rodada**, sem e-mail de confirmação. Ao terminar os testes, a conta **deve ser excluída** (LGPD / não poluir base).

---

## 1. Criar conta (cadastro)

| Passo | Ação |
| --- | --- |
| 1 | Abrir `/register` |
| 2 | Preencher nome, e-mail único, senha (mín. 8 caracteres) |
| 3 | Concluir cadastro — sessão ativa imediatamente |

**Sugestão de e-mail para agentes:** `qa.orbe+{runId}@discard.test` (ou domínio acordado com o time) — o importante é **único por execução**. Não há confirmação por e-mail no cadastro atual.

**API (automação):**

```http
POST /api/auth/register
Content-Type: application/json

{ "nome": "QA Run abc123", "email": "qa+abc123@...", "password": "SenhaForte8!" }
```

Resposta inclui `token` — usar em `Authorization: Bearer …` nas rotas logadas.

---

## 2. Excluir conta (logado)

| Passo | Ação |
| --- | --- |
| 1 | Estar logado |
| 2 | Ir em **Configurações** (`/configuracoes`) |
| 3 | Seção **Excluir conta** → informar **senha** → confirmar |
| 4 | Redirecionamento à home; token local removido |

**API (automação — preferível no teardown da rodada):**

```http
DELETE /api/users/me
Authorization: Bearer <token>
Content-Type: application/json

{ "password": "SenhaForte8!" }
```

Resposta **204** = conta e dados vinculados removidos (lista, notificações, preferências, etc.). Contas **admin** retornam **403**.

---

## 3. Fluxo recomendado do agente QA

```
INÍCIO → register (ou reutilizar QA_EMAIL/QA_PASSWORD da rodada)
       → executar cenários Feliz logados
       → evidências / planilha humana
FIM    → DELETE /api/users/me com a mesma senha
```

Variáveis de ambiente opcionais nos scripts em `docs/regras-negocio/scripts/`:

- `QA_EMAIL`, `QA_PASSWORD` — conta fixa da rodada  
- `QA_AUTO_REGISTER=1` — criar e-mail `qa+{timestamp}@…` se não houver credenciais (quando script suportar)

---

## 4. Regras de negócio

- Cadastro já existente em prod (`RN-AUTH-013` etc.) cobre o caminho feliz de **criar** conta.
- Exclusão em **Configurações** cobre o direito de apagar dados (alinha com texto de privacidade).
- TL: amostrar que contas `qa+*` não permanecem na base após teardown.
