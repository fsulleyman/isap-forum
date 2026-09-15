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

async function apply() {
  console.log('--- APPLYING THE 4 CRITICAL CORRECTIONS ---\n');

  // 1. Update Stakeholders in homePage to the 8 official categories
  const eightStakeholders = [
    { _key: 'stk-1', name: 'Government', description: 'Ministries and central government bodies driving national digital strategy.' },
    { _key: 'stk-2', name: 'Regulators', description: 'Statutory regulatory authorities governing telecommunications, data protection, and financial technology.' },
    { _key: 'stk-3', name: 'Academia', description: 'Universities, research centers, and faculty advancing Information Systems scholarship.' },
    { _key: 'stk-4', name: 'Industry', description: 'Commercial enterprises, financial institutions, and multinational technology leaders.' },
    { _key: 'stk-5', name: 'Technology organisations', description: 'Software developers, cloud providers, biometric security providers, and IT associations.' },
    { _key: 'stk-6', name: 'Researchers and Students', description: 'Early-career researchers, postgraduate scholars, and student innovator networks.' },
    { _key: 'stk-7', name: 'Development organisations', description: 'International development partners, bilateral agencies, and multilateral institutions supporting African digital infrastructure.' },
    { _key: 'stk-8', name: 'Civil Society', description: 'Digital rights advocacy groups, privacy advocates, and citizen public-interest organizations.' },
  ];

  console.log('1. Patching homePage in Sanity with 8 official stakeholder categories...');
  await client.patch('homePage').set({ stakeholders: eightStakeholders }).commit();
  console.log('  -> Done! 8 stakeholder categories saved to Sanity.');

  // 4. Patch siteSettings LinkedIn URL to org page
  const orgLinkedIn = 'https://www.linkedin.com/company/isap-forum';
  console.log('4. Patching siteSettings in Sanity with org LinkedIn URL:', orgLinkedIn);
  await client.patch('siteSettings').set({ linkedinUrl: orgLinkedIn }).commit();
  console.log('  -> Done! Org LinkedIn URL saved to Sanity.');
}

apply().catch(console.error);
