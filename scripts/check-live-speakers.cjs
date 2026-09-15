const fs = require('fs');
const { createClient } = require('@sanity/client');

const envContent = fs.readFileSync('.env', 'utf8');
const tokenMatch = envContent.match(/SANITY_READ_TOKEN=(.+)/) || envContent.match(/SANITY_AUTH_TOKEN=(.+)/);
const token = tokenMatch ? tokenMatch[1].trim() : null;

const client = createClient({
  projectId: '0ynfox1f',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: token,
});

async function run() {
  console.log('Querying live Sanity Content Lake for speakers with useCdn: false...');
  const allSpeakers = await client.fetch('*[_type == "speaker"]{_id, name, status, role}');
  console.log('Total speaker documents in Sanity:', allSpeakers.length);
  console.log('Speaker documents:', allSpeakers);

  const publishedSpeakers = await client.fetch('*[_type == "speaker" && status == "Published"]{_id, name, status, role}');
  console.log('Published speakers:', publishedSpeakers.length);
  console.log('Published list:', publishedSpeakers);
}

run().catch(console.error);
