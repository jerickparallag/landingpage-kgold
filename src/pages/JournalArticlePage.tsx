import { Navigate, useParams } from 'react-router-dom';
import { JournalArticleContent } from '../components/sections/journal/JournalArticleContent';
import { getJournalArticleBySlug } from '../lib/journal';

export function JournalArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getJournalArticleBySlug(slug) : undefined;

  if (!article) {
    return <Navigate to="/journal" replace />;
  }

  return <JournalArticleContent article={article} />;
}
