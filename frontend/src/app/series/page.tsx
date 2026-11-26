import type { Metadata } from 'next';
import SeriesClient from './SeriesClient';
import { fetchSeriesPageData, type SeriesPageData } from '@/lib/apiServer';
import { getSiteUrl } from '@/lib/siteUrl';

export const metadata: Metadata = {
  title: 'Séries — Orbe Nerd',
  description:
    'Explore séries populares, lançamentos e clássicos — filtros por gênero, ano, status e plataforma.',
  alternates: { canonical: `${getSiteUrl()}/series` },
};

const emptyData: SeriesPageData = {
  results: [],
  total: 0,
  filters: { genres: [], years: [], statuses: [], platforms: [] },
};

export const revalidate = 300;

export default async function SeriesPage() {
  let data: SeriesPageData;
  try {
    data = await fetchSeriesPageData();
  } catch {
    data = emptyData;
  }

  return <SeriesClient initialData={data} />;
}
