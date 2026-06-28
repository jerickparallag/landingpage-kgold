import { JOURNAL_PAGE } from '../../../constants/content';
import { getJournalArticleListing } from '../../../lib/journal';
import { useInView } from '../../../hooks/useInView';
import { cn, sectionHeadingClass } from '../../../lib/utils';
import { JournalCard } from './JournalCard';

export function JournalArticlesGrid() {
  const { ref, isVisible } = useInView<HTMLDivElement>();
  const articles = getJournalArticleListing();

  return (
    <section className="scroll-section bg-background pb-16 lg:pb-24">
      <div className="page-container">
        <h2 className={cn(sectionHeadingClass, 'text-center')}>{JOURNAL_PAGE.articlesSection.title}</h2>

        <div
          ref={ref}
          className={cn(
            'reveal section-stack grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12',
            isVisible && 'reveal-visible',
          )}
        >
          {articles.map((article) => (
            <JournalCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
