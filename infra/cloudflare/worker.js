export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();
    const path = url.pathname.toLowerCase();

    // Cache control to prevent stale HTML caching across production releases
    const noCacheHeaders = {
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Pragma": "no-cache",
      "Expires": "0"
    };

    // 1. App Subdomain (app.legacychain.app / vault.legacychain.app)
    if (host === "app.legacychain.app" || host === "vault.legacychain.app") {
      if (path === "/" || path === "/index.html" || path === "/workspace" || path === "/app" || path === "/app/") {
        const res = await env.ASSETS.fetch(new Request(new URL("/app_portal.html", request.url).toString(), request));
        const newHeaders = new Headers(res.headers);
        Object.entries(noCacheHeaders).forEach(([k, v]) => newHeaders.set(k, v));
        return new Response(res.body, { status: res.status, headers: newHeaders });
      }
    }

    // 2. Apex Brand & Specific Public Routes (legacychain.app / www.legacychain.app)
    if (path === "/legal-x" || path === "/legal-x/" || path === "/legal-x.html") {
      const res = await env.ASSETS.fetch(new Request(new URL("/legal-x.html", request.url).toString(), request));
      const newHeaders = new Headers(res.headers);
      Object.entries(noCacheHeaders).forEach(([k, v]) => newHeaders.set(k, v));
      return new Response(res.body, { status: res.status, headers: newHeaders });
    }

    if (path === "/cinema" || path === "/cinema/" || path === "/cinema.html") {
      const res = await env.ASSETS.fetch(new Request(new URL("/cinema.html", request.url).toString(), request));
      const newHeaders = new Headers(res.headers);
      Object.entries(noCacheHeaders).forEach(([k, v]) => newHeaders.set(k, v));
      return new Response(res.body, { status: res.status, headers: newHeaders });
    }

    if (path === "/" || path === "/index.html") {
      const res = await env.ASSETS.fetch(new Request(new URL("/index.html", request.url).toString(), request));
      const newHeaders = new Headers(res.headers);
      Object.entries(noCacheHeaders).forEach(([k, v]) => newHeaders.set(k, v));
      return new Response(res.body, { status: res.status, headers: newHeaders });
    }

    // 3. Fallback to standard asset resolution (CSS, JS, Media)
    let response = await env.ASSETS.fetch(request);
    
    if (response.status === 404) {
      if (host === "app.legacychain.app" || host === "vault.legacychain.app") {
        const res = await env.ASSETS.fetch(new Request(new URL("/app_portal.html", request.url).toString(), request));
        const newHeaders = new Headers(res.headers);
        Object.entries(noCacheHeaders).forEach(([k, v]) => newHeaders.set(k, v));
        return new Response(res.body, { status: res.status, headers: newHeaders });
      }
      const res = await env.ASSETS.fetch(new Request(new URL("/index.html", request.url).toString(), request));
      const newHeaders = new Headers(res.headers);
      Object.entries(noCacheHeaders).forEach(([k, v]) => newHeaders.set(k, v));
      return new Response(res.body, { status: res.status, headers: newHeaders });
    }

    return response;
  }
};
