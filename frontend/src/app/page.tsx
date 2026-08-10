import HomeClient from './HomeClient';
import { fetchHomepage } from '@/lib/apiServer';

export default async function Home() {
  let data;
  try {
    data = await fetchHomepage();
  } catch {
    data = { filmes: [], series: [], jogos: [], animes: [] };
  }

  return <HomeClient initialData={data} />;
}
