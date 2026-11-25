# Página Animes — Regras de negócio (visão de tela)

**Onde o usuário está:** página **Animes** do site (listagem completa de animes, acessível pelo menu ou pelo título da faixa Animes na página inicial).

**O que existe nesta página:** cabeçalho; gaveta opcional **O que vem aí**; filtros por gênero, ano (temporada), formato, fonte (mangá/light novel etc.) e status; contador; grade de cards de anime.

---

## 1 — Abertura, cabeçalho e gaveta

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-ANIMES-001 | Conteúdo na abertura | Lista e filtros já aparecem ao entrar (com possível segunda atualização logo após). | Catálogo acessível. | Cards e selects visíveis após carregar. | Abrir Animes. |
| RN-ANIMES-002 | Falha na abertura | Catálogo indisponível no primeiro momento não quebra a página. | Falha simulada. | Grade vazia; filtros vazios; página utilizável. | Ambiente com catálogo indisponível na abertura. |
| RN-ANIMES-003 | Texto do cabeçalho | Título e descrição fixos. | Usuário em Animes. | **Animes** + texto sobre temporadas e clássicos. | Ler cabeçalho. |
| RN-ANIMES-004 | Gaveta O que vem aí | Animes futuros em carrossel horizontal. | Resumo com **próximos animes**. | Seção **O que vem aí** acima dos filtros. | Ambiente com estreias futuras. |

---

## 2 — Filtros e recarga da grade

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-ANIMES-005 | Opções dos filtros | Gêneros, anos, formatos, fontes e status vêm do catálogo disponível. | Catálogo populado. | Dropdowns preenchidos; gêneros em ordem alfabética; anos do mais recente ao mais antigo; status com rótulo em português quando aplicável. | Abrir cada select e comparar com títulos conhecidos. |
| RN-ANIMES-006 | Valor “Todos” | Cada filtro em “Todos os …” não restringe aquele critério. | Todos em todos os selects. | Grade ampla. | Resetar filtros. |
| RN-ANIMES-007 | Recarga ao mudar filtro e na hidratação | A grade recarrega quando a página termina de abrir **e** sempre que um filtro muda (pode haver um loading extra logo após a primeira pintura). | Página recém-aberta ou filtro alterado. | Spinner possível logo após abrir; novo spinner ao mudar filtro. | Abrir Animes observando loading; depois trocar gênero. |
| RN-ANIMES-008 | Atualização após sync | Sync do catálogo pode atualizar a grade com a página aberta. | Sync disparada. | Lista muda sem F5. | Manter Animes aberta durante sync. |

---

## 3 — Contador, grade, vazio e paginação visível

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-ANIMES-009 | Contador = cards da página atual | O texto “X animes encontrados” conta os cards **mostrados**, não necessariamente o total de animes que existem para o filtro no catálogo. | Mais de ~48 animes para o filtro. | Contador pode mostrar até ~48 enquanto existem mais no catálogo. | Filtro amplo; comparar contador com total esperado manualmente. |
| RN-ANIMES-010 | Grade, loading e vazio | Spinner central durante busca; grid responsivo; empty state amigável. | Filtro impossível ou resultados OK. | **Nenhum anime encontrado** + dica; ou 2–5 colunas de cards ~210px. | Testar filtro vazio e filtro amplo. |
| RN-ANIMES-011 | Lote inicial sem “carregar mais” | A grade mostra um lote inicial (~dezenas); não há botão para próxima página nesta tela. | Catálogo grande. | ~48 cards visíveis; sem paginação na UI. | Contar cards com filtros abertos. |

---

## 4 — Conteúdo adulto, tags sensíveis e curadoria

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-ANIMES-012 | Exclusão de adulto explícito | Animes marcados como conteúdo adulto não entram na listagem pública desta página. | Anime adulto no catálogo. | Ausente em Animes. | Buscar título adulto conhecido. |
| RN-ANIMES-013 | Tags sensíveis ocultas | Títulos com tags como conteúdo adulto explícito (ex.: hentai, ecchi pesado) ficam de fora da listagem padrão. | Anime com tag bloqueada. | Não aparece na grade pública. | Validar título de teste com tag sensível. |
| RN-ANIMES-014 | Filtros combinados | Gênero, ano (temporada), formato, fonte e status restringem juntos. | Vários filtros ativos. | Só animes que atendem **todos** os critérios. | Combinar gênero + ano + formato. |
| RN-ANIMES-015 | Ordem alfabética padrão | Sem controle “populares” na UI, ordem por título (romaji/título exibido). | Filtros em todos. | Ordem A–Z aproximada pelos primeiros cards. | Ler primeiros títulos. |
| RN-ANIMES-016 | Listagem vs home / Hoje | A página Animes é **mais permissiva** que o carrossel Animes da home e que algumas seções da página Hoje (que exigem qualidade mínima). | Anime marginal (baixa popularidade, fora de temporada). | Pode aparecer em Animes e faltar na home/Hoje streaming. | Comparar mesmo anime nas três áreas. |

---

## 5 — Detalhe, agenda e outras áreas

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-ANIMES-017 | Conteúdo pode demorar a atualizar | Após mudanças no catálogo, aguardar e recarregar para ver efeito (mesma lógica das outras listagens). | Cadastro alterado. | Novidades após reload. | Alterar anime de teste; recarregar. |
| RN-ANIMES-018 | Metadados de filtro completos | Formatos e fontes listam valores realmente usados por algum anime. | Catálogo variado. | Sem opções “fantasma” no menu. | Percorrer formatos/fontes. |
| RN-ANIMES-019 | Detalhe ao vivo | Clique no card abre detalhe que pode buscar informações atualizadas (sinopse, episódios, links). | Card qualquer. | Modal/página de detalhe; id inválido não abre conteúdo quebrado. | Clicar card; testar título removido. |
| RN-ANIMES-020 | Próximo episódio (detalhe/agenda) | Informação de próximo episódio aparece no detalhe/card quando existir agenda futura; não é filtro da grade. | Anime em exibição semanal. | Contagem ou data de próximo ep no card/detalhe. | Anime em temporada corrente. |

---

## 6 — Diferenças importantes

| Situação | O que o usuário pode notar |
|----------|----------------------------|
| Contador em Animes vs Filmes/Séries | Em Animes o número segue os **cards visíveis**; em Filmes/Séries segue o **total** do filtro. |
| Home Animes | Carrossel da inicial filtra temporada, agenda semanal e exclui adulto explícito de forma mais rígida. |
| Recarga ao abrir | Animes pode **recarregar** a lista logo após abrir; Filmes/Séries/Jogos evitam isso na primeira visita. |

---

## Ver também

- Faixa Animes na home (estreias / semana / em alta): `01-HOME.md`
- Cards e modal: `08-MODAIS.md`
- Minha lista e continuar assistindo: `10-MINHA-LISTA.md`
