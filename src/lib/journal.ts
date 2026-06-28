import { JOURNAL_PAGE } from '../constants/content';
import type { IJournalArticle } from '../content/types';

export function getJournalArticleBySlug(slug: string): IJournalArticle | undefined {
  return JOURNAL_PAGE.articles.find((article) => article.slug === slug);
}

export function getFeaturedJournalArticles(): IJournalArticle[] {
  return JOURNAL_PAGE.featuredSlugs
    .map((slug) => getJournalArticleBySlug(slug))
    .filter((article): article is IJournalArticle => article !== undefined);
}

export function getJournalArticleListing(): IJournalArticle[] {
  const featuredSlugs = new Set<string>(JOURNAL_PAGE.featuredSlugs);
  return JOURNAL_PAGE.articles.filter((article) => !featuredSlugs.has(article.slug));
}
