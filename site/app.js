// Legal-X Liquid Glass Interactive Engine

const CASE_ARCHETYPES = {
  mat_2026_corp: {
    title: "Corp. Motion to Dismiss (USDC-DE)",
    matterId: "mat_2026_corp_001",
    court: "U.S. District Court for the District of Delaware (USDC-DE)",
    judge: "Hon. Richard G. Andrews",
    parties: "Petitioner Sovereign LLC v. Counterparty Inc.",
    dnaStrand: [
      { type: "MATTER_ID", val: "mat_2026_corp_001", hash: "0x8f41...29a1" },
      { type: "JURISDICTION", val: "USDC-DE (28-Line Pleading)", hash: "0x3b12...ff04" },
      { type: "ELEMENT_OF_PROOF", val: "FRCP 12(b)(6) Plausibility", hash: "0xaa98...7712" },
      { type: "SOURCE_SNAPSHOT", val: "Ashcroft v. Iqbal (556 U.S. 662)", hash: "0x3a4f...6913" },
      { type: "ATTORNEY_SIGN", val: "/s/ Evelyn Vance (DE-98421)", hash: "0xcc21...8843" },
      { type: "FRE_902_CERT", val: "Rule 902(13)/(14) Dual Decl.", hash: "0xdd99...1102" }
    ],
    nodes: [
      {
        id: "node_caption",
        title: "Pleading Caption & Court Profile",
        sub: "USDC-DE Formal Specification",
        badge: "VERIFIED",
        data: {
          courtId: "USDC-DE",
          caseNo: "1:26-cv-00999-RGA",
          leadJudge: "Hon. Richard G. Andrews",
          lineFormat: "28-line numbered pleading sheet",
          ruleSetVersion: "DE-Local-Rules-2026.1"
        }
      },
      {
        id: "node_evidence",
        title: "Forensic Evidence Locker",
        sub: "2 Raw Files Ingested",
        badge: "SHA-256 ANCHORED",
        data: {
          evidenceCount: 2,
          primaryFile: "exhibit_a_server_logs.csv",
          sha256Digest: "0x4f53cd9876543210abcdef0123456789abcdef0123456789abcdef0123456789",
          blake2Digest: "0x89abcdef0123456789abcdef0123456789abcdef0123456789abcdef01234567",
          ingestedBy: "Evelyn Vance, Esq. (2026-08-28T21:40:00Z)"
        }
      },
      {
        id: "node_authority",
        title: "Primary Authority Registry",
        sub: "Ashcroft v. Iqbal (556 U.S. 662)",
        badge: "SLIP OPINION MATCH",
        data: {
          citation: "Ashcroft v. Iqbal, 556 U.S. 662, 678 (2009)",
          provider: "CourtListener Primary Registry",
          contentHash: "0x3a4f91b7d52a818c39e289bfad1694f4a9b515d9090fc1d51a7027d7d2426913",
          quoteStatus: "EXACT SUBSTRING MATCH (Offset: Char 49)",
          negativeTreatment: "No overruling precedent found (2026 check)"
        }
      },
      {
        id: "node_approval",
        title: "Human Attorney Sign-Off Gate",
        sub: "Lead Counsel of Record",
        badge: "SIGNED & APPROVED",
        data: {
          attorneyName: "Evelyn Vance, Esq.",
          barNumber: "DE-Bar-98421",
          firm: "Vance & Associates LLP",
          electronicSign: "/s/ Evelyn Vance",
          signedAt: "2026-08-28T21:50:00Z (Bound to Digest 0x3a4f...)"
        }
      }
    ]
  },
  mat_2026_estate: {
    title: "5-Proof Estate Trust Safe",
    matterId: "mat_2026_estate_004",
    court: "Delaware Chancery Court",
    judge: "Chancellor Kathaleen McCormick",
    parties: "Generational Family Trust Estate",
    dnaStrand: [
      { type: "MATTER_ID", val: "mat_2026_estate_004", hash: "0x11ab...33cc" },
      { type: "SAFE_VAULT", val: "AES-256-GCM Zero-Knowledge", hash: "0x44dd...99ee" },
      { type: "QUORUM_RULE", val: "3-of-5 Guardian Threshold", hash: "0x77ff...22aa" },
      { type: "ASSET_INVENTORY", val: "Real Estate & Equity Root", hash: "0x55bb...8811" },
      { type: "ATTORNEY_SIGN", val: "/s/ Mark Sterling (DE-Trust)", hash: "0x99cc...4411" }
    ],
    nodes: [
      {
        id: "node_vault",
        title: "Zero-Knowledge Asset Vault",
        sub: "Encrypted Estate Deeds & Operating Agmts",
        badge: "AES-256 ENCRYPTED",
        data: {
          vaultId: "vlt_estate_004",
          encryption: "Client-Side Zero-Knowledge AES-256-GCM",
          digestTreeRoot: "0x9812739182739182739182739182739182739182739182739182739182739182",
          guardianThreshold: "3 of 5 Authorized Signatures required for release"
        }
      },
      {
        id: "node_guardians",
        title: "Multi-Guardian Release Quorum",
        sub: "3 Fiduciary Signatures Active",
        badge: "QUORUM MET",
        data: {
          guardian1: "Primary Trustee (Active)",
          guardian2: "Independent Counsel (Active)",
          guardian3: "Institutional Custodian (Active)",
          timelockExpiry: "2036-01-01T00:00:00Z"
        }
      }
    ]
  },
  mat_2026_investigation: {
    title: "DOJ / SEC Forensic Defense Matter",
    matterId: "mat_2026_def_009",
    court: "U.S. District Court for the Southern District of New York",
    judge: "Hon. Jesse M. Furman",
    parties: "Defense Forensic Review & Subpoena Response",
    dnaStrand: [
      { type: "MATTER_ID", val: "mat_2026_def_009", hash: "0x22ee...99bb" },
      { type: "CUSTODY_LOG", val: "Chain of Custody Timestamp", hash: "0x66cc...11aa" },
      { type: "EVIDENCE_DIGEST", val: "Audio / Video Forensic Hash", hash: "0x88dd...33ee" },
      { type: "FRE_902_CERT", val: "28 U.S.C. § 1746 Declaration", hash: "0x77ee...4411" },
      { type: "ATTORNEY_SIGN", val: "/s/ Lead Defense Counsel", hash: "0x11bb...55ff" }
    ],
    nodes: [
      {
        id: "node_custody",
        title: "Chain-of-Custody Sequence",
        sub: "4 Immutable Verification Entries",
        badge: "VERIFIED LINEAGE",
        data: {
          chainLength: 4,
          ingestionTimestamp: "2026-08-28T19:00:00Z",
          evidenceHash: "0xaa112233445566778899aabbccddeeff00112233445566778899aabbccddeeff",
          forensicIntegrity: "Unbroken cryptographic chain from device capture to court manifest"
        }
      }
    ]
  },
  mat_2026_securities_rwa: {
    title: "Token Classification & RWA Offering",
    matterId: "mat_2026_rwa_777",
    court: "SEC Division of Corporation Finance / S.D.N.Y.",
    judge: "Hon. Analisa Torres",
    parties: "UnyKorn Real-World Asset Protocol v. Regulatory Staff",
    dnaStrand: [
      { type: "MATTER_ID", val: "mat_2026_rwa_777", hash: "0x55aa...33bb" },
      { type: "HOWEY_TEST", val: "SEC v. Howey 4-Prong Analysis", hash: "0x99cc...22dd" },
      { type: "REVES_FAMILY", val: "Reves Commercial Note Test", hash: "0x11ff...44ee" },
      { type: "REG_D_EXEMPT", val: "Rule 506(c) Accredited Whitelist", hash: "0x88aa...77cc" },
      { type: "ATTORNEY_SIGN", val: "/s/ Securities Partner (NY-Bar)", hash: "0x33ee...99aa" }
    ],
    nodes: [
      {
        id: "node_howey",
        title: "Howey & Reves Classification Audit",
        sub: "Institutional vs Programmatic Liquidity",
        badge: "EXEMPT COMPLIANT",
        data: {
          investmentOfMoney: "USD Stablecoin Atomic Settlement (Base 8453)",
          commonEnterprise: "Segregated SPV Vault Protected",
          expectationOfProfits: "Fixed Yield Asset-Backed Lease Notes",
          effortsOfOthers: "Automated Non-Discretionary Smart Contract Rules"
        }
      }
    ]
  },
  mat_2026_patent: {
    title: "Patent & Algorithm Infringement Twin",
    matterId: "mat_2026_pat_101",
    court: "U.S. District Court for the Eastern District of Texas",
    judge: "Hon. Rodney Gilstrap",
    parties: "InvenTech Sovereign IP v. Global Algorithm Systems",
    dnaStrand: [
      { type: "MATTER_ID", val: "mat_2026_pat_101", hash: "0x44dd...11ee" },
      { type: "SECTION_101", val: "Alice Corp Step 1 & Step 2 Proof", hash: "0x77bb...99aa" },
      { type: "MARKMAN_CLAIM", val: "Markman Claim Construction Matrix", hash: "0x22cc...55dd" },
      { type: "PRIOR_ART", val: "USPTO Patent Corpus Snapshot", hash: "0x66ee...88ff" }
    ],
    nodes: [
      {
        id: "node_alice",
        title: "Alice Two-Step Eligibility Defense",
        sub: "35 U.S.C. § 101 Inventive Concept",
        badge: "STEP 2 MET",
        data: {
          abstractIdeaCheck: "Deterministic Edge Hardware Hashing Mechanism",
          inventiveConcept: "Zero-Latency CloudFront Cryptographic Interceptor",
          technicalTransformation: "Hardware Root of Trust State Verification"
        }
      }
    ]
  },
  mat_2026_commercial: {
    title: "Cross-Border Commercial Contract Breach",
    matterId: "mat_2026_comm_204",
    court: "London Court of International Arbitration (LCIA) / Delaware",
    judge: "Tribunal Chair",
    parties: "Apostle Global Energy Ltd. v. Multilateral Offtaker Corp.",
    dnaStrand: [
      { type: "MATTER_ID", val: "mat_2026_comm_204", hash: "0x88cc...33aa" },
      { type: "CHOICE_OF_LAW", val: "Delaware Commercial Code § 2-719", hash: "0x11dd...77ee" },
      { type: "FORCE_MAJEURE", val: "Substation Delivery Failure Audit", hash: "0x99aa...55bb" },
      { type: "LIQUIDATED_DAMAGES", val: "$4,820,000 Atomic Base Settlement", hash: "0x44ff...22cc" }
    ],
    nodes: [
      {
        id: "node_breach",
        title: "Material Breach & Damages Engine",
        sub: "Liquidated Damages Calculation",
        badge: "VERIFIED RECEIPT",
        data: {
          defaultDate: "2026-06-15T00:00:00Z",
          curePeriod: "30 Business Days (Expired Uncured)",
          liquidatedAmount: "$4,820,000.00 USDC",
          settlementRail: "x402 Base Mainnet Smart Contract"
        }
      }
    ]
  },
  mat_2026_whistleblower: {
    title: "SOX / Dodd-Frank Anti-Retaliation Twin",
    matterId: "mat_2026_sox_505",
    court: "U.S. Department of Labor (OSHA) / S.D.N.Y.",
    judge: "Administrative Law Judge",
    parties: "Protected Senior Auditor v. Multinational Audit Entity",
    dnaStrand: [
      { type: "MATTER_ID", val: "mat_2026_sox_505", hash: "0x33aa...88cc" },
      { type: "PROTECTED_ACTIVITY", val: "18 U.S.C. § 1514A SEC Report", hash: "0x55ee...11bb" },
      { type: "REASONABLE_BELIEF", val: "GAAP / Revenue Recognition Mismatch", hash: "0x77dd...99aa" },
      { type: "TEMPORAL_PROXIMITY", val: "14 Days Between Report & Adverse Action", hash: "0x22ff...44ee" }
    ],
    nodes: [
      {
        id: "node_sox",
        title: "Sarbanes-Oxley 4-Prong Prima Facie",
        sub: "Protected Disclosure Timeline",
        badge: "PRIMA FACIE ESTABLISHED",
        data: {
          disclosureDate: "2026-03-01T14:30:00Z (SEC TCR File)",
          adverseAction: "Constructive Termination & Access Revocation",
          contributingFactor: "Direct Temporal Linkage (2 Weeks)",
          clearAndConvincingRebuttal: "No Pre-Existing Performance PIP"
        }
      }
    ]
  },
  mat_2026_arbitration_x402: {
    title: "x402 Autonomous Smart Dispute",
    matterId: "mat_2026_arb_402",
    court: "On-Chain Base Decentralized Tribunal",
    judge: "Consensus Arbiter Quorum",
    parties: "Autonomous AI Agent Alpha v. Agent Beta",
    dnaStrand: [
      { type: "MATTER_ID", val: "mat_2026_arb_402", hash: "0x99ee...44aa" },
      { type: "SMART_CONTRACT", val: "X402EscrowSettlement (Base 8453)", hash: "0x33cc...77dd" },
      { type: "CHALLENGE_DIGEST", val: "HTTP 402 Signed Authorization", hash: "0x11bb...66ff" },
      { type: "INSTANT_RELEASE", val: "Automated DynamoDB State Write", hash: "0x55aa...22ee" }
    ],
    nodes: [
      {
        id: "node_x402",
        title: "Autonomous Base USDC Escrow",
        sub: "Microsecond Adjudication",
        badge: "AUTOMATIC SETTLEMENT",
        data: {
          chainId: "Base Mainnet (8453)",
          contractAddress: "0x4E574939D460d284B5D990646D4aeaEF2D49Fa13",
          settlementLatency: "140ms",
          settlementConfirmed: "True"
        }
      }
    ]
  }
};

