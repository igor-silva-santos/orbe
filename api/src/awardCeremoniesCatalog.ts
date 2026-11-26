// Catálogo das cerimônias que a aba Premiações mostra mesmo quando o JSON
// `premiacoes` dos títulos está vazio. Fatos públicos conferidos em novembro
// de 2026 (Oscar, Emmy, The Anime Awards e The Game Awards).
// The Game Awards 2026 ainda não aconteceu: não há vencedor gravado de propósito.
// Depois de 10 de dezembro de 2026, preencher `vencedor` nas categorias do TGA.

export type AwardMediaType = 'filme' | 'serie' | 'anime' | 'jogo';

export type AwardNominee = {
  titulo: string;
  tipo: AwardMediaType;
};

export type AwardCategorySource = {
  nome: string;
  indicados: AwardNominee[];
  vencedor: string | null;
};

export type AwardVotingWindow = {
  inicio: string;
  fim: string;
  aviso: string;
  url: string | null;
};

export type AwardCeremonySource = {
  id: string;
  nome: string;
  ano: number;
  tipos: AwardMediaType[];
  data: string;
  instanteCerimonia: string;
  descricao: string;
  url: string | null;
  votacao: AwardVotingWindow | null;
  categorias: AwardCategorySource[];
};

const cat = (
  nome: string,
  tipo: AwardMediaType,
  vencedor: string | null,
  titulos: string[],
): AwardCategorySource => {
  const indicados = titulos.map((titulo) => ({ titulo, tipo }));
  if (vencedor && !indicados.some((item) => item.titulo === vencedor)) {
    indicados.unshift({ titulo: vencedor, tipo });
  }
  return { nome, indicados, vencedor };
};

