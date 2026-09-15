const fs = require('fs');
const { createClient } = require('@sanity/client');

const envContent = fs.readFileSync('.env', 'utf8');
const tokenMatch = envContent.match(/SANITY_READ_TOKEN=(.+)/);
const token = tokenMatch ? tokenMatch[1].trim() : null;

const client = createClient({
  projectId: '0ynfox1f',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: token,
});

async function check() {
  console.log('=== CHECKING 4 USER CORRECTIONS ===\n');

  // 1. Stakeholders in Sanity
  const homeDoc = await client.getDocument('homePage');
  console.log('1. Stakeholders in homePage singleton:');
  console.log('Count:', homeDoc.stakeholders ? homeDoc.stakeholders.length : 0);
  console.log('List:', homeDoc.stakeholders ? homeDoc.stakeholders.map(s => s.name) : []);

  // 2. Client fallback behavior in production build
  console.log('\n2. Checking fallback logic in client.ts:');
  const clientTs = fs.readFileSync('src/lib/sanity/client.ts', 'utf8');
  const isDevCheck = clientTs.includes('import.meta.env.DEV') || clientTs.includes('process.env.NODE_ENV === "development"');
  console.log('client.ts has explicit dev-only check for fallbacks:', isDevCheck);

  // 3. /register page Sanity singleton binding
  console.log('\n3. Checking register.astro:');
  const registerAstro = fs.readFileSync('src/pages/register.astro', 'utf8');
  console.log('register.astro calls getRegisterPage():', registerAstro.includes('getRegisterPage()'));
  console.log('register.astro has hardcoded google form URL:', registerAstro.includes('https://forms.gle'));

  // 4. LinkedIn URL in siteSettings singleton
  console.log('\n4. Checking siteSettings singleton:');
  const siteSettings = await client.getDocument('siteSettings');
  console.log('LinkedIn URL in siteSettings:', siteSettings ? siteSettings.linkedinUrl : 'NOT FOUND');
}

check().catch(console.error);