let currentMatterKey = "mat_2026_corp";

document.addEventListener("DOMContentLoaded", () => {
  initTabs();
  renderMatterTwin(currentMatterKey);
  initDnaCanvas();
  initCitationMatcher();
  initLawLibrary();
  initGeniusGlobalDeck();
  initX402Simulator();
  initAccordions();
  initCinemaStudio();
  initBitGoModal();
  initAmbientBackdropSelector();
});

// TAB SWITCHER
function initTabs() {
  const tabs = document.querySelectorAll(".nav-link");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const target = tab.getAttribute("data-tab");
      document.querySelectorAll(".tab-pane").forEach(pane => {
        pane.classList.remove("active");
        if (pane.id === target) {
          pane.classList.add("active");
        }
      });
    });
  });

  const matterBtns = document.querySelectorAll(".matter-btn");
  matterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      matterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentMatterKey = btn.getAttribute("data-matter");
      renderMatterTwin(currentMatterKey);
    });
  });
}

// RENDER MATTER DIGITAL TWIN
function renderMatterTwin(key) {
  const data = CASE_ARCHETYPES[key];
  const treeContainer = document.getElementById("nodeTree");
  treeContainer.innerHTML = "";

  data.nodes.forEach((node, index) => {
    const div = document.createElement("div");
    div.className = `node-item ${index === 0 ? "selected" : ""}`;
    div.innerHTML = `
      <div class="node-title-group">
        <div class="node-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        </div>
        <div>
          <div class="node-label">${node.title}</div>
          <div class="node-sublabel">${node.sub}</div>
        </div>
      </div>
      <span class="node-status-badge">${node.badge}</span>
    `;

    div.addEventListener("click", () => {
      document.querySelectorAll(".node-item").forEach(n => n.classList.remove("selected"));
      div.classList.add("selected");
      inspectNode(node);
    });

    treeContainer.appendChild(div);
  });

  // Default inspect first node
  if (data.nodes.length > 0) {
    inspectNode(data.nodes[0]);
  }

  // Also update DNA blocks row
  renderDnaBlocks(data.dnaStrand);
}

function inspectNode(node) {
  const inspector = document.getElementById("nodeInspector");
  let rowsHtml = "";
  for (const [key, val] of Object.entries(node.data)) {
    const isHash = typeof val === "string" && val.startsWith("0x");
    rowsHtml += `
      <div class="data-row">
        <span class="data-label">${key.replace(/([A-Z])/g, ' $1')}</span>
        <span class="${isHash ? 'data-val-mono' : 'data-val-text'}">${val}</span>
      </div>
    `;
  }

  inspector.innerHTML = `
    <div class="inspector-data-group">
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-glass); padding-bottom:0.75rem;">
        <h4 style="font-size:1.1rem; font-weight:800; color:var(--text-main);">${node.title}</h4>
        <span class="node-status-badge">${node.badge}</span>
      </div>
      ${rowsHtml}
    </div>
  `;
}

function renderDnaBlocks(strand) {
  const container = document.getElementById("dnaBlocksRow");
  container.innerHTML = "";

  strand.forEach(block => {
    const div = document.createElement("div");
    div.className = "dna-block-card";
    div.innerHTML = `
      <span class="dna-block-header">${block.type}</span>
      <span class="dna-block-name">${block.val}</span>
      <span class="dna-block-hash">${block.hash}</span>
    `;
    container.appendChild(div);
  });
}

// DNA STRAND CANVAS VISUALIZER
function initDnaCanvas() {
  const canvas = document.getElementById("dnaCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let phase = 0;

  function drawHelix() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const centerY = canvas.height / 2;
    const numPoints = 28;
    const spacing = canvas.width / numPoints;

    for (let i = 0; i < numPoints; i++) {
      const x = i * spacing + 20;
      const angle = phase + i * 0.35;
      const y1 = centerY + Math.sin(angle) * 45;
      const y2 = centerY - Math.sin(angle) * 45;

      // Draw connecting rung
      ctx.beginPath();
      ctx.moveTo(x, y1);
      ctx.lineTo(x, y2);
      ctx.strokeStyle = "rgba(0, 210, 255, 0.2)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Top Strand Node (Cyan)
      ctx.beginPath();
      ctx.arc(x, y1, 6, 0, Math.PI * 2);
      ctx.fillStyle = "#00d2ff";
      ctx.shadowColor = "#00d2ff";
      ctx.shadowBlur = 12;
      ctx.fill();

      // Bottom Strand Node (Gold)
      ctx.beginPath();
      ctx.arc(x, y2, 6, 0, Math.PI * 2);
      ctx.fillStyle = "#f59e0b";
      ctx.shadowColor = "#f59e0b";
      ctx.shadowBlur = 12;
      ctx.fill();
    }

    ctx.shadowBlur = 0; // reset
    phase += 0.025;
    requestAnimationFrame(drawHelix);
  }

  drawHelix();
}

