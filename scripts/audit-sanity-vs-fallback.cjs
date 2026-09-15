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

async function main() {
  console.log('--- LIVE SANITY DATABASE AUDIT ---');
  const typeCounts = await client.fetch(`{
    "event": count(*[_type == "event"]),
    "siteSettings": count(*[_type == "siteSettings"]),
    "homePage": count(*[_type == "homePage"]),
    "aboutPage": count(*[_type == "aboutPage"]),
    "forum2026Page": count(*[_type == "forum2026Page"]),
    "contactPage": count(*[_type == "contactPage"]),
    "registerPage": count(*[_type == "registerPage"]),
    "speaker": count(*[_type == "speaker"]),
    "programme": count(*[_type == "programme"]),
    "institution": count(*[_type == "institution"]),
    "news": count(*[_type == "news"]),
    "resource": count(*[_type == "resource"])
  }`);
  console.log('Live Sanity document counts by type:');
  console.log(JSON.stringify(typeCounts, null, 2));

  const total = await client.fetch('count(*[!(_id in path("_.**"))])');
  console.log('Total live documents in dataset "production":', total);

  // Fetch all collections in detail
  const liveInstitutions = await client.fetch('*[_type == "institution"]{_id, name, category, approved}');
  console.log('\nLive Institutions:', liveInstitutions);

  const liveNews = await client.fetch('*[_type == "news"]{_id, title, status, "slug": slug.current}');
  console.log('\nLive News Articles:', liveNews);

  const liveResources = await client.fetch('*[_type == "resource"]{_id, title, category, approved}');
  console.log('\nLive Resources:', liveResources);

  const liveSpeakers = await client.fetch('*[_type == "speaker"]{_id, name, status}');
  console.log('\nLive Speakers:', liveSpeakers);

  const liveProgramme = await client.fetch('*[_type == "programme"]{_id, time, session, status}');
  console.log('\nLive Programme count:', liveProgramme.length);
}

main().catch(console.error);
