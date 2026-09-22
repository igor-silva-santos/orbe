# Página Filmes — Regras de negócio (visão de tela)

**Onde o usuário está:** página **Filmes** do site (listagem completa de filmes, acessível pelo menu ou pelo título da faixa Filmes na página inicial).

**O que existe nesta página:** cabeçalho com título e descrição; gavetas opcionais **O que vem aí** e **Em cartaz**; botões de atalho (Todos, Em Cartaz, Em Breve, Populares); filtros por gênero, ano, mês, status e plataforma de streaming; contador de resultados; grade de cards de filme.

---

## 1 — Abertura da página e cabeçalho

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-FILMES-001 | Conteúdo na primeira abertura | A listagem e as opções de filtro já vêm preparadas quando a página abre, sem precisar clicar em nada. | Site acessível; catálogo com filmes. | Ao entrar em Filmes, cards e menus de filtro aparecem (ou estado vazio amigável se não houver dados). | Abrir a página Filmes em aba nova; observar grade e selects antes de interagir. |
| RN-FILMES-002 | Atualização gradual do catálogo | Mudanças no catálogo podem levar alguns minutos para aparecer na página após uma atualização em massa, mesmo sem o usuário fazer nada. | Catálogo alterado recentemente no ambiente de teste. | Após aguardar alguns minutos e recarregar Filmes, novos títulos ou datas podem surgir. | Registrar um filme de teste; aguardar ~5 min; recarregar Filmes. |
| RN-FILMES-003 | Falha no carregamento inicial | Se a listagem não puder ser montada no primeiro momento, a página continua utilizável. | Simular indisponibilidade temporária do catálogo na abertura. | Página abre sem erro do navegador; grade vazia; filtros sem opções ou vazios; mensagem de “nenhum filme” se aplicável. | Ambiente com catálogo indisponível no primeiro acesso. |
| RN-FILMES-004 | Texto do cabeçalho | Título e subtítulo da área são fixos. | Usuário na página Filmes. | Título **Filmes** e texto sobre cartaz, lançamentos e clássicos no topo. | Ler o cabeçalho da página. |

---

## 2 — Gavetas editoriais (O que vem aí / Em cartaz)

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-FILMES-005 | Gaveta O que vem aí | Bloco horizontal de estreias futuras de filme, acima dos filtros. | Resumo de eventos do site inclui filmes em **próximos lançamentos**. | Seção colapsável **O que vem aí** com carrossel horizontal de cards de filme. | Ambiente com lançamentos futuros; abrir Filmes. |
| RN-FILMES-006 | Ações nos cards da gaveta | Favoritar e demais ações do menu ⋮ funcionam igual à grade principal. | Gaveta visível; usuário logado ou visitante conforme regra do card. | Menu e estados de lista refletem na conta quando logado. | Favoritar um filme na gaveta; recarregar logado. |
| RN-FILMES-007 | Gaveta Em cartaz | Destaques de filmes **em cartaz** em bloco próprio. | Resumo de eventos traz filmes em **destaques recentes / em cartaz**. | Seção **Em cartaz** com ícone de claquete e carrossel horizontal. | Ambiente com destaques em cartaz; abrir Filmes. |
| RN-FILMES-008 | Gavetas carregam após a página | As gavetas podem aparecer um instante depois do restante da página. | Página Filmes recém-aberta. | Primeiro aparecem filtros e grade; em seguida as gavetas (se houver conteúdo). | Abrir Filmes e observar ordem de aparecimento dos blocos. |

---

## 3 — Atalhos rápidos (Todos, Em Cartaz, Em Breve, Populares)

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-FILMES-009 | Atalho Todos os Filmes | Restaura a listagem geral sem curadoria de atalho. | Qualquer outro atalho ativo. | Botão **Todos os Filmes** destacado; grade ampla (ordenada por título). | Clicar **Todos os Filmes**. |
| RN-FILMES-010 | Atalho Em Cartaz | Mostra só filmes marcados como em cartaz. | Catálogo com filmes em cartaz e outros. | Grade restrita a títulos em cartaz; contador atualizado. | Clicar **Em Cartaz**; conferir etiquetas nos cards. |
| RN-FILMES-011 | Atalho Em Breve | Mostra só estreias futuras curadas como “em breve”. | Filmes em breve e já lançados no catálogo. | Só filmes em breve na grade. | Clicar **Em Breve**. |
| RN-FILMES-012 | Atalho Populares | Reordena por popularidade (não alfabético). | Vários filmes com popularidade distinta. | Ordem diferente de **Todos**; títulos mais populares no topo. | Alternar **Todos** e **Populares** e comparar ordem. |
| RN-FILMES-013 | Destaque visual do atalho | Só um atalho aparece como selecionado. | Dois ou mais atalhos disponíveis. | Botão ativo com cor primária; demais em fundo neutro. | Clicar cada atalho e observar estilo. |

