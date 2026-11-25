# Página Séries — Regras de negócio (visão de tela)

**Onde o usuário está:** página **Séries** do site (listagem completa de séries, acessível pelo menu ou pelo título da faixa Séries na página inicial).

**O que existe nesta página:** cabeçalho; gaveta opcional **O que vem aí** (não há gaveta **Em cartaz** como em Filmes); filtros por gênero, ano, mês, status e plataforma; contador; grade de cards de série. **Não** há botões rápidos Em Cartaz / Populares como na página Filmes.

---

## 1 — Abertura da página e cabeçalho

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-SERIES-001 | Conteúdo na primeira abertura | Listagem e opções de filtro já vêm na abertura da página. | Site acessível; catálogo com séries. | Grade e selects visíveis (ou vazio amigável). | Abrir Séries em aba nova. |
| RN-SERIES-002 | Atualização gradual | Mudanças no catálogo podem demorar alguns minutos para refletir após atualização em massa. | Catálogo alterado recentemente. | Recarregar após alguns minutos pode mostrar novidades. | Alterar série de teste; aguardar; recarregar. |
| RN-SERIES-003 | Falha no carregamento inicial | Indisponibilidade temporária não quebra a rota. | Catálogo indisponível na abertura. | Página abre; grade vazia; filtros vazios possíveis. | Simular falha na abertura. |
| RN-SERIES-004 | Texto do cabeçalho | Copy fixa da área. | Usuário em Séries. | Título **Séries** e descrição sobre universo de séries. | Ler cabeçalho. |

---

## 2 — Gaveta O que vem aí

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-SERIES-005 | Gaveta O que vem aí | Estreias futuras de séries em carrossel horizontal. | Resumo de eventos com séries em **próximos**. | Seção **O que vem aí** acima dos filtros. | Ambiente com séries futuras. |
| RN-SERIES-006 | Sem gaveta Em cartaz | Diferente da página Filmes, **não** há bloco **Em cartaz** para séries. | Destaques recentes de séries existem no resumo. | Bloco **Em cartaz** **ausente**; só **O que vem aí** + filtros + grade. | Abrir Séries com dados de destaque. |
| RN-SERIES-007 | Ações na gaveta | Menu ⋮ e favoritos iguais à grade. | Gaveta visível. | Interações refletem na conta logada. | Favoritar na gaveta. |
| RN-SERIES-008 | Gaveta após a página | Carrossel editorial pode aparecer logo após o restante. | Página recém-aberta. | Filtros/grade primeiro; gaveta em seguida se houver itens. | Observar ordem de carregamento. |

---

## 3 — Filtros (sem atalhos rápidos)

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-SERIES-009 | Sem atalhos Em Cartaz/Populares | Curadoria por botões não existe; só selects. | Página Séries. | Apenas linha de filtros; nenhum botão **Populares**. | Confirmar ausência de atalhos. |
| RN-SERIES-010 | Ordem alfabética padrão | Listagem ordenada por nome da série. | Todos os filtros em “todos”. | Cards em ordem A–Z pelo título/nome exibido. | Ler primeiros cards. |
| RN-SERIES-011 | Ordenação por popularidade (catálogo) | Modo “populares” existe no catálogo interno, mas **não** há botão na tela. | — | Usuário comum só vê ordem alfabética nesta página. | Confirmar que não há controle de popularidade na UI. |
| RN-SERIES-012 | Gênero “Todos” | Sem restrição de gênero. | **Todos os Gêneros**. | Grade ampla. | Resetar gênero. |
| RN-SERIES-013 | Capitalização do gênero | Primeira letra maiúscula no dropdown. | Gêneros listados. | Label formatado (ex.: Action). | Abrir select de gênero. |
| RN-SERIES-014 | Ano “Todos” | Sem restrição de ano. | **Todos os Anos**. | Séries de vários anos. | Resetar ano. |
| RN-SERIES-015 | Filtro por ano de estreia | Ano limita à **data de estreia** da série (primeiro episódio / estreia). | Ano 2022. | Só séries estreadas em 2022. | Filtrar ano e conferir detalhe. |
| RN-SERIES-016 | Filtro por mês de estreia | Mês limita estreias daquele mês. | Março selecionado. | Séries com estreia em março (com ano definido ou corrente). | Combinar mês + ano. |
| RN-SERIES-017 | Mês sem ano | Mês sozinho usa ano corrente. | Setembro + todos os anos. | Estreias de setembro do ano atual. | Filtrar mês atual. |
| RN-SERIES-018 | Meses em português | Janeiro–dezembro no select. | Select de mês. | Rótulos PT-BR corretos. | Abrir filtro de mês. |
| RN-SERIES-019 | Filtro por plataforma | Restringe a séries com streaming na plataforma. | Netflix selecionada. | Só séries com Netflix nos metadados. | Filtrar plataforma. |
| RN-SERIES-020 | Filtro por status | Status cadastral (ex.: em exibição, encerrada). | Status escolhido. | Grade coerente com status no detalhe. | Filtrar status. |

---

