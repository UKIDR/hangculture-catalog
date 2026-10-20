import { defineConfig } from 'astro/config';

// The GitHub Actions environment supplies this automatically: owner/repository.
// Local development uses '/' so the site works without special setup.
const parts = (process.env.GITHUB_REPOSITORY || '').split('/');
const owner = parts.length === 2 ? parts[0] : '';
const repo = parts.length === 2 ? parts[1] : '';
const base = repo && repo.toLowerCase() !== `${owner.toLowerCase()}.github.io` ? `/${repo}/` : '/';

export default defineConfig({
  site: owner ? `https://${owner}.github.io` : 'http://localhost:4321',
  base,
  trailingSlash: 'always',
});
