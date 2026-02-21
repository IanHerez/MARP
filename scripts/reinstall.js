import { execSync } from 'child_process';
import { existsSync, unlinkSync, rmSync } from 'fs';
import { join } from 'path';

const projectDir = '/vercel/share/v0-project';

// Remove node_modules if it exists
const nodeModulesPath = join(projectDir, 'node_modules');
if (existsSync(nodeModulesPath)) {
  console.log('Removing node_modules...');
  rmSync(nodeModulesPath, { recursive: true, force: true });
}

// Remove old lock file if it exists
const lockFilePath = join(projectDir, 'package-lock.json');
if (existsSync(lockFilePath)) {
  console.log('Removing old package-lock.json...');
  unlinkSync(lockFilePath);
}

// Run npm install to generate a fresh lock file
console.log('Running npm install...');
try {
  execSync('npm install', { 
    cwd: projectDir, 
    stdio: 'inherit',
    timeout: 120000
  });
  console.log('npm install completed successfully!');
} catch (error) {
  console.error('npm install failed:', error.message);
  process.exit(1);
}
