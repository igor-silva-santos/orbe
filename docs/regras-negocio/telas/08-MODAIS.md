# Modais de detalhe — Regras de negócio (visão de tela)

**Onde o usuário está:** sobreposição (modal) de detalhes de uma mídia — filme, série, anime ou jogo — aberta a partir de cards em listagens, busca, home, Hoje, prêmios, etc.

**O que existe neste fluxo:** painel escurecido; card central com pôster, sinopse, botões de ação; possível indicador de carregamento; submodais (calendário, avaliação, requisitos de PC).

---

## 1 — Abrir, fechar e navegação

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-MODAL-001 | Só abre com mídia válida | O modal de detalhe exige tipo e obra reconhecidos. | Clique em card de mídia suportada. | Overlay e conteúdo aparecem; tipos não suportados não abrem modal. | Abrir filme, série, anime e jogo a partir de cards. |
| RN-MODAL-002 | Fechar ao mudar de página | Se o usuário vai para outra página do site com o modal aberto. | Modal aberto; clicar link do menu ou digitar outra URL interna. | Modal fecha; a nova página carrega normalmente (sem “voltar” extra inesperado). | Com modal aberto, ir para Filmes pelo header. |
| RN-MODAL-003 | Detalhes ao abrir | Ao abrir, a tela busca informações completas da obra. | Abrir modal pela primeira vez para um título. | Breve loading; depois sinopse, elenco, links etc. mais completos que no card. | Abrir modal e comparar dados com o card. |
| RN-MODAL-004 | Falha ao buscar detalhes | Se a busca de detalhes falhar. | Rede instável ou título problemático. | Modal ainda mostra o que já vinha do card; raramente tela de erro se não houver nenhum dado. | Simular offline após abrir modal. |
| RN-MODAL-005 | Botão voltar do navegador | O modal participa do histórico do navegador. | Modal aberto em desktop/mobile. | Fechar pelo X, clique fora ou Esc pode voltar uma entrada no histórico; botão “voltar” do browser fecha o modal. | Abrir modal → botão voltar do navegador. |
| RN-MODAL-006 | Rolagem da página de fundo | Enquanto o modal está aberto. | Modal visível. | A página atrás não rola (scroll bloqueado); ao fechar, rolagem normal volta. | Tentar rolar a listagem com modal aberto. |
| RN-MODAL-007 | Clique fora fecha | Clicar na área escura fora do card. | Modal aberto. | Modal fecha. | Clicar no backdrop. |
| RN-MODAL-008 | Tecla Esc fecha | Teclado com foco na página. | Modal aberto (desktop). | Esc fecha o modal. | Pressionar Esc. |
| RN-MODAL-009 | Premiações no topo | Obra com prêmios cadastrados. | Filme/série/etc. com lista de premiações. | Bloco de prêmios acima do restante do conteúdo. | Abrir título premiado conhecido. |
| RN-MODAL-010 | Modo edição (administrador) | Conta com perfil administrador. | Usuário admin; modal aberto. | Botão de editar visível; alterna para formulários de curadoria; visitante/usuário comum não vê editar. | Logar como admin vs usuário normal. |
| RN-MODAL-011 | Conteúdo por tipo | Cada tipo de mídia tem layout próprio. | Abrir os quatro tipos. | Filme, série, anime e jogo mostram blocos adequados (streaming, temporadas, plataformas, etc.). | Quatro modais distintos. |
| RN-MODAL-012 | Carregando detalhes | Entre abrir e receber dados completos. | Rede lenta. | Indicador de carregamento com mensagem fixa. | Throttle ao abrir modal. |
| RN-MODAL-013 | Busca fecha ao abrir detalhe | Busca global aberta; usuário abre um card. | Overlay de busca visível. | Busca fecha; modal de detalhe fica por cima. | Buscar título → clicar resultado. |

---