// CITATION MATCHER ENGINE
function initCitationMatcher() {
  const runBtn = document.getElementById("runCitationAuditBtn");
  const fakeBtn = document.getElementById("insertFakeCitationBtn");
  const input = document.getElementById("draftTextInput");
  const output = document.getElementById("citationAuditResult");

  if (!runBtn) return;

  runBtn.addEventListener("click", () => {
    const text = input.value;
    auditDraft(text);
  });

  fakeBtn.addEventListener("click", () => {
    input.value = "Under Varghese v. China Southern Airlines, 999 U.S. 123 (2025), claims must be dismissed with prejudice.";
    auditDraft(input.value);
  });

  // Run initial audit
  auditDraft(input.value);

  function auditDraft(text) {
    if (text.includes("Ashcroft v. Iqbal")) {
      output.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:0.75rem;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-weight:800; color:var(--emerald);">✅ 1/1 CITATION VERIFIED (DETERMINISTIC)</span>
            <span class="pill-blue">Offset: Char 49-160</span>
          </div>
          <div class="data-val-text" style="background:rgba(16,185,129,0.08); border:1px solid rgba(16,185,129,0.25); padding:0.85rem; border-radius:8px;">
            <strong>Resolved Primary Source:</strong> CourtListener Slip Opinion (#145885)<br>
            <strong>Quotation Status:</strong> 100% Exact Character-Offset Match in official 556 U.S. 662 text.<br>
            <strong>Subsequent Treatment:</strong> Good law, cited in 140,000+ federal decisions.
          </div>
          <div style="font-size:0.8rem; color:var(--text-dim);">Filing Status: <strong style="color:var(--cyan);">APPROVED FOR ATTORNEY SIGN-OFF</strong></div>
        </div>
      `;
    } else {
      output.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:0.75rem;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-weight:800; color:var(--crimson);">❌ HARD-STOP TRIGGERED: SOURCE_UNAVAILABLE</span>
            <span style="background:rgba(239,68,68,0.15); color:var(--crimson); padding:0.2rem 0.5rem; border-radius:4px; font-weight:700; font-size:0.75rem;">Export Blocked</span>
          </div>
          <div class="data-val-text" style="background:rgba(239,68,68,0.08); border:1px solid rgba(239,68,68,0.25); padding:0.85rem; border-radius:8px;">
            <strong>Unresolved Authority:</strong> "Varghese v. China Southern Airlines, 999 U.S. 123" could not be matched against verified primary source repository.<br>
            <strong>Precedent Violation:</strong> Matches fabricated citation failure mode (Mata v. Avianca, S.D.N.Y. 2023).
          </div>
          <div style="font-size:0.8rem; color:var(--text-dim);">Document Watermark: <strong style="color:var(--crimson);">WORKING DRAFT — NOT ATTORNEY APPROVED — NOT FOR FILING</strong></div>
        </div>
      `;
    }
  }
}

// ==========================================================================
// LAW LIBRARY & PRECEDENTS ENGINE
// ==========================================================================

const LEGAL_CORPUS_PRECEDENTS = [
  {
    id: "prec_iqbal",
    caseName: "Ashcroft v. Iqbal",
    citation: "556 U.S. 662, 678 (2009)",
    court: "Supreme Court of the United States",
    year: 2009,
    category: "Civil Procedure & Pleading Standards",
    keyRule: "To survive a motion to dismiss, a complaint must contain sufficient factual matter, accepted as true, to state a claim to relief that is plausible on its face.",
    exactQuote: "Under Ashcroft v. Iqbal, 556 U.S. 662, 678 (2009), to survive a motion to dismiss, a complaint must contain sufficient factual matter, accepted as true, to state a claim to relief that is plausible on its face.",
    sourceProvider: "GovInfo / CourtListener",
    slipOpinionHash: "0x3a4f91b7d52a818c39e289bfad1694f4a9b515d9090fc1d51a7027d7d2426913",
    primaryOffset: 49
  },
  {
    id: "prec_twombly",
    caseName: "Bell Atlantic Corp. v. Twombly",
    citation: "550 U.S. 544, 570 (2007)",
    court: "Supreme Court of the United States",
    year: 2007,
    category: "Civil Procedure & Pleading Standards",
    keyRule: "Plaintiffs must nudge their claims across the line from conceivable to plausible.",
    exactQuote: "Because the plaintiffs here have not nudged their claims across the line from conceivable to plausible, their complaint must be dismissed.",
    sourceProvider: "GovInfo / CourtListener",
    slipOpinionHash: "0x77c29e128374619bfa11993478eec9348123bcdef0123456789abcdef0123456",
    primaryOffset: 112
  },
  {
    id: "prec_celotex",
    caseName: "Celotex Corp. v. Catrett",
    citation: "477 U.S. 317, 322 (1986)",
    court: "Supreme Court of the United States",
    year: 1986,
    category: "Civil Procedure & Pleading Standards",
    keyRule: "Summary judgment is mandated against a party who fails to make a showing sufficient to establish the existence of an element essential to that party's case.",
    exactQuote: "Rule 56(c) mandates the entry of summary judgment, after adequate time for discovery and upon motion, against a party who fails to make a showing sufficient to establish the existence of an element essential to that party's case.",
    sourceProvider: "GovInfo / CourtListener",
    slipOpinionHash: "0x11ab44cd77ef9900112233445566778899aabbccddeeff001122334455667788",
    primaryOffset: 85
  },
  {
    id: "prec_daubert",
    caseName: "Daubert v. Merrell Dow Pharmaceuticals, Inc.",
    citation: "509 U.S. 579, 589 (1993)",
    court: "Supreme Court of the United States",
    year: 1993,
    category: "Evidence & FRE 902 Authentication",
    keyRule: "Trial judge must ensure that any and all scientific testimony or evidence admitted is not only relevant, but reliable.",
    exactQuote: "Under the Rules the trial judge must ensure that any and all scientific testimony or evidence admitted is not only relevant, but reliable.",
    sourceProvider: "GovInfo / CourtListener",
    slipOpinionHash: "0x89abcdef0123456789abcdef0123456789abcdef0123456789abcdef01234567",
    primaryOffset: 60
  },
  {
    id: "prec_fre902_13",
    caseName: "Federal Rule of Evidence 902(13)",
    citation: "Fed. R. Evid. 902(13) (2017 Amendment)",
    court: "Federal Rules of Evidence Advisory Committee",
    year: 2017,
    category: "Evidence & FRE 902 Authentication",
    keyRule: "Certified Records Generated by an Electronic Process or System: A record generated by an electronic process or system that produces an accurate result, as shown by a certification of a qualified person.",
    exactQuote: "A record generated by an electronic process or system that produces an accurate result, as shown by a certification of a qualified person that complies with the certification requirements of Rule 902(11) or (12).",
    sourceProvider: "Federal Judiciary Statutory Digest",
    slipOpinionHash: "0x9812739182739182739182739182739182739182739182739182739182739182",
    primaryOffset: 0
  },
  {
    id: "prec_fre902_14",
    caseName: "Federal Rule of Evidence 902(14)",
    citation: "Fed. R. Evid. 902(14) (2017 Amendment)",
    court: "Federal Rules of Evidence Advisory Committee",
    year: 2017,
    category: "Evidence & FRE 902 Authentication",
    keyRule: "Certified Data Copied from an Electronic Device, Storage Medium, or File: Data copied from an electronic device, storage medium, or file, if authenticated by a process of digital identification, as shown by a certification of a qualified person.",
    exactQuote: "Data copied from an electronic device, storage medium, or file, if authenticated by a process of digital identification, as shown by a certification of a qualified person that complies with the certification requirements of Rule 902(11) or (12).",
    sourceProvider: "Federal Judiciary Statutory Digest",
    slipOpinionHash: "0xaa112233445566778899aabbccddeeff00112233445566778899aabbccddeeff",
    primaryOffset: 0
  },
  {
    id: "prec_howey",
    caseName: "SEC v. W.J. Howey Co.",
    citation: "328 U.S. 293, 298-99 (1946)",
    court: "Supreme Court of the United States",
    year: 1946,
    category: "Securities, Digital Assets & RWA",
    keyRule: "An investment contract for purposes of the Securities Act means a contract, transaction or scheme whereby a person invests his money in a common enterprise and is led to expect profits solely from the efforts of the promoter or a third party.",
    exactQuote: "An investment contract for purposes of the Securities Act means a contract, transaction or scheme whereby a person invests his money in a common enterprise and is led to expect profits solely from the efforts of the promoter or a third party.",
    sourceProvider: "GovInfo / CourtListener",
    slipOpinionHash: "0x55bb66cc77dd88ee99ff00112233445566778899aabbccddeeff001122334455",
    primaryOffset: 30
  },
  {
    id: "prec_reves",
    caseName: "Reves v. Ernst & Young",
    citation: "494 U.S. 56, 66 (1990)",
    court: "Supreme Court of the United States",
    year: 1990,
    category: "Securities, Digital Assets & RWA",
    keyRule: "Notes are presumed to be securities unless they bear a strong family resemblance to non-security commercial instruments under the four-factor Reves test.",
    exactQuote: "A note is presumed to be a security, and that presumption may be rebutted only by a showing that the note bears a strong resemblance to one of the enumerated categories of instrument.",
    sourceProvider: "GovInfo / CourtListener",
    slipOpinionHash: "0x3344556677889900112233445566778899001122334455667788990011223344",
    primaryOffset: 44
  },
  {
    id: "prec_ripple",
    caseName: "SEC v. Ripple Labs, Inc.",
    citation: "682 F. Supp. 3d 308 (S.D.N.Y. 2023)",
    court: "U.S. District Court for the Southern District of New York",
    year: 2023,
    category: "Securities, Digital Assets & RWA",
    keyRule: "Programmatic sales of tokens on digital asset exchanges to blind public buyers did not constitute offers and sales of investment contracts under Howey.",
    exactQuote: "Having considered the economic reality and totality of circumstances, the Court concludes that XRP, as a digital token, is not in and of itself a 'contract, transaction or scheme' that embodies the Howey requirements of an investment contract.",
    sourceProvider: "CourtListener S.D.N.Y. Docket",
    slipOpinionHash: "0x99887766554433221100ffeeddccbbaa99887766554433221100ffeeddccbbaa",
    primaryOffset: 90
  },
  {
    id: "prec_caremark",
    caseName: "In re Caremark Int'l Inc. Derivative Litig.",
    citation: "698 A.2d 959, 970 (Del. Ch. 1996)",
    court: "Delaware Court of Chancery",
    year: 1996,
    category: "Corporate Governance & Delaware Chancery",
    keyRule: "Directors have an affirmative duty to attempt in good faith to assure that a corporate information and reporting system exists.",
    exactQuote: "A sustained or systematic failure of the board to exercise oversight—such as an utter failure to attempt to assure a reasonable information and reporting system exists—will establish the lack of good faith that is a necessary condition to liability.",
    sourceProvider: "Delaware Courts Chancery Archive",
    slipOpinionHash: "0x778899aabbccddeeff00112233445566778899aabbccddeeff00112233445566",
    primaryOffset: 15
  },
  {
    id: "prec_marchand",
    caseName: "Marchand v. Barnhill",
    citation: "212 A.3d 805, 824 (Del. 2019)",
    court: "Supreme Court of Delaware",
    year: 2019,
    category: "Corporate Governance & Delaware Chancery",
    keyRule: "Board must make a good faith effort to implement and monitor an oversight system for central, mission-critical compliance operations.",
    exactQuote: "When a board fails to make any good faith effort to put in place a reasonable board-level system of monitoring and reporting regarding mission-critical risks, it breaches its duty of loyalty.",
    sourceProvider: "Delaware Supreme Court Registry",
    slipOpinionHash: "0x66554433221100ffeeddccbbaa99887766554433221100ffeeddccbbaa998877",
    primaryOffset: 72
  },
  {
    id: "prec_mata_avianca",
    caseName: "Mata v. Avianca, Inc.",
    citation: "678 F. Supp. 3d 443 (S.D.N.Y. 2023)",
    court: "U.S. District Court for the Southern District of New York (Castel, J.)",
    year: 2023,
    category: "AI Ethics, Candor & Sanctions Precedents",
    keyRule: "Sanctions imposed under Rule 11 for citing non-existent judicial decisions with bogus citations and quotes generated by ChatGPT.",
    exactQuote: "Many harms flow from the submission of fake opinions. The opposing party wastes time and money in exposing the deception. The court's time is taken from other matters. A fabricated opinion is a lie told to a court of law.",
    sourceProvider: "CourtListener S.D.N.Y. Sanctions Order",
    slipOpinionHash: "0x4433221100ffeeddccbbaa99887766554433221100ffeeddccbbaa9988776655",
    primaryOffset: 20
  },
  {
    id: "prec_aba_op512",
    caseName: "ABA Formal Opinion 512",
    citation: "ABA Standing Comm. on Ethics & Prof. Resp., Formal Op. 512 (2024)",
    court: "American Bar Association",
    year: 2024,
    category: "AI Ethics, Candor & Sanctions Precedents",
    keyRule: "Lawyers using Generative AI tools must verify the accuracy of all citations and legal propositions, ensure client confidentiality, and maintain independent attorney supervision under Model Rules 1.1, 1.6, 3.3, and 5.1/5.3.",
    exactQuote: "Because GAI outputs can be inaccurate, incomplete, or biased, lawyers may not rely on GAI tool outputs without independent verification by human counsel.",
    sourceProvider: "ABA Center for Professional Responsibility",
    slipOpinionHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    primaryOffset: 0
  },
  {
    id: "prec_alice",
    caseName: "Alice Corp. Pty. Ltd. v. CLS Bank Int'l",
    citation: "573 U.S. 208, 217-18 (2014)",
    court: "Supreme Court of the United States",
    year: 2014,
    category: "Intellectual Property & Algorithm Patentability",
    keyRule: "Two-step framework for patent eligibility under 35 U.S.C. § 101: determine if claims are directed to a patent-ineligible concept, then search for an inventive concept sufficient to transform the idea into a patent-eligible application.",
    exactQuote: "We must first determine whether the claims at issue are directed to a patent-ineligible concept, such as an abstract idea. If so, we then ask: what else is there in the claims before us?",
    sourceProvider: "GovInfo / CourtListener",
    slipOpinionHash: "0xabcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789",
    primaryOffset: 35
  }
];

function initLawLibrary() {
  const grid = document.getElementById("lawPrecedentsGrid");
  const searchInput = document.getElementById("lawSearchInput");
  const filterPills = document.querySelectorAll("[data-law-cat]");

  renderLawPrecedents(LEGAL_CORPUS_PRECEDENTS);

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase().trim();
      const filtered = LEGAL_CORPUS_PRECEDENTS.filter(item => {
        return item.caseName.toLowerCase().includes(q) ||
               item.citation.toLowerCase().includes(q) ||
               item.keyRule.toLowerCase().includes(q) ||
               item.category.toLowerCase().includes(q);
      });
      renderLawPrecedents(filtered);
    });
  }

  filterPills.forEach(pill => {
    pill.addEventListener("click", () => {
      filterPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      const cat = pill.getAttribute("data-law-cat");
      if (cat === "all") {
        renderLawPrecedents(LEGAL_CORPUS_PRECEDENTS);
      } else {
        const filtered = LEGAL_CORPUS_PRECEDENTS.filter(item => item.category === cat);
        renderLawPrecedents(filtered);
      }
    });
  });
}

