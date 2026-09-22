# Checklist auditor TL — execução dos 511 Feliz (produção)

**Ambiente:** https://orbe-seven.vercel.app  
**Pacote:** `CT-*-F` · **Evidências:** `execucao/prod/*.json` + `relatorio-feliz-producao.csv`

## 1. Cobertura

- [ ] `merge-execucao-producao.py` reporta **511** linhas
- [ ] Cada arquivo `01-HOME` … `12-OUTRAS-TELAS` possui JSON em `execucao/prod/`
- [ ] Nenhum `ID_Cenario` duplicado

## 2. Qualidade da execução (QA sênior)

Para amostra mínima **5%** (26 cenários), sorteio estratificado por tela:

- [ ] Passos do cenário Feliz foram seguidos (não só smoke de URL)
- [ ] `Evidencia` descreve o que foi visto na tela
- [ ] `BLOQUEADO` tem pré-condição impossível **documentada** (login, dado de catálogo)
- [ ] `FAIL` tem passo que divergiu do `Resultado_Esperado`

## 3. Runner automático (transparência)

Parte da rodada usou `executar-feliz-lote.py` (Playwright headless, usuário anônimo):

- [ ] TL aceita que muitos `BLOQUEADO` = dependência de dado/login — **reexecução manual** obrigatória antes de release
- [ ] TL reclassifica `FAIL` de keyword heurística após revisão (`AUDITORIA-AMOSTRA-FAIL.md`)

## 4. Assinatura

| Campo | Valor |
| --- | --- |
| TL QA | |
| Data | |
| Reexecuções manuais pendentes (qtd) | |
| FAIL confirmados em produção (qtd) | |
