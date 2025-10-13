import { Midia, Filme, Serie, Anime, Jogo, Character } from '@/types';

/**
 * Normaliza o nome de um provedor de streaming para um valor padrão.
 * @param name O nome original do provedor.
 * @returns O nome padronizado.
 */
export const normalizeProviderName = (name: string): string => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('netflix')) return 'Netflix';
  if (lowerName.includes('max')) return 'Max';
  if (lowerName.includes('prime video')) return 'Prime Video';
  if (lowerName.includes('disney')) return 'Disney+';
  if (lowerName.includes('crunchyroll')) return 'Crunchyroll';
  if (lowerName.includes('star+')) return 'Star+';
  if (lowerName.includes('apple tv')) return 'Apple TV+';
  return name;
};

/**
 * Extrai uma lista única e normalizada de provedores de streaming de um item de mídia.
 * @param item O objeto de mídia (filme, série ou anime).
 * @returns Uma lista de objetos de provedor com nome e ícone.
 */
export const getStreamingProviders = (item: Midia): { name: string; icon: string }[] => {
  const providerNames = item.plataformas_api?.map(p => normalizeProviderName(p.nome)) ?? [];
  const uniqueProviderNames = [...new Set(providerNames)];
  
  const providers = uniqueProviderNames.map(name => ({
      name: name,
      icon: name.toLowerCase().replace('+', 'plus').replace(/ /g, '-')
  }));

  // Lógica para "Nos Cinemas"
  if (('duracao' in item) && providers.length === 0) { // 'duracao' in item é um proxy para verificar se é um filme
    return [{ name: 'Nos Cinemas', icon: 'cinema' }];
  }

  return providers;
};

/**
 * Extrai uma lista única e padronizada de plataformas de um jogo.
 * @param item O objeto de jogo.
 * @returns Uma lista de objetos de plataforma com nome e ícone.
 */
export const getGamePlatforms = (item: Jogo): { name: string; icon: string }[] => {
  const platformNames = item.plataformas_api?.map(p => p.nome) ?? [];
  const normalized = new Set<string>();

  platformNames.forEach(name => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('playstation')) {
      normalized.add('PlayStation');
    } else if (lowerName.includes('xbox')) {
      normalized.add('Xbox');
    } else if (lowerName.includes('pc') || lowerName.includes('windows')) {
      normalized.add('PC');
    } else if (lowerName.includes('switch')) {
      normalized.add('Nintendo Switch');
    } else {
      normalized.add(name);
    }
  });

  return Array.from(normalized).map(name => ({
    name: name,
    icon: name.toLowerCase().replace(/ /g, '-')
  }));
};

/**
 * Verifica se um anime possui dublagem em português.
 * A lógica foi robustecida para iterar sobre todos os personagens.
 * @param item O objeto de anime.
 * @returns "Dublado" ou "Legendado".
 */
export const getAnimeDubStatus = (item: Anime): 'Dublado' | 'Legendado' => {
  if (!item.personagens || item.personagens.length === 0) {
    return 'Legendado';
  }

  for (const character of item.personagens) {
    // A propriedade `pt` indica a presença de dublador brasileiro.
    if (character.dubladores?.pt) {
      return 'Dublado';
    }
  }

  return 'Legendado';
};

/**
 * Formata a nota de avaliação de um item de mídia para uma string (ex: "8.1").
 * @param item O objeto de mídia.
 * @param type O tipo da mídia ('filme', 'serie', 'anime').
 * @returns A nota formatada ou null se não houver nota.
 */
export const formatRating = (item: Midia, type: 'filme' | 'serie' | 'anime' | 'jogo'): string | null => {
  const rating = item.avaliacao;
  if (typeof rating === 'number' && rating > 0) {
    return (rating / 10).toFixed(1);
  }
  return null;
};

/**
 * Extrai e formata os links de lojas digitais de um objeto de jogo.
 * @param item O objeto de jogo.
 * @returns Uma lista de objetos de loja com nome, ícone e URL.
 */
export const getGameStores = (item: Jogo): { name: string; icon: string; url: string }[] => {
  if (!item.websites) return [];

  // Mapeamento de IDs de categoria de website da IGDB para informações da loja
  const storeCategoryMapping: { [key: number]: { name: string; icon: string; } } = {
    13: { name: 'Steam', icon: 'steam' },
    16: { name: 'Epic Games', icon: 'epic-games' },
    17: { name: 'GOG', icon: 'gog' },
    10: { name: 'App Store', icon: 'apple' },
    11: { name: 'App Store', icon: 'apple' },
    12: { name: 'Google Play', icon: 'google-play' },
  };

  // Mapeamento de substrings de URL para informações da loja
  const storeUrlMapping = [
    { contains: 'store.playstation.com', name: 'PlayStation Store', icon: 'playstation' },
    { contains: 'xbox.com', name: 'Xbox Store', icon: 'xbox' },
    { contains: 'nintendo.com', name: 'Nintendo eShop', icon: 'nintendo switch' },
  ];

  const foundStores = new Map<string, { name: string; icon: string; url: string }>();

  for (const website of item.websites) {
    let storeInfo: { name: string; icon: string; } | null = null;

    // 1. Tenta encontrar pela categoria
    if (storeCategoryMapping[website.category]) {
      storeInfo = storeCategoryMapping[website.category];
    } 
    // 2. Se não encontrou, tenta encontrar por substring da URL
    else {
      const urlMatch = storeUrlMapping.find(mapping => website.url.includes(mapping.contains));
      if (urlMatch) {
        storeInfo = urlMatch;
      }
    }

    // Se encontrou uma loja e ela ainda não foi adicionada, adiciona à lista
    if (storeInfo && !foundStores.has(storeInfo.name)) {
      foundStores.set(storeInfo.name, {
        ...storeInfo,
        url: website.url,
      });
    }
  }

  return Array.from(foundStores.values());
};

/**
 * Traduz uma função (job) de inglês para português.
 * @param role A função em inglês.
 * @returns A função traduzida ou a original se não houver tradução.
 */
export const translateRole = (role: string): string => {
  const roleDictionary: { [key: string]: string } = {
    'Director': 'Diretor(a)',
    'Screenplay': 'Roteiro',
    'Writer': 'Escritor(a)',
    'Creator': 'Criador(a)',
    'Producer': 'Produtor(a)',
    'Original Story': 'História Original',
    'Voice Actor': 'Dublador(a)',
    // Adicione outras traduções comuns aqui
  };

  return roleDictionary[role] || role;
};
