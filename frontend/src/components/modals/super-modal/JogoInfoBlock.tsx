'use client';

import { Jogo } from '@/types'; // Assuming this type
import { useTheme } from '@/hooks/useTheme';
import { NOT_INFORMED, hasSteamPriceDisplay } from '@/lib/media-helpers';
import SteamPriceLabel from '@/components/ui/SteamPriceLabel';

interface JogoInfoBlockProps {
  jogo: Jogo;
}

const JogoInfoBlock: React.FC<JogoInfoBlockProps> = ({ jogo }) => {
  const { isDark } = useTheme();
  const labelColor = isDark ? 'text-blue-400' : 'text-yellow-500';

  const releaseDate = jogo.data_lancamento_api
    ? new Date(jogo.data_lancamento_api).toLocaleDateString('pt-BR')
    : NOT_INFORMED;

  const rating = jogo.avaliacao ? (jogo.avaliacao / 10).toFixed(1) : null;
  const platforms = jogo.plataformas_api?.map((p) => p.nome).filter(Boolean) ?? [];

  return (
    <div className="flex-1 space-y-4">
      <h1 className="text-3xl md:text-4xl font-bold text-foreground">{jogo.titulo_curado || jogo.titulo_api}</h1>

      {hasSteamPriceDisplay(jogo) && (
        <div className="pt-1">
          <SteamPriceLabel item={jogo} variant="modal" />
        </div>
      )}
      
      <div className="space-y-2 text-sm">
        <div>
          <span className={`font-semibold ${labelColor} mr-2`}>Lançamento:</span>
          <span className="text-muted-foreground">{releaseDate}</span>
        </div>
        {rating && (
          <div>
            <span className={`font-semibold ${labelColor} mr-2`}>Nota:</span>
            <span className="text-muted-foreground">{rating} / 10</span>
          </div>
        )}
        {jogo.desenvolvedores && jogo.desenvolvedores.length > 0 ? (
          <div>
            <span className={`font-semibold ${labelColor} mr-2`}>Desenvolvedores:</span>
            <span className="text-muted-foreground">{jogo.desenvolvedores.join(', ')}</span>
          </div>
        ) : (
          <div>
            <span className={`font-semibold ${labelColor} mr-2`}>Desenvolvedores:</span>
            <span className="text-muted-foreground">{NOT_INFORMED}</span>
          </div>
        )}
        {jogo.publicadoras && jogo.publicadoras.length > 0 && (
          <div>
            <span className={`font-semibold ${labelColor} mr-2`}>Publicadoras:</span>
            <span className="text-muted-foreground">{jogo.publicadoras.join(', ')}</span>
          </div>
        )}
      </div>

      {jogo.generos_api && jogo.generos_api.length > 0 && (
        <div>
          <h4 className={`font-semibold ${labelColor} mb-2`}>Gêneros</h4>
          <div className="flex flex-wrap gap-2">
            {jogo.generos_api.map((genre) => (
              <span key={genre} className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-xs font-medium">
                {genre}
              </span>
            ))}
          </div>
        </div>
      )}

      {jogo.temas && jogo.temas.length > 0 && (
        <div>
          <h4 className={`font-semibold ${labelColor} mb-2`}>Temas</h4>
          <div className="flex flex-wrap gap-2">
            {jogo.temas.map((theme) => (
              <span key={theme} className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-xs font-medium">
                {theme}
              </span>
            ))}
          </div>
        </div>
      )}

      {jogo.modos_jogo && jogo.modos_jogo.length > 0 && (
        <div>
          <h4 className={`font-semibold ${labelColor} mb-2`}>Modos de jogo</h4>
          <div className="flex flex-wrap gap-2">
            {jogo.modos_jogo.map((mode) => (
              <span key={mode} className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-xs font-medium">
                {mode}
              </span>
            ))}
          </div>
        </div>
      )}

      {platforms.length > 0 && (
        <div>
          <h4 className={`font-semibold ${labelColor} mb-2`}>Plataformas</h4>
          <div className="flex flex-wrap gap-2">
            {platforms.map((platform) => (
              <span key={platform} className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-xs font-medium">
                {platform}
              </span>
            ))}
          </div>
        </div>
      )}

      {jogo.perspectivas && jogo.perspectivas.length > 0 && (
        <div>
          <h4 className={`font-semibold ${labelColor} mb-2`}>Perspectiva</h4>
          <div className="flex flex-wrap gap-2">
            {jogo.perspectivas.map((p) => (
              <span key={p} className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-xs font-medium">
                {p}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default JogoInfoBlock;