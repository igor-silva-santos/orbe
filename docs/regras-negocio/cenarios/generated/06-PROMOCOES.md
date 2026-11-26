# Cenários — Promoções

**Arquivo inventário:** `06-PROMOCOES.md`

---

## CT-RN-PROMO-001-01 — Validar: Aba pela URL

**ID_Regra:** `RN-PROMO-001` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | `/promocoes`, `/promocoes?tab=promocoes`, `/promocoes?tab=em-alta`. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Abrir cada URL.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Padrão **Jogos de Graça**; `promocoes` → aba Promoções; `em-alta` → Em Alta. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-002-01 — Validar: Shell da página

**ID_Regra:** `RN-PROMO-002` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Primeira visita. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Abrir Promoções com rede lenta.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Layout visível; conteúdo das abas grátis/promo preenche depois. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-003-01 — Validar: Três abas

**ID_Regra:** `RN-PROMO-003` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Página carregada. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Clicar cada aba.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Alternar abas muda conteúdo principal. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-004-01 — Validar: Em Alta sem ofertas de loja

**ID_Regra:** `RN-PROMO-004` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Aba **Em Alta** ativa. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Abrir Em Alta.<br>3. Observar ausência de grids de oferta.<br>4. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Só blocos de jogos em alta; sem skeleton de 12 cards de deal (salvo loading interno de Em Alta). |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-005-01 — Validar: Carregar sob demanda

**ID_Regra:** `RN-PROMO-005` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Abrir direto em Promoções sem passar por Grátis. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Entrar direto `?tab=promocoes`.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Promoções carrega ao selecionar aba; Grátis pode não ter sido buscado ainda. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-006-01 — Validar: Várias lojas — grátis

**ID_Regra:** `RN-PROMO-006` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Aba Grátis carregada. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Ler rodapé após load.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Cards de lojas diferentes; rodapé lista fontes com contagem. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-007-01 — Validar: Várias lojas — promo pagas

**ID_Regra:** `RN-PROMO-007` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Aba Promoções. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Abrir aba Promoções.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Ofertas misturadas; ordenação **Popularidade** por padrão. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-008-01 — Validar: Catálogo Orbe na Steam

**ID_Regra:** `RN-PROMO-008` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Jogos Orbe em promo Steam. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Aba Promoções com catálogo populado.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Seção **Promoções na Steam (catálogo)** com carrossel horizontal. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-009-01 — Validar: Atualização periódica

**ID_Regra:** `RN-PROMO-009` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Aba grátis ou promo. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Clicar **Atualizar agora** duas vezes.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Horário **Última atualização** muda após atualizar. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-010-01 — Validar: Alerta de fontes indisponíveis

**ID_Regra:** `RN-PROMO-010` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Fonte externa down no ambiente. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Simular/induzir falha de fonte.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Banner listando lojas com falha. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-011-01 — Validar: Sem detalhes técnicos internos

**ID_Regra:** `RN-PROMO-011` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Qualquer aba de oferta. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Inspecionar UI.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Nenhum painel “debug” na interface. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-012-01 — Validar: Conteúdo da aba Grátis

**ID_Regra:** `RN-PROMO-012` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Grátis carregado. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Percorrer aba Grátis.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Seções **Estão de graça** e **São de graça**; chips de plataforma. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-013-01 — Validar: Paginação de promoções pagas

**ID_Regra:** `RN-PROMO-013` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Muitas promoções ao vivo. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Clicar até sumir botão.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Botão **Carregar mais promoções** aumenta grid. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-014-01 — Validar: Preços em reais

**ID_Regra:** `RN-PROMO-014` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Ofertas em dólar. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Ler rodapé e cards.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Preço BRL nos cards; linha USD/BRL no rodapé. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-015-01 — Validar: Temporário vs permanente

**ID_Regra:** `RN-PROMO-015` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Deals de ambos tipos. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Ler subtítulos das seções.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Duas seções com textos explicativos diferentes. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-016-01 — Validar: Ordenação padrão grátis

**ID_Regra:** `RN-PROMO-016` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Aba Grátis. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Trocar ordenação.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Select de ordenação; mudar reordena temporários. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-017-01 — Validar: Filtro por plataforma/loja