## 2 — Calendário pessoal

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-MODAL-020 | Exige login | Adicionar ao calendário pessoal. | Usuário **não** logado. | Mensagem de erro (toast); submodal de calendário fecha. | Anônimo → tentar adicionar evento. |
| RN-MODAL-021 | Opções por tipo | Tipos de evento variam conforme filme, anime, série ou jogo. | Logado; modal de cada tipo. | Filme: estreia e/ou sessão de cinema (data, hora, local). Anime: estreia e/ou lembretes semanais. Série e jogo: estreia única. | Percorrer fluxo calendário em filme e anime. |
| RN-MODAL-022 | Lembretes semanais (anime/série) | Opção recorrente para anime ou série. | Logado; escolher recorrência semanal. | Vários eventos espaçados (~7 dias), conforme quantidade de episódios informada ou padrão (~12). | Criar série de lembretes e conferir quantidade. |
| RN-MODAL-023 | Estreia sem data | Evento de lançamento sem data conhecida. | Obra sem data de estreia. | Aviso; nada é salvo; modal fecha. | Título sem data → “lançamento”. |
| RN-MODAL-024 | Ingresso de cinema | Evento tipo sessão/ingresso. | Filme com formulário de cinema preenchido. | Evento com data, hora e local informados. | Preencher e salvar sessão. |
| RN-MODAL-025 | Confirmação de salvamento | Eventos válidos enviados. | Logado; dados completos. | Toast de sucesso ou erro após tentativa de salvar. | Salvar evento válido e inválido. |
| RN-MODAL-026 | Botão calendário em filme futuro | Botão “Adicionar ao Calendário” no filme. | Filme com estreia **futura** vs já lançado. | Botão visível só enquanto a estreia ainda não passou. | Filme futuro vs lançado. |

---

## 3 — Avaliação (“Já assisti” / “Já joguei”)

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-MODAL-030 | Abrir pelo card | Atalho no card, não pelo menu genérico de lista. | Card de mídia já lançada. | Abre modal de avaliação; desabilitado se a obra ainda não lançou. | Título futuro vs lançado → botão “Já assisti/joguei”. |
| RN-MODAL-031 | Marca como assistido/jogado | Após enviar avaliação. | Logado; modal de rating aberto. | Status passa a “assistido” (inclusive para jogos). | Avaliar jogo e conferir status na lista. |
| RN-MODAL-032 | Campos da avaliação | Usuário escolhe sentimento e comentário opcional. | Modal aberto. | Opções do tipo gostei / amei / não gostei; campo de texto opcional. | Enviar com e sem comentário. |
| RN-MODAL-033 | Login obrigatório | Tentativa sem sessão. | Não logado. | Toast de aviso; modal fecha sem salvar. | Anônimo → avaliar. |

---

## 4 — Modal de filme (visualização)

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-MODAL-040 | Título e pôster | Exibição prioriza textos e imagens curados quando existirem. | Filme com título/pôster alternativos no catálogo. | Título e arte coerentes com curadoria do site. | Comparar com listagem. |
| RN-MODAL-041 | Onde assistir | Provedores de streaming e cinema. | Filme com e sem provedores. | Lista de serviços (sem duplicatas óbvias); se nada conhecido, texto “Desconhecido”. | Filme só cinema vs só streaming. |
| RN-MODAL-042 | Ingresso | Compra ou sessões de cinema. | Filme em cartaz, pré-venda ou com sessões. | Botão de ingresso conforme disponibilidade; compra habilitada só quando há sessões confirmadas. | Filme em cartaz com/sem sessões. |
| RN-MODAL-043 | Trailer | Vídeos disponíveis para o filme. | Filme com trailer oficial e alternativos. | Prioriza trailer oficial; senão primeiro trailer; senão outro vídeo. | Abrir filme com vários vídeos. |
| RN-MODAL-044 | Elenco → página da pessoa | Clique em ator/equipe. | Elenco listado. | Vai para página da pessoa; modal de filme fecha; ao voltar, fluxo de retorno pode reabrir o filme (quando aplicável). | Clicar nome no elenco → voltar. |
| RN-MODAL-045 | Continuações no filme | Abas extras no modal. | Filme com sequências ou universo. | Aba “Continuação” e/ou “Universo” com obras relacionadas. | Filme de franquia conhecida. |

---

