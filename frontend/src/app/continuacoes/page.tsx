import { Suspense } from 'react';
import ContinuacoesClient from './ContinuacoesClient';

export const revalidate = 3600;

export default function ContinuacoesPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-16 text-muted-foreground">Carregando...</div>}>
      <ContinuacoesClient />
    </Suspense>
  );
}
