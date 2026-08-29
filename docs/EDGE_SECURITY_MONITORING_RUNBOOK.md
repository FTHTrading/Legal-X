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
| **Non-Fingerprinted Static Assets** | `/style.css`, `/app.js`, un-versioned media | `Cache-Control: no-cache, max-age=0, must-revalidate` | Revalidated to ensure client scripts and styles stay strictly in sync with HTML releases. |
| **Fingerprinted Static Assets** | `/*.bf0c559.js`, `/*.bf0c559.css`, versioned media | `Cache-Control: public, max-age=31536000, immutable` | Long-term CDN performance with zero stale cache risk. |
| **Sensitive APIs & Enclaves** | `/api/vault/*`, `/api/custody/*` | `Cache-Control: no-store, no-cache, must-revalidate` · `Private` | Zero intermediate caching of state or credentials. |

---

## 5. Synthetic Regional Monitoring Plan (Every 5 Minutes)

To guarantee universal global availability across all geographic regions, configure multi-region synthetic uptime monitors (e.g., Datadog, Better Uptime, Checkly, or AWS Synthetics) executing every 5 minutes from at least 3 distinct regions:

1. **Test 1 — Minimal Diagnostic Release Endpoint:**
   - URL: `https://legacychain.app/__release`
   - Expected Status: `200 OK`
   - Header Validation: `X-LegalX-Worker-Release: bf0c559`
   - JSON Body Validation: `"status": "healthy"`, `"release": "bf0c559"`, `"routeMode": "worker-first"`

2. **Test 2 — Apex Legacy Vault Protocol:**
   - URL: `https://legacychain.app/`
   - Expected Status: `200 OK`
   - Header Validation: `X-LegalX-Worker-Release: bf0c559`
   - Body Marker: `data-release="legacy-vault"`, `Institutional Custody Connectivity`

3. **Test 3 — Legal-X Institutional Platform:**
   - URL: `https://legacychain.app/legal-x.html` & `https://legacychain.app/legal-x`
   - Expected Status: `200 OK` (No 307 redirect chains)
   - Header Validation: `X-LegalX-Worker-Release: bf0c559`
   - Body Marker: `Institutional Shared Responsibility Matrix`, `What Legal-X Is NOT`

4. **Test 4 — Legal-X Operational Workspace:**
   - URL: `https://app.legacychain.app/`
   - Expected Status: `200 OK`
   - Header Validation: `X-LegalX-Worker-Release: bf0c559`
   - Body Marker: `<title>Legal-X Operational Workspace`, `LEGAL-X OPERATIONAL WORKSPACE`

5. **Test 5 — Sovereign Cinema Vault:**
   - URL: `https://legacychain.app/cinema.html`
   - Expected Status: `200 OK`
   - Body Marker: `data-release="sovereign-cinema"`

---

## 6. Automated Alert Conditions & PagerDuty/Slack Escalation

Automated alerts must trigger immediately upon any of the following conditions:

1. **HTTP Error Status:** Any `4xx` or `5xx` response on monitored endpoints.
2. **Missing Diagnostic Header:** Any response that omits `X-LegalX-Worker-Release`.
3. **Release Mismatch:** Response returning an unexpected or stale release ID (e.g. not matching current Git `bf0c559`).
4. **Incorrect Asset Resolution:** `app.legacychain.app` serving `/index.html` instead of `/app_portal.html`.
5. **Redirect Degradation:** Any redirect chain longer than 1 hop or unexpected 307 loop.
6. **Body Fingerprint Drift:** Page body HTML checksum changing without a recorded deployment.
7. **Regional Outage:** Consistent failures or timeouts from a single geographic PoP or region.
8. **WAF False-Positive:** Cloudflare Managed Challenge or JS Challenge triggered against approved monitor User-Agents.
9. **Latency Spike:** Response time exceeding defined SLO (> 800ms TTFB).

