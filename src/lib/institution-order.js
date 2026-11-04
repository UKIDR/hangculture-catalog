// References store paths; filenames remain the source of truth for public slugs.
export function sortInstitutions(institutions, order) {
  const ranks = new Map();
  for (const path of Array.isArray(order) ? order : []) {
    if (typeof path !== 'string') continue;
    const slug = path.split('/').at(-1).replace(/\.json$/i, '');
    if (slug && !ranks.has(slug)) ranks.set(slug, ranks.size);
  }
  return [...institutions].sort((a, b) => {
    const rankA = ranks.get(a.slug) ?? Infinity;
    const rankB = ranks.get(b.slug) ?? Infinity;
    if (rankA !== rankB) return rankA < rankB ? -1 : 1;
    return String(a.title || '').localeCompare(String(b.title || ''), 'ru')
      || String(a.slug).localeCompare(String(b.slug), 'ru');
  });
}
