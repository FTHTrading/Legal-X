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
    title: "Forensic Defense Matter",
    matterId: "mat_2026_def_009",
    court: "U.S. District Court for the Southern District of New York",
    judge: "Hon. Jesse M. Furman",
    parties: "Defense Forensic Review Investigation",
    dnaStrand: [
      { type: "MATTER_ID", val: "mat_2026_def_009", hash: "0x22ee...99bb" },
      { type: "CUSTODY_LOG", val: "Chain of Custody Timestamp", hash: "0x66cc...11aa" },
      { type: "EVIDENCE_DIGEST", val: "Audio / Video Forensic Hash", hash: "0x88dd...33ee" },
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
  }
};

let currentMatterKey = "mat_2026_corp";

document.addEventListener("DOMContentLoaded", () => {
  initTabs();
  renderMatterTwin(currentMatterKey);
  initDnaCanvas();
  initCitationMatcher();
  initX402Simulator();
  initAccordions();
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
