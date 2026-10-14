// Plain http and www.eber.ar redirect to the canonical https://eber.ar;
// everything else is served from the static build.
const CANONICAL_HOST = 'eber.ar';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.protocol === 'http:' || url.hostname === `www.${CANONICAL_HOST}`) {
      url.protocol = 'https:';
      url.hostname = CANONICAL_HOST;
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  }
};
