export default function DmcaPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto prose prose-invert">
        <h1 className="font-display text-3xl orbe-text-primary mb-6">DMCA / Direitos Autorais</h1>
        <p className="text-muted-foreground mb-4">
          O Orbe Nerd é um agregador de informações sobre lançamentos de entretenimento. Não hospedamos conteúdo protegido por direitos autorais.
        </p>
        <p className="text-muted-foreground mb-4">
          Todas as imagens, trailers e metadados pertencem aos seus respectivos proprietários e são exibidos mediante APIs públicas e links oficiais.
        </p>
        <p className="text-muted-foreground">
          Para solicitações de remoção de conteúdo, entre em contato através da página <a href="/contato" className="text-primary hover:underline">Contato</a>.
        </p>
      </div>
    </div>
  );
}