---

## 4 — Filtros por gênero, ano, mês, status e plataforma

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-FILMES-014 | Gênero “Todos” | Não restringe por gênero. | Select em **Todos os Gêneros**. | Grade ampla dentro do atalho ativo. | Escolher todos os gêneros após filtrar um gênero específico. |
| RN-FILMES-015 | Nome do gênero no menu | Primeira letra do gênero aparece maiúscula no dropdown. | Lista de gêneros populada. | Ex.: “action” exibido como “Action”. | Abrir select de gênero. |
| RN-FILMES-016 | Ano “Todos” | Não restringe por ano de estreia. | **Todos os Anos** selecionado. | Filmes de vários anos na grade. | Resetar ano para todos. |
| RN-FILMES-017 | Anos no dropdown | Anos disponíveis refletem filmes existentes no catálogo, do mais recente para o mais antigo. | Catálogo com vários anos. | Select de ano sem duplicatas; ordem decrescente. | Comparar anos do menu com filmes conhecidos. |
| RN-FILMES-018 | Meses em português | Janeiro a dezembro com rótulos em PT-BR. | Select de mês aberto. | Doze meses nomeados corretamente. | Abrir filtro de mês. |
| RN-FILMES-019 | Mês “Todos” | Não restringe por mês. | **Todos os Meses**. | Qualquer mês dentro dos demais filtros. | Selecionar todos os meses. |
| RN-FILMES-020 | Status traduzido | Opções de status exibem rótulo em português quando o produto conhece o status. | Select de status populado. | Labels legíveis (ex.: lançado, em produção). | Abrir filtro de status. |
| RN-FILMES-021 | Filtro por plataforma | Restringe a filmes disponíveis na plataforma escolhida (streaming). | Netflix (ou outra) selecionada. | Só cards com aquela plataforma nos metadados visíveis. | Filtrar Netflix; abrir detalhe de um card. |
| RN-FILMES-022 | Plataformas ordenadas | Nomes de plataforma no select em ordem alfabética. | Várias plataformas no catálogo. | Lista A–Z no dropdown. | Abrir **Todas as Plataformas**. |
| RN-FILMES-023 | Filtros sempre clicáveis | Menus de filtro permanecem habilitados durante uso normal. | Página Filmes estável. | Selects não ficam permanentemente desabilitados. | Usar todos os filtros em sequência. |

---

## 5 — Recarregar listagem e sincronização

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-FILMES-024 | Primeira visita sem “piscar” desnecessário | Ao abrir Filmes, a grade inicial não dispara um segundo carregamento imediato só por abrir a página. | Primeira visita com catálogo OK. | Conteúdo estável logo após abrir; novo carregamento só ao mudar filtro/atalho. | Abrir Filmes e aguardar sem tocar filtros; observar spinner. |
| RN-FILMES-025 | Mudança de filtro recarrega | Qualquer alteração em atalho ou select atualiza a grade. | Filtro ou atalho alterado. | Spinner breve; nova lista e contador. | Trocar gênero ou ano. |
| RN-FILMES-026 | Atualização após sync do site | Quando o site termina uma sincronização de catálogo em segundo plano, a listagem pode atualizar sozinha. | Sync disparada com Filmes aberta. | Cards ou contagem mudam sem F5 manual. | Manter Filmes aberta durante sync no ambiente de teste. |

---

