export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();
    const pathname = url.pathname.toLowerCase();

    // Sensitive internal API endpoints redirection if unauthenticated (future-proof)
    const sensitivePrefixes = [
      "/evidence/internal",
      "/vault/secret"
    ];

    if (sensitivePrefixes.some(p => pathname.startsWith(p))) {
      return Response.redirect(`https://legacychain.app/?auth=required`, 302);
    }

    // Default asset resolution from static site directory
    let response = await env.ASSETS.fetch(request);
    
    // Fallback to index.html for root / routing
    if (response.status === 404) {
      if (pathname === "/cinema" || pathname === "/cinema/") {
        return env.ASSETS.fetch(new Request(new URL("/cinema.html", request.url).toString(), request));
      }
      const cleanPath = url.pathname.endsWith('/') ? url.pathname + 'index.html' : url.pathname + '/index.html';
      const tryIndex = await env.ASSETS.fetch(new Request(new URL(cleanPath, request.url).toString(), request));
      if (tryIndex.status !== 404) {
        return tryIndex;
      }
      return env.ASSETS.fetch(new Request(new URL("/index.html", request.url).toString(), request));
    }
    
    return response;
  }
};
