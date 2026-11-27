'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertTriangle, Check, ChevronDown, ChevronUp, Eye, LayoutGrid, Save, Trash2, User } from 'lucide-react';
import orbeNerdApi from '@/lib/api';
import { prepareAvatarBlob } from '@/lib/avatar-image';
import {
  DEFAULT_HOME_LAYOUT,
  HOME_CAROUSEL_IDS,
  HOME_CAROUSEL_LABELS,
  hideHomeCarousel,
  moveHomeCarousel,
  normalizeHomeLayout,
  showHomeCarousel,
  type HomeCarouselId,
} from '@/lib/home-layout';
import PushNotificationsSettings from '@/components/support/PushNotificationsSettings';
import { deleteAccountWithPassword } from '@/lib/auth/session';
import { useAppStore } from '@/stores/appStore';

const inputClass =
  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

const quietButtonClass =
  'inline-flex h-9 items-center justify-center rounded-md border border-border bg-background px-3 text-sm font-medium hover:bg-muted disabled:pointer-events-none disabled:opacity-40';

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const { logout } = useAppStore();

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleting, setDeleting] = useState(false);

  const [nome, setNome] = useState('');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [perfilPublico, setPerfilPublico] = useState(true);
  const [layout, setLayout] = useState<HomeCarouselId[]>(DEFAULT_HOME_LAYOUT);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await orbeNerdApi.getUserProfile();
        setNome(profile.nome || '');
        setBio(profile.bio || '');
        setAvatarUrl(profile.avatarUrl || null);
        setPerfilPublico(profile.perfil_publico ?? true);
        setLayout(normalizeHomeLayout(profile.homeLayout));
      } catch (error) {
        console.error('Erro ao carregar perfil:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const handleDeleteAccount = async () => {
    if (!deletePassword.trim()) {
      setMessage({ type: 'error', text: 'Digite sua senha para confirmar a exclusão.' });
      return;
    }
    setDeleting(true);
    setMessage(null);
    try {
      await deleteAccountWithPassword(deletePassword);
      logout();
      router.push('/');
    } catch (error) {
      console.error('Erro ao excluir conta:', error);
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Não foi possível excluir a conta.',
      });
    } finally {
      setDeleting(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      await orbeNerdApi.updateUserProfile({
        nome,
        bio,
        perfil_publico: perfilPublico,
        homeLayout: layout,
      });
      setMessage({ type: 'success', text: 'Configurações salvas.' });
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Erro ao salvar alterações.',
      });
    } finally {
      setSaving(false);
    }
  };

  const onPickAvatar = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    setMessage(null);
    try {
      const prepared = await prepareAvatarBlob(file);
      const profile = await orbeNerdApi.uploadAvatar(prepared.blob, prepared.mime);
      const nextUrl = profile.avatarUrl as string | null;
      setAvatarUrl(nextUrl ? `${nextUrl}${nextUrl.includes('?') ? '&' : '?'}v=${Date.now()}` : null);
      setMessage({ type: 'success', text: 'Foto atualizada.' });
    } catch (error) {
      console.error('Erro ao enviar foto:', error);
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Não foi possível enviar a foto.',
      });
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const removeAvatar = async () => {
    setUploading(true);
    setMessage(null);
    try {
      await orbeNerdApi.deleteAvatar();
      setAvatarUrl(null);
      setMessage({ type: 'success', text: 'Foto removida.' });
    } catch (error) {
      console.error('Erro ao remover foto:', error);
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Não foi possível remover a foto.',
      });
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const hidden = HOME_CAROUSEL_IDS.filter((id) => !layout.includes(id));

  return (
    <div className="container max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Configurações de Conta</h1>

      {message && (
        <div
          className={`mb-6 p-4 rounded-lg flex items-center gap-2 ${
            message.type === 'success'
              ? 'bg-green-500/20 text-green-500 border border-green-500/50'
              : 'bg-red-500/20 text-red-500 border border-red-500/50'
          }`}
          role="status"
        >
          {message.type === 'success' ? <Check className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
          {message.text}
        </div>
      )}

      <form
        className="space-y-8"
        onSubmit={(event) => {
          event.preventDefault();
          void handleSave();
        }}
      >
        <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-bold flex items-center">
              <User className="mr-2 h-5 w-5" />
              Sua conta
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Nome, foto e bio desta conta.</p>
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none" htmlFor="nome">
                Nome de exibição
              </label>
              <input
                id="nome"
                className={inputClass}
                placeholder="Seu nome ou nickname"
                value={nome}
                onChange={(event) => setNome(event.target.value)}
              />
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium leading-none">Foto</p>
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-border bg-muted">
                  {avatarUrl ? (
                    // Foto da conta: <img> evita a otimização de imagens da Vercel.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={avatarUrl} alt={nome || 'Foto da conta'} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <User className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <input
                    ref={fileRef}
                    id="avatar"
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    className="sr-only"
                    onChange={(event) => void onPickAvatar(event.target.files?.[0])}
                  />
                  <button
                    type="button"
                    className={quietButtonClass}
                    disabled={uploading}
                    onClick={() => fileRef.current?.click()}
                  >
                    {uploading ? 'Enviando...' : 'Escolher imagem'}
                  </button>
                  {avatarUrl && (
                    <button type="button" className={quietButtonClass} disabled={uploading} onClick={() => void removeAvatar()}>
                      Remover foto
                    </button>
                  )}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                JPG, PNG ou WebP. A imagem é reduzida antes do envio e a foto é atualizada na hora.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none" htmlFor="bio">
                Bio
              </label>
              <textarea
                id="bio"
                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Conte um pouco sobre seus filmes e jogos favoritos..."
                value={bio}
                onChange={(event) => setBio(event.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-bold flex items-center">
              <LayoutGrid className="mr-2 h-5 w-5" />
              Tela inicial
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Com a conta logada, você escolhe a ordem dos carrosséis e quais aparecem na home.
            </p>
          </div>
          <div className="p-6 space-y-4">
            <ul aria-label="Carrosséis na tela inicial" className="divide-y divide-border">
              {layout.map((id, index) => (
                <li key={id} className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between">
                  <span className="font-medium">{HOME_CAROUSEL_LABELS[id]}</span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      className={quietButtonClass}
                      aria-label={`Subir ${HOME_CAROUSEL_LABELS[id]}`}
                      disabled={index === 0}
                      onClick={() => setLayout((current) => moveHomeCarousel(current, id, -1))}
                    >
                      <ChevronUp className="mr-1 h-4 w-4" />
                      Subir
                    </button>
                    <button
                      type="button"
                      className={quietButtonClass}
                      aria-label={`Descer ${HOME_CAROUSEL_LABELS[id]}`}
                      disabled={index === layout.length - 1}
                      onClick={() => setLayout((current) => moveHomeCarousel(current, id, 1))}
                    >
                      <ChevronDown className="mr-1 h-4 w-4" />
                      Descer
                    </button>
                    <button
                      type="button"
                      className={quietButtonClass}
                      onClick={() => setLayout((current) => hideHomeCarousel(current, id))}
                    >
                      Remover da home
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            {layout.length === 0 && (
              <p className="text-sm text-muted-foreground">Nenhum carrossel na tela inicial.</p>
            )}
            {hidden.length > 0 && (
              <div className="space-y-2 pt-2">
                <p className="text-sm font-medium">Fora da tela inicial</p>
                <div className="flex flex-wrap gap-2">
                  {hidden.map((id) => (
                    <button
                      key={id}
                      type="button"
                      className={quietButtonClass}
                      onClick={() => setLayout((current) => showHomeCarousel(current, id))}
                    >
                      Mostrar {HOME_CAROUSEL_LABELS[id]}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <PushNotificationsSettings />

        <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-bold flex items-center">
              <Eye className="mr-2 h-5 w-5" />
              Privacidade
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Controle quem pode ver sua atividade.</p>
          </div>
          <div className="p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium">Perfil Público</p>
                <p className="text-sm text-muted-foreground">Permitir que outros usuários vejam sua lista e favoritos.</p>
              </div>
              <button
                type="button"
                onClick={() => setPerfilPublico(!perfilPublico)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 ${perfilPublico ? 'bg-primary' : 'bg-muted'}`}
              >
                <span className={`pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform ${perfilPublico ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-destructive/40 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-bold flex items-center text-destructive">
              <Trash2 className="mr-2 h-5 w-5" />
              Excluir conta
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Remove permanentemente sua conta, lista e preferências. Contas de teste QA devem usar este fluxo ao encerrar a rodada.
            </p>
          </div>
          <div className="p-6 space-y-4">
            {!deleteOpen ? (
              <button
                type="button"
                onClick={() => setDeleteOpen(true)}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-destructive text-destructive hover:bg-destructive/10 h-10 px-4"
              >
                Quero excluir minha conta
              </button>
            ) : (
              <>
                <p className="text-sm text-muted-foreground">
                  Digite sua senha para confirmar. Esta ação não pode ser desfeita.
                </p>
                <input
                  type="password"
                  autoComplete="current-password"
                  className={inputClass}
                  placeholder="Sua senha"
                  value={deletePassword}
                  onChange={(event) => setDeletePassword(event.target.value)}
                />
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleDeleteAccount}
                    disabled={deleting}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 px-4 disabled:opacity-50"
                  >
                    {deleting ? 'Excluindo...' : 'Confirmar exclusão'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDeleteOpen(false);
                      setDeletePassword('');
                    }}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input h-10 px-4"
                  >
                    Cancelar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving || uploading}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full sm:w-auto"
          >
            {saving ? (
              'Salvando...'
            ) : (
              <span className="flex items-center">
                <Save className="mr-2 h-4 w-4" />
                Salvar alterações
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
