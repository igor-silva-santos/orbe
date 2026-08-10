const dotenv = require('dotenv');
const path = require('path');
const { execSync } = require('child_process');

const root = path.join(__dirname, '..');
dotenv.config({ path: path.join(root, '.env') });
dotenv.config({ path: path.join(root, '.env.local'), override: true });

execSync('npx prisma migrate deploy', {
  stdio: 'inherit',
  env: process.env,
  cwd: root,
});