## 4 — Recarregar listagem

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-SERIES-021 | Sem recarga duplicada na abertura | Abrir Séries não dispara segundo loading imediato. | Primeira visita OK. | Conteúdo estável até mudar filtro. | Abrir página e aguardar. |
| RN-SERIES-022 | Mudança de filtro recarrega | Alterar select atualiza grade. | Qualquer filtro mudado. | Spinner + nova lista. | Trocar gênero. |
| RN-SERIES-023 | Atualização após sync | Sync do catálogo pode atualizar a grade com a página aberta. | Sync em andamento. | Cards/contador mudam sem F5. | Manter Séries aberta durante sync. |

---

## 5 — Contador, loading, grade e vazio

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-SERIES-024 | Spinner ao filtrar | Loading central substitui grade. | Filtro alterado. | Spinner até concluir. | Trocar filtro. |
| RN-SERIES-025 | Contador com total global | “X séries encontradas” usa total lógico do filtro. | > ~48 séries no filtro. | Contador alto com subconjunto na grade. | Filtro amplo; ler contador. |
| RN-SERIES-026 | Contador em carregamento | Texto **Carregando...** durante busca. | Filtro recém-alterado. | Sem número antigo. | Trocar filtro rapidamente. |
| RN-SERIES-027 | Grade responsiva | 2–5 colunas; cards ~210px. | Resultados > 0. | Layout adapta ao viewport. | Redimensionar janela. |
| RN-SERIES-028 | Nenhum resultado | Filtro sem match. | Combinação impossível. | **Nenhuma série encontrada** + dica de ajustar filtros. | Filtro restritivo. |
| RN-SERIES-029 | Falha ao recarregar | Erre de rede ao filtrar não derruba página. | Rede off ao filtrar. | Grade pode zerar; sem crash. | Cortar rede ao filtrar. |

---

## 6 — O que entra na listagem vs carrossel da home

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-SERIES-030 | Listagem mais permissiva que a home | A página Séries pode incluir séries “fracas” (poucos episódios, sem sinopse) que o carrossel Séries da **inicial** exclui. | Série marginal cadastrada. | Aparece em Séries; pode faltar na home. | Comparar mesmo título home vs Séries. |
| RN-SERIES-031 | Lote inicial na grade | ~48 cards visíveis por vez sem “carregar mais”. | Filtro amplo. | Dezenas de cards, contador pode ser maior. | Contar cards vs contador. |
| RN-SERIES-032 | Cards com gêneros e streaming | Informações aparecem quando cadastradas. | Série com gêneros/plataformas. | Texto/ícones no card. | Inspecionar card. |
| RN-SERIES-033 | Gêneros visíveis no card | Lista de gêneros no card quando existir. | Série com gêneros. | Gêneros legíveis. | Abrir card na grade. |
| RN-SERIES-034 | Conteúdo pode demorar a refletir | Mesma lógica de atualização gradual do catálogo. | Alteração recente. | Recarregar após intervalo. | Ver RN-SERIES-002. |
| RN-SERIES-035 | Opções de filtro coerentes | Gêneros/status/plataformas só aparecem se há séries associadas. | Catálogo variado. | Menus populados sem opções “vazias”. | Abrir cada select. |
| RN-SERIES-036 | Anos de estreia no filtro | Anos derivados da data de **estreia** da série. | Várias temporadas. | Ano no filtro = ano de estreia, não de episódio recente. | Série antiga com ep novo: filtrar ano de estreia. |
| RN-SERIES-037 | Status em português | Labels traduzidos no select quando possível. | Status variados. | Texto PT no dropdown. | Abrir status. |

---

