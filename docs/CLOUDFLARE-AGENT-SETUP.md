# Cloudflare — setup para agentes (Cursor) + Orbe Tunnel

Instruções oficiais (fonte verificável): [developers.cloudflare.com/agent-setup/prompt.md](https://developers.cloudflare.com/agent-setup/prompt.md)

Este repositório inclui a configuração MCP recomendada para **Cursor** em [`.cursor/mcp.json`](../.cursor/mcp.json). O guia de migração da API sem cartão continua em [`MIGRAR-API-SEM-CARTAO.md`](MIGRAR-API-SEM-CARTAO.md).

---

## O que o prompt oficial pede (resumo)

1. Instalar **Cloudflare Skills** (`cloudflare/skills`).
2. Registrar os **MCP servers** remotos da Cloudflare no arquivo MCP do agente.
3. **OAuth** na primeira vez que usar ferramentas que exigem conta (exceto `cloudflare-docs`, que é público).
4. Reiniciar o agente para carregar os MCPs.

O prompt **não** substitui o passo a passo de **Cloudflare Tunnel** (`cloudflared`) no seu PC — ele prepara o **Cursor** para consultar/operar a conta Cloudflare via MCP quando você estiver autenticado.

---

## No seu PC (Cursor local) — faça você

### 1. Skills

No terminal, na pasta do clone do Orbe (ou em qualquer pasta):

```bash
npx -y skills add cloudflare/skills --skill '*' --yes --global
```

### 2. MCP

**Opção A — usar o repo:** abra o projeto Orbe no Cursor; o arquivo `.cursor/mcp.json` na raiz já lista os cinco servidores.

**Opção B — global:** copie o bloco `mcpServers` para o MCP config global do Cursor (ver [cursor.com/docs/mcp](https://cursor.com/docs/mcp)).

Servidores (URLs oficiais):

| Nome | URL | Auth |
|------|-----|------|
| `cloudflare` | `https://mcp.cloudflare.com/mcp` | OAuth |
| `cloudflare-docs` | `https://docs.mcp.cloudflare.com/mcp` | Nenhuma |
| `cloudflare-bindings` | `https://bindings.mcp.cloudflare.com/mcp` | OAuth |
| `cloudflare-builds` | `https://builds.mcp.cloudflare.com/mcp` | OAuth |
| `cloudflare-observability` | `https://observability.mcp.cloudflare.com/mcp` | OAuth |

### 3. Autenticação OAuth (MCP)

1. **Reinicie** o Cursor (ou recarregue MCP) depois de adicionar os servidores.
2. Abra um chat do Agent e peça algo que use a API Cloudflare (ex.: “liste meus tunnels Zero Trust”).
3. Quando o Cursor pedir, clique para **autorizar** e conclua o login no **navegador** com a conta Cloudflare do Orbe.
4. Se aparecer estado `needsAuth` ou falha de auth: em **Cursor Settings → MCP**, use **Authenticate** / **Login** no servidor `cloudflare` (equivalente ao fluxo `mcp_auth` descrito na doc do Cursor).

**Nunca** commite tokens, API keys ou o token do tunnel no Git. Use apenas o painel Cloudflare + variáveis locais (`api.env`).

### 4. Tunnel + API Orbe (sem cartão)

Siga a seção **5** de [`MIGRAR-API-SEM-CARTAO.md`](MIGRAR-API-SEM-CARTAO.md). Links úteis no dashboard:

- Cadastro: [dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up)
- Zero Trust → Networks → Tunnels: [one.dash.cloudflare.com](https://one.dash.cloudflare.com/) → **Networks** → **Tunnels** → **Create a tunnel**
- Nome sugerido: `orbe-api` → hostname público `api.seudominio.com` → serviço `http://localhost:3001`

Instale **cloudflared** no **mesmo PC** onde roda o Docker da API; o wizard do tunnel gera o comando com token — execute só na sua máquina.

Com MCP autenticado, o Agent pode ajudar a revisar rotas/DNS/tunnels; a conexão outbound do `cloudflared` continua sendo no PC.

---

## Cloud Agent (VM remota) — limitações

- MCP Cloudflare **não** veio pré-instalado nesta sessão; a config do repo foi adicionada para você usar **localmente**.
- OAuth Cloudflare exige **seu navegador** — não dá para vincular a conta do usuário de forma segura na VM do agente.
- Rodar `cloudflared` na VM do agente **não** expõe a API do seu PC; tunnel + Docker devem ficar na sua máquina.

---

## Referências Cloudflare

- Agent setup: [developers.cloudflare.com/agent-setup/prompt.md](https://developers.cloudflare.com/agent-setup/prompt.md)
- Skills: [github.com/cloudflare/skills](https://github.com/cloudflare/skills)
- MCP: [github.com/cloudflare/mcp](https://github.com/cloudflare/mcp) · [github.com/cloudflare/mcp-server-cloudflare](https://github.com/cloudflare/mcp-server-cloudflare)
- Cursor MCP: [cursor.com/docs/mcp](https://cursor.com/docs/mcp)
