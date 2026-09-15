const fs = require('fs');
const path = require('path');
const { createClient } = require('@sanity/client');

// Read token from environment variable or .env file
let token = process.env.SANITY_AUTH_TOKEN;
if (!token && fs.existsSync('.env')) {
  const envContent = fs.readFileSync('.env', 'utf8');
  const match = envContent.match(/^SANITY_AUTH_TOKEN=(.+)$/m);
  if (match) token = match[1].trim();
}

if (!token) {
  console.error('ERROR: SANITY_AUTH_TOKEN is not set.');
  console.error('Please set SANITY_AUTH_TOKEN in environment or .env file to proceed.');
  process.exit(1);
}

const client = createClient({
  projectId: '0ynfox1f',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: token,
});

async function importSeed() {
  const seedFile = path.join(__dirname, 'studio', 'seed.ndjson');
  console.log('Reading seed file from:', seedFile);
  const content = fs.readFileSync(seedFile, 'utf8').trim();
  const docs = content.split('\n').map(l => JSON.parse(l));
  console.log(`Loaded ${docs.length} documents from seed file.`);

  console.log('Importing documents to Sanity project 0ynfox1f, dataset production...');
  const tx = client.transaction();
  for (const doc of docs) {
    tx.createOrReplace(doc);
  }
  const result = await tx.commit();
  console.log('Transaction committed successfully! ID:', result.transactionId);

  console.log('\n--- VERIFYING DOCUMENT COUNT IN PRODUCTION DATASET ---');
  const totalCount = await client.fetch('count(*[!(_id in path("_.**"))])');
  console.log('Total document count in dataset "production":', totalCount);

  const typeCounts = await client.fetch(`{
    "event": count(*[_type == "event"]),
    "siteSettings": count(*[_type == "siteSettings"]),
    "homePage": count(*[_type == "homePage"]),
    "aboutPage": count(*[_type == "aboutPage"]),
    "forum2026Page": count(*[_type == "forum2026Page"]),
    "contactPage": count(*[_type == "contactPage"]),
    "registerPage": count(*[_type == "registerPage"]),
    "speakers": count(*[_type == "speaker"]),
    "programme": count(*[_type == "programme"]),
    "institutions": count(*[_type == "institution"]),
    "news": count(*[_type == "news"]),
    "resources": count(*[_type == "resource"])
  }`);
  console.log('Document breakdown by type:', JSON.stringify(typeCounts, null, 2));
}

importSeed().catch(err => {
  console.error('Import failed:', err.message);
  process.exit(1);
});
