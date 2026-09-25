import PromocoesClient from './PromocoesClient';

export const revalidate = 600;

export type PromocoesTab = 'gratis' | 'promocoes' | 'em-alta' | 'recomendacoes';

type PromocoesPageProps = {
  searchParams?: { tab?: string };
};

function resolveInitialTab(tab?: string): PromocoesTab {
  if (tab === 'promocoes') return 'promocoes';
  if (tab === 'em-alta') return 'em-alta';
  if (tab === 'recomendacoes') return 'recomendacoes';
  return 'gratis';
}

export default function PromocoesPage({ searchParams }: PromocoesPageProps) {
  return <PromocoesClient initialTab={resolveInitialTab(searchParams?.tab)} />;
}
