import Link from 'next/link';
import {
  Code2,
  Download,
  Eye,
  Lock,
  PlugZap,
  Shield,
  ShieldCheck,
  Workflow,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const SOURCE_FILES = [
  { path: 'extension/manifest.json', desc: 'Permissões e configuração MV3' },
  { path: 'extension/content/crunchyroll-queue.js', desc: 'Leitura da fila na página CR (só DOM local)' },
  { path: 'extension/content/orbe-bridge.js', desc: 'Ponte de login com o Orbe' },
  { path: 'extension/background/service-worker.js', desc: 'Orquestra sync → API Orbe' },
  { path: 'extension/popup/popup.js', desc: 'Interface do popup' },
];

const PERMISSIONS = [
  {
    name: 'crunchyroll.com',
    why: 'Ler título, episódio e progresso dos cards visíveis na sua fila aberta.',
  },
  {
    name: 'orbenerd.com / localhost:3000',
    why: 'Receber seu token de login do Orbe após você clicar em Conectar.',
  },
  {
    name: 'API Orbe (localhost:5000 ou produção)',
    why: 'Enviar os animes parseados para a sua Minha Lista.',
  },
  {
    name: 'storage',
    why: 'Guardar token e URL da API localmente no Chrome (não enviamos para terceiros).',
  },
];

const SENDS = [
  'Título do anime',
  'ID da série na Crunchyroll',
  'Temporada, episódio e tempo restante',
  'Poster (URL pública) e se tem dublagem',
];

const NOT_SENDS = [
  'Senha da Crunchyroll ou do Orbe',
  'Histórico de navegação fora da fila aberta',
  'Cookies ou sessão da Crunchyroll',
  'Dados para analytics ou publicidade',
  'Arquivos executáveis ou downloads ocultos',
];

export default function ExtensaoCrunchyrollPage() {
  return (
    <div className="min-h-screen">
      <section className="border-b-4 border-primary bg-gradient-to-b from-accent/60 to-background">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <PlugZap className="h-10 w-10 text-primary" />
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Código aberto · Orbe Nerd
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Extensão Orbe Sync — Crunchyroll
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-4">
            Sincronize sua fila de animes com a Minha Lista do Orbe. Código 100% auditável —
            nada escondido, nada que roube dados ou instale vírus.
          </p>
          <div className="rounded-lg border border-primary/20 bg-background/80 p-4 max-w-2xl mb-8">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Instala uma vez, usa para sempre.</strong> Depois de
              instalar, a extensão fica no Chrome como qualquer outra — você não precisa repetir o
              processo a cada sync. Em produção, a instalação será pela Chrome Web Store (um clique).
              O modo desenvolvedor abaixo é só para quem testa a versão beta localmente.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/extensao">Conectar minha conta</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#instalar">Como instalar</a>
            </Button>
          </div>
        </div>
      </section>

      <section id="instalar" className="container mx-auto px-4 py-16 max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Download className="h-6 w-6 text-primary" />
          Como instalar (Chrome) — uma única vez
        </h2>
        <p className="text-muted-foreground mb-6 text-sm">
          Open source significa que você <em>pode</em> ler o código antes de confiar — não que precise
          reinstalar manualmente toda vez. Após o passo abaixo, a extensão permanece instalada até você
          removê-la.
        </p>
        <ol className="space-y-4 text-muted-foreground mb-10">
          <li className="flex gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white font-bold text-sm">
              β
            </span>
            <div>
              <p className="font-semibold text-foreground">Versão beta (desenvolvimento local)</p>
              <p className="text-sm mt-1">
                Enquanto a extensão não estiver na Chrome Web Store, quem desenvolve ou testa usa{' '}
                <strong>Carregar sem compactação</strong> uma vez. Isso não é o fluxo final para
                usuários finais — é só para validar antes da publicação oficial.
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white font-bold text-sm">
              ★
            </span>
            <div>
              <p className="font-semibold text-foreground">Versão oficial (em breve)</p>
              <p className="text-sm mt-1">
                Na Chrome Web Store: <strong>Adicionar ao Chrome</strong> → pronto. Mesma extensão
                open source, instalada como Netflix, uBlock ou qualquer extensão confiável — sem pasta
                manual, sem modo desenvolvedor.
              </p>
            </div>
          </li>
        </ol>

        <h3 className="text-lg font-semibold mt-10 mb-4">Passo a passo (beta local)</h3>
        <ol className="space-y-4 text-muted-foreground">
          <li className="flex gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white font-bold text-sm">
              1
            </span>
            <div>
              <p className="font-semibold text-foreground">Baixe ou clone o projeto Orbe</p>
              <p className="text-sm mt-1">
                A extensão está na pasta <code className="bg-muted px-1.5 py-0.5 rounded text-xs">extension/</code>{' '}
                deste repositório. Você pode inspecionar todo o código antes de instalar.
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white font-bold text-sm">
              2
            </span>
            <div>
              <p className="font-semibold text-foreground">Abra chrome://extensions</p>
              <p className="text-sm mt-1">Ative o <strong>Modo do desenvolvedor</strong> (canto superior direito).</p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white font-bold text-sm">
              3
            </span>
            <div>
              <p className="font-semibold text-foreground">Carregar sem compactação</p>
              <p className="text-sm mt-1">
                Selecione a pasta <code className="bg-muted px-1.5 py-0.5 rounded text-xs">extension/</code> do projeto.
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white font-bold text-sm">
              4
            </span>
            <div>
              <p className="font-semibold text-foreground">Conecte sua conta Orbe</p>
              <p className="text-sm mt-1">
                Faça login no Orbe e acesse{' '}
                <Link href="/extensao" className="text-primary underline">
                  /extensao
                </Link>{' '}
                → <strong>Conectar extensão</strong>.
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white font-bold text-sm">
              5
            </span>
            <div>
              <p className="font-semibold text-foreground">Sincronize</p>
              <p className="text-sm mt-1">
                Abra sua fila em crunchyroll.com (watchlist/queue), clique no ícone Orbe Sync e em{' '}
                <strong>Sincronizar fila agora</strong>.
              </p>
            </div>
          </li>
        </ol>
      </section>

      <section className="bg-muted/40 border-y">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Workflow className="h-6 w-6 text-primary" />
            Como funciona
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div className="rounded-xl border bg-background p-5">
              <p className="font-bold mb-2">1. Leitura local</p>
              <p className="text-muted-foreground">
                O content script lê apenas os cards visíveis na página da Crunchyroll que você abriu.
                Nada roda em segundo plano em outros sites.
              </p>
            </div>
            <div className="rounded-xl border bg-background p-5">
              <p className="font-bold mb-2">2. Envio para o Orbe</p>
              <p className="text-muted-foreground">
                Cada anime vai para a API do Orbe com seu JWT. Só endpoints de Minha Lista —
                nenhum servidor de terceiros.
              </p>
            </div>
            <div className="rounded-xl border bg-background p-5">
              <p className="font-bold mb-2">3. Espelhamento seguro</p>
              <p className="text-muted-foreground">
                Se todos os itens importarem com sucesso, a lista CR no Orbe é espelhada. Se houver
                falhas, entra em modo seguro (merge) — nada é apagado.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-primary" />
          Privacidade e transparência
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2 text-green-700 dark:text-green-400">
              <Eye className="h-4 w-4" /> O que enviamos
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {SENDS.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-green-600">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2 text-red-700 dark:text-red-400">
              <Lock className="h-4 w-4" /> O que NÃO enviamos
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {NOT_SENDS.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-red-500">✗</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-8 text-sm text-muted-foreground border-l-4 border-primary pl-4">
          A extensão não contém código ofuscado, não faz download de executáveis e não se comunica
          com domínios além de Crunchyroll, Orbe e a API configurada por você. Você pode ler cada
          linha antes de instalar.
        </p>
      </section>

      <section className="bg-muted/40 border-y">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            Permissões explicadas
          </h2>
          <div className="space-y-4">
            {PERMISSIONS.map((perm) => (
              <div key={perm.name} className="rounded-lg border bg-background p-4">
                <p className="font-mono text-sm font-semibold text-primary">{perm.name}</p>
                <p className="text-sm text-muted-foreground mt-1">{perm.why}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Code2 className="h-6 w-6 text-primary" />
          Código aberto — audite você mesmo
        </h2>
        <p className="text-muted-foreground mb-6">
          Todos os arquivos da extensão estão no repositório do Orbe. Abra no editor, busque por{' '}
          <code className="bg-muted px-1 rounded">fetch(</code>,{' '}
          <code className="bg-muted px-1 rounded">eval(</code> ou domínios suspeitos — você não
          encontrará nada escondido.
        </p>
        <div className="rounded-xl border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-3 font-semibold">Arquivo</th>
                <th className="text-left p-3 font-semibold">Função</th>
              </tr>
            </thead>
            <tbody>
              {SOURCE_FILES.map((file) => (
                <tr key={file.path} className="border-t">
                  <td className="p-3 font-mono text-xs">{file.path}</td>
                  <td className="p-3 text-muted-foreground">{file.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          Manifest V3 · sem remote code · sem analytics · sem minificação ofuscada
        </p>
      </section>

      <section className="border-t bg-accent/30">
        <div className="container mx-auto px-4 py-12 max-w-4xl text-center">
          <h2 className="text-xl font-bold mb-4">Pronto para usar?</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/extensao">Conectar extensão</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/minha-lista/animes?recheck=1">Voltar para Minha Lista</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