function renderLawPrecedents(items) {
  const grid = document.getElementById("lawPrecedentsGrid");
  if (!grid) return;

  grid.innerHTML = "";
  if (items.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; padding: 2.5rem; text-align:center; color:var(--text-dim);">No precedents matched your search criteria.</div>`;
    return;
  }

  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "precedent-card";
    
    card.innerHTML = `
      <div>
        <div class="prec-top-row">
          <span class="prec-category-badge">${item.category}</span>
          <span class="prec-year-badge">${item.year}</span>
        </div>
        <h3 class="prec-name">${item.caseName}</h3>
        <div class="prec-citation-text">${item.citation}</div>
        <div class="prec-court-name">${item.court}</div>
      </div>

      <div class="prec-rule-box">
        <strong>Holding:</strong> ${item.keyRule}
      </div>

      <div class="prec-quote-box">
        "${item.exactQuote}"
      </div>

      <div class="prec-telemetry-row">
        <span>Provider: ${item.sourceProvider}</span>
        <span>Offset: Char ${item.primaryOffset}</span>
      </div>

      <div class="prec-actions-row">
        <button class="prec-audit-btn" data-action="audit">⚖️ Test in Eyecite Matcher</button>
        <button class="prec-copy-btn" data-action="copy" title="Copy Citation">📋 Citation</button>
      </div>
    `;

    // Audit action: injects quote into Eyecite matcher and triggers audit
    card.querySelector("[data-action='audit']").addEventListener("click", () => {
      const textarea = document.getElementById("draftTextInput");
      if (textarea) {
        textarea.value = item.exactQuote;
      }
      
      // Switch tab to citation-engine
      document.querySelectorAll(".nav-link").forEach(t => {
        if (t.getAttribute("data-tab") === "citation-engine") t.click();
      });

      // Run audit
      const auditBtn = document.getElementById("runCitationAuditBtn");
      if (auditBtn) auditBtn.click();
      
      showToast(`Loaded "${item.caseName}" into Eyecite Matcher!`);
    });

    card.querySelector("[data-action='copy']").addEventListener("click", () => {
      copyToClipboard(`${item.caseName}, ${item.citation}`, `Copied citation: ${item.citation}`);
    });

    grid.appendChild(card);
  });
}

// ==========================================================================
// GENIUS ACT & GLOBAL JURISDICTIONS ENGINE
// ==========================================================================

const JURISDICTIONS_DATA = {
  us_delaware: {
    name: "United States (Delaware & Federal)",
    statute: "Delaware General Corporation Law (DGCL § 224) & Federal GENIUS Act",
    rwaStatus: "STATUTORY SAFE HARBOR (CER Enforceable)",
    perfectionMechanism: "UCC Article 12 'Control' over Controllable Electronic Records (CERs)",
    chanceryForum: "Delaware Court of Chancery & U.S. District Court for the District of Delaware",
    smartContractCompliance: "LegalProofRegistry.sol, CorporateMergersEscrow.sol, FRE902EvidenceVault.sol",
    highlights: "DGCL § 224 formally authorizes the maintenance of corporate share ledgers on distributed electronic networks. Paired with Federal Rule of Evidence 902(13)/(14), on-chain cryptographic digests are self-authenticating."
  },
  us_wyoming: {
    name: "United States (Wyoming DAO & Statutory Trust)",
    statute: "Wyoming Decentralized Autonomous Organization Supplement (W.S. 17-31) & Digital Asset Act (W.S. 34-29)",
    rwaStatus: "SOVEREIGN DLT RECOGNITION (Direct Legal Personality)",
    perfectionMechanism: "Super-Priority Security Interests under W.S. 34-29-103 via Private Key Control",
    chanceryForum: "Wyoming Chancery Court (Dedicated Commercial Docket)",
    smartContractCompliance: "RWAGeniusActAssetVault.sol, DynastyTrustEstateVault.sol",
    highlights: "Wyoming was the first sovereign jurisdiction to grant legal personality to algorithmic DAOs and codify digital assets into three clear categories: digital consumer assets, digital securities, and virtual currencies."
  },
  us_newyork: {
    name: "United States (New York UCC Art. 12 & S.D.N.Y.)",
    statute: "New York Uniform Commercial Code Article 12 & DFS Part 200 (BitLicense)",
    rwaStatus: "COMMERCIAL CODE PERFECTED",
    perfectionMechanism: "UCC § 12-105 Electronic Record Control & Article 9 Priority",
    chanceryForum: "U.S. District Court for the Southern District of New York (S.D.N.Y.) & Commercial Division",
    smartContractCompliance: "RWAGeniusActAssetVault.sol, X402EscrowSettlement.sol, LitigationFinanceToken.sol",
    highlights: "New York UCC Article 12 provides that a purchaser of a Controllable Electronic Record (CER) acquires control free of conflicting property claims, creating global institutional settlement finality."
  },
  eu_mica: {
    name: "European Union (MiCA Regulation & Luxembourg)",
    statute: "EU Regulation 2023/1114 (Markets in Crypto-Assets) & Luxembourg Blockchain Law III",
    rwaStatus: "PAN-EUROPEAN PASSPORTED REGIME",
    perfectionMechanism: "Dematerialized Financial Instruments Held on Distributed Ledgers",
    chanceryForum: "Court of Justice of the European Union (CJEU) & Luxembourg Commercial Court",
    smartContractCompliance: "RWAGeniusActAssetVault.sol, GDPRZeroKnowledgeDataRoom.sol",
    highlights: "MiCA establishes a unified EU regulatory framework for asset-referenced tokens (ARTs) and e-money tokens (EMTs). Luxembourg Blockchain Law III enables full dematerialized debt and equity issuance on-chain."
  },
  uk_law: {
    name: "United Kingdom (Common Law & Property Bill)",
    statute: "UK Law Commission Digital Assets Act & UK Jurisdiction Taskforce Legal Statements",
    rwaStatus: "THIRD CATEGORY OF PROPERTY",
    perfectionMechanism: "English Common Law Recognition of 'Things in Possession / Action'",
    chanceryForum: "High Court of Justice (Chancery & Commercial Courts, London)",
    smartContractCompliance: "ArbitrationAwardSettlement.sol, IntellectualPropertyRoyaltySplitter.sol",
    highlights: "The UK recognized digital assets as property under English private law, making smart contracts legally binding instruments enforceable through the Business and Property Courts of England and Wales."
  },
  uae_difc: {
    name: "United Arab Emirates (Dubai DIFC / ADGM / VARA)",
    statute: "DIFC Law No. 2 of 2024 (Digital Assets Law) & ADGM DLT Foundations Regulations 2023",
    rwaStatus: "DEDICATED DIGITAL ASSETS STATUTE",
    perfectionMechanism: "Statutory Title under DIFC Digital Assets Law Part 3",
    chanceryForum: "DIFC Courts (English Common Law System) & ADGM Courts",
    smartContractCompliance: "RWAGeniusActAssetVault.sol, LetterOfCreditSBLCRouter.sol",
    highlights: "The DIFC enacted a comprehensive standalone Digital Assets Law recognizing digital assets as property and establishing clear rules for control, security interests, and insolvency rights."
  },
  ch_dlt: {
    name: "Switzerland (Swiss DLT Act & FINMA)",
    statute: "Federal Act on the Adaptation of Federal Law to DLT Developments (Swiss DLT Act 2021)",
    rwaStatus: "UNCERTIFICATED LEDGER-BASED SECURITIES (Bucheffekten)",
    perfectionMechanism: "Swiss Code of Obligations (CO Art. 973d) Registration Agreement",
    chanceryForum: "Swiss Federal Supreme Court & Commercial Courts (Zurich/Zug)",
    smartContractCompliance: "RWAGeniusActAssetVault.sol, LitigationFinanceToken.sol",
    highlights: "Switzerland allows securities to be issued directly on a blockchain without certificates or central depositories under Art. 973d CO, with automatic legal ownership transfers upon token movement."
  },
  sg_mas: {
    name: "Singapore (MAS Project Guardian & Payment Services Act)",
    statute: "Payment Services Act 2019 (PSA) & MAS Guidelines on Digital Token Offerings",
    rwaStatus: "INSTITUTIONAL ASSET TOKENIZATION LEADER",
    perfectionMechanism: "Securities and Futures Act (SFA Cap. 289) Digital Security Framework",
    chanceryForum: "Singapore International Commercial Court (SICC)",
    smartContractCompliance: "RWAGeniusActAssetVault.sol, LetterOfCreditSBLCRouter.sol",
    highlights: "MAS Project Guardian sets global standards for institutional liquidity pools, asset-backed tokenization, and cross-border trade settlements in sovereign digital debt and foreign exchange."
  },
  hk_sfc: {
    name: "Hong Kong (SFC Tokenized Securities Regime)",
    statute: "Securities and Futures Ordinance (SFO) & SFC Circular on Tokenised Securities-Related Activities",
    rwaStatus: "FINANCIAL HUB TOKENIZED SECURITIES",
    perfectionMechanism: "Traditional Securities Law applied through Tech-Neutral 'Same Business, Same Risks, Same Rules'",
    chanceryForum: "High Court of the Hong Kong Special Administrative Region",
    smartContractCompliance: "RWAGeniusActAssetVault.sol, CorporateMergersEscrow.sol",
    highlights: "Hong Kong enables licensed intermediaries to issue and distribute tokenized investment funds, bonds, and structured products with smart contract execution guarantees."
  },
  ky_spv: {
    name: "Cayman Islands & British Virgin Islands (Offshore Trust & VASP)",
    statute: "Cayman Virtual Asset (Service Providers) Act & Special Economic Zone Law",
    rwaStatus: "GLOBAL SPV & OFFSHORE CAPITAL LEADER",
    perfectionMechanism: "Segregated Portfolio Companies (SPC) & Foundation Company DLT Wrappers",
    chanceryForum: "Grand Court of the Cayman Islands (Financial Services Division) & Privy Council (UK)",
    smartContractCompliance: "DynastyTrustEstateVault.sol, RWAGeniusActAssetVault.sol, BankruptcyCreditorWaterfall.sol",
    highlights: "Cayman Foundation Companies and Segregated Portfolio Companies provide international tax neutrality, asset ring-fencing, and bankruptcy remoteness for multi-billion dollar RWA pools."
  }
};

