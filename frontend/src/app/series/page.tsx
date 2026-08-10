import SeriesClient from './SeriesClient';
import { fetchSeriesPageData, type SeriesPageData } from '@/lib/apiServer';

const emptyData: SeriesPageData = {
  results: [],
  total: 0,
  filters: { genres: [], years: [], statuses: [] },
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
