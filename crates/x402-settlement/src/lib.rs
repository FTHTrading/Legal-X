use serde::{Deserialize, Serialize};
use thiserror::Error;

#[derive(Error, Debug)]
pub enum SettlementError {
    #[error("Receipt expired at {0}")]
    Expired(String),
    #[error("Invalid chain ID: expected {expected}, found {actual}")]
    InvalidChainId { expected: u64, actual: u64 },
    #[error("Underpaid amount: expected {expected} atomic units, found {actual}")]
    Underpaid { expected: u64, actual: u64 },
    #[error("Receipt already consumed at {0}")]
    AlreadyConsumed(String),
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SettlementReceipt {
    pub receipt_id: String,
    pub nonce_hash: String,
    pub resource: String,
    pub method: String,
    pub chain_id: u64,
    pub asset: String,
    pub recipient: String,
    pub amount_atomic: u64,
    pub expires_at_epoch: i64,
    pub status: ReceiptStatus,
    pub consumed_at: Option<String>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum ReceiptStatus {
    Pending,
    Settled,
    Consumed,
    Expired,
}

pub struct X402SettlementValidator;

impl X402SettlementValidator {
    /// Validates receipt parameters and ensures unexpired, settled state
    pub fn validate_and_consume(
        receipt: &mut SettlementReceipt,
        now_epoch: i64,
        expected_chain_id: u64,
        min_amount_atomic: u64,
    ) -> Result<(), SettlementError> {
        if receipt.expires_at_epoch <= now_epoch {
            return Err(SettlementError::Expired(receipt.expires_at_epoch.to_string()));
        }

        if receipt.chain_id != expected_chain_id {
            return Err(SettlementError::InvalidChainId {
                expected: expected_chain_id,
                actual: receipt.chain_id,
            });
        }

        if receipt.amount_atomic < min_amount_atomic {
            return Err(SettlementError::Underpaid {
                expected: min_amount_atomic,
                actual: receipt.amount_atomic,
            });
        }

        if receipt.status == ReceiptStatus::Consumed {
            return Err(SettlementError::AlreadyConsumed(
                receipt.consumed_at.clone().unwrap_or_default(),
            ));
        }

        receipt.status = ReceiptStatus::Consumed;
        receipt.consumed_at = Some(chrono::Utc::now().to_rfc3339());
        Ok(())
    }
}
