import imageUrlBuilder from '@sanity/image-url';
import { sanityClient } from './client';

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  if (!source) return null;
  try {
    // If source has an expanded asset object with _id or url
    if (source.asset?._id) {
      return builder.image(source.asset._id);
    }
    if (source.asset?.url) {
      return builder.image(source.asset.url);
    }
    return builder.image(source);
  } catch {
    return null;
  }
}
