export default function CookiesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-3xl orbe-text-primary mb-6">Política de Cookies</h1>
        <div className="space-y-4 text-muted-foreground">
          <p>
            O Orbe Nerd utiliza cookies e tecnologias similares para melhorar sua experiência, lembrar preferências (como tema claro/escuro) e manter sua sessão de login.
          </p>
          <h2 className="text-xl font-semibold orbe-text-primary">Cookies essenciais</h2>
          <p>Necessários para o funcionamento básico do site, incluindo autenticação e preferências de interface.</p>
          <h2 className="text-xl font-semibold orbe-text-primary">Como gerenciar</h2>
          <p>
            Você pode desativar cookies nas configurações do seu navegador. Note que algumas funcionalidades podem deixar de funcionar corretamente.
          </p>
        </div>
      </div>
    </div>
  );
}
