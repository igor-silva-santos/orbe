#!/usr/bin/env python3
"""Gera pacote NOVO: 3 camadas por regra (Feliz + Negativo + Exploratório).

Não altera cenarios-teste.csv nem cenarios-teste.md (baseline 511).
"""

from __future__ import annotations

import csv
import re
from collections import defaultdict
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RULES_CSV = ROOT / "regras-negocio-qa.csv"
OUT_DIR = ROOT / "cenarios-camadas"
OUT_CSV = OUT_DIR / "cenarios-teste-camadas.csv"
OUT_MD = OUT_DIR / "cenarios-teste-camadas.md"
GEN_DIR = OUT_DIR / "generated"
PACOTE = "camadas-v1"
DATA = date.today().isoformat()


def tela_curta(arquivo: str) -> str:
    mapping = {
        "01-HOME.md": "Página inicial",
        "02-FILMES.md": "Filmes",
        "03-SERIES.md": "Séries",
        "04-ANIMES.md": "Animes",
        "05-JOGOS.md": "Jogos",
        "06-PROMOCOES.md": "Promoções",
        "07-HOJE.md": "Hoje",
        "08-MODAIS.md": "Modais",
        "09-BUSCA-HEADER.md": "Busca e cabeçalho",
        "10-MINHA-LISTA.md": "Minha lista",
        "11-AUTH-PERFIL.md": "Entrar e perfil",
        "12-OUTRAS-TELAS.md": "Outras telas",
    }
    return mapping.get(arquivo, arquivo)


def expand_passos_feliz(como_testar: str, tela: str, nome: str) -> str:
    base = (como_testar or "").strip()
    if not base or base in ("—", "-"):
        base = f"Validar na tela o comportamento: {nome}."
    parts = re.split(r"\s*;\s*|\.\s+(?=[A-ZÁÉÍÓÚ])", base)
    parts = [p.strip().rstrip(".") for p in parts if p.strip()]
    steps = [f"1. Abrir o site e navegar até **{tela}**."]
    for i, p in enumerate(parts, start=2):
        if len(p) < 3:
            continue
        steps.append(f"{i}. {p[0].upper() + p[1:] if p else p}.")
    steps.append(f"{len(steps) + 1}. Confirmar na tela o **resultado feliz** descrito na regra.")
    return "\n".join(steps)


def infer_conta(pre: str, desc: str, camada: str) -> str:
    text = f"{pre} {desc}".lower()
    neg_flip = camada == "Negativo"
    needs_login = any(
        x in text
        for x in ("logado", "autentic", "minha lista", "conta", "perfil", "sessão")
    )
    needs_anon = any(x in text for x in ("visitante", "anônimo", "não logado", "sem login"))
    if needs_anon and not needs_login:
        if neg_flip:
            return "Homologação/produção; usuário **logado** (inverso do feliz)"
        return "Homologação/produção; usuário **não** logado"
    if needs_login:
        if neg_flip and "não" not in text:
            return "Homologação/produção; usuário **não** logado (inverso do feliz)"
        return "Homologação/produção; usuário **logado**"
    if "admin" in text:
        return "Homologação; conta **administrador**"
    if neg_flip:
        return "Homologação/produção; preparar **pré-condição oposta** à do caminho feliz"
    return "Homologação/produção; conforme pré-condição da regra (caminho feliz)"


