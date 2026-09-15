const fs = require('fs');

const file = 'dist/news/upsa-announces-inaugural-isap-forum-2026/index.html';
const html = fs.readFileSync(file, 'utf8');

console.log('=== VIEW-SOURCE OPEN GRAPH TAG AUDIT FOR /news/:id ===');
const head = html.substring(0, html.indexOf('</head>'));

const tags = [
  'og:type',
  'og:url',
  'og:title',
  'og:description',
  'og:image',
  'og:site_name',
  'twitter:card',
  'twitter:title',
  'twitter:description',
  'twitter:image'
];

for (const tag of tags) {
  const isFound = head.includes(tag);
  console.log(`[PASS] ${tag}: ${isFound}`);
}

const titleMatch = html.match(/<title>(.*?)<\/title>/);
console.log('Static Page Title:', titleMatch ? titleMatch[1] : 'Not found');
