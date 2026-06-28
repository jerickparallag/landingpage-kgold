import { Link } from 'react-router-dom';
import type { IJournalArticle, TJournalCardSize } from '../../../content/types';
import { OptimizedImage } from '../../ui/OptimizedImage';
import { cn } from '../../../lib/utils';

interface IJournalCardProps {
  article: IJournalArticle;
  size?: TJournalCardSize;
  className?: string;
}

export function JournalCard({ article, size = 'default', className }: IJournalCardProps) {
  const isFeatured = size === 'featured';

  return (
    <Link to={`/journal/${article.slug}`} className={cn('journal-card group', className)}>
      <div
        className={cn(
          'journal-card-image',
          isFeatured ? 'journal-card-image-featured' : 'journal-card-image-default',
        )}
      >
        <OptimizedImage
          src={article.image}
          alt=""
          className="object-cover transition duration-500 group-hover:scale-[1.02]"
        />
      </div>
      <div className="journal-card-body">
        <p className="journal-card-category">{article.category}</p>
        <h3 className={cn('journal-card-title', isFeatured && 'sm:text-base')}>{article.title}</h3>
        <p className="journal-card-date">{article.date}</p>
      </div>
    </Link>
  );
}
