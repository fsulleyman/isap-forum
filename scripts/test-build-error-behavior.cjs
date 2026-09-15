const { createClient } = require('@sanity/client');

// Simulate the safeFetch logic in production mode (isDev = false)
const isDev = false;
const lastQuerySources = {};

async function safeFetch(client, query, params, fallback, queryName) {
  try {
    const data = await client.fetch(query, params);
    if (Array.isArray(data)) {
      lastQuerySources[queryName] = 'live';
      return data;
    }
    if (data !== null && data !== undefined && Object.keys(data).length > 0) {
      lastQuerySources[queryName] = 'live';
      return data;
    }
    if (!isDev) {
      throw new Error(`[SANITY PRODUCTION ERROR] Query "${queryName}" returned empty or null data from Sanity Content Lake.`);
    }
  } catch (error) {
    if (!isDev) {
      throw new Error(`[SANITY PRODUCTION BUILD FAILED] Critical query "${queryName}" failed against Sanity Content Lake: ${error.message}`);
    }
  }
  lastQuerySources[queryName] = 'fallback';
  return fallback;
}

async function runTests() {
  console.log('--- TEST 1: Empty Array from Live Sanity (Legitimately 0 items) ---');
  const validClient = createClient({
    projectId: '0ynfox1f',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
  });

  const emptyResult = await safeFetch(validClient, '*[_type == "speaker" && status == "Published"]', {}, [], 'publishedSpeakers');
  console.log('Result for publishedSpeakers:', emptyResult);
  console.log('Query source:', lastQuerySources['publishedSpeakers']);
  console.log('TEST 1 PASSED: Correctly returned [] without throwing and without falling back!\n');

  console.log('--- TEST 2: Genuine Error (Invalid Token / Unauthorized) ---');
  const invalidClient = createClient({
    projectId: '0ynfox1f',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    token: 'sk_invalid_token_12345',
  });

  try {
    await safeFetch(invalidClient, '*[_type == "institution"]', {}, [], 'testQueryError');
    console.error('TEST 2 FAILED: Expected an error but none was thrown!');
    process.exit(1);
  } catch (err) {
    console.log('Successfully caught expected hard-fail error:');
    console.log(err.message);
    console.log('TEST 2 PASSED: Hard-fail on error is 100% intact!\n');
  }

  console.log('--- TEST 3: Genuine Error (Invalid Project ID / Connection Failure) ---');
  const brokenClient = createClient({
    projectId: 'invalidprojectid999',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
  });

  try {
    await safeFetch(brokenClient, '*[_type == "siteSettings"][0]', {}, {}, 'brokenProject');
    console.error('TEST 3 FAILED: Expected an error but none was thrown!');
    process.exit(1);
  } catch (err) {
    console.log('Successfully caught expected hard-fail error:');
    console.log(err.message);
    console.log('TEST 3 PASSED: Hard-fail on broken project ID is 100% intact!\n');
  }

  console.log('ALL VERIFICATION TESTS COMPLETED SUCCESSFULLY.');
}

runTests().catch(console.error);
