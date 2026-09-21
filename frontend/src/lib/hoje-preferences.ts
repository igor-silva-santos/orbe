export type HojeSectionKey =
  | 'cinema'
  | 'estreiasSemana'
  | 'streamingFilmes'
  | 'streamingSeries'
  | 'streamingAnimes'
  | 'destaquesJogos';

export const HOJE_SECTION_OPTIONS: { id: HojeSectionKey; label: string }[] = [
  { id: 'cinema', label: 'Cinema (em cartaz)' },
  { id: 'estreiasSemana', label: 'Estreias da semana' },
  { id: 'streamingFilmes', label: 'Filmes no streaming' },
  { id: 'streamingSeries', label: 'Séries no streaming' },
  { id: 'streamingAnimes', label: 'Animes em exibição' },
  { id: 'destaquesJogos', label: 'Jogos em destaque' },
];

const STORAGE_KEY = 'orbe-hoje-sections';

export function loadHojeSections(): Set<HojeSectionKey> {
  if (typeof window === 'undefined') {
    return new Set(HOJE_SECTION_OPTIONS.map((option) => option.id));
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set(HOJE_SECTION_OPTIONS.map((option) => option.id));
    const parsed = JSON.parse(raw) as HojeSectionKey[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return new Set(HOJE_SECTION_OPTIONS.map((option) => option.id));
    }
    return new Set(parsed);
  } catch {
    return new Set(HOJE_SECTION_OPTIONS.map((option) => option.id));
  }
}

export function saveHojeSections(sections: Set<HojeSectionKey>) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(sections)));
}
