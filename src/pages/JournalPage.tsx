import { JournalHero } from '../components/sections/journal/JournalHero';
import { JournalFeaturedRow } from '../components/sections/journal/JournalFeaturedRow';
import { JournalArticlesGrid } from '../components/sections/journal/JournalArticlesGrid';
import { JournalCta } from '../components/sections/journal/JournalCta';

export function JournalPage() {
  return (
    <>
      <JournalHero />
      <JournalFeaturedRow />
      <JournalArticlesGrid />
      <JournalCta />
    </>
  );
}
