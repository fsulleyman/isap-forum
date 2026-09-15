const fs = require('fs');

const partnersHtml = fs.readFileSync('dist/partners/index.html', 'utf8');
const resourcesHtml = fs.readFileSync('dist/resources/index.html', 'utf8');

// Check category section in partners
const sponsorsIndex = partnersHtml.indexOf('Official Forum Sponsors');
const enterpriseIndex = partnersHtml.indexOf('Unverified Commercial Enterprise');
console.log('Sponsors Section Index:', sponsorsIndex);
console.log('Enterprise Index:', enterpriseIndex);
console.log('Rendered under Sponsors Section:', enterpriseIndex > sponsorsIndex);

// Check category section in resources
const beforeEventIndex = resourcesHtml.indexOf('Before-Event Briefings & Reading Lists');
const afterEventIndex = resourcesHtml.indexOf('After-Event Communiqués & Papers');
const draftIndex = resourcesHtml.indexOf('Unreviewed Working Paper Draft');
console.log('Before Event Section Index:', beforeEventIndex);
console.log('After Event Section Index:', afterEventIndex);
console.log('Resource Draft Index:', draftIndex);
console.log('Rendered strictly inside Before-Event group:', draftIndex > beforeEventIndex && draftIndex < afterEventIndex);
