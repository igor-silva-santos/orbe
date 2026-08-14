import { Router } from 'express';
import axios from 'axios';
import { logger } from '../logger';

const router = Router();

const ALLOWED_PATH_PATTERN = /^[a-zA-Z0-9/_.-]+$/;
const ALLOWED_CONTENT_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
const REQUEST_TIMEOUT_MS = 10000;
const IGDB_UPLOAD_BASE = 'https://images.igdb.com/igdb/image/upload';

router.get('/images/igdb/*imagePath', async (req, res) => {
  const params = req.params as { imagePath?: string | string[] };
  const rawPath = params.imagePath;
  const imagePath = Array.isArray(rawPath) ? rawPath.join('/') : rawPath;

  if (!imagePath || !ALLOWED_PATH_PATTERN.test(imagePath)) {
    return res.status(400).json({ error: 'Invalid image path.' });
  }

  const imageUrl = `${IGDB_UPLOAD_BASE}/${imagePath}`;

  try {
    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
      timeout: REQUEST_TIMEOUT_MS,
      maxContentLength: MAX_IMAGE_BYTES,
      maxBodyLength: MAX_IMAGE_BYTES,
      validateStatus: (status) => status < 500,
    });

    if (response.status !== 200) {
      return res.status(response.status === 404 ? 404 : 502).json({ error: 'Error fetching image.' });
    }

    const contentType = response.headers['content-type'] || 'image/jpeg';
    if (!ALLOWED_CONTENT_TYPES.has(contentType)) {
      return res.status(502).json({ error: 'Unexpected content type from image source.' });
    }

    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=86400, immutable');
    res.send(response.data);
  } catch (error) {
    logger.error(`Erro ao buscar imagem IGDB (${imagePath}): ${error}`);
    res.status(502).json({ error: 'Error fetching image.' });
  }
});

export default router;
