/// <reference types="node" />
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  AWARD_SCRAPE_SOURCES,
  fetchWikipediaHtml,
  parseGameAwardsYearHtml,
  parseWikitableAwardHtml,
  WIKIPEDIA_REQUEST_HEADERS,
} from './awardTableParser';

const oscarHtml = `
<table class="wikitable">
  <tbody>
    <tr>
      <th>Data</th>
      <th>Título original</th>
      <th>Título em Portugal</th>
      <th>Título no Brasil</th>
    </tr>
    <tr>
      <td rowspan="2">1.ª edição, 16 de maio de 1929</td>
      <td style="background:#FAEB86;"><i><b><a href="/wiki/Wings_(filme)">Wings</a></b></i></td>
      <td><b>Asas</b></td>
      <td><b>Asas</b></td>
    </tr>
    <tr>
      <td>7th Heaven</td>
      <td>A Hora Suprema</td>
      <td>Sétimo Céu</td>
    </tr>
  </tbody>
</table>`;

const globoFilmeHtml = `
<table class="wikitable">
  <tbody>
    <tr><th>Ano</th><th>Filme</th><th>Ref.</th></tr>
    <tr>
      <td rowspan="2">1990</td>
      <td><b>Born on the Fourth of July</b></td>
      <td rowspan="2">[1]</td>
    </tr>
    <tr>
      <td>Crimes and Misdemeanors</td>
    </tr>
  </tbody>
</table>`;

const globoSerieHtml = `
<table class="wikitable">
  <tbody>
    <tr><th>Ano</th><th>Programa</th><th>Canal</th></tr>
    <tr>
      <td rowspan="2">1969</td>
      <td><b>Marcus Welby, M.D.</b></td>
      <td>ABC</td>
    </tr>
    <tr>
      <td>Bracken's World</td>
      <td>NBC</td>
    </tr>
  </tbody>
</table>`;

const gameAwardsIndexHtml = `
<table class="sortable wikitable">
  <tbody>
    <tr>
      <th>Cerimônia</th>
      <th>Data</th>
      <th>Vencedor do Jogo do Ano</th>
      <th>Número de espectadores</th>
    </tr>
    <tr>
      <td>The Game Awards 2023</td>
      <td>7 de dezembro de 2023</td>
      <td>Baldur's Gate III</td>
      <td>118 milhões</td>
    </tr>
    <tr>
      <td>The Game Awards 2026</td>
      <td>10 de dezembro de 2026</td>
      <td>ASA</td>
      <td>ASA</td>
    </tr>
  </tbody>
</table>`;

const gameAwardsYearHtml = `
<table class="wikitable">
  <tbody>
    <tr>
      <th>Jogo do Ano</th>
      <th>Melhor Direção de Jogo</th>
    </tr>
    <tr>
      <td>
        <ul>
          <li><b><i><a href="/wiki/Astro_Bot">Astro Bot</a></i> – Team Asobi / Sony Interactive Entertainment</b>
            <ul>
              <li><i><a href="/wiki/Balatro">Balatro</a></i> – LocalThunk / Playstack</li>
              <li><i>Marvel's Spider-Man 2</i> – Insomniac Games / Sony Interactive Entertainment</li>
            </ul>
          </li>
        </ul>
      </td>
      <td><ul><li>Outro jogo – Estúdio</li></ul></td>
    </tr>
  </tbody>
</table>`;

