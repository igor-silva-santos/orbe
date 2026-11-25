import Constants from 'expo-constants';

export function getApiBase(): string {
  const fromEnv = process.env.EXPO_PUBLIC_API_URL;
  if (fromEnv) return fromEnv.replace(/\/$/, '');

  const extra = Constants.expoConfig?.extra as { apiUrlDefault?: string } | undefined;
  return (extra?.apiUrlDefault ?? 'http://10.0.2.2:3001/api').replace(/\/$/, '');
}