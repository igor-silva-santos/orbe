'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { User, Mail, Calendar, Edit2, Shield, Settings, Download, ScrollText, List } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import orbeNerdApi from '@/lib/api';
import { API_BASE } from '@/lib/apiBase';
import { isAllowedRemoteImageHost } from '@/lib/image-utils';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [downloadingLogs, setDownloadingLogs] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await orbeNerdApi.getUserProfile();
        setUser(profile);
      } catch (error) {
        console.error('Erro ao carregar perfil:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  // TEMPORÁRIO — remover após investigação de sync jun–dez
  const handleDownloadSyncLogs = async () => {
    setDownloadingLogs(true);
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const response = await fetch(`${API_BASE}/sync/logs?filter=sync`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (!response.ok) {
        throw new Error(`Falha ao baixar logs (${response.status})`);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
      anchor.href = url;
      anchor.download = `orbe-sync-${stamp}.log`;
      anchor.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erro ao baixar log de sync:', error);
      toast.error('Não foi possível baixar o log de sync. Verifique se há uma sync em andamento ou recente.');
    } finally {
      setDownloadingLogs(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="container max-w-4xl mx-auto py-10 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Coluna da Esquerda: Avatar e Ações Rápidas */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-card rounded-xl border border-border p-6 text-center shadow-sm">
              <div className="relative w-32 h-32 mx-auto mb-4 group">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-primary/20">
                  {user.avatar && isAllowedRemoteImageHost(user.avatar) ? (
                    <Image
                      src={user.avatar}
                      alt={user.nome || 'Avatar'}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <User className="w-16 h-16 text-muted-foreground" />
                    </div>
                  )}
                </div>
              </div>
              <h2 className="text-xl font-bold">{user.nome || 'Usuário Orbe'}</h2>
              <p className="text-sm text-muted-foreground mb-4">{user.email}</p>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.role === 'admin' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                {user.role === 'admin' ? 'Administrador' : 'Explorador'}
              </span>
          </div>

          <div className="flex flex-col gap-2">
            <Link
              href="/minha-lista"
              className="flex items-center w-full px-4 py-2 bg-primary/10 border border-primary/30 text-primary rounded-lg hover:bg-primary/15 transition-colors text-sm font-medium"
            >
              <List className="mr-2 h-4 w-4" />
              Minha lista
            </Link>
            <button 
              onClick={() => router.push('/configuracoes')} 
              className="flex items-center w-full px-4 py-2 bg-background border border-border rounded-lg hover:bg-muted transition-colors text-sm font-medium"
            >
              <Settings className="mr-2 h-4 w-4" />
              Configurações
            </button>
            {user.role === 'admin' && (
              <>
                <button
                  type="button"
                  onClick={() => router.push('/admin')}
                  className="flex items-center w-full px-4 py-2 bg-primary/10 border border-primary/30 text-primary rounded-lg hover:bg-primary/15 transition-colors text-sm font-medium"
                >
                  <ScrollText className="mr-2 h-4 w-4" />
                  Painel de sincronização
                </button>
                <button
                  type="button"
                  onClick={handleDownloadSyncLogs}
                  disabled={downloadingLogs}
                  className="flex items-center w-full px-4 py-2 bg-amber-500/10 border border-amber-500/40 text-amber-700 dark:text-amber-300 rounded-lg hover:bg-amber-500/20 transition-colors text-sm font-medium disabled:opacity-50"
                  title="Temporário — investigação de sync jun–dez"
                >
                  <Download className="mr-2 h-4 w-4" />
                  {downloadingLogs ? 'Baixando log...' : 'Baixar log de sync'}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Coluna da Direita: Informações e Bio */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Sobre Mim</h3>
              <button onClick={() => router.push('/configuracoes')} className="p-2 hover:bg-muted rounded-full transition-colors">
                <Edit2 className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {user.bio || 'Você ainda não adicionou uma biografia. Vá em configurações para contar um pouco sobre seus gostos nerds!'}
            </p>
          </div>

          <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
            <h3 className="text-lg font-bold mb-4">Informações da Conta</h3>
            <div className="space-y-4">
              <div className="flex items-center text-sm">
                <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="font-medium mr-2">Email:</span>
                <span className="text-muted-foreground">{user.email}</span>
              </div>
              <div className="flex items-center text-sm">
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="font-medium mr-2">Membro desde:</span>
                <span className="text-muted-foreground">
                  {new Date(user.data_criacao).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                </span>
              </div>
              <div className="flex items-center text-sm">
                <Shield className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="font-medium mr-2">Visibilidade:</span>
                <span className="px-2 py-0.5 border border-border rounded-md text-xs">
                  {user.perfil_publico ? 'Público' : 'Privado'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
