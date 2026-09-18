export type FaqItem = {
  question: string;
  answer: string;
};

export const AJUDA_FAQ: FaqItem[] = [
  {
    question: 'Como faço login no Orbe?',
    answer:
      'Acesse Entrar no menu, use seu e-mail e senha cadastrados. Após o login você será redirecionado para a Minha Lista de animes.',
  },
  {
    question: 'Como sincronizo minha fila da Crunchyroll?',
    answer:
      'Instale a extensão Orbe Sync, faça login no site e conecte em /extensao. Abra sua fila na Crunchyroll e use o popup da extensão para enviar os animes ao Orbe.',
  },
  {
    question: 'A extensão é segura?',
    answer:
      'Sim. O código é aberto e auditável. A extensão só lê os cards visíveis na sua fila da Crunchyroll e envia título, episódio e progresso para sua conta no Orbe — nunca sua senha.',
  },
  {
    question: 'Por que a home demora para carregar?',
    answer:
      'A API gratuita no Render pode “dormir” após inatividade (cold start de até ~60s). Aguarde alguns segundos e clique em Tentar novamente, ou instale o app (PWA) para acesso mais rápido nas revisitas.',
  },
  {
    question: 'Recebi erro 401 ou 429 na sync',
    answer:
      '401: faça login novamente em /login e reconecte a extensão. 429: você enviou muitos itens em pouco tempo — aguarde um minuto e tente de novo.',
  },
  {
    question: 'Como ativo notificações?',
    answer:
      'Logado, clique no sino no topo para ver avisos in-app. Para notificações no celular/PC (push), ative em Minha Lista → Animes no banner de notificações push.',
  },
  {
    question: 'O site funciona offline?',
    answer:
      'Com o app instalado (PWA), sua última lista de animes sincronizada fica disponível para leitura offline. Catálogo e login exigem internet.',
  },
];
