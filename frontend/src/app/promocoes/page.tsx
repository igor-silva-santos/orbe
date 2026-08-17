import PromocoesClient from './PromocoesClient';

export const revalidate = 600;

type PromocoesPageProps = {
  searchParams?: { tab?: string };
};

export default function PromocoesPage({ searchParams }: PromocoesPageProps) {
  const initialTab = searchParams?.tab === 'promocoes' ? 'promocoes' : 'gratis';
  return <PromocoesClient initialTab={initialTab} />;
}
