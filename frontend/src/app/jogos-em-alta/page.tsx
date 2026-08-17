import { redirect } from 'next/navigation';

/** Jogos em alta agora vivem em /promocoes?tab=em-alta */
export default function JogosEmAltaPage() {
  redirect('/promocoes?tab=em-alta');
}
