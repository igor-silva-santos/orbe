import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const ALLOWED_PATH_PATTERN = /^[a-zA-Z0-9/_.-]+$/;
const ALLOWED_CONTENT_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
const MAX_IMAGE_BYTES = 10 * 1024 * 1024; // 10MB
const REQUEST_TIMEOUT_MS = 10000;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  if (!slug || !Array.isArray(slug) || slug.length === 0) {
    return res.status(400).json({ error: 'Image path is required.' });
  }

  const imagePath = slug.join('/');

  if (!ALLOWED_PATH_PATTERN.test(imagePath)) {
    return res.status(400).json({ error: 'Invalid image path.' });
  }

  const imageUrl = `https://images.igdb.com/igdb/image/upload/${imagePath}`;

  try {
    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
      timeout: REQUEST_TIMEOUT_MS,
      maxContentLength: MAX_IMAGE_BYTES,
      maxBodyLength: MAX_IMAGE_BYTES,
    });

    const contentType = response.headers['content-type'] || 'image/jpeg';
    if (!ALLOWED_CONTENT_TYPES.has(contentType)) {
      return res.status(502).json({ error: 'Unexpected content type from image source.' });
    }

    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=86400, immutable');
    res.send(response.data);
  } catch (error) {
    console.error('Error proxying IGDB image:', error);
    res.status(502).json({ error: 'Error fetching image.' });
  }
}
