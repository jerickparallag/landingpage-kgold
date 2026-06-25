import { IMAGES, type TImageKey } from '../assets/images';
import type { IInternshipListing, IInternshipListingRaw, IJobListing, IJobListingRaw } from './types';

function isImageKey(value: string): value is TImageKey {
  return value in IMAGES;
}

export function resolveImageKey(key: string): string {
  if (!isImageKey(key)) {
    throw new Error(`Unknown imageKey "${key}". Add the asset in src/assets/images.ts.`);
  }
  return IMAGES[key];
}

/** Deep-walk JSON and replace imageKey / backgroundImageKey with bundled URLs. */
export function resolveContentImages<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => resolveContentImages(item)) as T;
  }

  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>;
    const resolved: Record<string, unknown> = {};

    for (const [key, nested] of Object.entries(record)) {
      if (key === 'imageKey' && typeof nested === 'string') {
        resolved.image = resolveImageKey(nested);
        continue;
      }

      if (key === 'backgroundImageKey' && typeof nested === 'string') {
        resolved.backgroundImage = resolveImageKey(nested);
        continue;
      }

      resolved[key] = resolveContentImages(nested);
    }

    return resolved as T;
  }

  return value;
}

export function resolveJobListing(raw: IJobListingRaw): IJobListing {
  const { imageKey, applyUrl, ...rest } = raw;
  return { ...rest, image: resolveImageKey(imageKey), url: applyUrl };
}

export function resolveInternshipListing(raw: IInternshipListingRaw): IInternshipListing {
  const { imageKey, applyUrl, ...rest } = raw;
  return { ...rest, image: resolveImageKey(imageKey), url: applyUrl };
}

export function resolveJobListings(raw: readonly IJobListingRaw[]): IJobListing[] {
  return raw.map(resolveJobListing);
}

export function resolveInternshipListings(raw: readonly IInternshipListingRaw[]): IInternshipListing[] {
  return raw.map(resolveInternshipListing);
}
