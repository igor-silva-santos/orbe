# Página Hoje — Regras de negócio (visão de tela)

**Onde o usuário está:** página **Hoje** do site (menu principal → Hoje), com panorama editorial do dia: cinema, estreias, streaming e jogos em destaque.

**O que existe nesta página:** título “Hoje” com data do dia; painel para ligar/desligar blocos de conteúdo; até seis faixas horizontais de cards (filmes, séries, animes, jogos), cada uma com título próprio.

---

## 1 — Carregamento, data e mensagens gerais

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-HOJE-001 | Conteúdo após abrir a página | Os cards não vêm “prontos” no primeiro instante; a página busca os destaques ao abrir. | Acesso normal à página Hoje. | Breve estado de carregamento (esqueletos/cards cinza) e, em seguida, faixas preenchidas ou mensagens de vazio/erro. | Abrir Hoje com rede normal; observar transição skeleton → conteúdo. |
| RN-HOJE-002 | Data do dia | A página mostra a data atual em português, junto ao título. | Página carregada com sucesso. | Linha com ícone de calendário e data por extenso (pt-BR), coerente com o dia de teste. | Comparar data exibida com o relógio do sistema. |
| RN-HOJE-008 | Erro ao carregar | Se os destaques não puderem ser obtidos. | Simular falha de rede ou indisponibilidade do serviço. | Mensagem do tipo “Não foi possível carregar o conteúdo de hoje.” | Bloquear rede após abrir a página ou usar ambiente offline. |
| RN-HOJE-009 | Esqueletos no carregamento | Enquanto aguarda os dados. | Primeiro acesso ou rede lenta. | Grade com vários placeholders de card (cerca de oito). | Throttle de rede e recarregar Hoje. |
| RN-HOJE-010 | Cards iguais ao resto do site | Interações nos cards seguem o mesmo padrão das listagens. | Usuário logado; itens visíveis em uma faixa. | Favoritar, listas e demais ações do card funcionam como em Filmes/Séries/Animes/Jogos. | Logar; favoritar um filme em “Em cartaz” e conferir em outra tela. |

---

## 2 — Preferências de seções (o que o usuário escolhe ver)

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-HOJE-003 | Ligar/desligar blocos | O usuário escolhe quais faixas aparecem; a escolha fica salva no navegador. | Mesmo navegador/dispositivo. | Interruptores ou checkboxes por seção; ao recarregar, as seções desmarcadas continuam ocultas. | Desmarcar “Em cartaz nos cinemas”; F5 → faixa não aparece. |
| RN-HOJE-004 | Pelo menos uma seção | Não é possível desativar todas as seções de uma vez. | Resta apenas uma seção marcada. | Tentativa de desmarcar a última é ignorada; continua uma seção ativa. | Desmarcar cinco seções; na sexta tentativa, a última permanece ligada. |
| RN-HOJE-005 | Ordem fixa das faixas | A ordem vertical dos blocos não muda conforme preferências. | Várias seções habilitadas com conteúdo. | Sempre, de cima para baixo: cinema → estreias da semana → filmes no streaming → séries no streaming → animes em exibição → jogos em destaque (só as habilitadas e com itens). | Habilitar todas; rolar e conferir ordem dos títulos das faixas. |
| RN-HOJE-006 | Faixa sem itens some | Seção ligada mas sem títulos para mostrar não ocupa espaço. | Seção habilitada sem destaques naquele dia. | Nenhum título de faixa vazio; bloco inteiro ausente. | Ambiente ou dia em que uma faixa específica vem vazia. |
| RN-HOJE-007 | Nada para mostrar | Todas as faixas visíveis estão vazias, ou o usuário desligou tudo que tinha conteúdo. | Filtros de seção deixam zero cards visíveis. | Mensagem “Nenhum destaque disponível para os filtros selecionados.” | Desmarcar seções que tinham conteúdo até só restarem vazias ou desligar todas as que exibem cards. |

---

