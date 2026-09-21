# Extensão Orbe ? Sync Crunchyroll

Sincroniza a fila de animes da Crunchyroll diretamente com o Orbe, enviando título, episódio, temporada e tempo restante.

**Código aberto** ? toda a extensão está em `extension/` e pode ser auditada antes de instalar.

## Site explicativo

Abra no Orbe: **`/extensao/crunchyroll`**

- Como instalar passo a passo
- Como fluxo de sync
- O que enviamos e o que **não** enviamos
- Permissões explicadas
- Lista de arquivos fonte para auditoria

## Instalação

1. Abra `chrome://extensions`
2. Ative **Modo do desenvolvedor**
3. Clique em **Carregar sem compactação**
4. Selecione a pasta `extension/` deste repositório

## Autenticação

1. Faça login no Orbe
2. Abra **`/extensao`** (`http://localhost:3000/extensao`)
3. Clique em **Conectar extensão**
4. A página envia o token JWT para a extensão (handshake com confirmação)

Alternativa manual: popup da extensão ? cole token + URL absoluta da API (`http://localhost:5000/api`).

## Uso

1. Conecte a extensão pelo Orbe
2. Abra sua fila na Crunchyroll (`/watchlist`, `/queue`)
3. No popup, marque a confirmação de espelhamento
4. Clique em **Sincronizar fila agora**

## Modo seguro (replace)

- **Replace** (espelha a fila CR no Orbe) só ocorre se **100%** dos itens importarem com sucesso
- Se houver falhas parciais, usa **merge** ? nada é removido da sua lista
- Itens de catálogo ou backup (`source` diferente) nunca são apagados pelo replace

## Endpoints usados

- `POST /api/minha-lista/animes/import/session`
- `POST /api/minha-lista/animes/import` (um por anime)
- `POST /api/minha-lista/animes/import/session/:id/finish` (`mode: replace` ou `merge`)

## Permissões

| Domínio | Motivo |
|---------|--------|
| `crunchyroll.com` | Ler fila na página aberta |
| `localhost:3000` / `orbenerd.com` | Receber token do Orbe |
| `localhost:5000` / API Orbe | Enviar dados para sua Minha Lista |
| `storage` | Guardar token localmente no Chrome |

## Privacidade

- Sem analytics, sem telemetria, sem código remoto
- Sem acesso a senhas ou cookies da Crunchyroll
- Sem comunicação com servidores de terceiros
