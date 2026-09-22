# Página inicial — Regras de negócio (visão de tela)

**Onde o usuário está:** página inicial do site (primeira tela após abrir o endereço principal).

**O que existe nesta página:** faixa de boas-vindas no topo; bloco “Continuar assistindo” (só para quem entrou na conta); quatro faixas horizontais — **Filmes**, **Séries**, **Animes** e **Jogos** — cada uma com carrossel de cards de título.

---

## 1 — Layout e ordem do que aparece

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-HOME-001 | Ordem das seções | A página segue uma ordem fixa de blocos de cima para baixo. | Página inicial carregada com sucesso. | Do topo para baixo: mensagem de boas-vindas → (opcional) Continuar assistindo → Filmes → Séries → Animes → Jogos. | Abrir a página inicial e rolar devagar; conferir a ordem. |
| RN-HOME-002 | Título da faixa leva à listagem | O nome de cada faixa (Filmes, Séries, etc.) funciona como atalho. | Página inicial visível. | Ao clicar no título “Filmes”, o usuário vai para a página de listagem de filmes; o mesmo padrão para Séries, Animes e Jogos. | Clicar em cada título de faixa e verificar a página de destino. |
| RN-HOME-003 | Página não “quebra” sem conteúdo | Se no primeiro momento não houver títulos para mostrar, a estrutura da página continua aparecendo. | Simular rede lenta ou catálogo vazio no primeiro carregamento. | Não aparece tela de erro do navegador; faixas e controles continuam; carrosséis podem mostrar placeholders e depois preencher ao rolar. | Throttle de rede ou ambiente de teste vazio; abrir a página inicial. |
| RN-HOME-004 | Carregamento tardio das faixas | Filmes e jogos podem começar a buscar mais títulos quando o usuário se aproxima da faixa; séries e animes quando a própria faixa entra na área visível. | Usuário abre a página e fica só no topo (boas-vindas). | Ao rolar até Filmes/Jogos/Séries/Animes, novos cards ou animação de carregamento podem aparecer; não é obrigatório tudo carregar antes de rolar. | Abrir a página, não rolar: observar rede/atividade; rolar até cada faixa. |

---

## 2 — Faixa de boas-vindas (hero)

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-HOME-HERO-001 | Botão “Começar agora” | O botão principal leva o usuário à faixa de filmes na mesma página. | Página inicial no topo. | Ao clicar, a página rola suavemente até a seção Filmes; o endereço do navegador **não** precisa mudar de página. | Clicar “Começar agora” e verificar scroll até Filmes. |
| RN-HOME-HERO-002 | Link “Ver jogos em alta” | O segundo botão abre a área de promoções com foco em jogos em destaque. | Página inicial no topo. | Abre a página de promoções já na aba/visualização de jogos em alta. | Clicar no link e conferir aba/conteúdo de em alta. |

---

## 3 — Continuar assistindo

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-HOME-CA-001 | Bloco só para usuário logado | A faixa “Continuar assistindo” não aparece para visitante. | Usuário **não** está logado. | Nenhum bloco “Continuar assistindo” entre o hero e Filmes. | Abrir a página em anônimo. |
| RN-HOME-CA-002 | Bloco oculto sem itens | Se o usuário logado não tem nada para continuar, a faixa some. | Logado, sem animes em progresso na lista. | Seção ausente. | Conta sem itens “continuar”/“seguir”. |
| RN-HOME-CA-003 | Até dez títulos | Quando há itens, no máximo dez cards na faixa horizontal. | Logado com mais de dez animes em progresso. | Só os dez primeiros (ordem de uso recente) aparecem na home. | Conta com 11+ itens; contar cards. |
| RN-HOME-CA-004 | Card mostra temporada e episódio | Cada card exibe temporada e número do episódio. | Pelo menos um item na faixa. | Texto no formato “S{n} · E{n}” (temporada e episódio). | Ler um card qualquer. |
| RN-HOME-CA-005 | Tempo restante | Se houver tempo restante do episódio, aparece texto “Restam …”. | Item com progresso parcial no episódio. | Linha com tempo restante abaixo do título. | Item com episódio pela metade. |
| RN-HOME-CA-006 | Abrir no streaming | Se o sistema tem link do Crunchyroll para aquele item, o clique abre em nova aba. | Item com link de streaming associado. | Nova aba do navegador no serviço de streaming. | Clicar card com link. |
| RN-HOME-CA-007 | Sem link vai à minha lista | Sem link externo, o clique leva à área de animes da minha lista. | Item sem URL de streaming. | Navega para minha lista de animes na mesma aba. | Clicar card sem link externo. |
| RN-HOME-CA-008 | “Ver todos” | Link no canto da faixa leva à listagem completa de animes da minha lista. | Faixa visível. | Abre minha lista de animes. | Clicar “Ver todos”. |

