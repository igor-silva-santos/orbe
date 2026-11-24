import { ActivityIndicator, View } from 'react-native';
import { Tabs } from 'expo-router';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { colors } from '@/theme';

export default function TabsLayout() {
  const { ready } = useRequireAuth();

  if (!ready) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.bg }}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.bg },
        headerTintColor: colors.text,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
        tabBarActiveTintColor: colors.accentBright,
        tabBarInactiveTintColor: colors.textMuted,
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Início', tabBarLabel: 'Início' }} />
      <Tabs.Screen name="filmes" options={{ title: 'Filmes' }} />
      <Tabs.Screen name="busca" options={{ title: 'Busca' }} />
      <Tabs.Screen name="conta" options={{ title: 'Conta' }} />
    </Tabs>
  );
}