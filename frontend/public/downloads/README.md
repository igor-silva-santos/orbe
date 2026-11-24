# APK Android (hospedagem estática)

Coloque aqui o arquivo `.apk` **ou** hospede em Blob/R2 e aponte `NEXT_PUBLIC_ANDROID_APK_URL` para a URL HTTPS.

Na Vercel, arquivos em `public/downloads/` ficam em `https://seu-site/downloads/nome.apk`.

Depois do build:

```bash
sha256sum orbe-nerd.apk
# ou: ../../ops/apk-sha256.sh orbe-nerd.apk
```

Variáveis no Vercel (`frontend`):

- `NEXT_PUBLIC_ANDROID_APK_URL`
- `NEXT_PUBLIC_ANDROID_APK_SHA256` (opcional, recomendado)
- `NEXT_PUBLIC_ANDROID_APK_VERSION` (ex.: `0.1.0`)
- `NEXT_PUBLIC_ANDROID_APK_BUILD_DATE` (ex.: `2026-11-24`)