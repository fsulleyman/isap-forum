async function submitWithNetlifyPassword() {
  const baseUrl = 'https://jolly-phoenix-aa9b24.netlify.app';
  
  console.log('--- AUTHENTICATING PAST NETLIFY DROP PASSWORD GATE ---');
  // 1. Post password to authenticate
  const authRes = await fetch(baseUrl + '/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ password: 'My-Drop-Site' }).toString(),
    redirect: 'manual',
  });

  console.log('Auth Status:', authRes.status, authRes.statusText);
  const cookie = authRes.headers.get('set-cookie');
  console.log('Session Cookie received:', cookie ? 'YES' : 'NO');

  // 2. Submit the form with cookie
  const formPayload = new URLSearchParams({
    'form-name': 'contact',
    'bot-field': '',
    'name': 'Dr. Kwabena Asante',
    'organisation': 'University of Ghana, Computing Dept',
    'email': 'k.asante@ug.edu.gh',
    'subject': 'Research Collaboration',
    'message': 'Official inquiry regarding ISAP Forum 2026 academic paper submission and delegate accreditation.',
  });

  console.log('\n--- SUBMITTING CONTACT FORM TO NETLIFY (/contact) ---');
  const submitRes = await fetch(baseUrl + '/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      ...(cookie ? { Cookie: cookie } : {}),
    },
    body: formPayload.toString(),
  });

  console.log('Form Submit Status:', submitRes.status, submitRes.statusText);
  const text = await submitRes.text();
  console.log('Response Title/Header:', text.match(/<title>(.*?)<\/title>/)?.[1] || text.substring(0, 100));

  if (submitRes.ok) {
    console.log('RESULT: FORM SUBMISSION CONFIRMED RECEIVED BY NETLIFY.');
  }
}

submitWithNetlifyPassword();
