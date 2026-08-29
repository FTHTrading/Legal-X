export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();
    const path = url.pathname.toLowerCase();

    // Unified canonical release identifier
    const currentReleaseId = "bf0c559";

    // Privacy-Safe Diagnostic Telemetry Logging (Zero PII, Zero Secret Exposure)
    console.log(JSON.stringify({
      host: url.hostname,
      path: url.pathname,
      release: currentReleaseId,
      method: request.method,
      userAgent: request.headers.get("user-agent")?.slice(0, 120) ?? null
    }));

    // 0. Minimal Public Diagnostic Release Verification Endpoint
    if (path === "/__release" || path === "/api/release") {
      return Response.json(
        {
          status: "healthy",
          release: currentReleaseId,
          hostname: url.hostname,
          timestamp: "2026-08-29T05:28:00-04:00",
          routeMode: "worker-first"
        },
        {
          headers: {
            "Cache-Control": "no-store, no-cache, max-age=0, must-revalidate",
            "Content-Type": "application/json; charset=utf-8",
            "Access-Control-Allow-Origin": "*",
            "X-LegalX-Worker-Release": currentReleaseId,
            "X-LegalX-Content-Release": currentReleaseId
          }
        }
      );
    }

    // Helper to fetch HTML asset and transparently resolve any Cloudflare redirect
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
      newHeaders.set("Cache-Control", "no-cache, max-age=0, must-revalidate");
      newHeaders.set("Pragma", "no-cache");
      newHeaders.set("Expires", "0");
      newHeaders.set("Vary", "Host");
      newHeaders.set("Access-Control-Allow-Origin", "*");
      newHeaders.set("X-LegalX-Worker-Release", currentReleaseId);
      newHeaders.set("X-LegalX-Content-Release", currentReleaseId);

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
