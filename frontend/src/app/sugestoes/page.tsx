'use client';

import { Lightbulb } from 'lucide-react';
import Link from 'next/link';

export default function SugestoesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Lightbulb className="h-12 w-12 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-bold orbe-text-primary mb-2">Sugerir Conteúdo</h1>
          <p className="text-muted-foreground">Falta algum filme, série, anime ou jogo? Sugira para nossa equipe.</p>
        </div>
        <div className="bg-muted/30 rounded-xl p-6 space-y-4">
          <p className="text-sm text-muted-foreground">
            Informe o título, tipo de mídia e, se possível, links de referência (TMDB, AniList, IGDB).
          </p>
          <Link href="/contato?assunto=Sugest%C3%A3o+de+Conte%C3%BAdo" className="inline-block bg-primary text-primary-foreground font-medium px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors">
            Enviar sugestão via Contato
          </Link>
        </div>
      </div>
    </div>
  );
}
