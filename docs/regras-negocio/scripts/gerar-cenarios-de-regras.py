#!/usr/bin/env python3
"""Gera cenários de teste (passos) a partir do inventário de regras — visão de tela."""

from __future__ import annotations

import csv
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RULES_CSV = ROOT / "regras-negocio-qa.csv"
SCENARIOS_CSV = ROOT / "cenarios-teste.csv"
OUT_MD = ROOT / "cenarios-teste.md"
GEN_DIR = ROOT / "cenarios" / "generated"


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


def expand_passos(como_testar: str, tela: str, nome: str) -> str:
    base = (como_testar or "").strip()
    if not base or base in ("—", "-"):
        base = f"Validar na tela o comportamento: {nome}."
    # split on ; or . for multiple hints
    parts = re.split(r"\s*;\s*|\.\s+(?=[A-ZÁÉÍÓÚ])", base)
    parts = [p.strip().rstrip(".") for p in parts if p.strip()]
    steps = [f"1. Abrir o site e navegar até **{tela}** (conforme a regra)."]
    for i, p in enumerate(parts, start=2):
        if len(p) < 3:
            continue
        steps.append(f"{i}. {p[0].upper() + p[1:] if p else p}.")
    steps.append(f"{len(steps) + 1}. Comparar o que aparece na tela com o **Resultado esperado** do cenário.")
    return " ".join(steps) if len(steps) <= 2 else "\n".join(steps)


def infer_conta(pre: str, desc: str) -> str:
    text = f"{pre} {desc}".lower()
    if "logado" in text or "autentic" in text or "conta" in text:
        if "não" in text or "anônimo" in text or "visitante" in text:
            return "Homologação/produção; usuário **não** logado"
        return "Homologação/produção; usuário **logado**"
    if "admin" in text:
        return "Homologação; conta **administrador**"
    return "Homologação/produção; **anônimo** (ajustar se a regra exigir login)"


def infer_tipo(nome: str, desc: str) -> str:
    d = (nome + " " + desc).lower()
    if "explor" in d or "vários" in d or "comparar" in d:
        return "Exploratório guiado"
    return "Funcional manual"


def main() -> None:
    rules = list(csv.DictReader(RULES_CSV.open(encoding="utf-8-sig")))
    GEN_DIR.mkdir(parents=True, exist_ok=True)

    by_file: dict[str, list] = {}
    for r in rules:
        by_file.setdefault(r["Arquivo"], []).append(r)

    scenario_rows = []
    md_parts = [
        "# Cenários de teste — Orbe Nerd (511)",
        "",
        "Gerado a partir do inventário de regras. **1 cenário mínimo por `RN-*`.**",
        "",
        "| Métrica | Valor |",
        "| --- | --- |",
        f"| Total de cenários | {len(rules)} |",
        "| Status elaboração | Pronto para TL |",
        "",
        "---",
        "",
    ]

    for arquivo in sorted(by_file.keys()):
        group = by_file[arquivo]
        tela = tela_curta(arquivo)
        file_md = [f"# Cenários — {tela}", "", f"**Arquivo inventário:** `{arquivo}`", "", "---", ""]
        for r in group:
            rid = r["ID"]
            nome = r["Nome"]
            desc = r["Descrição"]
            pre = r["Pré-condições"]
            resultado = r["Resultado na tela"]
            ct = f"CT-{rid}-01"
            titulo = f"Validar: {nome}"
            passos = expand_passos(r.get("Como testar", ""), tela, nome)
            tipo = infer_tipo(nome, desc)
            conta = infer_conta(pre, desc)
            explor = "Sim" if tipo == "Exploratório guiado" else "N/A"

            scenario_rows.append(
                {
                    "ID_Regra": rid,
                    "Nome_Regra": nome,
                    "Arquivo_Inventario": arquivo,
                    "Tela_Resumo": tela,
                    "ID_Cenario": ct,
                    "Titulo_Cenario": titulo,
                    "Objetivo": f"Verificar na tela o comportamento da regra {rid} ({nome}).",
                    "Tipo_Testagem": tipo,
                    "Pre_condicoes_TestE": pre,
                    "Passos": passos,
                    "Resultado_Esperado": resultado,
                    "Dados_Conta_Ambiente": conta,
                    "Impedimentos_Conhecidos": "",
                    "Status_Elaboracao": "Pronto para TL",
                    "QA_Autor": "gerar-cenarios-de-regras (agente)",
                    "Data_Elaboracao": "2026-09-22",
                    "TL_Auditoria": "Pendente",
                    "TL_Comentario": "",
                    "TL_Data": "",
                    "Exploratorio_Validado": explor,
                }
            )

            block = [
                f"## {ct} — {titulo}",
                "",
                f"**ID_Regra:** `{rid}` · **Tela:** {tela}",
                "",
                "| Campo | Valor |",
                "| --- | --- |",
                f"| Tipo_Testagem | {tipo} |",
                f"| Pre_condicoes_TestE | {pre} |",
                f"| Passos | {passos.replace(chr(10), '<br>')} |",
                f"| Resultado_Esperado | {resultado} |",
                f"| Dados_Conta_Ambiente | {conta} |",
                f"| Status_Elaboracao | Pronto para TL |",
                "",
            ]
            file_md.extend(block)
            md_parts.extend(block)

        (GEN_DIR / arquivo.replace(".md", ".md")).write_text("\n".join(file_md), encoding="utf-8")

    OUT_MD.write_text("\n".join(md_parts), encoding="utf-8")

    fields = list(scenario_rows[0].keys())
    with SCENARIOS_CSV.open("w", encoding="utf-8-sig", newline="") as f:
        w = csv.DictWriter(f, fieldnames=fields)
        w.writeheader()
        w.writerows(scenario_rows)

    print(f"OK: {len(scenario_rows)} cenários -> {OUT_MD} e {SCENARIOS_CSV}")


if __name__ == "__main__":
    main()