---

## 4 — O que entra nos carrosséis de Filmes, Séries e Jogos (conteúdo)

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-HOME-CON-001 | Foco em lançamentos recentes e próximos | Os três carrosséis priorizam títulos com data de lançamento (ou equivalente) nos **últimos 90 dias** e até o **fim do mês seguinte** ao mês atual — não uma lista infinita de clássicos antigos. | Data de teste conhecida; título com estreia há mais de 90 dias só por reestreia antiga. | Título muito antigo fora dessa janela **não** aparece no carrossel temporal (pode existir em outras páginas do site). | Comparar título reestreia antiga na home vs página Filmes. |
| RN-HOME-CON-002 | Filmes: sem shows e concertos na faixa | Gravações de show, stand-up e concertos ao vivo não devem aparecer nos carrosséis de lançamento da home. | Catálogo com filme de concerto cadastrado. | Ausente na faixa Filmes da home. | Buscar concerto na página Filmes; verificar ausência na home. |
| RN-HOME-CON-003 | Filmes: curta duração futura | Filmes de estreia futura com duração conhecida muito curta (abaixo do padrão de “filme de cinema”) não entram na seleção inicial da home. | Filme futuro com duração de curta-metragem conhecida. | Não aparece no carrossel inicial de filmes. | Validar com título de teste curto. |
| RN-HOME-CON-004 | Filmes: destaques no card | Alguns filmes exibem etiqueta extra (ex.: “mais esperado”) conforme regras editoriais do produto. | Filme elegível a destaque na semana/mês. | Pill ou etiqueta no card além do status normal. | Comparar cards em destaque na mídia. |
| RN-HOME-CON-005 | Séries: data do próximo episódio | Série em exibição com episódio futuro aparece posicionada na **data do próximo episódio**, não só na estreia original da série. | Série com próximo episódio marcado para data futura. | Card na faixa Séries alinhado ao mês/dia do próximo ep ao rolar a timeline. | Série semanal com ep na sexta; conferir posição na sexta. |
| RN-HOME-CON-006 | Séries: episódio recente | Se não há episódio futuro, mas houve episódio nos últimos 90 dias, a série continua na timeline nessa data recente. | Episódio exibido há poucos dias. | Card ainda visível ao navegar no passado recente do carrossel. | Série que estreou ep ontem. |
| RN-HOME-CON-007 | Jogos: plataformas no card | Cards de jogos mostram ícones de até quatro plataformas quando disponíveis. | Jogo com várias plataformas. | Até quatro ícones visíveis no card. | Inspecionar card de jogo multiplataforma. |
| RN-HOME-CON-008 | Jogos pouco relevantes | Jogos sem nenhum sinal de interesse (nota, seguidores, expectativa) tendem a não aparecer na seleção da home. | Jogo obscuro no catálogo. | Ausente na faixa Jogos da home. | Comparar com página Jogos. |
| RN-HOME-CON-009 | Conteúdo adulto explícito em animes | Animes classificados como conteúdo adulto explícito (ex.: hentai) não aparecem na faixa Animes da home. | Título adulto no catálogo geral. | Ausente na home; pode ou não aparecer em outras áreas conforme política do site. | Buscar título adulto; verificar home. |
| RN-HOME-CON-010 | Animes da temporada e agenda | Na faixa Animes entram títulos da temporada corrente, estreias no mês atual/próximo ou com episódio previsto nas **próximas três semanas**. | Anime fora de temporada e sem episódio próximo. | Pode não aparecer no carregamento inicial. | Anime antigo fora de exibição. |