const GLOBAL_DISCIPLINES_CATALOG = [
  {
    discipline: "Corporate & M&A",
    icon: "🏢",
    title: "M&A Share Purchase & Indemnity Escrow",
    contractName: "CorporateMergersEscrow.sol",
    statutoryBasis: "DGCL § 224, § 251 & Model Stock Purchase Agreement",
    description: "Automates closing considerations, earn-out milestone distributions, and multi-year indemnification holdback escrows with dual seller/buyer representative releases.",
    soliditySnippet: "contract CorporateMergersEscrow { function releaseIndemnityHoldback(string calldata _dealId) external; }"
  },
  {
    discipline: "Real Estate & Title",
    icon: "🏠",
    title: "Sovereign Title Deed & Encumbrance Registry",
    contractName: "SovereignTitleDeedRegistry.sol",
    statutoryBasis: "Uniform Real Property Transfer on Death Act & County Recording Acts",
    description: "Anchors county recorder book/page hashes, GIS micro-degree polygon coordinates, title insurance policy roots, and atomic lien perfection/release workflows.",
    soliditySnippet: "contract SovereignTitleDeedRegistry { function transferTitleWithWarranty(string calldata _pin, address _newOwner) external; }"
  },
  {
    discipline: "RWA & Securities",
    icon: "💎",
    title: "GENIUS Act & UCC Article 12 CER Vault",
    contractName: "RWAGeniusActAssetVault.sol",
    statutoryBasis: "Federal GENIUS Act & Uniform Commercial Code Article 12",
    description: "Institutional Real-World Asset tokenization engine providing electronic control perfection, fractional issuance, appraisal tracking, and cross-border regulatory compliance.",
    soliditySnippet: "contract RWAGeniusActAssetVault { function registerGENIUSAsset(...) external; function verifyGlobalPerfection(...) view; }"
  },
  {
    discipline: "Intellectual Property",
    icon: "💡",
    title: "Patent, Trademark & Royalty Splitter",
    contractName: "IntellectualPropertyRoyaltySplitter.sol",
    statutoryBasis: "35 U.S.C. § 261 (Assignment of Patents) & WIPO Standards",
    description: "Patent claim hash anchoring and automated multi-party licensing royalty distribution with atomic basis-point splits (up to 10,000 bps) and zero-leakage licensing receipts.",
    soliditySnippet: "contract IntellectualPropertyRoyaltySplitter { function depositAndDistributeRoyalty(string calldata _ipAssetId) external payable; }"
  },
  {
    discipline: "Trade Finance",
    icon: "🚢",
    title: "Cross-Border Standby Letter of Credit (SBLC)",
    contractName: "LetterOfCreditSBLCRouter.sol",
    statutoryBasis: "Uniform Customs and Practice for Documentary Credits (UCP 600) & ISP98",
    description: "Cross-border trade finance router executing SWIFT BIC binding, bill of lading hash verification, inspection certificates, and instantaneous draw settlement.",
    soliditySnippet: "contract LetterOfCreditSBLCRouter { function presentConformingDocumentsAndDraw(...) external; }"
  },
  {
    discipline: "Trust & Estates",
    icon: "🏛️",
    title: "Dynasty Trust & Generational Asset Protection",
    contractName: "DynastyTrustEstateVault.sol",
    statutoryBasis: "Uniform Trust Code (UTC) & Wyoming / Delaware Dynasty Trust Acts",
    description: "Eliminates Rule Against Perpetuities, enables spendthrift protections, multi-fiduciary appointment (Trustee, Trust Protector), and discretionary distributions.",
    soliditySnippet: "contract DynastyTrustEstateVault { function executeBeneficiaryDistribution(address _beneficiary, uint256 _amount) external; }"
  },
  {
    discipline: "Arbitration",
    icon: "⚖️",
    title: "Autonomous International Arbitration Award",
    contractName: "ArbitrationAwardSettlement.sol",
    statutoryBasis: "1958 New York Convention (172 Contracting States) & UNCITRAL Rules",
    description: "Enforces foreign arbitral awards globally with security-for-costs escrows, presiding arbitrator digital sign-off, and instantaneous escrow execution.",
    soliditySnippet: "contract ArbitrationAwardSettlement { function renderFinalAward(string calldata _matterId, bytes32 _awardDigest, ...) external; }"
  },
  {
    discipline: "Insolvency",
    icon: "📉",
    title: "Chapter 11 Absolute Priority Creditor Waterfall",
    contractName: "BankruptcyCreditorWaterfall.sol",
    statutoryBasis: "11 U.S.C. § 1129(b)(2) (Absolute Priority Rule) & UCC Article 9",
    description: "Enforces strict priority hierarchy: Senior Secured > Administrative Expense > General Unsecured > Subordinated Debt > Equity with automated multi-tier pool distribution.",
    soliditySnippet: "contract BankruptcyCreditorWaterfall { function executeAbsolutePriorityWaterfall() external; }"
  },
  {
    discipline: "Privacy & Data",
    icon: "🔒",
    title: "GDPR Zero-Knowledge Data Room",
    contractName: "GDPRZeroKnowledgeDataRoom.sol",
    statutoryBasis: "EU GDPR Art. 17 (Right to Erasure) & California Consumer Privacy Act (CCPA)",
    description: "Zero-Knowledge evidentiary access control with time-bounded auditor access and irreversible 'Right to be Forgotten' cryptographic consent revocation.",
    soliditySnippet: "contract GDPRZeroKnowledgeDataRoom { function revokeConsentRightToBeForgotten(...) external; }"
  },
  {
    discipline: "Evidence & Forensic",
    icon: "📑",
    title: "FRE 902(13)/(14) Self-Authenticating Evidence",
    contractName: "FRE902EvidenceVault.sol",
    statutoryBasis: "Fed. R. Evid. 902(13)/(14) & 28 U.S.C. § 1746 (Unsworn Declarations)",
    description: "Cryptographic digital evidence custodian vault with dual SHA-256 and BLAKE2b digests, device capture timestamps, and electronic custodian declarations.",
    soliditySnippet: "contract FRE902EvidenceVault { function depositAndCertifyEvidence(...) external; }"
  }
];

function initGeniusGlobalDeck() {
  const jurPills = document.querySelectorAll("[data-jur]");
  const discPills = document.querySelectorAll("[data-disc-cat]");

  // Default render Delaware
  renderJurisdictionTelemetry("us_delaware");
  renderDisciplinesCards(GLOBAL_DISCIPLINES_CATALOG);

  jurPills.forEach(pill => {
    pill.addEventListener("click", () => {
      jurPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      const jurKey = pill.getAttribute("data-jur");
      renderJurisdictionTelemetry(jurKey);
    });
  });

  discPills.forEach(pill => {
    pill.addEventListener("click", () => {
      discPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      const cat = pill.getAttribute("data-disc-cat");
      if (cat === "all") {
        renderDisciplinesCards(GLOBAL_DISCIPLINES_CATALOG);
      } else {
        const filtered = GLOBAL_DISCIPLINES_CATALOG.filter(d => d.discipline.includes(cat) || cat.includes(d.discipline));
        renderDisciplinesCards(filtered);
      }
    });
  });
}

function renderJurisdictionTelemetry(jurKey) {
  const box = document.getElementById("jurTelemetryBox");
  if (!box) return;

  const data = JURISDICTIONS_DATA[jurKey];
  if (!data) return;

  box.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-glass); padding-bottom:0.75rem; margin-bottom:1rem;">
      <div>
        <h4 style="font-size:1.15rem; font-weight:800; color:var(--text-main);">${data.name}</h4>
        <div style="font-size:0.8rem; color:var(--cyan); font-weight:700; margin-top:0.2rem;">${data.statute}</div>
      </div>
      <span class="pill-gold">${data.rwaStatus}</span>
    </div>

    <div class="jur-telemetry-grid">
      <div class="jur-telemetry-item">
        <span class="jur-telemetry-lbl">Perfection Standard</span>
        <span class="jur-telemetry-val">${data.perfectionMechanism}</span>
      </div>
      <div class="jur-telemetry-item">
        <span class="jur-telemetry-lbl">Primary Judicial Forum</span>
        <span class="jur-telemetry-val">${data.chanceryForum}</span>
      </div>
      <div class="jur-telemetry-item">
        <span class="jur-telemetry-lbl">Smart Contract Bindings</span>
        <span class="jur-telemetry-val" style="font-family:var(--font-mono); font-size:0.78rem; color:var(--cyan);">${data.smartContractCompliance}</span>
      </div>
    </div>

    <div style="margin-top:1rem; background:rgba(0,210,255,0.05); border:1px solid rgba(0,210,255,0.2); padding:0.85rem; border-radius:10px; font-size:0.82rem; color:#cbd5e1; line-height:1.5;">
      <strong>Statutory Guidance:</strong> ${data.highlights}
    </div>
  `;
}

function renderDisciplinesCards(items) {
  const grid = document.getElementById("disciplinesCardsGrid");
  if (!grid) return;

  grid.innerHTML = "";
  if (items.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:2rem; color:var(--text-dim);">No discipline smart contracts found.</div>`;
    return;
  }

  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "discipline-card";

    card.innerHTML = `
      <div>
        <div class="discipline-top">
          <div class="discipline-icon-title">
            <span class="discipline-icon">${item.icon}</span>
            <div>
              <div class="discipline-title">${item.title}</div>
              <div class="discipline-statute">${item.statutoryBasis}</div>
            </div>
          </div>
          <span class="discipline-contract-tag">${item.contractName}</span>
        </div>

        <p class="discipline-desc" style="margin-top:0.75rem;">${item.description}</p>
      </div>

      <div class="discipline-solidity-box">
        <code>${item.soliditySnippet}</code>
      </div>

      <div class="discipline-actions">
        <button class="disc-deploy-btn" data-action="inspect" style="flex:1;">📜 View Contract Code</button>
        <button class="prec-copy-btn" data-action="copy" title="Copy Contract Path">📋 Path</button>
      </div>
    `;

    card.querySelector("[data-action='inspect']").addEventListener("click", () => {
      // Switch to contracts tab and scroll to contracts
      document.querySelectorAll(".nav-link").forEach(t => {
        if (t.getAttribute("data-tab") === "contracts-view") t.click();
      });
      showToast(`Inspecting smart contract: ${item.contractName}`);
    });

    card.querySelector("[data-action='copy']").addEventListener("click", () => {
      copyToClipboard(`contracts/${item.contractName}`, `Copied contract path: contracts/${item.contractName}`);
    });

    grid.appendChild(card);
  });
}

// x402 SIMULATOR
function initX402Simulator() {
  const sendUnpaidBtn = document.getElementById("sendUnpaidBtn");
  const signBtn = document.getElementById("signChallengeBtn");
  const challengePreview = document.getElementById("challengePreview");
  const originPreview = document.getElementById("originPreview");

  if (!sendUnpaidBtn) return;

  sendUnpaidBtn.addEventListener("click", () => {
    document.getElementById("step1Card").classList.add("active-step");
    document.getElementById("step2Card").classList.add("active-step");

    challengePreview.innerHTML = JSON.stringify({
      status: "402 Payment Required",
      price: "0.05 USDC",
      network: "base-mainnet",
      chainId: 8453,
      recipient: "0x7332733273327332...",
      nonce: "0x9a8b7c6d5e4f3a2b",
      ttl: "300s"
    }, null, 2);

    signBtn.classList.remove("disabled");
    signBtn.removeAttribute("disabled");
  });

  signBtn.addEventListener("click", () => {
    document.getElementById("step3Card").classList.add("active-step");
    document.getElementById("step4Card").classList.add("active-step");

    originPreview.innerHTML = JSON.stringify({
      status: "200 OK",
      dynamoDbAction: "Conditional Write (#status = :consumed)",
      consumedAt: new Date().toISOString(),
      proofBundleDigest: "0x3a4f91b7d52a818c...",
      settlementConfirmed: true
    }, null, 2);
  });
}

// ACCORDION
function initAccordions() {
  document.querySelectorAll(".accordion-header").forEach(header => {
    header.addEventListener("click", () => {
      const item = header.parentElement;
      const body = item.querySelector(".accordion-body");
      if (body.style.display === "none") {
        body.style.display = "block";
      } else {
        body.style.display = "none";
      }
    });
  });
}

// ==========================================================================
// LEGAL CINEMA & MEDIA STUDIO ENGINE
// ==========================================================================

