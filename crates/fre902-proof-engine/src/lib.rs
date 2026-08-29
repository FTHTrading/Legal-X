use blake2::{Blake2b512, Digest as BlakeDigest};
use serde::{Deserialize, Serialize};
use sha2::{Digest as ShaDigest, Sha256};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ProofManifest {
    pub package_version: String,
    pub document_uuid: String,
    pub matter_id: String,
    pub generated_at_utc: String,
    pub sha256_digest: String,
    pub blake2_digest: String,
    pub custodian_declaration: String,
}

pub struct Fre902ProofEngine;

impl Fre902ProofEngine {
    /// Generates multi-hash cryptographic digests for FRE 902 self-authenticating bundles
    pub fn generate_manifest(
        matter_id: &str,
        document_uuid: &str,
        document_bytes: &[u8],
        custodian_name: &str,
        custodian_title: &str,
    ) -> ProofManifest {
        // Compute SHA-256
        let mut sha_hasher = Sha256::new();
        sha_hasher.update(document_bytes);
        let sha256_digest = format!("0x{}", hex::encode(sha_hasher.finalize()));

        // Compute BLAKE2b
        let mut blake_hasher = Blake2b512::new();
        blake_hasher.update(document_bytes);
        let blake2_digest = format!("0x{}", hex::encode(&blake_hasher.finalize()[0..32]));

        let now_utc = chrono::Utc::now().to_rfc3339();

        let custodian_declaration = format!(
            "CERTIFICATION PURSUANT TO 28 U.S.C. § 1746 & FED. R. EVID. 902(13)/(14):\n\
            I, {}, {}, hereby certify under penalty of perjury that:\n\
            1. I am a qualified person with direct knowledge of the operation and cryptographic verification systems of Legal-X;\n\
            2. The electronic record (Digest: {}) was produced by an automated, tamper-evident recording process that produces accurate results.\n\
            Executed on {} at Wilmington, DE.",
            custodian_name, custodian_title, sha256_digest, &now_utc[0..10]
        );

        ProofManifest {
            package_version: "1.0.0-PROD".to_string(),
            document_uuid: document_uuid.to_string(),
            matter_id: matter_id.to_string(),
            generated_at_utc: now_utc,
            sha256_digest,
            blake2_digest,
            custodian_declaration,
        }
    }
}
