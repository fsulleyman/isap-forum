const https = require('https');

function checkHttps(hostname) {
  return new Promise((resolve, reject) => {
    const req = https.get(`https://${hostname}/`, (res) => {
      const cert = res.socket.getPeerCertificate();
      console.log(`=== HTTPS CERTIFICATE CHECK FOR ${hostname} ===`);
      console.log('HTTP Status:', res.statusCode);
      console.log('Subject CN:', cert.subject ? cert.subject.CN : 'None');
      console.log('Issuer O:', cert.issuer ? cert.issuer.O : 'None');
      console.log('Valid From:', cert.valid_from);
      console.log('Valid To:', cert.valid_to);
      console.log('Is Authorized:', res.socket.authorized);
      resolve({ authorized: res.socket.authorized, status: res.statusCode });
    });

    req.on('error', (e) => {
      console.error(`HTTPS check failed for ${hostname}:`, e.message);
      reject(e);
    });
  });
}

async function run() {
  await checkHttps('charming-baklava-531a1b.netlify.app');
  await checkHttps('delicate-moxie-f86421.netlify.app');
}

run();
