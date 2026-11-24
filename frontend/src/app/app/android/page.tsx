import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'App Android — Orbe Nerd',
  description: 'Baixe o APK oficial do Orbe Nerd para Android.',
};

const APK_URL = process.env.NEXT_PUBLIC_ANDROID_APK_URL?.trim() || '';

export default function AndroidAppDownloadPage() {
  const hasApk = APK_URL.length > 0;

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12 space-y-8">
      <h1 className="text-3xl font-bold orbe-gradient-text">Orbe Nerd no Android</h1>
      <p className="text-muted-foreground">
        App nativo (não é WebView). iPhone: use o site no navegador e &quot;Adicionar à Tela de Início&quot;.
      </p>

      {hasApk ? (
        <a
          href={APK_URL}
          className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Baixar APK
        </a>
      ) : (
        <p className="rounded-lg border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
          O APK ainda não está publicado. Quando o primeiro build existir, defina{' '}
          <code className="text-foreground">NEXT_PUBLIC_ANDROID_APK_URL</code> no ambiente do frontend
          e aponte para o arquivo HTTPS (veja <code>docs/distribuicao-android-apk.md</code>).
        </p>
      )}

      <section className="space-y-3 text-sm text-muted-foreground">
        <h2 className="text-lg font-semibold text-foreground">Instalação</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Baixe o APK pelo botão acima.</li>
          <li>No Android, permita instalação desta fonte quando o sistema pedir.</li>
          <li>Abra o arquivo e conclua a instalação.</li>
        </ol>
        <p>
          Confira o SHA-256 do arquivo na página quando publicarmos o primeiro build (instruções no
          repositório em <code>docs/distribuicao-android-apk.md</code>).
        </p>
      </section>

      <Link href="/" className="text-primary hover:underline text-sm">
        Voltar ao site
      </Link>
    </div>
  );
}