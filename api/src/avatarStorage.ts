import axios from 'axios';
import { mkdir, rename, rm, writeFile } from 'fs/promises';
import path from 'path';
import { logger } from './logger';

/** Teto do arquivo guardado. O binário não entra no Postgres. */
export const MAX_AVATAR_BYTES = 200 * 1024;

const AVATAR_BUCKET = 'avatars';
const FILE_NAME = /^(\d+)\.(webp|jpg|png|gif)$/;

export type ImageKind = { mime: string; ext: 'webp' | 'jpg' | 'png' | 'gif' };

export class AvatarStorageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AvatarStorageError';
  }
}

export function sniffImage(bytes: Buffer): ImageKind | null {
  if (bytes.length < 12 || bytes.length > MAX_AVATAR_BYTES) return null;
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return { mime: 'image/jpeg', ext: 'jpg' };
  }
  if (
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a &&
    bytes[6] === 0x1a &&
    bytes[7] === 0x0a
  ) {
    return { mime: 'image/png', ext: 'png' };
  }
  if (bytes.subarray(0, 4).toString('ascii') === 'RIFF' && bytes.subarray(8, 12).toString('ascii') === 'WEBP') {
    return { mime: 'image/webp', ext: 'webp' };
  }
  const gif = bytes.subarray(0, 6).toString('ascii');
  if (gif === 'GIF87a' || gif === 'GIF89a') return { mime: 'image/gif', ext: 'gif' };
  return null;
}

export function isSupabaseAvatarConfigured(
  env: { SUPABASE_URL?: string; SUPABASE_SERVICE_ROLE_KEY?: string } = process.env,
): boolean {
  return Boolean(env.SUPABASE_URL?.trim() && env.SUPABASE_SERVICE_ROLE_KEY?.trim());
}

/** Referência curta gravada em `User.avatar`. Nunca é o arquivo nem base64. */
export function avatarReference(backend: 'sb' | 'file', userId: number, ext: ImageKind['ext']): string {
  return `${backend}:${userId}.${ext}`;
}

export function parseAvatarRef(
  stored: string | null | undefined,
): { backend: 'sb' | 'file'; file: string } | null {
  if (!stored) return null;
  const match = /^(sb|file):(\d+\.(?:webp|jpg|png|gif))$/.exec(stored);
  if (!match) return null;
  return { backend: match[1] as 'sb' | 'file', file: match[2] };
}

