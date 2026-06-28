import { JOURNAL_PAGE } from '../../../constants/content';
import { getFeaturedJournalArticles } from '../../../lib/journal';
import { useInView } from '../../../hooks/useInView';
import { cn, sectionHeadingClass } from '../../../lib/utils';
import { JournalCard } from './JournalCard';

export function JournalFeaturedRow() {
  const { ref, isVisible } = useInView<HTMLDivElement>();
  const featuredArticles = getFeaturedJournalArticles();

  return (
    <section id="journal-latest" className="scroll-section bg-background section-padding">
      <div className="page-container">
        <h2 className={cn(sectionHeadingClass, 'text-center')}>{JOURNAL_PAGE.featuredSection.title}</h2>

        <div
          ref={ref}
          className={cn(
            'reveal section-stack grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-12',
            isVisible && 'reveal-visible',
          )}
        >
          {featuredArticles.map((article) => (
            <JournalCard key={article.slug} article={article} size="featured" />
          ))}
        </div>
      </div>
    </section>
  );
}
