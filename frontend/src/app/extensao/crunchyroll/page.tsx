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
  { path: 'extension/manifest.json', desc: 'Permiss├Áes e configura├º├úo MV3' },
  { path: 'extension/content/crunchyroll-queue.js', desc: 'Leitura da fila na p├ígina CR (s├│ DOM local)' },
  { path: 'extension/content/orbe-bridge.js', desc: 'Ponte de login com o Orbe' },
  { path: 'extension/background/service-worker.js', desc: 'Orquestra sync ÔåÆ API Orbe' },
  { path: 'extension/popup/popup.js', desc: 'Interface do popup' },
];

const PERMISSIONS = [
  {
    name: 'crunchyroll.com',
    why: 'Ler t├¡tulo, epis├│dio e progresso dos cards vis├¡veis na sua fila aberta.',
  },
  {
    name: 'orbenerd.com / localhost:3000',
    why: 'Receber seu token de login do Orbe ap├│s voc├¬ clicar em Conectar.',
  },
  {
    name: 'API Orbe (localhost:5000 ou produ├º├úo)',
    why: 'Enviar os animes parseados para a sua Minha Lista.',
  },
  {
    name: 'storage',
    why: 'Guardar token e URL da API localmente no Chrome (n├úo enviamos para terceiros).',
  },
];

const SENDS = [
  'T├¡tulo do anime',
  'ID da s├®rie na Crunchyroll',
  'Temporada, epis├│dio e tempo restante',
  'Poster (URL p├║blica) e se tem dublagem',
];

const NOT_SENDS = [
  'Senha da Crunchyroll ou do Orbe',
  'Hist├│rico de navega├º├úo fora da fila aberta',
  'Cookies ou sess├úo da Crunchyroll',
  'Dados para analytics ou publicidade',
  'Arquivos execut├íveis ou downloads ocultos',
];

