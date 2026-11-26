import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'fs/promises';
import { tmpdir } from 'os';
import path from 'path';
import {
  avatarReference,
  isSupabaseAvatarConfigured,
  parseAvatarRef,
  resolveAvatarUrl,
  resolveLocalAvatarFile,
  sniffImage,
  writeLocalAvatarFile,
  MAX_AVATAR_BYTES,
} from './avatarStorage';

function jpegBytes(): Buffer {
  const bytes = Buffer.alloc(32);
  bytes[0] = 0xff;
  bytes[1] = 0xd8;
  bytes[2] = 0xff;
  return bytes;
}

describe('avatarStorage', () => {
  it('reconhece jpeg, png, webp e gif e recusa o resto', () => {
    assert.equal(sniffImage(jpegBytes())?.ext, 'jpg');

    const png = Buffer.alloc(16);
    png.set([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a], 0);
    assert.equal(sniffImage(png)?.ext, 'png');

    const webp = Buffer.alloc(16);
    webp.write('RIFF', 0, 'ascii');
    webp.write('WEBP', 8, 'ascii');
    assert.equal(sniffImage(webp)?.ext, 'webp');

    const gif = Buffer.alloc(16);
    gif.write('GIF89a', 0, 'ascii');
    assert.equal(sniffImage(gif)?.ext, 'gif');

    assert.equal(sniffImage(Buffer.from('<html>não é imagem</html>')), null);
    assert.equal(sniffImage(Buffer.alloc(MAX_AVATAR_BYTES + 1)), null);
  });

  it('a referência no banco é curta e não carrega o arquivo', () => {
    const ref = avatarReference('sb', 42, 'webp');
    assert.equal(ref, 'sb:42.webp');
    assert.ok(ref.length < 40);
    assert.equal(ref.includes('base64'), false);
    assert.deepEqual(parseAvatarRef(ref), { backend: 'sb', file: '42.webp' });
    assert.equal(parseAvatarRef('data:image/png;base64,aaaa'), null);
    assert.equal(parseAvatarRef('../.env'), null);
  });

  it('monta a URL pública sem gravar o binário', () => {
    assert.equal(resolveAvatarUrl('file:7.jpg'), '/api/users/avatars/7.jpg');
    assert.equal(
      resolveAvatarUrl('sb:7.webp', 'https://abc.supabase.co/'),
      'https://abc.supabase.co/storage/v1/object/public/avatars/7.webp',
    );
    assert.equal(resolveAvatarUrl('sb:7.webp', ''), null);
    assert.equal(resolveAvatarUrl('https://image.tmdb.org/t/p/w200/x.jpg'), 'https://image.tmdb.org/t/p/w200/x.jpg');
  });

  it('storage free só conta como configurado com URL e chave', () => {
    assert.equal(isSupabaseAvatarConfigured({ SUPABASE_URL: '', SUPABASE_SERVICE_ROLE_KEY: 'k' }), false);
    assert.equal(
      isSupabaseAvatarConfigured({
        SUPABASE_URL: 'https://abc.supabase.co',
        SUPABASE_SERVICE_ROLE_KEY: 'sb_secret_x',
      }),
      true,
    );
  });

  it('não deixa o nome do arquivo sair da pasta local', async () => {
    assert.equal(resolveLocalAvatarFile('/tmp/avatars', '../.env'), null);
    assert.equal(resolveLocalAvatarFile('/tmp/avatars', '1.webp'), path.resolve('/tmp/avatars', '1.webp'));

    const dir = await mkdtemp(path.join(tmpdir(), 'orbe-avatar-'));
    try {
      const bytes = jpegBytes();
      await writeLocalAvatarFile(dir, '9.jpg', bytes);
      const saved = await readFile(path.join(dir, '9.jpg'));
      assert.deepEqual(saved, bytes);
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });
});