export const AWARD_CEREMONIES: AwardCeremonySource[] = [
  {
    id: 'oscar-2026',
    nome: 'Oscar',
    ano: 2026,
    tipos: ['filme'],
    data: '15 de março de 2026',
    instanteCerimonia: '2026-03-16T04:00:00.000Z',
    descricao: '98ª cerimônia do Oscar, no Dolby Theatre, para filmes lançados em 2025.',
    url: 'https://www.oscars.org/oscars/ceremonies/2026',
    votacao: null,
    categorias: [
      cat('Melhor Filme', 'filme', 'One Battle After Another', [
        'One Battle After Another',
        'Bugonia',
        'F1',
        'Frankenstein',
        'Hamnet',
        'Marty Supreme',
        'The Secret Agent',
        'Sentimental Value',
        'Sinners',
        'Train Dreams',
      ]),
    ],
  },
  {
    id: 'emmy-2026',
    nome: 'Emmy',
    ano: 2026,
    tipos: ['serie'],
    data: '14 de setembro de 2026',
    instanteCerimonia: '2026-09-15T04:00:00.000Z',
    descricao: '78º Emmy do Primetime, para séries exibidas entre junho de 2025 e maio de 2026.',
    url: 'https://www.televisionacademy.com/awards/nominees-winners/2026/outstanding-drama-series',
    votacao: null,
    categorias: [
      cat('Melhor Série Dramática', 'serie', 'The Pitt', [
        'The Pitt',
        'The Diplomat',
        'The Gilded Age',
        'A Knight of the Seven Kingdoms',
        'Paradise',
        'Pluribus',
        'Slow Horses',
        'Your Friends & Neighbors',
      ]),
      cat('Melhor Série de Comédia', 'serie', "Widow's Bay", [
        "Widow's Bay",
        'Abbott Elementary',
        'The Bear',
        'Hacks',
        "Margo's Got Money Troubles",
        'Nobody Wants This',
        'Only Murders in the Building',
        'Shrinking',
      ]),
      cat('Melhor Minissérie ou Antologia', 'serie', 'DTF St. Louis', [
        'DTF St. Louis',
        'All Her Fault',
        'The Beast in Me',
        'Beef',
        'Love Story: John F. Kennedy Jr. & Carolyn Bessette',
      ]),
    ],
  },
  {
    id: 'anime-awards-2026',
    nome: 'The Anime Awards',
    ano: 2026,
    tipos: ['anime'],
    data: '23 de maio de 2026',
    instanteCerimonia: '2026-05-23T11:00:00.000Z',
    descricao: '10º The Anime Awards, em Tóquio. A votação dos fãs desta edição já encerrou.',
    url: 'https://www.crunchyroll.com/news/latest/2026/5/22/anime-awards-2026-winners-list/',
    votacao: null,
    categorias: [
      cat('Anime do Ano', 'anime', 'My Hero Academia FINAL SEASON', [
        'My Hero Academia FINAL SEASON',
        'The Apothecary Diaries Season 2',
        'DAN DA DAN Season 2',
        'Gachiakuta',
        'The Summer Hikaru Died',
        "Takopi's Original Sin",
      ]),
      cat('Filme do Ano', 'anime', 'Demon Slayer: Kimetsu no Yaiba Infinity Castle', [
        'Demon Slayer: Kimetsu no Yaiba Infinity Castle',
        '100 Meters',
        'Chainsaw Man – The Movie: Reze Arc',
        'Mononoke the Movie: Chapter II — The Ashes of Rage',
        'The Rose of Versailles',
      ]),
      cat('Melhor Série em Exibição', 'anime', 'ONE PIECE', [
        'ONE PIECE',
        'DAN DA DAN Season 2',
        'Kaiju No. 8 Season 2',
        'My Hero Academia FINAL SEASON',
        'Solo Leveling Season 2 -Arise from the Shadow-',
        'SPY x FAMILY Season 3',
      ]),
      cat('Melhor Série Nova', 'anime', 'Gachiakuta', [
        'Gachiakuta',
        'Clevatess',
        'The Fragrant Flower Blooms With Dignity',
        'SAKAMOTO DAYS',
        'The Summer Hikaru Died',
        "Takopi's Original Sin",
      ]),
      cat('Melhor Anime Original', 'anime', 'Lazarus', [
        'Lazarus',
        'Apocalypse Hotel',
        'Mobile Suit Gundam GQuuuuuuX',
      ]),
      cat('Melhor Animação', 'anime', 'Solo Leveling Season 2 -Arise from the Shadow-', [
        'Solo Leveling Season 2 -Arise from the Shadow-',
        'DAN DA DAN Season 2',
        'My Hero Academia FINAL SEASON',
        'ONE PIECE',
        "Takopi's Original Sin",
      ]),
      cat('Melhor Romance', 'anime', 'The Fragrant Flower Blooms With Dignity', [
        'The Fragrant Flower Blooms With Dignity',
        'Blue Box',
        'DAN DA DAN Season 2',
        'Honey Lemon Soda',
        'My Dress-Up Darling Season 2',
        'Ranma 1/2 Season 2',
      ]),
      cat('Melhor Comédia', 'anime', 'DAN DA DAN Season 2', [
        'DAN DA DAN Season 2',
        'CITY THE ANIMATION',
        'My Dress-Up Darling Season 2',
        'Ranma 1/2 Season 2',
        'SPY x FAMILY Season 3',
      ]),
      cat('Melhor Ação', 'anime', 'Solo Leveling Season 2 -Arise from the Shadow-', [
        'Solo Leveling Season 2 -Arise from the Shadow-',
        'DAN DA DAN Season 2',
        'Gachiakuta',
        'Kaiju No. 8 Season 2',
        'My Hero Academia FINAL SEASON',
      ]),
      cat('Melhor Isekai', 'anime', 'Re:ZERO -Starting Life in Another World- Season 3', [
        'Re:ZERO -Starting Life in Another World- Season 3',
        'Campfire Cooking in Another World with My Absurd Skill Season 2',
        'Disney Twisted-Wonderland: The Animation — Season 1 "Episode of Heartslabyul"',
        "From Bureaucrat to Villainess: Dad's Been Reincarnated!",
        "KONOSUBA -God's Blessing on This Wonderful World! 3 -BONUS STAGE-",
      ]),
      cat('Melhor Drama', 'anime', 'The Apothecary Diaries Season 2', [
        'The Apothecary Diaries Season 2',
        'Anne Shirley',
        'Blue Box',
        'Orb: On the Movements of the Earth',
        'The Summer Hikaru Died',
        "Takopi's Original Sin",
      ]),
      cat('Melhor Slice of Life', 'anime', 'SPY x FAMILY Season 3', [
        'SPY x FAMILY Season 3',
        'Anne Shirley',
        'Blue Box',
        'CITY THE ANIMATION',
        'The Fragrant Flower Blooms With Dignity',
        'My Dress-Up Darling Season 2',
      ]),
    ],
  },
  {
    id: 'tga-2026',
    nome: 'The Game Awards',
    ano: 2026,
    tipos: ['jogo'],
    data: '10 de dezembro de 2026',
    instanteCerimonia: '2026-12-11T04:00:00.000Z',
    descricao: 'Cerimônia no Peacock Theater, em Los Angeles. O voto dos fãs vale 10% do resultado.',
    url: 'https://thegameawards.com/',
    votacao: {
      inicio: '2026-11-17T08:00:00.000Z',
      fim: '2026-12-10T02:00:00.000Z',
      aviso:
        'A votação dos fãs do The Game Awards 2026 está aberta até 9 de dezembro de 2026, às 18h no horário do Pacífico. O voto do público vale 10% do resultado.',
      url: 'https://thegameawards.com/',
    },
    categorias: [
      cat('Jogo do Ano', 'jogo', null, [
        '007 First Light',
        'Control Resonant',
        'Grand Theft Auto VI',
        'Phantom Blade Zero',
        'Resident Evil Requiem',
        'The Legend of Zelda: Ocarina of Time',
      ]),
      cat('Melhor Direção', 'jogo', null, [
        'Control Resonant',
        'Grand Theft Auto VI',
        'Phantom Blade Zero',
        'Pragmata',
        'Resident Evil Requiem',
      ]),
      cat('Melhor Narrativa', 'jogo', null, [
        '007 First Light',
        'Control Resonant',
        'Grand Theft Auto VI',
        'Resident Evil Requiem',
        'The Blood of Dawnwalker',
      ]),
      cat('Melhor Direção de Arte', 'jogo', null, [
        'Control Resonant',
        'Grand Theft Auto VI',
        'Mouse: P.I. For Hire',
        'Phantom Blade Zero',
        'The Legend of Zelda: Ocarina of Time',
      ]),
      cat('Melhor Trilha Sonora', 'jogo', null, [
        'Ace Combat 8: Wings of Theve',
        'Grand Theft Auto VI',
        'Mixtape',
        'Phantom Blade Zero',
        'The Legend of Zelda: Ocarina of Time',
      ]),
      cat('Melhor Design de Áudio', 'jogo', null, [
        'Ace Combat 8: Wings of Theve',
        'Control Resonant',
        'Grand Theft Auto VI',
        'Resident Evil Requiem',
        'Star Wars: Galactic Racer',
      ]),
      cat('Jogos de Impacto', 'jogo', null, [
        'Big Walk',
        'Cairn',
        'Forever Ago',
        'Life is Strange: Reunion',
        "lily's world XD",
        'Mixtape',
      ]),
      cat('Melhor Jogo em Atualização', 'jogo', null, [
        'Arc Raiders',
        'Final Fantasy XIV',
        'Fortnite',
        "No Man's Sky",
        'The Witcher 3: Wild Hunt',
      ]),
      cat('Melhor Indie de Estreia', 'jogo', null, [
        'Dressmaker',
        'Esoteric Ebb',
        'Orbitals',
        'Replaced',
        'Silver Pines',
      ]),
      cat('Melhor Jogo de RV/RA', 'jogo', null, [
        'Forefront',
        'Into the Radius 2',
        'Little Nightmares VR: Altered Echoes',
        'Teenage Mutant Ninja Turtles: Empire City',
        'Thief VR: Legacy of Shadow',
      ]),
      cat('Melhor Jogo de Luta', 'jogo', null, [
        '2XKO',
        'Avatar Legends: The Fighting Game',
        'Invincible VS',
        'Marvel Tōkon: Fighting Souls',
        "My Hero Academia: All's Justice",
      ]),
    ],
  },
];
