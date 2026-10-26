const fs = require('node:fs');
const esbuild = require('esbuild');
const source = fs.readFileSync('src/app.js', 'utf8') + '\n' + fs.readFileSync('src/improvements.jsx', 'utf8');
const output = esbuild.transformSync(source, { loader: 'jsx', minify: true, target: 'es2019' });
fs.writeFileSync('app.js', output.code);
