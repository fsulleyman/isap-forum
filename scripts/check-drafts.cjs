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
    "allDrafts": *[_id in path("drafts.**")] {
      _id,
      _type,
      name,
      title,
      status,
      approved
    },
    "allCollections": *[_type in ["speaker", "programme", "institution", "news", "resource"]] {
      _id,
      _type,
      name,
      title,
      status,
      approved
    }
  }`;

  const data = await client.fetch(query);
  console.log('Total drafts:', data.allDrafts.length);
  console.log('Drafts:', JSON.stringify(data.allDrafts, null, 2));
  console.log('All collection docs count:', data.allCollections.length);
}

audit().catch(console.error);
