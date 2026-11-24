import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import Constants from 'expo-constants';
import { fetchMe } from '@/api/authApi';
import { clearToken } from '@/auth';
import { getApiBase } from '@/config';
import { colors } from '@/theme';

export default function ContaScreen() {
  const router = useRouter();
  const { data: user, isError } = useQuery({
    queryKey: ['me'],
    queryFn: fetchMe,
  });

  const appVersion = Constants.expoConfig?.version ?? '0.1.0';

  const onLogout = async () => {
    await clearToken();
    router.replace('/login');
  };

  const onLogoutPress = () => {
    Alert.alert('Sair', 'Deseja encerrar a sessão?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: () => void onLogout() },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Conta</Text>
      <Text style={styles.value}>{user?.email ?? (isError ? 'Não foi possível carregar o perfil.' : '…')}</Text>
      <Text style={styles.label}>API</Text>
      <Text style={styles.meta}>{getApiBase()}</Text>
      <Text style={styles.label}>Versão do app</Text>
      <Text style={styles.meta}>{appVersion}</Text>
      <Text style={styles.hint}>
        APK para instalar direto: em breve em orbenerd.com/app/android (build EAS).
      </Text>
      <Pressable style={styles.button} onPress={onLogoutPress}>
        <Text style={styles.buttonText}>Sair</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 24 },
  label: { color: colors.textMuted, fontSize: 12, textTransform: 'uppercase', marginTop: 16 },
  value: { color: colors.text, fontSize: 16, fontWeight: '700', marginTop: 4 },
  meta: { color: colors.text, fontSize: 13, marginTop: 4 },
  hint: { color: colors.textMuted, fontSize: 12, marginTop: 20, lineHeight: 18 },
  button: {
    marginTop: 32,
    backgroundColor: colors.accent,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '700' },
});