## 7 — Curadoria do carrossel Séries na home (contraste — não é UI desta página)

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-SERIES-038 | Home exige qualidade mínima | Carrossel da inicial só mostra séries com pôster, sinopse, engajamento e nota mínima quando há muitos votos. | Série fraca vs forte. | Forte na home e Séries; fraca só em Séries. | Comparar presença home vs página. |
| RN-SERIES-039 | Home exige ≥ 2 episódios | Carrossel inicial ignora séries com um único episódio cadastrado (salvo exceções de carrossel mensal). | Série 1 ep. | Ausente na home; pode estar em Séries. | Comparar contagens. |
| RN-SERIES-040 | Home exige pôster e sinopse | Campos obrigatórios no carrossel da home. | Série sem sinopse. | Ausente na home; pode listar em Séries. | Mesmo título duas telas. |
| RN-SERIES-041 | Engajamento na home | Popularidade ou volume de votos mínimo no carrossel. | Série obscura. | Só na listagem Séries. | Buscar série obscura. |
| RN-SERIES-042 | Nota mínima na home | Muitos votos + nota baixa excluídos do carrossel. | Série mal avaliada popular. | Listagem Séries pode ainda mostrar. | Comparar. |
| RN-SERIES-043 | Estreias planejadas no carrossel mensal | Modo timeline da home pode incluir séries “planejadas” com critério mais flexível. | Série Planned futura. | Pode aparecer na home por mês; em Séries aparece se cadastrada. | Validar na home e em Séries. |
| RN-SERIES-044 | Data do episódio na timeline home | Posição no carrossel da home usa **próximo episódio**, não só estreia da série. | Série com ep semanal. | Card na home alinhado ao ep; em Séries filtro mês usa estreia da série. | Série em exibição: home vs filtro mês em Séries. |
| RN-SERIES-045 | Ordem no carrossel mensal | Ordem na home por data de exibição/episódio; em Séries ordem alfabética (padrão). | Mesmo mês. | Ordens diferentes entre telas. | Comparar ordem home vs Séries filtrada. |
| RN-SERIES-046 | Carrossel por ano (home) | Navegação por ano no carrossel da inicial; em Séries use filtro de ano. | Ano específico. | Home: slides; Séries: grade filtrada. | Filtrar ano em Séries. |
| RN-SERIES-047 | Ano sem dia confirmado (home) | Blocos TBD existem na home; em Séries use status/detalhe. | Série TBA. | Detalhe pode mostrar incerteza; sem separador TBD aqui. | Comparar home vs detalhe em Séries. |
| RN-SERIES-048 | Contexto de temporadas na home | Cards do carrossel podem considerar datas de temporadas. | Nova temporada distante. | Home posiciona por ep; Séries filtra por estreia original se ano/mês de estreia. | Caso com nova temp. |
| RN-SERIES-049 | Formato do card home vs grade | Campos visuais podem diferir levemente (próximo ep, contagem). | Mesma série. | Detalhes extras no carrossel home. | Abrir card home vs card Séries. |
| RN-SERIES-050 | Limite de itens no carrossel home | Faixa horizontal da home mostra subconjunto curado (~dezenas/centenas internas); Séries pagina ~48 visíveis. | Catálogo grande. | Home não lista tudo; Séries lista muito mais via filtros. | Contar visíveis em cada superfície. |

---

## 8 — Detalhe, temporadas e manutenção

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-SERIES-051 | Detalhe pelo card | Clique abre modal/página de detalhe. | Card na grade/gaveta. | Sinopse, temporadas, links. | Clicar card. |
| RN-SERIES-052 | Episódios por temporada | Lista de episódios acessível no fluxo de detalhe (não na grade). | Série com temporadas. | Episódios visíveis no detalhe. | Abrir detalhe → temporada. |
| RN-SERIES-053 | Sem edição pública | Cadastro alterado só por equipe interna. | Usuário comum. | Sem controles de admin em Séries. | Inspecionar página. |
| RN-SERIES-054 | Filtros habilitados | Selects não ficam permanentemente desabilitados. | Uso normal. | Todos clicáveis. | Usar filtros. |
| RN-SERIES-055 | Contador coerente | Total exibido alinhado ao filtro aplicado. | Filtro ativo. | Número faz sentido com busca manual por título. | Anotar contador + amostra. |
| RN-SERIES-056 | Recarregar reseta filtros | F5 volta ao estado inicial da página. | Filtros alterados. | Selects e lista padrão após reload. | F5 após filtrar. |
| RN-SERIES-057 | Listagem ampla sem filtro | Abrir Séries sem filtros mostra séries diversas do catálogo (paginadas). | Catálogo populado. | Grade com títulos variados. | Abrir Séries padrão. |
| RN-SERIES-058 | Gêneros só com séries | Gênero sem nenhuma série não aparece no menu. | Gênero órfão. | Ausente no select. | Revisar lista de gêneros. |
| RN-SERIES-059 | Plataformas só com séries | Mesma regra para streaming. | Plataforma sem séries. | Ausente no select. | Abrir plataformas. |
| RN-SERIES-060 | Erro total na listagem | Falha grave ao montar lista mostra estado vazio/erro amigável, não tela branca. | Catálogo indisponível ao filtrar. | Empty ou mensagem; página intacta. | Simular indisponibilidade. |
| RN-SERIES-061 | Erro nos filtros | Se opções de filtro não carregarem, selects podem ficar vazios mas página abre. | Falha na abertura. | Ver RN-SERIES-003. | Abrir com catálogo down. |
| RN-SERIES-062 | Série planejada na listagem | Séries futuras “planejadas” podem aparecer na grade se cadastradas. | Série Planned. | Card visível; etiqueta **Em breve** quando aplicável. | Buscar estreia futura. |

---

## 9 — Diferenças importantes (para não confundir no teste)

| Situação | O que o usuário pode notar |
|----------|----------------------------|
| Página Séries vs carrossel Séries na home | A home é **mais seletiva** (qualidade, episódios, datas de exibição). |
| Filmes vs Séries | Filmes tem atalhos **Em Cartaz/Populares** e gaveta **Em cartaz**; Séries **não**. |
| Filtro mês em Séries | Usa **estreia da série**, não necessariamente o mês do próximo episódio. |

---

## Ver também

- Detalhe e episódios: `08-MODAIS.md`
- Carrossel Séries na home: `01-HOME.md`
- Listagem Filmes (atalhos e gavetas): `02-FILMES.md`
