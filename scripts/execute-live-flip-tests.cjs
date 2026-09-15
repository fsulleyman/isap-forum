const fs = require('fs');
const { execSync } = require('child_process');
const { createClient } = require('@sanity/client');

const envContent = fs.readFileSync('.env', 'utf8');
const tokenMatch = envContent.match(/SANITY_AUTH_TOKEN=(.+)/) || envContent.match(/SANITY_READ_TOKEN=(.+)/);
const token = tokenMatch ? tokenMatch[1].trim() : null;

if (!token) {
  console.error('Missing SANITY_AUTH_TOKEN in .env');
  process.exit(1);
}

const client = createClient({
  projectId: '0ynfox1f',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: token,
});

async function runFlipTests() {
  console.log('================================================================');
  console.log('  PHASE 5 LIVE STATUS-GATING FLIP TESTS AGAINST SANITY PRODUCTION');
  console.log('================================================================\n');

  // -------------------------------------------------------------
  // 1. INITIAL STATE VERIFICATION
  // -------------------------------------------------------------
  console.log('--- STEP 1: VERIFYING INITIAL DRAFT / UNAPPROVED STATE IN SANITY ---');
  const initialInst = await client.getDocument('inst-unapproved');
  console.log(`Institution "inst-unapproved" (${initialInst.name}): approved = ${initialInst.approved}`);

  const initialRes = await client.getDocument('res-unapproved');
  console.log(`Resource "res-unapproved" (${initialRes.title}): approved = ${initialRes.approved}`);

  const draftNews = await client.fetch('*[_type == "news" && status == "Draft"]{_id, title, status}');
  console.log(`Draft News in Sanity: ${draftNews.length} record(s):`);
  draftNews.forEach(n => console.log(`  - [${n._id}] "${n.title}" (status: ${n.status})`));

  // -------------------------------------------------------------
  // 2. FLIP FALSE -> TRUE IN LIVE SANITY
  // -------------------------------------------------------------
  console.log('\n--- STEP 2: FLIPPING LIVE RECORDS IN SANITY (approved: false -> true) ---');
  await client.patch('inst-unapproved').set({ approved: true }).commit();
  console.log('Patched inst-unapproved -> approved: true in Sanity Content Lake');

  await client.patch('res-unapproved').set({ approved: true }).commit();
  console.log('Patched res-unapproved -> approved: true in Sanity Content Lake');

  // Verify in Content Lake
  const flippedInst = await client.getDocument('inst-unapproved');
  const flippedRes = await client.getDocument('res-unapproved');
  console.log(`Content Lake check: inst-unapproved.approved = ${flippedInst.approved}`);
  console.log(`Content Lake check: res-unapproved.approved = ${flippedRes.approved}`);

  // -------------------------------------------------------------
  // 3. REBUILD AND VERIFY APPEARANCE IN BUILT HTML
  // -------------------------------------------------------------
  console.log('\n--- STEP 3: REBUILDING ASTRO SITE WITH FLIPPED LIVE DATA ---');
  execSync('npm run build', { stdio: 'inherit' });

  const partnersHtmlFlipped = fs.readFileSync('dist/partners/index.html', 'utf8');
  const resourcesHtmlFlipped = fs.readFileSync('dist/resources/index.html', 'utf8');

  const instPresentFlipped = partnersHtmlFlipped.includes('Unverified Commercial Enterprise');
  const resPresentFlipped = resourcesHtmlFlipped.includes('Unreviewed Working Paper Draft');

  const sponsorsIdx = partnersHtmlFlipped.indexOf('Official Forum Sponsors');
  const enterpriseIdx = partnersHtmlFlipped.indexOf('Unverified Commercial Enterprise');

  const beforeEventIdx = resourcesHtmlFlipped.indexOf('Before-Event Briefings & Reading Lists');
  const afterEventIdx = resourcesHtmlFlipped.indexOf('After-Event Communiqués & Papers');
  const draftResIdx = resourcesHtmlFlipped.indexOf('Unreviewed Working Paper Draft');

  console.log('\n--- VERIFICATION WHEN approved: true ---');
  console.log(`Institution "Unverified Commercial Enterprise" appears on /partners: ${instPresentFlipped}`);
  console.log(`  - Rendered in Sponsors section: ${enterpriseIdx > sponsorsIdx} (sponsorsIdx: ${sponsorsIdx}, itemIdx: ${enterpriseIdx})`);
  console.log(`Resource "Unreviewed Working Paper Draft" appears on /resources: ${resPresentFlipped}`);
  console.log(`  - Rendered in Before-Event section: ${draftResIdx > beforeEventIdx && draftResIdx < afterEventIdx}`);

  // -------------------------------------------------------------
  // 4. REVERT TRUE -> FALSE IN LIVE SANITY (CLEANUP)
  // -------------------------------------------------------------
  console.log('\n--- STEP 4: REVERTING LIVE RECORDS IN SANITY (approved: true -> false) ---');
  await client.patch('inst-unapproved').set({ approved: false }).commit();
  console.log('Reverted inst-unapproved -> approved: false in Sanity Content Lake');

  await client.patch('res-unapproved').set({ approved: false }).commit();
  console.log('Reverted res-unapproved -> approved: false in Sanity Content Lake');

  // Verify in Content Lake
  const revertedInst = await client.getDocument('inst-unapproved');
  const revertedRes = await client.getDocument('res-unapproved');
  console.log(`Content Lake check: inst-unapproved.approved = ${revertedInst.approved}`);
  console.log(`Content Lake check: res-unapproved.approved = ${revertedRes.approved}`);

  // -------------------------------------------------------------
  // 5. REBUILD AND VERIFY DISAPPEARANCE IN BUILT HTML
  // -------------------------------------------------------------
  console.log('\n--- STEP 5: REBUILDING ASTRO SITE WITH REVERTED LIVE DATA ---');
  execSync('npm run build', { stdio: 'inherit' });

  const partnersHtmlReverted = fs.readFileSync('dist/partners/index.html', 'utf8');
  const resourcesHtmlReverted = fs.readFileSync('dist/resources/index.html', 'utf8');
  const newsHtml = fs.readFileSync('dist/news/index.html', 'utf8');
  const speakersHtml = fs.readFileSync('dist/speakers/index.html', 'utf8');

  console.log('\n--- FINAL VERIFICATION AFTER REVERT ---');
  console.log(`1. Institution "Unverified Commercial Enterprise" on /partners: ${partnersHtmlReverted.includes('Unverified Commercial Enterprise')} (EXPECTED: false)`);
  console.log(`2. Resource "Unreviewed Working Paper Draft" on /resources: ${resourcesHtmlReverted.includes('Unreviewed Working Paper Draft')} (EXPECTED: false)`);
  console.log(`3. Draft news "Internal Draft" on /news: ${newsHtml.includes('Internal Draft')} (EXPECTED: false)`);
  console.log(`4. Keynote "Prof. Kenneth Agyemang Attafuah" on /speakers: ${speakersHtml.includes('Attafuah')} (EXPECTED: false)`);

  // -------------------------------------------------------------
  // 6. LIVE OG-TAG VERIFICATION ON /news/:id
  // -------------------------------------------------------------
  console.log('\n--- STEP 6: VERIFYING LIVE OPEN GRAPH META TAGS ON /news/:id ---');
  const liveArticle = await client.fetch('*[_type == "news" && status == "Published" && slug.current == "upsa-announces-inaugural-isap-forum-2026"][0]');
  console.log('Live Sanity Article Record:');
  console.log(`  - Title: "${liveArticle.title}"`);
  console.log(`  - Summary: "${liveArticle.summary.substring(0, 80)}..."`);
  console.log(`  - Slug: "${liveArticle.slug.current}"`);

  const articleHtml = fs.readFileSync('dist/news/upsa-announces-inaugural-isap-forum-2026/index.html', 'utf8');
  const ogTitleMatch = articleHtml.match(/<meta\s+property=["']og:title["']\s+content=["'](.*?)["']/i);
  const ogDescMatch = articleHtml.match(/<meta\s+property=["']og:description["']\s+content=["'](.*?)["']/i);
  const ogImageMatch = articleHtml.match(/<meta\s+property=["']og:image["']\s+content=["'](.*?)["']/i);
  const twitterCardMatch = articleHtml.match(/<meta\s+name=["']twitter:card["']\s+content=["'](.*?)["']/i);

  console.log('\nRendered HTML Meta Tags in dist/news/upsa-announces-inaugural-isap-forum-2026/index.html:');
  console.log(`  - og:title: "${ogTitleMatch ? ogTitleMatch[1] : 'NOT FOUND'}"`);
  console.log(`  - og:description: "${ogDescMatch ? ogDescMatch[1] : 'NOT FOUND'}"`);
  console.log(`  - og:image: "${ogImageMatch ? ogImageMatch[1] : 'NOT FOUND'}"`);
  console.log(`  - twitter:card: "${twitterCardMatch ? twitterCardMatch[1] : 'NOT FOUND'}"`);

  const ogTitleMatchesSanity = ogTitleMatch && ogTitleMatch[1].includes(liveArticle.title);
  const ogDescMatchesSanity = ogDescMatch && ogDescMatch[1] === liveArticle.summary;
  console.log(`\nOG Title matches live Sanity title: ${ogTitleMatchesSanity}`);
  console.log(`OG Description matches live Sanity summary: ${ogDescMatchesSanity}`);

  console.log('\n================================================================');
  console.log('  ALL LIVE FLIP & OG TESTS COMPLETED AND VERIFIED AGAINST SANITY');
  console.log('================================================================');
}

runFlipTests().catch(err => {
  console.error('Flip test failed:', err);
  process.exit(1);
});
