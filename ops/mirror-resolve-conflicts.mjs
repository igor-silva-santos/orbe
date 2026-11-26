#!/usr/bin/env node
// Junta conflitos conhecidos do espelho sem escolher um lado só.
// package.json: une a lista de testes. mediaRoutesHelpers.ts: une imports e
// descarta só o que o arquivo juntado não usa. carousel-utils.test.ts: fica
// com o episódio futuro do GitLab e com a data fixa do GitHub.
// Qualquer outro conflito falha.

import fs from 'node:fs';

const HUNK = /<<<<<<<[^\n]*\n([\s\S]*?)=======\n([\s\S]*?)>>>>>>>[^\n]*\n/g;

function unionOrder(preferred, other) {
  const result = [...other];
  const onlyPreferred = preferred.filter((item) => !other.includes(item));
  for (const item of onlyPreferred) {
    const idx = preferred.indexOf(item);
    let inserted = false;
    for (let i = idx - 1; i >= 0; i -= 1) {
      const at = result.indexOf(preferred[i]);
      if (at >= 0) {
        result.splice(at + 1, 0, item);
        inserted = true;
        break;
      }
    }
    if (inserted) continue;
    for (let i = idx + 1; i < preferred.length; i += 1) {
      const at = result.indexOf(preferred[i]);
      if (at >= 0) {
        result.splice(at, 0, item);
        inserted = true;
        break;
      }
    }
    if (!inserted) result.unshift(item);
  }
  return result;
}

function splitTestCommand(cmd) {
  const match = cmd.match(/^(.*--test)\s+(.+)$/);
  if (!match) return null;
  return { prefix: match[1], files: match[2].trim().split(/\s+/).filter(Boolean) };
}

function unionTestBody(ours, theirs) {
  const oursParts = ours.split(/\s+&&\s+/);
  const theirsParts = theirs.split(/\s+&&\s+/);
  const left = splitTestCommand(oursParts[0]);
  const right = splitTestCommand(theirsParts[0]);
  if (!left || !right || left.prefix !== right.prefix) return null;
  const files = unionOrder(left.files, right.files);
  const extras = [];
  for (const part of [...oursParts.slice(1), ...theirsParts.slice(1)]) {
    if (!extras.includes(part)) extras.push(part);
  }
  return [`${left.prefix} ${files.join(' ')}`, ...extras].join(' && ');
}

function resolvePackageJson(content) {
  const hunks = [...content.matchAll(HUNK)];
  if (hunks.length === 0) return { ok: false, reason: 'sem marcador de conflito' };

  let next = content;
  for (const hunk of hunks) {
    const oursLines = hunk[1].split('\n').filter((line) => line.trim() !== '');
    const theirsLines = hunk[2].split('\n').filter((line) => line.trim() !== '');
    if (oursLines.length !== 1 || theirsLines.length !== 1) {
      return { ok: false, reason: 'conflito fora da linha de testes' };
    }
    const ours = oursLines[0].match(/^(\s*"test":\s*")(.*)(",?\s*)$/);
    const theirs = theirsLines[0].match(/^(\s*"test":\s*")(.*)(",?\s*)$/);
    if (!ours || !theirs) return { ok: false, reason: 'conflito fora da linha de testes' };
    const body = unionTestBody(ours[2], theirs[2]);
    if (!body) return { ok: false, reason: 'comandos de teste diferentes' };
    const line = `${ours[1]}${body}${ours[3]}`;
    next = next.replace(hunk[0], `${line}\n`);
  }

  if (next.includes('<<<<<<<') || next.includes('>>>>>>>')) {
    return { ok: false, reason: 'marcador sobrou' };
  }
  try {
    JSON.parse(next);
  } catch {
    return { ok: false, reason: 'package.json inválido depois da junção' };
  }
  return { ok: true, content: next };
}

function importStatements(block) {
  const parts = [];
  let current = '';
  for (const line of block.split('\n')) {
    if (line.trim() === '' && current === '') continue;
    current = current ? `${current}\n${line}` : line;
    if (/;\s*$/.test(line.trim())) {
      parts.push(current.trim());
      current = '';
    }
  }
  if (current.trim()) parts.push(current.trim());
  return parts;
}

function parseImport(stmt) {
  const sideEffect = stmt.match(/^import\s+(['"][^'"]+['"])\s*;?$/);
  if (sideEffect) return { sideEffect: sideEffect[1], from: sideEffect[1], named: [], defaultName: null, namespace: null };
  const match = stmt.match(/^import\s+(type\s+)?([\s\S]+?)\s+from\s+(['"][^'"]+['"])\s*;?$/);
  if (!match) return null;
  const parsed = { typeKeyword: Boolean(match[1]), from: match[3], named: [], defaultName: null, namespace: null, sideEffect: null };
  const clause = match[2].trim();
  if (clause.startsWith('{')) {
    parsed.named = parseNamed(clause);
    return parsed.named ? parsed : null;
  }
  const mixed = clause.match(/^(\*\s+as\s+[A-Za-z0-9_$]+|[A-Za-z0-9_$]+)\s*,\s*(\{[\s\S]*\})$/);
  if (mixed) {
    if (mixed[1].startsWith('*')) parsed.namespace = mixed[1].replace(/\s+/g, ' ');
    else parsed.defaultName = mixed[1];
    parsed.named = parseNamed(mixed[2]);
    return parsed.named ? parsed : null;
  }
  if (clause.startsWith('* as ')) {
    parsed.namespace = clause.replace(/\s+/g, ' ');
    return parsed;
  }
  if (/^[A-Za-z0-9_$]+$/.test(clause)) {
    parsed.defaultName = clause;
    return parsed;
  }
  return null;
}

function parseNamed(brace) {
  const inner = brace.trim().replace(/^\{/, '').replace(/\}$/, '');
  const names = [];
  for (const raw of inner.split(',')) {
    const piece = raw.trim();
    if (!piece) continue;
    const typeOnly = piece.startsWith('type ');
    const bare = piece.replace(/^type\s+/, '');
    const alias = bare.split(/\s+as\s+/);
    if (!/^[A-Za-z0-9_$]+$/.test(alias[0])) return null;
    const local = alias[1] || alias[0];
    if (!/^[A-Za-z0-9_$]+$/.test(local)) return null;
    names.push({ imported: alias[0], local, typeOnly });
  }
  return names;
}

function formatImport(imp) {
  if (imp.sideEffect) return `import ${imp.sideEffect};`;
  const typeKw = imp.typeKeyword ? 'type ' : '';
  let clause = '';
  if (imp.namespace) clause = imp.namespace;
  else if (imp.defaultName) clause = imp.defaultName;
  if (imp.named.length) {
    const lines = imp.named.map((name) => {
      const typeOnly = name.typeOnly ? 'type ' : '';
      const alias = name.local !== name.imported ? ` as ${name.local}` : '';
      return `${typeOnly}${name.imported}${alias}`;
    });
    const named = lines.length === 1 ? `{ ${lines[0]} }` : `{\n${lines.map((line) => `  ${line},`).join('\n')}\n}`;
    clause = clause ? `${clause}, ${named}` : named;
  }
  return `import ${typeKw}${clause} from ${imp.from};`;
}

function mergeImportLists(ours, theirs) {
  const order = [];
  const byKey = new Map();
  const take = (imp) => {
    const key = `${imp.typeKeyword ? 'type:' : ''}${imp.from}`;
    const prev = byKey.get(key);
    if (!prev) {
      byKey.set(key, {
        ...imp,
        named: [...imp.named],
      });
      order.push(key);
      return true;
    }
    if (Boolean(prev.sideEffect) !== Boolean(imp.sideEffect)) return false;
    if (prev.defaultName && imp.defaultName && prev.defaultName !== imp.defaultName) return false;
    if (prev.namespace && imp.namespace && prev.namespace !== imp.namespace) return false;
    prev.defaultName = prev.defaultName || imp.defaultName;
    prev.namespace = prev.namespace || imp.namespace;
    for (const name of imp.named) {
      const existing = prev.named.find((item) => item.local === name.local);
      if (!existing) prev.named.push(name);
      else if (existing.imported !== name.imported || existing.typeOnly !== name.typeOnly) return false;
    }
    return true;
  };
  for (const imp of [...ours, ...theirs]) {
    if (!take(imp)) return null;
  }
  return order.map((key) => byKey.get(key));
}

function fileBody(content) {
  return content
    .replace(/import\s+[\s\S]*?\sfrom\s+['"][^'"]+['"]\s*;?/g, '')
    .replace(/import\s+['"][^'"]+['"]\s*;?/g, '');
}

function isUsed(name, body) {
  return new RegExp(`\\b${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`).test(body);
}

function pruneUnused(imp, body) {
  const next = { ...imp, named: imp.named.filter((name) => isUsed(name.local, body)) };
  if (next.defaultName && !isUsed(next.defaultName, body)) next.defaultName = null;
  if (next.namespace) {
    const local = next.namespace.replace(/^\*\s+as\s+/, '');
    if (!isUsed(local, body)) next.namespace = null;
  }
  if (next.sideEffect) return next;
  if (!next.defaultName && !next.namespace && next.named.length === 0) return null;
  return next;
}

