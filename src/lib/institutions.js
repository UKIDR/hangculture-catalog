const files = import.meta.glob('../data/institutions/*.json', { eager: true, import: 'default' });

export function getInstitutions() {
  return Object.entries(files)
    .map(([path, data]) => ({
      ...data,
      // Filename is the source of truth for a stable URL.
      slug: path.split('/').at(-1).replace(/\.json$/i, ''),
    }))
    .filter((item) => item.published === true)
    .sort((a, b) => String(a.title || '').localeCompare(String(b.title || ''), 'ru'));
}

export function categoryName(category) {
  return category === 'podved' ? 'Подведомственная организация' : 'Культурно-досуговое учреждение';
}

export function basePath(path = '') {
  const base = import.meta.env.BASE_URL;
  return `${base.endsWith('/') ? base : base + '/'}${String(path).replace(/^\/+/, '')}`;
}

export function mediaPath(path) {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;
  return basePath(path);
}

export function safeUrl(url) {
  if (!url || typeof url !== 'string') return '';
  try {
    const parsed = new URL(url);
    return /^https?:$/.test(parsed.protocol) ? parsed.href : '';
  } catch { return ''; }
}
