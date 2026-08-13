import type { Filme, Jogo, Midia, Serie, TipoMidia } from '@/types';

export type CardStatusVariant =
  | 'prevenda'
  | 'em_cartaz'
  | 'streaming'
  | 'em_breve'
  | 'em_exibicao'
  | 'novo_ep';

export type CardStatus = {
  label: string;
  variant: CardStatusVariant;
};

const STATUS_STYLES: Record<CardStatusVariant, string> = {
  prevenda:
    'border-amber-500/60 bg-amber-500/15 text-amber-800 dark:text-amber-200',
  em_cartaz:
    'border-emerald-500/60 bg-emerald-500/15 text-emerald-800 dark:text-emerald-200',
  streaming:
    'border-violet-500/60 bg-violet-500/15 text-violet-800 dark:text-violet-200',
  em_breve:
    'border-slate-400/50 bg-slate-500/10 text-slate-600 dark:text-slate-300',
  em_exibicao:
    'border-sky-500/60 bg-sky-500/15 text-sky-800 dark:text-sky-200',
  novo_ep:
    'border-orange-500/60 bg-orange-500/15 text-orange-800 dark:text-orange-200',
};

export function cardStatusClassName(variant: CardStatusVariant): string {
  return STATUS_STYLES[variant];
}

function parseReleaseDate(midia: Midia): Date | null {
  const raw = midia.data_lancamento_curada || midia.data_lancamento_api;
  if (!raw) return null;
  try {
    if (typeof raw === 'object' && raw !== null && 'year' in raw) {
      const d = raw as { year: number; month: number; day: number };
      return new Date(d.year, d.month - 1, d.day);
    }
    return new Date(raw as string);
  } catch {
    return null;
  }
}

export function midiaHasReleased(midia: Midia): boolean {
  const release = parseReleaseDate(midia);
  if (!release) return false;
  return release.getTime() <= Date.now();
}

export function resolveCardStatus(
  type: TipoMidia,
  midia: Midia,
  options?: { isNewAnimeEpisode?: boolean },
): CardStatus | null {
  const released = midiaHasReleased(midia);
  const hasStreaming = (midia.plataformas_api?.length ?? 0) > 0;

  if (type === 'filme') {
    const filme = midia as Filme;
    if (filme.em_prevenda) return { label: 'PRÉ-VENDA', variant: 'prevenda' };
    if (filme.em_cartaz || filme.tem_sessoes) return { label: 'EM CARTAZ', variant: 'em_cartaz' };
    if (released && (filme.estreia_streaming || hasStreaming)) {
      return { label: 'NO STREAMING', variant: 'streaming' };
    }
    if (filme.em_breve || !released) return { label: 'EM BREVE', variant: 'em_breve' };
    return null;
  }

  if (type === 'serie') {
    const serie = midia as Serie;
    const status = (serie.status ?? '').toLowerCase();
    if (status.includes('returning') || status.includes('airing')) {
      return { label: 'EM EXIBIÇÃO', variant: 'em_exibicao' };
    }
    if (!released) return { label: 'EM BREVE', variant: 'em_breve' };
    if (hasStreaming || serie.estreia_streaming) {
      return { label: 'NO STREAMING', variant: 'streaming' };
    }
    return null;
  }

  if (type === 'anime') {
    if (options?.isNewAnimeEpisode) return { label: 'NOVO EP', variant: 'novo_ep' };
    const status = ((midia as { status_raw?: string }).status_raw ?? '').toUpperCase();
    if (status === 'RELEASING') return { label: 'EM EXIBIÇÃO', variant: 'em_exibicao' };
    if (!released || status === 'NOT_YET_RELEASED') {
      return { label: 'EM BREVE', variant: 'em_breve' };
    }
    if (hasStreaming) return { label: 'NO STREAMING', variant: 'streaming' };
    return null;
  }

  if (type === 'jogo') {
    const jogo = midia as Jogo;
    if (!released) return { label: 'EM BREVE', variant: 'em_breve' };
    if ((jogo.plataformas_api?.length ?? 0) > 0) {
      return { label: 'DISPONÍVEL', variant: 'streaming' };
    }
    return null;
  }

  return null;
}
