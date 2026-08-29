export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const hostname = url.hostname.toLowerCase();
    const pathname = url.pathname.toLowerCase();

    // 1. Apex Marketing Site: legacychain.app
    if (hostname === "legacychain.app" || hostname === "www.legacychain.app") {
      // Sensitive path protection: redirect internal dashboard routes to app login
      const sensitivePrefixes = [
        "/evidence",
        "/matters",
        "/documents",
        "/proofs",
        "/pleadings",
        "/approvals",
        "/agents",
        "/vault"
      ];

      if (sensitivePrefixes.some(p => pathname.startsWith(p))) {
        return Response.redirect(`https://app.legacychain.app/login?next=${encodeURIComponent(url.pathname)}`, 302);
      }
    }

    // 2. Private Subdomain Authentication Gates
    if (hostname === "app.legacychain.app" || hostname === "vault.legacychain.app") {
      // Unauthenticated requests default to /login
      if (pathname === "/" || (!pathname.startsWith("/login") && !pathname.startsWith("/_next") && !pathname.startsWith("/static"))) {
        const authCookie = request.headers.get("Cookie") || "";
        if (!authCookie.includes("legal_x_session=")) {
          return Response.redirect(`https://${hostname}/login?next=${encodeURIComponent(url.pathname)}`, 302);
        }
      }
    }

    // 3. Forward to Origin Assets
    return fetch(request);
  }
};
