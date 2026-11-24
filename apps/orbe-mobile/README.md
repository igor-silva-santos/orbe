# Orbe Nerd — app Android (Expo)

Cliente nativo **Android-first**. iOS: site PWA (“Adicionar à Tela de Início”).

API padrão: `https://orbe-7bu0.onrender.com/api` (Render).

## Desenvolvimento

```bash
cd apps/orbe-mobile
cp .env.example .env
npm install
npx expo start
```

## Marco M2 (implementado)

- Abas: Início · Filmes · Busca · Conta
- Detalhe de filme: `/filme/[id]`
- Ícones em `assets/` (necessários para EAS)

## Build APK (M2-G — você executa)

1. `npm i -g eas-cli` e `eas login`
2. No projeto: `eas build:configure` (uma vez)
3. Build:

```bash
cd apps/orbe-mobile
eas build -p android --profile production-apk
```

4. Baixe o APK, publique (ex.: `frontend/public/downloads/`) e configure no Vercel:

- `NEXT_PUBLIC_ANDROID_APK_URL`
- `NEXT_PUBLIC_ANDROID_APK_SHA256` — use `../../ops/apk-sha256.sh`

Página: `/app/android` — ver [`docs/distribuicao-android-apk.md`](../../docs/distribuicao-android-apk.md).

## Push web (não é FCM nativo ainda)

Notificações no navegador: [`docs/render-vapid-m2f.md`](../../docs/render-vapid-m2f.md).