const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '0ynfox1f',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skHgoY6iBc7KJU4312VSEHQXCsnNYUOb06Sn8yNCWVudKctjBJ9KpMUawRTJtANipeUabJETCxlejbZmV',
  useCdn: false
});

const assetId = 'image-fc677e7d399fe2cebd8887bbe2464f08e9e617b3-780x363-png';

const bannerImageObject = {
  _type: 'image',
  asset: {
    _ref: assetId,
    _type: 'reference'
  }
};

async function run() {
  console.log('Querying existing singleton documents...');
  const docs = await client.fetch(`*[_type in ["siteSettings", "aboutPage", "forum2026Page", "contactPage", "registerPage", "event"]]{ _id, _type }`);
  console.log('Found docs:', docs);

  // Patch each page singleton with bannerImage
  for (const doc of docs) {
    if (['aboutPage', 'forum2026Page', 'contactPage', 'registerPage'].includes(doc._type)) {
      console.log(`Patching ${doc._id} (${doc._type}) with bannerImage...`);
      await client.patch(doc._id).set({ bannerImage: bannerImageObject }).commit();
      console.log(`✓ Patched ${doc._id}`);
    } else if (doc._type === 'siteSettings') {
      console.log(`Patching ${doc._id} (siteSettings) with banners...`);
      await client.patch(doc._id).set({
        bannerImage: bannerImageObject,
        programmeBannerImage: bannerImageObject,
        speakersBannerImage: bannerImageObject,
        partnersBannerImage: bannerImageObject,
        newsBannerImage: bannerImageObject,
        resourcesBannerImage: bannerImageObject,
      }).commit();
      console.log(`✓ Patched ${doc._id} with all 6 banner image fields`);
    }
  }

  console.log('All singletons patched successfully with the official UPSA PCU Auditorium banner image asset!');
}

run().catch(console.error);
