# Convenções — regras de negócio para QA (visão de tela)

## Público e princípio

Este inventário é escrito para quem **só enxerga o produto no navegador**: testadores, PO e suporte.  
**Não** se usa:

- nomes de arquivos, funções, componentes ou frameworks;
- URLs de API, métodos HTTP, JSON, cache de servidor ou banco de dados;
- jargão de implementação (SSR, hook, store, Prisma, etc.).

Tudo é descrito como **o que aparece na tela**, **o que o usuário pode fazer** e **o que deve acontecer** em seguida.

## Uma regra = um comportamento testável

Cada linha da tabela é **uma** regra. Não agrupar vários comportamentos em um único item.

## Formato de ID

| Prefixo | Tela / área no site |
|---------|---------------------|
| `RN-HOME-*` | Página inicial (início) |
| `RN-FILMES-*` | Página Filmes |
| `RN-SERIES-*` | Página Séries |
| `RN-ANIMES-*` | Página Animes |
| `RN-JOGOS-*` | Página Jogos e jogos em alta |
| `RN-PROMO-*` | Página Promoções |
| `RN-HOJE-*` | Página Hoje |
| `RN-MODAL-*` | Janelas de detalhe, avaliação, calendário |
| `RN-BUSCA-*` / `RN-HEADER-*` | Busca e menu superior |
| `RN-LISTA-*` | Minha lista |
| `RN-AUTH-*` | Entrar, criar conta, perfil, configurações |
| `RN-CONT-*` | Continuações (sagas) |
| `RN-PREM-*` / `RN-EVT-*` | Prêmios e eventos |
| `RN-PERS-*` / `RN-DUB-*` / `RN-DEV-*` | Páginas de pessoa, dublador, desenvolvedora |

## Colunas da tabela

| Coluna | Conteúdo |
|--------|----------|
| **ID** | Código estável para Jira, planilha ou TestRail |
| **Nome** | Título curto da regra |
| **Descrição** | Comportamento completo em linguagem de negócio |
| **Pré-condições** | Situação do usuário, login, data relativa (“hoje”), conteúdo visível ou ausente — **sem** citar backend |
| **Resultado na tela** | O que deve ser visto ou acontecer na interface (mensagem, scroll, card, ausência de bloco, etc.) |
| **Como testar** | Passos que qualquer pessoa segue só com o site aberto |

## Navegação nas regras

- Referir-se a **seções visíveis**: “faixa Filmes”, “carrossel de séries”, “botão Em alta”, “menu ⋮ do card”.
- Rotas de página são permitidas **como endereço que o usuário visita** (ex.: “página inicial”, “página Filmes”), não como “endpoint”.
- Quando o comportamento depende de **data do calendário**, deixar explícito (ex.: “lançamento com data de amanhã”, “episódio exibido há menos de 24 horas”).

## O que não entra

- Estimativa de horas.
- Detalhes de deploy ou infraestrutura.
- Documentação técnica para desenvolvedores (fica fora desta pasta ou em material interno separado, se necessário).

## Manutenção

Ao mudar o produto, atualize a **tela** afetada. Se o mesmo card ou modal aparece em várias páginas, a regra pode estar duplicada com referência “também vale em …” na descrição.
