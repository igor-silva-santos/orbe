# Cenários — Modais

**Arquivo inventário:** `08-MODAIS.md`

---

## CT-RN-MODAL-001-01 — Validar: Só abre com mídia válida

**ID_Regra:** `RN-MODAL-001` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Clique em card de mídia suportada. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Abrir filme, série, anime e jogo a partir de cards.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Overlay e conteúdo aparecem; tipos não suportados não abrem modal. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-002-01 — Validar: Fechar ao mudar de página

**ID_Regra:** `RN-MODAL-002` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Modal aberto; clicar link do menu ou digitar outra URL interna. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Com modal aberto, ir para Filmes pelo header.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Modal fecha; a nova página carrega normalmente (sem “voltar” extra inesperado). |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-003-01 — Validar: Detalhes ao abrir

**ID_Regra:** `RN-MODAL-003` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Abrir modal pela primeira vez para um título. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Abrir modal e comparar dados com o card.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Breve loading; depois sinopse, elenco, links etc. mais completos que no card. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-004-01 — Validar: Falha ao buscar detalhes

**ID_Regra:** `RN-MODAL-004` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Rede instável ou título problemático. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Simular offline após abrir modal.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Modal ainda mostra o que já vinha do card; raramente tela de erro se não houver nenhum dado. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-005-01 — Validar: Botão voltar do navegador

**ID_Regra:** `RN-MODAL-005` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Modal aberto em desktop/mobile. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Abrir modal → botão voltar do navegador.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Fechar pelo X, clique fora ou Esc pode voltar uma entrada no histórico; botão “voltar” do browser fecha o modal. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-006-01 — Validar: Rolagem da página de fundo

**ID_Regra:** `RN-MODAL-006` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Modal visível. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Tentar rolar a listagem com modal aberto.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | A página atrás não rola (scroll bloqueado); ao fechar, rolagem normal volta. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-007-01 — Validar: Clique fora fecha

**ID_Regra:** `RN-MODAL-007` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Modal aberto. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Clicar no backdrop.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Modal fecha. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-008-01 — Validar: Tecla Esc fecha

**ID_Regra:** `RN-MODAL-008` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Modal aberto (desktop). |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Pressionar Esc.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Esc fecha o modal. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-009-01 — Validar: Premiações no topo

**ID_Regra:** `RN-MODAL-009` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme/série/etc. com lista de premiações. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Abrir título premiado conhecido.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Bloco de prêmios acima do restante do conteúdo. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-010-01 — Validar: Modo edição (administrador)

**ID_Regra:** `RN-MODAL-010` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Usuário admin; modal aberto. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Logar como admin vs usuário normal.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Botão de editar visível; alterna para formulários de curadoria; visitante/usuário comum não vê editar. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-011-01 — Validar: Conteúdo por tipo

**ID_Regra:** `RN-MODAL-011` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Abrir os quatro tipos. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Quatro modais distintos.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Filme, série, anime e jogo mostram blocos adequados (streaming, temporadas, plataformas, etc.). |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-012-01 — Validar: Carregando detalhes

**ID_Regra:** `RN-MODAL-012` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Rede lenta. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Throttle ao abrir modal.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Indicador de carregamento com mensagem fixa. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-013-01 — Validar: Busca fecha ao abrir detalhe

**ID_Regra:** `RN-MODAL-013` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Overlay de busca visível. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Buscar título → clicar resultado.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Busca fecha; modal de detalhe fica por cima. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-020-01 — Validar: Exige login

**ID_Regra:** `RN-MODAL-020` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Usuário **não** logado. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Anônimo → tentar adicionar evento.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Mensagem de erro (toast); submodal de calendário fecha. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-021-01 — Validar: Opções por tipo

**ID_Regra:** `RN-MODAL-021` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Logado; modal de cada tipo. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Percorrer fluxo calendário em filme e anime.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Filme: estreia e/ou sessão de cinema (data, hora, local). Anime: estreia e/ou lembretes semanais. Série e jogo: estreia única. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-022-01 — Validar: Lembretes semanais (anime/série)

