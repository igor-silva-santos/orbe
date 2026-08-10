import AnimesClient from './AnimesClient';
import { fetchAnimesPageData, type AnimesPageData } from '@/lib/apiServer';

const emptyData: AnimesPageData = {
  results: [],
  total: 0,
  filters: { genres: [], years: [], formats: [], sources: [], statuses: [] },
};

export const revalidate = 300;

export default async function AnimesPage() {
  let data: AnimesPageData;
  try {
    data = await fetchAnimesPageData();
  } catch {
    data = emptyData;
  }

  return <AnimesClient initialData={data} />;
}
