'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, User, Bell, Lock, Eye, Check } from 'lucide-react';
import orbeNerdApi from '@/lib/api';

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const router = useRouter();

  // Estados dos campos
  const [nome, setNome] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState('');
  const [perfilPublico, setPerfilPublico] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await orbeNerdApi.getUserProfile();
        setUser(profile);
        setNome(profile.nome || '');
        setBio(profile.bio || '');
        setAvatar(profile.avatar || '');
        setPerfilPublico(profile.perfil_publico ?? true);
      } catch (error) {
        console.error('Erro ao carregar perfil:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      await orbeNerdApi.updateUserProfile({
        nome,
        bio,
        avatar,
        perfil_publico: perfilPublico
      });
      setMessage({ type: 'success', text: 'Configurações salvas com sucesso!' });
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      setMessage({ type: 'error', text: 'Erro ao salvar alterações.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Configurações de Conta</h1>

      {message && (
        <div className={`mb-6 p-4 rounded-lg flex items-center gap-2 ${message.type === 'success' ? 'bg-green-500/20 text-green-500 border border-green-500/50' : 'bg-red-500/20 text-red-500 border border-red-500/50'}`}>
          {message.type === 'success' ? <Check className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
          {message.text}
        </div>
      )}

      <div className="space-y-8">
        {/* Perfil Básico */}
        <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-bold flex items-center">
              <User className="mr-2 h-5 w-5" />
              Perfil Público
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Como os outros usuários verão você na plataforma.</p>
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="nome">Nome de Exibição</label>
              <input 
                id="nome" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Seu nome ou nickname" 
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="avatar">URL do Avatar</label>
              <input 
                id="avatar" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="https://link-da-sua-imagem.com/foto.jpg" 
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="bio">Bio</label>
              <textarea 
                id="bio" 
                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Conte um pouco sobre seus filmes e jogos favoritos..." 
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Privacidade */}
        <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-bold flex items-center">
              <Eye className="mr-2 h-5 w-5" />
              Privacidade
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Controle quem pode ver sua atividade.</p>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between">
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

        {/* Rodapé de Ações */}
        <div className="flex justify-end pt-4">
          <button 
            onClick={handleSave} 
            disabled={saving} 
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full sm:w-auto"
          >
            {saving ? 'Salvando...' : (
              <span className="flex items-center">
                <Save className="mr-2 h-4 w-4" />
                Salvar Alterações
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