export default function ExtensaoCrunchyrollPage() {
  return (
    <div className="min-h-screen">
      <section className="border-b-4 border-primary bg-gradient-to-b from-accent/60 to-background">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <PlugZap className="h-10 w-10 text-primary" />
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              C├│digo aberto ┬À Orbe Nerd
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Extens├úo Orbe Sync ÔÇö Crunchyroll
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-4">
            Sincronize sua fila de animes com a Minha Lista do Orbe. C├│digo 100% audit├ível ÔÇö
            nada escondido, nada que roube dados ou instale v├¡rus.
          </p>
          <div className="rounded-lg border border-primary/20 bg-background/80 p-4 max-w-2xl mb-8">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Instala uma vez, usa para sempre.</strong> Depois de
              instalar, a extens├úo fica no Chrome como qualquer outra ÔÇö voc├¬ n├úo precisa repetir o
              processo a cada sync. Em produ├º├úo, a instala├º├úo ser├í pela Chrome Web Store (um clique).
              O modo desenvolvedor abaixo ├® s├│ para quem testa a vers├úo beta localmente.
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
          Como instalar (Chrome) ÔÇö uma ├║nica vez
        </h2>
        <p className="text-muted-foreground mb-6 text-sm">
          Open source significa que voc├¬ <em>pode</em> ler o c├│digo antes de confiar ÔÇö n├úo que precise
          reinstalar manualmente toda vez. Ap├│s o passo abaixo, a extens├úo permanece instalada at├® voc├¬
          remov├¬-la.
        </p>
        <ol className="space-y-4 text-muted-foreground mb-10">
          <li className="flex gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white font-bold text-sm">
              ╬▓
            </span>
            <div>
              <p className="font-semibold text-foreground">Vers├úo beta (desenvolvimento local)</p>
              <p className="text-sm mt-1">
                Enquanto a extens├úo n├úo estiver na Chrome Web Store, quem desenvolve ou testa usa{' '}
                <strong>Carregar sem compacta├º├úo</strong> uma vez. Isso n├úo ├® o fluxo final para
                usu├írios finais ÔÇö ├® s├│ para validar antes da publica├º├úo oficial.
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white font-bold text-sm">
              Ôÿà
            </span>
            <div>
              <p className="font-semibold text-foreground">Vers├úo oficial (em breve)</p>
              <p className="text-sm mt-1">
                Na Chrome Web Store: <strong>Adicionar ao Chrome</strong> ÔåÆ pronto. Mesma extens├úo
                open source, instalada como Netflix, uBlock ou qualquer extens├úo confi├ível ÔÇö sem pasta
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
                A extens├úo est├í na pasta <code className="bg-muted px-1.5 py-0.5 rounded text-xs">extension/</code>{' '}
                deste reposit├│rio. Voc├¬ pode inspecionar todo o c├│digo antes de instalar.
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
              <p className="font-semibold text-foreground">Carregar sem compacta├º├úo</p>
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
                Fa├ºa login no Orbe e acesse{' '}
                <Link href="/extensao" className="text-primary underline">
                  /extensao
                </Link>{' '}
                ÔåÆ <strong>Conectar extens├úo</strong>.
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
                Abra sua fila em crunchyroll.com (watchlist/queue), clique no ├¡cone Orbe Sync e em{' '}
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
                O content script l├¬ apenas os cards vis├¡veis na p├ígina da Crunchyroll que voc├¬ abriu.
                Nada roda em segundo plano em outros sites.
              </p>
            </div>
            <div className="rounded-xl border bg-background p-5">
              <p className="font-bold mb-2">2. Envio para o Orbe</p>
              <p className="text-muted-foreground">
                Cada anime vai para a API do Orbe com seu JWT. S├│ endpoints de Minha Lista ÔÇö
                nenhum servidor de terceiros.
              </p>
            </div>
            <div className="rounded-xl border bg-background p-5">
              <p className="font-bold mb-2">3. Espelhamento seguro</p>
              <p className="text-muted-foreground">
                Se todos os itens importarem com sucesso, a lista CR no Orbe ├® espelhada. Se houver
                falhas, entra em modo seguro (merge) ÔÇö nada ├® apagado.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-primary" />
          Privacidade e transpar├¬ncia
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2 text-green-700 dark:text-green-400">
              <Eye className="h-4 w-4" /> O que enviamos
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {SENDS.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-green-600">Ô£ô</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2 text-red-700 dark:text-red-400">
              <Lock className="h-4 w-4" /> O que N├âO enviamos
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {NOT_SENDS.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-red-500">Ô£ù</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-8 text-sm text-muted-foreground border-l-4 border-primary pl-4">
          A extens├úo n├úo cont├®m c├│digo ofuscado, n├úo faz download de execut├íveis e n├úo se comunica
          com dom├¡nios al├®m de Crunchyroll, Orbe e a API configurada por voc├¬. Voc├¬ pode ler cada
          linha antes de instalar.
        </p>
      </section>

      <section className="bg-muted/40 border-y">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            Permiss├Áes explicadas
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
          C├│digo aberto ÔÇö audite voc├¬ mesmo
        </h2>
        <p className="text-muted-foreground mb-6">
          Todos os arquivos da extens├úo est├úo no reposit├│rio do Orbe. Abra no editor, busque por{' '}
          <code className="bg-muted px-1 rounded">fetch(</code>,{' '}
          <code className="bg-muted px-1 rounded">eval(</code> ou dom├¡nios suspeitos ÔÇö voc├¬ n├úo
          encontrar├í nada escondido.
        </p>
        <div className="rounded-xl border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-3 font-semibold">Arquivo</th>
                <th className="text-left p-3 font-semibold">Fun├º├úo</th>
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
          Manifest V3 ┬À sem remote code ┬À sem analytics ┬À sem minifica├º├úo ofuscada
        </p>
      </section>

      <section className="border-t bg-accent/30">
        <div className="container mx-auto px-4 py-12 max-w-4xl text-center">
          <h2 className="text-xl font-bold mb-4">Pronto para usar?</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/extensao">Conectar extens├úo</Link>
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
