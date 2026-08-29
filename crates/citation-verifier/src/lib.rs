use serde::{Deserialize, Serialize};
use sha2::{Digest, Sha256};
use thiserror::Error;

#[derive(Error, Debug)]
pub enum CitationError {
    #[error("Unresolved citation authority: {0}")]
    UnresolvedAuthority(String),
    #[error("Quote mismatch at offset {offset}: expected '{expected}', found '{actual}'")]
    QuoteMismatch {
        offset: usize,
        expected: String,
        actual: String,
    },
    #[error("Negative treatment detected: {0}")]
    NegativeTreatment(String),
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NormalizedCitation {
    pub case_name: String,
    pub volume: u32,
    pub reporter: String,
    pub first_page: u32,
    pub pinpoint_page: Option<u32>,
    pub year: u32,
    pub court: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct QuoteVerificationResult {
    pub is_exact_match: bool,
    pub source_sha256: String,
    pub char_offset_start: usize,
    pub char_offset_end: usize,
}

pub struct CitationVerifier;

impl CitationVerifier {
    /// Validates an exact quote against the official slip opinion text
    pub fn verify_exact_quote(
        source_text: &str,
        claimed_quote: &str,
    ) -> Result<QuoteVerificationResult, CitationError> {
        let clean_source = source_text.trim();
        let clean_quote = claimed_quote.trim();

        if let Some(pos) = clean_source.find(clean_quote) {
            let mut hasher = Sha256::new();
            hasher.update(clean_source.as_bytes());
            let source_sha256 = format!("0x{}", hex::encode(hasher.finalize()));

            Ok(QuoteVerificationResult {
                is_exact_match: true,
                source_sha256,
                char_offset_start: pos,
                char_offset_end: pos + clean_quote.len(),
            })
        } else {
            Err(CitationError::QuoteMismatch {
                offset: 0,
                expected: clean_quote.to_string(),
                actual: "Substring not found in source text".to_string(),
            })
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_exact_quote_match() {
        let source = "To survive a motion to dismiss, a complaint must contain sufficient factual matter.";
        let quote = "sufficient factual matter";
        let res = CitationVerifier::verify_exact_quote(source, quote).unwrap();
        assert!(res.is_exact_match);
        assert_eq!(res.char_offset_start, 49);
    }
}
