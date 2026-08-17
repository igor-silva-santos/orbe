/// <reference types="node" />
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  extractIngressoSignalsFromHtml,
  isIngressoNotFound,
  parseIngressoPageContent,
} from './ingressoPageParser';

const nextDataShell = (payload: object) =>
  `<html><body><script id="__NEXT_DATA__" type="application/json">${JSON.stringify(payload)}</script></body></html>`;

describe('ingressoPageParser', () => {
  describe('isIngressoNotFound', () => {
    it('detecta NEXT_HTTP_ERROR_FALLBACK', () => {
      assert.equal(isIngressoNotFound('<html>NEXT_HTTP_ERROR_FALLBACK</html>'), true);
    });

    it('detecta mensagem de erro genérica', () => {
      assert.equal(isIngressoNotFound('<html><h1>Ocorreu um erro</h1></html>'), true);
    });

    it('não marca página válida como não encontrada', () => {
      const html = nextDataShell({
        props: { pageProps: { event: { inPreSale: false, isPlaying: true, countIsPlaying: 3 } } },
      });
      assert.equal(isIngressoNotFound(html), false);
    });
  });

  describe('parseIngressoPageContent — JSON em __NEXT_DATA__', () => {
    it('interpreta inPreSale e sessões a partir do JSON embutido', () => {
      const html = nextDataShell({
        props: {
          pageProps: {
            event: { inPreSale: true, isPlaying: false, countIsPlaying: 0 },
          },
        },
      });

      const result = parseIngressoPageContent(html);
      assert.deepEqual(result, {
        pageExists: true,
        hasCinemaSessions: false,
        isPreSale: true,
      });
    });

    it('considera sessões quando isPlaying e countIsPlaying são positivos', () => {
      const html = nextDataShell({
        props: {
          pageProps: {
            event: { inPreSale: false, isPlaying: true, countIsPlaying: 12 },
          },
        },
      });

      const result = parseIngressoPageContent(html);
      assert.equal(result.pageExists, true);
      assert.equal(result.hasCinemaSessions, true);
      assert.equal(result.isPreSale, false);
    });

    it('extrai sinais via regex quando __NEXT_DATA__ não está presente', () => {
      const html =
        '<html><body>{"inPreSale":true,"isPlaying":true,"countIsPlaying":5}</body></html>';

      const signals = extractIngressoSignalsFromHtml(html);
      assert.deepEqual(signals, { inPreSale: true, isPlaying: true, countIsPlaying: 5 });

      const result = parseIngressoPageContent(html);
      assert.equal(result.pageExists, true);
      assert.equal(result.hasCinemaSessions, true);
      assert.equal(result.isPreSale, true);
    });
  });

  describe('parseIngressoPageContent — fallback heurístico', () => {
    it('usa texto de ausência de sessões quando não há JSON', () => {
      const html = '<html><body>Não há sessões disponíveis no momento.</body></html>';
      const result = parseIngressoPageContent(html);

      assert.deepEqual(result, {
        pageExists: true,
        hasCinemaSessions: false,
        isPreSale: false,
      });
    });

    it('detecta pré-venda por texto quando JSON não informa inPreSale', () => {
      const html = '<html><body>Filme em pré-venda agora!</body></html>';
      const result = parseIngressoPageContent(html);

      assert.equal(result.pageExists, true);
      assert.equal(result.hasCinemaSessions, true);
      assert.equal(result.isPreSale, true);
    });

    it('assume sessões disponíveis sem JSON nem mensagem de ausência', () => {
      const html = '<html><body><h1>Filme X</h1><div>Sessões</div></body></html>';
      const result = parseIngressoPageContent(html);

      assert.equal(result.pageExists, true);
      assert.equal(result.hasCinemaSessions, true);
      assert.equal(result.isPreSale, false);
    });
  });

  describe('parseIngressoPageContent — página inexistente', () => {
    it('retorna pageExists false para erro do Next', () => {
      const result = parseIngressoPageContent('<html>NEXT_HTTP_ERROR_FALLBACK</html>');
      assert.deepEqual(result, {
        pageExists: false,
        hasCinemaSessions: false,
        isPreSale: false,
      });
    });
  });
});
