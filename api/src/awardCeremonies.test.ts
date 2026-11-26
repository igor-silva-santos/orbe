import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { AWARD_CEREMONIES, buildAwardEventsResponse, mergeAwardFilterOptions } from './awardCeremonies';

const DURANTE_VOTACAO = new Date('2026-11-26T15:00:00.000Z');
const ANTES_DO_OSCAR = new Date('2026-03-01T00:00:00.000Z');
const VOTACAO_ENCERRADA = new Date('2026-12-10T02:00:00.000Z');
const DEPOIS_DO_TGA = new Date('2026-12-11T05:00:00.000Z');

describe('premiações — cerimônias', () => {
  it('cada vencedor gravado também está na lista de concorrentes', () => {
    for (const ceremony of AWARD_CEREMONIES) {
      assert.ok(ceremony.categorias.length > 0, ceremony.id);
      for (const category of ceremony.categorias) {
        assert.ok(category.indicados.length > 0, `${ceremony.id} ${category.nome}`);
        if (category.vencedor) {
          assert.ok(
            category.indicados.some((item) => item.titulo === category.vencedor),
            `${ceremony.id} ${category.nome}`,
          );
        }
      }
    }
  });

  it('em 26 de novembro de 2026 mostra eventos, vencedores passados e votação aberta', () => {
    const data = buildAwardEventsResponse({ now: DURANTE_VOTACAO });
    assert.deepEqual(
      data.eventos.map((evento) => evento.id),
      ['tga-2026', 'emmy-2026', 'anime-awards-2026', 'oscar-2026'],
    );

    const tga = data.eventos[0];
    assert.equal(tga.fase, 'votacao_aberta');
    assert.equal(tga.votacaoAberta, true);
    assert.match(tga.avisoVotacao ?? '', /votação dos fãs/i);
    assert.equal(tga.categorias[0].vencedor, null);
    assert.ok(tga.categorias[0].indicados.some((item) => item.titulo === 'Grand Theft Auto VI'));

    const oscar = data.eventos.find((evento) => evento.id === 'oscar-2026');
    assert.equal(oscar?.fase, 'encerrado');
    assert.equal(oscar?.categorias[0].vencedor, 'One Battle After Another');

    const emmy = data.eventos.find((evento) => evento.id === 'emmy-2026');
    assert.equal(emmy?.categorias[0].vencedor, 'The Pitt');

    const anime = data.eventos.find((evento) => evento.id === 'anime-awards-2026');
    assert.equal(anime?.categorias[0].vencedor, 'My Hero Academia FINAL SEASON');

    assert.equal(data.votacoesAbertas.length, 1);
    assert.equal(data.votacoesAbertas[0].id, 'tga-2026');
    assert.ok(data.names.includes('The Game Awards'));
    assert.deepEqual(data.years, [2026]);
  });

  it('não revela vencedor antes da cerimônia', () => {
    const data = buildAwardEventsResponse({ now: ANTES_DO_OSCAR });
    const oscar = data.eventos.find((evento) => evento.id === 'oscar-2026');
    assert.equal(oscar?.fase, 'aguardando');
    assert.equal(oscar?.categorias[0].vencedor, null);
    assert.ok(oscar?.categorias[0].indicados.some((item) => item.titulo === 'One Battle After Another'));
    assert.equal(data.votacoesAbertas.length, 0);
  });

  it('fecha a votação no horário e só marca o evento como encerrado depois da cerimônia', () => {
    const entre = buildAwardEventsResponse({ now: VOTACAO_ENCERRADA });
    const tgaEntre = entre.eventos.find((evento) => evento.id === 'tga-2026');
    assert.equal(tgaEntre?.fase, 'aguardando');
    assert.equal(tgaEntre?.votacaoAberta, false);
    assert.equal(entre.votacoesAbertas.length, 0);

    const depois = buildAwardEventsResponse({ now: DEPOIS_DO_TGA });
    const tga = depois.eventos.find((evento) => evento.id === 'tga-2026');
    assert.equal(tga?.fase, 'encerrado');
    assert.equal(tga?.categorias[0].vencedor, null);
  });

  it('filtra por tipo, prêmio e ano sem esvaziar as opções do filtro', () => {
    const jogos = buildAwardEventsResponse({ now: DURANTE_VOTACAO, mediaType: 'jogo' });
    assert.deepEqual(jogos.eventos.map((evento) => evento.id), ['tga-2026']);
    assert.ok(jogos.names.includes('Oscar'));

    const oscar = buildAwardEventsResponse({ now: DURANTE_VOTACAO, awardName: 'Oscar', year: 2026 });
    assert.deepEqual(oscar.eventos.map((evento) => evento.id), ['oscar-2026']);
    assert.equal(oscar.votacoesAbertas.length, 0);

    const vazio = buildAwardEventsResponse({ now: DURANTE_VOTACAO, year: 2024 });
    assert.equal(vazio.eventos.length, 0);
    assert.ok(vazio.names.includes('Emmy'));
  });

  it('une os prêmios do catálogo com o que já estiver no banco', () => {
    const merged = mergeAwardFilterOptions(['Globo de Ouro', 'Oscar'], ['2024', 2026]);
    assert.deepEqual(merged.names, ['Emmy', 'Globo de Ouro', 'Oscar', 'The Anime Awards', 'The Game Awards']);
    assert.deepEqual(merged.years, [2026, 2024]);
  });
});
