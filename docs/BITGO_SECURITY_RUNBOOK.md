# Legal-X Institutional Custody & Security Runbook: BitGo Enterprise Integration

## 1. Executive Summary & Regulatory Boundary

**Core Mandate:** Legal-X is a verifiable orchestration layer and operating system for legal, estate, and asset continuity. **Legal-X is not a custodian.** 

Digital asset custody, transaction execution, signing authority, and key storage remain exclusively subject to BitGo Trust Company (South Dakota / New York) and the governing custodial agreements.

---

## 2. Secrets & Credential Isolation Architecture

1. **Zero Client-Side Secret Exposure:**
   - The BitGo Enterprise ID, API Access Tokens, Private Signing Keys, and Webhook Secrets must **never** appear in client-side bundles (`index.html`, `app.js`), public GitHub schemas, browser console logs, or on-chain transaction data.
   - All BitGo communications are proxied through authenticated server-side Cloudflare Worker endpoints.

2. **Server-Side Environment Secrets (Cloudflare Worker):**
   ```bash
   wrangler secret put BITGO_ENTERPRISE_ID
   wrangler secret put BITGO_READONLY_TOKEN
   wrangler secret put BITGO_APPROVAL_TOKEN
   wrangler secret put BITGO_WEBHOOK_SECRET
   ```

3. **Granular Token Separation Matrix:**

| Legal-X Subsystem | BitGo Access Purpose | Permitted Scope | Operational Review Cycle |
| :--- | :--- | :--- | :--- |
| **Custody Dashboard** | Enterprise & wallet visibility | Read-only enterprise/wallet permissions | 30-day rotation |
| **Reconciliation Worker** | Scheduled balance & metadata audit | Read-only, restricted to specific asset IDs | 30-day rotation |
| **Approval Console** | View/update pending custody approvals | Approval-limited credential (Dual-control) | 14-day rotation |
| **Transaction Service** | Submit pre-authorized transactions | Highly restricted production credential with velocity & spend caps | Weekly rotation |
| **Admin Operations** | Enterprise freeze, archive, member management | **Manual only** via BitGo Admin Console (Dual Key) | Strict hardware 2FA |

4. **Network & Egress Restrictions:**
   - In production, BitGo API tokens are locked to static Cloudflare egress IP/CIDR ranges.
   - Any request originating outside authorized CIDR blocks is rejected at the BitGo API gateway level.

---

$$\text{AnchoredAuditDigest} = \operatorname{SHA-256}(\text{schemaVersion} \parallel \text{tenantScopedAssetRef} \parallel \text{eventType} \parallel \text{canonicalPayloadDigest} \parallel \text{randomNonce})$$

**Cryptographic Privacy Rules:**
- Keep the internal tenant mapping, raw metadata, random nonce, and canonical payload private within the server-side enclave.
- Anchor only the final high-entropy digest plus an opaque schema version identifier on-chain.
- Protects against dictionary/enumeration correlation attacks while remaining deterministically verifiable by authorized audit parties.

**Strict Prohibition:**
- ❌ NEVER anchor client legal names, physical addresses, or tax IDs on-chain.
- ❌ NEVER anchor bank account numbers, BitGo wallet addresses, or fiat valuations on-chain.
- ❌ NEVER anchor raw BitGo API responses or unencrypted JSON documents on-chain.

---

## 4. Emergency Incident Response: Freeze vs. Archive Policy

### Enterprise Freeze Runbook (Emergency Halt)
A **Freeze** immediately halts all member activity across the enterprise while preserving data integrity and audit logs.

#### Valid Freeze Triggers:
1. Suspected account compromise or credential leakage.
2. Anomaly detection in automated reconciliation balances.
3. Unverified or anomalous withdrawal requests exceeding velocity thresholds.
4. Receipt of formal judicial restraint, sanctions alert, or regulatory freeze order.
5. Unauthorized modifications to approver quorums or whitelisted destination addresses.

#### Execution Procedure:
1. Automated alert triggered in Legal-X Security Operations Center.
2. Primary Security Officer and Lead Legal Counsel verify incident severity.
3. Designated BitGo Enterprise Administrator executes **Enterprise Freeze** in BitGo console with dual-control authorization.
4. Formal incident ticket generated with immutable timestamp, root cause analysis (RCA), and remediation checklist.

---

### Enterprise Archive Policy
An **Archive** is an administrative decommissioning step—**never an emergency kill switch**.

#### Valid Archive Conditions:
1. Decommissioning of sandbox/testing environments.
2. Formal winding-down or liquidation of an SPV entity after complete reconciliation and distribution.
3. Migration of holdings to a successor institutional trust structure.
4. Permanent retirement after statutory legal document retention periods (e.g., 7 years post-settlement).

---

## 5. Public-Facing Communication Standard

All public-facing portals (`legacychain.app`, `legal-x.html`, `cinema.html`) must use the standardized disclaimer:

> *"Legal‑X supports authorized BitGo Enterprise connectivity for eligible digital-asset workflows. Authorized organizations can connect approved custody records, reconcile asset information, maintain policy-aware approvals, and generate cryptographic audit references. Legal‑X is not a custodian. Digital-asset custody, transaction execution, and account controls remain subject to the applicable BitGo services, account configuration, jurisdiction, asset support, and governing agreements."*