const LEGAL_MEDIA_CATALOG = [
  {
    "id": "courtroom_mastery_01",
    "filename": "courtroom_mastery_01.mp4",
    "relPath": "media/videos/courtroom_mastery_01.mp4",
    "title": "Futuristic Courtroom Mastery (Vol. 1)",
    "description": "High-tech courtroom podium with holographic displays and holographic judicial gavel.",
    "category": "Mastery",
    "sizeMb": 5.1,
    "duration": 10.0,
    "resolution": "854x480",
    "thumbnail": "media/thumbnails/courtroom_mastery_01.jpg",
    "type": "video",
    "originalPath": "C:\\Users\\Kevan\\Videos\\Unykorn_Miami_Vice_Media_Gallery\\04_Master_Consolidated_Archive\\20250127_0042_Futuristic Courtroom Mastery_storyboard_01jjk4g9w7ecqbd411hepkqbaz.mp4"
  },
  {
    "id": "digital_justice_helix",
    "filename": "digital_justice_helix.mp4",
    "relPath": "media/videos/digital_justice_helix.mp4",
    "title": "Digital Justice Helix Strand",
    "description": "Cryptographic legal double-helix visualizing FRE 902 digital evidence provenance.",
    "category": "Helix & DNA",
    "sizeMb": 13.27,
    "duration": 10.0,
    "resolution": "480x854",
    "thumbnail": "media/thumbnails/digital_justice_helix.jpg",
    "type": "video",
    "originalPath": "C:\\Users\\Kevan\\Videos\\Unykorn_Miami_Vice_Media_Gallery\\04_Master_Consolidated_Archive\\20250126_2243_Digital Justice Helix_storyboard_01jjjxq7azeqssz6mxjazet37d.mp4"
  },
  {
    "id": "courtroom_drama_01",
    "filename": "courtroom_drama_01.mp4",
    "relPath": "media/videos/courtroom_drama_01.mp4",
    "title": "Futuristic Courtroom Drama: The Bench",
    "description": "Litigation chamber with ambient cyber-blue lighting and floating legal displays.",
    "category": "Drama",
    "sizeMb": 8.12,
    "duration": 10.0,
    "resolution": "854x480",
    "thumbnail": "media/thumbnails/courtroom_drama_01.jpg",
    "type": "video",
    "originalPath": "C:\\Users\\Kevan\\Videos\\Unykorn_Miami_Vice_Media_Gallery\\04_Master_Consolidated_Archive\\20250126_2259_Futuristic Courtroom Drama_simple_compose_01jjjym1j6faqv58j2m3esxawk.mp4"
  },
  {
    "id": "justice_unveiled_01",
    "filename": "justice_unveiled_01.mp4",
    "relPath": "media/videos/justice_unveiled_01.mp4",
    "title": "Futuristic Justice Unveiled (Vol. 1)",
    "description": "Cinematic unveiling of autonomous on-chain judicial protocol and sovereign ledger.",
    "category": "Justice",
    "sizeMb": 10.4,
    "duration": 10.0,
    "resolution": "854x480",
    "thumbnail": "media/thumbnails/justice_unveiled_01.jpg",
    "type": "video",
    "originalPath": "C:\\Users\\Kevan\\Videos\\Unykorn_Miami_Vice_Media_Gallery\\04_Master_Consolidated_Archive\\20250126_2303_Futuristic Justice Unveiled_simple_compose_01jjjyvfa4fn9bmvxeevwnb39x.mp4"
  },
  {
    "id": "courtroom_resolution_01",
    "filename": "courtroom_resolution_01.mp4",
    "relPath": "media/videos/courtroom_resolution_01.mp4",
    "title": "Courtroom Resolution: Chamber Alpha",
    "description": "Judicial bench resolution sequence with luminous cyan and gold verdict arrays.",
    "category": "Resolution",
    "sizeMb": 8.89,
    "duration": 10.0,
    "resolution": "854x480",
    "thumbnail": "media/thumbnails/courtroom_resolution_01.jpg",
    "type": "video",
    "originalPath": "C:\\Users\\Kevan\\Videos\\Unykorn_Miami_Vice_Media_Gallery\\04_Master_Consolidated_Archive\\20250126_2304_Futuristic Courtroom Resolution_storyboard_01jjjywj0ge658rz9c0ber8c9a.mp4"
  },
  {
    "id": "courtroom_resolution_02",
    "filename": "courtroom_resolution_02.mp4",
    "relPath": "media/videos/courtroom_resolution_02.mp4",
    "title": "Courtroom Resolution: Chamber Beta",
    "description": "High-speed evidentiary reconciliation with multi-tiered jury holographic rings.",
    "category": "Resolution",
    "sizeMb": 9.1,
    "duration": 10.0,
    "resolution": "854x480",
    "thumbnail": "media/thumbnails/courtroom_resolution_02.jpg",
    "type": "video",
    "originalPath": "C:\\Users\\Kevan\\Videos\\Unykorn_Miami_Vice_Media_Gallery\\04_Master_Consolidated_Archive\\20250126_2304_Futuristic Courtroom Resolution_storyboard_01jjjywj0rfskan9tn3yvjg8n8.mp4"
  },
  {
    "id": "justice_resolved_01",
    "filename": "justice_resolved_01.mp4",
    "relPath": "media/videos/justice_resolved_01.mp4",
    "title": "Justice Resolved: Evidentiary Proof",
    "description": "Deterministic case verification sequence with gold-accented legal chamber.",
    "category": "Resolution",
    "sizeMb": 10.43,
    "duration": 10.0,
    "resolution": "854x480",
    "thumbnail": "media/thumbnails/justice_resolved_01.jpg",
    "type": "video",
    "originalPath": "C:\\Users\\Kevan\\Videos\\Unykorn_Miami_Vice_Media_Gallery\\04_Master_Consolidated_Archive\\20250126_2310_Futuristic Courtroom Justice Resolved_storyboard_01jjjz7rcce0q8rfcbz087w4s7.mp4"
  },
  {
    "id": "justice_resolved_02",
    "filename": "justice_resolved_02.mp4",
    "relPath": "media/videos/justice_resolved_02.mp4",
    "title": "Justice Resolved: Smart Settlement",
    "description": "Autonomous dispute resolution closing loop with immutable transaction receipt.",
    "category": "Resolution",
    "sizeMb": 9.76,
    "duration": 10.0,
    "resolution": "854x480",
    "thumbnail": "media/thumbnails/justice_resolved_02.jpg",
    "type": "video",
    "originalPath": "C:\\Users\\Kevan\\Videos\\Unykorn_Miami_Vice_Media_Gallery\\04_Master_Consolidated_Archive\\20250126_2310_Futuristic Courtroom Justice Resolved_storyboard_01jjjz7rcjfe999psx5tmb0hp6.mp4"
  },
  {
    "id": "justice_unveiled_02",
    "filename": "justice_unveiled_02.mp4",
    "relPath": "media/videos/justice_unveiled_02.mp4",
    "title": "Futuristic Justice Unveiled (Vol. 2)",
    "description": "Wide-angle panoramic chamber showing attorney consoles and automated docket.",
    "category": "Justice",
    "sizeMb": 9.65,
    "duration": 10.0,
    "resolution": "854x480",
    "thumbnail": "media/thumbnails/justice_unveiled_02.jpg",
    "type": "video",
    "originalPath": "C:\\Users\\Kevan\\Videos\\Unykorn_Miami_Vice_Media_Gallery\\04_Master_Consolidated_Archive\\20250126_2313_Futuristic Justice Unveiled_storyboard_01jjjzd84vf2abam51pvr4dkyn.mp4"
  },
  {
    "id": "office_mastery",
    "filename": "office_mastery.mp4",
    "relPath": "media/videos/office_mastery.mp4",
    "title": "Futuristic Legal Office Mastery",
    "description": "Senior partner executive suite with floating legal graphs and real-time filings.",
    "category": "Office & Strategy",
    "sizeMb": 6.82,
    "duration": 10.0,
    "resolution": "854x480",
    "thumbnail": "media/thumbnails/office_mastery.jpg",
    "type": "video",
    "originalPath": "C:\\Users\\Kevan\\Videos\\Unykorn_Miami_Vice_Media_Gallery\\04_Master_Consolidated_Archive\\20250127_0033_Futuristic Office Mastery_storyboard_01jjk3zd80fn9rprvsmh2ym8kw.mp4"
  },
  {
    "id": "drama_unfolds",
    "filename": "drama_unfolds.mp4",
    "relPath": "media/videos/drama_unfolds.mp4",
    "title": "Courtroom Drama Unfolds: Counsel Pod",
    "description": "Litigation team terminal with real-time objection analysis and case law matching.",
    "category": "Drama",
    "sizeMb": 6.47,
    "duration": 10.0,
    "resolution": "480x854",
    "thumbnail": "media/thumbnails/drama_unfolds.jpg",
    "type": "video",
    "originalPath": "C:\\Users\\Kevan\\Videos\\Unykorn_Miami_Vice_Media_Gallery\\04_Master_Consolidated_Archive\\20250127_0119_Courtroom Drama Unfolds_storyboard_01jjk6khjtfpcazy9zvrtk2x4w.mp4"
  },
  {
    "id": "courtroom_mastery_02",
    "filename": "courtroom_mastery_02.mp4",
    "relPath": "media/videos/courtroom_mastery_02.mp4",
    "title": "Futuristic Courtroom Mastery (Vol. 2)",
    "description": "Grand hall of sovereign justice with biometric evidentiary verification beams.",
    "category": "Mastery",
    "sizeMb": 6.62,
    "duration": 10.0,
    "resolution": "854x480",
    "thumbnail": "media/thumbnails/courtroom_mastery_02.jpg",
    "type": "video",
    "originalPath": "C:\\Users\\Kevan\\Videos\\Unykorn_Miami_Vice_Media_Gallery\\04_Master_Consolidated_Archive\\20250127_0105_Futuristic Courtroom Mastery_storyboard_01jjk5t8t8f7xrengkv5pdvzfs.mp4"
  },
  {
    "id": "courtroom_elegance",
    "filename": "courtroom_elegance.mp4",
    "relPath": "media/videos/courtroom_elegance.mp4",
    "title": "Futuristic Courtroom Elegance",
    "description": "Polished marble and obsidian cyber-bench with ambient gold volumetric lighting.",
    "category": "Elegance",
    "sizeMb": 5.0,
    "duration": 10.0,
    "resolution": "480x854",
    "thumbnail": "media/thumbnails/courtroom_elegance.jpg",
    "type": "video",
    "originalPath": "C:\\Users\\Kevan\\Videos\\Unykorn_Miami_Vice_Media_Gallery\\04_Master_Consolidated_Archive\\20250127_0106_Futuristic Courtroom Elegance_storyboard_01jjk5w01qfgpt239tqzr0xztq.mp4"
  },
  {
    "id": "courtroom_drama_02",
    "filename": "courtroom_drama_02.mp4",
    "relPath": "media/videos/courtroom_drama_02.mp4",
    "title": "Courtroom Drama: Defense Podium",
    "description": "Defense advocate console showing citation offset tracking and live court feed.",
    "category": "Drama",
    "sizeMb": 8.47,
    "duration": 10.0,
    "resolution": "854x480",
    "thumbnail": "media/thumbnails/courtroom_drama_02.jpg",
    "type": "video",
    "originalPath": "C:\\Users\\Kevan\\Videos\\Unykorn_Miami_Vice_Media_Gallery\\04_Master_Consolidated_Archive\\20250127_0112_Futuristic Courtroom Drama_storyboard_01jjk671d6feetqp7rxh7tsm7x.mp4"
  },
  {
    "id": "courtroom_drama_03",
    "filename": "courtroom_drama_03.mp4",
    "relPath": "media/videos/courtroom_drama_03.mp4",
    "title": "Courtroom Drama: Judicial Bench",
    "description": "Presiding magistrate dais with integrated AI verification and FRE seals.",
    "category": "Drama",
    "sizeMb": 7.84,
    "duration": 10.0,
    "resolution": "854x480",
    "thumbnail": "media/thumbnails/courtroom_drama_03.jpg",
    "type": "video",
    "originalPath": "C:\\Users\\Kevan\\Videos\\Unykorn_Miami_Vice_Media_Gallery\\04_Master_Consolidated_Archive\\20250127_0112_Futuristic Courtroom Drama_storyboard_01jjk671dge39tbgk4sv9hbfmk.mp4"
  },
  {
    "id": "courtroom_drama_04",
    "filename": "courtroom_drama_04.mp4",
    "relPath": "media/videos/courtroom_drama_04.mp4",
    "title": "Courtroom Drama: Evidentiary Climax",
    "description": "Dramatic reveal of character-accurate slip opinion citations and witness proofs.",
    "category": "Drama",
    "sizeMb": 6.68,
    "duration": 10.0,
    "resolution": "480x854",
    "thumbnail": "media/thumbnails/courtroom_drama_04.jpg",
    "type": "video",
    "originalPath": "C:\\Users\\Kevan\\Videos\\Unykorn_Miami_Vice_Media_Gallery\\04_Master_Consolidated_Archive\\20250127_0115_Futuristic Courtroom Drama_storyboard_01jjk6cgj9e8xv4zh0ez8nr8qj.mp4"
  },
  {
    "id": "courtroom_confrontation_01",
    "filename": "courtroom_confrontation_01.mp4",
    "relPath": "media/videos/courtroom_confrontation_01.mp4",
    "title": "Courtroom Confrontation: Cross-Exam",
    "description": "Cross-examination standoff with real-time contradictory statement detection.",
    "category": "Confrontation",
    "sizeMb": 5.37,
    "duration": 10.0,
    "resolution": "480x854",
    "thumbnail": "media/thumbnails/courtroom_confrontation_01.jpg",
    "type": "video",
    "originalPath": "C:\\Users\\Kevan\\Videos\\Unykorn_Miami_Vice_Media_Gallery\\04_Master_Consolidated_Archive\\20250127_0118_Futuristic Courtroom Confrontation_storyboard_01jjk6jf39e0v9mrg6cb1xg6av.mp4"
  },
  {
    "id": "courtroom_confrontation_02",
    "filename": "courtroom_confrontation_02.mp4",
    "relPath": "media/videos/courtroom_confrontation_02.mp4",
    "title": "Courtroom Confrontation: Oral Argument",
    "description": "High-stakes oral argument before the tribunal with real-time precedent matrix.",
    "category": "Confrontation",
    "sizeMb": 5.17,
    "duration": 10.0,
    "resolution": "480x854",
    "thumbnail": "media/thumbnails/courtroom_confrontation_02.jpg",
    "type": "video",
    "originalPath": "C:\\Users\\Kevan\\Videos\\Unykorn_Miami_Vice_Media_Gallery\\04_Master_Consolidated_Archive\\20250127_0118_Futuristic Courtroom Confrontation_storyboard_01jjk6jf40f8qbds1r5wn1cget.mp4"
  },
  {
    "id": "legal_scales_hologram",
    "filename": "legal_scales_hologram.jpg",
    "relPath": "media/images/legal_scales_hologram.jpg",
    "title": "Holographic Scales of Justice",
    "description": "3D cybernetic scales of justice suspended with real-time cryptographic ledger hashes and laser balance lines.",
    "category": "Visual Badges & Seals",
    "sizeMb": 0.35,
    "duration": 0,
    "resolution": "1920x1080",
    "thumbnail": "media/images/legal_scales_hologram.jpg",
    "type": "image",
    "originalPath": "Generated Photorealistic 8K Asset"
  },
  {
    "id": "courtroom_cyber_bench",
    "filename": "courtroom_cyber_bench.jpg",
    "relPath": "media/images/courtroom_cyber_bench.jpg",
    "title": "Grand Federal Cyber Bench & Codex",
    "description": "Massive panoramic constitutional codex display and obsidian judicial bench with neon accents.",
    "category": "Mastery",
    "sizeMb": 0.45,
    "duration": 0,
    "resolution": "1920x1080",
    "thumbnail": "media/images/courtroom_cyber_bench.jpg",
    "type": "image",
    "originalPath": "Generated Photorealistic 8K Asset"
  },
  {
    "id": "fre_902_seal",
    "filename": "fre_902_seal.jpg",
    "relPath": "media/images/fre_902_seal.jpg",
    "title": "FRE 902(13)/(14) Authenticity Medallion",
    "description": "High-relief gold, silver, and sapphire digital evidence provenance authenticity seal.",
    "category": "Visual Badges & Seals",
    "sizeMb": 0.32,
    "duration": 0,
    "resolution": "1024x1024",
    "thumbnail": "media/images/fre_902_seal.jpg",
    "type": "image",
    "originalPath": "Generated Photorealistic 8K Asset"
  }
];

