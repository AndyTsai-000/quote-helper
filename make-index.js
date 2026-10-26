// 把 Excel插入圖片.html（Claude artifact 用的，沒有 html/head/body）包成 GitHub Pages 用的 index.html
// 用法：node make-index.js
const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'Excel插入圖片.html'), 'utf8');
const cut = src.indexOf('<div class="wrap"');
if (cut < 0) throw new Error('找不到 <div class="wrap">');
const head = src.slice(0, cut).trim();
const body = src.slice(cut).trim();

const out = `<!doctype html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<style>:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0;font-size:14px;font-family:system-ui,sans-serif}img{max-width:100%}[hidden]{display:none!important}</style>
${head}
</head>
<body>
${body}
</body>
</html>
`;
fs.writeFileSync(path.join(__dirname, 'index.html'), out);
console.log('index.html 已更新');
