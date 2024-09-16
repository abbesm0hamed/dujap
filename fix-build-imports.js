import { readdirSync, readFileSync, writeFileSync, statSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

// Needed for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

// Recursively read all files in a directory and fix the imports
const fixImports = (dir) => {
  const files = readdirSync(dir);

  files.forEach((file) => {
    const fullPath = join(dir, file);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      fixImports(fullPath); // Recurse into subdirectories
    } else if (file.endsWith('.js')) {
      let content = readFileSync(fullPath, 'utf-8');
      // Replace `.ts` with `.js` in import statements
      content = content.replace(/(from\s+['"].+?)\.ts(['"])/g, '$1.js$2');
      writeFileSync(fullPath, content, 'utf-8');
    }
  });
};

fixImports(join(__dirname, 'dist'));
console.log('Imports fixed successfully!');