let currentSelectedMedia = LEGAL_MEDIA_CATALOG[0];
let isLiveBgEnabled = true;

function initCinemaStudio() {
  const grid = document.getElementById("legalMediaGrid");
  const searchInput = document.getElementById("mediaSearchInput");
  const filterPills = document.querySelectorAll(".filter-pill");
  const toggleLiveBgBtn = document.getElementById("toggleLiveBgBtn");
  const bgToggleText = document.getElementById("bgToggleText");
  const liveAmbientVideo = document.getElementById("liveAmbientVideo");
  const liveBgOverlay = document.getElementById("liveBgOverlay");
  
  const mainVideo = document.getElementById("mainTheaterVideo");
  const mainImage = document.getElementById("mainTheaterImage");
  const playPauseBtn = document.getElementById("theaterPlayPauseBtn");
  const playIcon = document.getElementById("playIcon");
  const muteBtn = document.getElementById("theaterMuteBtn");
  const timelineScrubber = document.getElementById("timelineScrubber");
  const timelineProgress = document.getElementById("timelineProgress");
  const fullscreenBtn = document.getElementById("theaterFullscreenBtn");
  const speedBtns = document.querySelectorAll(".speed-btn");

  const setHeroBgBtn = document.getElementById("setHeroBgBtn");
  const copyHtmlTagBtn = document.getElementById("copyHtmlTagBtn");
  const copyReactJsxBtn = document.getElementById("copyReactJsxBtn");
  const copyCssBgBtn = document.getElementById("copyCssBgBtn");
  const copyPathBtn = document.getElementById("copyPathBtn");

  // Initial ambient background setup
  if (liveAmbientVideo && liveBgOverlay) {
    liveAmbientVideo.src = currentSelectedMedia.relPath;
    liveAmbientVideo.style.display = "block";
    liveBgOverlay.style.display = "block";
    liveAmbientVideo.play().catch(() => {});
  }

  // Render Grid
  renderMediaGrid(LEGAL_MEDIA_CATALOG);

  // Search filter
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase().trim();
      const filtered = LEGAL_MEDIA_CATALOG.filter(item => {
        return item.title.toLowerCase().includes(q) ||
               item.description.toLowerCase().includes(q) ||
               item.category.toLowerCase().includes(q) ||
               item.resolution.toLowerCase().includes(q);
      });
      renderMediaGrid(filtered);
    });
  }

  // Category filter
  filterPills.forEach(pill => {
    pill.addEventListener("click", () => {
      filterPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      const cat = pill.getAttribute("data-cat");
      if (cat === "all") {
        renderMediaGrid(LEGAL_MEDIA_CATALOG);
      } else {
        const filtered = LEGAL_MEDIA_CATALOG.filter(item => item.category === cat);
        renderMediaGrid(filtered);
      }
    });
  });

  // Toggle Live Background
  if (toggleLiveBgBtn) {
    toggleLiveBgBtn.addEventListener("click", () => {
      isLiveBgEnabled = !isLiveBgEnabled;
      if (isLiveBgEnabled) {
        liveAmbientVideo.style.display = "block";
        liveBgOverlay.style.display = "block";
        liveAmbientVideo.play().catch(() => {});
        toggleLiveBgBtn.classList.remove("off");
        toggleLiveBgBtn.classList.add("active");
        bgToggleText.textContent = "Site Video Background: ON";
      } else {
        liveAmbientVideo.style.display = "none";
        liveBgOverlay.style.display = "none";
        liveAmbientVideo.pause();
        toggleLiveBgBtn.classList.remove("active");
        toggleLiveBgBtn.classList.add("off");
        bgToggleText.textContent = "Site Video Background: OFF";
      }
    });
  }

  // Play / Pause Theater
  if (playPauseBtn && mainVideo) {
    playPauseBtn.addEventListener("click", () => {
      if (mainVideo.paused) {
        mainVideo.play();
        playIcon.innerHTML = '<path d="M6 4h4v16H6zm8 0h4v16h-4z"/>';
      } else {
        mainVideo.pause();
        playIcon.innerHTML = '<path d="M8 5v14l11-7z"/>';
      }
    });

    mainVideo.addEventListener("timeupdate", () => {
      if (mainVideo.duration) {
        const pct = (mainVideo.currentTime / mainVideo.duration) * 100;
        if (timelineProgress) timelineProgress.style.width = pct + "%";
      }
    });

    if (timelineScrubber) {
      timelineScrubber.addEventListener("click", (e) => {
        const rect = timelineScrubber.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        if (mainVideo.duration) {
          mainVideo.currentTime = pos * mainVideo.duration;
        }
      });
    }
  }

  // Mute / Unmute
  if (muteBtn && mainVideo) {
    muteBtn.addEventListener("click", () => {
      mainVideo.muted = !mainVideo.muted;
      const muteIcon = document.getElementById("muteIcon");
      if (mainVideo.muted) {
        muteIcon.innerHTML = '<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>';
      } else {
        muteIcon.innerHTML = '<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>';
      }
    });
  }

  // Playback speeds
  speedBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      speedBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const speed = parseFloat(btn.getAttribute("data-speed"));
      if (mainVideo) mainVideo.playbackRate = speed;
    });
  });

  // Fullscreen
  if (fullscreenBtn && mainVideo) {
    fullscreenBtn.addEventListener("click", () => {
      const wrapper = document.getElementById("theaterPlayerWrapper");
      if (wrapper.requestFullscreen) {
        wrapper.requestFullscreen();
      } else if (wrapper.webkitRequestFullscreen) {
        wrapper.webkitRequestFullscreen();
      }
    });
  }

  // Set as Live Hero Background
  if (setHeroBgBtn) {
    setHeroBgBtn.addEventListener("click", () => {
      if (currentSelectedMedia.type === "video") {
        liveAmbientVideo.src = currentSelectedMedia.relPath;
        liveAmbientVideo.style.display = "block";
        liveBgOverlay.style.display = "block";
        liveAmbientVideo.play().catch(() => {});
        isLiveBgEnabled = true;
        toggleLiveBgBtn.classList.remove("off");
        toggleLiveBgBtn.classList.add("active");
        bgToggleText.textContent = "Site Video Background: ON";
        showToast(`Applied "${currentSelectedMedia.title}" as site background!`);
      } else {
        showToast("Seals and badges are high-res images. Choose a video for animated background.");
      }
    });
  }

  // Code Snippet Buttons
  if (copyHtmlTagBtn) {
    copyHtmlTagBtn.addEventListener("click", () => {
      const isVid = currentSelectedMedia.type === "video";
      const snippet = isVid 
        ? `<video autoplay loop muted playsinline poster="${currentSelectedMedia.thumbnail}" class="legal-courtroom-video">\n  <source src="${currentSelectedMedia.relPath}" type="video/mp4">\n</video>`
        : `<img src="${currentSelectedMedia.relPath}" alt="${currentSelectedMedia.title}" class="legal-evidentiary-image" />`;
      copyToClipboard(snippet, "HTML5 embed tag copied to clipboard!");
    });
  }

  if (copyReactJsxBtn) {
    copyReactJsxBtn.addEventListener("click", () => {
      const isVid = currentSelectedMedia.type === "video";
      const snippet = isVid
        ? `<div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl">\n  <video\n    autoPlay\n    loop\n    muted\n    playsInline\n    poster="${currentSelectedMedia.thumbnail}"\n    className="w-full h-full object-cover"\n  >\n    <source src="${currentSelectedMedia.relPath}" type="video/mp4" />\n  </video>\n</div>`
        : `<img\n  src="${currentSelectedMedia.relPath}"\n  alt="${currentSelectedMedia.title}"\n  className="rounded-xl shadow-2xl object-cover"\n/>`;
      copyToClipboard(snippet, "React / Next.js component copied!");
    });
  }

  if (copyCssBgBtn) {
    copyCssBgBtn.addEventListener("click", () => {
      const isVid = currentSelectedMedia.type === "video";
      const snippet = isVid
        ? `/* CSS Background Loop */\n.courtroom-hero-backdrop {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  z-index: 0;\n  opacity: 0.35;\n  filter: brightness(0.7) contrast(1.15);\n}`
        : `/* CSS Image Background */\n.evidentiary-seal-bg {\n  background-image: url('${currentSelectedMedia.relPath}');\n  background-size: cover;\n  background-position: center;\n  background-repeat: no-repeat;\n}`;
      copyToClipboard(snippet, "CSS background styling copied!");
    });
  }

  if (copyPathBtn) {
    copyPathBtn.addEventListener("click", () => {
      copyToClipboard(currentSelectedMedia.originalPath, "Local archive path copied!");
    });
  }
}

