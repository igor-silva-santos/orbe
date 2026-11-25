import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'App Android — Orbe Nerd',
  description: 'Baixe o APK oficial do Orbe Nerd para Android.',
};

const APK_URL = process.env.NEXT_PUBLIC_ANDROID_APK_URL?.trim() || '';
const APK_SHA256 = process.env.NEXT_PUBLIC_ANDROID_APK_SHA256?.trim().toUpperCase() || '';
const APK_VERSION = process.env.NEXT_PUBLIC_ANDROID_APK_VERSION?.trim() || '';
const APK_BUILD_DATE = process.env.NEXT_PUBLIC_ANDROID_APK_BUILD_DATE?.trim() || '';

export default function AndroidAppDownloadPage() {
  const hasApk = APK_URL.length > 0;

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12 space-y-8">
      <h1 className="text-3xl font-bold orbe-gradient-text">Orbe Nerd no Android</h1>
      <p className="text-muted-foreground">
        App nativo (não é WebView). iPhone: use o site no navegador e &quot;Adicionar à Tela de Início&quot;.
      </p>

      {(APK_VERSION || APK_BUILD_DATE) && (
        <dl className="text-sm grid grid-cols-1 sm:grid-cols-2 gap-2 rounded-lg border border-border bg-muted/30 p-4">
          {APK_VERSION && (
            <div>
              <dt className="text-muted-foreground">Versão</dt>
              <dd className="font-semibold">{APK_VERSION}</dd>
            </div>
          )}
          {APK_BUILD_DATE && (
            <div>
              <dt className="text-muted-foreground">Build</dt>
              <dd className="font-semibold">{APK_BUILD_DATE}</dd>
            </div>
          )}
        </dl>
      )}

      {hasApk ? (
        <a
          href={APK_URL}
          className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Baixar APK
        </a>
      ) : (
        <p className="rounded-lg border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
          O APK ainda não está publicado. Após o primeiro{' '}
          <code className="text-foreground">eas build</code>, defina{' '}
          <code className="text-foreground">NEXT_PUBLIC_ANDROID_APK_URL</code> no Vercel (e opcionalmente SHA,
          versão e data). Veja <code>docs/distribuicao-android-apk.md</code>.
        </p>
      )}

      {APK_SHA256 && (
        <section className="space-y-2 text-sm">
          <h2 className="text-lg font-semibold text-foreground">Integridade (SHA-256)</h2>
          <p className="text-muted-foreground">
            Compare o hash do arquivo baixado com o valor abaixo antes de instalar.
          </p>
          <pre className="overflow-x-auto rounded-lg border border-border bg-muted/50 p-3 text-xs font-mono break-all">
            {APK_SHA256}
          </pre>
        </section>
      )}

      <section className="space-y-3 text-sm text-muted-foreground">
        <h2 className="text-lg font-semibold text-foreground">Instalação</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Baixe o APK pelo botão acima.</li>
          <li>No Android, permita instalação desta fonte quando o sistema pedir.</li>
          <li>Abra o arquivo e conclua a instalação.</li>
        </ol>
        {!APK_SHA256 && hasApk && (
          <p>
            Publique também{' '}
            <code className="text-foreground">NEXT_PUBLIC_ANDROID_APK_SHA256</code> (veja{' '}
            <code>ops/apk-sha256.sh</code>).
          </p>
        )}
      </section>

      <Link href="/" className="text-primary hover:underline text-sm">
        Voltar ao site
      </Link>
    </div>
  );
}