**ID_Regra:** `RN-PROMO-017` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filtrar e atualizar. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Filtrar Steam.<br>3. Atualizar se vazio.<br>4. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Chip some ou volta para **Todas**. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-018-01 — Validar: Busca por título

**ID_Regra:** `RN-PROMO-018` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Texto parcial do título. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Buscar substring.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Grid reduzido. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-019-01 — Validar: Destaques itch.io e EA App

**ID_Regra:** `RN-PROMO-019` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Deals nessas lojas. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Confirmar que itch não repete no grid principal.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Seções **Grátis na itch.io** / **Grátis na EA** (ou equivalente). |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-020-01 — Validar: Agrupamento por loja

**ID_Regra:** `RN-PROMO-020` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Várias lojas. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Ver aba Grátis com muitas fontes.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Subtítulos EPIC, STEAM, etc., cada um com grid. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-021-01 — Validar: Contador na aba Grátis

**ID_Regra:** `RN-PROMO-021` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Busca ativa. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Buscar título raro.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Badge diminui. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-022-01 — Validar: Vazio grátis

**ID_Regra:** `RN-PROMO-022` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Lista filtrada vazia. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Filtrar loja sem giveaways.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Mensagens específicas por seção. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-023-01 — Validar: Ordenação padrão promo

**ID_Regra:** `RN-PROMO-023` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Aba Promoções. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Usar select de ordenação.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Trocar para **Maior desconto** reordena grid. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-024-01 — Validar: Faixa catálogo Steam

**ID_Regra:** `RN-PROMO-024` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Pelo menos um jogo Orbe em promo na Steam. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Abrir Promoções com catálogo em promo.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Seção com link **Ver aba Em Alta →**. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-025-01 — Validar: Carregar mais

**ID_Regra:** `RN-PROMO-025` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | >48 promoções. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Buscar título → botão ausente.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | **Carregar mais promoções** append cards; com busca o botão some. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-026-01 — Validar: Contador aba Promoções

**ID_Regra:** `RN-PROMO-026` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filtro plataforma. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Filtrar Epic.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Número atualiza. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-027-01 — Validar: Wishlist Steam (em breve)

**ID_Regra:** `RN-PROMO-027` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Aba Promoções visível. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Ler bloco no topo da aba.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Texto **Lista de desejos Steam (em breve)**. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-028-01 — Validar: Em Alta embutido

**ID_Regra:** `RN-PROMO-028` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Tab `em-alta`. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Abrir aba Em Alta.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Ver regras RN-JOGOS-019–029 em `05-JOGOS.md`. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-029-01 — Validar: Bookmark antigo

**ID_Regra:** `RN-PROMO-029` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | URL legada. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Acessar URL antiga.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Endereço final `?tab=em-alta`. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-030-01 — Validar: Atualizar agora

**ID_Regra:** `RN-PROMO-030` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Botão no hero. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Clicar em Grátis vs Em Alta.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Spinner no ícone; horário atualiza (abas de deal). |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-031-01 — Validar: Erro global de ofertas

**ID_Regra:** `RN-PROMO-031` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Indisponibilidade. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Simular falha.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | **Não foi possível carregar promoções e jogos grátis.** + **Tentar novamente**. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-032-01 — Validar: Skeleton inicial

**ID_Regra:** `RN-PROMO-032` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Rede lenta, aba ≠ Em Alta. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Throttle + abrir Promoções.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Skeleton antes dos cards reais. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-033-01 — Validar: Banner de degradação

**ID_Regra:** `RN-PROMO-033` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Fontes parciais down. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Ambiente degradado.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Banner âmbar/vermelho. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-034-01 — Validar: Rodapé de fontes

**ID_Regra:** `RN-PROMO-034` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Após load grátis/promo. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Comparar com quantidade visível.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Linha **Fontes:** Epic (n), Steam (n)… |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-035-01 — Validar: Tamanho da primeira página promo

**ID_Regra:** `RN-PROMO-035` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Muitas ofertas. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Contar antes de carregar mais.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Grid inicial ~48; botão carrega resto. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |
