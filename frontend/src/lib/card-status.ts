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
    'border-amber-500/70 bg-amber-500/90 text-white shadow-sm',
  em_cartaz:
    'border-emerald-600 bg-emerald-600 text-white shadow-md',
  streaming:
    'border-violet-600 bg-violet-700 text-white shadow-md',
  em_breve:
    'border-slate-500/60 bg-slate-600/85 text-white shadow-sm',
  em_exibicao:
    'border-sky-500/70 bg-sky-600/90 text-white shadow-sm',
  novo_ep:
    'border-orange-500/70 bg-orange-600/90 text-white shadow-sm',
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
    const str = raw as string;
    if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
      const [year, month, day] = str.split('-').map(Number);
      return new Date(year, month - 1, day);
    }
    return new Date(str);
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
  options?: { isNewEpisode?: boolean; isNewAnimeEpisode?: boolean },
): CardStatus | null {
  const released = midiaHasReleased(midia);
  const hasStreaming = (midia.plataformas_api?.length ?? 0) > 0;
  const isNewEpisode = Boolean(options?.isNewEpisode ?? options?.isNewAnimeEpisode);

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
    if (isNewEpisode) return { label: 'NOVO EP', variant: 'novo_ep' };
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
    if (isNewEpisode) return { label: 'NOVO EP', variant: 'novo_ep' };
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
