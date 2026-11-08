/**
 * Cache-Busting Utility for Product and Media Images
 *
 * Appends a version hash or timestamp query parameter (?v=...) to hosted URLs,
 * preventing mobile browsers, desktop caches, and CDNs from displaying stale images
 * when a merchant updates product or category photos in the Admin Panel.
 */

export function getCacheBustedUrl(
  url?: string | null,
  versionOrTimestamp?: string | number | null
): string {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();
  if (!trimmed) return '';

  // Base64 Data URLs and in-memory Blob URLs do not use HTTP caching
  if (trimmed.startsWith('data:') || trimmed.startsWith('blob:')) {
    return trimmed;
  }

  // Derive cache key from version, timestamp, or a fallback hash
  const version = versionOrTimestamp
    ? String(versionOrTimestamp).replace(/[^a-zA-Z0-9_-]/g, '')
    : '';

  if (!version) {
    return trimmed;
  }

  // If a 'v' or 't' query parameter already exists in the URL, replace it
  if (trimmed.match(/[?&]v=[^&]*/)) {
    return trimmed.replace(/([?&]v=)[^&]*/, `$1${version}`);
  }

  const separator = trimmed.includes('?') ? '&' : '?';
  return `${trimmed}${separator}v=${version}`;
}
