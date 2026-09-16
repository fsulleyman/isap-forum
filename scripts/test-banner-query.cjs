const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '0ynfox1f',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skHgoY6iBc7KJU4312VSEHQXCsnNYUOb06Sn8yNCWVudKctjBJ9KpMUawRTJtANipeUabJETCxlejbZmV',
  useCdn: false
});

const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0] {
  ...,
  bannerImage {
    ...,
    asset-> {
      _id,
      url
    }
  },
  "bannerImageUrl": bannerImage.asset->url,
  programmeBannerImage {
    ...,
    asset-> {
      _id,
      url
    }
  },
  "programmeBannerImageUrl": programmeBannerImage.asset->url,
  speakersBannerImage {
    ...,
    asset-> {
      _id,
      url
    }
  },
  "speakersBannerImageUrl": speakersBannerImage.asset->url,
  partnersBannerImage {
    ...,
    asset-> {
      _id,
      url
    }
  },
  "partnersBannerImageUrl": partnersBannerImage.asset->url,
  newsBannerImage {
    ...,
    asset-> {
      _id,
      url
    }
  },
  "newsBannerImageUrl": newsBannerImage.asset->url,
  resourcesBannerImage {
    ...,
    asset-> {
      _id,
      url
    }
  },
  "resourcesBannerImageUrl": resourcesBannerImage.asset->url
}`;

const ABOUT_PAGE_QUERY = `*[_type == "aboutPage"][0] {
  ...,
  bannerImage {
    ...,
    asset-> {
      _id,
      url
    }
  },
  "bannerImageUrl": bannerImage.asset->url
}`;

async function test() {
  const settings = await client.fetch(SITE_SETTINGS_QUERY);
  console.log('SITE_SETTINGS:', {
    _id: settings?._id,
    bannerImage: settings?.bannerImage,
    resourcesBannerImage: settings?.resourcesBannerImage,
    resourcesBannerImageUrl: settings?.resourcesBannerImageUrl
  });

  const about = await client.fetch(ABOUT_PAGE_QUERY);
  console.log('ABOUT_PAGE:', {
    _id: about?._id,
    bannerImage: about?.bannerImage,
    bannerImageUrl: about?.bannerImageUrl
  });
}

test().catch(console.error);
