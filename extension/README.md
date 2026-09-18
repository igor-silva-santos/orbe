# Extens├úo Orbe ÔÇö Sync Crunchyroll

Sincroniza a fila de animes da Crunchyroll diretamente com o Orbe, enviando t├¡tulo, epis├│dio, temporada e tempo restante.

**C├│digo aberto** ÔÇö toda a extens├úo est├í em `extension/` e pode ser auditada antes de instalar.

## Site explicativo

Abra no Orbe: **`/extensao/crunchyroll`**

- Como instalar passo a passo
- Como funciona o fluxo de sync
- O que enviamos e o que **n├úo** enviamos
- Permiss├Áes explicadas
- Lista de arquivos fonte para auditoria

## Instala├º├úo

1. Abra `chrome://extensions`
2. Ative **Modo do desenvolvedor**
3. Clique em **Carregar sem compacta├º├úo**
4. Selecione a pasta `extension/` deste reposit├│rio

## Autentica├º├úo

1. Fa├ºa login no Orbe
2. Abra **`/extensao`** (`http://localhost:3000/extensao`)
3. Clique em **Conectar extens├úo**
4. A p├ígina envia o token JWT para a extens├úo (handshake com confirma├º├úo)

Alternativa manual: popup da extens├úo ÔåÆ cole token + URL absoluta da API (`http://localhost:5000/api`).

## Uso

1. Conecte a extens├úo pelo Orbe
2. Abra sua fila na Crunchyroll (`/watchlist`, `/queue`)
3. No popup, marque a confirma├º├úo de espelhamento
4. Clique em **Sincronizar fila agora**

## Modo seguro (replace)

- **Replace** (espelha a fila CR no Orbe) s├│ ocorre se **100%** dos itens importarem com sucesso
- Se houver falhas parciais, usa **merge** ÔÇö nada ├® removido da sua lista
- Itens de cat├ílogo ou backup (`source` diferente) nunca s├úo apagados pelo replace

## Endpoints usados

- `POST /api/minha-lista/animes/import/session`
- `POST /api/minha-lista/animes/import` (um por anime)
- `POST /api/minha-lista/animes/import/session/:id/finish` (`mode: replace` ou `merge`)

## Permiss├Áes

| Dom├¡nio | Motivo |
|---------|--------|
| `crunchyroll.com` | Ler fila na p├ígina aberta |
| `localhost:3000` / `orbenerd.com` | Receber token do Orbe |
| `localhost:5000` / API Orbe | Enviar dados para sua Minha Lista |
| `storage` | Guardar token localmente no Chrome |

## Privacidade

- Sem analytics, sem telemetria, sem c├│digo remoto
- Sem acesso a senhas ou cookies da Crunchyroll
- Sem comunica├º├úo com servidores de terceiros
