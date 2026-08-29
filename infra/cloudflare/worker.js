export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();
    const pathname = url.pathname.toLowerCase();

    // 1. Operational Workspace Subdomain: app.legacychain.app
    if (host === "app.legacychain.app" || host === "vault.legacychain.app") {
      if (pathname === "/" || pathname === "/index.html" || pathname === "/workspace") {
        return env.ASSETS.fetch(new Request(new URL("/app_portal.html", request.url).toString(), request));
      }
    }

    // 2. Apex Brand Portal & Direct Routes: legacychain.app / www.legacychain.app
    if (pathname === "/legal-x" || pathname === "/legal-x/") {
      return env.ASSETS.fetch(new Request(new URL("/legal-x.html", request.url).toString(), request));
    }

    if (pathname === "/cinema" || pathname === "/cinema/") {
      return env.ASSETS.fetch(new Request(new URL("/cinema.html", request.url).toString(), request));
    }

    // 3. Default asset resolution
    let response = await env.ASSETS.fetch(request);
    
    // 4. Clean 404 Fallback routing
    if (response.status === 404) {
      if (host === "app.legacychain.app" || host === "vault.legacychain.app") {
        return env.ASSETS.fetch(new Request(new URL("/app_portal.html", request.url).toString(), request));
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
