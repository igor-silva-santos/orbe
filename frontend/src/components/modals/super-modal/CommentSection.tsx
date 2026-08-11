'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MessageSquare, Trash2, User as UserIcon, EyeOff, Eye } from 'lucide-react';
import { useAppStore } from '@/stores/appStore';
import orbeNerdApi from '@/lib/api';
import { isAllowedRemoteImageHost } from '@/lib/image-utils';
import type { Comentario, TipoMidia } from '@/types';

interface CommentSectionProps {
  midiaId: number;
  tipoMidia: TipoMidia;
}

const MAX_TEXTO_LENGTH = 3000;

function formatData(iso: string): string {
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function CommentAvatar({ nome, avatar }: { nome: string | null; avatar: string | null }) {
  if (avatar && isAllowedRemoteImageHost(avatar)) {
    return (
      <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0 bg-muted">
        <Image src={avatar} alt={nome || 'Usuário'} fill className="object-cover" />
      </div>
    );
  }
  return (
    <div className="w-9 h-9 rounded-full flex-shrink-0 bg-muted flex items-center justify-center">
      <UserIcon className="w-4 h-4 text-muted-foreground" />
    </div>
  );
}

function CommentItem({ comment, onDelete }: { comment: Comentario; onDelete: (id: number) => void }) {
  const { user } = useAppStore();
  const [revealed, setRevealed] = useState(!comment.spoiler);
  const canDelete = !!user && (user.id === comment.usuario_id || user.role === 'admin');

  return (
    <div className="flex gap-3 py-4 border-b border-border last:border-b-0">
      <CommentAvatar nome={comment.usuario.nome} avatar={comment.usuario.avatar} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-semibold orbe-text-primary">
            {comment.usuario.nome || 'Usuário Orbe'}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{formatData(comment.data_criacao)}</span>
            {canDelete && (
              <button
                onClick={() => onDelete(comment.id)}
                className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                title="Excluir comentário"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {comment.spoiler && !revealed ? (
          <button
            onClick={() => setRevealed(true)}
            className="mt-2 flex items-center gap-2 text-xs font-medium text-muted-foreground hover:orbe-text-primary bg-muted px-3 py-2 rounded-lg transition-colors"
          >
            <EyeOff className="h-3.5 w-3.5" />
            Contém spoiler — clique para revelar
          </button>
        ) : (
          <p className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap break-words">
            {comment.spoiler && (
              <button
                onClick={() => setRevealed(false)}
                className="inline-flex items-center gap-1 text-xs text-muted-foreground/70 hover:orbe-text-primary mr-2 align-middle"
                title="Ocultar novamente"
              >
                <Eye className="h-3 w-3" />
              </button>
            )}
            {comment.texto}
          </p>
        )}
      </div>
    </div>
  );
}

const CommentSection: React.FC<CommentSectionProps> = ({ midiaId, tipoMidia }) => {
  const { isAuthenticated } = useAppStore();
  const [comments, setComments] = useState<Comentario[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [texto, setTexto] = useState('');
  const [spoiler, setSpoiler] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    orbeNerdApi.getComments(tipoMidia, midiaId)
      .then((data: Comentario[]) => {
        if (!cancelled) setComments(data);
      })
      .catch((error) => {
        console.error('Erro ao carregar comentários:', error);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [tipoMidia, midiaId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = texto.trim();
    if (!trimmed) return;

    setIsSubmitting(true);
    try {
      const created = await orbeNerdApi.createComment({
        midia_id: midiaId,
        tipo_midia: tipoMidia,
        texto: trimmed,
        spoiler,
      });
      setComments((prev) => [created, ...prev]);
      setTexto('');
      setSpoiler(false);
    } catch (error) {
      console.error('Erro ao publicar comentário:', error);
      alert('Não foi possível publicar seu comentário. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Excluir este comentário?')) return;

    const previous = comments;
    setComments((prev) => prev.filter((c) => c.id !== id));
    try {
      await orbeNerdApi.deleteComment(id);
    } catch (error) {
      console.error('Erro ao excluir comentário:', error);
      alert('Não foi possível excluir o comentário. Tente novamente.');
      setComments(previous);
    }
  };

  return (
    <section>
      <h2 className="text-xl font-bold mb-4 text-yellow-500 dark:text-blue-400 flex items-center gap-2">
        <MessageSquare className="h-5 w-5" />
        Comentários {comments.length > 0 && `(${comments.length})`}
      </h2>

      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="space-y-2 mb-4">
          <textarea
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            maxLength={MAX_TEXTO_LENGTH}
            rows={3}
            placeholder="Deixe seu comentário..."
            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-none"
          />
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
              <input
                type="checkbox"
                checked={spoiler}
                onChange={(e) => setSpoiler(e.target.checked)}
                className="rounded border-border"
              />
              Contém spoiler
            </label>
            <button
              type="submit"
              disabled={isSubmitting || texto.trim().length === 0}
              className="bg-primary text-primary-foreground text-sm font-medium px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Publicando...' : 'Comentar'}
            </button>
          </div>
        </form>
      ) : (
        <p className="text-sm text-muted-foreground mb-4">
          <Link href="/login" className="text-primary hover:text-primary/80 font-medium">
            Faça login
          </Link>{' '}
          para deixar um comentário.
        </p>
      )}

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
        </div>
      ) : comments.length > 0 ? (
        <div>
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground py-4 text-center">
          Nenhum comentário ainda. Seja o primeiro a comentar!
        </p>
      )}
    </section>
  );
};

export default CommentSection;
