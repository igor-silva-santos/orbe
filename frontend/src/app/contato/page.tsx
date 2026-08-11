'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import orbeNerdApi from '@/lib/api';

const ASSUNTOS = [
  'Suporte Técnico',
  'Sugestão de Conteúdo',
  'Reportar Bug',
  'Parceria',
  'Outro',
];

export default function ContatoPage() {
  const searchParams = useSearchParams();
  const assuntoParam = searchParams?.get('assunto') || '';
  const assuntoInicial = ASSUNTOS.includes(assuntoParam) ? assuntoParam : '';

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    assunto: assuntoInicial,
    mensagem: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.assunto) {
      setError('Selecione um assunto.');
      return;
    }

    setError(null);
    setIsSubmitting(true);
    try {
      await orbeNerdApi.sendContactMessage(formData);
      setIsSent(true);
      setFormData({ nome: '', email: '', assunto: '', mensagem: '' });
    } catch (err) {
      console.error('Erro ao enviar mensagem de contato:', err);
      setError(err instanceof Error ? err.message : 'Não foi possível enviar sua mensagem. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold orbe-text-primary mb-4">Contato</h1>
          <p className="text-lg text-muted-foreground">
            Entre em contato conosco. Estamos aqui para ajudar!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Informações de Contato */}
          <div>
            <h2 className="text-2xl font-bold orbe-text-primary mb-6">Fale Conosco</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Mail className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold orbe-text-primary">Email</h3>
                  <p className="text-muted-foreground">contato@orbenerd.com</p>
                  <p className="text-muted-foreground">suporte@orbenerd.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold orbe-text-primary">Telefone</h3>
                  <p className="text-muted-foreground">+55 (11) 9999-9999</p>
                  <p className="text-sm text-muted-foreground">Segunda a Sexta, 9h às 18h</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold orbe-text-primary">Endereço</h3>
                  <p className="text-muted-foreground">São Paulo, SP - Brasil</p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulário de Contato */}
          <div>
            <h2 className="text-2xl font-bold orbe-text-primary mb-6">Envie uma Mensagem</h2>

            {isSent ? (
              <div className="flex flex-col items-center text-center gap-3 bg-muted/30 rounded-xl p-8">
                <CheckCircle2 className="h-10 w-10 text-primary" />
                <p className="font-semibold orbe-text-primary">Mensagem enviada com sucesso!</p>
                <p className="text-sm text-muted-foreground">Responderemos o mais breve possível.</p>
                <button
                  onClick={() => setIsSent(false)}
                  className="mt-2 text-sm text-primary hover:text-primary/80 font-medium"
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium orbe-text-primary mb-2">
                    Nome
                  </label>
                  <input
                    id="nome"
                    name="nome"
                    type="text"
                    required
                    value={formData.nome}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Seu nome"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium orbe-text-primary mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="assunto" className="block text-sm font-medium orbe-text-primary mb-2">
                    Assunto
                  </label>
                  <select
                    id="assunto"
                    name="assunto"
                    required
                    value={formData.assunto}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Selecione um assunto</option>
                    {ASSUNTOS.map((assunto) => (
                      <option key={assunto} value={assunto}>{assunto}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="mensagem" className="block text-sm font-medium orbe-text-primary mb-2">
                    Mensagem
                  </label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    required
                    rows={5}
                    value={formData.mensagem}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Descreva sua dúvida ou sugestão..."
                  />
                </div>

                {error && (
                  <p className="text-sm text-destructive">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
