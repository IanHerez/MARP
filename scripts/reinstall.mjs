import { execSync } from 'child_process';
import { rmSync } from 'fs';
import { join } from 'path';

const projectDir = '/vercel/share/v0-project';

console.log('Removing node_modules...');
try {
  rmSync(join(projectDir, 'node_modules'), { recursive: true, force: true });
  console.log('node_modules removed.');
} catch (e) {
  console.log('node_modules not found or already removed.');
}

console.log('Running npm install...');
execSync('npm install', { cwd: projectDir, stdio: 'inherit' });
console.log('Done! Dependencies reinstalled.');
