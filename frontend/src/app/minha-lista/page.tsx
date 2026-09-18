'use client';

import Link from 'next/link';
import { Film, Tv, Gamepad2, Sparkles } from 'lucide-react';

const sections = [
  {
    href: '/minha-lista/animes',
    title: 'Animes',
    description: 'Sua fila pessoal com progresso por episódio e sync Crunchyroll.',
    icon: Sparkles,
    available: true,
  },
  {
    href: '#',
    title: 'Filmes',
    description: 'Em breve — acompanhe o que quer assistir.',
    icon: Film,
    available: false,
  },
  {
    href: '#',
    title: 'Séries',
    description: 'Em breve — temporadas e episódios.',
    icon: Tv,
    available: false,
  },
  {
    href: '#',
    title: 'Jogos',
    description: 'Em breve — backlog de jogos.',
    icon: Gamepad2,
    available: false,
  },
];

export default function MinhaListaHubPage() {
  return (
    <div className="container mx-auto px-4 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold">Minha Lista</h1>
        <p className="text-muted-foreground mt-2">
          Organize o que você consome — começando pelos animes.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {sections.map((section) => {
          const Icon = section.icon;
          const card = (
            <div
              className={`rounded-xl border p-6 h-full transition-shadow ${
                section.available
                  ? 'hover:shadow-md hover:border-primary/40 cursor-pointer'
                  : 'opacity-60'
              }`}
            >
              <Icon className="h-8 w-8 text-primary mb-4" />
              <h2 className="text-xl font-bold">{section.title}</h2>
              <p className="text-sm text-muted-foreground mt-2">{section.description}</p>
              {!section.available && (
                <span className="inline-block mt-4 text-xs font-bold uppercase text-primary">
                  Em breve
                </span>
              )}
            </div>
          );

          return section.available ? (
            <Link key={section.title} href={section.href}>
              {card}
            </Link>
          ) : (
            <div key={section.title}>{card}</div>
          );
        })}
      </div>
    </div>
  );
}