---

## 5 — Timeline: datas, mês no título e posição inicial (Filmes, Séries, Jogos)

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-HOME-TL-001 | Título do mês no carrossel | Acima dos cards de Filmes/Séries/Jogos aparece um título do tipo “Lançamentos de [mês] de [ano]” conforme o card central/focado. | Carrossel carregado com pelo menos um título datado. | Texto em português com mês por extenso. | Abrir faixa Filmes e ler o título superior. |
| RN-HOME-TL-002 | Abrir no próximo lançamento | Ao carregar, o carrossel posiciona o foco no **primeiro título com data hoje ou futura** dentro da janela de 90 dias. | Existe estreia futura na faixa. | Card central (ou focado) é o próximo lançamento, não o primeiro da lista histórica. | Abrir home em dia com estreias futuras; ver qual card está ao centro. |
| RN-HOME-TL-003 | Sem futuro: último lançado | Se não há mais nenhuma data futura na lista carregada, o foco vai para o **último título já lançado** (ainda dentro dos 90 dias). | Só passado recente na faixa. | Foco no lançamento mais recente já ocorrido. | Testar em dia sem estreias futuras carregadas. |
| RN-HOME-TL-004 | Série/anime: data do episódio | Para séries (e posicionamento equivalente quando o card traz “próximo episódio”), a data usada na timeline é a do **próximo episódio**, se for hoje ou futuro. | Card com “próximo episódio” visível. | Posição no carrossel coerente com a data do episódio, não só estreia da série. | Série com nova temporada distante mas ep semanal próximo. |
| RN-HOME-TL-005 | Placeholders no início | Antes de calcular a posição, o usuário pode ver cartões cinza/esqueleto centralizados. | Primeiro acesso ou rede lenta. | Até ~10 placeholders; depois substituídos por cards reais na posição correta. | Recarregar com rede lenta na faixa Filmes. |
| RN-HOME-TL-006 | Rolagem horizontal | O usuário desliza ou usa setas para ver títulos anteriores e posteriores no tempo. | Faixa com vários cards. | Movimento horizontal; card central em destaque (anel/foco). | Arrastar carrossel e usar setas laterais. |
| RN-HOME-TL-007 | Ctrl + roda do mouse | Com tecla Ctrl pressionada, a roda do mouse no carrossel avança/volta slides (em desktop). | Desktop, foco na faixa. | Carrossel muda de slide com Ctrl+scroll. | Testar em navegador desktop. |
| RN-HOME-TL-008 | Carregar meses ao navegar | Ao chegar perto do fim ou início de um mês no carrossel, o sistema busca títulos do mês seguinte ou anterior. | Usuário rola vários meses para frente ou para trás. | Novos cards aparecem; título do mês no topo atualiza. | Rolar rapidamente 3–4 meses à frente. |
| RN-HOME-TL-009 | Não “pular” ao puxar o passado | Ao incluir meses mais antigos no início da lista, a posição visual do card que o usuário estava vendo se mantém. | Usuário no meio do carrossel; sistema carrega mês anterior. | O mesmo título permanece em foco (sem salto brusco). | Rolar para trás até disparar carga de mês anterior. |
| RN-HOME-TL-010 | Setas de mudança de mês | Controles permitem saltar para o próximo/anterior **mês** com títulos (até um limite de meses vazios seguidos). | Carrossel com navegação por mês habilitada. | Avanço/retrocesso por mês; após vários meses sem título, para de avançar em vazio. | Clicar setas de mês repetidamente. |
| RN-HOME-TL-011 | Filtro por gênero | Menu de filtro na faixa restringe os cards ao gênero escolhido. | Vários gêneros na faixa. | Só cards daquele gênero; lista de gêneros reflete o que existe nos cards carregados. | Abrir filtro, escolher um gênero. |
| RN-HOME-TL-012 | Troca de gênero reposiciona | Ao mudar o gênero, o carrossel recalcula e volta a focar no “próximo lançamento” **dentro do filtro**. | Filtro alterado com resultados. | Posição inicial coerente com o subconjunto filtrado. | Filtrar gênero raro e observar card central. |
| RN-HOME-TL-013 | Scroll rápido (ícone raio) | Opção global de “scroll rápido” acelera a animação do carrossel e antecipa carregamento ao se aproximar da borda do mês. | Usuário ativa ícone de raio/Zap no controle da faixa (se visível). | Transições mais rápidas; mais cards pré-carregados ao rolar forte. | Ligar/desligar e comparar velocidade. |

---

## 6 — Lançamentos “só ano” (data a confirmar)

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-HOME-TBD-001 | Separador de ano sem dia | Após os títulos com dia definido, o carrossel pode mostrar bloco “Lançamentos de [ano] — sem data confirmada”. | Existem títulos com ano mas sem dia/mês confirmado. | Cartão separador + cards desses títulos **depois** da parte datada. | Rolar até o fim da timeline datada em Filmes. |
| RN-HOME-TBD-002 | Título ao focar TBD | Ao parar em um separador ou card “só ano”, o título superior usa a frase de ano sem data confirmada. | Usuário focou slide TBD. | Texto “sem data confirmada” no cabeçalho do carrossel. | Focar separador de ano. |
| RN-HOME-TBD-003 | Anos futuros na fila | São reservados espaços para anos do ano corrente até alguns anos à frente (blocos podem ir enchendo ao rolar). | Carrossel em modo timeline (não “Em alta”). | Ao avançar meses/anos, aparecem novos blocos TBD conforme o ano. | Rolar até virada de ano no carrossel. |

---

## 7 — Modo “Em alta” (Filmes, Séries, Jogos)

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-HOME-EA-001 | Ativar Em alta | Botão/controle “Em alta” na faixa troca a lista para destaques de popularidade/expectativa. | Faixa Filmes, Séries ou Jogos. | Timeline por mês some; cards em ordem de “em alta”; sem separadores de ano TBD. | Clicar Em alta na faixa Filmes. |
| RN-HOME-EA-002 | Filmes em alta ≠ populares da página Filmes | A lista “Em alta” na home de **filmes** usa critério de **mais esperados** (antecipação de estreia), não o mesmo botão “Populares” da página Filmes. | Modo Em alta em Filmes na home. | Ordem/conjunto pode diferir da página Filmes → Populares. | Comparar os mesmos dias home Em alta vs página Filmes Populares. |
| RN-HOME-EA-003 | Séries e jogos em alta | Em Séries e Jogos, Em alta mostra títulos em destaque por popularidade/relevância do catálogo. | Modo Em alta ativo. | Lista fixa (~dezena de títulos) sem navegação por mês. | Ativar Em alta em Séries. |
| RN-HOME-EA-004 | Início da lista | Ao ativar Em alta, o carrossel vai para o **primeiro** card da lista em alta. | Toggle ligado. | Primeiro slide visível. | Ativar e ver posição. |
| RN-HOME-EA-005 | Desativar volta à timeline | Ao desligar Em alta, o carrossel retorna ao modo data e reposiciona no contexto de “hoje”. | Estava em Em alta. | Modo mês retorna; foco próximo lançamento. | Ligar e desligar Em alta. |
| RN-HOME-EA-006 | Gênero em Em alta | Filtro de gênero continua disponível e lista só títulos em alta daquele gênero. | Em alta com vários gêneros. | Dropdown coerente com cards visíveis. | Filtrar gênero em Em alta. |

---

## 8 — Faixa Animes (carrossel próprio)

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-HOME-AC-001 | Dois modos: estreias e semana | A faixa Animes permite alternar entre visão por **temporada/estreias** e **agenda da semana** (por dia). | Faixa Animes visível. | Botões/ícones alternam entre modos; título do carrossel muda (temporada vs dia da semana). | Clicar alternância calendário/lista. |
| RN-HOME-AC-002 | Modo inicial automático | Na **quarta semana em diante** da temporada corrente, a página pode abrir já na agenda semanal; no início da temporada, abre em estreias. | Data de teste no fim vs início da temporada. | Modo inicial diferente; só na primeira visita (escolha manual depois é mantida). | Testar em duas datas da mesma temporada. |
| RN-HOME-AC-003 | Estreias: temporada atual | No modo estreias, título indica estreias da temporada/ano (ex.: “Estreias de Verão 2026”). | Modo estreias, temporada corrente. | Copy com nome da estação e ano. | Ler título da faixa. |
| RN-HOME-AC-004 | Estreias: posição inicial | Foco no próximo anime a estrear (ou último já estreado na temporada). | Animes com datas na temporada. | Card central coerente com “próximo” na data de hoje. | Abrir home e ver card central. |
| RN-HOME-AC-005 | Agenda semanal: só com episódio marcado | No modo semana, entram animes que têm **próximo episódio** agendado; agrupados por dia da semana. | Modo semana. | Separadores “Segunda”, “Terça”, etc., com cards abaixo. | Ativar modo semana em temporada ativa. |
| RN-HOME-AC-006 | Agenda: abrir no dia de hoje | Ao entrar no modo semana, o foco vai para o separador do **dia da semana de hoje**. | Modo semana com episódios na semana. | Separador do dia atual visível/central. | Abrir modo semana no meio da semana. |
| RN-HOME-AC-007 | Trocar temporada | Setas mudam ano/temporada (Inverno, Primavera, Verão, Outono). | Modo estreias. | Novos cards após breve carregamento se a temporada ainda não estava aberta. | Avançar para próxima temporada. |
| RN-HOME-AC-008 | Em alta em animes | Modo destaque lista animes populares (sem eixo de temporada). | Em alta ligado na faixa Animes. | Lista por popularidade; filtros de formato/adulto aplicados na exibição. | Toggle Em alta em Animes. |
| RN-HOME-AC-009 | Fixar na semana (logado) | Usuário logado pode fixar anime no menu do card para destacar na semana. | Logado, card de anime. | Opção no menu ⋮; ícone de pin no card quando fixado. | Fixar e ver pin. |
| RN-HOME-AC-010 | Loop na agenda semanal | No modo semana, a rolagem pode ser contínua (volta ao início). | Modo semana ativo. | Comportamento de carrossel em loop (diferente do modo estreias). | Rolar até o fim no modo semana. |

---

## 9 — Cards de título (todas as faixas da home)

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-HOME-CARD-001 | Abrir detalhe | Toque/clique no card abre painel de detalhe do título (modal). | Card visível. | Modal com sinopse, datas, links, etc. | Clicar poster/título. |
| RN-HOME-CARD-002 | Menu ⋮ | Botão de três pontos abre menu de ações sem sair da home. | Card visível. | Menu com favoritar, quero assistir, etc. | Abrir menu. |
| RN-HOME-CARD-003 | Fechar menu ao clicar fora | Clicar fora do menu fecha o menu. | Menu aberto. | Menu some. | Clicar área vazia. |
| RN-HOME-CARD-004 | Favoritar / quero assistir | Ações gravam na conta do usuário quando logado. | Logado. | Estado ativo reflete no menu; indicador no card se aplicável. | Favoritar e recarregar página logado. |
| RN-HOME-CARD-005 | Visitante não grava | Sem login, ações de lista pedem entrada na conta (mensagem). | Não logado. | Aviso; nada salvo. | Favoritar deslogado. |
| RN-HOME-CARD-006 | Acompanhando (série/anime) | Opção extra para série e anime. | Card série ou anime. | Item “Acompanhando” no menu. | Abrir menu em série. |
| RN-HOME-CARD-007 | Já assisti / já joguei | Só disponível se o título **já foi lançado** (data de lançamento no passado). | Filme/jogo futuro. | Opção desabilitada ou sem efeito. | Tentar em estreia futura. |
| RN-HOME-CARD-008 | Avaliar ao marcar visto | Ao marcar já assisti/joguei em título lançado, abre fluxo de **nota** antes de concluir. | Lançado, logado. | Modal de avaliação. | Marcar já assisti em filme antigo. |
| RN-HOME-CARD-009 | Etiqueta de status — filme | Ordem de prioridade visual: **Pré-venda** → **Em cartaz** → **No streaming** (após lançamento) → **Em breve**. | Filmes com flags diferentes. | Uma etiqueta principal por card. | Comparar filme em cartaz vs streaming. |
| RN-HOME-CARD-010 | Etiqueta — série/anime | **Novo ep** (24h) → **Em exibição** → **Em breve** → **No streaming**. | Episódio exibido há menos de 24h. | “NOVO EP” visível. | Testar dia após estreia de ep. |
| RN-HOME-CARD-011 | Novo ep: regra de 24h | “Novo ep” usa data do último episódio (série) ou regra equivalente no anime. | Ep entre 1h e 24h atrás. | Etiqueta presente; após 24h some. | Esperar ou simular data. |
| RN-HOME-CARD-012 | Dublagem no anime | Texto **Dublado** ou **Legendado** vem da informação oficial do título, não da lista de elenco no card. | Anime com dublagem BR cadastrada. | “Dublado” no card. | Comparar com título só legendado. |
| RN-HOME-CARD-013 | Contagem para próximo episódio | Rodapé do card pode mostrar contagem regressiva para o próximo episódio. | Série/anime com próximo ep futuro. | Texto com dias/horas; abaixo de 1 dia atualiza mais frequentemente. | Card com ep amanhã vs hoje à noite. |
| RN-HOME-CARD-014 | Saga em filme | Filme parte de saga pode mostrar atalho para página de continuações. | Filme com saga. | Link de saga; clique **não** abre o modal (só o link). | Clicar saga vs poster. |
| RN-HOME-CARD-015 | Conteúdo adulto no poster | Poster de título adulto aparece desfocado até passar o mouse (desktop) ou interação equivalente. | Título marcado adulto ainda permitido. | Blur no poster. | Hover no card adulto. |
| RN-HOME-CARD-016 | Indicador na minha lista | Logado com favorito/quero/acompanhando, o card pode mostrar marca visual de lista. | Logado com item na lista. | Borda ou pill de destaque. | Favoritar e olhar o card. |
| RN-HOME-CARD-017 | Ocultar título | “Não me interessa” remove o título das recomendações pessoais conforme política da conta. | Logado. | Título some das listas personalizadas subsequentes. | Ocultar e buscar de novo. |

---

## 10 — Atualização de conteúdo e elementos globais

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-HOME-UPD-001 | Atualizar após sincronização do catálogo | Quando o site recebe atualização em massa de títulos (em segundo plano), as faixas da home podem **atualizar sozinhas** sem o usuário recarregar a página. | Ambiente onde sync/disparo de atualização ocorre. | Cards novos ou datas alteradas após evento. | Após sync, manter home aberta e observar. |
| RN-HOME-UPD-002 | Falha na atualização silenciosa | Se a atualização automática falhar, a home mantém o que já estava na tela. | Falha de rede na atualização. | Sem mensagem obrigatória; conteúdo antigo permanece. | Cortar rede após sync. |
| RN-HOME-SHELL-001 | Menu superior e busca | Cabeçalho do site (busca, conta, tema) está presente na home e funciona igual às outras páginas. | Qualquer estado de login. | Busca abre overlay; login leva à entrada. | Usar busca e menu no topo. |
| RN-HOME-SHELL-002 | Sem popup de “consentimento +18” | Conteúdo adulto é tratado com blur e exclusão de alguns títulos; **não** há janela modal pedindo aceite de conteúdo adulto só na home. | Título adulto permitido. | Apenas blur/exclusão, sem popup dedicado. | Navegar home com título adulto. |

---

## 11 — Diferenças importantes (para não confundir no teste)

| Situação | O que o usuário pode notar |
|----------|----------------------------|
| Filmes “Em alta” na home vs “Populares” na página Filmes | Listas e ordens **diferentes**; home prioriza **mais esperados**. |
| Card na home vs mesmo título na página Filmes | Concertos podem aparecer na listagem Filmes e **não** no carrossel da home. |
| Página Séries completa vs carrossel Séries na home | A home usa critérios mais rígidos de qualidade e datas; a listagem de Séries pode mostrar mais títulos. |

---

## Ver também (outras telas, mesma linguagem)

- Detalhe do título e avaliação: `08-MODAIS.md`
- Busca e cabeçalho: `09-BUSCA-HEADER.md`
- Listagem completa de filmes: `02-FILMES.md`
