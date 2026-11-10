const fs = require('node:fs');
const esbuild = require('esbuild');
const source = ['src/planner-model.js', 'src/app.js', 'src/improvements.jsx', 'src/planner-features.jsx'].map(file => fs.readFileSync(file, 'utf8')).join('\n');
const output = esbuild.transformSync(source, { loader: 'jsx', minify: true, target: 'es2019' });
fs.writeFileSync('app.js', output.code);
