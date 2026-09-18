'use client';

import { useCallback, useEffect, useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { toast } from 'sonner';
import SafeImage from '@/components/ui/SafeImage';
import { Button } from '@/components/ui/button';
import orbeNerdApi from '@/lib/api';
import type { Anime } from '@/types';

interface AddAnimeFromCatalogProps {
  onAdded: () => void;
}

export default function AddAnimeFromCatalog({ onAdded }: AddAnimeFromCatalogProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Anime[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [addingId, setAddingId] = useState<number | null>(null);

  const runSearch = useCallback(async (term: string) => {
    const q = term.trim();
    if (q.length < 2) {
      setResults([]);
      return;
    }
    setIsSearching(true);
    try {
      const data = await orbeNerdApi.search(q, 'animes');
      setResults((data.animes ?? []) as Anime[]);
    } catch {
      toast.error('Não foi possível buscar no catálogo do Orbe.');
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      runSearch(query);
    }, 350);
    return () => window.clearTimeout(timer);
  }, [query, runSearch]);

  const handleAdd = async (anime: Anime) => {
    setAddingId(anime.id);
    try {
      await orbeNerdApi.addAnimeFromCatalog({ anilistId: anime.id, status: 'comecar' });
      toast.success(`"${anime.titulo_curado || anime.titulo_api}" adicionado à lista.`);
      onAdded();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erro ao adicionar anime.');
    } finally {
      setAddingId(null);
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-4">
      <div>
        <h2 className="font-bold text-lg flex items-center gap-2">
          <Search className="h-5 w-5 text-primary" />
          Adicionar do catálogo Orbe
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Busque animes já sincronizados no banco do Orbe e adicione manualmente à sua lista.
        </p>
      </div>

      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ex.: One Piece, Naruto..."
        className="w-full rounded-lg border px-3 py-2 bg-background text-sm"
        aria-label="Buscar anime no catálogo"
      />

      {isSearching && <p className="text-xs text-muted-foreground">Buscando...</p>}

      {!isSearching && query.trim().length >= 2 && results.length === 0 && (
        <p className="text-sm text-muted-foreground">Nenhum anime encontrado no catálogo.</p>
      )}

      {results.length > 0 && (
        <ul className="divide-y divide-border max-h-72 overflow-y-auto rounded-lg border">
          {results.map((anime) => {
            const title = anime.titulo_curado || anime.titulo_api;
            return (
              <li key={anime.id} className="flex items-center gap-3 p-3">
                <div className="w-10 h-14 rounded overflow-hidden bg-muted shrink-0">
                  <SafeImage
                    src={anime.poster_curado || anime.poster_url_api}
                    alt={title}
                    width={40}
                    height={56}
                    className="w-full h-full object-cover"
                    fallbackLabel="?"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{title}</p>
                  {anime.data_lancamento_api && (
                    <p className="text-xs text-muted-foreground">{anime.data_lancamento_api}</p>
                  )}
                </div>
                <Button
                  size="sm"
                  disabled={addingId === anime.id}
                  onClick={() => handleAdd(anime)}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  {addingId === anime.id ? '...' : 'Adicionar'}
                </Button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
