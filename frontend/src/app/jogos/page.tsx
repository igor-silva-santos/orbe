import JogosClient from './JogosClient';
import { fetchJogosPageData, type JogosPageData } from '@/lib/apiServer';

const emptyData: JogosPageData = {
  results: [],
  total: 0,
  filters: { genres: [], platforms: [], gameModes: [], gameEngines: [] },
};

export const revalidate = 300;

export default async function JogosPage() {
  let data: JogosPageData;
  try {
    data = await fetchJogosPageData();
  } catch {
    data = emptyData;
  }

  return <JogosClient initialData={data} />;
}
