const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getHtmlFiles(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = getHtmlFiles('dist');
console.log(`Auditing alt attributes across ${files.length} built HTML files...`);

let totalImages = 0;
let missingAlt = 0;

files.forEach((f) => {
  const html = fs.readFileSync(f, 'utf8');
  const imgTags = html.match(/<img[^>]*>/g) || [];
  imgTags.forEach((tag) => {
    totalImages++;
    // Must have alt="..." or alt=''
    const hasAlt = /alt=(["']).*?\1/i.test(tag);
    if (!hasAlt) {
      console.error(`[FAIL] Image missing alt attribute in ${f}: ${tag}`);
      missingAlt++;
    }
  });
});

console.log(`Total images checked: ${totalImages}`);
console.log(`Images with missing alt: ${missingAlt}`);
if (missingAlt === 0) {
  console.log('[PASS] All images have valid alt attributes, including the official QR code and logo.');
}