## 6 — Contador, loading, grade e vazio

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-FILMES-027 | Spinner ao filtrar | Durante nova busca, a grade some e aparece indicador central. | Filtro alterado com rede normal. | Spinner no lugar do grid até concluir. | Trocar filtro e observar loading. |
| RN-FILMES-028 | Contador com total global | O texto “X filmes encontrados” usa o **total** que corresponde aos filtros, não só os cards visíveis na primeira “página” interna. | Mais de ~48 filmes para o filtro atual. | Contador alto (ex.: 200) com grade mostrando um subconjunto inicial. | Filtro amplo; ler contador vs cards na tela. |
| RN-FILMES-029 | Contador em carregamento | Enquanto recarrega, não mostra número antigo enganoso. | Filtro recém-alterado. | Texto **Carregando...**. | Trocar filtro e ler linha acima da grade. |
| RN-FILMES-030 | Grade responsiva | Cards em colunas que aumentam em telas maiores. | Resultados > 0; não loading. | 2 a 5 colunas; cards com largura máxima ~210px. | Redimensionar janela do navegador. |
| RN-FILMES-031 | Nenhum resultado | Combinação de filtros sem match. | Filtros restritivos. | Ícone de filtro, título **Nenhum filme encontrado**, sugestão de ajustar filtros. | Aplicar filtro impossível. |
| RN-FILMES-032 | Falha ao recarregar no cliente | Erro ao buscar de novo pode esvaziar a grade ou manter último estado, sem quebrar a página. | Rede cortada ao mudar filtro. | Página continua; grade pode zerar; sem crash. | Desligar rede ao trocar filtro. |

---

## 7 — Tamanho da listagem e curadoria padrão (o que entra na grade)

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-FILMES-033 | Limite inicial de cards na tela | A grade mostra um lote inicial de filmes (dezenas), não o catálogo inteiro de uma vez. | Filtro amplo com centenas de títulos. | Até ~48 cards visíveis na grade por vez (sem botão “carregar mais” nesta página). | Contar cards com filtro **Todos**. |
| RN-FILMES-034 | Cards com informação de streaming | Quando o filme tem plataformas cadastradas, o card pode exibir ícones/nomes de streaming. | Filme com Netflix/Disney+ etc. | Ícones ou pills de plataforma no card. | Inspecionar card de filme em streaming. |
| RN-FILMES-035 | Saga e coleção no card | Filmes parte de saga podem mostrar indício de continuação no card. | Filme com saga cadastrada. | Atalho de saga visível no card (detalhe em modais). | Card de filme conhecido em saga. |
| RN-FILMES-036 | Curadoria de exibição padrão | A listagem pública prioriza filmes “apresentáveis”: com pôster, sinopse e relevância mínima, salvo exceções de cartaz/em breve. | Filme incompleto no catálogo vs filme em cartaz. | Título sem pôster tende a **não** aparecer; em cartaz pode aparecer mesmo com pouca popularidade. | Comparar filme rascunho vs filme em cartaz. |
| RN-FILMES-037 | Sem pôster | Filmes sem imagem de pôster não entram na grade padrão. | Filme de teste sem pôster. | Ausente em Filmes com filtros abertos. | Buscar título sem pôster na busca global. |
| RN-FILMES-038 | Sem sinopse | Filmes sem texto de sinopse tendem a ficar de fora, exceto flags de cartaz/em breve. | Filme sem overview. | Ausente na listagem geral. | Validar com dado de teste. |
| RN-FILMES-039 | Conteúdo adulto explícito | Filmes marcados como adultos não aparecem na listagem pública. | Filme adulto no catálogo. | Ausente em Filmes. | Buscar título adulto. |
| RN-FILMES-040 | Exceção em cartaz ou em breve | Filmes em cartaz ou em breve podem aparecer mesmo com popularidade baixa. | Filme em cartaz com poucos votos. | Presente ao usar atalho **Em Cartaz** ou **Em Breve**. | Testar título em cartaz marginal. |
| RN-FILMES-041 | Nota mínima com muitos votos | Filmes com muitas avaliações e nota muito baixa tendem a ser ocultados. | Filme nota ~5,5 com centenas de votos. | Ausente na listagem geral. | Comparar com filme bem avaliado. |
| RN-FILMES-042 | Ano corrente ou futuro mais permissivo | Filtrar pelo **ano atual** (ou futuro) pode incluir estreias ainda sem muita popularidade. | Ano = ano corrente no select. | Estreia futura do ano aparece na grade. | Filtrar ano corrente; procurar estreia futura. |