def build_negativo(pre: str, desc: str, resultado: str, nome: str, tela: str) -> tuple[str, str, str]:
    """Retorna título, passos, resultado esperado para camada negativa."""
    blob = f"{nome} {desc} {pre} {resultado}".lower()
    titulo = f"Negativo: {nome} — condição não atendida ou perfil inverso"

    if "mínimo" in blob or "caracter" in blob:
        titulo = f"Negativo: {nome} — abaixo do limite"
        passos = (
            f"1. Abrir o site e navegar até **{tela}**.\n"
            "2. Reproduzir a ação com valor **abaixo do mínimo** (ex.: menos caracteres, nota/duração insuficiente).\n"
            "3. Observar bloqueio, ausência do efeito ou mensagem de validação.\n"
            "4. Confirmar que o sistema **não** aplica o benefício do caminho feliz."
        )
        esperado = (
            "Comportamento de bloqueio ou ausência do resultado feliz: validação visível, "
            "item oculto ou ação não executada — sem erro de interface."
        )
        return titulo, passos, esperado

    if any(x in blob for x in ("só aparece", "somente", "apenas", "só para", "só quando")):
        titulo = f"Negativo: {nome} — sem a condição exigida"
        passos = (
            f"1. Abrir o site e navegar até **{tela}**.\n"
            "2. Usar usuário, dado ou estado **sem** a condição da regra (ex.: não logado se a regra exige login).\n"
            "3. Repetir a mesma ação do caminho feliz.\n"
            "4. Verificar que o elemento/comportamento **não** aparece ou permanece desabilitado."
        )
        esperado = "O resultado feliz **não** ocorre; a tela permanece coerente (sem vazamento indevido)."
        return titulo, passos, esperado

    if any(x in blob for x in ("falha", "indisponível", "erro", "vazio")):
        titulo = f"Negativo: {nome} — degradação sem quebra"
        passos = (
            f"1. Abrir o site e navegar até **{tela}** com catálogo/API indisponível ou vazio (conforme pré-condição).\n"
            "2. Aguardar carregamento e interagir com a área afetada.\n"
            "3. Confirmar estado vazio, mensagem amigável ou retry — sem tela branca."
        )
        esperado = resultado if resultado else "Página utilizável; feedback claro; sem crash."
        return titulo, passos, esperado

    if "ocult" in blob or "não aparece" in blob or "ausente" in blob or "fora" in blob:
        titulo = f"Negativo: {nome} — título que deve ficar de fora"
        passos = (
            f"1. Abrir o site e navegar até **{tela}**.\n"
            "2. Localizar ou preparar título/dado que **não** atende aos critérios da regra.\n"
            "3. Buscar o título na listagem/carrossel/seção.\n"
            "4. Confirmar ausência ou não destaque conforme a regra."
        )
        esperado = "Item marginal **não** exibido (ou não destacado) como no caminho feliz."
        return titulo, passos, esperado

    passos = (
        f"1. Abrir o site e navegar até **{tela}**.\n"
        f"2. Montar pré-condição **oposta** à do caminho feliz: {pre or 'dado ou perfil inadequado'}.\n"
        "3. Executar os mesmos passos do cenário feliz.\n"
        "4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento."
    )
    esperado = (
        "Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; "
        "nenhum defeito de UX (erro não tratado, dado incorreto exposto)."
    )
    return titulo, passos, esperado


def build_exploratorio(nome: str, tela: str, desc: str) -> tuple[str, str, str]:
    titulo = f"Exploratório: {nome} — charter de risco na tela"
    passos = (
        f"**Charter (15 min)** — área: **{tela}** · regra: {nome}.\n"
        f"**Contexto:** {desc[:200]}{'…' if len(desc) > 200 else ''}\n"
        "**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; "
        "(H2) combinação com filtros/busca/modal adjacente não contradiz a regra; "
        "(H3) repetição rápida da ação não duplica efeito indevido.\n"
        "**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.\n"
        "**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado."
    )
    esperado = (
        "Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; "
        "sem contradição grave ao resultado feliz da regra."
    )
    return titulo, passos, esperado


def scenario_row(
    r: dict,
    tela: str,
    camada: str,
    suffix: str,
    titulo: str,
    objetivo: str,
    tipo: str,
    pre: str,
    passos: str,
    resultado: str,
    conta: str,
    explor: str,
) -> dict:
    rid = r["ID"]
    arquivo = r["Arquivo"]
    return {
        "Pacote": PACOTE,
        "Camada_Testagem": camada,
        "ID_Regra": rid,
        "Nome_Regra": r["Nome"],
        "Arquivo_Inventario": arquivo,
        "Tela_Resumo": tela,
        "ID_Cenario": f"CT-{rid}-{suffix}",
        "Titulo_Cenario": titulo,
        "Objetivo": objetivo,
        "Tipo_Testagem": tipo,
        "Pre_condicoes_TestE": pre,
        "Passos": passos,
        "Resultado_Esperado": resultado,
        "Dados_Conta_Ambiente": conta,
        "Impedimentos_Conhecidos": "",
        "Status_Elaboracao": "Rascunho camadas (revisar QA)",
        "QA_Autor": "gerar-cenarios-camadas (agente)",
        "Data_Elaboracao": DATA,
        "TL_Auditoria": "Pendente",
        "TL_Comentario": "",
        "TL_Data": "",
        "Exploratorio_Validado": explor,
    }


def md_block(row: dict) -> list[str]:
    return [
        f"### {row['ID_Cenario']} — {row['Titulo_Cenario']}",
        "",
        f"**Camada:** {row['Camada_Testagem']} · **Regra:** `{row['ID_Regra']}` · **Tela:** {row['Tela_Resumo']}",
        "",
        "| Campo | Valor |",
        "| --- | --- |",
        f"| Tipo_Testagem | {row['Tipo_Testagem']} |",
        f"| Pre_condicoes_TestE | {row['Pre_condicoes_TestE']} |",
        f"| Passos | {row['Passos'].replace(chr(10), '<br>')} |",
        f"| Resultado_Esperado | {row['Resultado_Esperado']} |",
        f"| Dados_Conta_Ambiente | {row['Dados_Conta_Ambiente']} |",
        f"| Exploratorio_Validado | {row['Exploratorio_Validado']} |",
        "",
    ]


