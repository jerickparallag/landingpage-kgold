import type { IJournalArticle } from '../../../content/types';
import { OptimizedImage } from '../../ui/OptimizedImage';
import { useInView } from '../../../hooks/useInView';
import { cn } from '../../../lib/utils';

interface IJournalArticleContentProps {
  article: IJournalArticle;
}

export function JournalArticleContent({ article }: IJournalArticleContentProps) {
  const { ref: bodyRef, isVisible } = useInView<HTMLDivElement>();

  return (
    <article className="scroll-section bg-background pb-16 lg:pb-24">
      <div className="page-container">
        <header className="journal-article-header">
          <h1 className="journal-article-title">{article.title}</h1>
          <p className="journal-article-date">{article.date}</p>
        </header>

        <figure className="journal-article-figure">
          <OptimizedImage
            src={article.image}
            alt=""
            className="aspect-[16/10] object-cover sm:aspect-[3/2]"
          />
        </figure>

        <div
          ref={bodyRef}
          className={cn('journal-article-body reveal', isVisible && 'reveal-visible')}
        >
          {article.body.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className="journal-article-paragraph">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}
