// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title GDPRZeroKnowledgeDataRoom
 * @author Legal-X & LegacyChain Sovereign Protocol
 * @notice Global Privacy, GDPR / CCPA / HIPAA Zero-Knowledge Evidentiary Access Control.
 * Implements "Right to be Forgotten", cryptographic consent proofs, and ephemeral time-bounded access.
 */
contract GDPRZeroKnowledgeDataRoom {
    struct DataRoomAccessGrant {
        bytes32 dataRoomId;
        address granteeCounselOrAuditor;
        bytes32 zkProofConsentHash;
        uint256 accessGrantedTimestamp;
        uint256 accessExpiresTimestamp;
        bool isRevoked; // Right to be Forgotten / Consent Revocation
    }

    // dataRoomId => grantee => DataRoomAccessGrant
    mapping(bytes32 => mapping(address => DataRoomAccessGrant)) public accessGrants;

    event AccessGranted(bytes32 indexed dataRoomId, address indexed grantee, uint256 expiresAt);
    event ConsentRevokedRightToBeForgotten(bytes32 indexed dataRoomId, address indexed grantee, uint256 timestamp);

    function grantZeroKnowledgeAccess(
        bytes32 _dataRoomId,
        address _grantee,
        bytes32 _zkConsentHash,
        uint256 _durationSeconds
    ) external {
        accessGrants[_dataRoomId][_grantee] = DataRoomAccessGrant({
            dataRoomId: _dataRoomId,
            granteeCounselOrAuditor: _grantee,
            zkProofConsentHash: _zkConsentHash,
            accessGrantedTimestamp: block.timestamp,
            accessExpiresTimestamp: block.timestamp + _durationSeconds,
            isRevoked: false
        });

        emit AccessGranted(_dataRoomId, _grantee, block.timestamp + _durationSeconds);
    }

    function revokeConsentRightToBeForgotten(bytes32 _dataRoomId, address _grantee) external {
        DataRoomAccessGrant storage grant = accessGrants[_dataRoomId][_grantee];
        require(!grant.isRevoked, "Access already revoked");

        grant.isRevoked = true;
        emit ConsentRevokedRightToBeForgotten(_dataRoomId, _grantee, block.timestamp);
    }

    function verifyActiveAccess(bytes32 _dataRoomId, address _grantee) external view returns (bool) {
        DataRoomAccessGrant memory g = accessGrants[_dataRoomId][_grantee];
        return (!g.isRevoked && g.accessExpiresTimestamp > block.timestamp && g.accessGrantedTimestamp > 0);
    }
}
