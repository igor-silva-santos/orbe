import type { Metadata } from 'next';
import FilmesClient from './FilmesClient';
import { fetchFilmesPageData, type FilmesPageData } from '@/lib/apiServer';
import { getSiteUrl } from '@/lib/siteUrl';

export const metadata: Metadata = {
  title: 'Filmes — Orbe Nerd',
  description:
    'Descubra os melhores filmes em cartaz, lançamentos e clássicos do cinema — filtros por gênero, ano e plataforma.',
  alternates: { canonical: `${getSiteUrl()}/filmes` },
};

const emptyData: FilmesPageData = {
  results: [],
  total: 0,
  filters: { genres: [], years: [], statuses: [], platforms: [] },
};

export const revalidate = 300;

export default async function FilmesPage() {
  let data: FilmesPageData;
  try {
    data = await fetchFilmesPageData();
  } catch {
    data = emptyData;
  }

  return <FilmesClient initialData={data} />;
}
