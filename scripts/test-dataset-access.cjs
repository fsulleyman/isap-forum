async function testSanityAccess() {
  const query = '*[_type == "speaker" && status != "Published"][0]';
  const url = `https://0ynfox1f.api.sanity.io/v2024-01-01/data/query/production?query=${encodeURIComponent(query)}`;
  
  console.log('--- DATASET-LEVEL ACCESS CONTROL CHECK ---');
  console.log('Sending direct unauthenticated request to Content Lake query API:');
  console.log('URL:', url);
  
  try {
    const response = await fetch(url);
    console.log('HTTP Status Code:', response.status);
    console.log('HTTP Status Text:', response.statusText);
    const body = await response.json();
    console.log('Response Body:', JSON.stringify(body, null, 2));
    
    if (response.status === 401 || response.status === 403) {
      console.log('RESULT: ACCESS BLOCKED (HTTP 401/403) - Dataset is private and secure.');
    } else if (response.ok && (body.result === null || (Array.isArray(body.result) && body.result.length === 0))) {
      console.log('RESULT: EMPTY RESULT RETURNED - No unpublished records leaked.');
    } else {
      console.log('RESULT: WARNING - Direct query returned data.');
    }
  } catch (err) {
    console.error('Request failed with network error:', err);
  }
}

testSanityAccess();
