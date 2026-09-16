const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

const client = createClient({
  projectId: '0ynfox1f',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skHgoY6iBc7KJU4312VSEHQXCsnNYUOb06Sn8yNCWVudKctjBJ9KpMUawRTJtANipeUabJETCxlejbZmV',
  useCdn: false
});

async function audit() {
  const query = `{
    "speakers": *[_type == "speaker"] | order(name asc),
    "programme": *[_type == "programme"] | order(time asc) {
      ...,
      speaker-> {
        _id,
        name,
        title,
        organisation,
        role,
        status
      }
    },
    "institutions": *[_type == "institution"] | order(name asc),
    "news": *[_type == "news"] | order(publicationDate desc),
    "resources": *[_type == "resource"] | order(date desc)
  }`;

  const data = await client.fetch(query);
  fs.writeFileSync(
    path.join(__dirname, 'audit-results.json'),
    JSON.stringify(data, null, 2),
    'utf-8'
  );
  console.log('Audit completed successfully.');
  console.log(`Speakers count: ${data.speakers.length}`);
  console.log(`Programme count: ${data.programme.length}`);
  console.log(`Institutions count: ${data.institutions.length}`);
  console.log(`News count: ${data.news.length}`);
  console.log(`Resources count: ${data.resources.length}`);
}

audit().catch(console.error);
