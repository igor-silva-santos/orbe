// Import do subcaminho especifico (nao o barrel `jose`) — evita puxar o
// codigo de JWE decrypt (CompressionStream/DecompressionStream), que nao
// roda no Edge Runtime e gerava warning no build do middleware.
import { jwtVerify } from 'jose/jwt/verify';

// Verificacao de assinatura do JWT de sessao — usada pelo middleware (Edge
// Runtime) e pela rota /api/auth/session ao gravar o cookie httpOnly.
//
// Usa `jose` (nao `jsonwebtoken`) porque o middleware do Next roda em Edge
// Runtime, que nao tem os modulos nativos do Node que `jsonwebtoken`
// depende — `jose` e a lib recomendada pelo proprio Next pra isso.
//
// IMPORTANTE: essa verificacao e so um gate de UX (evita renderizar por um
// instante uma tela protegida pra quem nao tem sessao, e redireciona mais
// cedo quem tem um cookie invalido/expirado). A autorizacao de verdade mora
// inteiramente na API Express (`api/src/authMiddleware.ts`), que valida o
// Bearer token real em toda rota autenticada — o cookie de sessao nunca
// chega ate ela. Mesmo que essa verificacao aqui falhe aberta (ver abaixo),
// nenhum dado sensivel fica exposto so por isso.
const JWT_SECRET = process.env.JWT_SECRET;
const encodedSecret = JWT_SECRET ? new TextEncoder().encode(JWT_SECRET) : null;

let warnedMissingSecret = false;

/**
 * Confirma que `token` e um JWT com assinatura HS256 valida (e nao expirado)
 * para o mesmo JWT_SECRET usado pela API Express.
 *
 * Se JWT_SECRET nao estiver configurado nas env vars do frontend (deploy
 * incompleto), a verificacao de assinatura fica indisponivel e a funcao
 * cai de volta pra so validar o formato (3 partes separadas por ponto) —
 * o mesmo comportamento de antes dessa correcao. Isso e proposital: tratar
 * a ausencia do secret como "token invalido" derrubaria o acesso de todo
 * mundo a /perfil e /configuracoes por um problema de configuracao, o que
 * seria pior do que o gate cosmetico que existia antes. Configure
 * JWT_SECRET (mesmo valor da API) nas env vars server-side do Next.js pra
 * ativar a verificacao completa.
 */
export async function isValidSessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token || token.split('.').length !== 3) {
    return false;
  }

  if (!encodedSecret) {
    if (!warnedMissingSecret) {
      warnedMissingSecret = true;
      console.warn(
        '[jwt] JWT_SECRET nao configurado no frontend — validando so o formato do token, ' +
        'nao a assinatura. Configure JWT_SECRET (mesmo valor da API) nas env vars do Next.js.'
      );
    }
    return true;
  }

  try {
    await jwtVerify(token, encodedSecret, { algorithms: ['HS256'] });
    return true;
  } catch {
    return false;
  }
}
