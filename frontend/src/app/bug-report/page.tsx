'use client';

import { Bug } from 'lucide-react';
import Link from 'next/link';

export default function BugReportPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Bug className="h-12 w-12 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-bold orbe-text-primary mb-2">Reportar Bug</h1>
          <p className="text-muted-foreground">Encontrou um problema? Nos ajude a melhorar o Orbe Nerd.</p>
        </div>
        <div className="bg-muted/30 rounded-xl p-6 space-y-4">
          <p className="text-sm text-muted-foreground">
            Descreva o bug encontrado com o máximo de detalhes possível: página, ação realizada e o que aconteceu.
          </p>
          <Link href="/contato" className="inline-block bg-primary text-primary-foreground font-medium px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors">
            Enviar relatório via Contato
          </Link>
        </div>
      </div>
    </div>
  );
}
