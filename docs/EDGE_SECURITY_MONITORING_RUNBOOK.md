# Legal-X Edge Security, Routing & Monitoring Runbook

## 1. Executive Summary & Architecture Overview

Legal-X uses a **Worker-First Edge Architecture** (`run_worker_first = true`) hosted on Cloudflare Workers. All incoming requests across `legacychain.app` and `app.legacychain.app` are evaluated at the edge to perform:
- Host-based application routing (`app.legacychain.app` $\rightarrow$ `/app_portal.html`).
- Transparent clean-URL resolution without client-facing 307 redirects.
- Standardized caching and security headers.
- Privacy-safe diagnostic telemetry and health status verification.

---

## 2. Cloudflare Security Events & Bot Management Triage

When external web crawlers, uptime checkers, or third-party automated tools experience HTTP challenges, 403 Forbidden, or retrieval timeouts, perform the following diagnostic steps in the Cloudflare Dashboard:

### Step 1: Filter Security Events
1. Navigate to **Cloudflare Dashboard** $\rightarrow$ **Security** $\rightarrow$ **Events**.
2. Set filter:
   - `Hostname` is in `legacychain.app`, `app.legacychain.app`
   - `URI Path` contains `/__release` OR `URI Path` contains `/legal-x` OR `URI Path` equals `/`
3. Check the **Action Taken** column:
   - **Allowed:** Request passed through to the Worker.
   - **Managed Challenge / JS Challenge:** Cloudflare challenged non-browser/bot user agents (e.g. automated scrapers, headless curl without JS execution).
   - **Block:** WAF or IP reputation rule dropped the connection.

### Step 2: Review Bot Fight Mode & Custom Rules
1. Navigate to **Security** $\rightarrow$ **Bots**.
2. If automated scrapers or institutional API monitors are blocked, verify if **Bot Fight Mode** or **Super Bot Fight Mode** is triggering on automated User-Agents.
3. If necessary for authorized partner integrations, create a **WAF Custom Rule** allowing specific IP ranges, ASNs, or dedicated API keys to bypass Bot Fight Mode for `/api/*` and `/__release`.

---

## 3. Privacy-Safe Edge Telemetry & Ray ID Correlation

### Correlation Workflow:
Every HTTP response from `legacychain.app` includes a unique Cloudflare Ray ID (`CF-RAY` header).
1. Copy the `CF-RAY` header from the client response (e.g., `CF-RAY: a32a82c56d097886-ATL`).
2. Search the Ray ID in **Security $\rightarrow$ Events** or **Workers & Pages $\rightarrow$ Logs** to inspect the exact edge node, geographic point-of-presence (PoP), and execution timeline.

### Privacy-Safe Logging Invariant:
The Worker logs structured JSON events containing only operational metadata:
```json
{
  "host": "legacychain.app",
  "path": "/legal-x.html",
  "release": "3cd40f7",
  "method": "GET",
  "userAgent": "Mozilla/5.0..."
}
```
> [!IMPORTANT]
> Never log client IP addresses, cookies, session tokens, BitGo Enterprise IDs, raw balances, wallet addresses, or personal identifiable information (PII).

---

## 4. Production Caching Tier Standards

| Resource Category | Target Paths | Recommended Cache-Control Header | Edge Behavior |
| :--- | :--- | :--- | :--- |
| **Dynamic HTML Pages** | `/`, `/legal-x.html`, `/app_portal.html`, `/cinema.html` | `Cache-Control: no-cache, max-age=0, must-revalidate` · `Vary: Host` | Always revalidated at the edge; instant propagation of new deploys. |
| **Diagnostic Health Endpoints** | `/__release`, `/api/release` | `Cache-Control: no-store, no-cache, max-age=0, must-revalidate` | Completely un-cached dynamic edge telemetry. |
| **Fingerprinted Static Assets** | `/style.css`, `/app.js`, `/media/*` | `Cache-Control: public, max-age=31536000, immutable` | Long-term edge and browser caching with versioned assets. |
| **Sensitive APIs & Enclaves** | `/api/vault/*`, `/api/custody/*` | `Cache-Control: no-store, no-cache, must-revalidate` · `Private` | Zero intermediate caching of state or credentials. |

---

## 5. Synthetic Regional Monitoring Plan

To guarantee universal global availability across all geographic regions, configure multi-region synthetic uptime monitors (e.g., Datadog, Better Uptime, Checkly, or AWS Synthetics):

1. **Test 1 — Apex Legacy Vault:**
   - URL: `https://legacychain.app/`
   - Expected Status: `200 OK`
   - Required Body Marker: `data-release="legacy-vault"`
   - Required Header: `X-LegalX-Worker-Release` present.

2. **Test 2 — Legal-X Institutional Platform:**
   - URL: `https://legacychain.app/legal-x.html`
   - Expected Status: `200 OK`
   - Required Body Marker: `Institutional Shared Responsibility Matrix`

3. **Test 3 — Legal-X Operational Workspace:**
   - URL: `https://app.legacychain.app/`
   - Expected Status: `200 OK`
   - Required Body Marker: `Legal-X Operational Workspace`

4. **Test 4 — Diagnostic Edge Telemetry:**
   - URL: `https://legacychain.app/__release`
   - Expected Status: `200 OK`
   - Required JSON Field: `"status": "healthy"`, `"routeMode": "worker-first"`