---

## 8 — Comportamento dos filtros de data e metadados

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-FILMES-043 | Filtro por ano civil | Ano escolhido limita a estreias daquele ano calendário. | Ano 2020 selecionado. | Só filmes com data de estreia em 2020. | Filtrar 2020 e abrir detalhes de cards. |
| RN-FILMES-044 | Filtro por mês | Mês escolhido limita estreias daquele mês (com ano definido ou ano corrente). | Março + ano 2025. | Só estreias de março/2025. | Combinar mês e ano. |
| RN-FILMES-045 | Mês sem ano usa ano atual | Só mês selecionado assume o ano de “hoje”. | Mês = mês atual; ano = todos. | Estreias daquele mês no ano corrente. | Em setembro, filtrar setembro com todos os anos. |
| RN-FILMES-046 | Filtro por gênero | Gênero escolhido exige correspondência exata no cadastro do filme. | Gênero Action. | Só filmes daquele gênero. | Filtrar um gênero raro e validar cards. |
| RN-FILMES-047 | Filtro por status | Status escolhido restringe ao estado cadastral (ex.: lançado, cancelado). | Status específico. | Grade coerente com status nos detalhes. | Filtrar status e conferir detalhe. |
| RN-FILMES-048 | Só já lançados (catálogo) | Regra interna de “lançados”: data de estreia no passado. | Filme futuro vs passado. | Filme futuro não entra em conjuntos que exigem “já lançado” (ex.: comparar com atalho **Em Breve**). | Estreia futura só em **Em Breve**, não como lançado antigo. |
| RN-FILMES-049 | Só futuros (catálogo) | Regra interna de “futuros”: estreia hoje ou depois. | Filme passado e futuro. | **Em Breve** alinhado a futuros curados. | Comparar atalhos **Todos** vs **Em Breve**. |
| RN-FILMES-050 | Disponibilidade cinema (catálogo) | Subconjunto usado em outras áreas para “no cinema”. | Filme só streaming vs em cartaz. | **Em Cartaz** e gaveta **Em cartaz** concentram títulos de cinema. | Validar filme em cartaz nos atalhos/gaveta. |
| RN-FILMES-051 | Disponibilidade streaming (catálogo) | Subconjunto de títulos com streaming cadastrado. | Filme com plataforma. | Aparece ao filtrar plataforma; etiqueta **No streaming** no card quando aplicável. | Filtrar plataforma + ler etiqueta do card. |
| RN-FILMES-052 | Ordem alfabética em “Todos” | Sem atalho **Populares**, ordem por título. | **Todos os Filmes** ativo. | Primeiros cards em ordem A–Z por título. | Ler primeiros títulos da grade. |

---

## 9 — Diferenças em relação ao carrossel Filmes na página inicial

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-FILMES-053 | Listagem mais ampla que a home | A página Filmes pode mostrar títulos que a faixa Filmes da inicial não mostra. | Concerto/gravação ao vivo cadastrada. | Pode aparecer em Filmes e **não** no carrossel da home. | Comparar mesmo título home vs Filmes. |
| RN-FILMES-054 | Opções de filtro só com filmes | Gêneros/plataformas no menu existem porque há pelo menos um filme associado. | Gênero órfão no cadastro interno. | Gênero sem filme **não** aparece no select. | Abrir todos os gêneros e buscar um raro inexistente. |
| RN-FILMES-055 | Anos sem duplicata | Cada ano aparece uma vez no filtro de ano. | Vários filmes no mesmo ano. | Ano único no dropdown. | Abrir filtro de ano. |
| RN-FILMES-056 | Janela temporal da home | Carrossel da inicial foca lançamentos em janela de anos próximos; Filmes lista histórico amplo. | Filme muito antigo fora da janela da home. | Presente em Filmes com filtros; pode faltar na home. | Filme clássico: Filmes vs home. |
| RN-FILMES-057 | Concertos na listagem | Shows, stand-up e concertos ao vivo podem aparecer aqui. | Título tipo “Live from…”. | Card visível em Filmes; pode faltar no carrossel da home. | Buscar concerto na página Filmes. |
| RN-FILMES-058 | Curta-metragem futuro na home | Estreias futuras muito curtas podem ser excluídas do carrossel inicial. | Curta com duração conhecida e estreia futura. | Pode aparecer em Filmes filtrando ano/mês; pode faltar na home. | Comparar home vs Filmes. |
| RN-FILMES-059 | Duração mínima só na home | Regra de “filme de estreia” longo para destaque na home não se aplica à listagem Filmes. | Filme futuro curto. | Visível em Filmes se passar curadoria da listagem. | Mesmo título home vs Filmes. |

