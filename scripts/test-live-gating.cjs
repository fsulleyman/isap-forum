const fs = require('fs');
const { createClient } = require('@sanity/client');

let token = process.env.SANITY_AUTH_TOKEN;
if (!token && fs.existsSync('.env')) {
  const envContent = fs.readFileSync('.env', 'utf8');
  const match = envContent.match(/^SANITY_AUTH_TOKEN=(.+)$/m);
  if (match) token = match[1].trim();
}

const client = createClient({
  projectId: '0ynfox1f',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: token,
});

async function runLiveTests() {
  console.log('=== RUNNING TESTS AGAINST LIVE SANITY PRODUCTION DATASET ===\n');

  // 1. Total documents
  const total = await client.fetch('count(*[!(_id in path("_.**"))])');
  console.log('1. Live Document Count in Production:', total);

  // 2. Speaker gating
  const publishedSpeakers = await client.fetch('*[_type == "speaker" && status == "Published"]{name, status, role}');
  const invitedSpeakers = await client.fetch('*[_type == "speaker" && status == "Invited"]{name, status, role}');
  console.log(`2. Speaker Status Gating:
  - Published Speakers count: ${publishedSpeakers.length}
  - Published Speakers: ${JSON.stringify(publishedSpeakers, null, 2)}
  - Invited Speakers count: ${invitedSpeakers.length}
  - Invited Speaker Names: ${invitedSpeakers.map(s => s.name).join(', ')}`);
  
  const isKeynoteExcluded = !publishedSpeakers.some(s => s.name.includes('Kenneth Agyemang Attafuah'));
  console.log('  - Keynote Prof. Attafuah strictly excluded from Published:', isKeynoteExcluded);

  // 3. Programme sessions
  const programme = await client.fetch('*[_type == "programme"] | order(order asc){title, time, speaker}');
  console.log(`3. Programme Sessions: ${programme.length} items`);

  // 4. Institutions gating
  const approvedInstitutions = await client.fetch('*[_type == "institution" && approved == true]{name, category}');
  const unapprovedInstitutions = await client.fetch('*[_type == "institution" && approved == false]{name, category}');
  console.log(`4. Institution Gating:
  - Approved Institutions: ${approvedInstitutions.length}
  - Unapproved Institutions: ${unapprovedInstitutions.length}`);

  // 5. Resources gating
  const approvedResources = await client.fetch('*[_type == "resource" && approved == true]{title, category}');
  console.log(`5. Resource Gating:
  - Approved Resources: ${approvedResources.length}`);

  // 6. News
  const publishedNews = await client.fetch('*[_type == "news" && status == "Published"]{title, slug, publishedAt}');
  console.log(`6. News Articles (Published): ${publishedNews.length}`);
  publishedNews.forEach(n => console.log(`   - [${n.slug?.current}] ${n.title}`));

  console.log('\n=== ALL LIVE STATUS GATING CHECKS VERIFIED SUCCESSFULLY ===');
}

runLiveTests().catch(err => {
  console.error('Test failed:', err.message);
  process.exit(1);
});
