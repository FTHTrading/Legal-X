use serde::{Deserialize, Serialize};
use thiserror::Error;

#[derive(Error, Debug)]
pub enum StateMachineError {
    #[error("Invalid state transition from {from:?} to {to:?}")]
    InvalidTransition {
        from: DocumentLifecycleState,
        to: DocumentLifecycleState,
    },
    #[error("Missing mandatory lead counsel sign-off")]
    MissingAttorneySignature,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum DocumentLifecycleState {
    Draft,
    CitationValidationPending,
    SourceUnavailable,
    QuoteDiscrepancy,
    ReviewRequired,
    AttorneyApprovedForControlledExport,
    Archived,
}

pub struct DocumentStateMachine;

impl DocumentStateMachine {
    /// Evaluates valid state transition rules
    pub fn transition(
        current: DocumentLifecycleState,
        next: DocumentLifecycleState,
        has_attorney_signature: bool,
    ) -> Result<DocumentLifecycleState, StateMachineError> {
        match (current, next) {
            (DocumentLifecycleState::ReviewRequired, DocumentLifecycleState::AttorneyApprovedForControlledExport) => {
                if !has_attorney_signature {
                    return Err(StateMachineError::MissingAttorneySignature);
                }
                Ok(DocumentLifecycleState::AttorneyApprovedForControlledExport)
            }
            (DocumentLifecycleState::AttorneyApprovedForControlledExport, DocumentLifecycleState::Archived) => {
                Ok(DocumentLifecycleState::Archived)
            }
            (DocumentLifecycleState::Draft, next_state) => Ok(next_state),
            _ => Ok(next),
        }
    }
}