## 3 — O que entra em cada faixa (regras de conteúdo)

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-HOJE-011 | Janela “esta semana” | Destaques de streaming e animes priorizam o que teve lançamento ou episódio nos **últimos 7 dias**. | Títulos com datas conhecidas (estreia ou episódio). | Obra lançada há mais de uma semana tende a não liderar o pool “esta semana”; pode aparecer só se faltar conteúdo recente. | Comparar filme estreando há 8 dias vs filme estreando ontem na faixa de streaming. |
| RN-HOJE-012 | Em cartaz nos cinemas | Filmes marcados como em exibição comercial no momento. | Catálogo com filme em cartaz e filme só em streaming. | Até **12** filmes; foco em popularidade entre os em cartaz; obras de baixa qualidade editorial ou mal localizadas tendem a ficar de fora. | Contar cards na faixa cinema; validar que só entram “em cartaz”. |
| RN-HOJE-013 | Estreias da semana | Filmes estreando na **semana civil brasileira** corrente. | Filme com estreia BR na semana vs fora da semana. | Até **24** títulos; cards de estreia da semana podem exibir etiqueta de destaque de estreia. | Cruzar com calendário de estreias BR. |
| RN-HOJE-014 | Etiquetas em filmes | Alguns filmes ganham destaque visual (estreia da semana ou “mais esperado”). | Filme estreando na semana vs filme futuro aguardado. | Estreia da semana tem prioridade sobre “mais esperado” no mesmo card. | Inspecionar pills nos cards de estreias e estreias futuras. |
| RN-HOJE-015 | Filmes no streaming esta semana | Filmes disponíveis em streaming, não em cartaz, com preferência por lançamentos na última semana. | Pool semanal com menos de 12 títulos. | Até **12** filmes; se faltarem lançamentos recentes, entram títulos populares em streaming para completar, sem duplicar o mesmo filme. | Dia com poucos lançamentos streaming; ver se lista completa até 12. |
| RN-HOJE-016 | Séries no streaming esta semana | Séries com episódio ou estreia recente na última semana, ou fallback por popularidade. | Série sem episódio na semana mas popular. | Até **12** séries; mescla recentes + fallback. | Série semanal com ep ontem vs série parada há meses. |
| RN-HOJE-017 | Animes em exibição (prioridade) | Animes **em lançamento** que exibiram episódio na última semana. | Anime em exibição sem ep na semana. | Preferência por quem teve episódio nos últimos 7 dias; ordenação por popularidade e nota. | Anime com ep recente vs anime em hiato. |
| RN-HOJE-018 | Animes — completar lista | Se poucos animes tiveram episódio na semana, a lista completa com outros em exibição ou a estrear. | Poucos episódios recentes no catálogo. | Até **12** animes no total, sem repetir o mesmo título. | Conferir contagem máxima em dia “fraco” de episódios. |
| RN-HOJE-019 | Jogos em destaque | Jogos com maior expectativa ou nota entre os elegíveis. | Catálogo com jogos fracos e fortes. | Até **8** jogos; jogos sem sinal de qualidade tendem a ficar de fora. | Contar faixa; comparar com página Jogos. |
| RN-HOJE-020 | Animes mais exigentes que a listagem | Alguns animes marginais aparecem na listagem geral de animes mas não em Hoje. | Anime com nota/popularidade baixa. | Ausente na faixa de animes de Hoje; pode existir na página Animes do menu. | Mesmo título em Animes vs Hoje. |
| RN-HOJE-021 | Textos de sinopse | Sinopses exibidas são as já cadastradas no catálogo (sem tradução instantânea na hora da visita). | Abrir detalhe do mesmo título em Hoje e em Filmes. | Mesmo texto de sinopse para a mesma obra. | Abrir modal do filme em Hoje e na listagem Filmes. |
| RN-HOJE-022 | Atualização dos destaques | O conjunto de títulos do dia não muda a cada segundo. | Duas visitas no mesmo dia. | Listas podem permanecer estáveis por várias horas até o site atualizar o pacote de “hoje”. | Comparar Hoje de manhã e tarde (mesmo dia). |
| RN-HOJE-023 | Falha grave no servidor | Erro interno ao montar os destaques. | Serviço indisponível. | Mesma mensagem de erro de RN-HOJE-008; usuário não vê faixas parciais “quebradas”. | Ambiente de teste com serviço fora. |
| RN-HOJE-024 | Seções batem com a tela | Cada faixa visível corresponde a um bloco de destaques (data do dia + listas por tema). | Página carregada com sucesso. | Seis tipos possíveis: data, estreias da semana, cinema, três faixas streaming (filmes/séries/animes), jogos — conforme preferências e conteúdo. | Conferir títulos das faixas com a tabela abaixo. |

---

## 4 — Nomes das faixas (referência QA)

| Chave de preferência (painel) | Título visível na página | Tipo de card |
| --- | --- | --- |
| Cinema | Em cartaz nos cinemas | Filme |
| Estreias da semana | Estreias da semana | Filme |
| Streaming filmes | Filmes populares no streaming esta semana | Filme |
| Streaming séries | Séries populares no streaming esta semana | Série |
| Streaming animes | Animes em exibição esta semana | Anime |
| Destaques jogos | Jogos em destaque | Jogo |

---

## 5 — Diferença em relação a outras áreas do site

| Área | Em relação à página Hoje |
| --- | --- |
| Página inicial | Carrosséis por data de lançamento; não replica o layout editorial de seis faixas de Hoje. |
| Em alta / trending | Ranking por tipo; sem blocos cinema + estreias + streaming da semana. |
| Filmes, Séries, Animes, Jogos | Catálogos completos com filtros; Hoje agrega só destaques da semana e do momento. |