**ID_Regra:** `RN-MODAL-022` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Logado; escolher recorrência semanal. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Criar série de lembretes e conferir quantidade.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Vários eventos espaçados (~7 dias), conforme quantidade de episódios informada ou padrão (~12). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-023-01 — Validar: Estreia sem data

**ID_Regra:** `RN-MODAL-023` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Obra sem data de estreia. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Título sem data → “lançamento”.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Aviso; nada é salvo; modal fecha. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-024-01 — Validar: Ingresso de cinema

**ID_Regra:** `RN-MODAL-024` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme com formulário de cinema preenchido. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Preencher e salvar sessão.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Evento com data, hora e local informados. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-025-01 — Validar: Confirmação de salvamento

**ID_Regra:** `RN-MODAL-025` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Logado; dados completos. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Salvar evento válido e inválido.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Toast de sucesso ou erro após tentativa de salvar. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-026-01 — Validar: Botão calendário em filme futuro

**ID_Regra:** `RN-MODAL-026` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme com estreia **futura** vs já lançado. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Filme futuro vs lançado.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Botão visível só enquanto a estreia ainda não passou. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-030-01 — Validar: Abrir pelo card

**ID_Regra:** `RN-MODAL-030` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Card de mídia já lançada. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Título futuro vs lançado → botão “Já assisti/joguei”.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Abre modal de avaliação; desabilitado se a obra ainda não lançou. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-031-01 — Validar: Marca como assistido/jogado

**ID_Regra:** `RN-MODAL-031` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Logado; modal de rating aberto. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Avaliar jogo e conferir status na lista.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Status passa a “assistido” (inclusive para jogos). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-032-01 — Validar: Campos da avaliação

**ID_Regra:** `RN-MODAL-032` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Modal aberto. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Enviar com e sem comentário.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Opções do tipo gostei / amei / não gostei; campo de texto opcional. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-033-01 — Validar: Login obrigatório

**ID_Regra:** `RN-MODAL-033` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Não logado. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Anônimo → avaliar.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Toast de aviso; modal fecha sem salvar. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-040-01 — Validar: Título e pôster

**ID_Regra:** `RN-MODAL-040` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme com título/pôster alternativos no catálogo. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Comparar com listagem.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Título e arte coerentes com curadoria do site. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-041-01 — Validar: Onde assistir

**ID_Regra:** `RN-MODAL-041` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme com e sem provedores. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Filme só cinema vs só streaming.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Lista de serviços (sem duplicatas óbvias); se nada conhecido, texto “Desconhecido”. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-042-01 — Validar: Ingresso

**ID_Regra:** `RN-MODAL-042` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme em cartaz, pré-venda ou com sessões. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Filme em cartaz com/sem sessões.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Botão de ingresso conforme disponibilidade; compra habilitada só quando há sessões confirmadas. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-043-01 — Validar: Trailer

**ID_Regra:** `RN-MODAL-043` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme com trailer oficial e alternativos. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Abrir filme com vários vídeos.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Prioriza trailer oficial; senão primeiro trailer; senão outro vídeo. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-044-01 — Validar: Elenco → página da pessoa

**ID_Regra:** `RN-MODAL-044` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Elenco listado. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Clicar nome no elenco → voltar.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Vai para página da pessoa; modal de filme fecha; ao voltar, fluxo de retorno pode reabrir o filme (quando aplicável). |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-045-01 — Validar: Continuações no filme

**ID_Regra:** `RN-MODAL-045` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme com sequências ou universo. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Filme de franquia conhecida.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Aba “Continuação” e/ou “Universo” com obras relacionadas. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-050-01 — Validar: Onde assistir

**ID_Regra:** `RN-MODAL-050` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Série com vários provedores. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Inspecionar bloco streaming.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Lista deduplicada de serviços. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-051-01 — Validar: Elenco → pessoa

**ID_Regra:** `RN-MODAL-051` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Elenco presente. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Clicar ator.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Navega para a página da pessoa; ao voltar, o modal da série pode reabrir quando o site guardou esse retorno. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-052-01 — Validar: Calendário na série

