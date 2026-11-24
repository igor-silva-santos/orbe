# Distribuição Android — APK no site

**Decisão (nov/2026):** app nativo **Android** via **APK baixado do site**; **sem** Google Play obrigatório; **sem** conta Apple paga no iOS (web/PWA no iPhone).

## 1. Build do APK

### Opção A — EAS (nuvem, plano Free)

1. `eas login` (conta Expo gratuita).
2. `eas build:configure` dentro de `apps/orbe-mobile/`.
3. Build APK:

```bash
cd apps/orbe-mobile
eas build -p android --profile production-apk
```

Baixe o APK do painel EAS quando concluir.

### Opção B — build local (sem cota EAS)

```bash
cd apps/orbe-mobile
npx expo prebuild --platform android
cd android && ./gradlew assembleRelease
```

Requer JDK e Android SDK instalados.

## 2. Publicar no site

1. Hospede o APK em URL estável, por exemplo:
   - `https://orbe-seven.vercel.app/downloads/orbe-nerd-android.apk`
2. Crie/atualize a página [`/app/android`](/frontend/src/app/app/android/page.tsx) com:
   - Versão e data do build
   - SHA-256 do arquivo (comando abaixo)
   - Instruções PT-BR: habilitar “Instalar apps desconhecidos”, abrir o link, instalar

### SHA-256 (Linux)

```bash
sha256sum orbe-nerd-android.apk
```

### SHA-256 (PowerShell)

```powershell
powershell.exe -ExecutionPolicy Bypass -Command "Get-FileHash -Path .\orbe-nerd-android.apk -Algorithm SHA256 | Select-Object -ExpandProperty Hash"
```

## 3. Atualizações

| Método | Quando usar |
|--------|-------------|
| Novo APK no mesmo URL | Betas; usuário reinstala ou usa app interno de update (futuro) |
| **expo-updates** (OTA só JS) | Correções de UI sem mudar binário nativo |
| Play Store (US$ 25 único) | Opcional no futuro |

## 4. iOS (sem US$ 99/ano)

- **Não** distribuir IPA nativo em escala.
- Indicar no site: **Adicionar à Tela de Início** (PWA) em Safari.
- Push no iOS: limitações da PWA — ver `plano-performance-notificacoes.md`.

## 5. Segurança

- Assine o APK com keystore de release (não commite o keystore no Git).
- Liste o fingerprint na página de download.
- Use HTTPS obrigatório no link do APK.