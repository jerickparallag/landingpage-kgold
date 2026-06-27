/** Strip common markdown so assistant replies render as clean plain text in chat. */
export function sanitizeChatContent(text: string): string {
  let result = text;

  // Bold + italic: ***text***
  result = result.replace(/\*\*\*(.+?)\*\*\*/gs, '$1');
  // Bold: **text**
  result = result.replace(/\*\*(.+?)\*\*/gs, '$1');
  // Italic: *text* (single asterisks, not bullets)
  result = result.replace(/(?<![\w*])\*([^*\n]+?)\*(?![\w*])/g, '$1');
  // Underscore variants
  result = result.replace(/___(.+?)___/gs, '$1');
  result = result.replace(/__(.+?)__/gs, '$1');
  result = result.replace(/(?<![\w_])_([^_\n]+?)_(?![\w_])/g, '$1');
  // Inline code: `text`
  result = result.replace(/`([^`]+?)`/g, '$1');
  // Markdown headings at line start: # Title
  result = result.replace(/^#{1,6}\s+/gm, '');
  // Horizontal rules
  result = result.replace(/^[-*_]{3,}\s*$/gm, '');
  // Orphaned asterisk runs (e.g. stray ***)
  result = result.replace(/\*{2,}/g, '');
  // Normalize markdown bullets to a simple bullet
  result = result.replace(/^\s*[-*+]\s+/gm, '• ');

  return result.trim();
}
