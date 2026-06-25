import collectionsJson from '../content/collections.json';
import { resolveContentImages } from '../content/resolve';
import type { ICollection, IProductItem, TIconKey } from '../content/types';

type TRawCollection = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  imageKey: string;
  iconKey: TIconKey;
  products: {
    id: string;
    name: string;
    line: string;
    description: string;
    imageKey: string;
    badge?: string;
  }[];
};

function resolveCollection(raw: TRawCollection): ICollection {
  const resolved = resolveContentImages(raw) as unknown as Omit<TRawCollection, 'imageKey' | 'products'> & {
    image: string;
    products: IProductItem[];
  };

  return {
    slug: resolved.slug,
    name: resolved.name,
    tagline: resolved.tagline,
    description: resolved.description,
    image: resolved.image,
    iconKey: resolved.iconKey,
    products: resolved.products,
  };
}

const COLLECTIONS = (collectionsJson as { collections: TRawCollection[] }).collections.map(resolveCollection);

export function getAllCollections(): readonly ICollection[] {
  return COLLECTIONS;
}

export function getCollectionBySlug(slug: string): ICollection | undefined {
  return COLLECTIONS.find((collection) => collection.slug === slug);
}
