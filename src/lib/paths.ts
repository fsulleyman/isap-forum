/**
 * Utility to resolve application paths with Astro's configured BASE_URL.
 * Supports hosting at root (/) or subdirectory (/isap-forum/) on GitHub Pages.
 */
export function resolvePath(path: string): string {
  if (!path) return '';
  // Don't modify external links or anchors
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('#') || path.startsWith('mailto:')) {
    return path;
  }

  const baseUrl = import.meta.env.BASE_URL || '/';
  const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  if (cleanPath === '/') {
    return cleanBase ? `${cleanBase}/` : '/';
  }

  // If path already has the base prefix, return it as-is
  if (cleanBase && cleanPath.startsWith(`${cleanBase}/`)) {
    return cleanPath;
  }

  return `${cleanBase}${cleanPath}`;
}
