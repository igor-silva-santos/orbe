import FilmesClient from './FilmesClient';
import { fetchFilmesPageData, type FilmesPageData } from '@/lib/apiServer';

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
