const fs = require('fs');
const path = require('path');

const outDir = path.resolve(__dirname, '../docs');
const indexPath = path.resolve(outDir, 'index.html');
const notFoundPath = path.resolve(outDir, '404.html');

if (!fs.existsSync(indexPath)) {
  console.error('Cannot create 404.html: index.html not found in docs directory.');
  process.exit(1);
}

const html = fs.readFileSync(indexPath, 'utf8');
fs.writeFileSync(notFoundPath, html, 'utf8');

console.log('Created docs/404.html from docs/index.html for GitHub Pages SPA fallback.');

