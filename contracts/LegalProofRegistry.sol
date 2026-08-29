// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title LegalProofRegistry
 * @dev Anchors FRE 902 self-authenticating cryptographic manifests on-chain.
 * Supports tamper-evident record verification without exposing confidential client data.
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
    mapping(string => bytes32[]) private matterProofs;

    event ProofAnchored(bytes32 indexed documentHash, string indexed matterId, address indexed signer);
    event ProofRevoked(bytes32 indexed documentHash, string reason, address indexed revocator);

    /**
     * @notice Anchors a new self-authenticating cryptographic manifest
     */
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

        matterProofs[_matterId].push(_sha256Digest);

        emit ProofAnchored(_sha256Digest, _matterId, msg.sender);
    }

    /**
     * @notice Verifies if a document hash is valid and unrevoked
     */
    function verifyProof(bytes32 _sha256Digest) external view returns (bool isValid, uint256 anchoredAt, address signer) {
        ProofRecord memory p = proofs[_sha256Digest];
        if (p.timestamp == 0 || p.isRevoked) {
            return (false, 0, address(0));
        }
        return (true, p.timestamp, p.signer);
    }
}