export function resolveAvatarUrl(
  stored: string | null | undefined,
  supabaseUrl = process.env.SUPABASE_URL,
): string | null {
  const ref = parseAvatarRef(stored);
  if (ref?.backend === 'file') return `/api/users/avatars/${ref.file}`;
  if (ref?.backend === 'sb') {
    const base = supabaseUrl?.trim().replace(/\/$/, '');
    if (!base) return null;
    return `${base}/storage/v1/object/public/${AVATAR_BUCKET}/${ref.file}`;
  }
  if (stored && /^https?:\/\//i.test(stored)) return stored;
  return null;
}

export function localAvatarDirectory(): string {
  return path.resolve(process.cwd(), 'data', 'avatars');
}

/** Caminho absoluto dentro do diretório, ou null se o nome não for seguro. */
export function resolveLocalAvatarFile(dir: string, file: string): string | null {
  if (!FILE_NAME.test(file)) return null;
  const root = path.resolve(dir);
  const full = path.resolve(root, file);
  if (full !== path.join(root, path.basename(file))) return null;
  return full;
}

export async function writeLocalAvatarFile(dir: string, file: string, bytes: Buffer): Promise<void> {
  const full = resolveLocalAvatarFile(dir, file);
  if (!full) throw new AvatarStorageError('Não foi possível guardar a foto.');
  await mkdir(dir, { recursive: true });
  const tmp = `${full}.${process.pid}.tmp`;
  await writeFile(tmp, bytes);
  await rename(tmp, full);
}

export async function removeLocalAvatarFile(dir: string, file: string): Promise<void> {
  const full = resolveLocalAvatarFile(dir, file);
  if (!full) return;
  await rm(full, { force: true });
}

let bucketReady: Promise<void> | null = null;
let loggedLocalFallback = false;

function logLocalFallback(): void {
  if (loggedLocalFallback) return;
  loggedLocalFallback = true;
  logger.warn(
    'Avatares em disco local (data/avatars). Defina SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY ' +
      'para usar o Supabase Storage do plano free. No Render esse disco é efêmero.',
  );
}

function supabaseBase(): string {
  return process.env.SUPABASE_URL!.trim().replace(/\/$/, '');
}

function supabaseAuthHeaders(): Record<string, string> {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!.trim();
  return { Authorization: `Bearer ${key}`, apikey: key };
}

async function ensureAvatarsBucket(): Promise<void> {
  if (!bucketReady) {
    bucketReady = createOrUpdateAvatarsBucket().catch((error) => {
      bucketReady = null;
      throw error;
    });
  }
  return bucketReady;
}

async function createOrUpdateAvatarsBucket(): Promise<void> {
  const payload = {
    id: AVATAR_BUCKET,
    name: AVATAR_BUCKET,
    public: true,
    file_size_limit: MAX_AVATAR_BYTES,
    allowed_mime_types: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  };
  const created = await axios.post(`${supabaseBase()}/storage/v1/bucket`, payload, {
    headers: { ...supabaseAuthHeaders(), 'Content-Type': 'application/json' },
    timeout: 20_000,
    validateStatus: () => true,
    responseType: 'text',
  });
  const createdText = typeof created.data === 'string' ? created.data : '';
  const alreadyExists = created.status === 409 || /already exists|duplicate/i.test(createdText);
  if ((created.status < 200 || created.status >= 300) && !alreadyExists) {
    logger.error(`Supabase Storage recusou o bucket avatars (status ${created.status}).`);
    throw new AvatarStorageError('Não foi possível guardar a foto.');
  }

  const updated = await axios.put(
    `${supabaseBase()}/storage/v1/bucket/${AVATAR_BUCKET}`,
    {
      public: true,
      file_size_limit: MAX_AVATAR_BYTES,
      allowed_mime_types: payload.allowed_mime_types,
    },
    {
      headers: { ...supabaseAuthHeaders(), 'Content-Type': 'application/json' },
      timeout: 20_000,
      validateStatus: () => true,
      responseType: 'text',
    },
  );
  if (updated.status < 200 || updated.status >= 300) {
    logger.warn(
      `Bucket avatars não foi marcado como público (status ${updated.status}). ` +
        'A foto foi enviada, mas a URL pública só abre se o bucket estiver público.',
    );
  }
}

async function uploadSupabaseObject(file: string, bytes: Buffer, mime: string): Promise<void> {
  await ensureAvatarsBucket();
  const response = await axios.post(
    `${supabaseBase()}/storage/v1/object/${AVATAR_BUCKET}/${file}`,
    bytes,
    {
      headers: {
        ...supabaseAuthHeaders(),
        'Content-Type': mime,
        'x-upsert': 'true',
        'cache-control': 'no-cache',
      },
      maxBodyLength: MAX_AVATAR_BYTES + 1024,
      timeout: 20_000,
      validateStatus: () => true,
      responseType: 'text',
      transformRequest: [(data) => data],
    },
  );
  if (response.status < 200 || response.status >= 300) {
    logger.error(`Falha ao enviar avatar ao Supabase Storage (status ${response.status}).`);
    throw new AvatarStorageError('Não foi possível guardar a foto.');
  }
}

async function deleteSupabaseObject(file: string): Promise<void> {
  if (!isSupabaseAvatarConfigured()) return;
  const response = await axios.delete(`${supabaseBase()}/storage/v1/object/${AVATAR_BUCKET}/${file}`, {
    headers: supabaseAuthHeaders(),
    timeout: 20_000,
    validateStatus: () => true,
  });
  if (response.status >= 500) {
    logger.warn(`Não foi possível apagar avatar antigo no Supabase (status ${response.status}).`);
  }
}

async function deletePrevious(previous: { backend: 'sb' | 'file'; file: string } | null, nextFile: string): Promise<void> {
  if (!previous || previous.file === nextFile) return;
  if (previous.backend === 'file') {
    await removeLocalAvatarFile(localAvatarDirectory(), previous.file);
    return;
  }
  await deleteSupabaseObject(previous.file);
}

export async function storeAvatar(input: {
  userId: number;
  bytes: Buffer;
  kind: ImageKind;
  previousRef?: string | null;
}): Promise<{ ref: string; avatarUrl: string }> {
  const file = `${input.userId}.${input.kind.ext}`;
  const previous = parseAvatarRef(input.previousRef);

  if (isSupabaseAvatarConfigured()) {
    await uploadSupabaseObject(file, input.bytes, input.kind.mime);
    await deletePrevious(previous, file);
    const ref = avatarReference('sb', input.userId, input.kind.ext);
    const avatarUrl = resolveAvatarUrl(ref);
    if (!avatarUrl) throw new AvatarStorageError('Não foi possível guardar a foto.');
    return { ref, avatarUrl };
  }

  logLocalFallback();
  await writeLocalAvatarFile(localAvatarDirectory(), file, input.bytes);
  await deletePrevious(previous, file);
  const ref = avatarReference('file', input.userId, input.kind.ext);
  const avatarUrl = resolveAvatarUrl(ref);
  if (!avatarUrl) throw new AvatarStorageError('Não foi possível guardar a foto.');
  return { ref, avatarUrl };
}

export async function removeStoredAvatar(stored: string | null | undefined): Promise<void> {
  const ref = parseAvatarRef(stored);
  if (!ref) return;
  try {
    if (ref.backend === 'file') {
      await removeLocalAvatarFile(localAvatarDirectory(), ref.file);
      return;
    }
    await deleteSupabaseObject(ref.file);
  } catch (error) {
    logger.warn(`Falha ao apagar arquivo de avatar ${ref.backend}:${ref.file}`);
  }
}

export function asAvatarBuffer(body: unknown): Buffer | null {
  if (Buffer.isBuffer(body)) return body;
  if (body instanceof Uint8Array) return Buffer.from(body);
  return null;
}
