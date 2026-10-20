import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { randomBytes } from 'node:crypto';

// Generate a unique local-only secret on first run. Never commit .env.local.
const file = '.env.local';
const current = existsSync(file) ? readFileSync(file, 'utf8') : '';
if (!/^AUTH_SECRET=.{32,}$/m.test(current) || /AUTH_SECRET=(replace|put_|change)/m.test(current)) {
  const secret = randomBytes(48).toString('base64url');
  const cleaned = current.replace(/^AUTH_SECRET=.*(?:\r?\n|$)/gm, '').trim();
  writeFileSync(file, `AUTH_SECRET=${secret}\n${cleaned ? `${cleaned}\n` : ''}`, { mode: 0o600 });
  console.log('Created a unique local Auth.js secret in .env.local');
}
