'use client';

import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { X, Search } from 'lucide-react';
import { useAppStore } from '@/stores/appStore';
import realApi from '@/data/realApi';
import MidiaCard from '@/components/media/MidiaCard';
import type { SearchResultItem } from '@/types';

const SearchOverlay: React.FC = () => {
  const { isSearchOpen, closeSearch } = useAppStore();

  type CategoryID = 'todos' | 'filmes' | 'series' | 'animes' | 'jogos';

  const categories: { id: CategoryID; label: string }[] = [
    { id: 'todos', label: 'Todos' },
    { id: 'filmes', label: 'Filmes' },
    { id: 'series', label: 'Séries' },
    { id: 'animes', label: 'Animes' },
    { id: 'jogos', label: 'Jogos' },
  ];

  const handleClose = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory('todos');
    setSearchResults([]);
    closeSearch();
    if (window.history.state?.modal === 'search') {
      window.history.back();
    }
  }, [closeSearch]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'todos' | 'filmes' | 'series' | 'animes' | 'jogos'>('todos');
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  const [trendingContent, setTrendingContent] = useState<SearchResultItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleClose();
    };
    const handlePopState = () => {
      closeSearch();
    };

    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
      if (!window.history.state?.modal) {
        window.history.pushState({ modal: 'search' }, '');
      }
      window.addEventListener('popstate', handlePopState);
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSearchOpen, handleClose, closeSearch]);

  useEffect(() => {
    const fetchTrending = async () => {
      if (isSearchOpen && trendingContent.length === 0) {
        setIsLoading(true);
        const trending = await realApi.getTrending(undefined, 20);
        setTrendingContent(trending as SearchResultItem[]);
        setIsLoading(false);
      }
    };
    fetchTrending();
  }, [isSearchOpen, trendingContent.length]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    const debounceTimer = setTimeout(async () => {
      const results = await realApi.search(searchQuery);
      const allResults = [
        ...results.filmes, 
        ...results.series, 
        ...results.animes, 
        ...results.jogos
      ];
      setSearchResults(allResults);
      setIsLoading(false);
    }, 350);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const displayContent = useMemo(() => {
    if (searchQuery.trim()) return searchResults;
    return trendingContent;
  }, [searchQuery, searchResults, trendingContent]);

  const groupedContent = useMemo(() => {
    const groups = {
      filmes: displayContent.filter(item => item.type === 'filme'),
      series: displayContent.filter(item => item.type === 'serie'),
      animes: displayContent.filter(item => item.type === 'anime'),
      jogos: displayContent.filter(item => item.type === 'jogo'),
    };

    if (selectedCategory === 'todos') return groups;
    
    return {
      filmes: selectedCategory === 'filmes' ? groups.filmes : [],
      series: selectedCategory === 'series' ? groups.series : [],
      animes: selectedCategory === 'animes' ? groups.animes : [],
      jogos: selectedCategory === 'jogos' ? groups.jogos : [],
    };

  }, [displayContent, selectedCategory]);

  const totalResults = Object.values(groupedContent).reduce((acc, group) => acc + group.length, 0);

  if (!isSearchOpen) return null;

  const renderGroup = (title: string, items: SearchResultItem[], baseIndex: number) => {
    if (items.length === 0) return null;
    return (
      <div key={title} className="space-y-4">
        <h3 className="font-display text-lg orbe-text-primary flex items-center gap-2">
          <span className="w-1.5 h-5 bg-primary rounded-full" />
          {title}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center items-stretch">
          {items.map((item, index) => {
            const itemIndex = baseIndex + index;
            return (
              <div key={`${item.type}-${item.id}`} className="h-full w-full max-w-[210px]">
                <MidiaCard 
                  ref={el => { cardRefs.current[itemIndex] = el; }}
                  midia={item} 
                  type={item.type} 
                  isFocused={itemIndex === focusedIndex}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="search-overlay overflow-x-hidden">
      <div className="container mx-auto px-4 py-6 md:py-8 h-full max-w-6xl">
        <div className="bg-card rounded-lg shadow-xl border border-border p-5 md:p-8 max-h-[92vh] overflow-hidden flex flex-col">
          <div className="flex justify-between items-center mb-6 shrink-0">
            <h2 className="font-display text-2xl orbe-text-primary">Pesquisar</h2>
            <button onClick={handleClose} className="p-2 rounded-full hover:bg-muted transition-colors orbe-text-primary">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-5 shrink-0">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Filme, série, anime ou jogo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-3.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary orbe-text-primary placeholder:text-muted-foreground"
                autoFocus
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-primary">
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-card orbe-text-primary border-border hover:bg-muted'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex-1 overflow-y-auto overflow-x-hidden pr-1 scrollbar-hide">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-display text-lg orbe-text-primary">
                {searchQuery.trim() ? 'Resultados' : 'Em Alta'}
              </h3>
              {!isLoading && totalResults > 0 && (
                <span className="text-sm text-muted-foreground font-semibold">
                  {totalResults} {totalResults === 1 ? 'resultado' : 'resultados'}
                </span>
              )}
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
              </div>
            ) : totalResults > 0 ? (
              <div className="space-y-8 pb-4">
                {renderGroup('Filmes', groupedContent.filmes, 0)}
                {renderGroup('Séries', groupedContent.series, groupedContent.filmes.length)}
                {renderGroup('Animes', groupedContent.animes, groupedContent.filmes.length + groupedContent.series.length)}
                {renderGroup('Jogos', groupedContent.jogos, groupedContent.filmes.length + groupedContent.series.length + groupedContent.animes.length)}
              </div>
            ) : searchQuery.trim() ? (
              <div className="text-center py-16 bg-muted rounded-lg border border-border">
                <p className="text-muted-foreground font-medium">Nenhum resultado para <strong className="orbe-text-primary">{searchQuery}</strong></p>
                <p className="text-sm text-muted-foreground mt-2">Tente outro termo ou categoria</p>
              </div>
            ) : (
              <div className="text-center py-16 text-muted-foreground">Nenhum conteúdo em alta no momento.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