---

## 10 — Detalhe, destaques e áreas fora desta página

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-FILMES-060 | Abrir detalhe pelo card | Clique no card abre painel/modal de detalhe do filme. | Card na grade ou gaveta. | Modal com sinopse, datas, links. | Clicar poster/título. |
| RN-FILMES-061 | Destaques no detalhe | Alguns filmes exibem etiquetas extras (ex.: mais esperado) no detalhe. | Filme elegível a destaque editorial. | Pills no modal além do status normal. | Abrir detalhe de estreia aguardada. |
| RN-FILMES-062 | Edição administrativa | Alterações de cadastro feitas por equipe interna não são testadas nesta tela pública. | Conta visitante ou usuário comum. | Comportamento da listagem reflete catálogo já publicado; sem UI de edição aqui. | Confirmar ausência de controles de admin na página Filmes. |
| RN-FILMES-063 | Ranking “mais esperados” | Lista de antecipação de estreias alimenta destaques em outras áreas (ex.: **Em alta** na home), não um bloco dedicado em Filmes. | Estreias próximas no catálogo. | Filmes pode mostrar pills nos cards/detalhe; ranking completo não é seção fixa aqui. | Comparar filme “mais esperado” na home vs Filmes. |
| RN-FILMES-064 | Timeline por ano (outras telas) | Navegação mês a mês por carrossel existe na home, não como timeline na página Filmes. | Usuário em Filmes. | Filmes usa grade + filtros ano/mês, não carrossel temporal contínuo. | Confirmar ausência de carrossel mensal contínuo em Filmes. |
| RN-FILMES-065 | Timeline por mês (outras telas) | Agrupamento fino por mês no carrossel da home; aqui filtro de mês na grade. | Mês selecionado. | Grade estática filtrada, não slide por slide de timeline. | Filtrar mês e rolar grade. |
| RN-FILMES-066 | Só ano confirmado (outras telas) | Blocos “sem data confirmada” aparecem no carrossel da home; em Filmes use filtro de ano e status. | Filme TBA só com ano. | Pode listar com data incompleta nos detalhes; sem separador TBD como na home. | Filme “2027 — data a confirmar” em Filmes vs home. |
| RN-FILMES-067 | Contador alinhado ao total filtrado | Número exibido corresponde ao conjunto filtrado no servidor, não a páginas visuais futuras. | Filtro restritivo. | Contador = quantidade lógica do filtro. | Anotar contador e amostrar busca por título. |
| RN-FILMES-068 | Coerência após recarregar | Recarregar a página mantém filtros no estado inicial (não persistem na URL por padrão). | Filtros alterados; F5. | Atalho **Todos** e selects voltam ao padrão; nova carga inicial. | Alterar filtros e recarregar navegador. |

---

## 11 — Diferenças importantes (para não confundir no teste)

| Situação | O que o usuário pode notar |
|----------|----------------------------|
| **Populares** em Filmes vs **Em alta** (Filmes) na home | Ordens e conjuntos **diferentes**; a home prioriza **mais esperados** na faixa Filmes. |
| Concertos e stand-up | Podem aparecer na página Filmes e **não** no carrossel Filmes da home. |
| Contador vs cards visíveis | O contador pode ser maior que os cards mostrados de uma vez (~48). |

---

## Ver também (outras telas, mesma linguagem)

- Cards, menu ⋮ e modal de detalhe: `08-MODAIS.md`
- Busca e menu superior: `09-BUSCA-HEADER.md`
- Carrossel Filmes na página inicial: `01-HOME.md`
