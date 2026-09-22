# Regras de negócio — Orbe Nerd (QA)

**Total:** 511 regras · **Visão:** somente o que o usuário vê na tela

Documento gerado a partir do inventário em `docs/regras-negocio/telas/`.
Para planilha: [`regras-negocio-qa.csv`](./regras-negocio-qa.csv).

---

## Índice

1. [RN-ANIMES-001 — Conteúdo na abertura](#rn-animes-001)
2. [RN-ANIMES-002 — Falha na abertura](#rn-animes-002)
3. [RN-ANIMES-003 — Texto do cabeçalho](#rn-animes-003)
4. [RN-ANIMES-004 — Gaveta O que vem aí](#rn-animes-004)
5. [RN-ANIMES-005 — Opções dos filtros](#rn-animes-005)
6. [RN-ANIMES-006 — Valor “Todos”](#rn-animes-006)
7. [RN-ANIMES-007 — Recarga ao mudar filtro e na hidratação](#rn-animes-007)
8. [RN-ANIMES-008 — Atualização após sync](#rn-animes-008)
9. [RN-ANIMES-009 — Contador = cards da página atual](#rn-animes-009)
10. [RN-ANIMES-010 — Grade, loading e vazio](#rn-animes-010)
11. [RN-ANIMES-011 — Lote inicial sem “carregar mais”](#rn-animes-011)
12. [RN-ANIMES-012 — Exclusão de adulto explícito](#rn-animes-012)
13. [RN-ANIMES-013 — Tags sensíveis ocultas](#rn-animes-013)
14. [RN-ANIMES-014 — Filtros combinados](#rn-animes-014)
15. [RN-ANIMES-015 — Ordem alfabética padrão](#rn-animes-015)
16. [RN-ANIMES-016 — Listagem vs home / Hoje](#rn-animes-016)
17. [RN-ANIMES-017 — Conteúdo pode demorar a atualizar](#rn-animes-017)
18. [RN-ANIMES-018 — Metadados de filtro completos](#rn-animes-018)
19. [RN-ANIMES-019 — Detalhe ao vivo](#rn-animes-019)
20. [RN-ANIMES-020 — Próximo episódio (detalhe/agenda)](#rn-animes-020)
21. [RN-AUTH-001 — Campos obrigatórios](#rn-auth-001)
22. [RN-AUTH-002 — Sucesso](#rn-auth-002)
23. [RN-AUTH-003 — Erro genérico](#rn-auth-003)
24. [RN-AUTH-004 — Redirect seguro](#rn-auth-004)
25. [RN-AUTH-005 — Mostrar senha](#rn-auth-005)
26. [RN-AUTH-006 — Ir para cadastro](#rn-auth-006)
27. [RN-AUTH-010 — Senha mínima](#rn-auth-010)
28. [RN-AUTH-011 — Confirmar senha](#rn-auth-011)
29. [RN-AUTH-012 — Campos obrigatórios](#rn-auth-012)
30. [RN-AUTH-013 — Sucesso](#rn-auth-013)
31. [RN-AUTH-014 — Erro do servidor](#rn-auth-014)
32. [RN-AUTH-020 — Restaurar ao abrir o site](#rn-auth-020)
33. [RN-AUTH-021 — Dados após login](#rn-auth-021)
34. [RN-AUTH-022 — Preferências lembradas](#rn-auth-022)
35. [RN-AUTH-023 — Sair](#rn-auth-023)
36. [RN-AUTH-024 — Sessão no navegador](#rn-auth-024)
37. [RN-AUTH-025 — Tipo de conta](#rn-auth-025)
38. [RN-AUTH-030 — Só para logados](#rn-auth-030)
39. [RN-AUTH-031 — Dados básicos](#rn-auth-031)
40. [RN-AUTH-032 — Bio](#rn-auth-032)
41. [RN-AUTH-033 — Bloco conta](#rn-auth-033)
42. [RN-AUTH-034 — Atalhos](#rn-auth-034)
43. [RN-AUTH-035 — Ferramentas admin](#rn-auth-035)
44. [RN-AUTH-040 — Só para logados](#rn-auth-040)
45. [RN-AUTH-041 — Campos editáveis](#rn-auth-041)
46. [RN-AUTH-042 — Salvar perfil](#rn-auth-042)
47. [RN-AUTH-043 — Texto de privacidade](#rn-auth-043)
48. [RN-AUTH-044 — Sem troca de senha aqui](#rn-auth-044)
49. [RN-AUTH-050 — Minha lista no menu](#rn-auth-050)
50. [RN-AUTH-051 — Perfil e configurações](#rn-auth-051)
51. [RN-BUSCA-001 — Abrir e fechar](#rn-busca-001)
52. [RN-BUSCA-002 — Histórico do navegador](#rn-busca-002)
53. [RN-BUSCA-003 — Limpar ao fechar](#rn-busca-003)
54. [RN-BUSCA-004 — Em alta sem digitar](#rn-busca-004)
55. [RN-BUSCA-005 — Mínimo de caracteres](#rn-busca-005)
56. [RN-BUSCA-006 — Espera antes de buscar](#rn-busca-006)
57. [RN-BUSCA-007 — Filtro por tipo](#rn-busca-007)
58. [RN-BUSCA-008 — Resultados de mídia](#rn-busca-008)
59. [RN-BUSCA-009 — Pessoas e dubladores](#rn-busca-009)
60. [RN-BUSCA-010 — O que mostra por categoria](#rn-busca-010)
61. [RN-BUSCA-011 — Seção pessoas](#rn-busca-011)
62. [RN-BUSCA-012 — Contagem de resultados](#rn-busca-012)
63. [RN-BUSCA-013 — Ações nos cards](#rn-busca-013)
64. [RN-BUSCA-014 — Destaque de foco](#rn-busca-014)
65. [RN-BUSCA-015 — Estados vazios](#rn-busca-015)
66. [RN-BUSCA-020 — Destino do clique](#rn-busca-020)
67. [RN-BUSCA-021 — Voltar à busca](#rn-busca-021)
68. [RN-BUSCA-022 — Subtítulo do card](#rn-busca-022)
69. [RN-CONT-001 — Lista inicial](#rn-cont-001)
70. [RN-CONT-002 — Detalhe de saga](#rn-cont-002)
71. [RN-CONT-003 — Detalhe de universo](#rn-cont-003)
72. [RN-CONT-004 — Abas na listagem](#rn-cont-004)
73. [RN-CONT-005 — Card de saga](#rn-cont-005)
74. [RN-CONT-006 — Card de universo](#rn-cont-006)
75. [RN-CONT-007 — Timeline da saga](#rn-cont-007)
76. [RN-CONT-008 — Detalhe do universo](#rn-cont-008)
77. [RN-CONT-009 — Abrir obra](#rn-cont-009)
78. [RN-CONT-010 — Sem conteúdo](#rn-cont-010)
79. [RN-CONT-011 — Voltar à lista](#rn-cont-011)
80. [RN-CONT-020 — Abas no modal](#rn-cont-020)
81. [RN-DEV-001 — Empresa inválida](#rn-dev-001)
82. [RN-DEV-002 — Lista paginada](#rn-dev-002)
83. [RN-DEV-003 — Scroll infinito](#rn-dev-003)
84. [RN-DEV-004 — Título da página](#rn-dev-004)
85. [RN-DEV-005 — Texto informativo](#rn-dev-005)
86. [RN-DEV-006 — Grid de jogos](#rn-dev-006)
87. [RN-DEV-007 — Entrada pelo modal](#rn-dev-007)
88. [RN-DUB-001 — Carregar créditos](#rn-dub-001)
89. [RN-DUB-002 — Rótulo de idioma](#rn-dub-002)
90. [RN-DUB-003 — Tipos na filmografia](#rn-dub-003)
91. [RN-DUB-004 — Personagem no card](#rn-dub-004)
92. [RN-DUB-005 — Abrir detalhe](#rn-dub-005)
93. [RN-DUB-006 — Voltar para busca](#rn-dub-006)
94. [RN-EVT-001 — Ano padrão](#rn-evt-001)
95. [RN-EVT-002 — Carregar resumo](#rn-evt-002)
96. [RN-EVT-003 — Só eventos com jogos](#rn-evt-003)
97. [RN-EVT-004 — Contador](#rn-evt-004)
98. [RN-EVT-005 — Loading e erro](#rn-evt-005)
99. [RN-EVT-006 — Ano vazio](#rn-evt-006)
100. [RN-EVT-007 — Jogos por evento](#rn-evt-007)
101. [RN-FILMES-001 — Conteúdo na primeira abertura](#rn-filmes-001)
102. [RN-FILMES-002 — Atualização gradual do catálogo](#rn-filmes-002)
103. [RN-FILMES-003 — Falha no carregamento inicial](#rn-filmes-003)
104. [RN-FILMES-004 — Texto do cabeçalho](#rn-filmes-004)
105. [RN-FILMES-005 — Gaveta O que vem aí](#rn-filmes-005)
106. [RN-FILMES-006 — Ações nos cards da gaveta](#rn-filmes-006)
107. [RN-FILMES-007 — Gaveta Em cartaz](#rn-filmes-007)
108. [RN-FILMES-008 — Gavetas carregam após a página](#rn-filmes-008)
109. [RN-FILMES-009 — Atalho Todos os Filmes](#rn-filmes-009)
110. [RN-FILMES-010 — Atalho Em Cartaz](#rn-filmes-010)
111. [RN-FILMES-011 — Atalho Em Breve](#rn-filmes-011)
112. [RN-FILMES-012 — Atalho Populares](#rn-filmes-012)
113. [RN-FILMES-013 — Destaque visual do atalho](#rn-filmes-013)
114. [RN-FILMES-014 — Gênero “Todos”](#rn-filmes-014)
115. [RN-FILMES-015 — Nome do gênero no menu](#rn-filmes-015)
116. [RN-FILMES-016 — Ano “Todos”](#rn-filmes-016)
117. [RN-FILMES-017 — Anos no dropdown](#rn-filmes-017)
118. [RN-FILMES-018 — Meses em português](#rn-filmes-018)
119. [RN-FILMES-019 — Mês “Todos”](#rn-filmes-019)
120. [RN-FILMES-020 — Status traduzido](#rn-filmes-020)
121. [RN-FILMES-021 — Filtro por plataforma](#rn-filmes-021)
122. [RN-FILMES-022 — Plataformas ordenadas](#rn-filmes-022)
123. [RN-FILMES-023 — Filtros sempre clicáveis](#rn-filmes-023)
124. [RN-FILMES-024 — Primeira visita sem “piscar” desnecessário](#rn-filmes-024)
125. [RN-FILMES-025 — Mudança de filtro recarrega](#rn-filmes-025)
126. [RN-FILMES-026 — Atualização após sync do site](#rn-filmes-026)
127. [RN-FILMES-027 — Spinner ao filtrar](#rn-filmes-027)
128. [RN-FILMES-028 — Contador com total global](#rn-filmes-028)
129. [RN-FILMES-029 — Contador em carregamento](#rn-filmes-029)
130. [RN-FILMES-030 — Grade responsiva](#rn-filmes-030)
131. [RN-FILMES-031 — Nenhum resultado](#rn-filmes-031)
132. [RN-FILMES-032 — Falha ao recarregar no cliente](#rn-filmes-032)
133. [RN-FILMES-033 — Limite inicial de cards na tela](#rn-filmes-033)
134. [RN-FILMES-034 — Cards com informação de streaming](#rn-filmes-034)
135. [RN-FILMES-035 — Saga e coleção no card](#rn-filmes-035)
136. [RN-FILMES-036 — Curadoria de exibição padrão](#rn-filmes-036)
137. [RN-FILMES-037 — Sem pôster](#rn-filmes-037)
138. [RN-FILMES-038 — Sem sinopse](#rn-filmes-038)
139. [RN-FILMES-039 — Conteúdo adulto explícito](#rn-filmes-039)
140. [RN-FILMES-040 — Exceção em cartaz ou em breve](#rn-filmes-040)
141. [RN-FILMES-041 — Nota mínima com muitos votos](#rn-filmes-041)
142. [RN-FILMES-042 — Ano corrente ou futuro mais permissivo](#rn-filmes-042)
143. [RN-FILMES-043 — Filtro por ano civil](#rn-filmes-043)
144. [RN-FILMES-044 — Filtro por mês](#rn-filmes-044)
145. [RN-FILMES-045 — Mês sem ano usa ano atual](#rn-filmes-045)
146. [RN-FILMES-046 — Filtro por gênero](#rn-filmes-046)
147. [RN-FILMES-047 — Filtro por status](#rn-filmes-047)
148. [RN-FILMES-048 — Só já lançados (catálogo)](#rn-filmes-048)
149. [RN-FILMES-049 — Só futuros (catálogo)](#rn-filmes-049)
150. [RN-FILMES-050 — Disponibilidade cinema (catálogo)](#rn-filmes-050)
151. [RN-FILMES-051 — Disponibilidade streaming (catálogo)](#rn-filmes-051)
152. [RN-FILMES-052 — Ordem alfabética em “Todos”](#rn-filmes-052)
153. [RN-FILMES-053 — Listagem mais ampla que a home](#rn-filmes-053)
154. [RN-FILMES-054 — Opções de filtro só com filmes](#rn-filmes-054)
155. [RN-FILMES-055 — Anos sem duplicata](#rn-filmes-055)
156. [RN-FILMES-056 — Janela temporal da home](#rn-filmes-056)
157. [RN-FILMES-057 — Concertos na listagem](#rn-filmes-057)
158. [RN-FILMES-058 — Curta-metragem futuro na home](#rn-filmes-058)
159. [RN-FILMES-059 — Duração mínima só na home](#rn-filmes-059)
160. [RN-FILMES-060 — Abrir detalhe pelo card](#rn-filmes-060)
161. [RN-FILMES-061 — Destaques no detalhe](#rn-filmes-061)
162. [RN-FILMES-062 — Edição administrativa](#rn-filmes-062)
163. [RN-FILMES-063 — Ranking “mais esperados”](#rn-filmes-063)
164. [RN-FILMES-064 — Timeline por ano (outras telas)](#rn-filmes-064)
165. [RN-FILMES-065 — Timeline por mês (outras telas)](#rn-filmes-065)
166. [RN-FILMES-066 — Só ano confirmado (outras telas)](#rn-filmes-066)
167. [RN-FILMES-067 — Contador alinhado ao total filtrado](#rn-filmes-067)
168. [RN-FILMES-068 — Coerência após recarregar](#rn-filmes-068)
169. [RN-HEADER-001 — Links principais (desktop)](#rn-header-001)
170. [RN-HEADER-002 — Menu “Mais”](#rn-header-002)
171. [RN-HEADER-003 — Item ativo](#rn-header-003)
172. [RN-HEADER-004 — Abrir busca](#rn-header-004)
173. [RN-HEADER-005 — Tema claro/escuro](#rn-header-005)
174. [RN-HEADER-006 — Notificações](#rn-header-006)
175. [RN-HEADER-007 — Menu do usuário logado](#rn-header-007)
176. [RN-HEADER-008 — Visitante (desktop)](#rn-header-008)
177. [RN-HEADER-009 — Menu mobile](#rn-header-009)
178. [RN-HEADER-010 — Fechar menus](#rn-header-010)
179. [RN-HEADER-020 — Resultado abre detalhe](#rn-header-020)
180. [RN-HEADER-021 — Retorno da página pessoa](#rn-header-021)
181. [RN-HOJE-001 — Conteúdo após abrir a página](#rn-hoje-001)
182. [RN-HOJE-002 — Data do dia](#rn-hoje-002)
183. [RN-HOJE-003 — Ligar/desligar blocos](#rn-hoje-003)
184. [RN-HOJE-004 — Pelo menos uma seção](#rn-hoje-004)
185. [RN-HOJE-005 — Ordem fixa das faixas](#rn-hoje-005)
186. [RN-HOJE-006 — Faixa sem itens some](#rn-hoje-006)
187. [RN-HOJE-007 — Nada para mostrar](#rn-hoje-007)
188. [RN-HOJE-008 — Erro ao carregar](#rn-hoje-008)
189. [RN-HOJE-009 — Esqueletos no carregamento](#rn-hoje-009)
190. [RN-HOJE-010 — Cards iguais ao resto do site](#rn-hoje-010)
191. [RN-HOJE-011 — Janela “esta semana”](#rn-hoje-011)
192. [RN-HOJE-012 — Em cartaz nos cinemas](#rn-hoje-012)
193. [RN-HOJE-013 — Estreias da semana](#rn-hoje-013)
194. [RN-HOJE-014 — Etiquetas em filmes](#rn-hoje-014)
195. [RN-HOJE-015 — Filmes no streaming esta semana](#rn-hoje-015)
196. [RN-HOJE-016 — Séries no streaming esta semana](#rn-hoje-016)
197. [RN-HOJE-017 — Animes em exibição (prioridade)](#rn-hoje-017)
198. [RN-HOJE-018 — Animes — completar lista](#rn-hoje-018)
199. [RN-HOJE-019 — Jogos em destaque](#rn-hoje-019)
200. [RN-HOJE-020 — Animes mais exigentes que a listagem](#rn-hoje-020)
201. [RN-HOJE-021 — Textos de sinopse](#rn-hoje-021)
202. [RN-HOJE-022 — Atualização dos destaques](#rn-hoje-022)
203. [RN-HOJE-023 — Falha grave no servidor](#rn-hoje-023)
204. [RN-HOJE-024 — Seções batem com a tela](#rn-hoje-024)
205. [RN-HOME-001 — Ordem das seções](#rn-home-001)
206. [RN-HOME-002 — Título da faixa leva à listagem](#rn-home-002)
207. [RN-HOME-003 — Página não “quebra” sem conteúdo](#rn-home-003)
208. [RN-HOME-004 — Carregamento tardio das faixas](#rn-home-004)
209. [RN-HOME-AC-001 — Dois modos: estreias e semana](#rn-home-ac-001)
210. [RN-HOME-AC-002 — Modo inicial automático](#rn-home-ac-002)
211. [RN-HOME-AC-003 — Estreias: temporada atual](#rn-home-ac-003)
212. [RN-HOME-AC-004 — Estreias: posição inicial](#rn-home-ac-004)
213. [RN-HOME-AC-005 — Agenda semanal: só com episódio marcado](#rn-home-ac-005)
214. [RN-HOME-AC-006 — Agenda: abrir no dia de hoje](#rn-home-ac-006)
215. [RN-HOME-AC-007 — Trocar temporada](#rn-home-ac-007)
216. [RN-HOME-AC-008 — Em alta em animes](#rn-home-ac-008)
217. [RN-HOME-AC-009 — Fixar na semana (logado)](#rn-home-ac-009)
218. [RN-HOME-AC-010 — Loop na agenda semanal](#rn-home-ac-010)
219. [RN-HOME-CA-001 — Bloco só para usuário logado](#rn-home-ca-001)
220. [RN-HOME-CA-002 — Bloco oculto sem itens](#rn-home-ca-002)
221. [RN-HOME-CA-003 — Até dez títulos](#rn-home-ca-003)
222. [RN-HOME-CA-004 — Card mostra temporada e episódio](#rn-home-ca-004)
223. [RN-HOME-CA-005 — Tempo restante](#rn-home-ca-005)
224. [RN-HOME-CA-006 — Abrir no streaming](#rn-home-ca-006)
225. [RN-HOME-CA-007 — Sem link vai à minha lista](#rn-home-ca-007)
226. [RN-HOME-CA-008 — “Ver todos”](#rn-home-ca-008)
227. [RN-HOME-CARD-001 — Abrir detalhe](#rn-home-card-001)
228. [RN-HOME-CARD-002 — Menu ⋮](#rn-home-card-002)
229. [RN-HOME-CARD-003 — Fechar menu ao clicar fora](#rn-home-card-003)
230. [RN-HOME-CARD-004 — Favoritar / quero assistir](#rn-home-card-004)
231. [RN-HOME-CARD-005 — Visitante não grava](#rn-home-card-005)
232. [RN-HOME-CARD-006 — Acompanhando (série/anime)](#rn-home-card-006)
233. [RN-HOME-CARD-007 — Já assisti / já joguei](#rn-home-card-007)
234. [RN-HOME-CARD-008 — Avaliar ao marcar visto](#rn-home-card-008)
235. [RN-HOME-CARD-009 — Etiqueta de status — filme](#rn-home-card-009)
236. [RN-HOME-CARD-010 — Etiqueta — série/anime](#rn-home-card-010)
237. [RN-HOME-CARD-011 — Novo ep: regra de 24h](#rn-home-card-011)
238. [RN-HOME-CARD-012 — Dublagem no anime](#rn-home-card-012)
239. [RN-HOME-CARD-013 — Contagem para próximo episódio](#rn-home-card-013)
240. [RN-HOME-CARD-014 — Saga em filme](#rn-home-card-014)
241. [RN-HOME-CARD-015 — Conteúdo adulto no poster](#rn-home-card-015)
242. [RN-HOME-CARD-016 — Indicador na minha lista](#rn-home-card-016)
243. [RN-HOME-CARD-017 — Ocultar título](#rn-home-card-017)
244. [RN-HOME-CON-001 — Foco em lançamentos recentes e próximos](#rn-home-con-001)
245. [RN-HOME-CON-002 — Filmes: sem shows e concertos na faixa](#rn-home-con-002)
246. [RN-HOME-CON-003 — Filmes: curta duração futura](#rn-home-con-003)
247. [RN-HOME-CON-004 — Filmes: destaques no card](#rn-home-con-004)
248. [RN-HOME-CON-005 — Séries: data do próximo episódio](#rn-home-con-005)
249. [RN-HOME-CON-006 — Séries: episódio recente](#rn-home-con-006)
250. [RN-HOME-CON-007 — Jogos: plataformas no card](#rn-home-con-007)
251. [RN-HOME-CON-008 — Jogos pouco relevantes](#rn-home-con-008)
252. [RN-HOME-CON-009 — Conteúdo adulto explícito em animes](#rn-home-con-009)
253. [RN-HOME-CON-010 — Animes da temporada e agenda](#rn-home-con-010)
254. [RN-HOME-EA-001 — Ativar Em alta](#rn-home-ea-001)
255. [RN-HOME-EA-002 — Filmes em alta ≠ populares da página Filmes](#rn-home-ea-002)
256. [RN-HOME-EA-003 — Séries e jogos em alta](#rn-home-ea-003)
257. [RN-HOME-EA-004 — Início da lista](#rn-home-ea-004)
258. [RN-HOME-EA-005 — Desativar volta à timeline](#rn-home-ea-005)
259. [RN-HOME-EA-006 — Gênero em Em alta](#rn-home-ea-006)
260. [RN-HOME-HERO-001 — Botão “Começar agora”](#rn-home-hero-001)
261. [RN-HOME-HERO-002 — Link “Ver jogos em alta”](#rn-home-hero-002)
262. [RN-HOME-SHELL-001 — Menu superior e busca](#rn-home-shell-001)
263. [RN-HOME-SHELL-002 — Sem popup de “consentimento +18”](#rn-home-shell-002)
264. [RN-HOME-TBD-001 — Separador de ano sem dia](#rn-home-tbd-001)
265. [RN-HOME-TBD-002 — Título ao focar TBD](#rn-home-tbd-002)
266. [RN-HOME-TBD-003 — Anos futuros na fila](#rn-home-tbd-003)
267. [RN-HOME-TL-001 — Título do mês no carrossel](#rn-home-tl-001)
268. [RN-HOME-TL-002 — Abrir no próximo lançamento](#rn-home-tl-002)
269. [RN-HOME-TL-003 — Sem futuro: último lançado](#rn-home-tl-003)
270. [RN-HOME-TL-004 — Série/anime: data do episódio](#rn-home-tl-004)
271. [RN-HOME-TL-005 — Placeholders no início](#rn-home-tl-005)
272. [RN-HOME-TL-006 — Rolagem horizontal](#rn-home-tl-006)
273. [RN-HOME-TL-007 — Ctrl + roda do mouse](#rn-home-tl-007)
274. [RN-HOME-TL-008 — Carregar meses ao navegar](#rn-home-tl-008)
275. [RN-HOME-TL-009 — Não “pular” ao puxar o passado](#rn-home-tl-009)
276. [RN-HOME-TL-010 — Setas de mudança de mês](#rn-home-tl-010)
277. [RN-HOME-TL-011 — Filtro por gênero](#rn-home-tl-011)
278. [RN-HOME-TL-012 — Troca de gênero reposiciona](#rn-home-tl-012)
279. [RN-HOME-TL-013 — Scroll rápido (ícone raio)](#rn-home-tl-013)
280. [RN-HOME-UPD-001 — Atualizar após sincronização do catálogo](#rn-home-upd-001)
281. [RN-HOME-UPD-002 — Falha na atualização silenciosa](#rn-home-upd-002)
282. [RN-JOGOS-001 — Conteúdo na abertura](#rn-jogos-001)
283. [RN-JOGOS-002 — Falha na abertura](#rn-jogos-002)
284. [RN-JOGOS-003 — Sem recarga duplicada na abertura](#rn-jogos-003)
285. [RN-JOGOS-004 — Filtros aplicados](#rn-jogos-004)
286. [RN-JOGOS-005 — Mês sem ano explícito](#rn-jogos-005)
287. [RN-JOGOS-006 — Mês com ano](#rn-jogos-006)
288. [RN-JOGOS-007 — Ordem alfabética](#rn-jogos-007)
289. [RN-JOGOS-008 — Popularidade (catálogo interno)](#rn-jogos-008)
290. [RN-JOGOS-009 — Listagem mais permissiva que destaques](#rn-jogos-009)
291. [RN-JOGOS-010 — Lote inicial na grade](#rn-jogos-010)
292. [RN-JOGOS-011 — Gaveta O que vem aí](#rn-jogos-011)
293. [RN-JOGOS-012 — Gaveta Eventos recentes](#rn-jogos-012)
294. [RN-JOGOS-013 — Loading, contador e vazio](#rn-jogos-013)
295. [RN-JOGOS-014 — Atualização após sync](#rn-jogos-014)
296. [RN-JOGOS-015 — Opções de filtro](#rn-jogos-015)
297. [RN-JOGOS-016 — Preço Steam no detalhe/card](#rn-jogos-016)
298. [RN-JOGOS-017 — Redirect para Promoções](#rn-jogos-017)
299. [RN-JOGOS-018 — Menu do site](#rn-jogos-018)
300. [RN-JOGOS-019 — Quem entra no ranking](#rn-jogos-019)
301. [RN-JOGOS-020 — Top da Semana](#rn-jogos-020)
302. [RN-JOGOS-021 — Mais jogados na Steam](#rn-jogos-021)
303. [RN-JOGOS-022 — Promoções Steam (dados)](#rn-jogos-022)
304. [RN-JOGOS-023 — Por plataforma](#rn-jogos-023)
305. [RN-JOGOS-024 — Por modo de jogo](#rn-jogos-024)
306. [RN-JOGOS-025 — Por categoria (gênero)](#rn-jogos-025)
307. [RN-JOGOS-026 — Semana e métrica (modo completo)](#rn-jogos-026)
308. [RN-JOGOS-027 — Modo compacto na aba Promoções](#rn-jogos-027)
309. [RN-JOGOS-028 — Erro ao carregar](#rn-jogos-028)
310. [RN-JOGOS-029 — Conteúdo estável por sessão](#rn-jogos-029)
311. [RN-LISTA-001 — Rotas exigem login](#rn-lista-001)
312. [RN-LISTA-002 — Camada de UX](#rn-lista-002)
313. [RN-LISTA-010 — Quatro tipos de mídia](#rn-lista-010)
314. [RN-LISTA-011 — “Em breve”](#rn-lista-011)
315. [RN-LISTA-012 — Mensagem orientadora](#rn-lista-012)
316. [RN-LISTA-020 — Abas Catálogo vs Fila](#rn-lista-020)
317. [RN-LISTA-021 — Animes fora da barra](#rn-lista-021)
318. [RN-LISTA-030 — Exige login na tela](#rn-lista-030)
319. [RN-LISTA-031 — Carregar lista pessoal](#rn-lista-031)
320. [RN-LISTA-032 — Filtro por status](#rn-lista-032)
321. [RN-LISTA-033 — Filtro por tipo](#rn-lista-033)
322. [RN-LISTA-034 — Itens ocultos](#rn-lista-034)
323. [RN-LISTA-035 — Status ao vivo](#rn-lista-035)
324. [RN-LISTA-036 — Aviso de itens faltantes](#rn-lista-036)
325. [RN-LISTA-037 — Listas vazias](#rn-lista-037)
326. [RN-LISTA-040 — Visitante](#rn-lista-040)
327. [RN-LISTA-041 — Carregar ao abrir](#rn-lista-041)
328. [RN-LISTA-042 — Última sincronização](#rn-lista-042)
329. [RN-LISTA-043 — Ações da barra](#rn-lista-043)
330. [RN-LISTA-044 — Banners informativos](#rn-lista-044)
331. [RN-LISTA-045 — Painel da extensão](#rn-lista-045)
332. [RN-LISTA-046 — Filtros da watchlist](#rn-lista-046)
333. [RN-LISTA-047 — Lista vazia orientada](#rn-lista-047)
334. [RN-LISTA-048 — Remover item](#rn-lista-048)
335. [RN-LISTA-049 — Editar progresso](#rn-lista-049)
336. [RN-LISTA-050 — Feedback de sync/import](#rn-lista-050)
337. [RN-LISTA-051 — Modo offline](#rn-lista-051)
338. [RN-LISTA-052 — Backup antigo](#rn-lista-052)
339. [RN-LISTA-053 — Adicionar do catálogo](#rn-lista-053)
340. [RN-LISTA-060 — Exige login](#rn-lista-060)
341. [RN-LISTA-061 — Ordem da fila](#rn-lista-061)
342. [RN-LISTA-062 — Estados especiais](#rn-lista-062)
343. [RN-LISTA-063 — Dicas de catálogo CR](#rn-lista-063)
344. [RN-LISTA-064 — Trilha de áudio](#rn-lista-064)
345. [RN-LISTA-065 — Abrir detalhe](#rn-lista-065)
346. [RN-LISTA-066 — Ajuda extensão](#rn-lista-066)
347. [RN-LISTA-070 — Login para interagir](#rn-lista-070)
348. [RN-LISTA-071 — Significado dos status](#rn-lista-071)
349. [RN-LISTA-072 — Acompanhando só anime/série](#rn-lista-072)
350. [RN-MODAL-001 — Só abre com mídia válida](#rn-modal-001)
351. [RN-MODAL-002 — Fechar ao mudar de página](#rn-modal-002)
352. [RN-MODAL-003 — Detalhes ao abrir](#rn-modal-003)
353. [RN-MODAL-004 — Falha ao buscar detalhes](#rn-modal-004)
354. [RN-MODAL-005 — Botão voltar do navegador](#rn-modal-005)
355. [RN-MODAL-006 — Rolagem da página de fundo](#rn-modal-006)
356. [RN-MODAL-007 — Clique fora fecha](#rn-modal-007)
357. [RN-MODAL-008 — Tecla Esc fecha](#rn-modal-008)
358. [RN-MODAL-009 — Premiações no topo](#rn-modal-009)
359. [RN-MODAL-010 — Modo edição (administrador)](#rn-modal-010)
360. [RN-MODAL-011 — Conteúdo por tipo](#rn-modal-011)
361. [RN-MODAL-012 — Carregando detalhes](#rn-modal-012)
362. [RN-MODAL-013 — Busca fecha ao abrir detalhe](#rn-modal-013)
363. [RN-MODAL-020 — Exige login](#rn-modal-020)
364. [RN-MODAL-021 — Opções por tipo](#rn-modal-021)
365. [RN-MODAL-022 — Lembretes semanais (anime/série)](#rn-modal-022)
366. [RN-MODAL-023 — Estreia sem data](#rn-modal-023)
367. [RN-MODAL-024 — Ingresso de cinema](#rn-modal-024)
368. [RN-MODAL-025 — Confirmação de salvamento](#rn-modal-025)
369. [RN-MODAL-026 — Botão calendário em filme futuro](#rn-modal-026)
370. [RN-MODAL-030 — Abrir pelo card](#rn-modal-030)
371. [RN-MODAL-031 — Marca como assistido/jogado](#rn-modal-031)
372. [RN-MODAL-032 — Campos da avaliação](#rn-modal-032)
373. [RN-MODAL-033 — Login obrigatório](#rn-modal-033)
374. [RN-MODAL-040 — Título e pôster](#rn-modal-040)
375. [RN-MODAL-041 — Onde assistir](#rn-modal-041)
376. [RN-MODAL-042 — Ingresso](#rn-modal-042)
377. [RN-MODAL-043 — Trailer](#rn-modal-043)
378. [RN-MODAL-044 — Elenco → página da pessoa](#rn-modal-044)
379. [RN-MODAL-045 — Continuações no filme](#rn-modal-045)
380. [RN-MODAL-050 — Onde assistir](#rn-modal-050)
381. [RN-MODAL-051 — Elenco → pessoa](#rn-modal-051)
382. [RN-MODAL-052 — Calendário na série](#rn-modal-052)
383. [RN-MODAL-053 — Continuações](#rn-modal-053)
384. [RN-MODAL-060 — Sinopse legível](#rn-modal-060)
385. [RN-MODAL-061 — Fixar na semana](#rn-modal-061)
386. [RN-MODAL-062 — Plataformas](#rn-modal-062)
387. [RN-MODAL-063 — Personagem e dublador](#rn-modal-063)
388. [RN-MODAL-064 — Rankings](#rn-modal-064)
389. [RN-MODAL-070 — Requisitos de PC](#rn-modal-070)
390. [RN-MODAL-071 — Desenvolvedora](#rn-modal-071)
391. [RN-MODAL-072 — Preço Steam](#rn-modal-072)
392. [RN-MODAL-080 — Salvar alterações de filme](#rn-modal-080)
393. [RN-MODAL-081 — Cancelar edição](#rn-modal-081)
394. [RN-MODAL-082 — Tipos editáveis](#rn-modal-082)
395. [RN-MODAL-090 — Carregar sob demanda](#rn-modal-090)
396. [RN-MODAL-091 — Ocultar se vazio](#rn-modal-091)
397. [RN-MODAL-092 — Abas dinâmicas](#rn-modal-092)
398. [RN-PERS-001 — Carregar créditos](#rn-pers-001)
399. [RN-PERS-002 — Erro e loading](#rn-pers-002)
400. [RN-PERS-003 — Perfil resumido](#rn-pers-003)
401. [RN-PERS-004 — Filmografia](#rn-pers-004)
402. [RN-PERS-005 — Abrir detalhe da obra](#rn-pers-005)
403. [RN-PERS-006 — Voltar para busca](#rn-pers-006)
404. [RN-PERS-007 — Voltar para modal](#rn-pers-007)
405. [RN-PERS-008 — Voltar genérico](#rn-pers-008)
406. [RN-PREM-001 — Modo destaque inicial](#rn-prem-001)
407. [RN-PREM-002 — Modo filtrado](#rn-prem-002)
408. [RN-PREM-003 — Opções de filtro](#rn-prem-003)
409. [RN-PREM-004 — Reset de página](#rn-prem-004)
410. [RN-PREM-005 — Seções por tipo](#rn-prem-005)
411. [RN-PREM-006 — Ver todos da premiação](#rn-prem-006)
412. [RN-PREM-007 — Paginação](#rn-prem-007)
413. [RN-PREM-008 — Cards interativos](#rn-prem-008)
414. [RN-PREM-009 — Nenhum resultado](#rn-prem-009)
415. [RN-PROMO-001 — Aba pela URL](#rn-promo-001)
416. [RN-PROMO-002 — Shell da página](#rn-promo-002)
417. [RN-PROMO-003 — Três abas](#rn-promo-003)
418. [RN-PROMO-004 — Em Alta sem ofertas de loja](#rn-promo-004)
419. [RN-PROMO-005 — Carregar sob demanda](#rn-promo-005)
420. [RN-PROMO-006 — Várias lojas — grátis](#rn-promo-006)
421. [RN-PROMO-007 — Várias lojas — promo pagas](#rn-promo-007)
422. [RN-PROMO-008 — Catálogo Orbe na Steam](#rn-promo-008)
423. [RN-PROMO-009 — Atualização periódica](#rn-promo-009)
424. [RN-PROMO-010 — Alerta de fontes indisponíveis](#rn-promo-010)
425. [RN-PROMO-011 — Sem detalhes técnicos internos](#rn-promo-011)
426. [RN-PROMO-012 — Conteúdo da aba Grátis](#rn-promo-012)
427. [RN-PROMO-013 — Paginação de promoções pagas](#rn-promo-013)
428. [RN-PROMO-014 — Preços em reais](#rn-promo-014)
429. [RN-PROMO-015 — Temporário vs permanente](#rn-promo-015)
430. [RN-PROMO-016 — Ordenação padrão grátis](#rn-promo-016)
431. [RN-PROMO-017 — Filtro por plataforma/loja](#rn-promo-017)
432. [RN-PROMO-018 — Busca por título](#rn-promo-018)
433. [RN-PROMO-019 — Destaques itch.io e EA App](#rn-promo-019)
434. [RN-PROMO-020 — Agrupamento por loja](#rn-promo-020)
435. [RN-PROMO-021 — Contador na aba Grátis](#rn-promo-021)
436. [RN-PROMO-022 — Vazio grátis](#rn-promo-022)
437. [RN-PROMO-023 — Ordenação padrão promo](#rn-promo-023)
438. [RN-PROMO-024 — Faixa catálogo Steam](#rn-promo-024)
439. [RN-PROMO-025 — Carregar mais](#rn-promo-025)
440. [RN-PROMO-026 — Contador aba Promoções](#rn-promo-026)
441. [RN-PROMO-027 — Wishlist Steam (em breve)](#rn-promo-027)
442. [RN-PROMO-028 — Em Alta embutido](#rn-promo-028)
443. [RN-PROMO-029 — Bookmark antigo](#rn-promo-029)
444. [RN-PROMO-030 — Atualizar agora](#rn-promo-030)
445. [RN-PROMO-031 — Erro global de ofertas](#rn-promo-031)
446. [RN-PROMO-032 — Skeleton inicial](#rn-promo-032)
447. [RN-PROMO-033 — Banner de degradação](#rn-promo-033)
448. [RN-PROMO-034 — Rodapé de fontes](#rn-promo-034)
449. [RN-PROMO-035 — Tamanho da primeira página promo](#rn-promo-035)
450. [RN-SERIES-001 — Conteúdo na primeira abertura](#rn-series-001)
451. [RN-SERIES-002 — Atualização gradual](#rn-series-002)
452. [RN-SERIES-003 — Falha no carregamento inicial](#rn-series-003)
453. [RN-SERIES-004 — Texto do cabeçalho](#rn-series-004)
454. [RN-SERIES-005 — Gaveta O que vem aí](#rn-series-005)
455. [RN-SERIES-006 — Sem gaveta Em cartaz](#rn-series-006)
456. [RN-SERIES-007 — Ações na gaveta](#rn-series-007)
457. [RN-SERIES-008 — Gaveta após a página](#rn-series-008)
458. [RN-SERIES-009 — Sem atalhos Em Cartaz/Populares](#rn-series-009)
459. [RN-SERIES-010 — Ordem alfabética padrão](#rn-series-010)
460. [RN-SERIES-011 — Ordenação por popularidade (catálogo)](#rn-series-011)
461. [RN-SERIES-012 — Gênero “Todos”](#rn-series-012)
462. [RN-SERIES-013 — Capitalização do gênero](#rn-series-013)
463. [RN-SERIES-014 — Ano “Todos”](#rn-series-014)
464. [RN-SERIES-015 — Filtro por ano de estreia](#rn-series-015)
465. [RN-SERIES-016 — Filtro por mês de estreia](#rn-series-016)
466. [RN-SERIES-017 — Mês sem ano](#rn-series-017)
467. [RN-SERIES-018 — Meses em português](#rn-series-018)
468. [RN-SERIES-019 — Filtro por plataforma](#rn-series-019)
469. [RN-SERIES-020 — Filtro por status](#rn-series-020)
470. [RN-SERIES-021 — Sem recarga duplicada na abertura](#rn-series-021)
471. [RN-SERIES-022 — Mudança de filtro recarrega](#rn-series-022)
472. [RN-SERIES-023 — Atualização após sync](#rn-series-023)
473. [RN-SERIES-024 — Spinner ao filtrar](#rn-series-024)
474. [RN-SERIES-025 — Contador com total global](#rn-series-025)
475. [RN-SERIES-026 — Contador em carregamento](#rn-series-026)
476. [RN-SERIES-027 — Grade responsiva](#rn-series-027)
477. [RN-SERIES-028 — Nenhum resultado](#rn-series-028)
478. [RN-SERIES-029 — Falha ao recarregar](#rn-series-029)
479. [RN-SERIES-030 — Listagem mais permissiva que a home](#rn-series-030)
480. [RN-SERIES-031 — Lote inicial na grade](#rn-series-031)
481. [RN-SERIES-032 — Cards com gêneros e streaming](#rn-series-032)
482. [RN-SERIES-033 — Gêneros visíveis no card](#rn-series-033)
483. [RN-SERIES-034 — Conteúdo pode demorar a refletir](#rn-series-034)
484. [RN-SERIES-035 — Opções de filtro coerentes](#rn-series-035)
485. [RN-SERIES-036 — Anos de estreia no filtro](#rn-series-036)
486. [RN-SERIES-037 — Status em português](#rn-series-037)
487. [RN-SERIES-038 — Home exige qualidade mínima](#rn-series-038)
488. [RN-SERIES-039 — Home exige ≥ 2 episódios](#rn-series-039)
489. [RN-SERIES-040 — Home exige pôster e sinopse](#rn-series-040)
490. [RN-SERIES-041 — Engajamento na home](#rn-series-041)
491. [RN-SERIES-042 — Nota mínima na home](#rn-series-042)
492. [RN-SERIES-043 — Estreias planejadas no carrossel mensal](#rn-series-043)
493. [RN-SERIES-044 — Data do episódio na timeline home](#rn-series-044)
494. [RN-SERIES-045 — Ordem no carrossel mensal](#rn-series-045)
495. [RN-SERIES-046 — Carrossel por ano (home)](#rn-series-046)
496. [RN-SERIES-047 — Ano sem dia confirmado (home)](#rn-series-047)
497. [RN-SERIES-048 — Contexto de temporadas na home](#rn-series-048)
498. [RN-SERIES-049 — Formato do card home vs grade](#rn-series-049)
499. [RN-SERIES-050 — Limite de itens no carrossel home](#rn-series-050)
500. [RN-SERIES-051 — Detalhe pelo card](#rn-series-051)
501. [RN-SERIES-052 — Episódios por temporada](#rn-series-052)
502. [RN-SERIES-053 — Sem edição pública](#rn-series-053)
503. [RN-SERIES-054 — Filtros habilitados](#rn-series-054)
504. [RN-SERIES-055 — Contador coerente](#rn-series-055)
505. [RN-SERIES-056 — Recarregar reseta filtros](#rn-series-056)
506. [RN-SERIES-057 — Listagem ampla sem filtro](#rn-series-057)
507. [RN-SERIES-058 — Gêneros só com séries](#rn-series-058)
508. [RN-SERIES-059 — Plataformas só com séries](#rn-series-059)
509. [RN-SERIES-060 — Erro total na listagem](#rn-series-060)
510. [RN-SERIES-061 — Erro nos filtros](#rn-series-061)
511. [RN-SERIES-062 — Série planejada na listagem](#rn-series-062)

---

## 01 HOME

**Onde o usuário está:** página inicial do site (primeira tela após abrir o endereço principal).

### RN-HOME-001 — Ordem das seções

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | A página segue uma ordem fixa de blocos de cima para baixo. |
| **Pré-condições** | Página inicial carregada com sucesso. |
| **Resultado na tela** | Do topo para baixo: mensagem de boas-vindas → (opcional) Continuar assistindo → Filmes → Séries → Animes → Jogos. |
| **Como testar** | Abrir a página inicial e rolar devagar; conferir a ordem. |

### RN-HOME-002 — Título da faixa leva à listagem

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | O nome de cada faixa (Filmes, Séries, etc.) funciona como atalho. |
| **Pré-condições** | Página inicial visível. |
| **Resultado na tela** | Ao clicar no título “Filmes”, o usuário vai para a página de listagem de filmes; o mesmo padrão para Séries, Animes e Jogos. |
| **Como testar** | Clicar em cada título de faixa e verificar a página de destino. |

### RN-HOME-003 — Página não “quebra” sem conteúdo

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Se no primeiro momento não houver títulos para mostrar, a estrutura da página continua aparecendo. |
| **Pré-condições** | Simular rede lenta ou catálogo vazio no primeiro carregamento. |
| **Resultado na tela** | Não aparece tela de erro do navegador; faixas e controles continuam; carrosséis podem mostrar placeholders e depois preencher ao rolar. |
| **Como testar** | Throttle de rede ou ambiente de teste vazio; abrir a página inicial. |

### RN-HOME-004 — Carregamento tardio das faixas

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Filmes e jogos podem começar a buscar mais títulos quando o usuário se aproxima da faixa; séries e animes quando a própria faixa entra na área visível. |
| **Pré-condições** | Usuário abre a página e fica só no topo (boas-vindas). |
| **Resultado na tela** | Ao rolar até Filmes/Jogos/Séries/Animes, novos cards ou animação de carregamento podem aparecer; não é obrigatório tudo carregar antes de rolar. |
| **Como testar** | Abrir a página, não rolar: observar rede/atividade; rolar até cada faixa. |

### RN-HOME-AC-001 — Dois modos: estreias e semana

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | A faixa Animes permite alternar entre visão por **temporada/estreias** e **agenda da semana** (por dia). |
| **Pré-condições** | Faixa Animes visível. |
| **Resultado na tela** | Botões/ícones alternam entre modos; título do carrossel muda (temporada vs dia da semana). |
| **Como testar** | Clicar alternância calendário/lista. |

### RN-HOME-AC-002 — Modo inicial automático

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Na **quarta semana em diante** da temporada corrente, a página pode abrir já na agenda semanal; no início da temporada, abre em estreias. |
| **Pré-condições** | Data de teste no fim vs início da temporada. |
| **Resultado na tela** | Modo inicial diferente; só na primeira visita (escolha manual depois é mantida). |
| **Como testar** | Testar em duas datas da mesma temporada. |

### RN-HOME-AC-003 — Estreias: temporada atual

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | No modo estreias, título indica estreias da temporada/ano (ex.: “Estreias de Verão 2026”). |
| **Pré-condições** | Modo estreias, temporada corrente. |
| **Resultado na tela** | Copy com nome da estação e ano. |
| **Como testar** | Ler título da faixa. |

### RN-HOME-AC-004 — Estreias: posição inicial

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Foco no próximo anime a estrear (ou último já estreado na temporada). |
| **Pré-condições** | Animes com datas na temporada. |
| **Resultado na tela** | Card central coerente com “próximo” na data de hoje. |
| **Como testar** | Abrir home e ver card central. |

### RN-HOME-AC-005 — Agenda semanal: só com episódio marcado

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | No modo semana, entram animes que têm **próximo episódio** agendado; agrupados por dia da semana. |
| **Pré-condições** | Modo semana. |
| **Resultado na tela** | Separadores “Segunda”, “Terça”, etc., com cards abaixo. |
| **Como testar** | Ativar modo semana em temporada ativa. |

### RN-HOME-AC-006 — Agenda: abrir no dia de hoje

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Ao entrar no modo semana, o foco vai para o separador do **dia da semana de hoje**. |
| **Pré-condições** | Modo semana com episódios na semana. |
| **Resultado na tela** | Separador do dia atual visível/central. |
| **Como testar** | Abrir modo semana no meio da semana. |

### RN-HOME-AC-007 — Trocar temporada

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Setas mudam ano/temporada (Inverno, Primavera, Verão, Outono). |
| **Pré-condições** | Modo estreias. |
| **Resultado na tela** | Novos cards após breve carregamento se a temporada ainda não estava aberta. |
| **Como testar** | Avançar para próxima temporada. |

### RN-HOME-AC-008 — Em alta em animes

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Modo destaque lista animes populares (sem eixo de temporada). |
| **Pré-condições** | Em alta ligado na faixa Animes. |
| **Resultado na tela** | Lista por popularidade; filtros de formato/adulto aplicados na exibição. |
| **Como testar** | Toggle Em alta em Animes. |

### RN-HOME-AC-009 — Fixar na semana (logado)

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Usuário logado pode fixar anime no menu do card para destacar na semana. |
| **Pré-condições** | Logado, card de anime. |
| **Resultado na tela** | Opção no menu ⋮; ícone de pin no card quando fixado. |
| **Como testar** | Fixar e ver pin. |

### RN-HOME-AC-010 — Loop na agenda semanal

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | No modo semana, a rolagem pode ser contínua (volta ao início). |
| **Pré-condições** | Modo semana ativo. |
| **Resultado na tela** | Comportamento de carrossel em loop (diferente do modo estreias). |
| **Como testar** | Rolar até o fim no modo semana. |

### RN-HOME-CA-001 — Bloco só para usuário logado

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | A faixa “Continuar assistindo” não aparece para visitante. |
| **Pré-condições** | Usuário **não** está logado. |
| **Resultado na tela** | Nenhum bloco “Continuar assistindo” entre o hero e Filmes. |
| **Como testar** | Abrir a página em anônimo. |

### RN-HOME-CA-002 — Bloco oculto sem itens

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Se o usuário logado não tem nada para continuar, a faixa some. |
| **Pré-condições** | Logado, sem animes em progresso na lista. |
| **Resultado na tela** | Seção ausente. |
| **Como testar** | Conta sem itens “continuar”/“seguir”. |

### RN-HOME-CA-003 — Até dez títulos

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Quando há itens, no máximo dez cards na faixa horizontal. |
| **Pré-condições** | Logado com mais de dez animes em progresso. |
| **Resultado na tela** | Só os dez primeiros (ordem de uso recente) aparecem na home. |
| **Como testar** | Conta com 11+ itens; contar cards. |

### RN-HOME-CA-004 — Card mostra temporada e episódio

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Cada card exibe temporada e número do episódio. |
| **Pré-condições** | Pelo menos um item na faixa. |
| **Resultado na tela** | Texto no formato “S{n} · E{n}” (temporada e episódio). |
| **Como testar** | Ler um card qualquer. |

### RN-HOME-CA-005 — Tempo restante

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Se houver tempo restante do episódio, aparece texto “Restam …”. |
| **Pré-condições** | Item com progresso parcial no episódio. |
| **Resultado na tela** | Linha com tempo restante abaixo do título. |
| **Como testar** | Item com episódio pela metade. |

### RN-HOME-CA-006 — Abrir no streaming

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Se o sistema tem link do Crunchyroll para aquele item, o clique abre em nova aba. |
| **Pré-condições** | Item com link de streaming associado. |
| **Resultado na tela** | Nova aba do navegador no serviço de streaming. |
| **Como testar** | Clicar card com link. |

### RN-HOME-CA-007 — Sem link vai à minha lista

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Sem link externo, o clique leva à área de animes da minha lista. |
| **Pré-condições** | Item sem URL de streaming. |
| **Resultado na tela** | Navega para minha lista de animes na mesma aba. |
| **Como testar** | Clicar card sem link externo. |

### RN-HOME-CA-008 — “Ver todos”

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Link no canto da faixa leva à listagem completa de animes da minha lista. |
| **Pré-condições** | Faixa visível. |
| **Resultado na tela** | Abre minha lista de animes. |
| **Como testar** | Clicar “Ver todos”. |

### RN-HOME-CARD-001 — Abrir detalhe

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Toque/clique no card abre painel de detalhe do título (modal). |
| **Pré-condições** | Card visível. |
| **Resultado na tela** | Modal com sinopse, datas, links, etc. |
| **Como testar** | Clicar poster/título. |

### RN-HOME-CARD-002 — Menu ⋮

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Botão de três pontos abre menu de ações sem sair da home. |
| **Pré-condições** | Card visível. |
| **Resultado na tela** | Menu com favoritar, quero assistir, etc. |
| **Como testar** | Abrir menu. |

### RN-HOME-CARD-003 — Fechar menu ao clicar fora

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Clicar fora do menu fecha o menu. |
| **Pré-condições** | Menu aberto. |
| **Resultado na tela** | Menu some. |
| **Como testar** | Clicar área vazia. |

### RN-HOME-CARD-004 — Favoritar / quero assistir

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Ações gravam na conta do usuário quando logado. |
| **Pré-condições** | Logado. |
| **Resultado na tela** | Estado ativo reflete no menu; indicador no card se aplicável. |
| **Como testar** | Favoritar e recarregar página logado. |

### RN-HOME-CARD-005 — Visitante não grava

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Sem login, ações de lista pedem entrada na conta (mensagem). |
| **Pré-condições** | Não logado. |
| **Resultado na tela** | Aviso; nada salvo. |
| **Como testar** | Favoritar deslogado. |

### RN-HOME-CARD-006 — Acompanhando (série/anime)

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Opção extra para série e anime. |
| **Pré-condições** | Card série ou anime. |
| **Resultado na tela** | Item “Acompanhando” no menu. |
| **Como testar** | Abrir menu em série. |

### RN-HOME-CARD-007 — Já assisti / já joguei

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Só disponível se o título **já foi lançado** (data de lançamento no passado). |
| **Pré-condições** | Filme/jogo futuro. |
| **Resultado na tela** | Opção desabilitada ou sem efeito. |
| **Como testar** | Tentar em estreia futura. |

### RN-HOME-CARD-008 — Avaliar ao marcar visto

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Ao marcar já assisti/joguei em título lançado, abre fluxo de **nota** antes de concluir. |
| **Pré-condições** | Lançado, logado. |
| **Resultado na tela** | Modal de avaliação. |
| **Como testar** | Marcar já assisti em filme antigo. |

### RN-HOME-CARD-009 — Etiqueta de status — filme

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Ordem de prioridade visual: **Pré-venda** → **Em cartaz** → **No streaming** (após lançamento) → **Em breve**. |
| **Pré-condições** | Filmes com flags diferentes. |
| **Resultado na tela** | Uma etiqueta principal por card. |
| **Como testar** | Comparar filme em cartaz vs streaming. |

### RN-HOME-CARD-010 — Etiqueta — série/anime

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | **Novo ep** (24h) → **Em exibição** → **Em breve** → **No streaming**. |
| **Pré-condições** | Episódio exibido há menos de 24h. |
| **Resultado na tela** | “NOVO EP” visível. |
| **Como testar** | Testar dia após estreia de ep. |

### RN-HOME-CARD-011 — Novo ep: regra de 24h

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | “Novo ep” usa data do último episódio (série) ou regra equivalente no anime. |
| **Pré-condições** | Ep entre 1h e 24h atrás. |
| **Resultado na tela** | Etiqueta presente; após 24h some. |
| **Como testar** | Esperar ou simular data. |

### RN-HOME-CARD-012 — Dublagem no anime

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Texto **Dublado** ou **Legendado** vem da informação oficial do título, não da lista de elenco no card. |
| **Pré-condições** | Anime com dublagem BR cadastrada. |
| **Resultado na tela** | “Dublado” no card. |
| **Como testar** | Comparar com título só legendado. |

### RN-HOME-CARD-013 — Contagem para próximo episódio

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Rodapé do card pode mostrar contagem regressiva para o próximo episódio. |
| **Pré-condições** | Série/anime com próximo ep futuro. |
| **Resultado na tela** | Texto com dias/horas; abaixo de 1 dia atualiza mais frequentemente. |
| **Como testar** | Card com ep amanhã vs hoje à noite. |

### RN-HOME-CARD-014 — Saga em filme

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Filme parte de saga pode mostrar atalho para página de continuações. |
| **Pré-condições** | Filme com saga. |
| **Resultado na tela** | Link de saga; clique **não** abre o modal (só o link). |
| **Como testar** | Clicar saga vs poster. |

### RN-HOME-CARD-015 — Conteúdo adulto no poster

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Poster de título adulto aparece desfocado até passar o mouse (desktop) ou interação equivalente. |
| **Pré-condições** | Título marcado adulto ainda permitido. |
| **Resultado na tela** | Blur no poster. |
| **Como testar** | Hover no card adulto. |

### RN-HOME-CARD-016 — Indicador na minha lista

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Logado com favorito/quero/acompanhando, o card pode mostrar marca visual de lista. |
| **Pré-condições** | Logado com item na lista. |
| **Resultado na tela** | Borda ou pill de destaque. |
| **Como testar** | Favoritar e olhar o card. |

### RN-HOME-CARD-017 — Ocultar título

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | “Não me interessa” remove o título das recomendações pessoais conforme política da conta. |
| **Pré-condições** | Logado. |
| **Resultado na tela** | Título some das listas personalizadas subsequentes. |
| **Como testar** | Ocultar e buscar de novo. |

### RN-HOME-CON-001 — Foco em lançamentos recentes e próximos

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Os três carrosséis priorizam títulos com data de lançamento (ou equivalente) nos **últimos 90 dias** e até o **fim do mês seguinte** ao mês atual — não uma lista infinita de clássicos antigos. |
| **Pré-condições** | Data de teste conhecida; título com estreia há mais de 90 dias só por reestreia antiga. |
| **Resultado na tela** | Título muito antigo fora dessa janela **não** aparece no carrossel temporal (pode existir em outras páginas do site). |
| **Como testar** | Comparar título reestreia antiga na home vs página Filmes. |

### RN-HOME-CON-002 — Filmes: sem shows e concertos na faixa

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Gravações de show, stand-up e concertos ao vivo não devem aparecer nos carrosséis de lançamento da home. |
| **Pré-condições** | Catálogo com filme de concerto cadastrado. |
| **Resultado na tela** | Ausente na faixa Filmes da home. |
| **Como testar** | Buscar concerto na página Filmes; verificar ausência na home. |

### RN-HOME-CON-003 — Filmes: curta duração futura

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Filmes de estreia futura com duração conhecida muito curta (abaixo do padrão de “filme de cinema”) não entram na seleção inicial da home. |
| **Pré-condições** | Filme futuro com duração de curta-metragem conhecida. |
| **Resultado na tela** | Não aparece no carrossel inicial de filmes. |
| **Como testar** | Validar com título de teste curto. |

### RN-HOME-CON-004 — Filmes: destaques no card

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Alguns filmes exibem etiqueta extra (ex.: “mais esperado”) conforme regras editoriais do produto. |
| **Pré-condições** | Filme elegível a destaque na semana/mês. |
| **Resultado na tela** | Pill ou etiqueta no card além do status normal. |
| **Como testar** | Comparar cards em destaque na mídia. |

### RN-HOME-CON-005 — Séries: data do próximo episódio

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Série em exibição com episódio futuro aparece posicionada na **data do próximo episódio**, não só na estreia original da série. |
| **Pré-condições** | Série com próximo episódio marcado para data futura. |
| **Resultado na tela** | Card na faixa Séries alinhado ao mês/dia do próximo ep ao rolar a timeline. |
| **Como testar** | Série semanal com ep na sexta; conferir posição na sexta. |

### RN-HOME-CON-006 — Séries: episódio recente

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Se não há episódio futuro, mas houve episódio nos últimos 90 dias, a série continua na timeline nessa data recente. |
| **Pré-condições** | Episódio exibido há poucos dias. |
| **Resultado na tela** | Card ainda visível ao navegar no passado recente do carrossel. |
| **Como testar** | Série que estreou ep ontem. |

### RN-HOME-CON-007 — Jogos: plataformas no card

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Cards de jogos mostram ícones de até quatro plataformas quando disponíveis. |
| **Pré-condições** | Jogo com várias plataformas. |
| **Resultado na tela** | Até quatro ícones visíveis no card. |
| **Como testar** | Inspecionar card de jogo multiplataforma. |

### RN-HOME-CON-008 — Jogos pouco relevantes

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Jogos sem nenhum sinal de interesse (nota, seguidores, expectativa) tendem a não aparecer na seleção da home. |
| **Pré-condições** | Jogo obscuro no catálogo. |
| **Resultado na tela** | Ausente na faixa Jogos da home. |
| **Como testar** | Comparar com página Jogos. |

### RN-HOME-CON-009 — Conteúdo adulto explícito em animes

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Animes classificados como conteúdo adulto explícito (ex.: hentai) não aparecem na faixa Animes da home. |
| **Pré-condições** | Título adulto no catálogo geral. |
| **Resultado na tela** | Ausente na home; pode ou não aparecer em outras áreas conforme política do site. |
| **Como testar** | Buscar título adulto; verificar home. |

### RN-HOME-CON-010 — Animes da temporada e agenda

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Na faixa Animes entram títulos da temporada corrente, estreias no mês atual/próximo ou com episódio previsto nas **próximas três semanas**. |
| **Pré-condições** | Anime fora de temporada e sem episódio próximo. |
| **Resultado na tela** | Pode não aparecer no carregamento inicial. |
| **Como testar** | Anime antigo fora de exibição. |

### RN-HOME-EA-001 — Ativar Em alta

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Botão/controle “Em alta” na faixa troca a lista para destaques de popularidade/expectativa. |
| **Pré-condições** | Faixa Filmes, Séries ou Jogos. |
| **Resultado na tela** | Timeline por mês some; cards em ordem de “em alta”; sem separadores de ano TBD. |
| **Como testar** | Clicar Em alta na faixa Filmes. |

### RN-HOME-EA-002 — Filmes em alta ≠ populares da página Filmes

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | A lista “Em alta” na home de **filmes** usa critério de **mais esperados** (antecipação de estreia), não o mesmo botão “Populares” da página Filmes. |
| **Pré-condições** | Modo Em alta em Filmes na home. |
| **Resultado na tela** | Ordem/conjunto pode diferir da página Filmes → Populares. |
| **Como testar** | Comparar os mesmos dias home Em alta vs página Filmes Populares. |

### RN-HOME-EA-003 — Séries e jogos em alta

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Em Séries e Jogos, Em alta mostra títulos em destaque por popularidade/relevância do catálogo. |
| **Pré-condições** | Modo Em alta ativo. |
| **Resultado na tela** | Lista fixa (~dezena de títulos) sem navegação por mês. |
| **Como testar** | Ativar Em alta em Séries. |

### RN-HOME-EA-004 — Início da lista

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Ao ativar Em alta, o carrossel vai para o **primeiro** card da lista em alta. |
| **Pré-condições** | Toggle ligado. |
| **Resultado na tela** | Primeiro slide visível. |
| **Como testar** | Ativar e ver posição. |

### RN-HOME-EA-005 — Desativar volta à timeline

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Ao desligar Em alta, o carrossel retorna ao modo data e reposiciona no contexto de “hoje”. |
| **Pré-condições** | Estava em Em alta. |
| **Resultado na tela** | Modo mês retorna; foco próximo lançamento. |
| **Como testar** | Ligar e desligar Em alta. |

### RN-HOME-EA-006 — Gênero em Em alta

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Filtro de gênero continua disponível e lista só títulos em alta daquele gênero. |
| **Pré-condições** | Em alta com vários gêneros. |
| **Resultado na tela** | Dropdown coerente com cards visíveis. |
| **Como testar** | Filtrar gênero em Em alta. |

### RN-HOME-HERO-001 — Botão “Começar agora”

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | O botão principal leva o usuário à faixa de filmes na mesma página. |
| **Pré-condições** | Página inicial no topo. |
| **Resultado na tela** | Ao clicar, a página rola suavemente até a seção Filmes; o endereço do navegador **não** precisa mudar de página. |
| **Como testar** | Clicar “Começar agora” e verificar scroll até Filmes. |

### RN-HOME-HERO-002 — Link “Ver jogos em alta”

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | O segundo botão abre a área de promoções com foco em jogos em destaque. |
| **Pré-condições** | Página inicial no topo. |
| **Resultado na tela** | Abre a página de promoções já na aba/visualização de jogos em alta. |
| **Como testar** | Clicar no link e conferir aba/conteúdo de em alta. |

### RN-HOME-SHELL-001 — Menu superior e busca

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Cabeçalho do site (busca, conta, tema) está presente na home e funciona igual às outras páginas. |
| **Pré-condições** | Qualquer estado de login. |
| **Resultado na tela** | Busca abre overlay; login leva à entrada. |
| **Como testar** | Usar busca e menu no topo. |

### RN-HOME-SHELL-002 — Sem popup de “consentimento +18”

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Conteúdo adulto é tratado com blur e exclusão de alguns títulos; **não** há janela modal pedindo aceite de conteúdo adulto só na home. |
| **Pré-condições** | Título adulto permitido. |
| **Resultado na tela** | Apenas blur/exclusão, sem popup dedicado. |
| **Como testar** | Navegar home com título adulto. |

### RN-HOME-TBD-001 — Separador de ano sem dia

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Após os títulos com dia definido, o carrossel pode mostrar bloco “Lançamentos de [ano] — sem data confirmada”. |
| **Pré-condições** | Existem títulos com ano mas sem dia/mês confirmado. |
| **Resultado na tela** | Cartão separador + cards desses títulos **depois** da parte datada. |
| **Como testar** | Rolar até o fim da timeline datada em Filmes. |

### RN-HOME-TBD-002 — Título ao focar TBD

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Ao parar em um separador ou card “só ano”, o título superior usa a frase de ano sem data confirmada. |
| **Pré-condições** | Usuário focou slide TBD. |
| **Resultado na tela** | Texto “sem data confirmada” no cabeçalho do carrossel. |
| **Como testar** | Focar separador de ano. |

### RN-HOME-TBD-003 — Anos futuros na fila

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | São reservados espaços para anos do ano corrente até alguns anos à frente (blocos podem ir enchendo ao rolar). |
| **Pré-condições** | Carrossel em modo timeline (não “Em alta”). |
| **Resultado na tela** | Ao avançar meses/anos, aparecem novos blocos TBD conforme o ano. |
| **Como testar** | Rolar até virada de ano no carrossel. |

### RN-HOME-TL-001 — Título do mês no carrossel

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Acima dos cards de Filmes/Séries/Jogos aparece um título do tipo “Lançamentos de [mês] de [ano]” conforme o card central/focado. |
| **Pré-condições** | Carrossel carregado com pelo menos um título datado. |
| **Resultado na tela** | Texto em português com mês por extenso. |
| **Como testar** | Abrir faixa Filmes e ler o título superior. |

### RN-HOME-TL-002 — Abrir no próximo lançamento

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Ao carregar, o carrossel posiciona o foco no **primeiro título com data hoje ou futura** dentro da janela de 90 dias. |
| **Pré-condições** | Existe estreia futura na faixa. |
| **Resultado na tela** | Card central (ou focado) é o próximo lançamento, não o primeiro da lista histórica. |
| **Como testar** | Abrir home em dia com estreias futuras; ver qual card está ao centro. |

### RN-HOME-TL-003 — Sem futuro: último lançado

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Se não há mais nenhuma data futura na lista carregada, o foco vai para o **último título já lançado** (ainda dentro dos 90 dias). |
| **Pré-condições** | Só passado recente na faixa. |
| **Resultado na tela** | Foco no lançamento mais recente já ocorrido. |
| **Como testar** | Testar em dia sem estreias futuras carregadas. |

### RN-HOME-TL-004 — Série/anime: data do episódio

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Para séries (e posicionamento equivalente quando o card traz “próximo episódio”), a data usada na timeline é a do **próximo episódio**, se for hoje ou futuro. |
| **Pré-condições** | Card com “próximo episódio” visível. |
| **Resultado na tela** | Posição no carrossel coerente com a data do episódio, não só estreia da série. |
| **Como testar** | Série com nova temporada distante mas ep semanal próximo. |

### RN-HOME-TL-005 — Placeholders no início

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Antes de calcular a posição, o usuário pode ver cartões cinza/esqueleto centralizados. |
| **Pré-condições** | Primeiro acesso ou rede lenta. |
| **Resultado na tela** | Até ~10 placeholders; depois substituídos por cards reais na posição correta. |
| **Como testar** | Recarregar com rede lenta na faixa Filmes. |

### RN-HOME-TL-006 — Rolagem horizontal

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | O usuário desliza ou usa setas para ver títulos anteriores e posteriores no tempo. |
| **Pré-condições** | Faixa com vários cards. |
| **Resultado na tela** | Movimento horizontal; card central em destaque (anel/foco). |
| **Como testar** | Arrastar carrossel e usar setas laterais. |

### RN-HOME-TL-007 — Ctrl + roda do mouse

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Com tecla Ctrl pressionada, a roda do mouse no carrossel avança/volta slides (em desktop). |
| **Pré-condições** | Desktop, foco na faixa. |
| **Resultado na tela** | Carrossel muda de slide com Ctrl+scroll. |
| **Como testar** | Testar em navegador desktop. |

### RN-HOME-TL-008 — Carregar meses ao navegar

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Ao chegar perto do fim ou início de um mês no carrossel, o sistema busca títulos do mês seguinte ou anterior. |
| **Pré-condições** | Usuário rola vários meses para frente ou para trás. |
| **Resultado na tela** | Novos cards aparecem; título do mês no topo atualiza. |
| **Como testar** | Rolar rapidamente 3–4 meses à frente. |

### RN-HOME-TL-009 — Não “pular” ao puxar o passado

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Ao incluir meses mais antigos no início da lista, a posição visual do card que o usuário estava vendo se mantém. |
| **Pré-condições** | Usuário no meio do carrossel; sistema carrega mês anterior. |
| **Resultado na tela** | O mesmo título permanece em foco (sem salto brusco). |
| **Como testar** | Rolar para trás até disparar carga de mês anterior. |

### RN-HOME-TL-010 — Setas de mudança de mês

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Controles permitem saltar para o próximo/anterior **mês** com títulos (até um limite de meses vazios seguidos). |
| **Pré-condições** | Carrossel com navegação por mês habilitada. |
| **Resultado na tela** | Avanço/retrocesso por mês; após vários meses sem título, para de avançar em vazio. |
| **Como testar** | Clicar setas de mês repetidamente. |

### RN-HOME-TL-011 — Filtro por gênero

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Menu de filtro na faixa restringe os cards ao gênero escolhido. |
| **Pré-condições** | Vários gêneros na faixa. |
| **Resultado na tela** | Só cards daquele gênero; lista de gêneros reflete o que existe nos cards carregados. |
| **Como testar** | Abrir filtro, escolher um gênero. |

### RN-HOME-TL-012 — Troca de gênero reposiciona

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Ao mudar o gênero, o carrossel recalcula e volta a focar no “próximo lançamento” **dentro do filtro**. |
| **Pré-condições** | Filtro alterado com resultados. |
| **Resultado na tela** | Posição inicial coerente com o subconjunto filtrado. |
| **Como testar** | Filtrar gênero raro e observar card central. |

### RN-HOME-TL-013 — Scroll rápido (ícone raio)

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Opção global de “scroll rápido” acelera a animação do carrossel e antecipa carregamento ao se aproximar da borda do mês. |
| **Pré-condições** | Usuário ativa ícone de raio/Zap no controle da faixa (se visível). |
| **Resultado na tela** | Transições mais rápidas; mais cards pré-carregados ao rolar forte. |
| **Como testar** | Ligar/desligar e comparar velocidade. |

### RN-HOME-UPD-001 — Atualizar após sincronização do catálogo

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Quando o site recebe atualização em massa de títulos (em segundo plano), as faixas da home podem **atualizar sozinhas** sem o usuário recarregar a página. |
| **Pré-condições** | Ambiente onde sync/disparo de atualização ocorre. |
| **Resultado na tela** | Cards novos ou datas alteradas após evento. |
| **Como testar** | Após sync, manter home aberta e observar. |

### RN-HOME-UPD-002 — Falha na atualização silenciosa

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Se a atualização automática falhar, a home mantém o que já estava na tela. |
| **Pré-condições** | Falha de rede na atualização. |
| **Resultado na tela** | Sem mensagem obrigatória; conteúdo antigo permanece. |
| **Como testar** | Cortar rede após sync. |

## 02 FILMES

**Onde o usuário está:** página Filmes do site (listagem completa de filmes, acessível pelo menu ou pelo título da faixa Filmes na página inicial).

### RN-FILMES-001 — Conteúdo na primeira abertura

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | A listagem e as opções de filtro já vêm preparadas quando a página abre, sem precisar clicar em nada. |
| **Pré-condições** | Site acessível; catálogo com filmes. |
| **Resultado na tela** | Ao entrar em Filmes, cards e menus de filtro aparecem (ou estado vazio amigável se não houver dados). |
| **Como testar** | Abrir a página Filmes em aba nova; observar grade e selects antes de interagir. |

### RN-FILMES-002 — Atualização gradual do catálogo

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Mudanças no catálogo podem levar alguns minutos para aparecer na página após uma atualização em massa, mesmo sem o usuário fazer nada. |
| **Pré-condições** | Catálogo alterado recentemente no ambiente de teste. |
| **Resultado na tela** | Após aguardar alguns minutos e recarregar Filmes, novos títulos ou datas podem surgir. |
| **Como testar** | Registrar um filme de teste; aguardar ~5 min; recarregar Filmes. |

### RN-FILMES-003 — Falha no carregamento inicial

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Se a listagem não puder ser montada no primeiro momento, a página continua utilizável. |
| **Pré-condições** | Simular indisponibilidade temporária do catálogo na abertura. |
| **Resultado na tela** | Página abre sem erro do navegador; grade vazia; filtros sem opções ou vazios; mensagem de “nenhum filme” se aplicável. |
| **Como testar** | Ambiente com catálogo indisponível no primeiro acesso. |

### RN-FILMES-004 — Texto do cabeçalho

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Título e subtítulo da área são fixos. |
| **Pré-condições** | Usuário na página Filmes. |
| **Resultado na tela** | Título **Filmes** e texto sobre cartaz, lançamentos e clássicos no topo. |
| **Como testar** | Ler o cabeçalho da página. |

### RN-FILMES-005 — Gaveta O que vem aí

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Bloco horizontal de estreias futuras de filme, acima dos filtros. |
| **Pré-condições** | Resumo de eventos do site inclui filmes em **próximos lançamentos**. |
| **Resultado na tela** | Seção colapsável **O que vem aí** com carrossel horizontal de cards de filme. |
| **Como testar** | Ambiente com lançamentos futuros; abrir Filmes. |

### RN-FILMES-006 — Ações nos cards da gaveta

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Favoritar e demais ações do menu ⋮ funcionam igual à grade principal. |
| **Pré-condições** | Gaveta visível; usuário logado ou visitante conforme regra do card. |
| **Resultado na tela** | Menu e estados de lista refletem na conta quando logado. |
| **Como testar** | Favoritar um filme na gaveta; recarregar logado. |

### RN-FILMES-007 — Gaveta Em cartaz

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Destaques de filmes **em cartaz** em bloco próprio. |
| **Pré-condições** | Resumo de eventos traz filmes em **destaques recentes / em cartaz**. |
| **Resultado na tela** | Seção **Em cartaz** com ícone de claquete e carrossel horizontal. |
| **Como testar** | Ambiente com destaques em cartaz; abrir Filmes. |

### RN-FILMES-008 — Gavetas carregam após a página

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | As gavetas podem aparecer um instante depois do restante da página. |
| **Pré-condições** | Página Filmes recém-aberta. |
| **Resultado na tela** | Primeiro aparecem filtros e grade; em seguida as gavetas (se houver conteúdo). |
| **Como testar** | Abrir Filmes e observar ordem de aparecimento dos blocos. |

### RN-FILMES-009 — Atalho Todos os Filmes

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Restaura a listagem geral sem curadoria de atalho. |
| **Pré-condições** | Qualquer outro atalho ativo. |
| **Resultado na tela** | Botão **Todos os Filmes** destacado; grade ampla (ordenada por título). |
| **Como testar** | Clicar **Todos os Filmes**. |

### RN-FILMES-010 — Atalho Em Cartaz

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Mostra só filmes marcados como em cartaz. |
| **Pré-condições** | Catálogo com filmes em cartaz e outros. |
| **Resultado na tela** | Grade restrita a títulos em cartaz; contador atualizado. |
| **Como testar** | Clicar **Em Cartaz**; conferir etiquetas nos cards. |

### RN-FILMES-011 — Atalho Em Breve

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Mostra só estreias futuras curadas como “em breve”. |
| **Pré-condições** | Filmes em breve e já lançados no catálogo. |
| **Resultado na tela** | Só filmes em breve na grade. |
| **Como testar** | Clicar **Em Breve**. |

### RN-FILMES-012 — Atalho Populares

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Reordena por popularidade (não alfabético). |
| **Pré-condições** | Vários filmes com popularidade distinta. |
| **Resultado na tela** | Ordem diferente de **Todos**; títulos mais populares no topo. |
| **Como testar** | Alternar **Todos** e **Populares** e comparar ordem. |

### RN-FILMES-013 — Destaque visual do atalho

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Só um atalho aparece como selecionado. |
| **Pré-condições** | Dois ou mais atalhos disponíveis. |
| **Resultado na tela** | Botão ativo com cor primária; demais em fundo neutro. |
| **Como testar** | Clicar cada atalho e observar estilo. |

### RN-FILMES-014 — Gênero “Todos”

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Não restringe por gênero. |
| **Pré-condições** | Select em **Todos os Gêneros**. |
| **Resultado na tela** | Grade ampla dentro do atalho ativo. |
| **Como testar** | Escolher todos os gêneros após filtrar um gênero específico. |

### RN-FILMES-015 — Nome do gênero no menu

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Primeira letra do gênero aparece maiúscula no dropdown. |
| **Pré-condições** | Lista de gêneros populada. |
| **Resultado na tela** | Ex.: “action” exibido como “Action”. |
| **Como testar** | Abrir select de gênero. |

### RN-FILMES-016 — Ano “Todos”

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Não restringe por ano de estreia. |
| **Pré-condições** | **Todos os Anos** selecionado. |
| **Resultado na tela** | Filmes de vários anos na grade. |
| **Como testar** | Resetar ano para todos. |

### RN-FILMES-017 — Anos no dropdown

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Anos disponíveis refletem filmes existentes no catálogo, do mais recente para o mais antigo. |
| **Pré-condições** | Catálogo com vários anos. |
| **Resultado na tela** | Select de ano sem duplicatas; ordem decrescente. |
| **Como testar** | Comparar anos do menu com filmes conhecidos. |

### RN-FILMES-018 — Meses em português

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Janeiro a dezembro com rótulos em PT-BR. |
| **Pré-condições** | Select de mês aberto. |
| **Resultado na tela** | Doze meses nomeados corretamente. |
| **Como testar** | Abrir filtro de mês. |

### RN-FILMES-019 — Mês “Todos”

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Não restringe por mês. |
| **Pré-condições** | **Todos os Meses**. |
| **Resultado na tela** | Qualquer mês dentro dos demais filtros. |
| **Como testar** | Selecionar todos os meses. |

### RN-FILMES-020 — Status traduzido

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Opções de status exibem rótulo em português quando o produto conhece o status. |
| **Pré-condições** | Select de status populado. |
| **Resultado na tela** | Labels legíveis (ex.: lançado, em produção). |
| **Como testar** | Abrir filtro de status. |

### RN-FILMES-021 — Filtro por plataforma

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Restringe a filmes disponíveis na plataforma escolhida (streaming). |
| **Pré-condições** | Netflix (ou outra) selecionada. |
| **Resultado na tela** | Só cards com aquela plataforma nos metadados visíveis. |
| **Como testar** | Filtrar Netflix; abrir detalhe de um card. |

### RN-FILMES-022 — Plataformas ordenadas

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Nomes de plataforma no select em ordem alfabética. |
| **Pré-condições** | Várias plataformas no catálogo. |
| **Resultado na tela** | Lista A–Z no dropdown. |
| **Como testar** | Abrir **Todas as Plataformas**. |

### RN-FILMES-023 — Filtros sempre clicáveis

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Menus de filtro permanecem habilitados durante uso normal. |
| **Pré-condições** | Página Filmes estável. |
| **Resultado na tela** | Selects não ficam permanentemente desabilitados. |
| **Como testar** | Usar todos os filtros em sequência. |

### RN-FILMES-024 — Primeira visita sem “piscar” desnecessário

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Ao abrir Filmes, a grade inicial não dispara um segundo carregamento imediato só por abrir a página. |
| **Pré-condições** | Primeira visita com catálogo OK. |
| **Resultado na tela** | Conteúdo estável logo após abrir; novo carregamento só ao mudar filtro/atalho. |
| **Como testar** | Abrir Filmes e aguardar sem tocar filtros; observar spinner. |

### RN-FILMES-025 — Mudança de filtro recarrega

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Qualquer alteração em atalho ou select atualiza a grade. |
| **Pré-condições** | Filtro ou atalho alterado. |
| **Resultado na tela** | Spinner breve; nova lista e contador. |
| **Como testar** | Trocar gênero ou ano. |

### RN-FILMES-026 — Atualização após sync do site

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Quando o site termina uma sincronização de catálogo em segundo plano, a listagem pode atualizar sozinha. |
| **Pré-condições** | Sync disparada com Filmes aberta. |
| **Resultado na tela** | Cards ou contagem mudam sem F5 manual. |
| **Como testar** | Manter Filmes aberta durante sync no ambiente de teste. |

### RN-FILMES-027 — Spinner ao filtrar

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Durante nova busca, a grade some e aparece indicador central. |
| **Pré-condições** | Filtro alterado com rede normal. |
| **Resultado na tela** | Spinner no lugar do grid até concluir. |
| **Como testar** | Trocar filtro e observar loading. |

### RN-FILMES-028 — Contador com total global

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | O texto “X filmes encontrados” usa o **total** que corresponde aos filtros, não só os cards visíveis na primeira “página” interna. |
| **Pré-condições** | Mais de ~48 filmes para o filtro atual. |
| **Resultado na tela** | Contador alto (ex.: 200) com grade mostrando um subconjunto inicial. |
| **Como testar** | Filtro amplo; ler contador vs cards na tela. |

### RN-FILMES-029 — Contador em carregamento

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Enquanto recarrega, não mostra número antigo enganoso. |
| **Pré-condições** | Filtro recém-alterado. |
| **Resultado na tela** | Texto **Carregando...**. |
| **Como testar** | Trocar filtro e ler linha acima da grade. |

### RN-FILMES-030 — Grade responsiva

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Cards em colunas que aumentam em telas maiores. |
| **Pré-condições** | Resultados > 0; não loading. |
| **Resultado na tela** | 2 a 5 colunas; cards com largura máxima ~210px. |
| **Como testar** | Redimensionar janela do navegador. |

### RN-FILMES-031 — Nenhum resultado

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Combinação de filtros sem match. |
| **Pré-condições** | Filtros restritivos. |
| **Resultado na tela** | Ícone de filtro, título **Nenhum filme encontrado**, sugestão de ajustar filtros. |
| **Como testar** | Aplicar filtro impossível. |

### RN-FILMES-032 — Falha ao recarregar no cliente

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Erro ao buscar de novo pode esvaziar a grade ou manter último estado, sem quebrar a página. |
| **Pré-condições** | Rede cortada ao mudar filtro. |
| **Resultado na tela** | Página continua; grade pode zerar; sem crash. |
| **Como testar** | Desligar rede ao trocar filtro. |

### RN-FILMES-033 — Limite inicial de cards na tela

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | A grade mostra um lote inicial de filmes (dezenas), não o catálogo inteiro de uma vez. |
| **Pré-condições** | Filtro amplo com centenas de títulos. |
| **Resultado na tela** | Até ~48 cards visíveis na grade por vez (sem botão “carregar mais” nesta página). |
| **Como testar** | Contar cards com filtro **Todos**. |

### RN-FILMES-034 — Cards com informação de streaming

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Quando o filme tem plataformas cadastradas, o card pode exibir ícones/nomes de streaming. |
| **Pré-condições** | Filme com Netflix/Disney+ etc. |
| **Resultado na tela** | Ícones ou pills de plataforma no card. |
| **Como testar** | Inspecionar card de filme em streaming. |

### RN-FILMES-035 — Saga e coleção no card

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Filmes parte de saga podem mostrar indício de continuação no card. |
| **Pré-condições** | Filme com saga cadastrada. |
| **Resultado na tela** | Atalho de saga visível no card (detalhe em modais). |
| **Como testar** | Card de filme conhecido em saga. |

### RN-FILMES-036 — Curadoria de exibição padrão

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | A listagem pública prioriza filmes “apresentáveis”: com pôster, sinopse e relevância mínima, salvo exceções de cartaz/em breve. |
| **Pré-condições** | Filme incompleto no catálogo vs filme em cartaz. |
| **Resultado na tela** | Título sem pôster tende a **não** aparecer; em cartaz pode aparecer mesmo com pouca popularidade. |
| **Como testar** | Comparar filme rascunho vs filme em cartaz. |

### RN-FILMES-037 — Sem pôster

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Filmes sem imagem de pôster não entram na grade padrão. |
| **Pré-condições** | Filme de teste sem pôster. |
| **Resultado na tela** | Ausente em Filmes com filtros abertos. |
| **Como testar** | Buscar título sem pôster na busca global. |

### RN-FILMES-038 — Sem sinopse

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Filmes sem texto de sinopse tendem a ficar de fora, exceto flags de cartaz/em breve. |
| **Pré-condições** | Filme sem overview. |
| **Resultado na tela** | Ausente na listagem geral. |
| **Como testar** | Validar com dado de teste. |

### RN-FILMES-039 — Conteúdo adulto explícito

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Filmes marcados como adultos não aparecem na listagem pública. |
| **Pré-condições** | Filme adulto no catálogo. |
| **Resultado na tela** | Ausente em Filmes. |
| **Como testar** | Buscar título adulto. |

### RN-FILMES-040 — Exceção em cartaz ou em breve

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Filmes em cartaz ou em breve podem aparecer mesmo com popularidade baixa. |
| **Pré-condições** | Filme em cartaz com poucos votos. |
| **Resultado na tela** | Presente ao usar atalho **Em Cartaz** ou **Em Breve**. |
| **Como testar** | Testar título em cartaz marginal. |

### RN-FILMES-041 — Nota mínima com muitos votos

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Filmes com muitas avaliações e nota muito baixa tendem a ser ocultados. |
| **Pré-condições** | Filme nota ~5,5 com centenas de votos. |
| **Resultado na tela** | Ausente na listagem geral. |
| **Como testar** | Comparar com filme bem avaliado. |

### RN-FILMES-042 — Ano corrente ou futuro mais permissivo

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Filtrar pelo **ano atual** (ou futuro) pode incluir estreias ainda sem muita popularidade. |
| **Pré-condições** | Ano = ano corrente no select. |
| **Resultado na tela** | Estreia futura do ano aparece na grade. |
| **Como testar** | Filtrar ano corrente; procurar estreia futura. |

### RN-FILMES-043 — Filtro por ano civil

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Ano escolhido limita a estreias daquele ano calendário. |
| **Pré-condições** | Ano 2020 selecionado. |
| **Resultado na tela** | Só filmes com data de estreia em 2020. |
| **Como testar** | Filtrar 2020 e abrir detalhes de cards. |

### RN-FILMES-044 — Filtro por mês

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Mês escolhido limita estreias daquele mês (com ano definido ou ano corrente). |
| **Pré-condições** | Março + ano 2025. |
| **Resultado na tela** | Só estreias de março/2025. |
| **Como testar** | Combinar mês e ano. |

### RN-FILMES-045 — Mês sem ano usa ano atual

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Só mês selecionado assume o ano de “hoje”. |
| **Pré-condições** | Mês = mês atual; ano = todos. |
| **Resultado na tela** | Estreias daquele mês no ano corrente. |
| **Como testar** | Em setembro, filtrar setembro com todos os anos. |

### RN-FILMES-046 — Filtro por gênero

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Gênero escolhido exige correspondência exata no cadastro do filme. |
| **Pré-condições** | Gênero Action. |
| **Resultado na tela** | Só filmes daquele gênero. |
| **Como testar** | Filtrar um gênero raro e validar cards. |

### RN-FILMES-047 — Filtro por status

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Status escolhido restringe ao estado cadastral (ex.: lançado, cancelado). |
| **Pré-condições** | Status específico. |
| **Resultado na tela** | Grade coerente com status nos detalhes. |
| **Como testar** | Filtrar status e conferir detalhe. |

### RN-FILMES-048 — Só já lançados (catálogo)

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Regra interna de “lançados”: data de estreia no passado. |
| **Pré-condições** | Filme futuro vs passado. |
| **Resultado na tela** | Filme futuro não entra em conjuntos que exigem “já lançado” (ex.: comparar com atalho **Em Breve**). |
| **Como testar** | Estreia futura só em **Em Breve**, não como lançado antigo. |

### RN-FILMES-049 — Só futuros (catálogo)

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Regra interna de “futuros”: estreia hoje ou depois. |
| **Pré-condições** | Filme passado e futuro. |
| **Resultado na tela** | **Em Breve** alinhado a futuros curados. |
| **Como testar** | Comparar atalhos **Todos** vs **Em Breve**. |

### RN-FILMES-050 — Disponibilidade cinema (catálogo)

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Subconjunto usado em outras áreas para “no cinema”. |
| **Pré-condições** | Filme só streaming vs em cartaz. |
| **Resultado na tela** | **Em Cartaz** e gaveta **Em cartaz** concentram títulos de cinema. |
| **Como testar** | Validar filme em cartaz nos atalhos/gaveta. |

### RN-FILMES-051 — Disponibilidade streaming (catálogo)

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Subconjunto de títulos com streaming cadastrado. |
| **Pré-condições** | Filme com plataforma. |
| **Resultado na tela** | Aparece ao filtrar plataforma; etiqueta **No streaming** no card quando aplicável. |
| **Como testar** | Filtrar plataforma + ler etiqueta do card. |

### RN-FILMES-052 — Ordem alfabética em “Todos”

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Sem atalho **Populares**, ordem por título. |
| **Pré-condições** | **Todos os Filmes** ativo. |
| **Resultado na tela** | Primeiros cards em ordem A–Z por título. |
| **Como testar** | Ler primeiros títulos da grade. |

### RN-FILMES-053 — Listagem mais ampla que a home

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | A página Filmes pode mostrar títulos que a faixa Filmes da inicial não mostra. |
| **Pré-condições** | Concerto/gravação ao vivo cadastrada. |
| **Resultado na tela** | Pode aparecer em Filmes e **não** no carrossel da home. |
| **Como testar** | Comparar mesmo título home vs Filmes. |

### RN-FILMES-054 — Opções de filtro só com filmes

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Gêneros/plataformas no menu existem porque há pelo menos um filme associado. |
| **Pré-condições** | Gênero órfão no cadastro interno. |
| **Resultado na tela** | Gênero sem filme **não** aparece no select. |
| **Como testar** | Abrir todos os gêneros e buscar um raro inexistente. |

### RN-FILMES-055 — Anos sem duplicata

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Cada ano aparece uma vez no filtro de ano. |
| **Pré-condições** | Vários filmes no mesmo ano. |
| **Resultado na tela** | Ano único no dropdown. |
| **Como testar** | Abrir filtro de ano. |

### RN-FILMES-056 — Janela temporal da home

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Carrossel da inicial foca lançamentos em janela de anos próximos; Filmes lista histórico amplo. |
| **Pré-condições** | Filme muito antigo fora da janela da home. |
| **Resultado na tela** | Presente em Filmes com filtros; pode faltar na home. |
| **Como testar** | Filme clássico: Filmes vs home. |

### RN-FILMES-057 — Concertos na listagem

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Shows, stand-up e concertos ao vivo podem aparecer aqui. |
| **Pré-condições** | Título tipo “Live from…”. |
| **Resultado na tela** | Card visível em Filmes; pode faltar no carrossel da home. |
| **Como testar** | Buscar concerto na página Filmes. |

### RN-FILMES-058 — Curta-metragem futuro na home

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Estreias futuras muito curtas podem ser excluídas do carrossel inicial. |
| **Pré-condições** | Curta com duração conhecida e estreia futura. |
| **Resultado na tela** | Pode aparecer em Filmes filtrando ano/mês; pode faltar na home. |
| **Como testar** | Comparar home vs Filmes. |

### RN-FILMES-059 — Duração mínima só na home

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Regra de “filme de estreia” longo para destaque na home não se aplica à listagem Filmes. |
| **Pré-condições** | Filme futuro curto. |
| **Resultado na tela** | Visível em Filmes se passar curadoria da listagem. |
| **Como testar** | Mesmo título home vs Filmes. |

### RN-FILMES-060 — Abrir detalhe pelo card

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Clique no card abre painel/modal de detalhe do filme. |
| **Pré-condições** | Card na grade ou gaveta. |
| **Resultado na tela** | Modal com sinopse, datas, links. |
| **Como testar** | Clicar poster/título. |

### RN-FILMES-061 — Destaques no detalhe

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Alguns filmes exibem etiquetas extras (ex.: mais esperado) no detalhe. |
| **Pré-condições** | Filme elegível a destaque editorial. |
| **Resultado na tela** | Pills no modal além do status normal. |
| **Como testar** | Abrir detalhe de estreia aguardada. |

### RN-FILMES-062 — Edição administrativa

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Alterações de cadastro feitas por equipe interna não são testadas nesta tela pública. |
| **Pré-condições** | Conta visitante ou usuário comum. |
| **Resultado na tela** | Comportamento da listagem reflete catálogo já publicado; sem UI de edição aqui. |
| **Como testar** | Confirmar ausência de controles de admin na página Filmes. |

### RN-FILMES-063 — Ranking “mais esperados”

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Lista de antecipação de estreias alimenta destaques em outras áreas (ex.: **Em alta** na home), não um bloco dedicado em Filmes. |
| **Pré-condições** | Estreias próximas no catálogo. |
| **Resultado na tela** | Filmes pode mostrar pills nos cards/detalhe; ranking completo não é seção fixa aqui. |
| **Como testar** | Comparar filme “mais esperado” na home vs Filmes. |

### RN-FILMES-064 — Timeline por ano (outras telas)

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Navegação mês a mês por carrossel existe na home, não como timeline na página Filmes. |
| **Pré-condições** | Usuário em Filmes. |
| **Resultado na tela** | Filmes usa grade + filtros ano/mês, não carrossel temporal contínuo. |
| **Como testar** | Confirmar ausência de carrossel mensal contínuo em Filmes. |

### RN-FILMES-065 — Timeline por mês (outras telas)

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Agrupamento fino por mês no carrossel da home; aqui filtro de mês na grade. |
| **Pré-condições** | Mês selecionado. |
| **Resultado na tela** | Grade estática filtrada, não slide por slide de timeline. |
| **Como testar** | Filtrar mês e rolar grade. |

### RN-FILMES-066 — Só ano confirmado (outras telas)

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Blocos “sem data confirmada” aparecem no carrossel da home; em Filmes use filtro de ano e status. |
| **Pré-condições** | Filme TBA só com ano. |
| **Resultado na tela** | Pode listar com data incompleta nos detalhes; sem separador TBD como na home. |
| **Como testar** | Filme “2027 — data a confirmar” em Filmes vs home. |

### RN-FILMES-067 — Contador alinhado ao total filtrado

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Número exibido corresponde ao conjunto filtrado no servidor, não a páginas visuais futuras. |
| **Pré-condições** | Filtro restritivo. |
| **Resultado na tela** | Contador = quantidade lógica do filtro. |
| **Como testar** | Anotar contador e amostrar busca por título. |

### RN-FILMES-068 — Coerência após recarregar

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Recarregar a página mantém filtros no estado inicial (não persistem na URL por padrão). |
| **Pré-condições** | Filtros alterados; F5. |
| **Resultado na tela** | Atalho **Todos** e selects voltam ao padrão; nova carga inicial. |
| **Como testar** | Alterar filtros e recarregar navegador. |

## 03 SERIES

**Onde o usuário está:** página Séries do site (listagem completa de séries, acessível pelo menu ou pelo título da faixa Séries na página inicial).

### RN-SERIES-001 — Conteúdo na primeira abertura

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Listagem e opções de filtro já vêm na abertura da página. |
| **Pré-condições** | Site acessível; catálogo com séries. |
| **Resultado na tela** | Grade e selects visíveis (ou vazio amigável). |
| **Como testar** | Abrir Séries em aba nova. |

### RN-SERIES-002 — Atualização gradual

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Mudanças no catálogo podem demorar alguns minutos para refletir após atualização em massa. |
| **Pré-condições** | Catálogo alterado recentemente. |
| **Resultado na tela** | Recarregar após alguns minutos pode mostrar novidades. |
| **Como testar** | Alterar série de teste; aguardar; recarregar. |

### RN-SERIES-003 — Falha no carregamento inicial

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Indisponibilidade temporária não quebra a rota. |
| **Pré-condições** | Catálogo indisponível na abertura. |
| **Resultado na tela** | Página abre; grade vazia; filtros vazios possíveis. |
| **Como testar** | Simular falha na abertura. |

### RN-SERIES-004 — Texto do cabeçalho

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Copy fixa da área. |
| **Pré-condições** | Usuário em Séries. |
| **Resultado na tela** | Título **Séries** e descrição sobre universo de séries. |
| **Como testar** | Ler cabeçalho. |

### RN-SERIES-005 — Gaveta O que vem aí

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Estreias futuras de séries em carrossel horizontal. |
| **Pré-condições** | Resumo de eventos com séries em **próximos**. |
| **Resultado na tela** | Seção **O que vem aí** acima dos filtros. |
| **Como testar** | Ambiente com séries futuras. |

### RN-SERIES-006 — Sem gaveta Em cartaz

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Diferente da página Filmes, **não** há bloco **Em cartaz** para séries. |
| **Pré-condições** | Destaques recentes de séries existem no resumo. |
| **Resultado na tela** | Bloco **Em cartaz** **ausente**; só **O que vem aí** + filtros + grade. |
| **Como testar** | Abrir Séries com dados de destaque. |

### RN-SERIES-007 — Ações na gaveta

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Menu ⋮ e favoritos iguais à grade. |
| **Pré-condições** | Gaveta visível. |
| **Resultado na tela** | Interações refletem na conta logada. |
| **Como testar** | Favoritar na gaveta. |

### RN-SERIES-008 — Gaveta após a página

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Carrossel editorial pode aparecer logo após o restante. |
| **Pré-condições** | Página recém-aberta. |
| **Resultado na tela** | Filtros/grade primeiro; gaveta em seguida se houver itens. |
| **Como testar** | Observar ordem de carregamento. |

### RN-SERIES-009 — Sem atalhos Em Cartaz/Populares

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Curadoria por botões não existe; só selects. |
| **Pré-condições** | Página Séries. |
| **Resultado na tela** | Apenas linha de filtros; nenhum botão **Populares**. |
| **Como testar** | Confirmar ausência de atalhos. |

### RN-SERIES-010 — Ordem alfabética padrão

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Listagem ordenada por nome da série. |
| **Pré-condições** | Todos os filtros em “todos”. |
| **Resultado na tela** | Cards em ordem A–Z pelo título/nome exibido. |
| **Como testar** | Ler primeiros cards. |

### RN-SERIES-011 — Ordenação por popularidade (catálogo)

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Modo “populares” existe no catálogo interno, mas **não** há botão na tela. |
| **Pré-condições** | — |
| **Resultado na tela** | Usuário comum só vê ordem alfabética nesta página. |
| **Como testar** | Confirmar que não há controle de popularidade na UI. |

### RN-SERIES-012 — Gênero “Todos”

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Sem restrição de gênero. |
| **Pré-condições** | **Todos os Gêneros**. |
| **Resultado na tela** | Grade ampla. |
| **Como testar** | Resetar gênero. |

### RN-SERIES-013 — Capitalização do gênero

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Primeira letra maiúscula no dropdown. |
| **Pré-condições** | Gêneros listados. |
| **Resultado na tela** | Label formatado (ex.: Action). |
| **Como testar** | Abrir select de gênero. |

### RN-SERIES-014 — Ano “Todos”

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Sem restrição de ano. |
| **Pré-condições** | **Todos os Anos**. |
| **Resultado na tela** | Séries de vários anos. |
| **Como testar** | Resetar ano. |

### RN-SERIES-015 — Filtro por ano de estreia

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Ano limita à **data de estreia** da série (primeiro episódio / estreia). |
| **Pré-condições** | Ano 2022. |
| **Resultado na tela** | Só séries estreadas em 2022. |
| **Como testar** | Filtrar ano e conferir detalhe. |

### RN-SERIES-016 — Filtro por mês de estreia

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Mês limita estreias daquele mês. |
| **Pré-condições** | Março selecionado. |
| **Resultado na tela** | Séries com estreia em março (com ano definido ou corrente). |
| **Como testar** | Combinar mês + ano. |

### RN-SERIES-017 — Mês sem ano

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Mês sozinho usa ano corrente. |
| **Pré-condições** | Setembro + todos os anos. |
| **Resultado na tela** | Estreias de setembro do ano atual. |
| **Como testar** | Filtrar mês atual. |

### RN-SERIES-018 — Meses em português

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Janeiro–dezembro no select. |
| **Pré-condições** | Select de mês. |
| **Resultado na tela** | Rótulos PT-BR corretos. |
| **Como testar** | Abrir filtro de mês. |

### RN-SERIES-019 — Filtro por plataforma

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Restringe a séries com streaming na plataforma. |
| **Pré-condições** | Netflix selecionada. |
| **Resultado na tela** | Só séries com Netflix nos metadados. |
| **Como testar** | Filtrar plataforma. |

### RN-SERIES-020 — Filtro por status

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Status cadastral (ex.: em exibição, encerrada). |
| **Pré-condições** | Status escolhido. |
| **Resultado na tela** | Grade coerente com status no detalhe. |
| **Como testar** | Filtrar status. |

### RN-SERIES-021 — Sem recarga duplicada na abertura

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Abrir Séries não dispara segundo loading imediato. |
| **Pré-condições** | Primeira visita OK. |
| **Resultado na tela** | Conteúdo estável até mudar filtro. |
| **Como testar** | Abrir página e aguardar. |

### RN-SERIES-022 — Mudança de filtro recarrega

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Alterar select atualiza grade. |
| **Pré-condições** | Qualquer filtro mudado. |
| **Resultado na tela** | Spinner + nova lista. |
| **Como testar** | Trocar gênero. |

### RN-SERIES-023 — Atualização após sync

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Sync do catálogo pode atualizar a grade com a página aberta. |
| **Pré-condições** | Sync em andamento. |
| **Resultado na tela** | Cards/contador mudam sem F5. |
| **Como testar** | Manter Séries aberta durante sync. |

### RN-SERIES-024 — Spinner ao filtrar

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Loading central substitui grade. |
| **Pré-condições** | Filtro alterado. |
| **Resultado na tela** | Spinner até concluir. |
| **Como testar** | Trocar filtro. |

### RN-SERIES-025 — Contador com total global

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | “X séries encontradas” usa total lógico do filtro. |
| **Pré-condições** | > ~48 séries no filtro. |
| **Resultado na tela** | Contador alto com subconjunto na grade. |
| **Como testar** | Filtro amplo; ler contador. |

### RN-SERIES-026 — Contador em carregamento

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Texto **Carregando...** durante busca. |
| **Pré-condições** | Filtro recém-alterado. |
| **Resultado na tela** | Sem número antigo. |
| **Como testar** | Trocar filtro rapidamente. |

### RN-SERIES-027 — Grade responsiva

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | 2–5 colunas; cards ~210px. |
| **Pré-condições** | Resultados > 0. |
| **Resultado na tela** | Layout adapta ao viewport. |
| **Como testar** | Redimensionar janela. |

### RN-SERIES-028 — Nenhum resultado

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Filtro sem match. |
| **Pré-condições** | Combinação impossível. |
| **Resultado na tela** | **Nenhuma série encontrada** + dica de ajustar filtros. |
| **Como testar** | Filtro restritivo. |

### RN-SERIES-029 — Falha ao recarregar

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Erre de rede ao filtrar não derruba página. |
| **Pré-condições** | Rede off ao filtrar. |
| **Resultado na tela** | Grade pode zerar; sem crash. |
| **Como testar** | Cortar rede ao filtrar. |

### RN-SERIES-030 — Listagem mais permissiva que a home

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | A página Séries pode incluir séries “fracas” (poucos episódios, sem sinopse) que o carrossel Séries da **inicial** exclui. |
| **Pré-condições** | Série marginal cadastrada. |
| **Resultado na tela** | Aparece em Séries; pode faltar na home. |
| **Como testar** | Comparar mesmo título home vs Séries. |

### RN-SERIES-031 — Lote inicial na grade

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | ~48 cards visíveis por vez sem “carregar mais”. |
| **Pré-condições** | Filtro amplo. |
| **Resultado na tela** | Dezenas de cards, contador pode ser maior. |
| **Como testar** | Contar cards vs contador. |

### RN-SERIES-032 — Cards com gêneros e streaming

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Informações aparecem quando cadastradas. |
| **Pré-condições** | Série com gêneros/plataformas. |
| **Resultado na tela** | Texto/ícones no card. |
| **Como testar** | Inspecionar card. |

### RN-SERIES-033 — Gêneros visíveis no card

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Lista de gêneros no card quando existir. |
| **Pré-condições** | Série com gêneros. |
| **Resultado na tela** | Gêneros legíveis. |
| **Como testar** | Abrir card na grade. |

### RN-SERIES-034 — Conteúdo pode demorar a refletir

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Mesma lógica de atualização gradual do catálogo. |
| **Pré-condições** | Alteração recente. |
| **Resultado na tela** | Recarregar após intervalo. |
| **Como testar** | Ver RN-SERIES-002. |

### RN-SERIES-035 — Opções de filtro coerentes

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Gêneros/status/plataformas só aparecem se há séries associadas. |
| **Pré-condições** | Catálogo variado. |
| **Resultado na tela** | Menus populados sem opções “vazias”. |
| **Como testar** | Abrir cada select. |

### RN-SERIES-036 — Anos de estreia no filtro

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Anos derivados da data de **estreia** da série. |
| **Pré-condições** | Várias temporadas. |
| **Resultado na tela** | Ano no filtro = ano de estreia, não de episódio recente. |
| **Como testar** | Série antiga com ep novo: filtrar ano de estreia. |

### RN-SERIES-037 — Status em português

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Labels traduzidos no select quando possível. |
| **Pré-condições** | Status variados. |
| **Resultado na tela** | Texto PT no dropdown. |
| **Como testar** | Abrir status. |

### RN-SERIES-038 — Home exige qualidade mínima

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Carrossel da inicial só mostra séries com pôster, sinopse, engajamento e nota mínima quando há muitos votos. |
| **Pré-condições** | Série fraca vs forte. |
| **Resultado na tela** | Forte na home e Séries; fraca só em Séries. |
| **Como testar** | Comparar presença home vs página. |

### RN-SERIES-039 — Home exige ≥ 2 episódios

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Carrossel inicial ignora séries com um único episódio cadastrado (salvo exceções de carrossel mensal). |
| **Pré-condições** | Série 1 ep. |
| **Resultado na tela** | Ausente na home; pode estar em Séries. |
| **Como testar** | Comparar contagens. |

### RN-SERIES-040 — Home exige pôster e sinopse

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Campos obrigatórios no carrossel da home. |
| **Pré-condições** | Série sem sinopse. |
| **Resultado na tela** | Ausente na home; pode listar em Séries. |
| **Como testar** | Mesmo título duas telas. |

### RN-SERIES-041 — Engajamento na home

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Popularidade ou volume de votos mínimo no carrossel. |
| **Pré-condições** | Série obscura. |
| **Resultado na tela** | Só na listagem Séries. |
| **Como testar** | Buscar série obscura. |

### RN-SERIES-042 — Nota mínima na home

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Muitos votos + nota baixa excluídos do carrossel. |
| **Pré-condições** | Série mal avaliada popular. |
| **Resultado na tela** | Listagem Séries pode ainda mostrar. |
| **Como testar** | Comparar. |

### RN-SERIES-043 — Estreias planejadas no carrossel mensal

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Modo timeline da home pode incluir séries “planejadas” com critério mais flexível. |
| **Pré-condições** | Série Planned futura. |
| **Resultado na tela** | Pode aparecer na home por mês; em Séries aparece se cadastrada. |
| **Como testar** | Validar na home e em Séries. |

### RN-SERIES-044 — Data do episódio na timeline home

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Posição no carrossel da home usa **próximo episódio**, não só estreia da série. |
| **Pré-condições** | Série com ep semanal. |
| **Resultado na tela** | Card na home alinhado ao ep; em Séries filtro mês usa estreia da série. |
| **Como testar** | Série em exibição: home vs filtro mês em Séries. |

### RN-SERIES-045 — Ordem no carrossel mensal

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Ordem na home por data de exibição/episódio; em Séries ordem alfabética (padrão). |
| **Pré-condições** | Mesmo mês. |
| **Resultado na tela** | Ordens diferentes entre telas. |
| **Como testar** | Comparar ordem home vs Séries filtrada. |

### RN-SERIES-046 — Carrossel por ano (home)

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Navegação por ano no carrossel da inicial; em Séries use filtro de ano. |
| **Pré-condições** | Ano específico. |
| **Resultado na tela** | Home: slides; Séries: grade filtrada. |
| **Como testar** | Filtrar ano em Séries. |

### RN-SERIES-047 — Ano sem dia confirmado (home)

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Blocos TBD existem na home; em Séries use status/detalhe. |
| **Pré-condições** | Série TBA. |
| **Resultado na tela** | Detalhe pode mostrar incerteza; sem separador TBD aqui. |
| **Como testar** | Comparar home vs detalhe em Séries. |

### RN-SERIES-048 — Contexto de temporadas na home

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Cards do carrossel podem considerar datas de temporadas. |
| **Pré-condições** | Nova temporada distante. |
| **Resultado na tela** | Home posiciona por ep; Séries filtra por estreia original se ano/mês de estreia. |
| **Como testar** | Caso com nova temp. |

### RN-SERIES-049 — Formato do card home vs grade

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Campos visuais podem diferir levemente (próximo ep, contagem). |
| **Pré-condições** | Mesma série. |
| **Resultado na tela** | Detalhes extras no carrossel home. |
| **Como testar** | Abrir card home vs card Séries. |

### RN-SERIES-050 — Limite de itens no carrossel home

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Faixa horizontal da home mostra subconjunto curado (~dezenas/centenas internas); Séries pagina ~48 visíveis. |
| **Pré-condições** | Catálogo grande. |
| **Resultado na tela** | Home não lista tudo; Séries lista muito mais via filtros. |
| **Como testar** | Contar visíveis em cada superfície. |

### RN-SERIES-051 — Detalhe pelo card

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Clique abre modal/página de detalhe. |
| **Pré-condições** | Card na grade/gaveta. |
| **Resultado na tela** | Sinopse, temporadas, links. |
| **Como testar** | Clicar card. |

### RN-SERIES-052 — Episódios por temporada

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Lista de episódios acessível no fluxo de detalhe (não na grade). |
| **Pré-condições** | Série com temporadas. |
| **Resultado na tela** | Episódios visíveis no detalhe. |
| **Como testar** | Abrir detalhe → temporada. |

### RN-SERIES-053 — Sem edição pública

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Cadastro alterado só por equipe interna. |
| **Pré-condições** | Usuário comum. |
| **Resultado na tela** | Sem controles de admin em Séries. |
| **Como testar** | Inspecionar página. |

### RN-SERIES-054 — Filtros habilitados

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Selects não ficam permanentemente desabilitados. |
| **Pré-condições** | Uso normal. |
| **Resultado na tela** | Todos clicáveis. |
| **Como testar** | Usar filtros. |

### RN-SERIES-055 — Contador coerente

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Total exibido alinhado ao filtro aplicado. |
| **Pré-condições** | Filtro ativo. |
| **Resultado na tela** | Número faz sentido com busca manual por título. |
| **Como testar** | Anotar contador + amostra. |

### RN-SERIES-056 — Recarregar reseta filtros

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | F5 volta ao estado inicial da página. |
| **Pré-condições** | Filtros alterados. |
| **Resultado na tela** | Selects e lista padrão após reload. |
| **Como testar** | F5 após filtrar. |

### RN-SERIES-057 — Listagem ampla sem filtro

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Abrir Séries sem filtros mostra séries diversas do catálogo (paginadas). |
| **Pré-condições** | Catálogo populado. |
| **Resultado na tela** | Grade com títulos variados. |
| **Como testar** | Abrir Séries padrão. |

### RN-SERIES-058 — Gêneros só com séries

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Gênero sem nenhuma série não aparece no menu. |
| **Pré-condições** | Gênero órfão. |
| **Resultado na tela** | Ausente no select. |
| **Como testar** | Revisar lista de gêneros. |

### RN-SERIES-059 — Plataformas só com séries

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Mesma regra para streaming. |
| **Pré-condições** | Plataforma sem séries. |
| **Resultado na tela** | Ausente no select. |
| **Como testar** | Abrir plataformas. |

### RN-SERIES-060 — Erro total na listagem

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Falha grave ao montar lista mostra estado vazio/erro amigável, não tela branca. |
| **Pré-condições** | Catálogo indisponível ao filtrar. |
| **Resultado na tela** | Empty ou mensagem; página intacta. |
| **Como testar** | Simular indisponibilidade. |

### RN-SERIES-061 — Erro nos filtros

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Se opções de filtro não carregarem, selects podem ficar vazios mas página abre. |
| **Pré-condições** | Falha na abertura. |
| **Resultado na tela** | Ver RN-SERIES-003. |
| **Como testar** | Abrir com catálogo down. |

### RN-SERIES-062 — Série planejada na listagem

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Séries futuras “planejadas” podem aparecer na grade se cadastradas. |
| **Pré-condições** | Série Planned. |
| **Resultado na tela** | Card visível; etiqueta **Em breve** quando aplicável. |
| **Como testar** | Buscar estreia futura. |

## 04 ANIMES

**Onde o usuário está:** página Animes do site (listagem completa de animes, acessível pelo menu ou pelo título da faixa Animes na página inicial).

### RN-ANIMES-001 — Conteúdo na abertura

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Lista e filtros já aparecem ao entrar (com possível segunda atualização logo após). |
| **Pré-condições** | Catálogo acessível. |
| **Resultado na tela** | Cards e selects visíveis após carregar. |
| **Como testar** | Abrir Animes. |

### RN-ANIMES-002 — Falha na abertura

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Catálogo indisponível no primeiro momento não quebra a página. |
| **Pré-condições** | Falha simulada. |
| **Resultado na tela** | Grade vazia; filtros vazios; página utilizável. |
| **Como testar** | Ambiente com catálogo indisponível na abertura. |

### RN-ANIMES-003 — Texto do cabeçalho

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Título e descrição fixos. |
| **Pré-condições** | Usuário em Animes. |
| **Resultado na tela** | **Animes** + texto sobre temporadas e clássicos. |
| **Como testar** | Ler cabeçalho. |

### RN-ANIMES-004 — Gaveta O que vem aí

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Animes futuros em carrossel horizontal. |
| **Pré-condições** | Resumo com **próximos animes**. |
| **Resultado na tela** | Seção **O que vem aí** acima dos filtros. |
| **Como testar** | Ambiente com estreias futuras. |

### RN-ANIMES-005 — Opções dos filtros

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Gêneros, anos, formatos, fontes e status vêm do catálogo disponível. |
| **Pré-condições** | Catálogo populado. |
| **Resultado na tela** | Dropdowns preenchidos; gêneros em ordem alfabética; anos do mais recente ao mais antigo; status com rótulo em português quando aplicável. |
| **Como testar** | Abrir cada select e comparar com títulos conhecidos. |

### RN-ANIMES-006 — Valor “Todos”

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Cada filtro em “Todos os …” não restringe aquele critério. |
| **Pré-condições** | Todos em todos os selects. |
| **Resultado na tela** | Grade ampla. |
| **Como testar** | Resetar filtros. |

### RN-ANIMES-007 — Recarga ao mudar filtro e na hidratação

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | A grade recarrega quando a página termina de abrir **e** sempre que um filtro muda (pode haver um loading extra logo após a primeira pintura). |
| **Pré-condições** | Página recém-aberta ou filtro alterado. |
| **Resultado na tela** | Spinner possível logo após abrir; novo spinner ao mudar filtro. |
| **Como testar** | Abrir Animes observando loading; depois trocar gênero. |

### RN-ANIMES-008 — Atualização após sync

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Sync do catálogo pode atualizar a grade com a página aberta. |
| **Pré-condições** | Sync disparada. |
| **Resultado na tela** | Lista muda sem F5. |
| **Como testar** | Manter Animes aberta durante sync. |

### RN-ANIMES-009 — Contador = cards da página atual

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | O texto “X animes encontrados” conta os cards **mostrados**, não necessariamente o total de animes que existem para o filtro no catálogo. |
| **Pré-condições** | Mais de ~48 animes para o filtro. |
| **Resultado na tela** | Contador pode mostrar até ~48 enquanto existem mais no catálogo. |
| **Como testar** | Filtro amplo; comparar contador com total esperado manualmente. |

### RN-ANIMES-010 — Grade, loading e vazio

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Spinner central durante busca; grid responsivo; empty state amigável. |
| **Pré-condições** | Filtro impossível ou resultados OK. |
| **Resultado na tela** | **Nenhum anime encontrado** + dica; ou 2–5 colunas de cards ~210px. |
| **Como testar** | Testar filtro vazio e filtro amplo. |

### RN-ANIMES-011 — Lote inicial sem “carregar mais”

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | A grade mostra um lote inicial (~dezenas); não há botão para próxima página nesta tela. |
| **Pré-condições** | Catálogo grande. |
| **Resultado na tela** | ~48 cards visíveis; sem paginação na UI. |
| **Como testar** | Contar cards com filtros abertos. |

### RN-ANIMES-012 — Exclusão de adulto explícito

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Animes marcados como conteúdo adulto não entram na listagem pública desta página. |
| **Pré-condições** | Anime adulto no catálogo. |
| **Resultado na tela** | Ausente em Animes. |
| **Como testar** | Buscar título adulto conhecido. |

### RN-ANIMES-013 — Tags sensíveis ocultas

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Títulos com tags como conteúdo adulto explícito (ex.: hentai, ecchi pesado) ficam de fora da listagem padrão. |
| **Pré-condições** | Anime com tag bloqueada. |
| **Resultado na tela** | Não aparece na grade pública. |
| **Como testar** | Validar título de teste com tag sensível. |

### RN-ANIMES-014 — Filtros combinados

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Gênero, ano (temporada), formato, fonte e status restringem juntos. |
| **Pré-condições** | Vários filtros ativos. |
| **Resultado na tela** | Só animes que atendem **todos** os critérios. |
| **Como testar** | Combinar gênero + ano + formato. |

### RN-ANIMES-015 — Ordem alfabética padrão

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Sem controle “populares” na UI, ordem por título (romaji/título exibido). |
| **Pré-condições** | Filtros em todos. |
| **Resultado na tela** | Ordem A–Z aproximada pelos primeiros cards. |
| **Como testar** | Ler primeiros títulos. |

### RN-ANIMES-016 — Listagem vs home / Hoje

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | A página Animes é **mais permissiva** que o carrossel Animes da home e que algumas seções da página Hoje (que exigem qualidade mínima). |
| **Pré-condições** | Anime marginal (baixa popularidade, fora de temporada). |
| **Resultado na tela** | Pode aparecer em Animes e faltar na home/Hoje streaming. |
| **Como testar** | Comparar mesmo anime nas três áreas. |

### RN-ANIMES-017 — Conteúdo pode demorar a atualizar

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Após mudanças no catálogo, aguardar e recarregar para ver efeito (mesma lógica das outras listagens). |
| **Pré-condições** | Cadastro alterado. |
| **Resultado na tela** | Novidades após reload. |
| **Como testar** | Alterar anime de teste; recarregar. |

### RN-ANIMES-018 — Metadados de filtro completos

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Formatos e fontes listam valores realmente usados por algum anime. |
| **Pré-condições** | Catálogo variado. |
| **Resultado na tela** | Sem opções “fantasma” no menu. |
| **Como testar** | Percorrer formatos/fontes. |

### RN-ANIMES-019 — Detalhe ao vivo

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Clique no card abre detalhe que pode buscar informações atualizadas (sinopse, episódios, links). |
| **Pré-condições** | Card qualquer. |
| **Resultado na tela** | Modal/página de detalhe; id inválido não abre conteúdo quebrado. |
| **Como testar** | Clicar card; testar título removido. |

### RN-ANIMES-020 — Próximo episódio (detalhe/agenda)

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Informação de próximo episódio aparece no detalhe/card quando existir agenda futura; não é filtro da grade. |
| **Pré-condições** | Anime em exibição semanal. |
| **Resultado na tela** | Contagem ou data de próximo ep no card/detalhe. |
| **Como testar** | Anime em temporada corrente. |

## 05 JOGOS

**Onde o usuário está:** - Página Jogos — listagem completa de jogos (menu ou faixa Jogos na inicial).

### RN-JOGOS-001 — Conteúdo na abertura

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Grade e filtros já vêm na abertura. |
| **Pré-condições** | Catálogo OK. |
| **Resultado na tela** | Cards e selects visíveis. |
| **Como testar** | Abrir Jogos. |

### RN-JOGOS-002 — Falha na abertura

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Indisponibilidade não quebra a página. |
| **Pré-condições** | Catálogo down. |
| **Resultado na tela** | Grade vazia; filtros vazios possíveis. |
| **Como testar** | Simular falha inicial. |

### RN-JOGOS-003 — Sem recarga duplicada na abertura

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Abrir Jogos não dispara loading extra imediato após a primeira pintura. |
| **Pré-condições** | Primeira visita OK. |
| **Resultado na tela** | Estável até mudar filtro. |
| **Como testar** | Abrir e aguardar. |

### RN-JOGOS-004 — Filtros aplicados

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Gênero, plataforma, modo de jogo, ano e mês restringem a grade. |
| **Pré-condições** | Valores específicos selecionados. |
| **Resultado na tela** | Lista coerente (ex.: só PlayStation). |
| **Como testar** | Alterar cada filtro. |

### RN-JOGOS-005 — Mês sem ano explícito

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Só mês selecionado usa o **ano corrente** para lançamentos daquele mês. |
| **Pré-condições** | Março + todos os anos. |
| **Resultado na tela** | Jogos lançados em março do ano atual. |
| **Como testar** | Filtrar mês atual. |

### RN-JOGOS-006 — Mês com ano

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Mês + ano restringem ao intervalo daquele mês/ano. |
| **Pré-condições** | Junho 2023. |
| **Resultado na tela** | Só lançamentos de jun/2023. |
| **Como testar** | Combinar mês e ano. |

### RN-JOGOS-007 — Ordem alfabética

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Sem controle “populares” na UI, ordem por nome do jogo. |
| **Pré-condições** | Filtros em todos. |
| **Resultado na tela** | A–Z nos primeiros cards. |
| **Como testar** | Ler primeiros títulos. |

### RN-JOGOS-008 — Popularidade (catálogo interno)

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Modo “populares” existe no catálogo, **sem** botão nesta página. |
| **Pré-condições** | — |
| **Resultado na tela** | Usuário só vê ordem alfabética aqui. |
| **Como testar** | Confirmar ausência de atalho Populares. |

### RN-JOGOS-009 — Listagem mais permissiva que destaques

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Jogos “fracos” (pouco hype/nota) podem aparecer em Jogos mas **não** em **Em Alta** ou algumas faixas da home. |
| **Pré-condições** | Jogo obscuro. |
| **Resultado na tela** | Visível em Jogos; ausente em Em Alta. |
| **Como testar** | Comparar mesma busca. |

### RN-JOGOS-010 — Lote inicial na grade

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | ~dezenas de cards visíveis; sem “carregar mais”. |
| **Pré-condições** | Catálogo grande. |
| **Resultado na tela** | Até ~48 cards; contador segue cards visíveis (como Animes). |
| **Como testar** | Contar cards vs contador. |

### RN-JOGOS-011 — Gaveta O que vem aí

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Próximos lançamentos de jogos em carrossel. |
| **Pré-condições** | Resumo com **próximos jogos**. |
| **Resultado na tela** | Seção **O que vem aí** acima dos filtros. |
| **Como testar** | Ambiente com jogos futuros. |

### RN-JOGOS-012 — Gaveta Eventos recentes

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Destaques de eventos de games (ex.: State of Play, Nintendo Direct). |
| **Pré-condições** | Resumo com **eventos recentes**. |
| **Resultado na tela** | Seção **Eventos recentes** com cards de evento empilhados. |
| **Como testar** | Ambiente com eventos no resumo. |

### RN-JOGOS-013 — Loading, contador e vazio

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Spinner ao filtrar; contador = quantidade na grade; empty **Nenhum jogo encontrado**. |
| **Pré-condições** | Filtro vazio ou OK. |
| **Resultado na tela** | Comportamento igual padrão Animes. |
| **Como testar** | Filtro impossível e amplo. |

### RN-JOGOS-014 — Atualização após sync

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Sync pode atualizar grade com página aberta. |
| **Pré-condições** | Sync em andamento. |
| **Resultado na tela** | Cards mudam sem F5. |
| **Como testar** | Manter Jogos aberta. |

### RN-JOGOS-015 — Opções de filtro

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Gêneros, plataformas, modos e anos refletem jogos cadastrados; anos decrescentes. |
| **Pré-condições** | Catálogo variado. |
| **Resultado na tela** | Menus populados coerentemente. |
| **Como testar** | Abrir cada select. |

### RN-JOGOS-016 — Preço Steam no detalhe/card

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Quando o jogo tem página na Steam, preço em reais pode aparecer após carregar (não instantâneo na grade). |
| **Pré-condições** | Jogo com Steam cadastrado. |
| **Resultado na tela** | Preço BRL ou indicador de carregamento no detalhe/card conforme produto. |
| **Como testar** | Abrir jogo Steam conhecido. |

### RN-JOGOS-017 — Redirect para Promoções

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | URL antiga não tem conteúdo próprio. |
| **Pré-condições** | Usuário acessa **/jogos-em-alta**. |
| **Resultado na tela** | Navegador vai para **Promoções**, aba **Em Alta**. |
| **Como testar** | Digitar URL legada. |

### RN-JOGOS-018 — Menu do site

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Atalho **Jogos em Alta** no cabeçalho/rodapé aponta para o mesmo destino. |
| **Pré-condições** | Menu visível. |
| **Resultado na tela** | Clique abre Promoções na aba Em Alta. |
| **Como testar** | Clicar item de menu. |

### RN-JOGOS-019 — Quem entra no ranking

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Destaques semanais priorizam jogos recentes ou com hype/nota mínima; jogos antigos sem interesse ficam de fora. |
| **Pré-condições** | Jogo lançado há meses sem destaque. |
| **Resultado na tela** | Ausente do **Top da Semana**. |
| **Como testar** | Comparar jogo antigo vs lançamento recente. |

### RN-JOGOS-020 — Top da Semana

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Até **12** jogos em grade; os **três primeiros** com badge **#1**, **#2**, **#3**. |
| **Pré-condições** | Pool de destaques não vazio. |
| **Resultado na tela** | Seção **Top da Semana** aberta por padrão. |
| **Como testar** | Contar cards e badges. |

### RN-JOGOS-021 — Mais jogados na Steam

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Faixa horizontal só se houver dados de jogadores simultâneos. |
| **Pré-condições** | Jogos Steam com pico de jogadores. |
| **Resultado na tela** | Seção **Mais jogados na Steam** com carrossel. |
| **Como testar** | Ambiente com dados Steam. |

### RN-JOGOS-022 — Promoções Steam (dados)

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Descontos Steam fortes entram no pacote de dados de Em Alta; **não** há seção separada dedicada na UI atual (ofertas Steam aparecem principalmente na aba Promoções). |
| **Pré-condições** | Jogos com desconto alto na Steam. |
| **Resultado na tela** | Verificar ofertas na aba **Promoções** / carrossel catálogo Steam. |
| **Como testar** | Comparar jogo em promo Steam entre abas. |

### RN-JOGOS-023 — Por plataforma

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Blocos PC → Xbox → PlayStation → Nintendo; até **8** jogos por bloco; bloco vazio mostra mensagem amigável. |
| **Pré-condições** | Jogos multiplataforma. |
| **Resultado na tela** | Switch só no bloco Nintendo, etc. |
| **Como testar** | Ler seções por plataforma. |

### RN-JOGOS-024 — Por modo de jogo

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Multijogador, cooperativo, um jogador — até 8 jogos; bloco vazio com texto explicativo. |
| **Pré-condições** | Jogos co-op. |
| **Resultado na tela** | Título listado em **Cooperativo** quando aplicável. |
| **Como testar** | Achar jogo co-op conhecido. |

### RN-JOGOS-025 — Por categoria (gênero)

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Até **6** gêneros com **pelo menos 2** jogos; até 8 jogos por gênero. |
| **Pré-condições** | Gênero com 1 só jogo. |
| **Resultado na tela** | Gênero singleton **não** vira seção. |
| **Como testar** | Contar seções de gênero. |

### RN-JOGOS-026 — Semana e métrica (modo completo)

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Fora do modo compacto da aba Promoções, texto indica semana corrente e fontes (Steam + IGDB ou só IGDB). |
| **Pré-condições** | Abrir Em Alta em contexto que mostra cabeçalho longo (se existir rota dedicada futura). |
| **Resultado na tela** | Na aba Promoções (**compact**), semana/métrica longa **oculta**; banner de promoções visível. |
| **Como testar** | Abrir `/promocoes?tab=em-alta`. |

### RN-JOGOS-027 — Modo compacto na aba Promoções

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Dentro de Promoções, Em Alta usa layout resumido: skeleton de 6 cards, banner para **Promoções ao vivo**, sem bloco grande de semana/métrica. |
| **Pré-condições** | Aba **Em Alta** em Promoções. |
| **Resultado na tela** | Banner “Ofertas ao vivo…” + link **Ver promoções ao vivo**; grade compacta. |
| **Como testar** | Abrir aba Em Alta. |

### RN-JOGOS-028 — Erro ao carregar

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Falha ao montar Em Alta. |
| **Pré-condições** | Catálogo/indisponibilidade simulada. |
| **Resultado na tela** | Mensagem **Não foi possível carregar os jogos em alta.** |
| **Como testar** | Simular falha. |

### RN-JOGOS-029 — Conteúdo estável por sessão

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Lista Em Alta não muda a cada segundo; atualiza ao reabrir aba/página. |
| **Pré-condições** | Aba aberta. |
| **Resultado na tela** | Mesmos blocos durante navegação curta; recarregar pode atualizar. |
| **Como testar** | Ficar na aba; depois F5. |

## 06 PROMOCOES

**Onde o usuário está:** página Promoções & Jogos Grátis (`/promocoes`), com três abas: Jogos de Graça, Promoções e Em Alta. O parâmetro de endereço `?tab=promocoes` ou `?tab=em-alta` escolhe a aba inicial; sem parâmetro ou valor inválido abre Jogos de Graça.

### RN-PROMO-001 — Aba pela URL

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Endereço define aba inicial. |
| **Pré-condições** | `/promocoes`, `/promocoes?tab=promocoes`, `/promocoes?tab=em-alta`. |
| **Resultado na tela** | Padrão **Jogos de Graça**; `promocoes` → aba Promoções; `em-alta` → Em Alta. |
| **Como testar** | Abrir cada URL. |

### RN-PROMO-002 — Shell da página

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Estrutura (hero, abas) aparece mesmo antes das ofertas terminarem de carregar. |
| **Pré-condições** | Primeira visita. |
| **Resultado na tela** | Layout visível; conteúdo das abas grátis/promo preenche depois. |
| **Como testar** | Abrir Promoções com rede lenta. |

### RN-PROMO-003 — Três abas

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Grátis, Promoções, Em Alta com ícones distintos. |
| **Pré-condições** | Página carregada. |
| **Resultado na tela** | Alternar abas muda conteúdo principal. |
| **Como testar** | Clicar cada aba. |

### RN-PROMO-004 — Em Alta sem ofertas de loja

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Aba **Em Alta** não carrega jogos grátis/promoções de lojas externas. |
| **Pré-condições** | Aba **Em Alta** ativa. |
| **Resultado na tela** | Só blocos de jogos em alta; sem skeleton de 12 cards de deal (salvo loading interno de Em Alta). |
| **Como testar** | Abrir Em Alta; observar ausência de grids de oferta. |

### RN-PROMO-005 — Carregar sob demanda

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Cada aba de ofertas busca dados na **primeira** vez que o usuário entra nela. |
| **Pré-condições** | Abrir direto em Promoções sem passar por Grátis. |
| **Resultado na tela** | Promoções carrega ao selecionar aba; Grátis pode não ter sido buscado ainda. |
| **Como testar** | Entrar direto `?tab=promocoes`. |

### RN-PROMO-006 — Várias lojas — grátis

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Jogos de graça agregam Epic, giveaways, Steam, itch.io, etc. |
| **Pré-condições** | Aba Grátis carregada. |
| **Resultado na tela** | Cards de lojas diferentes; rodapé lista fontes com contagem. |
| **Como testar** | Ler rodapé após load. |

### RN-PROMO-007 — Várias lojas — promo pagas

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Promoções pagas combinam várias lojas; ordem padrão prioriza “melhor deal”. |
| **Pré-condições** | Aba Promoções. |
| **Resultado na tela** | Ofertas misturadas; ordenação **Popularidade** por padrão. |
| **Como testar** | Abrir aba Promoções. |

### RN-PROMO-008 — Catálogo Orbe na Steam

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Jogos já catalogados no site com desconto na Steam aparecem em faixa dedicada. |
| **Pré-condições** | Jogos Orbe em promo Steam. |
| **Resultado na tela** | Seção **Promoções na Steam (catálogo)** com carrossel horizontal. |
| **Como testar** | Aba Promoções com catálogo populado. |

### RN-PROMO-009 — Atualização periódica

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Ofertas são atualizadas em intervalo curto; botão **Atualizar agora** força nova busca. |
| **Pré-condições** | Aba grátis ou promo. |
| **Resultado na tela** | Horário **Última atualização** muda após atualizar. |
| **Como testar** | Clicar **Atualizar agora** duas vezes. |

### RN-PROMO-010 — Alerta de fontes indisponíveis

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Se alguma loja falhar, banner âmbar ou vermelho avisa que a lista pode estar incompleta. |
| **Pré-condições** | Fonte externa down no ambiente. |
| **Resultado na tela** | Banner listando lojas com falha. |
| **Como testar** | Simular/induzir falha de fonte. |

### RN-PROMO-011 — Sem detalhes técnicos internos

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Usuário não vê metadados de diagnóstico — só ofertas, contadores e alertas amigáveis. |
| **Pré-condições** | Qualquer aba de oferta. |
| **Resultado na tela** | Nenhum painel “debug” na interface. |
| **Como testar** | Inspecionar UI. |

### RN-PROMO-012 — Conteúdo da aba Grátis

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Temporários, permanentes e lista unificada para contagem. |
| **Pré-condições** | Grátis carregado. |
| **Resultado na tela** | Seções **Estão de graça** e **São de graça**; chips de plataforma. |
| **Como testar** | Percorrer aba Grátis. |

### RN-PROMO-013 — Paginação de promoções pagas

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Primeira leva ~48 ofertas; **Carregar mais** traz o restante quando existir. |
| **Pré-condições** | Muitas promoções ao vivo. |
| **Resultado na tela** | Botão **Carregar mais promoções** aumenta grid. |
| **Como testar** | Clicar até sumir botão. |

### RN-PROMO-014 — Preços em reais

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Quando aplicável, valores convertidos; rodapé pode mostrar taxa USD/BRL e hora da cotação. |
| **Pré-condições** | Ofertas em dólar. |
| **Resultado na tela** | Preço BRL nos cards; linha USD/BRL no rodapé. |
| **Como testar** | Ler rodapé e cards. |

### RN-PROMO-015 — Temporário vs permanente

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | **Estão de graça** = promo 100% por tempo limitado; **São de graça** = F2P ou sempre zero. |
| **Pré-condições** | Deals de ambos tipos. |
| **Resultado na tela** | Duas seções com textos explicativos diferentes. |
| **Como testar** | Ler subtítulos das seções. |

### RN-PROMO-016 — Ordenação padrão grátis

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Temporários por **Acaba primeiro**; permanentes por título quando essa ordenação não se aplica. |
| **Pré-condições** | Aba Grátis. |
| **Resultado na tela** | Select de ordenação; mudar reordena temporários. |
| **Como testar** | Trocar ordenação. |

### RN-PROMO-017 — Filtro por plataforma/loja

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Chips só aparecem para lojas que têm oferta no momento; filtro ativo some se a loja deixar de ter itens. |
| **Pré-condições** | Filtrar e atualizar. |
| **Resultado na tela** | Chip some ou volta para **Todas**. |
| **Como testar** | Filtrar Steam; atualizar se vazio. |

### RN-PROMO-018 — Busca por título

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Campo **Buscar jogo...** filtra temporários, permanentes e destaques (case insensitive). |
| **Pré-condições** | Texto parcial do título. |
| **Resultado na tela** | Grid reduzido. |
| **Como testar** | Buscar substring. |

### RN-PROMO-019 — Destaques itch.io e EA App

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Com filtro **Todas** e sem busca, ofertas itch.io e EA App podem aparecer em seções colapsáveis próprias, removidas do bloco principal para não duplicar. |
| **Pré-condições** | Deals nessas lojas. |
| **Resultado na tela** | Seções **Grátis na itch.io** / **Grátis na EA** (ou equivalente). |
| **Como testar** | Confirmar que itch não repete no grid principal. |

### RN-PROMO-020 — Agrupamento por loja

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Com **Todas** plataformas, lista principal agrupa subtítulos por loja (uppercase). |
| **Pré-condições** | Várias lojas. |
| **Resultado na tela** | Subtítulos EPIC, STEAM, etc., cada um com grid. |
| **Como testar** | Ver aba Grátis com muitas fontes. |

### RN-PROMO-021 — Contador na aba Grátis

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Número ao lado do nome da aba reflete ofertas grátis **após** filtro de plataforma e busca. |
| **Pré-condições** | Busca ativa. |
| **Resultado na tela** | Badge diminui. |
| **Como testar** | Buscar título raro. |

### RN-PROMO-022 — Vazio grátis

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Sem temporários ou sem permanentes. |
| **Pré-condições** | Lista filtrada vazia. |
| **Resultado na tela** | Mensagens específicas por seção. |
| **Como testar** | Filtrar loja sem giveaways. |

### RN-PROMO-023 — Ordenação padrão promo

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | **Popularidade** (melhor avaliação de deal). |
| **Pré-condições** | Aba Promoções. |
| **Resultado na tela** | Trocar para **Maior desconto** reordena grid. |
| **Como testar** | Usar select de ordenação. |

### RN-PROMO-024 — Faixa catálogo Steam

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Carrossel no topo quando há jogos do catálogo Orbe em desconto na Steam. |
| **Pré-condições** | Pelo menos um jogo Orbe em promo na Steam. |
| **Resultado na tela** | Seção com link **Ver aba Em Alta →**. |
| **Como testar** | Abrir Promoções com catálogo em promo. |

### RN-PROMO-025 — Carregar mais

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Botão só com filtro **Todas**, sem busca, e quando ainda há páginas. |
| **Pré-condições** | >48 promoções. |
| **Resultado na tela** | **Carregar mais promoções** append cards; com busca o botão some. |
| **Como testar** | Buscar título → botão ausente. |

### RN-PROMO-026 — Contador aba Promoções

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Badge = ofertas ao vivo filtradas + itens do carrossel catálogo Steam filtrados. |
| **Pré-condições** | Filtro plataforma. |
| **Resultado na tela** | Número atualiza. |
| **Como testar** | Filtrar Epic. |

### RN-PROMO-027 — Wishlist Steam (em breve)

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Caixa tracejada informativa, **sem** botão funcional de login Steam. |
| **Pré-condições** | Aba Promoções visível. |
| **Resultado na tela** | Texto **Lista de desejos Steam (em breve)**. |
| **Como testar** | Ler bloco no topo da aba. |

### RN-PROMO-028 — Em Alta embutido

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Mesmo conteúdo de jogos em alta (Top da Semana, Steam, plataformas…) em modo compacto + banner para promoções. |
| **Pré-condições** | Tab `em-alta`. |
| **Resultado na tela** | Ver regras RN-JOGOS-019–029 em `05-JOGOS.md`. |
| **Como testar** | Abrir aba Em Alta. |

### RN-PROMO-029 — Bookmark antigo

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | `/jogos-em-alta` redireciona para esta aba. |
| **Pré-condições** | URL legada. |
| **Resultado na tela** | Endereço final `?tab=em-alta`. |
| **Como testar** | Acessar URL antiga. |

### RN-PROMO-030 — Atualizar agora

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Recarrega aba ativa **Grátis** ou **Promoções**; **Em Alta** não usa este botão para ofertas de loja. |
| **Pré-condições** | Botão no hero. |
| **Resultado na tela** | Spinner no ícone; horário atualiza (abas de deal). |
| **Como testar** | Clicar em Grátis vs Em Alta. |

### RN-PROMO-031 — Erro global de ofertas

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Falha ao buscar grátis/promo. |
| **Pré-condições** | Indisponibilidade. |
| **Resultado na tela** | **Não foi possível carregar promoções e jogos grátis.** + **Tentar novamente**. |
| **Como testar** | Simular falha. |

### RN-PROMO-032 — Skeleton inicial

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Primeira carga de Grátis/Promo mostra 12 placeholders shimmer. |
| **Pré-condições** | Rede lenta, aba ≠ Em Alta. |
| **Resultado na tela** | Skeleton antes dos cards reais. |
| **Como testar** | Throttle + abrir Promoções. |

### RN-PROMO-033 — Banner de degradação

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Mesmo RN-PROMO-010 — lista fontes com falha. |
| **Pré-condições** | Fontes parciais down. |
| **Resultado na tela** | Banner âmbar/vermelho. |
| **Como testar** | Ambiente degradado. |

### RN-PROMO-034 — Rodapé de fontes

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Contagens por loja com cor verde (ok) ou vermelho (erro). |
| **Pré-condições** | Após load grátis/promo. |
| **Resultado na tela** | Linha **Fontes:** Epic (n), Steam (n)… |
| **Como testar** | Comparar com quantidade visível. |

### RN-PROMO-035 — Tamanho da primeira página promo

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Primeira leva de **Ofertas ao vivo** alinhada a ~48 itens antes de **Carregar mais**. |
| **Pré-condições** | Muitas ofertas. |
| **Resultado na tela** | Grid inicial ~48; botão carrega resto. |
| **Como testar** | Contar antes de carregar mais. |

## 07 HOJE

**Onde o usuário está:** página Hoje do site (menu principal → Hoje), com panorama editorial do dia: cinema, estreias, streaming e jogos em destaque.

### RN-HOJE-001 — Conteúdo após abrir a página

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Os cards não vêm “prontos” no primeiro instante; a página busca os destaques ao abrir. |
| **Pré-condições** | Acesso normal à página Hoje. |
| **Resultado na tela** | Breve estado de carregamento (esqueletos/cards cinza) e, em seguida, faixas preenchidas ou mensagens de vazio/erro. |
| **Como testar** | Abrir Hoje com rede normal; observar transição skeleton → conteúdo. |

### RN-HOJE-002 — Data do dia

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | A página mostra a data atual em português, junto ao título. |
| **Pré-condições** | Página carregada com sucesso. |
| **Resultado na tela** | Linha com ícone de calendário e data por extenso (pt-BR), coerente com o dia de teste. |
| **Como testar** | Comparar data exibida com o relógio do sistema. |

### RN-HOJE-003 — Ligar/desligar blocos

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | O usuário escolhe quais faixas aparecem; a escolha fica salva no navegador. |
| **Pré-condições** | Mesmo navegador/dispositivo. |
| **Resultado na tela** | Interruptores ou checkboxes por seção; ao recarregar, as seções desmarcadas continuam ocultas. |
| **Como testar** | Desmarcar “Em cartaz nos cinemas”; F5 → faixa não aparece. |

### RN-HOJE-004 — Pelo menos uma seção

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Não é possível desativar todas as seções de uma vez. |
| **Pré-condições** | Resta apenas uma seção marcada. |
| **Resultado na tela** | Tentativa de desmarcar a última é ignorada; continua uma seção ativa. |
| **Como testar** | Desmarcar cinco seções; na sexta tentativa, a última permanece ligada. |

### RN-HOJE-005 — Ordem fixa das faixas

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | A ordem vertical dos blocos não muda conforme preferências. |
| **Pré-condições** | Várias seções habilitadas com conteúdo. |
| **Resultado na tela** | Sempre, de cima para baixo: cinema → estreias da semana → filmes no streaming → séries no streaming → animes em exibição → jogos em destaque (só as habilitadas e com itens). |
| **Como testar** | Habilitar todas; rolar e conferir ordem dos títulos das faixas. |

### RN-HOJE-006 — Faixa sem itens some

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Seção ligada mas sem títulos para mostrar não ocupa espaço. |
| **Pré-condições** | Seção habilitada sem destaques naquele dia. |
| **Resultado na tela** | Nenhum título de faixa vazio; bloco inteiro ausente. |
| **Como testar** | Ambiente ou dia em que uma faixa específica vem vazia. |

### RN-HOJE-007 — Nada para mostrar

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Todas as faixas visíveis estão vazias, ou o usuário desligou tudo que tinha conteúdo. |
| **Pré-condições** | Filtros de seção deixam zero cards visíveis. |
| **Resultado na tela** | Mensagem “Nenhum destaque disponível para os filtros selecionados.” |
| **Como testar** | Desmarcar seções que tinham conteúdo até só restarem vazias ou desligar todas as que exibem cards. |

### RN-HOJE-008 — Erro ao carregar

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Se os destaques não puderem ser obtidos. |
| **Pré-condições** | Simular falha de rede ou indisponibilidade do serviço. |
| **Resultado na tela** | Mensagem do tipo “Não foi possível carregar o conteúdo de hoje.” |
| **Como testar** | Bloquear rede após abrir a página ou usar ambiente offline. |

### RN-HOJE-009 — Esqueletos no carregamento

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Enquanto aguarda os dados. |
| **Pré-condições** | Primeiro acesso ou rede lenta. |
| **Resultado na tela** | Grade com vários placeholders de card (cerca de oito). |
| **Como testar** | Throttle de rede e recarregar Hoje. |

### RN-HOJE-010 — Cards iguais ao resto do site

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Interações nos cards seguem o mesmo padrão das listagens. |
| **Pré-condições** | Usuário logado; itens visíveis em uma faixa. |
| **Resultado na tela** | Favoritar, listas e demais ações do card funcionam como em Filmes/Séries/Animes/Jogos. |
| **Como testar** | Logar; favoritar um filme em “Em cartaz” e conferir em outra tela. |

### RN-HOJE-011 — Janela “esta semana”

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Destaques de streaming e animes priorizam o que teve lançamento ou episódio nos **últimos 7 dias**. |
| **Pré-condições** | Títulos com datas conhecidas (estreia ou episódio). |
| **Resultado na tela** | Obra lançada há mais de uma semana tende a não liderar o pool “esta semana”; pode aparecer só se faltar conteúdo recente. |
| **Como testar** | Comparar filme estreando há 8 dias vs filme estreando ontem na faixa de streaming. |

### RN-HOJE-012 — Em cartaz nos cinemas

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Filmes marcados como em exibição comercial no momento. |
| **Pré-condições** | Catálogo com filme em cartaz e filme só em streaming. |
| **Resultado na tela** | Até **12** filmes; foco em popularidade entre os em cartaz; obras de baixa qualidade editorial ou mal localizadas tendem a ficar de fora. |
| **Como testar** | Contar cards na faixa cinema; validar que só entram “em cartaz”. |

### RN-HOJE-013 — Estreias da semana

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Filmes estreando na **semana civil brasileira** corrente. |
| **Pré-condições** | Filme com estreia BR na semana vs fora da semana. |
| **Resultado na tela** | Até **24** títulos; cards de estreia da semana podem exibir etiqueta de destaque de estreia. |
| **Como testar** | Cruzar com calendário de estreias BR. |

### RN-HOJE-014 — Etiquetas em filmes

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Alguns filmes ganham destaque visual (estreia da semana ou “mais esperado”). |
| **Pré-condições** | Filme estreando na semana vs filme futuro aguardado. |
| **Resultado na tela** | Estreia da semana tem prioridade sobre “mais esperado” no mesmo card. |
| **Como testar** | Inspecionar pills nos cards de estreias e estreias futuras. |

### RN-HOJE-015 — Filmes no streaming esta semana

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Filmes disponíveis em streaming, não em cartaz, com preferência por lançamentos na última semana. |
| **Pré-condições** | Pool semanal com menos de 12 títulos. |
| **Resultado na tela** | Até **12** filmes; se faltarem lançamentos recentes, entram títulos populares em streaming para completar, sem duplicar o mesmo filme. |
| **Como testar** | Dia com poucos lançamentos streaming; ver se lista completa até 12. |

### RN-HOJE-016 — Séries no streaming esta semana

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Séries com episódio ou estreia recente na última semana, ou fallback por popularidade. |
| **Pré-condições** | Série sem episódio na semana mas popular. |
| **Resultado na tela** | Até **12** séries; mescla recentes + fallback. |
| **Como testar** | Série semanal com ep ontem vs série parada há meses. |

### RN-HOJE-017 — Animes em exibição (prioridade)

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Animes **em lançamento** que exibiram episódio na última semana. |
| **Pré-condições** | Anime em exibição sem ep na semana. |
| **Resultado na tela** | Preferência por quem teve episódio nos últimos 7 dias; ordenação por popularidade e nota. |
| **Como testar** | Anime com ep recente vs anime em hiato. |

### RN-HOJE-018 — Animes — completar lista

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Se poucos animes tiveram episódio na semana, a lista completa com outros em exibição ou a estrear. |
| **Pré-condições** | Poucos episódios recentes no catálogo. |
| **Resultado na tela** | Até **12** animes no total, sem repetir o mesmo título. |
| **Como testar** | Conferir contagem máxima em dia “fraco” de episódios. |

### RN-HOJE-019 — Jogos em destaque

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Jogos com maior expectativa ou nota entre os elegíveis. |
| **Pré-condições** | Catálogo com jogos fracos e fortes. |
| **Resultado na tela** | Até **8** jogos; jogos sem sinal de qualidade tendem a ficar de fora. |
| **Como testar** | Contar faixa; comparar com página Jogos. |

### RN-HOJE-020 — Animes mais exigentes que a listagem

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Alguns animes marginais aparecem na listagem geral de animes mas não em Hoje. |
| **Pré-condições** | Anime com nota/popularidade baixa. |
| **Resultado na tela** | Ausente na faixa de animes de Hoje; pode existir na página Animes do menu. |
| **Como testar** | Mesmo título em Animes vs Hoje. |

### RN-HOJE-021 — Textos de sinopse

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Sinopses exibidas são as já cadastradas no catálogo (sem tradução instantânea na hora da visita). |
| **Pré-condições** | Abrir detalhe do mesmo título em Hoje e em Filmes. |
| **Resultado na tela** | Mesmo texto de sinopse para a mesma obra. |
| **Como testar** | Abrir modal do filme em Hoje e na listagem Filmes. |

### RN-HOJE-022 — Atualização dos destaques

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | O conjunto de títulos do dia não muda a cada segundo. |
| **Pré-condições** | Duas visitas no mesmo dia. |
| **Resultado na tela** | Listas podem permanecer estáveis por várias horas até o site atualizar o pacote de “hoje”. |
| **Como testar** | Comparar Hoje de manhã e tarde (mesmo dia). |

### RN-HOJE-023 — Falha grave no servidor

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Erro interno ao montar os destaques. |
| **Pré-condições** | Serviço indisponível. |
| **Resultado na tela** | Mesma mensagem de erro de RN-HOJE-008; usuário não vê faixas parciais “quebradas”. |
| **Como testar** | Ambiente de teste com serviço fora. |

### RN-HOJE-024 — Seções batem com a tela

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Cada faixa visível corresponde a um bloco de destaques (data do dia + listas por tema). |
| **Pré-condições** | Página carregada com sucesso. |
| **Resultado na tela** | Seis tipos possíveis: data, estreias da semana, cinema, três faixas streaming (filmes/séries/animes), jogos — conforme preferências e conteúdo. |
| **Como testar** | Conferir títulos das faixas com a tabela abaixo. |

## 08 MODAIS

**Onde o usuário está:** sobreposição (modal) de detalhes de uma mídia — filme, série, anime ou jogo — aberta a partir de cards em listagens, busca, home, Hoje, prêmios, etc.

### RN-MODAL-001 — Só abre com mídia válida

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | O modal de detalhe exige tipo e obra reconhecidos. |
| **Pré-condições** | Clique em card de mídia suportada. |
| **Resultado na tela** | Overlay e conteúdo aparecem; tipos não suportados não abrem modal. |
| **Como testar** | Abrir filme, série, anime e jogo a partir de cards. |

### RN-MODAL-002 — Fechar ao mudar de página

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Se o usuário vai para outra página do site com o modal aberto. |
| **Pré-condições** | Modal aberto; clicar link do menu ou digitar outra URL interna. |
| **Resultado na tela** | Modal fecha; a nova página carrega normalmente (sem “voltar” extra inesperado). |
| **Como testar** | Com modal aberto, ir para Filmes pelo header. |

### RN-MODAL-003 — Detalhes ao abrir

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Ao abrir, a tela busca informações completas da obra. |
| **Pré-condições** | Abrir modal pela primeira vez para um título. |
| **Resultado na tela** | Breve loading; depois sinopse, elenco, links etc. mais completos que no card. |
| **Como testar** | Abrir modal e comparar dados com o card. |

### RN-MODAL-004 — Falha ao buscar detalhes

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Se a busca de detalhes falhar. |
| **Pré-condições** | Rede instável ou título problemático. |
| **Resultado na tela** | Modal ainda mostra o que já vinha do card; raramente tela de erro se não houver nenhum dado. |
| **Como testar** | Simular offline após abrir modal. |

### RN-MODAL-005 — Botão voltar do navegador

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | O modal participa do histórico do navegador. |
| **Pré-condições** | Modal aberto em desktop/mobile. |
| **Resultado na tela** | Fechar pelo X, clique fora ou Esc pode voltar uma entrada no histórico; botão “voltar” do browser fecha o modal. |
| **Como testar** | Abrir modal → botão voltar do navegador. |

### RN-MODAL-006 — Rolagem da página de fundo

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Enquanto o modal está aberto. |
| **Pré-condições** | Modal visível. |
| **Resultado na tela** | A página atrás não rola (scroll bloqueado); ao fechar, rolagem normal volta. |
| **Como testar** | Tentar rolar a listagem com modal aberto. |

### RN-MODAL-007 — Clique fora fecha

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Clicar na área escura fora do card. |
| **Pré-condições** | Modal aberto. |
| **Resultado na tela** | Modal fecha. |
| **Como testar** | Clicar no backdrop. |

### RN-MODAL-008 — Tecla Esc fecha

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Teclado com foco na página. |
| **Pré-condições** | Modal aberto (desktop). |
| **Resultado na tela** | Esc fecha o modal. |
| **Como testar** | Pressionar Esc. |

### RN-MODAL-009 — Premiações no topo

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Obra com prêmios cadastrados. |
| **Pré-condições** | Filme/série/etc. com lista de premiações. |
| **Resultado na tela** | Bloco de prêmios acima do restante do conteúdo. |
| **Como testar** | Abrir título premiado conhecido. |

### RN-MODAL-010 — Modo edição (administrador)

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Conta com perfil administrador. |
| **Pré-condições** | Usuário admin; modal aberto. |
| **Resultado na tela** | Botão de editar visível; alterna para formulários de curadoria; visitante/usuário comum não vê editar. |
| **Como testar** | Logar como admin vs usuário normal. |

### RN-MODAL-011 — Conteúdo por tipo

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Cada tipo de mídia tem layout próprio. |
| **Pré-condições** | Abrir os quatro tipos. |
| **Resultado na tela** | Filme, série, anime e jogo mostram blocos adequados (streaming, temporadas, plataformas, etc.). |
| **Como testar** | Quatro modais distintos. |

### RN-MODAL-012 — Carregando detalhes

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Entre abrir e receber dados completos. |
| **Pré-condições** | Rede lenta. |
| **Resultado na tela** | Indicador de carregamento com mensagem fixa. |
| **Como testar** | Throttle ao abrir modal. |

### RN-MODAL-013 — Busca fecha ao abrir detalhe

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Busca global aberta; usuário abre um card. |
| **Pré-condições** | Overlay de busca visível. |
| **Resultado na tela** | Busca fecha; modal de detalhe fica por cima. |
| **Como testar** | Buscar título → clicar resultado. |

### RN-MODAL-020 — Exige login

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Adicionar ao calendário pessoal. |
| **Pré-condições** | Usuário **não** logado. |
| **Resultado na tela** | Mensagem de erro (toast); submodal de calendário fecha. |
| **Como testar** | Anônimo → tentar adicionar evento. |

### RN-MODAL-021 — Opções por tipo

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Tipos de evento variam conforme filme, anime, série ou jogo. |
| **Pré-condições** | Logado; modal de cada tipo. |
| **Resultado na tela** | Filme: estreia e/ou sessão de cinema (data, hora, local). Anime: estreia e/ou lembretes semanais. Série e jogo: estreia única. |
| **Como testar** | Percorrer fluxo calendário em filme e anime. |

### RN-MODAL-022 — Lembretes semanais (anime/série)

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Opção recorrente para anime ou série. |
| **Pré-condições** | Logado; escolher recorrência semanal. |
| **Resultado na tela** | Vários eventos espaçados (~7 dias), conforme quantidade de episódios informada ou padrão (~12). |
| **Como testar** | Criar série de lembretes e conferir quantidade. |

### RN-MODAL-023 — Estreia sem data

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Evento de lançamento sem data conhecida. |
| **Pré-condições** | Obra sem data de estreia. |
| **Resultado na tela** | Aviso; nada é salvo; modal fecha. |
| **Como testar** | Título sem data → “lançamento”. |

### RN-MODAL-024 — Ingresso de cinema

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Evento tipo sessão/ingresso. |
| **Pré-condições** | Filme com formulário de cinema preenchido. |
| **Resultado na tela** | Evento com data, hora e local informados. |
| **Como testar** | Preencher e salvar sessão. |

### RN-MODAL-025 — Confirmação de salvamento

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Eventos válidos enviados. |
| **Pré-condições** | Logado; dados completos. |
| **Resultado na tela** | Toast de sucesso ou erro após tentativa de salvar. |
| **Como testar** | Salvar evento válido e inválido. |

### RN-MODAL-026 — Botão calendário em filme futuro

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Botão “Adicionar ao Calendário” no filme. |
| **Pré-condições** | Filme com estreia **futura** vs já lançado. |
| **Resultado na tela** | Botão visível só enquanto a estreia ainda não passou. |
| **Como testar** | Filme futuro vs lançado. |

### RN-MODAL-030 — Abrir pelo card

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Atalho no card, não pelo menu genérico de lista. |
| **Pré-condições** | Card de mídia já lançada. |
| **Resultado na tela** | Abre modal de avaliação; desabilitado se a obra ainda não lançou. |
| **Como testar** | Título futuro vs lançado → botão “Já assisti/joguei”. |

### RN-MODAL-031 — Marca como assistido/jogado

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Após enviar avaliação. |
| **Pré-condições** | Logado; modal de rating aberto. |
| **Resultado na tela** | Status passa a “assistido” (inclusive para jogos). |
| **Como testar** | Avaliar jogo e conferir status na lista. |

### RN-MODAL-032 — Campos da avaliação

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Usuário escolhe sentimento e comentário opcional. |
| **Pré-condições** | Modal aberto. |
| **Resultado na tela** | Opções do tipo gostei / amei / não gostei; campo de texto opcional. |
| **Como testar** | Enviar com e sem comentário. |

### RN-MODAL-033 — Login obrigatório

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Tentativa sem sessão. |
| **Pré-condições** | Não logado. |
| **Resultado na tela** | Toast de aviso; modal fecha sem salvar. |
| **Como testar** | Anônimo → avaliar. |

### RN-MODAL-040 — Título e pôster

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Exibição prioriza textos e imagens curados quando existirem. |
| **Pré-condições** | Filme com título/pôster alternativos no catálogo. |
| **Resultado na tela** | Título e arte coerentes com curadoria do site. |
| **Como testar** | Comparar com listagem. |

### RN-MODAL-041 — Onde assistir

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Provedores de streaming e cinema. |
| **Pré-condições** | Filme com e sem provedores. |
| **Resultado na tela** | Lista de serviços (sem duplicatas óbvias); se nada conhecido, texto “Desconhecido”. |
| **Como testar** | Filme só cinema vs só streaming. |

### RN-MODAL-042 — Ingresso

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Compra ou sessões de cinema. |
| **Pré-condições** | Filme em cartaz, pré-venda ou com sessões. |
| **Resultado na tela** | Botão de ingresso conforme disponibilidade; compra habilitada só quando há sessões confirmadas. |
| **Como testar** | Filme em cartaz com/sem sessões. |

### RN-MODAL-043 — Trailer

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Vídeos disponíveis para o filme. |
| **Pré-condições** | Filme com trailer oficial e alternativos. |
| **Resultado na tela** | Prioriza trailer oficial; senão primeiro trailer; senão outro vídeo. |
| **Como testar** | Abrir filme com vários vídeos. |

### RN-MODAL-044 — Elenco → página da pessoa

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Clique em ator/equipe. |
| **Pré-condições** | Elenco listado. |
| **Resultado na tela** | Vai para página da pessoa; modal de filme fecha; ao voltar, fluxo de retorno pode reabrir o filme (quando aplicável). |
| **Como testar** | Clicar nome no elenco → voltar. |

### RN-MODAL-045 — Continuações no filme

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Abas extras no modal. |
| **Pré-condições** | Filme com sequências ou universo. |
| **Resultado na tela** | Aba “Continuação” e/ou “Universo” com obras relacionadas. |
| **Como testar** | Filme de franquia conhecida. |

### RN-MODAL-050 — Onde assistir

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Mescla fontes de plataforma de streaming. |
| **Pré-condições** | Série com vários provedores. |
| **Resultado na tela** | Lista deduplicada de serviços. |
| **Como testar** | Inspecionar bloco streaming. |

### RN-MODAL-051 — Elenco → pessoa

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Mesmo padrão do filme. |
| **Pré-condições** | Elenco presente. |
| **Resultado na tela** | Navega para a página da pessoa; ao voltar, o modal da série pode reabrir quando o site guardou esse retorno. |
| **Como testar** | Clicar ator. |

### RN-MODAL-052 — Calendário na série

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Botão explícito de calendário na UI de série. |
| **Pré-condições** | Modal de série aberto. |
| **Resultado na tela** | Não há botão dedicado igual ao de filme futuro; calendário pode existir por outros fluxos conforme produto. |
| **Como testar** | Procurar botão calendário na série. |

### RN-MODAL-053 — Continuações

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Abas de franquia/universo. |
| **Pré-condições** | Série ligada a universo compartilhado. |
| **Resultado na tela** | Abas de continuação/universo como no filme. |
| **Como testar** | Série MCU/DCEU etc. |

### RN-MODAL-060 — Sinopse legível

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Texto da sinopse sem códigos ou formatação estranha visíveis. |
| **Pré-condições** | Anime com sinopse rica ou vazia. |
| **Resultado na tela** | Texto limpo; se ausente, “(não informado)”. |
| **Como testar** | Abrir anime cuja sinopse venha com formatação na origem. |

### RN-MODAL-061 — Fixar na semana

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Usuário logado. |
| **Pré-condições** | Conta autenticada. |
| **Resultado na tela** | Botão “Fixar na semana” / “Na sua semana” alterna destaque pessoal da semana. |
| **Como testar** | Logar; fixar e desfixar. |

### RN-MODAL-062 — Plataformas

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Onde assistir o anime. |
| **Pré-condições** | Várias plataformas incl. Crunchyroll. |
| **Resultado na tela** | Lista por nome; Crunchyroll pode mostrar só ícone. |
| **Como testar** | Card de anime multi-plataforma. |

### RN-MODAL-063 — Personagem e dublador

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Elenco de voz JP e PT-BR quando existir. |
| **Pré-condições** | Anime com dublagem BR. |
| **Resultado na tela** | Alternar JP/PT-BR; link para página do dublador fecha o modal. |
| **Como testar** | Anime dublado → link dublador. |

### RN-MODAL-064 — Rankings

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Listas de popularidade/classificação. |
| **Pré-condições** | Anime com muitos rankings. |
| **Resultado na tela** | Até **6** entradas visíveis, com rótulos traduzidos. |
| **Como testar** | Anime popular em várias listas. |

### RN-MODAL-070 — Requisitos de PC

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Jogo de PC/Steam com requisitos cadastrados. |
| **Pré-condições** | Jogo PC com requisitos vs console-only. |
| **Resultado na tela** | Drawer ou bloco de requisitos mínimos/recomendados só quando aplicável. |
| **Como testar** | Jogo Steam vs exclusivo console. |

### RN-MODAL-071 — Desenvolvedora

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Nome da desenvolvedora/publicadora. |
| **Pré-condições** | Jogo com empresa cadastrada. |
| **Resultado na tela** | Link para página da desenvolvedora. |
| **Como testar** | Clicar link da empresa. |

### RN-MODAL-072 — Preço Steam

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Dados de loja quando disponíveis. |
| **Pré-condições** | Jogo com ID Steam ou preço. |
| **Resultado na tela** | Exibe preço Steam no bloco de informações quando houver dado. |
| **Como testar** | Jogo com página Steam ativa. |

### RN-MODAL-080 — Salvar alterações de filme

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Admin em modo edição. |
| **Pré-condições** | Campos curados editados. |
| **Resultado na tela** | Salvar persiste título, sinopse, pôster etc.; usuário vê dados atualizados ao reabrir. |
| **Como testar** | Admin edita título curado → salvar → reabrir. |

### RN-MODAL-081 — Cancelar edição

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Admin cancela sem salvar. |
| **Pré-condições** | Modo edição ativo. |
| **Resultado na tela** | Volta à visualização; dados na tela permanecem os anteriores ao save. |
| **Como testar** | Editar → cancelar. |

### RN-MODAL-082 — Tipos editáveis

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Admin tenta editar cada tipo. |
| **Pré-condições** | Conta admin. |
| **Resultado na tela** | Formulários para filme, série, anime e jogo; outros tipos mostram indisponível. |
| **Como testar** | Alternar tipos em modo edição. |

### RN-MODAL-090 — Carregar sob demanda

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Abas de continuação/universo. |
| **Pré-condições** | Filme/série com franquia. |
| **Resultado na tela** | Conteúdo das abas carrega ao exibir (pode haver loading breve). |
| **Como testar** | Abrir aba Continuação em filme de saga. |

### RN-MODAL-091 — Ocultar se vazio

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Obra sem sequência nem universo. |
| **Pré-condições** | Título isolado. |
| **Resultado na tela** | Nenhuma aba extra de continuações. |
| **Como testar** | Filme standalone. |

### RN-MODAL-092 — Abas dinâmicas

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Obra com sequência e/ou universo. |
| **Pré-condições** | Só sequência, só universo, ou ambos. |
| **Resultado na tela** | Aba padrão “Continuação” se houver sequência; senão “Universo”; só abas com conteúdo. |
| **Como testar** | Comparar filme sequel vs spin-off universo. |

## 09 BUSCA HEADER

**Onde o usuário está:** em qualquer página do site com o cabeçalho fixo (menu, busca, tema, conta) e/ou com a busca global aberta em tela cheia sobre o conteúdo.

### RN-BUSCA-001 — Abrir e fechar

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | A busca só aparece quando acionada pelo header. |
| **Pré-condições** | Site carregado. |
| **Resultado na tela** | Ícone de busca abre overlay; fechar remove overlay. |
| **Como testar** | Clicar lupa → fechar com X/Esc/clique fora. |

### RN-BUSCA-002 — Histórico do navegador

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Comportamento alinhado ao modal de detalhe. |
| **Pré-condições** | Busca aberta. |
| **Resultado na tela** | Botão voltar do navegador pode fechar a busca; Esc fecha. |
| **Como testar** | Abrir busca → voltar do browser. |

### RN-BUSCA-003 — Limpar ao fechar

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Ao sair da busca. |
| **Pré-condições** | Busca usada com texto e filtro. |
| **Resultado na tela** | Campo vazio, categoria “todos”, resultados zerados na próxima abertura. |
| **Como testar** | Buscar algo → fechar → reabrir. |

### RN-BUSCA-004 — Em alta sem digitar

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Overlay aberto e campo vazio. |
| **Pré-condições** | Primeira abertura ou após limpar. |
| **Resultado na tela** | Até ~20 títulos “em alta” exibidos como sugestão. |
| **Como testar** | Abrir busca sem digitar. |

### RN-BUSCA-005 — Mínimo de caracteres

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Busca efetiva por texto. |
| **Pré-condições** | Digitar 0 ou 1 caractere. |
| **Resultado na tela** | Sem busca remota; resultados de mídia zerados (permanece em alta se vazio). |
| **Como testar** | Digitar “a” e parar. |

### RN-BUSCA-006 — Espera antes de buscar

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Evita buscar a cada tecla. |
| **Pré-condições** | Digitar termo com 2+ caracteres. |
| **Resultado na tela** | Resultados atualizam ~350 ms após parar de digitar; buscas antigas não “piscam” por cima das novas. |
| **Como testar** | Digitar rápido “star wars”. |

### RN-BUSCA-007 — Filtro por tipo

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Chips ou abas de categoria. |
| **Pré-condições** | Query válida. |
| **Resultado na tela** | Opções: todos, filmes, séries, animes, jogos, pessoas; restringe o que é buscado/exibido. |
| **Como testar** | Buscar termo comum; alternar chips. |

### RN-BUSCA-008 — Resultados de mídia

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Várias mídias na mesma busca. |
| **Pré-condições** | Categoria “todos” ou tipo específico. |
| **Resultado na tela** | Filmes, séries, animes e jogos aparecem em grupos conforme filtro. |
| **Como testar** | Termo que existe em mais de um tipo. |

### RN-BUSCA-009 — Pessoas e dubladores

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Resultados de elenco. |
| **Pré-condições** | Termo com 2+ chars; categoria todos ou pessoas. |
| **Resultado na tela** | Cards de ator/equipe vs dublador com rótulos distintos. |
| **Como testar** | Buscar nome de ator e de dublador. |

### RN-BUSCA-010 — O que mostra por categoria

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Com texto digitado. |
| **Pré-condições** | Query ≥ 2; chip selecionado. |
| **Resultado na tela** | Chip “pessoas” esconde grids de mídia; demais chips focam o tipo escolhido. |
| **Como testar** | Mesmo termo em “todos” vs “filmes” vs “pessoas”. |

### RN-BUSCA-011 — Seção pessoas

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Grid dedicado. |
| **Pré-condições** | Query ≥ 2; todos ou pessoas; há matches. |
| **Resultado na tela** | Bloco de pessoas visível só nessas condições. |
| **Como testar** | Buscar sobrenome comum. |

### RN-BUSCA-012 — Contagem de resultados

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Total exibido ao usuário. |
| **Pré-condições** | Busca com resultados. |
| **Resultado na tela** | Número reflete mídias visíveis + pessoas quando a seção pessoas está ativa. |
| **Como testar** | Comparar total ao mudar chip. |

### RN-BUSCA-013 — Ações nos cards

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Favoritar e listas na busca. |
| **Pré-condições** | Logado ou anônimo. |
| **Resultado na tela** | Mesmas regras dos cards nas listagens (login exigido onde aplicável). |
| **Como testar** | Favoritar da busca logado. |

### RN-BUSCA-014 — Destaque de foco

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Preparado para navegação por teclado. |
| **Pré-condições** | Busca com vários resultados. |
| **Resultado na tela** | Um item pode receber estado visual de foco (navegação completa por teclado pode ser limitada). |
| **Como testar** | Observar foco ao interagir. |

### RN-BUSCA-015 — Estados vazios

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Sem sugestões e sem match. |
| **Pré-condições** | Sem trending e sem query; ou query sem resultado. |
| **Resultado na tela** | “Nenhum conteúdo em alta” ou mensagem citando o termo buscado. |
| **Como testar** | Termo inventado “zzzxxyy”. |

### RN-BUSCA-020 — Destino do clique

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Ator vs dublador. |
| **Pré-condições** | Resultado de pessoa na busca. |
| **Resultado na tela** | Ator/equipe → página da pessoa; dublador → página do dublador. |
| **Como testar** | Clicar cada tipo. |

### RN-BUSCA-021 — Voltar à busca

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Após abrir perfil a partir da busca. |
| **Pré-condições** | Veio da overlay de busca. |
| **Resultado na tela** | Ao voltar da página de pessoa/dublador, a busca pode reabrir (fluxo de retorno). |
| **Como testar** | Busca → pessoa → voltar. |

### RN-BUSCA-022 — Subtítulo do card

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Identificação rápida. |
| **Pré-condições** | Cards na grid de pessoas. |
| **Resultado na tela** | “Ator / equipe” ou “Dublador” conforme o caso. |
| **Como testar** | Ler subtítulos na busca. |

### RN-HEADER-001 — Links principais (desktop)

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Navegação do catálogo em telas largas. |
| **Pré-condições** | Janela larga (layout desktop). |
| **Resultado na tela** | Links visíveis: Filmes, Séries, Animes, Jogos, Continuações, Hoje. |
| **Como testar** | Redimensionar janela; clicar cada link. |

### RN-HEADER-002 — Menu “Mais”

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Atalhos secundários. |
| **Pré-condições** | Desktop. |
| **Resultado na tela** | Dropdown: Promoções, Eventos, Jogos em Alta, Premiações, Minha Lista (animes), Extensão CR. |
| **Como testar** | Abrir “Mais” e seguir um item. |

### RN-HEADER-003 — Item ativo

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Página atual destacada. |
| **Pré-condições** | Navegar entre seções. |
| **Resultado na tela** | Link da rota atual com estilo primário/negrito; “Mais” destaca se algum sublink está ativo. |
| **Como testar** | Estar em Promoções e olhar o header. |

### RN-HEADER-004 — Abrir busca

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Ícone de lupa. |
| **Pré-condições** | Qualquer página. |
| **Resultado na tela** | Abre overlay; fecha menu mobile se estiver aberto. |
| **Como testar** | Mobile: abrir menu → busca. |

### RN-HEADER-005 — Tema claro/escuro

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Alternância visual. |
| **Pré-condições** | Header visível. |
| **Resultado na tela** | Ícone alterna tema; cores do site mudam. |
| **Como testar** | Clicar sol/lua. |

### RN-HEADER-006 — Notificações

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Sino de avisos. |
| **Pré-condições** | Conta com ou sem notificações. |
| **Resultado na tela** | Abre painel/modal de notificações; badge com contagem (máx. exibição “9+”). |
| **Como testar** | Conta com notificações pendentes. |

### RN-HEADER-007 — Menu do usuário logado

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Conta autenticada. |
| **Pré-condições** | Sessão ativa. |
| **Resultado na tela** | Opções: Minha lista, Meu perfil, Sair (volta à home após sair). |
| **Como testar** | Logar → menu avatar. |

### RN-HEADER-008 — Visitante (desktop)

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Sem login em tela média/grande. |
| **Pré-condições** | Anônimo; layout desktop/tablet largo. |
| **Resultado na tela** | Links Entrar e Inscreva-se visíveis. |
| **Como testar** | Anônimo desktop. |

### RN-HEADER-009 — Menu mobile

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Telas estreitas. |
| **Pré-condições** | Layout mobile. |
| **Resultado na tela** | Hambúrguer com catálogo, “descobrir” (itens do Mais) e bloco login/lista/perfil. |
| **Como testar** | Testar em viewport mobile. |

### RN-HEADER-010 — Fechar menus

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Clique fora. |
| **Pré-condições** | Dropdown “Mais” ou menu usuário aberto. |
| **Resultado na tela** | Fecha ao clicar fora; overlay escuro fecha menu do usuário. |
| **Como testar** | Abrir dropdown → clicar página. |

### RN-HEADER-020 — Resultado abre detalhe

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Card de mídia na busca. |
| **Pré-condições** | Busca aberta com resultados. |
| **Resultado na tela** | Clicar card abre modal de detalhe e fecha a busca. |
| **Como testar** | Buscar filme → abrir card. |

### RN-HEADER-021 — Retorno da página pessoa

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Veio da busca. |
| **Pré-condições** | Fluxo busca → página pessoa → voltar. |
| **Resultado na tela** | Busca reabre quando o site guardou “voltar para busca”. |
| **Como testar** | Executar RN-BUSCA-021 + voltar do browser ou link voltar. |

## 10 MINHA LISTA

**Onde o usuário está:** área Minha Lista do site (menu do usuário, menu “Mais” ou atalhos equivalentes), exclusiva para quem entrou na conta.

### RN-LISTA-001 — Rotas exigem login

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Qualquer área sob Minha Lista. |
| **Pré-condições** | Visitante não autenticado. |
| **Resultado na tela** | Redirecionamento para tela de **Entrar**, com retorno para a página que tentou abrir após login bem-sucedido. |
| **Como testar** | Anônimo tenta abrir lista de animes pelo menu. |

### RN-LISTA-002 — Camada de UX

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | O site barra acesso visual cedo; ações sensíveis ainda dependem da sessão válida. |
| **Pré-condições** | Visitante vs logado. |
| **Resultado na tela** | Sem login não vê conteúdo da lista; logado vê dados pessoais. |
| **Como testar** | Comparar anônimo (redirect) vs logado. |

### RN-LISTA-010 — Quatro tipos de mídia

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Página inicial da Minha Lista. |
| **Pré-condições** | Usuário logado. |
| **Resultado na tela** | Cards: Animes, Filmes, Séries, Jogos; **somente Animes** leva a uma lista ativa hoje. |
| **Como testar** | Clicar Animes vs Filmes. |

### RN-LISTA-011 — “Em breve”

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Tipos ainda não disponíveis. |
| **Pré-condições** | Hub aberto. |
| **Resultado na tela** | Filmes, Séries e Jogos aparecem esmaecidos, sem link, com selo “Em breve”. |
| **Como testar** | Tentar clicar Filmes no hub. |

### RN-LISTA-012 — Mensagem orientadora

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Copy da página. |
| **Pré-condições** | Hub aberto. |
| **Resultado na tela** | Texto explicando que a organização começa pelos animes. |
| **Como testar** | Ler texto introdutório. |

### RN-LISTA-020 — Abas Catálogo vs Fila

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Barra local em subpáginas. |
| **Pré-condições** | Logado em Minha Lista. |
| **Resultado na tela** | Links “Catálogo Orbe” (hub) e “Fila Crunchyroll”; aba atual destacada. |
| **Como testar** | Alternar entre hub e fila. |

### RN-LISTA-021 — Animes fora da barra

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Acesso à lista de animes. |
| **Pré-condições** | Logado. |
| **Resultado na tela** | A lista de animes não aparece na barra lateral; acesso via hub, header “Mais” ou atalhos. |
| **Como testar** | Confirmar links da nav vs entrada por animes. |

### RN-LISTA-030 — Exige login na tela

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Renderização client-side. |
| **Pré-condições** | Sessão expirada na página. |
| **Resultado na tela** | Redireciona para Entrar; nada da lista é mostrado. |
| **Como testar** | Abrir rota futura sem cookie. |

### RN-LISTA-031 — Carregar lista pessoal

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Dados do usuário. |
| **Pré-condições** | Logado. |
| **Resultado na tela** | Grid de obras conforme filtros; falha de permissão → Entrar. |
| **Como testar** | Aplicar filtros e recarregar. |

### RN-LISTA-032 — Filtro por status

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Abas de estado. |
| **Pré-condições** | Lista com itens variados. |
| **Resultado na tela** | Abas: Tudo, Quero assistir, Acompanhando, Favoritos, Assistidos/jogados. |
| **Como testar** | Clicar cada aba. |

### RN-LISTA-033 — Filtro por tipo

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Chips de mídia. |
| **Pré-condições** | Lista mista. |
| **Resultado na tela** | Chips: todos, filme, série, anime, jogo restringem o grid. |
| **Como testar** | Filtrar só jogos. |

### RN-LISTA-034 — Itens ocultos

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Status “oculto” / não me interessa. |
| **Pré-condições** | Itens marcados como ocultos. |
| **Resultado na tela** | Não aparecem na lista visível. |
| **Como testar** | Marcar “não me interessa” e voltar à lista. |

### RN-LISTA-035 — Status ao vivo

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Alterações recentes nos cards. |
| **Pré-condições** | Mudar status em outra tela sem recarregar. |
| **Resultado na tela** | Lista reflete ação mais recente do usuário sobre o card. |
| **Como testar** | Favoritar na home → abrir minha lista. |

### RN-LISTA-036 — Aviso de itens faltantes

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Obras salvas fora do catálogo atual. |
| **Pré-condições** | Conta com referências antigas. |
| **Resultado na tela** | Mensagem com quantidade de itens não encontrados no catálogo. |
| **Como testar** | Conta de teste com `missingCount` se existir. |

### RN-LISTA-037 — Listas vazias

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Sem itens ou filtro sem match. |
| **Pré-condições** | Lista vazia vs filtros restritivos. |
| **Resultado na tela** | Mensagens diferentes para “nada na lista” vs “nenhum item neste filtro”. |
| **Como testar** | Zerar filtros vs filtro impossível. |

### RN-LISTA-040 — Visitante

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Fallback se a página carregar sem sessão. |
| **Pré-condições** | Usuário não logado (cenário raro nesta rota). |
| **Resultado na tela** | CTA “Entrar no Orbe”; em fluxo normal o redirect de RN-LISTA-001 ocorre antes. |
| **Como testar** | Validar RN-LISTA-001; esta regra cobre mensagem na página se aplicável. |

### RN-LISTA-041 — Carregar ao abrir

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Lista de animes pessoal. |
| **Pré-condições** | Logado. |
| **Resultado na tela** | Ao entrar na página, lista e estados carregam automaticamente. |
| **Como testar** | Abrir animes logado. |

### RN-LISTA-042 — Última sincronização

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Informação de frescor dos dados. |
| **Pré-condições** | Conta com/sem sync prévia. |
| **Resultado na tela** | Data/hora da última sync ou texto de nunca sincronizado. |
| **Como testar** | Conta nova vs conta com extensão. |

### RN-LISTA-043 — Ações da barra

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Ferramentas no topo. |
| **Pré-condições** | Página animes. |
| **Resultado na tela** | Botões: atualizar lista, importar backup de arquivo, importar demo (ambiente QA). |
| **Como testar** | Clicar atualizar; importar arquivo demo se disponível. |

### RN-LISTA-044 — Banners informativos

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Topo da página. |
| **Pré-condições** | Página carregada. |
| **Resultado na tela** | Banners de offline e opt-in de notificações push quando aplicável. |
| **Como testar** | Simular offline; ver banner. |

### RN-LISTA-045 — Painel da extensão

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Integração Crunchyroll. |
| **Pré-condições** | Página animes. |
| **Resultado na tela** | Bloco com status da extensão do navegador e opção de verificar de novo. |
| **Como testar** | Com/sem extensão instalada. |

### RN-LISTA-046 — Filtros da watchlist

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Abas locais. |
| **Pré-condições** | Lista com vários estados. |
| **Resultado na tela** | Abas: todos, em andamento (continuar/seguir), começar, terminado, dublagem PT-BR; contagens por aba. |
| **Como testar** | Alternar abas e contar itens. |

### RN-LISTA-047 — Lista vazia orientada

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Sem animes na lista. |
| **Pré-condições** | Zero itens. |
| **Resultado na tela** | Mensagem e CTAs diferentes se extensão instalada (conectar) vs não instalada (instalar). |
| **Como testar** | Conta vazia com/sem extensão. |

### RN-LISTA-048 — Remover item

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Exclusão de um anime. |
| **Pré-condições** | Item na lista. |
| **Resultado na tela** | Diálogo de confirmação do navegador antes de remover. |
| **Como testar** | Remover um título → cancelar e confirmar. |

### RN-LISTA-049 — Editar progresso

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Temporada/episódio assistido. |
| **Pré-condições** | Item com progresso. |
| **Resultado na tela** | Modal de edição; salvar atualiza card. |
| **Como testar** | Editar S2 E5 → salvar. |

### RN-LISTA-050 — Feedback de sync/import

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Após atualizar ou importar. |
| **Pré-condições** | Operação concluída. |
| **Resultado na tela** | Banner verde ou vermelho com opção fechar. |
| **Como testar** | Sync com sucesso e com erro. |

### RN-LISTA-051 — Modo offline

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Sem rede após já ter dados. |
| **Pré-condições** | Lista já carregada uma vez. |
| **Resultado na tela** | Itens anteriores permanecem visíveis offline quando possível. |
| **Como testar** | Carregar → offline → recarregar. |

### RN-LISTA-052 — Backup antigo

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Import de arquivo legado. |
| **Pré-condições** | Arquivo backup formato antigo. |
| **Resultado na tela** | Campos normalizados (identificadores e status antigos mapeados) após import. |
| **Como testar** | Importar backup legado de QA. |

### RN-LISTA-053 — Adicionar do catálogo

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Inclusão manual. |
| **Pré-condições** | Logado. |
| **Resultado na tela** | Fluxo “adicionar do catálogo Orbe” refresca a lista após incluir. |
| **Como testar** | Adicionar anime pelo catálogo interno. |

### RN-LISTA-060 — Exige login

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Mesmo padrão das demais rotas. |
| **Pré-condições** | Anônimo. |
| **Resultado na tela** | Redirect para Entrar. |
| **Como testar** | Abrir fila sem login. |

### RN-LISTA-061 — Ordem da fila

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Prioridade de assistir. |
| **Pré-condições** | Logado com fila populada. |
| **Resultado na tela** | Ordem: **Continuar** → **A seguir** → **Começar** (conforme descrição no cabeçalho da página). |
| **Como testar** | Validar ordem dos blocos/linhas. |

### RN-LISTA-062 — Estados especiais

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Espera de dublagem ou episódio. |
| **Pré-condições** | Itens nesses estados. |
| **Resultado na tela** | Rótulos em destaque âmbar para “esperando dublagem” e “esperando episódio”. |
| **Como testar** | Itens de teste nesses estados. |

### RN-LISTA-063 — Dicas de catálogo CR

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Texto auxiliar por linha. |
| **Pré-condições** | Item na fila. |
| **Resultado na tela** | Resumo de episódios no ar, dublados PT-BR e fronteira sub/dub quando existir. |
| **Como testar** | Ler hint sob um anime. |

### RN-LISTA-064 — Trilha de áudio

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Informação de legenda vs dublagem. |
| **Pré-condições** | Item com metadados. |
| **Resultado na tela** | Linha com temporada/ep e “Trilha PT-BR” ou “Leg/sub”. |
| **Como testar** | Comparar anime dub vs sub. |

### RN-LISTA-065 — Abrir detalhe

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Clique na linha. |
| **Pré-condições** | Anime ligado ao catálogo Orbe. |
| **Resultado na tela** | Abre modal de detalhe do anime. |
| **Como testar** | Clicar linha com anime resolvido. |

### RN-LISTA-066 — Ajuda extensão

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Orientação na página. |
| **Pré-condições** | Página fila. |
| **Resultado na tela** | Link para watchlist Crunchyroll e nota sobre filtro de dublagem PT-BR no popup da extensão. |
| **Como testar** | Ler bloco de instruções. |

### RN-LISTA-070 — Login para interagir

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Favoritar, listas, etc. |
| **Pré-condições** | Anônimo em tela que mostra cards (ex. após bug). |
| **Resultado na tela** | Toast pedindo login; ação não conclui. |
| **Como testar** | Deslogar e tentar favoritar na lista. |

### RN-LISTA-071 — Significado dos status

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Menu do card. |
| **Pré-condições** | Logado. |
| **Resultado na tela** | Favorito, quero assistir, acompanhando; “não me interessa” oculta da lista principal. |
| **Como testar** | Aplicar cada status. |

### RN-LISTA-072 — Acompanhando só anime/série

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Opção no menu. |
| **Pré-condições** | Card de filme vs anime. |
| **Resultado na tela** | “Acompanhando” oferecido para anime e série; não para filme/jogo da mesma forma. |
| **Como testar** | Abrir menu em filme e anime. |

## 11 AUTH PERFIL

**Onde o usuário está:** telas de Entrar, Inscreva-se, Meu perfil e Configurações, além do comportamento global de sessão em todo o site.

### RN-AUTH-001 — Campos obrigatórios

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Formulário de login. |
| **Pré-condições** | Página Entrar aberta. |
| **Resultado na tela** | Email e senha exigidos pelo navegador antes de enviar. |
| **Como testar** | Enviar vazio → validação nativa. |

### RN-AUTH-002 — Sucesso

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Credenciais válidas. |
| **Pré-condições** | Conta existente. |
| **Resultado na tela** | Usuário entra; redireciona para página anterior segura ou home; nome aparece no header. |
| **Como testar** | Login OK vindo de Minha Lista. |

### RN-AUTH-003 — Erro genérico

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Credenciais inválidas ou falha de rede. |
| **Pré-condições** | Login falha. |
| **Resultado na tela** | Toast “Ocorreu um erro ao tentar fazer login” (ou equivalente). |
| **Como testar** | Senha errada. |

### RN-AUTH-004 — Redirect seguro

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Parâmetro de retorno na URL após login. |
| **Pré-condições** | Link de Entrar vindo de página protegida. |
| **Resultado na tela** | Só redireciona para páginas internas do site; não envia o usuário para sites externos. |
| **Como testar** | Após login, confirmar retorno à Minha Lista; tentar manipular URL de retorno externo se QA tiver cenário. |

### RN-AUTH-005 — Mostrar senha

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Acessibilidade. |
| **Pré-condições** | Campo senha. |
| **Resultado na tela** | Ícone alterna texto visível/oculto. |
| **Como testar** | Clicar olho no campo senha. |

### RN-AUTH-006 — Ir para cadastro

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Rodapé. |
| **Pré-condições** | Página login. |
| **Resultado na tela** | Link para Inscreva-se. |
| **Como testar** | Clicar cadastro. |

### RN-AUTH-010 — Senha mínima

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Regra de segurança. |
| **Pré-condições** | Cadastro novo. |
| **Resultado na tela** | Senha com menos de **8** caracteres bloqueada com aviso antes de enviar. |
| **Como testar** | Senha de 7 chars. |

### RN-AUTH-011 — Confirmar senha

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Dois campos devem coincidir. |
| **Pré-condições** | Senhas diferentes. |
| **Resultado na tela** | Toast de erro; formulário não envia. |
| **Como testar** | Senha ≠ confirmar. |

### RN-AUTH-012 — Campos obrigatórios

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Nome, email, senhas. |
| **Pré-condições** | Formulário. |
| **Resultado na tela** | Nome, email e senhas required. |
| **Como testar** | Enviar incompleto. |

### RN-AUTH-013 — Sucesso

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Cadastro aceito. |
| **Pré-condições** | Email novo. |
| **Resultado na tela** | Mesmo fluxo pós-login: sessão ativa + redirect seguro. |
| **Como testar** | Registrar conta QA. |

### RN-AUTH-014 — Erro do servidor

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Email duplicado etc. |
| **Pré-condições** | Cadastro recusado. |
| **Resultado na tela** | Toast com mensagem retornada ou genérica. |
| **Como testar** | Registrar email já usado. |

### RN-AUTH-020 — Restaurar ao abrir o site

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Usuário já logou antes. |
| **Pré-condições** | Fechar aba e reabrir. |
| **Resultado na tela** | Continua logado se sessão válida; senão volta anônimo. |
| **Como testar** | Login → fechar browser → reabrir. |

### RN-AUTH-021 — Dados após login

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Conteúdo personalizado. |
| **Pré-condições** | Login bem-sucedido. |
| **Resultado na tela** | Notificações, interações nos cards e pins de anime da semana carregam. |
| **Como testar** | Ver badge notificação e favoritos. |

### RN-AUTH-022 — Preferências lembradas

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Tema e interações locais. |
| **Pré-condições** | Usuário alterou tema ou favoritos. |
| **Resultado na tela** | Tema, favoritos e opção de scroll rápido persistem entre visitas no mesmo navegador. |
| **Como testar** | Mudar tema → F5. |

### RN-AUTH-023 — Sair

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Logout pelo menu. |
| **Pré-condições** | Logado. |
| **Resultado na tela** | Limpa usuário, notificações, interações e pins; volta estado de visitante. |
| **Como testar** | Sair → header sem avatar. |

### RN-AUTH-024 — Sessão no navegador

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Cookie de sessão. |
| **Pré-condições** | Login em produção. |
| **Resultado na tela** | Sessão mantida por vários dias no mesmo dispositivo (comportamento de “permanecer logado”). |
| **Como testar** | Permanecer logado overnight (QA). |

### RN-AUTH-025 — Tipo de conta

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Papel do usuário. |
| **Pré-condições** | Admin vs explorador. |
| **Resultado na tela** | Admin vê ferramentas extras (ex. edição no modal, links no perfil); demais usuários não. |
| **Como testar** | Comparar contas. |

### RN-AUTH-030 — Só para logados

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Proteção da rota. |
| **Pré-condições** | Anônimo ou sessão inválida. |
| **Resultado na tela** | Redirect para Entrar; falha ao carregar perfil também redireciona. |
| **Como testar** | Abrir Meu perfil sem login. |

### RN-AUTH-031 — Dados básicos

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Identidade na página. |
| **Pré-condições** | Perfil carregado. |
| **Resultado na tela** | Nome, email, papel (Administrador / Explorador); foto só se URL de avatar for de origem permitida. |
| **Como testar** | Perfil com avatar externo válido/inválido. |

### RN-AUTH-032 — Bio

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Texto sobre o usuário. |
| **Pré-condições** | Com/sem bio salva. |
| **Resultado na tela** | Bio visível ou placeholder convidando a editar em Configurações. |
| **Como testar** | Conta sem bio. |

### RN-AUTH-033 — Bloco conta

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Metadados. |
| **Pré-condições** | Perfil OK. |
| **Resultado na tela** | Email, “membro desde” em pt-BR, visibilidade Público/Privado. |
| **Como testar** | Ler seção conta. |

### RN-AUTH-034 — Atalhos

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Navegação rápida. |
| **Pré-condições** | Perfil aberto. |
| **Resultado na tela** | Links para Minha lista e Configurações. |
| **Como testar** | Clicar atalhos. |

### RN-AUTH-035 — Ferramentas admin

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Conta administrador. |
| **Pré-condições** | Role admin. |
| **Resultado na tela** | Link para logs de sincronização e ação para baixar log de sync (ferramenta temporária de QA/operações). |
| **Como testar** | Logar admin; usuário comum não vê. |

### RN-AUTH-040 — Só para logados

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Mesmo padrão do perfil. |
| **Pré-condições** | Anônimo. |
| **Resultado na tela** | Redirect Entrar se perfil não carrega. |
| **Como testar** | Abrir Configurações sem login. |

### RN-AUTH-041 — Campos editáveis

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Formulário. |
| **Pré-condições** | Logado. |
| **Resultado na tela** | Nome, URL do avatar, bio, interruptor perfil público (padrão público se nunca definido). |
| **Como testar** | Alterar nome e salvar. |

### RN-AUTH-042 — Salvar perfil

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Envio do formulário. |
| **Pré-condições** | Dados válidos. |
| **Resultado na tela** | Mensagem inline de sucesso ou erro; perfil reflete mudanças. |
| **Como testar** | Salvar bio nova → ver perfil. |

### RN-AUTH-043 — Texto de privacidade

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Toggle perfil público. |
| **Pré-condições** | Configurações abertas. |
| **Resultado na tela** | Explica que perfil público afeta visibilidade de lista/favoritos para outros. |
| **Como testar** | Ler copy do toggle. |

### RN-AUTH-044 — Sem troca de senha aqui

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Escopo da página. |
| **Pré-condições** | Configurações. |
| **Resultado na tela** | Não há campos de senha ou email nesta tela. |
| **Como testar** | Confirmar ausência de “alterar senha”. |

### RN-AUTH-050 — Minha lista no menu

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Usuário logado. |
| **Pré-condições** | Header desktop/mobile. |
| **Resultado na tela** | Entrada para Minha lista no menu do usuário e no mobile. |
| **Como testar** | Abrir menu avatar. |

### RN-AUTH-051 — Perfil e configurações

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Navegação. |
| **Pré-condições** | Logado. |
| **Resultado na tela** | Perfil no menu; Configurações via perfil ou botão dedicado. |
| **Como testar** | Ir perfil → configurações. |

## 12 OUTRAS TELAS

**Onde o usuário está:** páginas de descoberta e créditos acessadas pelo menu — Continuações, Premiações, Eventos, Pessoa, Dublador e Desenvolvedora — além de abas de continuação dentro do modal de filme/série.

### RN-CONT-001 — Lista inicial

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Página aberta sem detalhe selecionado. |
| **Pré-condições** | Acesso pelo menu Continuações. |
| **Resultado na tela** | Carrega listas de **Sagas** e **Universos**; falha de rede → listas vazias sem quebrar a página. |
| **Como testar** | Abrir Continuações offline após visita anterior. |

### RN-CONT-002 — Detalhe de saga

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Saga selecionada na navegação. |
| **Pré-condições** | Saga válida no catálogo. |
| **Resultado na tela** | Mostra timeline da saga; limpa seleção de universo. |
| **Como testar** | Clicar card de saga. |

### RN-CONT-003 — Detalhe de universo

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Universo selecionado. |
| **Pré-condições** | Universo válido. |
| **Resultado na tela** | Mostra universo; força visualização de universos; limpa saga. |
| **Como testar** | Link de universo cinematográfico. |

### RN-CONT-004 — Abas na listagem

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Sem detalhe aberto. |
| **Pré-condições** | Lista carregada. |
| **Resultado na tela** | Alternar “Sagas” vs “Universos cinematográficos”. |
| **Como testar** | Clicar abas. |

### RN-CONT-005 — Card de saga

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Preview na grade. |
| **Pré-condições** | Várias sagas. |
| **Resultado na tela** | Link para detalhe; mostra quantidade de filmes e preview de títulos. |
| **Como testar** | Ler card antes de entrar. |

### RN-CONT-006 — Card de universo

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Preview na grade. |
| **Pré-condições** | Universos com ordem. |
| **Resultado na tela** | Link para detalhe; preview numérico quando há ordem de obras. |
| **Como testar** | Universo com filmes numerados. |

### RN-CONT-007 — Timeline da saga

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Detalhe aberto. |
| **Pré-condições** | Saga com filmes. |
| **Resultado na tela** | Linha do tempo cronológica; texto introdutório da saga se existir. |
| **Como testar** | Abrir saga longa (ex. franquia). |

### RN-CONT-008 — Detalhe do universo

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Visão mista. |
| **Pré-condições** | Universo com filmes e séries. |
| **Resultado na tela** | Contagens, faixa de anos, descrição, timeline filme+série. |
| **Como testar** | Universo compartilhado conhecido. |

### RN-CONT-009 — Abrir obra

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Clique em item da timeline. |
| **Pré-condições** | Item filme ou série. |
| **Resultado na tela** | Abre modal de detalhe com informações mínimas até carregar o restante. |
| **Como testar** | Clicar filme na timeline. |

### RN-CONT-010 — Sem conteúdo

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Catálogo vazio. |
| **Pré-condições** | Zero sagas/universos. |
| **Resultado na tela** | Mensagem orientando que dados podem depender de sincronização do catálogo. |
| **Como testar** | Ambiente vazio. |

### RN-CONT-011 — Voltar à lista

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Do detalhe. |
| **Pré-condições** | Detalhe de saga ou universo. |
| **Resultado na tela** | Link “Todas as sagas” / “Todos os universos” retorna à listagem geral. |
| **Como testar** | Voltar pelo link. |

### RN-CONT-020 — Abas no modal

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Detalhe de filme/série com franquia. |
| **Pré-condições** | Modal aberto. |
| **Resultado na tela** | Mesmas regras das abas RN-MODAL-090 a RN-MODAL-092 (continuação/universo sob demanda). |
| **Como testar** | Abrir filme de saga → abas. |

### RN-DEV-001 — Empresa inválida

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Endereço ou identificador incorreto. |
| **Pré-condições** | Link quebrado ou id inexistente. |
| **Resultado na tela** | Mensagem de erro sem carregamento infinito. |
| **Como testar** | Abrir link de desenvolvedora inválido. |

### RN-DEV-002 — Lista paginada

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Catálogo de jogos da empresa. |
| **Pré-condições** | Empresa com muitos jogos. |
| **Resultado na tela** | Primeira leva (~24 jogos); indicador de mais páginas. |
| **Como testar** | Empresa grande (Nintendo etc.). |

### RN-DEV-003 — Scroll infinito

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Usuário rola até o fim. |
| **Pré-condições** | `hasMore` verdadeiro. |
| **Resultado na tela** | Próxima página carrega automaticamente ao aproximar do fim (~200px). |
| **Como testar** | Rolar até carregar 2ª página. |

### RN-DEV-004 — Título da página

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Nome da empresa. |
| **Pré-condições** | Resposta com nome. |
| **Resultado na tela** | Cabeçalho com nome da desenvolvedora ou fallback “Desenvolvedora”. |
| **Como testar** | Empresa sem nome na resposta. |

### RN-DEV-005 — Texto informativo

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Origem dos dados. |
| **Pré-condições** | Página aberta. |
| **Resultado na tela** | Copy informa a fonte do catálogo de jogos e que rolar carrega mais títulos. |
| **Como testar** | Ler subtítulo. |

### RN-DEV-006 — Grid de jogos

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Cards na página. |
| **Pré-condições** | Jogos listados. |
| **Resultado na tela** | Cada jogo é card padrão com ações de lista/favorito. |
| **Como testar** | Favoritar jogo da grid. |

### RN-DEV-007 — Entrada pelo modal

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Link no detalhe do jogo. |
| **Pré-condições** | Modal de jogo aberto. |
| **Resultado na tela** | Link da desenvolvedora leva a esta página. |
| **Como testar** | Jogo → link dev → validar URL. |

### RN-DUB-001 — Carregar créditos

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Página do dublador. |
| **Pré-condições** | ID válido. |
| **Resultado na tela** | Nome, foto e obras dubladas. |
| **Como testar** | Dublador conhecido PT-BR. |

### RN-DUB-002 — Rótulo de idioma

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Contexto da carreira. |
| **Pré-condições** | Metadado de idioma. |
| **Resultado na tela** | Português → “Dublagem em português”; japonês → “Voz original”; outro → texto genérico. |
| **Como testar** | Comparar dublador BR vs seiyuu. |

### RN-DUB-003 — Tipos na filmografia

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Obras dubladas. |
| **Pré-condições** | Créditos variados. |
| **Resultado na tela** | Pode incluir filme, série, anime e jogo com rótulo de tipo. |
| **Como testar** | Grid com anime e filme. |

### RN-DUB-004 — Personagem no card

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Papel dublado. |
| **Pré-condições** | Crédito com personagem. |
| **Resultado na tela** | Nome do personagem no card/poster. |
| **Como testar** | Card “como {personagem}”. |

### RN-DUB-005 — Abrir detalhe

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Clique na obra. |
| **Pré-condições** | Item na grid. |
| **Resultado na tela** | Modal abre para o tipo correto (filme, série, anime, jogo). |
| **Como testar** | Clicar anime dublado. |

### RN-DUB-006 — Voltar para busca

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Contexto de busca. |
| **Pré-condições** | Veio da overlay de busca. |
| **Resultado na tela** | Voltar reabre busca; **não** reabre modal de filme como na página pessoa. |
| **Como testar** | Busca → dublador → voltar. |

### RN-EVT-001 — Ano padrão

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Seletor no topo. |
| **Pré-condições** | Página aberta. |
| **Resultado na tela** | Ano atual selecionado; opções = ano atual e cinco anteriores. |
| **Como testar** | Abrir eventos em setembro/2026. |

### RN-EVT-002 — Carregar resumo

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Troca de ano. |
| **Pré-condições** | Ano escolhido. |
| **Resultado na tela** | Lista de eventos do ano; erro → estado de falha sem dados. |
| **Como testar** | Trocar ano; simular erro. |

### RN-EVT-003 — Só eventos com jogos

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Relevância. |
| **Pré-condições** | Ano com eventos vazios e cheios. |
| **Resultado na tela** | Evento só aparece se tiver pelo menos um jogo associado. |
| **Como testar** | Ano com evento “sem jogos” oculto. |

### RN-EVT-004 — Contador

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Badge no cabeçalho da lista. |
| **Pré-condições** | Ano com eventos relevantes. |
| **Resultado na tela** | Número de eventos exibidos naquele ano. |
| **Como testar** | Contar cards vs badge. |

### RN-EVT-005 — Loading e erro

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Estados intermediários. |
| **Pré-condições** | Rede lenta ou falha. |
| **Resultado na tela** | Esqueletos durante carga; mensagem/CTA em falha. |
| **Como testar** | Throttle e offline. |

### RN-EVT-006 — Ano vazio

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Nenhum evento relevante. |
| **Pré-condições** | Ano sem jogos em eventos. |
| **Resultado na tela** | Sugestão para escolher outro ano. |
| **Como testar** | Selecionar ano antigo vazio. |

### RN-EVT-007 — Jogos por evento

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Card de evento. |
| **Pré-condições** | Evento com jogos. |
| **Resultado na tela** | Cada evento mostra jogos em cards com interações do usuário. |
| **Como testar** | Expandir/rolar evento E3 etc. |

### RN-PERS-001 — Carregar créditos

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Página da pessoa. |
| **Pré-condições** | ID válido. |
| **Resultado na tela** | Nome, foto, biografia e filmografia carregam. |
| **Como testar** | Abrir ator conhecido. |

### RN-PERS-002 — Erro e loading

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | ID inválido ou falha. |
| **Pré-condições** | Pessoa inexistente. |
| **Resultado na tela** | Mensagem de erro ou texto de carregamento. |
| **Como testar** | URL com id inválido. |

### RN-PERS-003 — Perfil resumido

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Dados básicos. |
| **Pré-condições** | Pessoa com foto e bio longa. |
| **Resultado na tela** | Nome, foto, biografia truncada (~6 linhas). |
| **Como testar** | Bio longa → “ver mais” se existir ou clamp. |

### RN-PERS-004 — Filmografia

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Grid de obras. |
| **Pré-condições** | Créditos filmes e séries. |
| **Resultado na tela** | Cards clicáveis; personagem opcional exibido. |
| **Como testar** | Clicar filme vs série. |

### RN-PERS-005 — Abrir detalhe da obra

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Clique na filmografia. |
| **Pré-condições** | Item listado. |
| **Resultado na tela** | Modal de detalhe abre para filme ou série. |
| **Como testar** | Clicar poster na grid. |

### RN-PERS-006 — Voltar para busca

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Veio da busca global. |
| **Pré-condições** | Fluxo busca → pessoa. |
| **Resultado na tela** | Voltar reabre busca quando aplicável. |
| **Como testar** | RN-HEADER-021 / RN-BUSCA-021. |

### RN-PERS-007 — Voltar para modal

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Veio do elenco de filme/série. |
| **Pré-condições** | Retorno guardado pelo site. |
| **Resultado na tela** | Voltar reabre modal do filme/série anterior. |
| **Como testar** | Filme → elenco → voltar. |

### RN-PERS-008 — Voltar genérico

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Sem contexto salvo. |
| **Pré-condições** | Entrada direta na URL. |
| **Resultado na tela** | Botão voltar do browser ou fallback para home. |
| **Como testar** | Abrir pessoa em nova aba → voltar. |

### RN-PREM-001 — Modo destaque inicial

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Filtros no padrão “todos”. |
| **Pré-condições** | Primeira visita à página. |
| **Resultado na tela** | Blocos com destaques da **última edição** por categoria. |
| **Como testar** | Abrir prêmios sem mexer filtros. |

### RN-PREM-002 — Modo filtrado

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Qualquer filtro alterado. |
| **Pré-condições** | Tipo, prêmio ou ano ≠ todos. |
| **Resultado na tela** | Lista paginada (48 itens por página) substitui visão de destaques. |
| **Como testar** | Escolher ano específico. |

### RN-PREM-003 — Opções de filtro

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Carregamento da página. |
| **Pré-condições** | Página montada. |
| **Resultado na tela** | Listas de nomes de prêmios e anos disponíveis nos seletores. |
| **Como testar** | Abrir dropdowns de filtro. |

### RN-PREM-004 — Reset de página

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Mudança de filtro. |
| **Pré-condições** | Estava na página 2+. |
| **Resultado na tela** | Volta para página 1 ao alterar filtro. |
| **Como testar** | Paginar → mudar ano. |

### RN-PREM-005 — Seções por tipo

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Modo destaque. |
| **Pré-condições** | Filtro tipo = todos. |
| **Resultado na tela** | Até quatro blocos: filmes, séries, animes, jogos; filtrar tipo reduz a um bloco. |
| **Como testar** | Filtrar só animes. |

### RN-PREM-006 — Ver todos da premiação

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Botão em destaque. |
| **Pré-condições** | Card de destaque visível. |
| **Resultado na tela** | Aplica filtros com nome/ano daquele prêmio e tipo da seção. |
| **Como testar** | Clicar “ver todos” em um destaque. |

### RN-PREM-007 — Paginação

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Modo filtrado. |
| **Pré-condições** | Muitos resultados. |
| **Resultado na tela** | Anterior/próxima desabilitadas nos limites; texto “Página X de Y”. |
| **Como testar** | Navegar páginas. |

### RN-PREM-008 — Cards interativos

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Obras indicadas. |
| **Pré-condições** | Logado/anônimo. |
| **Resultado na tela** | Cards com mesmas ações de favorito/lista das outras páginas. |
| **Como testar** | Favoritar indicado logado. |

### RN-PREM-009 — Nenhum resultado

| Campo | Conteúdo |
| --- | --- |
| **Descrição** | Filtro impossível. |
| **Pré-condições** | Zero prêmios no critério. |
| **Resultado na tela** | Mensagem pedindo ajustar filtros. |
| **Como testar** | Ano + prêmio sem combinação. |