## 5 — Modal de série (visualização)

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-MODAL-050 | Onde assistir | Mescla fontes de plataforma de streaming. | Série com vários provedores. | Lista deduplicada de serviços. | Inspecionar bloco streaming. |
| RN-MODAL-051 | Elenco → pessoa | Mesmo padrão do filme. | Elenco presente. | Navega para a página da pessoa; ao voltar, o modal da série pode reabrir quando o site guardou esse retorno. | Clicar ator. |
| RN-MODAL-052 | Calendário na série | Botão explícito de calendário na UI de série. | Modal de série aberto. | Não há botão dedicado igual ao de filme futuro; calendário pode existir por outros fluxos conforme produto. | Procurar botão calendário na série. |
| RN-MODAL-053 | Continuações | Abas de franquia/universo. | Série ligada a universo compartilhado. | Abas de continuação/universo como no filme. | Série MCU/DCEU etc. |

---

## 6 — Modal de anime (visualização)

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-MODAL-060 | Sinopse legível | Texto da sinopse sem códigos ou formatação estranha visíveis. | Anime com sinopse rica ou vazia. | Texto limpo; se ausente, “(não informado)”. | Abrir anime cuja sinopse venha com formatação na origem. |
| RN-MODAL-061 | Fixar na semana | Usuário logado. | Conta autenticada. | Botão “Fixar na semana” / “Na sua semana” alterna destaque pessoal da semana. | Logar; fixar e desfixar. |
| RN-MODAL-062 | Plataformas | Onde assistir o anime. | Várias plataformas incl. Crunchyroll. | Lista por nome; Crunchyroll pode mostrar só ícone. | Card de anime multi-plataforma. |
| RN-MODAL-063 | Personagem e dublador | Elenco de voz JP e PT-BR quando existir. | Anime com dublagem BR. | Alternar JP/PT-BR; link para página do dublador fecha o modal. | Anime dublado → link dublador. |
| RN-MODAL-064 | Rankings | Listas de popularidade/classificação. | Anime com muitos rankings. | Até **6** entradas visíveis, com rótulos traduzidos. | Anime popular em várias listas. |

---

## 7 — Modal de jogo (visualização)

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-MODAL-070 | Requisitos de PC | Jogo de PC/Steam com requisitos cadastrados. | Jogo PC com requisitos vs console-only. | Drawer ou bloco de requisitos mínimos/recomendados só quando aplicável. | Jogo Steam vs exclusivo console. |
| RN-MODAL-071 | Desenvolvedora | Nome da desenvolvedora/publicadora. | Jogo com empresa cadastrada. | Link para página da desenvolvedora. | Clicar link da empresa. |
| RN-MODAL-072 | Preço Steam | Dados de loja quando disponíveis. | Jogo com ID Steam ou preço. | Exibe preço Steam no bloco de informações quando houver dado. | Jogo com página Steam ativa. |

---

## 8 — Edição (administrador)

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-MODAL-080 | Salvar alterações de filme | Admin em modo edição. | Campos curados editados. | Salvar persiste título, sinopse, pôster etc.; usuário vê dados atualizados ao reabrir. | Admin edita título curado → salvar → reabrir. |
| RN-MODAL-081 | Cancelar edição | Admin cancela sem salvar. | Modo edição ativo. | Volta à visualização; dados na tela permanecem os anteriores ao save. | Editar → cancelar. |
| RN-MODAL-082 | Tipos editáveis | Admin tenta editar cada tipo. | Conta admin. | Formulários para filme, série, anime e jogo; outros tipos mostram indisponível. | Alternar tipos em modo edição. |

---

## 9 — Continuações dentro do modal

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-MODAL-090 | Carregar sob demanda | Abas de continuação/universo. | Filme/série com franquia. | Conteúdo das abas carrega ao exibir (pode haver loading breve). | Abrir aba Continuação em filme de saga. |
| RN-MODAL-091 | Ocultar se vazio | Obra sem sequência nem universo. | Título isolado. | Nenhuma aba extra de continuações. | Filme standalone. |
| RN-MODAL-092 | Abas dinâmicas | Obra com sequência e/ou universo. | Só sequência, só universo, ou ambos. | Aba padrão “Continuação” se houver sequência; senão “Universo”; só abas com conteúdo. | Comparar filme sequel vs spin-off universo. |
