const MAX_EDGE = 512;
const TARGET_BYTES = 180 * 1024;

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob | null> {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), type, quality);
  });
}

async function loadHtmlImage(url: string): Promise<HTMLImageElement> {
  const img = new Image();
  img.decoding = 'async';
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error('Não foi possível ler essa imagem.'));
    img.src = url;
  });
  return img;
}

/**
 * Reduz a foto no navegador antes do envio, para o arquivo no storage ficar pequeno.
 * O banco não recebe o binário.
 */
export async function prepareAvatarBlob(file: File): Promise<{ blob: Blob; mime: string }> {
  if (!file || file.size === 0) throw new Error('Escolha uma imagem.');
  if (file.type && !file.type.startsWith('image/')) {
    throw new Error('Escolha uma imagem JPG, PNG ou WebP.');
  }

  let bitmap: ImageBitmap | null = null;
  let objectUrl: string | null = null;
  let source: CanvasImageSource;
  try {
    if (typeof createImageBitmap === 'function') {
      try {
        bitmap = await createImageBitmap(file);
      } catch {
        bitmap = null;
      }
    }
    if (bitmap) {
      source = bitmap;
    } else {
      objectUrl = URL.createObjectURL(file);
      source = await loadHtmlImage(objectUrl);
    }

    const width = bitmap ? bitmap.width : (source as HTMLImageElement).naturalWidth;
    const height = bitmap ? bitmap.height : (source as HTMLImageElement).naturalHeight;
    if (!width || !height) throw new Error('Não foi possível ler essa imagem.');

    let edge = MAX_EDGE;
    let quality = 0.82;
    let last: Blob | null = null;

    for (let attempt = 0; attempt < 5; attempt += 1) {
      const scale = Math.min(1, edge / Math.max(width, height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(width * scale));
      canvas.height = Math.max(1, Math.round(height * scale));
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Não foi possível processar a imagem.');
      ctx.drawImage(source, 0, 0, canvas.width, canvas.height);

      const webp = await canvasToBlob(canvas, 'image/webp', quality);
      const blob = webp && webp.size > 0 ? webp : await canvasToBlob(canvas, 'image/jpeg', quality);
      if (!blob || blob.size === 0) throw new Error('Não foi possível processar a imagem.');
      last = blob;
      if (blob.size <= TARGET_BYTES) {
        return { blob, mime: blob.type || 'image/jpeg' };
      }
      quality = Math.max(0.5, quality - 0.12);
      edge = Math.round(edge * 0.75);
    }

    if (last && last.size <= 200 * 1024) {
      return { blob: last, mime: last.type || 'image/jpeg' };
    }
    throw new Error('Essa imagem continua grande demais. Tente outra foto.');
  } finally {
    bitmap?.close();
    if (objectUrl) URL.revokeObjectURL(objectUrl);
  }
}
