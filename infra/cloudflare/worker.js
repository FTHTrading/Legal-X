export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();
    const path = url.pathname.toLowerCase();

    // 0. Diagnostic Release Verification Endpoint
    if (path === "/__release" || path === "/api/release") {
      return Response.json(
        {
          status: "healthy",
          hostname: url.hostname,
          pathname: url.pathname,
          workerRelease: "77f4a83",
          contentRelease: "77f4a83",
          deployedAt: "2026-08-29T05:16:00-04:00",
          routeMode: "worker-first",
          targetAssets: ["/index.html", "/legal-x.html", "/app_portal.html", "/cinema.html"]
        },
        {
          headers: {
            "Cache-Control": "no-store, no-cache, max-age=0, must-revalidate",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      );
    }

    // Cache control to prevent stale HTML caching across production releases
    const noCacheHeaders = {
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Pragma": "no-cache",
      "Expires": "0"
    };

    // Helper to fetch asset and transparently resolve any Cloudflare redirect without returning 307 to client
    async function serveAsset(assetPath) {
      let targetUrl = new URL(assetPath, request.url);
      let res = await env.ASSETS.fetch(new Request(targetUrl.toString(), request));
      
      // If Cloudflare ASSETS returned a redirect (e.g. .html -> clean URL), resolve target body directly
      if (res.status >= 300 && res.status < 400) {
        const location = res.headers.get("Location");
        if (location) {
          const redirectUrl = new URL(location, request.url);
          const resolvedRes = await env.ASSETS.fetch(new Request(redirectUrl.toString(), request));
          if (resolvedRes.status === 200) {
            res = resolvedRes;
          }
        }
      }

      const newHeaders = new Headers(res.headers);
      Object.entries(noCacheHeaders).forEach(([k, v]) => newHeaders.set(k, v));
      return new Response(res.body, { status: res.status, headers: newHeaders });
    }

    // 1. App Subdomain (app.legacychain.app / vault.legacychain.app)
    if (host === "app.legacychain.app" || host === "vault.legacychain.app") {
      if (path === "/" || path === "/index.html" || path === "/workspace" || path === "/app" || path === "/app/") {
        return serveAsset("/app_portal.html");
      }
    }

    // 2. Specific Named Routes
    if (path === "/legal-x" || path === "/legal-x/" || path === "/legal-x.html") {
      return serveAsset("/legal-x.html");
    }

    if (path === "/cinema" || path === "/cinema/" || path === "/cinema.html") {
      return serveAsset("/cinema.html");
    }

    if (path === "/" || path === "/index.html") {
      return serveAsset("/index.html");
    }

    // 3. Fallback to standard asset resolution (CSS, JS, Media)
    let response = await env.ASSETS.fetch(request);
    if (response.status === 404) {
      if (host === "app.legacychain.app" || host === "vault.legacychain.app") {
        return serveAsset("/app_portal.html");
      }
      return serveAsset("/index.html");
    }

    return response;
  }
};
