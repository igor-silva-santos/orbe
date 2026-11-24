# M2-F — VAPID no Render + teste push

Passos **manuais** (chaves não vão para o Git).

## 1. Gerar par VAPID

Na sua máquina:

```bash
cd api
npx web-push generate-vapid-keys
```

Guarde **public** e **private**.

## 2. Variáveis no Render (`orbe-api`)

| Variável | Valor |
|----------|--------|
| `VAPID_PUBLIC_KEY` | chave pública (linha Public Key) |
| `VAPID_PRIVATE_KEY` | chave privada |
| `VAPID_SUBJECT` | `mailto:seu@email.com` |

Salve → **Redeploy** do serviço.

## 3. Validar API

```bash
curl -s https://orbe-7bu0.onrender.com/api/notifications/vapid-public-key
```

Esperado: `{"publicKey":"..."}` (não 503).

## 4. Validar no site (logado)

1. Abra **Configurações** (`/configuracoes`).
2. Seção **Notificações** → **Ativar push** (Chrome, HTTPS).
3. **Enviar notificação de teste** → deve aparecer no sino e, se subscribe OK, notificação do SO.

## 5. Frontend Vercel

Garanta `NEXT_PUBLIC_API_URL=https://orbe-7bu0.onrender.com/api` para o browser chamar a API certa.

## Falhas comuns

| Sintoma | Causa |
|---------|--------|
| 503 em `vapid-public-key` | Variáveis ausentes ou deploy antigo |
| In-app OK, push não | Sem subscribe ou permissão negada |
| Push não na lista animes | Banner só aparecia lá; use também **Configurações** (M2-F) |