def main() -> None:
    rules = list(csv.DictReader(RULES_CSV.open(encoding="utf-8-sig")))
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    GEN_DIR.mkdir(parents=True, exist_ok=True)

    by_file: dict[str, list] = defaultdict(list)
    rows: list[dict] = []

    for r in rules:
        arquivo = r["Arquivo"]
        tela = tela_curta(arquivo)
        nome = r["Nome"]
        desc = r["Descrição"]
        pre = r["Pré-condições"]
        resultado = r["Resultado na tela"]
        como = r.get("Como testar", "")

        # Feliz
        passos_f = expand_passos_feliz(como, tela, nome)
        rows.append(
            scenario_row(
                r,
                tela,
                "Feliz",
                "F",
                f"Feliz: {nome}",
                f"Caminho principal que confirma a regra {r['ID']} ({nome}).",
                "Funcional manual",
                pre,
                passos_f,
                resultado,
                infer_conta(pre, desc, "Feliz"),
                "N/A",
            )
        )

        # Negativo
        tit_n, passos_n, res_n = build_negativo(pre, desc, resultado, nome, tela)
        rows.append(
            scenario_row(
                r,
                tela,
                "Negativo",
                "N",
                tit_n,
                f"Verificar que, sem a condição da regra {r['ID']}, o comportamento feliz não ocorre indevidamente.",
                "Funcional manual",
                f"Oposta ou ausência: {pre or 'condição da regra não satisfeita'}",
                passos_n,
                res_n,
                infer_conta(pre, desc, "Negativo"),
                "N/A",
            )
        )

        # Exploratório
        tit_e, passos_e, res_e = build_exploratorio(nome, tela, desc)
        rows.append(
            scenario_row(
                r,
                tela,
                "Exploratório",
                "E",
                tit_e,
                f"Charter exploratório ligado à regra {r['ID']} após o caminho feliz.",
                "Exploratório guiado",
                pre,
                passos_e,
                res_e,
                infer_conta(pre, desc, "Feliz"),
                "Pendente TL",
            )
        )

    for row in rows:
        by_file[row["Arquivo_Inventario"]].append(row)

    # CSV
    fields = list(rows[0].keys())
    with OUT_CSV.open("w", encoding="utf-8-sig", newline="") as f:
        w = csv.DictWriter(f, fieldnames=fields)
        w.writeheader()
        w.writerows(rows)

    # MD índice + por arquivo
    md_head = [
        "# Cenários em camadas — Feliz + Negativo + Exploratório",
        "",
        f"**Pacote:** `{PACOTE}` · **Gerado em:** {DATA}",
        "",
        "Pacote **separado** do baseline [`cenarios-teste.csv`](../cenarios-teste.csv) (511 cenários mínimos).",
        "",
        "| Métrica | Valor |",
        "| --- | --- |",
        f"| Regras (`RN-*`) | {len(rules)} |",
        f"| Cenários (3 × regra) | {len(rows)} |",
        "| Camadas | Feliz · Negativo · Exploratório |",
        "",
        "Cada regra possui:",
        "",
        "- `CT-{ID}-F` — caminho feliz",
        "- `CT-{ID}-N` — negativo / condição não atendida",
        "- `CT-{ID}-E` — exploratório guiado (pós-feliz)",
        "",
        "Arquivos por tela: [`generated/`](./generated/).",
        "",
        "---",
        "",
    ]
    OUT_MD.write_text("\n".join(md_head), encoding="utf-8")

    for arquivo in sorted(by_file.keys()):
        group = by_file[arquivo]
        tela = tela_curta(arquivo)
        parts = [
            f"# Camadas — {tela}",
            "",
            f"**Inventário:** `{arquivo}` · **Cenários:** {len(group)}",
            "",
            "---",
            "",
        ]
        # agrupar por regra
        by_rule: dict[str, list] = defaultdict(list)
        for row in group:
            by_rule[row["ID_Regra"]].append(row)
        for rid in sorted(by_rule.keys(), key=lambda x: (x.split("-")[1], x)):
            parts.append(f"## {rid} — {by_rule[rid][0]['Nome_Regra']}")
            parts.append("")
            for row in by_rule[rid]:
                parts.extend(md_block(row))
        out_name = arquivo.replace(".md", ".md")
        (GEN_DIR / out_name).write_text("\n".join(parts), encoding="utf-8")

    print(f"OK: {len(rules)} regras -> {len(rows)} cenários")
    print(f"  CSV: {OUT_CSV}")
    print(f"  MD índice: {OUT_MD}")
    print(f"  Por tela: {GEN_DIR}/")


if __name__ == "__main__":
    main()
