const STOP_WORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
  'should', 'may', 'might', 'must', 'shall', 'can', 'need', 'dare',
  'ought', 'used', 'to', 'of', 'in', 'for', 'on', 'with', 'at', 'by',
  'from', 'as', 'into', 'through', 'during', 'before', 'after', 'above',
  'below', 'between', 'under', 'again', 'further', 'then', 'once',
  'here', 'there', 'when', 'where', 'why', 'how', 'all', 'both', 'each',
  'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not',
  'only', 'own', 'same', 'so', 'than', 'too', 'very', 'just', 'and',
  'but', 'if', 'or', 'because', 'until', 'while', 'about', 'against',
  'ang', 'ng', 'sa', 'na', 'ba', 'po', 'ko', 'mo', 'ko', 'yung', 'mga',
]);

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenize(value: string): string[] {
  return normalizeText(value)
    .split(' ')
    .filter((word) => word.length > 1 && !STOP_WORDS.has(word));
}

export function scoreQueryAgainstTopic(query: string, keywords: string[], question?: string): number {
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) return 0;

  const normalizedQuery = normalizeText(query);
  const haystack = normalizeText([question ?? '', ...keywords].join(' '));
  const haystackTokens = new Set(tokenize(haystack));

  let matched = 0;
  for (const token of queryTokens) {
    if (haystackTokens.has(token)) matched += 1;
  }

  let score = matched / queryTokens.length;

  for (const keyword of keywords) {
    const normalizedKeyword = normalizeText(keyword);
    if (normalizedKeyword.length >= 3 && normalizedQuery.includes(normalizedKeyword)) {
      score = Math.max(score, 0.85);
    }
  }

  if (question) {
    const normalizedQuestion = normalizeText(question);
    if (normalizedQuery === normalizedQuestion) score = 1;
    else if (
      normalizedQuestion.includes(normalizedQuery) ||
      normalizedQuery.includes(normalizedQuestion)
    ) {
      score = Math.max(score, 0.9);
    }
  }

  return Math.min(score, 1);
}

export interface IMatchCandidate {
  id: string;
  score: number;
}

export function findBestMatch<T extends { id: string; keywords: string[]; question?: string }>(
  query: string,
  candidates: readonly T[],
  threshold: number,
): T | undefined {
  let best: T | undefined;
  let bestScore = 0;

  for (const candidate of candidates) {
    const score = scoreQueryAgainstTopic(query, candidate.keywords, candidate.question);
    if (score > bestScore) {
      bestScore = score;
      best = candidate;
    }
  }

  return bestScore >= threshold ? best : undefined;
}
