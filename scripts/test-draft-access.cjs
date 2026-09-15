async function testNewsDraftAccess() {
  const query = '*[_type == "news" && status == "Draft"][0]';
  const url = `https://0ynfox1f.api.sanity.io/v2024-01-01/data/query/production?query=${encodeURIComponent(query)}`;
  
  console.log('\n--- DRAFT NEWS ACCESS CHECK ---');
  console.log('URL:', url);
  try {
    const res = await fetch(url);
    console.log('HTTP Status:', res.status, res.statusText);
    const json = await res.json();
    console.log('Response Body:', JSON.stringify(json, null, 2));
  } catch (err) {
    console.error(err);
  }
}

testNewsDraftAccess();
