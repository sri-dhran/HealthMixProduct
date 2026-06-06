/**
 * Resolves image paths correctly for both local dev and GitHub Pages deployment.
 * GitHub Pages deploys at /HealthMixProduct/ so absolute paths like /images/foo.png
 * would 404. This prepends import.meta.env.BASE_URL to make them base-aware.
 */
export function getImageUrl(path: string): string {
  if (!path) return '';
  // External URLs (http/https) are returned as-is
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  // Strip leading slash and prepend BASE_URL (e.g. /HealthMixProduct/)
  const clean = path.startsWith('/') ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${clean}`;
}
