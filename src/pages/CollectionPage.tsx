import { Navigate, useParams } from 'react-router-dom';
import { CollectionEscapeBack } from '../components/sections/collection/CollectionEscapeBack';
import { CollectionHero } from '../components/sections/collection/CollectionHero';
import { CollectionProducts } from '../components/sections/collection/CollectionProducts';
import { useCollectionPageEntry } from '../hooks/useCollectionPageEntry';
import { getCollectionBySlug } from '../lib/collections';

export function CollectionPage() {
  const { slug } = useParams<{ slug: string }>();
  const collection = slug ? getCollectionBySlug(slug) : undefined;
  const productsReady = useCollectionPageEntry(slug);

  if (!collection) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <CollectionEscapeBack />
      <CollectionHero collection={collection} />
      {productsReady ? (
        <CollectionProducts collectionName={collection.name} products={collection.products} />
      ) : null}
    </>
  );
}
