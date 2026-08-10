import dotenv from 'dotenv';
import path from 'path';

const apiRoot = path.resolve(__dirname, '..');

// .env base, depois .env.local sobrescreve (padrão Next.js/local dev)
dotenv.config({ path: path.join(apiRoot, '.env') });
dotenv.config({ path: path.join(apiRoot, '.env.local'), override: true });
