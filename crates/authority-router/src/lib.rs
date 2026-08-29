use serde::{Deserialize, Serialize};
use thiserror::Error;

#[derive(Error, Debug)]
pub enum AuthorityRouterError {
    #[error("Source provider unavailable: {0}")]
    ProviderUnavailable(String),
    #[error("Authority not found in registry: {0}")]
    NotFound(String),
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum AuthorityProvider {
    CourtListener,
    GovInfo,
    FederalRegister,
    CaselawAccessProject,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AuthorityArtifact {
    pub provider: AuthorityProvider,
    pub canonical_url: String,
    pub retrieved_at_utc: String,
    pub content_hash_sha256: String,
    pub raw_text: String,
}

pub struct AuthorityRouter;

impl AuthorityRouter {
    /// Resolves canonical primary authority text
    pub async fn resolve_authority(citation_key: &str) -> Result<AuthorityArtifact, AuthorityRouterError> {
        // Deterministic routing mock / interface for primary source providers
        if citation_key.contains("Ashcroft v. Iqbal") {
            Ok(AuthorityArtifact {
                provider: AuthorityProvider::CourtListener,
                canonical_url: "https://www.courtlistener.com/opinion/145885/ashcroft-v-iqbal/".to_string(),
                retrieved_at_utc: chrono::Utc::now().to_rfc3339(),
                content_hash_sha256: "0x3a4f91b7d52a818c39e289bfad1694f4a9b515d9090fc1d51a7027d7d2426913".to_string(),
                raw_text: "To survive a motion to dismiss, a complaint must contain sufficient factual matter, accepted as true, to state a claim to relief that is plausible on its face.".to_string(),
            })
        } else {
            Err(AuthorityRouterError::NotFound(citation_key.to_string()))
        }
    }
}
