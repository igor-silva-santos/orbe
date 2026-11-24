# Orbe Nerd — app Android (Expo)

Cliente nativo **Android-first**. iOS fica fora do escopo enquanto não houver conta Apple paga — use o site PWA no iPhone.

## Configuração

1. Copie `.env.example` para `.env` e ajuste `EXPO_PUBLIC_API_URL`.
2. Instale dependências e inicie (comandos na seção abaixo — execute manualmente).

## Build APK para o site

Perfil EAS `production-apk` gera APK instalável. Depois publique o arquivo conforme [`docs/distribuicao-android-apk.md`](../../docs/distribuicao-android-apk.md).

## Marco atual (M0/M1)

- Login com JWT em Secure Store
- Home com prévia dos filmes do `/api/homepage`