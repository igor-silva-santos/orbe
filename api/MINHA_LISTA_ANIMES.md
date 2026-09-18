# API Orbe ÔÇö Minha Lista (Animes)



Backend da watchlist pessoal de animes, incluindo importa├º├úo direta pela extens├úo Crunchyroll, adi├º├úo pelo cat├ílogo Orbe e importa├º├úo de backup legado.



## Vari├íveis de ambiente



```env

DATABASE_URL=postgresql://...

JWT_SECRET=seu_segredo

FRONTEND_URL=http://localhost:3000

EXTENSION_ORIGIN=chrome-extension://SEU_ID_DA_EXTENSAO

PORT=5000

```



`EXTENSION_ORIGIN` ├® opcional. Por padr├úo, origens `chrome-extension://` e `moz-extension://` j├í s├úo aceitas.



## Migration



```bash

cd api

npm install

npx prisma generate

npx prisma migrate deploy

```



## Fluxo da extens├úo Crunchyroll



1. Usu├írio faz login no Orbe e copia o JWT para a extens├úo.

2. Extens├úo abre a fila da Crunchyroll e inicia uma sess├úo:



```http

POST /api/minha-lista/animes/import/session

Authorization: Bearer <token>

Content-Type: application/json



{ "totalExpected": 42 }

```



3. Para cada anime da fila, a extens├úo envia um item:



```http

POST /api/minha-lista/animes/import

Authorization: Bearer <token>

Content-Type: application/json



{

  "sessionId": "clxxx...",

  "crunchyrollId": "GRMG8KNRX",

  "title": "Demon Slayer: Kimetsu no Yaiba",

  "posterUrl": "https://...",

  "crunchyrollUrl": "https://www.crunchyroll.com/series/GRMG8KNRX",

  "season": 3,

  "episode": 5,

  "totalEpisodes": 11,

  "episodeDurationSec": 1440,

  "remainingTimeSec": 720,

  "hasDub": true

}

```



4. Ao terminar, finaliza a sess├úo:



```http

POST /api/minha-lista/animes/import/session/:sessionId/finish

Authorization: Bearer <token>

```



## Endpoints



| M├®todo | Rota | Descri├º├úo |

|--------|------|-----------|

| GET | `/api/minha-lista/animes` | Lista animes da watchlist |

| GET | `/api/minha-lista/animes/continuar` | Itens com status `continuar` ou `seguir` (carrossel da home) |

| GET | `/api/minha-lista/animes/:id` | Detalhe de um item |

| POST | `/api/minha-lista/animes/from-catalog` | Adiciona anime do cat├ílogo Orbe ├á lista |

| POST | `/api/minha-lista/animes/import/session` | Inicia sess├úo de importa├º├úo |

| GET | `/api/minha-lista/animes/import/session/:sessionId` | Progresso da sess├úo |

| POST | `/api/minha-lista/animes/import/session/:sessionId/finish` | Finaliza sess├úo |

| POST | `/api/minha-lista/animes/import` | Importa/atualiza 1 anime (extens├úo) |

| POST | `/api/minha-lista/animes/sync` | Sync em lote (at├® 500) |

| PATCH | `/api/minha-lista/animes/:id` | Atualiza progresso manualmente |

| DELETE | `/api/minha-lista/animes/:id` | Remove da lista (soft delete) |



## Adicionar do cat├ílogo Orbe



```http

POST /api/minha-lista/animes/from-catalog

Authorization: Bearer <token>

Content-Type: application/json



{

  "animeId": 12345,

  "status": "comecar"

}

```



- `animeId` (obrigat├│rio): ID do anime no cat├ílogo Orbe.

- `status` (opcional): um dos status v├ílidos (`comecar`, `continuar`, `seguir`, `novamente`, `terminado`). Padr├úo: `comecar`.

- Busca o anime no cat├ílogo e cria/atualiza o item com `animeId`, t├¡tulo e poster do cat├ílogo.

- Se o anime j├í estiver na lista (por `animeId` ou `catalog:{id}`), retorna `200` preservando progresso; caso contr├írio, `201`.



## Continuar assistindo



```http

GET /api/minha-lista/animes/continuar

Authorization: Bearer <token>

```



Retorna itens com `status` em `continuar` ou `seguir`, ordenados por `updatedAt` descendente. Usado no carrossel da home.



## Sync em lote / backup legado



```http

POST /api/minha-lista/animes/sync

Authorization: Bearer <token>

Content-Type: application/json



{

  "items": [

    {

      "crunchyrollId": "GRMG8KNRX",

      "title": "Demon Slayer",

      "episode": 5

    },

    {

      "title": "One Piece",

      "malId": 21,

      "ep": 1100,

      "s": 1,

      "tot": 0,

      "dub": true,

      "st": "seguir",

      "lists": ["meio"],

      "note": "Assistir com calma",

      "cr": "https://www.crunchyroll.com/series/GRMG8KNRX"

    }

  ]

}

```



Aceita tanto o formato da extens├úo Crunchyroll quanto o JSON legado do app standalone:



| Campo legado | Campo API |

|--------------|-----------|

| `title` / `q` | `title` |

| `ep` | `episode` |

| `s` | `season` |

| `tot` | `totalEpisodes` |

| `dub` | `hasDub` |

| `st` | `status` |

| `cr` | `crunchyrollUrl` (+ extrai `crunchyrollId` da URL quando poss├¡vel) |

| `malId` | `malId` (fallback de ID: `mal:{malId}`) |

| `lists`, `note` | `lists`, `note` |



Durante o sync, o backend tenta vincular cada item ao cat├ílogo Orbe via busca `ilike` por t├¡tulo (`watchlistMatcher.ts`).



Resposta:



```json

{

  "success": true,

  "imported": 10,

  "updated": 2,

  "skipped": 1,

  "total": 13

}

```



## Status inferidos



- `comecar` ÔÇö epis├│dio 0

- `continuar` ÔÇö epis├│dio > 0 com `remainingTimeSec > 0`

- `seguir` ÔÇö epis├│dio > 0 sem tempo restante



## Fontes (`source`)



- `manual` ÔÇö criado manualmente

- `catalog` ÔÇö adicionado pelo cat├ílogo Orbe

- `crunchyroll_extension` ÔÇö importado pela extens├úo

- `backup_import` ÔÇö importado via sync/backup JSON


