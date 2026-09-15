const fs = require('fs');

function checkPages() {
  const partnersHtml = fs.readFileSync('dist/partners/index.html', 'utf8');
  const resourcesHtml = fs.readFileSync('dist/resources/index.html', 'utf8');

  console.log('--- AUDITING LIVE RENDERED PAGES ---');
  console.log('Partners Page contains "Unverified Commercial Enterprise":', partnersHtml.includes('Unverified Commercial Enterprise'));
  console.log('Resources Page contains "Unreviewed Working Paper Draft":', resourcesHtml.includes('Unreviewed Working Paper Draft'));
}

checkPages();
