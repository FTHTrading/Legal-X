# ⚖️ Legal-X: Sovereign Legal-Record Chain & Matter Digital Twin Infrastructure

[![System Status](https://img.shields.io/badge/System-Operational-2ea44f?style=for-the-badge&logo=shield)](https://legacychain.app)
[![Integrity Layer](https://img.shields.io/badge/Integrity-Rust_Deterministic_Core-blue?style=for-the-badge&logo=rust)](https://github.com/FTHTrading/Legal-X)
[![Settlement Rail](https://img.shields.io/badge/x402-Base_USDC_Settlement-8a2be2?style=for-the-badge&logo=coinbase)](https://github.com/FTHTrading/Legal-X)
[![Evidentiary Standard](https://img.shields.io/badge/FRE_902(13)/(14)-Self--Authenticating_Manifests-f59e0b?style=for-the-badge&logo=scales)](https://github.com/FTHTrading/Legal-X)
[![Governance](https://img.shields.io/badge/Ethics-ABA_Formal_Op._512-crimson?style=for-the-badge)](https://github.com/FTHTrading/Legal-X)

> **Next-Generation Attorney-Supervised Case Intelligence & Evidentiary Provenance Platform**  
> Combines AI-assisted drafting with deterministic source-grounded verification, tamper-evident document lineage, and accountable human attorney approval.

---

## 🎨 Color-Coded Architectural Legend

| Color Code | System Plane | Responsibility | Key Technologies |
| :--- | :--- | :--- | :--- |
| 🟢 **Emerald Green** | **The Operational Digital Twin** | Living case model, party relations, timelines, discovery indices, task quorums. | Next.js 14, React, Tailwind, TypeScript |
| 🔵 **Sapphire Blue** | **The Deterministic Rust Core** | Eyecite parsing, character-offset quote verification, slip-opinion snapshot anchoring. | Rust, Tokio, Eyecite, SHA-256 / BLAKE2 |
| 🟣 **Amethyst Purple** | **Edge & x402 Payment Rails** | Low-latency challenge gating, AWS CloudFront, Lambda@Edge, DynamoDB conditional writes. | Node.js 22 LTS, CloudFront, WAFv2, Base (8453) |
| 🟡 **Amber Gold** | **Evidentiary Integrity Layer** | FRE 902(13)/(14) self-authenticating declarations, cryptographic proof manifests. | Substrate Frame, EVM Anchors, Merkle Proofs |
| 🔴 **Crimson Red** | **Ethical & Rule 11 Hard Stops** | Fail-closed export gates, watermark enforcement, negative treatment blocks. | ABA Op. 512, FRCP 11(b), HITL Gateways |

---

## 📑 Table of Contents

1. [System Abilities & Problems Solved](#-1-system-abilities--problems-solved)
2. [Macro Architectural Topology](#-2-macro-architectural-topology)
3. [Full Subsystem Flow Trees](#-3-full-subsystem-flow-trees)
   - [A. Ingestion & Multi-Hash Lineage Tree](#a-ingestion--multi-hash-lineage-flow)
   - [B. Deterministic Citation Verification & Quote Offset Matching](#b-deterministic-citation-verification-flow)
   - [C. Edge Payment Gating & Atomic Settlement Flow (x402)](#c-edge-payment-gating--atomic-settlement-flow)
   - [D. Document Generation & FRE 902 Certification Tree](#d-document-generation--fre-902-certification-flow)
4. [Rust Infrastructure & Cargo Workspace](#-4-rust-infrastructure--cargo-workspace)
5. [Smart Contracts & On-Chain Proof Registries](#-5-smart-contracts--on-chain-proof-registries)
6. [Data Schemas & Verification Contracts](#-6-data-schemas--verification-contracts)
7. [Repository Structure](#-7-repository-structure)
8. [Getting Started & Local Verification](#-8-getting-started--local-verification)

---

## 🎯 1. System Abilities & Problems Solved

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                       FIRST-GEN FAILURES VS. LEGAL-X SOLUTIONS                          │
├─────────────────────────────────────────┬───────────────────────────────────────────────┤
│ Historical Failure Mode (2022–2024)     │ Legal-X Engineering Solution                  │
├─────────────────────────────────────────┼───────────────────────────────────────────────┤
│ ❌ Fabricated Citations & Hallucinations │ 🔵 Fail-Closed Citation Verifier (CourtListener)│
│ ❌ Altered Quotes & Textual Drift        │ 🔵 Exact Character-Offset Substring Matcher   │
│ ❌ "Zombie Law" / Overruled Precedents  │ 🔵 Real-Time Negative Treatment Checker       │
│ ❌ Direct-to-Consumer UPL Violations    │ 🔴 Mandatory Attorney-in-the-Loop Sign-Off    │
│ ❌ Client Data Retention in AI Models   │ 🟢 Edge PII Scrubbing + Zero Data Retention   │
│ ❌ Inadmissible Unverifiable Exports    │ 🟡 FRE 902(13)/(14) Cryptographic Manifests   │
│ ❌ Distributed Double-Spend Replays     │ 🟣 DynamoDB Atomic Conditional Writes         │
└─────────────────────────────────────────┴───────────────────────────────────────────────┘
```

---

## 🏛️ 2. Macro Architectural Topology

```
                                  Client Request / AI Interaction
                                                │
                                                ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ 🟣 CLOUDFRONT EDGE & LAMBDA@EDGE INTERCEPTOR (us-east-1)                                │
│  • Strips Client Internal Headers (x-origin-verify-secret, x-verified-payment-proof)   │
│  • Unpaid Request: Returns HTTP 402 + Compact Method/URI/Nonce Challenge Envelope      │
│  • Paid Request: Injects X-Origin-Verify-Secret & Proxies to Origin Gateway           │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │
                                            ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ 🟢 THE MATTER DIGITAL TWIN (Next.js 14 Case Workspace)                                │
│  • Private Workspaces: Parties, Statutory Elements, Facts, Evidence Locker, Timeline   │
│  • Edge PII Scrubber: Redacts sensitive identifiers before LLM context ingestion      │
│  • Probabilistic Drafting: LLM drafts structured legal propositions                    │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │
                                            ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ 🔵 DETERMINISTIC RUST VERIFICATION CORE (citation-verifier & authority-router)         │
│  • Primary Source Matcher: Resolves against CourtListener, GovInfo, Federal Register   │
│  • Quote Matcher: Character-by-character validation against slip-opinion byte offsets  │
│  • Hard-Stop Engine: Rejects unverified authorities and flags negative treatment       │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │
                        ┌───────────────────┴───────────────────┐
                        │                                       │
                     [PASS]                                  [FAIL]
                        │                                       │
                        ▼                                       ▼
┌──────────────────────────────────────┐        ┌──────────────────────────────────────┐
│ 🔴 HUMAN-IN-THE-LOOP (HITL) GATEWAY   │        │ 🔴 HARD BLOCK & WATERMARK            │
│  • Side-by-side snapshot comparison  │        │  • Status: SOURCE_UNAVAILABLE /      │
│  • Lead Counsel /s/ Electronic Sign  │        │           QUOTE_DISCREPANCY          │
│  • Rule 11(b) Pre-Flight Certificate │        │  • Watermark: WORKING DRAFT — NOT    │
└───────────────────────┬──────────────┘        │    ATTORNEY APPROVED — NOT FOR FILING│
                        │                       └──────────────────────────────────────┘
                        ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ 🟡 EVIDENTIARY INTEGRITY & FRE 902 EXPORT ENGINE                                       │
│  • Produces self-authenticating 28 U.S.C. § 1746 & FRE 902(13)/(14) Declarations      │
│  • SHA-256 / BLAKE2 Digest Anchoring to On-Chain Proof Registry (Apostle / Base)      │
│  • Formats to Court Profile Specifications (e.g. USDC-DE 28-line numbered sheets)     │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🌲 3. Full Subsystem Flow Trees

### A. Ingestion & Multi-Hash Lineage Flow
```
[ Raw Evidence / Document Upload ]
         │
         ▼
[ Client-Side WebCrypto SHA-256 Pre-Hash ]
         │
         ▼
[ Edge Malware Scan & MIME Inspection ]
         │
         ▼
[ Canonical Ingestion Event Recorded ]
  ├── Content SHA-256 Digest
  ├── BLAKE2b-256 Digest
  ├── Ingesting Principal ID (Bar Number / Client ID)
  ├── Timestamp (ISO-8601 UTC)
  └── Acquisition Context / Chain-of-Custody Log
         │
         ▼
[ Zero-Knowledge AES-256 Vault Encryption ]
         │
         ▼
[ Multi-Guardian / 5-Proof Threshold Estate Anchoring ]
```

### B. Deterministic Citation Verification Flow
```
[ Legal Draft Paragraph Input ]
         │
         ▼
[ Eyecite Citation Extractor (RegEx + NLP Tokenizer) ]
  ├── Normalized Format: [Case Name], [Vol] [Reporter] [Page] ([Year])
  └── Pinpoint Offset: [Page / Paragraph]
         │
         ▼
[ Authority Registry Lookup (Primary Sources) ]
  ├── Exact Match: CourtListener RECAP / GovInfo Slip Opinions
  └── Miss Match ──▶ [ Hard-Stop: SOURCE_UNAVAILABLE (Export Blocked) ]
         │
         ▼
[ Verbatim Quote Offset Verification ]
  ├── Extract exact string slice from authoritative slip opinion
  ├── Compare Character Offsets & Whitespace Normalization
  └── Discrepancy ──▶ [ Hard-Stop: QUOTE_DISCREPANCY (Export Blocked) ]
         │
         ▼
[ Citation Graph & Currentness Check ]
  ├── Check subsequent treatment signals (Overruled, Distinguished, Split)
  └── Warning Signal ──▶ [ Flag for Mandatory Attorney Confirmation ]
```

### C. Edge Payment Gating & Atomic Settlement Flow
```
[ Incoming Request to Protected Endpoint (/v1/proof/...) ]
         │
         ▼
[ CloudFront Viewer-Request Lambda@Edge ]
  ├── Strip forged client internal headers:
  │     delete x-origin-verify-secret, x-verified-payment-proof, etc.
  ├── Check for PAYMENT-SIGNATURE / X-PAYMENT-PROOF Header
  │
  ├── [MISSING / INVALID] ──▶ Return HTTP 402 Payment Required
  │                             ├── Base64 Challenge Envelope (5-min TTL)
  │                             ├── Cache-Control: no-store, no-cache
  │                             └── 0ms Origin Load
  │
  └── [PRESENT] ──▶ Validate Method & URI Binding
                      │
                      ▼
[ Forward to Private Origin with CloudFront Custom Header: X-Origin-Verify-Secret ]
         │
         ▼
[ Private Verifier / Origin Validation ]
  ├── 1. Authenticate X-Origin-Verify-Secret (Block Direct Hits with HTTP 403)
  ├── 2. Verify Base On-Chain Settlement / Facilitator Signature
  ├── 3. Execute Atomic DynamoDB Conditional Write:
  │        Condition: #status = :settled AND expiresAtEpoch > :nowEpoch
  │        Action:    #status = :consumed, consumedAt = :now
  │        └── [FAIL / CONCURRENT RACE] ──▶ Return HTTP 409 Conflict
  │
  └── 4. Execute Metered Proof Service Exactly Once
```

### D. Document Generation & FRE 902 Certification Flow
```
[ Verified Case Data & Approved Propositions ]
         │
         ▼
[ Court Profile Formatter (e.g. USDC-DE / Cal. Super. Ct.) ]
  ├── Apply Line Numbering (1–28 Pleading Format)
  ├── Insert Caption, Case No., Judge, Parties
  └── Render Watermark if unapproved:
        "WORKING DRAFT — NOT ATTORNEY APPROVED — NOT FOR FILING"
         │
         ▼
[ Responsible Attorney Review & Sign-Off Gate ]
  ├── Authenticated /s/ Lead Counsel Electronic Signature
  ├── Bound to Exact SHA-256 Digest of the Final Document
  └── Watermark Stripped upon Successful Sign-Off
         │
         ▼
[ 28 U.S.C. § 1746 & FRE 902(13)/(14) Custodian Certification Generated ]
         │
         ▼
[ Export Court-Ready PDF/A + Proof Package Manifest ]
```

---

## 🦀 4. Rust Infrastructure & Cargo Workspace

The core verification plane is written in pure, high-performance Rust:

```toml
[workspace]
members = [
    "crates/citation-verifier",
    "crates/authority-router",
    "crates/fre902-proof-engine",
    "crates/state-machine",
    "crates/x402-settlement"
]
resolver = "2"
```

### Core Crates Overview:
- **`citation-verifier`**: Deterministic citation extraction, normalization, and character-offset quote verification against slip-opinion text.
- **`authority-router`**: High-availability connector mesh routing legal authority queries to GovInfo, CourtListener, and official state registers.
- **`fre902-proof-engine`**: Cryptographic multi-hashing engine generating self-authenticating digital certificates under Federal Rules of Evidence 902(13) and 902(14).
- **`state-machine`**: Substrate Frame pallet implementing tamper-evident case lifecycle states (`Draft` $\to$ `ReviewRequired` $\to$ `Approved` $\to$ `Archived`).
- **`x402-settlement`**: Atomic payment receipt validator for Base (Chain ID `8453`) USDC transactions.

---

## 📜 5. Smart Contracts & On-Chain Proof Registries

### `contracts/LegalProofRegistry.sol`
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title LegalProofRegistry
 * @dev Anchors FRE 902 self-authenticating cryptographic manifests on-chain.
 */
contract LegalProofRegistry {
    struct ProofRecord {
        bytes32 sha256Digest;
        bytes32 blake2Digest;
        string matterId;
        string documentUuid;
        address signer;
        uint256 timestamp;
        bool isRevoked;
    }

    mapping(bytes32 => ProofRecord) public proofs;
    event ProofAnchored(bytes32 indexed documentHash, string matterId, address indexed signer);

    function anchorProof(
        bytes32 _sha256Digest,
        bytes32 _blake2Digest,
        string calldata _matterId,
        string calldata _documentUuid
    ) external {
        require(proofs[_sha256Digest].timestamp == 0, "Proof already anchored");
        proofs[_sha256Digest] = ProofRecord({
            sha256Digest: _sha256Digest,
            blake2Digest: _blake2Digest,
            matterId: _matterId,
            documentUuid: _documentUuid,
            signer: msg.sender,
            timestamp: block.timestamp,
            isRevoked: false
        });
        emit ProofAnchored(_sha256Digest, _matterId, msg.sender);
    }
}
```

---

## 🗂️ 6. Data Schemas & Verification Contracts

### `schemas/proof-manifest.schema.json`
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "LegalProofManifest",
  "type": "object",
  "required": [
    "packageVersion",
    "documentUuid",
    "matterId",
    "generatedAtUtc",
    "sha256Digest",
    "blake2Digest",
    "lifecycleStatus",
    "attorneySigner"
  ],
  "properties": {
    "packageVersion": { "type": "string", "enum": ["1.0.0-PROD"] },
    "documentUuid": { "type": "string" },
    "matterId": { "type": "string" },
    "generatedAtUtc": { "type": "string", "format": "date-time" },
    "sha256Digest": { "type": "string", "pattern": "^0x[a-fA-F0-9]{64}$" },
    "blake2Digest": { "type": "string", "pattern": "^0x[a-fA-F0-9]{64}$" },
    "lifecycleStatus": {
      "type": "string",
      "enum": [
        "DRAFT",
        "CITATION_VALIDATION_PENDING",
        "SOURCE_UNAVAILABLE",
        "QUOTE_DISCREPANCY",
        "REVIEW_REQUIRED",
        "ATTORNEY_APPROVED_FOR_CONTROLLED_EXPORT",
        "ARCHIVED"
      ]
    },
    "attorneySigner": {
      "type": "object",
      "required": ["name", "barNumber", "hasSignedApproval"],
      "properties": {
        "name": { "type": "string" },
        "barNumber": { "type": "string" },
        "hasSignedApproval": { "type": "boolean" }
      }
    }
  }
}
```

---

## 📁 7. Repository Structure

```
Legal-X/
├── Cargo.toml                      # Root Rust Workspace
├── README.md                       # Master Architecture & Flow Specification
├── .gitignore                      # Git Ignore Configuration
├── contracts/                      # Smart Contracts
│   ├── LegalProofRegistry.sol      # On-Chain FRE 902 Proof Anchor
│   └── X402EscrowSettlement.sol    # Base USDC x402 Machine Settlement
├── schemas/                        # Formal JSON Data Contracts
│   ├── proof-manifest.schema.json  # Proof Bundle Schema
│   ├── case-dna.schema.json        # Matter Digital Twin DNA Schema
│   └── x402-receipt.schema.json    # Durable Receipt Schema
├── crates/                         # Rust Verification Core
│   ├── citation-verifier/          # Eyecite & Quote Offset Matcher
│   ├── authority-router/           # Primary Legal Source Routing Mesh
│   ├── fre902-proof-engine/        # Evidentiary Multi-Hash & Declaration Generator
│   ├── state-machine/              # Substrate Frame Pallet & Transition State
│   └── x402-settlement/            # Atomic Payment Validator
├── infra/                          # Infrastructure as Code
│   ├── aws-sam/                    # CloudFront + Lambda@Edge x402 Stack
│   │   ├── template.yaml
│   │   └── src/edge-interceptor/
│   └── cloudflare/                 # Cloudflare Edge Worker & Router
│       ├── wrangler.toml
│       └── worker.js
└── scripts/                        # Automated Verification & Test Suites
    ├── test_10point_security.ts    # 10-Point Edge & Origin Security Harness
    └── run_hard_stop_tests.ts      # 5 Hard-Stop Export Gate Assertions
```

---

## 🚀 8. Getting Started & Local Verification

### 1. Build Rust Infrastructure
```bash
cargo build --workspace --release
cargo test --workspace
```

### 2. Run Deterministic Hard-Stop Test Suite
```bash
npx tsx scripts/run_hard_stop_tests.ts
```

### 3. Deploy x402 Edge Rails (AWS SAM)
```bash
cd infra/aws-sam
sam build
sam deploy --region us-east-1 --stack-name legal-x-edge-production --guided
```

---

## ⚖️ Legal Notice & Ethical Posture

*Legal-X is a legal-technology platform providing technical infrastructure for evidence organization, reproducible research verification, and document custody management. Legal-X is not a law firm, does not provide legal advice or representation, and does not guarantee legal outcomes. The legal validity of any document and the admissibility of any evidence remain subject to judicial determination and attorney supervision.*
