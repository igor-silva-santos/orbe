import fs from 'node:fs';
import path from 'node:path';
import type { ExplorerAreaReport, ExplorerFullReport, IssueSeverity } from './types';

const REPO_ROOT = path.resolve(__dirname, '../../..');
const OUT_DIR = path.join(REPO_ROOT, 'docs/qa');

export function mergeReports(areas: ExplorerAreaReport[], baseUrl: string): ExplorerFullReport {
  const bySeverity: Record<IssueSeverity, number> = {
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
    observation: 0,
  };
  const byKind: Record<string, number> = {};
  let totalIssues = 0;

  for (const area of areas) {
    for (const issue of area.issues) {
      totalIssues += 1;
      bySeverity[issue.severity] += 1;
      byKind[issue.kind] = (byKind[issue.kind] ?? 0) + 1;
    }
  }

  return {
    version: 1,
    baseUrl,
    generatedAt: new Date().toISOString(),
    areas,
    summary: { totalIssues, bySeverity, byKind },
  };
}

export function writeReport(report: ExplorerFullReport): { jsonPath: string; mdPath: string } {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const jsonPath = path.join(OUT_DIR, 'exploracao-orbe-latest.json');
  const mdPath = path.join(OUT_DIR, 'exploracao-orbe-latest.md');

  fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2), 'utf8');

  const lines: string[] = [
    '# Exploração Orbe — relatório automatizado',
    '',
    `Gerado: ${report.generatedAt}`,
    `Base: ${report.baseUrl}`,
    '',
    '## Resumo',
    '',
    `- **Total de achados:** ${report.summary.totalIssues}`,
    `- **Críticos:** ${report.summary.bySeverity.critical}`,
    `- **Altos:** ${report.summary.bySeverity.high}`,
    `- **Médios:** ${report.summary.bySeverity.medium}`,
    '',
    '## Por área',
    '',
  ];

  for (const area of report.areas) {
    lines.push(`### ${area.area}`);
    lines.push('');
    lines.push(`Rotas visitadas: ${area.routesVisited.length} · Issues: ${area.issues.length}`);
    lines.push('');
    if (area.issues.length === 0) {
      lines.push('_Nenhum issue registrado nesta área._');
      lines.push('');
      continue;
    }
    lines.push('| Sev | Rota | Passo | Tipo | Mensagem |');
    lines.push('| --- | --- | --- | --- | --- |');
    for (const issue of area.issues.slice(0, 80)) {
      const msg = issue.message.replace(/\|/g, '\\|').slice(0, 120);
      lines.push(`| ${issue.severity} | ${issue.route} | ${issue.step} | ${issue.kind} | ${msg} |`);
    }
    if (area.issues.length > 80) {
      lines.push(`| … | | | | _+${area.issues.length - 80} itens no JSON_ |`);
    }
    lines.push('');
  }

  fs.writeFileSync(mdPath, lines.join('\n'), 'utf8');
  return { jsonPath, mdPath };
}
