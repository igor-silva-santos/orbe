import type { APIRequestContext } from '@playwright/test';
import {
  DYNAMIC_UI_ROUTES,
  STATIC_UI_ROUTES,
  type RouteSamples,
} from './route-manifest';

async function jsonOrNull<T>(request: APIRequestContext, url: string): Promise<T | null> {
  try {
    const res = await request.get(url, { timeout: 60_000 });
    if (!res.ok()) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function discoverRouteSamples(request: APIRequestContext): Promise<RouteSamples> {
  const samples: RouteSamples = {
    filmeId: null,
    serieId: null,
    animeId: null,
    jogoId: null,
    pessoaId: null,
    dubladorId: null,
    companyId: null,
    sagaId: null,
    universoId: null,
  };

  const [filmes, series, animes, jogos, pesquisa, sagas, universos] = await Promise.all([
    jsonOrNull<{ results?: { id: number }[] }>(request, '/api/filmes?limit=3'),
    jsonOrNull<{ results?: { id: number }[] }>(request, '/api/series?limit=3'),
    jsonOrNull<{ results?: { id: number }[] }>(request, '/api/animes?limit=3'),
    jsonOrNull<{ results?: { id: number }[] }>(request, '/api/jogos?limit=3'),
    jsonOrNull<{ results?: { id: number; tipo?: string }[]; pessoas?: { id: number }[] }>(
      request,
      '/api/pesquisa?q=a&category=todos',
    ),
    jsonOrNull<{ sagas?: { id?: number; slug?: string }[] }>(request, '/api/continuacoes/sagas?limit=3'),
    jsonOrNull<{ universos?: { id?: string; slug?: string }[] }>(request, '/api/continuacoes/universos'),
  ]);

  samples.filmeId = filmes?.results?.[0]?.id ?? null;
  samples.serieId = series?.results?.[0]?.id ?? null;
  samples.animeId = animes?.results?.[0]?.id ?? null;
  samples.jogoId = jogos?.results?.[0]?.id ?? null;

  if (samples.filmeId) {
    const detFilme = await jsonOrNull<{ elenco?: { id: number }[] }>(
      request,
      `/api/filmes/${samples.filmeId}/details`,
    );
    samples.pessoaId = detFilme?.elenco?.[0]?.id ?? samples.pessoaId;
  }

  const pessoaFromSearch = pesquisa?.pessoas?.[0]?.id;
  if (pessoaFromSearch) samples.pessoaId = pessoaFromSearch;

  if (!samples.pessoaId && pesquisa?.results) {
    const filmeHit = pesquisa.results.find((r) => r.tipo === 'filme');
    if (filmeHit?.id) {
      const det = await jsonOrNull<{ elenco?: { id: number }[] }>(
        request,
        `/api/filmes/${filmeHit.id}/details`,
      );
      samples.pessoaId = det?.elenco?.[0]?.id ?? null;
    }
  }

  if (jogos?.results?.[0]?.id) {
    const jogoDet = await jsonOrNull<{ desenvolvedoras?: { igdbId: number }[] }>(
      request,
      `/api/jogos/${jogos.results[0].id}/details`,
    );
    samples.companyId = jogoDet?.desenvolvedoras?.[0]?.igdbId ?? null;
  }

  const saga = sagas?.sagas?.[0];
  samples.sagaId = saga?.id != null ? String(saga.id) : saga?.slug ?? null;
  const uni = universos?.universos?.[0];
  samples.universoId = uni?.id ?? uni?.slug ?? null;

  const dubSearch = await jsonOrNull<{ results?: { id: number }[] }>(
    request,
    '/api/pesquisa?q=du&category=pessoas',
  );
  samples.dubladorId = dubSearch?.results?.[0]?.id ?? samples.pessoaId;

  return samples;
}

export type ResolvedUiRoute = {
  path: string;
  kind: 'static' | 'dynamic';
  label: string;
};

export function resolveAllUiRoutes(samples: RouteSamples): ResolvedUiRoute[] {
  const staticRoutes: ResolvedUiRoute[] = STATIC_UI_ROUTES.map((path) => ({
    path,
    kind: 'static' as const,
    label: path,
  }));

  const dynamicRoutes: ResolvedUiRoute[] = [];
  for (const tmpl of DYNAMIC_UI_ROUTES) {
    const built = tmpl.build(samples);
    if (built) {
      dynamicRoutes.push({ path: built, kind: 'dynamic', label: tmpl.label });
    }
  }

  return [...staticRoutes, ...dynamicRoutes];
}
