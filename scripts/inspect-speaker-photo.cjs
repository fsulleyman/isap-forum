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

async function inspect() {
  console.log('=== ALL SPEAKER DOCUMENTS IN SANITY (INCLUDING DRAFTS) ===');
  // Use perspective: 'raw' or query with _id in path("drafts.**")
  const allSpeakerDocs = await client.fetch(`*[_type == "speaker"]{
    _id,
    _createdAt,
    _updatedAt,
    name,
    status,
    role,
    photo,
    "photoAssetExpanded": photo.asset->,
    "hasAssetRef": defined(photo.asset._ref)
  }`);

  console.log(JSON.stringify(allSpeakerDocs, null, 2));

  console.log('\n=== DRAFT SPEAKER DOCUMENTS ===');
  const drafts = await client.fetch(`*[_type == "speaker" && _id in path("drafts.**")]{
    _id,
    _createdAt,
    _updatedAt,
    name,
    status,
    photo
  }`);
  console.log(JSON.stringify(drafts, null, 2));

  console.log('\n=== PUBLISHED SPEAKER DOCUMENTS ===');
  const published = await client.fetch(`*[_type == "speaker" && !(_id in path("drafts.**"))]{
    _id,
    _createdAt,
    _updatedAt,
    name,
    status,
    photo,
    "photoUrl": photo.asset->url
  }`);
  console.log(JSON.stringify(published, null, 2));
}

inspect().catch(console.error);
