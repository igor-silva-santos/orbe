import { getSiteUrl } from '@/lib/siteUrl';

const siteUrl = getSiteUrl();

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Orbe Nerd',
  alternateName: 'Orbe Nerd - Hub de Estreias',
  url: siteUrl,
  description:
    'Hub brasileiro para acompanhar lançamentos e estreias de filmes, séries, animes e jogos. Calendário de estreias, busca e promoções.',
  inLanguage: 'pt-BR',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteUrl}/?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Orbe Nerd',
  url: siteUrl,
  logo: `${siteUrl}/favicon.svg`,
  description: 'Agregador de lançamentos nerd em português.',
};

export default function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  );
}