**ID_Regra:** `RN-MODAL-052` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Modal de série aberto. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Procurar botão calendário na série.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Não há botão dedicado igual ao de filme futuro; calendário pode existir por outros fluxos conforme produto. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-053-01 — Validar: Continuações

**ID_Regra:** `RN-MODAL-053` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Série ligada a universo compartilhado. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Série MCU/DCEU etc.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Abas de continuação/universo como no filme. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-060-01 — Validar: Sinopse legível

**ID_Regra:** `RN-MODAL-060` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Anime com sinopse rica ou vazia. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Abrir anime cuja sinopse venha com formatação na origem.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Texto limpo; se ausente, “(não informado)”. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-061-01 — Validar: Fixar na semana

**ID_Regra:** `RN-MODAL-061` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Conta autenticada. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Logar.<br>3. Fixar e desfixar.<br>4. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Botão “Fixar na semana” / “Na sua semana” alterna destaque pessoal da semana. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-062-01 — Validar: Plataformas

**ID_Regra:** `RN-MODAL-062` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Várias plataformas incl. Crunchyroll. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Card de anime multi-plataforma.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Lista por nome; Crunchyroll pode mostrar só ícone. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-063-01 — Validar: Personagem e dublador

**ID_Regra:** `RN-MODAL-063` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Anime com dublagem BR. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Anime dublado → link dublador.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Alternar JP/PT-BR; link para página do dublador fecha o modal. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-064-01 — Validar: Rankings

**ID_Regra:** `RN-MODAL-064` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Anime com muitos rankings. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Anime popular em várias listas.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Até **6** entradas visíveis, com rótulos traduzidos. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-070-01 — Validar: Requisitos de PC

**ID_Regra:** `RN-MODAL-070` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Jogo PC com requisitos vs console-only. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Jogo Steam vs exclusivo console.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Drawer ou bloco de requisitos mínimos/recomendados só quando aplicável. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-071-01 — Validar: Desenvolvedora

**ID_Regra:** `RN-MODAL-071` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Jogo com empresa cadastrada. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Clicar link da empresa.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Link para página da desenvolvedora. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-072-01 — Validar: Preço Steam

**ID_Regra:** `RN-MODAL-072` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Jogo com ID Steam ou preço. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Jogo com página Steam ativa.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Exibe preço Steam no bloco de informações quando houver dado. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-080-01 — Validar: Salvar alterações de filme

**ID_Regra:** `RN-MODAL-080` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Campos curados editados. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Admin edita título curado → salvar → reabrir.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Salvar persiste título, sinopse, pôster etc.; usuário vê dados atualizados ao reabrir. |
| Dados_Conta_Ambiente | Homologação; conta **administrador** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-081-01 — Validar: Cancelar edição

**ID_Regra:** `RN-MODAL-081` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Modo edição ativo. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Editar → cancelar.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Volta à visualização; dados na tela permanecem os anteriores ao save. |
| Dados_Conta_Ambiente | Homologação; conta **administrador** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-082-01 — Validar: Tipos editáveis

**ID_Regra:** `RN-MODAL-082` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Conta admin. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Alternar tipos em modo edição.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Formulários para filme, série, anime e jogo; outros tipos mostram indisponível. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-090-01 — Validar: Carregar sob demanda

**ID_Regra:** `RN-MODAL-090` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme/série com franquia. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Abrir aba Continuação em filme de saga.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Conteúdo das abas carrega ao exibir (pode haver loading breve). |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-091-01 — Validar: Ocultar se vazio

**ID_Regra:** `RN-MODAL-091` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Título isolado. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Filme standalone.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Nenhuma aba extra de continuações. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-092-01 — Validar: Abas dinâmicas

**ID_Regra:** `RN-MODAL-092` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Só sequência, só universo, ou ambos. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Comparar filme sequel vs spin-off universo.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Aba padrão “Continuação” se houver sequência; senão “Universo”; só abas com conteúdo. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |
