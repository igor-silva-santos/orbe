/**
 * Teste offline: candidatos a "Mais esperados" (filmes futuros) vs filtro DISPLAY atual.
 * Uso: npx ts-node scripts/test-mais-esperados.ts
 */
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { filmeQualityFilter, filmeCarouselConcertExclusionFilter } from '../src/qualityFilters';

const prisma = new PrismaClient();

const MS_DAY = 86_400_000;
const HORIZON_DAYS = 120;

type Row = {
  tmdbId: number;
  title: string;
  releaseDate: Date | null;
  popularity: number | null;
  voteCount: number | null;
  voteAverage: number | null;
  collectionId: number | null;
  emBreve: boolean | null;
  em_prevenda: boolean | null;
  localizacaoPtBr: boolean | null;
  overview: string | null;
  posterPath: string | null;
  hasTrailer: boolean;
};

function hasFichaMinima(f: Row): boolean {
  if (!f.posterPath) return false;
  const overviewOk = (f.overview?.trim().length ?? 0) >= 40;
  const tentpole = (f.popularity ?? 0) >= 35;
  const marketing = f.emBreve || f.em_prevenda || f.localizacaoPtBr;
  return overviewOk || tentpole || marketing;
}

/** Score sem vote_average — só antecipação */
function scoreAntecipacao(f: Row, today: Date): number {
  const pop = f.popularity ?? 0;
  const days =
    f.releaseDate
      ? Math.max(0, Math.ceil((f.releaseDate.getTime() - today.getTime()) / MS_DAY))
      : 999;

  let s = Math.log10(pop + 1) * 42;
  // Próximos 90 dias: leve boost (estreia visível), sem punir longe demais
  if (days <= 90) s += (90 - days) * 0.15;
  if (f.collectionId) s += 12;
  if (f.emBreve || f.em_prevenda) s += 8;
  if (f.localizacaoPtBr) s += 5;
  if (f.hasTrailer) s += 4;
  return s;
}

/** Corte adaptativo: percentil na janela + piso baixo de lixo */
function adaptiveCutoff(scored: { f: Row; score: number }[]): number {
  if (scored.length === 0) return Infinity;
  const pops = scored.map((x) => x.f.popularity ?? 0).sort((a, b) => a - b);
  const p70 = pops[Math.floor(pops.length * 0.7)] ?? 0;
  const floor = Math.max(8, Math.min(22, p70 * 0.45));
  return floor;
}

async function main() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const horizon = new Date(today);
  horizon.setDate(horizon.getDate() + HORIZON_DAYS);

  const raw = await prisma.filme.findMany({
    where: {
      AND: [
        { releaseDate: { gte: today, lte: horizon } },
        { OR: [{ adult: false }, { adult: null }] },
        filmeCarouselConcertExclusionFilter,
      ],
    },
    select: {
      tmdbId: true,
      title: true,
      releaseDate: true,
      popularity: true,
      voteCount: true,
      voteAverage: true,
      collectionId: true,
      emBreve: true,
      em_prevenda: true,
      localizacaoPtBr: true,
      overview: true,
      posterPath: true,
      videos: { where: { type: 'Trailer' }, take: 1, select: { id: true } },
    },
    take: 800,
    orderBy: { popularity: 'desc' },
  });

  const rows: Row[] = raw.map((f) => ({
    tmdbId: f.tmdbId,
    title: f.title,
    releaseDate: f.releaseDate,
    popularity: f.popularity,
    voteCount: f.voteCount,
    voteAverage: f.voteAverage,
    collectionId: f.collectionId,
    emBreve: f.emBreve,
    em_prevenda: f.em_prevenda,
    localizacaoPtBr: f.localizacaoPtBr,
    overview: f.overview,
    posterPath: f.posterPath,
    hasTrailer: f.videos.length > 0,
  }));

  const displayPass = await prisma.filme.count({
    where: {
      AND: [
        { releaseDate: { gte: today, lte: horizon } },
        filmeQualityFilter,
        filmeCarouselConcertExclusionFilter,
      ],
    },
  });

  const ficha = rows.filter(hasFichaMinima);
  const scored = ficha
    .map((f) => ({ f, score: scoreAntecipacao(f, today) }))
    .sort((a, b) => b.score - a.score);

  const popFloor = adaptiveCutoff(scored);
  const proposed = scored.filter((x) => (x.f.popularity ?? 0) >= popFloor).slice(0, 25);

  const lowVoteHighHype = scored
    .filter((x) => (x.f.voteCount ?? 0) < 30 && (x.f.popularity ?? 0) >= 20)
    .slice(0, 10);

  const noise = scored
    .filter((x) => (x.f.popularity ?? 0) < popFloor && (x.f.popularity ?? 0) >= 5)
    .slice(-8);

  console.log('--- Teste Mais Esperados (filmes, próximos %d dias) ---\n', HORIZON_DAYS);
  console.log('Total futuros (amostra até 800 por pop):', rows.length);
  console.log('Passam filmeQualityFilter DISPLAY hoje:', displayPass);
  console.log('Passam ficha mínima (proposta):', ficha.length);
  console.log('Piso adaptativo de popularity (corte lixo):', popFloor.toFixed(1));
  console.log('');

  console.log('TOP 25 — algoritmo proposto (sem vote_average):');
  for (const { f, score } of proposed) {
    const d = f.releaseDate?.toISOString().slice(0, 10) ?? '?';
    console.log(
      `  ${score.toFixed(1).padStart(5)} | pop ${String(f.popularity ?? 0).padStart(6)} | votos ${String(f.voteCount ?? 0).padStart(4)} | ${d} | ${f.title}`,
    );
  }

  console.log('\nIncluídos com poucos votos mas pop>=20 (alvo estreia sem score):');
  for (const { f, score } of lowVoteHighHype) {
    console.log(
      `  ${score.toFixed(1).padStart(5)} | pop ${f.popularity} | votos ${f.voteCount} | ${f.title}`,
    );
  }

  console.log('\nExemplos filtrados como ruído (abaixo do piso adaptativo):');
  for (const { f } of noise) {
    console.log(`  pop ${f.popularity} | votos ${f.voteCount} | ${f.title}`);
  }

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
