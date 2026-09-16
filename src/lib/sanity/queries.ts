export const EVENT_QUERY = `*[_type == "event"][0]`;

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0] {
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

export const HOME_PAGE_QUERY = `*[_type == "homePage"][0] {
  ...,
  heroImage {
    ...,
    asset-> {
      _id,
      url
    }
  },
  "heroImageUrl": heroImage.asset->url
}`;

export const ABOUT_PAGE_QUERY = `*[_type == "aboutPage"][0] {
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

export const FORUM_2026_PAGE_QUERY = `*[_type == "forum2026Page"][0] {
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

export const CONTACT_PAGE_QUERY = `*[_type == "contactPage"][0] {
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

export const REGISTER_PAGE_QUERY = `*[_type == "registerPage"][0] {
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

// Status-gated collection queries (Strictly enforced at the query layer)
export const SPEAKERS_QUERY = `*[_type == "speaker" && status == "Published"] | order(name asc) {
  _id,
  _type,
  name,
  title,
  organisation,
  role,
  bio,
  photo {
    ...,
    asset-> {
      _id,
      url,
      metadata {
        dimensions
      }
    }
  },
  "photoUrl": photo.asset->url,
  linkedin,
  status
}`;

export const PROGRAMME_QUERY = `*[_type == "programme" && (status == "Confirmed" || status == "TBA")] | order(time asc) {
  _id,
  _type,
  time,
  session,
  topic,
  speaker->{
    _id,
    name,
    title,
    organisation,
    role,
    photo {
      ...,
      asset-> {
        _id,
        url
      }
    },
    "photoUrl": photo.asset->url,
    status
  },
  organisation,
  moderator,
  status
}`;

export const INSTITUTIONS_QUERY = `*[_type == "institution" && approved == true] | order(name asc) {
  _id,
  _type,
  name,
  logo {
    ...,
    asset-> {
      _id,
      url
    }
  },
  "logoUrl": logo.asset->url,
  category,
  description,
  website,
  approved
}`;

export const NEWS_QUERY = `*[_type == "news" && status == "Published"] | order(publicationDate desc) {
  _id,
  _type,
  title,
  slug,
  featuredImage {
    ...,
    asset-> {
      _id,
      url
    }
  },
  "imageUrl": featuredImage.asset->url,
  publicationDate,
  summary,
  author,
  status
}`;

export const NEWS_BY_SLUG_QUERY = `*[_type == "news" && slug.current == $slug && status == "Published"][0] {
  _id,
  _type,
  title,
  slug,
  featuredImage {
    ...,
    asset-> {
      _id,
      url
    }
  },
  "imageUrl": featuredImage.asset->url,
  publicationDate,
  summary,
  body,
  author,
  status
}`;

export const RESOURCES_QUERY = `*[_type == "resource" && approved == true] | order(date desc) {
  _id,
  _type,
  title,
  category,
  description,
  fileOrUrl,
  date,
  approved
}`;