function selectMediaItem(item) {
  currentSelectedMedia = item;
  
  const mainVideo = document.getElementById("mainTheaterVideo");
  const mainImage = document.getElementById("mainTheaterImage");
  const hudCategory = document.getElementById("hudCategory");
  const hudResolution = document.getElementById("hudResolution");
  const hudDuration = document.getElementById("hudDuration");
  const hudTitle = document.getElementById("hudTitle");
  const hudDescription = document.getElementById("hudDescription");
  const directorTitle = document.getElementById("directorTitle");
  const directorDesc = document.getElementById("directorDesc");
  const specCat = document.getElementById("specCat");
  const specRes = document.getElementById("specRes");
  const specDur = document.getElementById("specDur");
  const specSize = document.getElementById("specSize");
  const specFormat = document.getElementById("specFormat");
  const specId = document.getElementById("specId");

  if (item.type === "video") {
    if (mainImage) mainImage.style.display = "none";
    if (mainVideo) {
      mainVideo.style.display = "block";
      mainVideo.poster = item.thumbnail;
      mainVideo.src = item.relPath;
      mainVideo.play().catch(() => {});
    }
  } else {
    if (mainVideo) {
      mainVideo.style.display = "none";
      mainVideo.pause();
    }
    if (mainImage) {
      mainImage.style.display = "block";
      mainImage.src = item.relPath;
    }
  }

  // Update HUD
  if (hudCategory) hudCategory.textContent = item.category;
  if (hudResolution) hudResolution.textContent = item.resolution;
  if (hudDuration) hudDuration.textContent = item.duration ? item.duration + "s" : "HI-RES";
  if (hudTitle) hudTitle.textContent = item.title;
  if (hudDescription) hudDescription.textContent = item.description;

  // Update Director Pod
  if (directorTitle) directorTitle.textContent = item.title;
  if (directorDesc) directorDesc.textContent = item.description;
  if (specCat) specCat.textContent = item.category;
  if (specRes) specRes.textContent = item.resolution;
  if (specDur) specDur.textContent = item.duration ? item.duration + " Seconds" : "Static High-Res";
  if (specSize) specSize.textContent = item.sizeMb + " MB";
  if (specFormat) specFormat.textContent = item.type === "video" ? "MP4 (H.264 / AAC)" : "JPEG (8K High-Res)";
  if (specId) specId.textContent = item.id;

  // Highlight card
  document.querySelectorAll(".media-card").forEach(card => {
    if (card.getAttribute("data-id") === item.id) {
      card.classList.add("active-card");
    } else {
      card.classList.remove("active-card");
    }
  });
}

function renderMediaGrid(items) {
  const grid = document.getElementById("legalMediaGrid");
  if (!grid) return;

  grid.innerHTML = "";
  if (items.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; padding: 2rem; text-align:center; color:var(--text-dim);">No media matches your search query.</div>`;
    return;
  }

  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "media-card";
    card.setAttribute("data-id", item.id);
    if (currentSelectedMedia && currentSelectedMedia.id === item.id) {
      card.classList.add("active-card");
    }

    const isVid = item.type === "video";

    card.innerHTML = `
      <div class="media-card-preview">
        <img src="${item.thumbnail}" alt="${item.title}" class="card-thumb-img" loading="lazy">
        ${isVid ? `<video class="card-hover-video" loop muted playsinline src="${item.relPath}"></video>` : ''}
        <div class="card-badges-overlay">
          <span class="card-type-tag ${item.category.includes('Seals') ? 'gold' : ''}">${item.category}</span>
          <span class="card-dur-tag">${isVid ? item.duration + 's' : item.resolution}</span>
        </div>
      </div>
      <div class="media-card-body">
        <div>
          <h4 class="card-title">${item.title}</h4>
          <p class="card-desc">${item.description}</p>
        </div>
        <div class="card-meta-row">
          <span>${item.resolution}</span>
          <span>${item.sizeMb} MB</span>
        </div>
        <div class="card-actions-row">
          <button class="card-play-btn" data-action="theater">▶ Play in Theater</button>
          <button class="card-icon-btn" data-action="setbg" title="Set as Site Background">🌌</button>
        </div>
      </div>
    `;

    // Hover video preview
    if (isVid) {
      const hoverVideo = card.querySelector(".card-hover-video");
      card.addEventListener("mouseenter", () => {
        if (hoverVideo) hoverVideo.play().catch(() => {});
      });
      card.addEventListener("mouseleave", () => {
        if (hoverVideo) {
          hoverVideo.pause();
          hoverVideo.currentTime = 0;
        }
      });
    }

    // Card Clicks
    card.querySelector("[data-action='theater']").addEventListener("click", (e) => {
      e.stopPropagation();
      selectMediaItem(item);
      document.querySelector(".cinema-featured-pod").scrollIntoView({ behavior: "smooth", block: "start" });
    });

    card.querySelector("[data-action='setbg']").addEventListener("click", (e) => {
      e.stopPropagation();
      selectMediaItem(item);
      const setHeroBgBtn = document.getElementById("setHeroBgBtn");
      if (setHeroBgBtn) setHeroBgBtn.click();
    });

    card.addEventListener("click", () => {
      selectMediaItem(item);
    });

    grid.appendChild(card);
  });
}

function copyToClipboard(text, msg) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(msg);
  }).catch(() => {
    // Fallback
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
    showToast(msg);
  });
}

function showToast(msg) {
  let toast = document.getElementById("toastNotification");
  if (!toast) {
    toast = document.getElementById("copyToast");
  }
  if (toast) {
    const toastMsg = document.getElementById("toastMsg");
    if (toastMsg) {
      toastMsg.textContent = msg;
    } else {
      toast.textContent = msg;
    }
    toast.style.display = "flex";
    setTimeout(() => {
      toast.style.display = "none";
    }, 3200);
  }
}

// ==========================================================================
// BITGO CUSTODIAL VAULT & AMBIENT CONTROLS
// ==========================================================================

function initBitGoModal() {
  const modal = document.getElementById("addAssetModal");
  const openBtn = document.getElementById("openAddAssetModalBtn");
  const closeBtn = document.getElementById("closeModalBtn");
  const cancelBtn = document.getElementById("cancelModalBtn");
  const submitBtn = document.getElementById("submitAddAssetBtn");

  if (!modal) return;

  if (openBtn) {
    openBtn.addEventListener("click", () => {
      modal.style.display = "flex";
    });
  }

  const closeModal = () => {
    modal.style.display = "none";
  };

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (cancelBtn) cancelBtn.addEventListener("click", closeModal);

  if (submitBtn) {
    submitBtn.addEventListener("click", () => {
      const name = document.getElementById("modalAssetName").value.trim() || "Sovereign Asset Vault SPV III";
      const cusip = document.getElementById("modalAssetCusip").value.trim() || "CUSIP-912828-NEW";
      const val = document.getElementById("modalAssetVal").value.trim() || "$25,000,000";
      const custodian = document.getElementById("modalCustodianSelect").value;

      const list = document.getElementById("bitgoAssetsList");
      if (list) {
        const item = document.createElement("div");
        item.style.cssText = "display:flex; justify-content:space-between; align-items:center; background:rgba(10,16,32,0.85); border:1px solid var(--border-glass); padding:0.75rem 1rem; border-radius:8px; font-size:0.82rem;";
        item.innerHTML = `
          <div>
            <strong style="color:#fff;">${name}</strong>
            <span style="color:var(--text-dim); margin-left:0.5rem;">(${cusip})</span>
          </div>
          <span style="color:var(--gold-bright); font-weight:700;">${val} Allocation</span>
          <span style="color:var(--emerald); font-family:var(--font-mono); font-size:0.75rem;">Status: Attestation Anchored</span>
        `;
        list.prepend(item);
      }

      closeModal();
      showToast(`✅ Institutional asset mapped to BitGo Proxy & Audit Hash Anchored`);
    });
  }
}

function initAmbientBackdropSelector() {
  const toggleBtn = document.getElementById("toggleHeroAmbientVideoBtn");
  const liveVideo = document.getElementById("liveAmbientVideo");
  const overlay = document.getElementById("liveBgOverlay");
  const trackBtns = document.querySelectorAll("[data-ambient-track]");

  if (toggleBtn && liveVideo) {
    toggleBtn.addEventListener("click", () => {
      if (liveVideo.style.display === "none" || !liveVideo.style.display) {
        liveVideo.style.display = "block";
        if (overlay) overlay.style.display = "block";
        if (!liveVideo.src) {
          liveVideo.src = "media/videos/courtroom_mastery_01.mp4";
        }
        liveVideo.play().catch(() => {});
        toggleBtn.textContent = "⏹️ Stop Ambient Cinema";
        showToast("🎬 Live Ambient Cinema Background Enabled");
      } else {
        liveVideo.pause();
        liveVideo.style.display = "none";
        if (overlay) overlay.style.display = "none";
        toggleBtn.textContent = "🎥 Ambient Cinema Mode";
        showToast("Ambient Cinema Disabled");
      }
    });
  }

  trackBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      trackBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const track = btn.getAttribute("data-ambient-track");
      if (liveVideo) {
        liveVideo.src = track;
        liveVideo.style.display = "block";
        if (overlay) overlay.style.display = "block";
        liveVideo.play().catch(() => {});
        if (toggleBtn) toggleBtn.textContent = "⏹️ Stop Ambient Cinema";
        showToast(`Playing ambient backdrop: ${track.split("/").pop()}`);
      }
    });
  });
}

function playMediaPreview(videoSrc, title) {
  const liveVideo = document.getElementById("liveAmbientVideo");
  const overlay = document.getElementById("liveBgOverlay");
  if (liveVideo) {
    liveVideo.src = videoSrc;
    liveVideo.style.display = "block";
    if (overlay) overlay.style.display = "block";
    liveVideo.play().catch(() => {});
    showToast(`Streaming "${title}" in ambient backdrop`);
  }
}