function resolveHelpers(content) {
  const hunks = [...content.matchAll(HUNK)];
  if (hunks.length === 0) return { ok: false, reason: 'sem marcador de conflito' };

  let stripped = content;
  for (const hunk of hunks) stripped = stripped.replace(hunk[0], '\n');
  const body = fileBody(stripped);

  let next = content;
  for (const hunk of hunks) {
    const oursStmts = importStatements(hunk[1]);
    const theirsStmts = importStatements(hunk[2]);
    const ours = oursStmts.map(parseImport);
    const theirs = theirsStmts.map(parseImport);
    if (ours.some((item) => !item) || theirs.some((item) => !item)) {
      return { ok: false, reason: 'conflito fora dos imports' };
    }
    const merged = mergeImportLists(ours, theirs);
    if (!merged) return { ok: false, reason: 'imports incompatíveis' };
    const kept = merged.map((imp) => pruneUnused(imp, body)).filter(Boolean);
    const text = kept.map(formatImport).join('\n');
    next = next.replace(hunk[0], text ? `${text}\n` : '');
  }

  if (next.includes('<<<<<<<') || next.includes('>>>>>>>')) {
    return { ok: false, reason: 'marcador sobrou' };
  }
  return { ok: true, content: next };
}

function normalizeBlock(block) {
  return block.replace(/\s+$/g, '').replace(/^\s+/g, '');
}

const CAROUSEL_AIRING_OURS = 'airingAt: future.toISOString(),';
const CAROUSEL_AIRING_THEIRS = "airingAt: '2026-10-15T12:00:00.000Z',";
const CAROUSEL_ASSERT_OURS = `assert.equal(date?.getFullYear(), future.getFullYear());
    assert.equal(date?.getMonth(), future.getMonth());
    assert.equal(date?.getDate(), future.getDate());`;
const CAROUSEL_ASSERT_THEIRS = `assert.equal(date?.getFullYear(), 2026);
    assert.equal(date?.getMonth(), 9);
    assert.equal(date?.getDate(), 15);`;

const CAROUSEL_FIXED_DATE_TEST = `
  it('keeps the 15 Oct 2026 airing while that date is still today or later', () => {
    const fixed = new Date(2026, 9, 15);
    const item = {
      ...mockMidia(1, '2026-09-10'),
      nextAiringEpisode: {
        airingAt: '2026-10-15T12:00:00.000Z',
        episode: 5,
        season: 2,
      },
    };
    const date = parseMidiaReleaseDate(item);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (fixed >= today) {
      assert.equal(date?.getFullYear(), 2026);
      assert.equal(date?.getMonth(), 9);
      assert.equal(date?.getDate(), 15);
    } else {
      assert.equal(date?.getFullYear(), 2026);
      assert.equal(date?.getMonth(), 8);
      assert.equal(date?.getDate(), 10);
    }
  });
`;

function resolveCarouselUtilsTest(content) {
  const hunks = [...content.matchAll(HUNK)];
  if (hunks.length !== 2) return { ok: false, reason: 'conflito fora do teste de data do carrossel' };
  const [airing, assertion] = hunks;
  if (normalizeBlock(airing[1]) !== CAROUSEL_AIRING_OURS || normalizeBlock(airing[2]) !== CAROUSEL_AIRING_THEIRS) {
    return { ok: false, reason: 'data do episódio diferente do conflito conhecido' };
  }
  if (normalizeBlock(assertion[1]) !== CAROUSEL_ASSERT_OURS || normalizeBlock(assertion[2]) !== CAROUSEL_ASSERT_THEIRS) {
    return { ok: false, reason: 'asserção diferente do conflito conhecido' };
  }

  let next = content.replace(airing[0], airing[1]).replace(assertion[0], assertion[1]);
  const describeAt = next.indexOf("describe('parseMidiaReleaseDate'");
  if (describeAt < 0) return { ok: false, reason: 'describe parseMidiaReleaseDate sumiu' };
  const closeAt = next.indexOf('\n});', describeAt);
  if (closeAt < 0) return { ok: false, reason: 'fim do describe não encontrado' };
  next = `${next.slice(0, closeAt)}\n${CAROUSEL_FIXED_DATE_TEST.trimEnd()}${next.slice(closeAt)}`;
  if (next.includes('<<<<<<<') || next.includes('>>>>>>>')) {
    return { ok: false, reason: 'marcador sobrou' };
  }
  return { ok: true, content: next };
}

export function resolveConflict(filename, content) {
  const base = filename.replace(/\\/g, '/');
  if (base.endsWith('package.json')) return resolvePackageJson(content);
  if (base.endsWith('api/src/routes/mediaRoutesHelpers.ts')) return resolveHelpers(content);
  if (base.endsWith('frontend/src/lib/carousel-utils.test.ts')) return resolveCarouselUtilsTest(content);
  return { ok: false, reason: 'arquivo sem regra de junção' };
}

function main() {
  const file = process.argv[2];
  if (!file) {
    console.error('uso: mirror-resolve-conflicts.mjs <arquivo>');
    process.exit(1);
  }
  const content = fs.readFileSync(file, 'utf8');
  const result = resolveConflict(file, content);
  if (!result.ok) {
    console.error(`Não juntei ${file}: ${result.reason}`);
    process.exit(1);
  }
  fs.writeFileSync(file, result.content);
  console.log(`Juntei os dois lados em ${file}`);
}

if (process.argv[1] && process.argv[1].endsWith('mirror-resolve-conflicts.mjs')) main();
