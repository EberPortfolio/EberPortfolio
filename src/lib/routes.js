// Case studies live at /caso/<id>: real paths can be indexed and shared,
// and the build writes a static page with its own meta tags for each one.
export const CASE_PATH_PREFIX = '/caso/';
// Links from before the switch to paths
export const LEGACY_CASE_HASH_PREFIX = '#caso/';

export const casePath = (id) => `${CASE_PATH_PREFIX}${encodeURIComponent(id)}`;

export const caseIdFromLocation = ({ pathname, hash } = window.location) => {
  if (pathname.startsWith(CASE_PATH_PREFIX)) {
    return decodeURIComponent(pathname.slice(CASE_PATH_PREFIX.length).replace(/\/$/, '')) || null;
  }
  if (hash.startsWith(LEGACY_CASE_HASH_PREFIX)) {
    return decodeURIComponent(hash.slice(LEGACY_CASE_HASH_PREFIX.length)) || null;
  }
  return null;
};

// Let the browser handle ctrl/cmd/shift/middle clicks (new tab, new window)
export const isPlainLeftClick = (e) =>
  e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;