describe('parseWikitableAwardHtml', () => {
  it('lê o título original do Oscar e o indicado da linha com rowspan', () => {
    const awards = parseWikitableAwardHtml(oscarHtml, {
      awardName: 'Oscar',
      category: 'Melhor Filme',
      mediaType: 'filme',
    });

    assert.deepEqual(
      awards.map((award) => ({ title: award.title, year: award.year, status: award.status, category: award.category })),
      [
        { title: 'Wings', year: 1929, status: 'vencedor', category: 'Melhor Filme' },
        { title: '7th Heaven', year: 1929, status: 'indicado', category: 'Melhor Filme' },
      ],
    );
  });

  it('não trata a referência nem o canal como título', () => {
    const filmes = parseWikitableAwardHtml(globoFilmeHtml, {
      awardName: 'Globo de Ouro',
      category: 'Melhor Filme Dramático',
      mediaType: 'filme',
    });
    assert.deepEqual(
      filmes.map((award) => award.title),
      ['Born on the Fourth of July', 'Crimes and Misdemeanors'],
    );
    assert.equal(filmes[0].status, 'vencedor');
    assert.equal(filmes[1].status, 'indicado');
    assert.equal(filmes[0].year, 1990);

    const series = parseWikitableAwardHtml(globoSerieHtml, {
      awardName: 'Globo de Ouro',
      category: 'Melhor Série Dramática',
      mediaType: 'serie',
    });
    assert.deepEqual(
      series.map((award) => ({ title: award.title, status: award.status })),
      [
        { title: 'Marcus Welby, M.D.', status: 'vencedor' },
        { title: "Bracken's World", status: 'indicado' },
      ],
    );
  });

  it('marca a coluna Vencedor como vencedor e ignora audiência e placeholder', () => {
    const awards = parseWikitableAwardHtml(gameAwardsIndexHtml, {
      awardName: 'The Game Awards',
      category: 'Jogo do Ano',
      mediaType: 'jogo',
    });

    assert.deepEqual(awards, [
      {
        awardName: 'The Game Awards',
        year: 2023,
        category: 'Jogo do Ano',
        title: "Baldur's Gate III",
        status: 'vencedor',
        mediaType: 'jogo',
      },
    ]);
  });
});

const globoSerieListaHtml = `
<h3 id="Anos_2020">Anos 2020</h3>
<ul>
  <li><b><a href="/wiki/Prémios_Globo_de_Ouro_de_2022">2021</a>: <i><a href="/wiki/Succession_(série_de_televisão)">Succession</a></i> – HBO</b>
    <ul>
      <li><i><a href="/wiki/Squid_Game">Squid Game</a></i> – Netflix</li>
      <li><i><a href="/wiki/The_Morning_Show">The Morning Show</a></i> – Apple TV+</li>
    </ul>
  </li>
</ul>`;

describe('parseWikitableAwardHtml listas', () => {
  it('lê o vencedor em negrito e os indicados aninhados', () => {
    const awards = parseWikitableAwardHtml(globoSerieListaHtml, {
      awardName: 'Globo de Ouro',
      category: 'Melhor Série Dramática',
      mediaType: 'serie',
    });

    assert.deepEqual(
      awards.map((award) => ({ title: award.title, year: award.year, status: award.status })),
      [
        { title: 'Succession', year: 2021, status: 'vencedor' },
        { title: 'Squid Game', year: 2021, status: 'indicado' },
        { title: 'The Morning Show', year: 2021, status: 'indicado' },
      ],
    );
  });
});

describe('parseGameAwardsYearHtml', () => {
  it('separa vencedor e indicados sem cortar hífen do título', () => {
    const awards = parseGameAwardsYearHtml(gameAwardsYearHtml, 2024);
    assert.deepEqual(
      awards.map((award) => ({ title: award.title, status: award.status, year: award.year })),
      [
        { title: 'Astro Bot', status: 'vencedor', year: 2024 },
        { title: 'Balatro', status: 'indicado', year: 2024 },
        { title: "Marvel's Spider-Man 2", status: 'indicado', year: 2024 },
      ],
    );
  });
});

describe('fontes e pedido à Wikipédia', () => {
  it('aponta o Oscar para o artigo que existe', () => {
    const oscar = AWARD_SCRAPE_SOURCES.find((source) => source.awardName === 'Oscar');
    assert.equal(oscar?.url, 'https://pt.wikipedia.org/wiki/Oscar_de_melhor_filme');
    assert.equal(oscar?.category, 'Melhor Filme');
  });

  it('envia User-Agent identificável, porque axios puro recebe 403', async () => {
    let seenHeaders: Record<string, string> | undefined;
    const html = await fetchWikipediaHtml('https://pt.wikipedia.org/wiki/Oscar_de_melhor_filme', async (_url, config) => {
      seenHeaders = config.headers;
      return { data: '<html></html>' };
    });

    assert.equal(html, '<html></html>');
    assert.equal(seenHeaders?.['User-Agent'], WIKIPEDIA_REQUEST_HEADERS['User-Agent']);
    assert.equal(seenHeaders?.['User-Agent'].toLowerCase().includes('axios'), false);
  });
});
