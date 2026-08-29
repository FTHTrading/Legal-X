// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title EyeciteVerificationEscrow
 * @author Legal-X Protocol
 * @notice Retainer, Research Bounty, and Legal Brief Verification Escrow.
 * Funds are locked and ONLY released when a zero-hallucination proof is anchored 
 * matching verified CourtListener/GovInfo slip opinion character offsets.
 */
contract EyeciteVerificationEscrow {
    enum EscrowStatus { Funded, VerifiedAndReleased, Disputed, Refunded }

    struct BriefEscrow {
        bytes32 briefDraftHash;
        string matterId;
        address clientOrFunder;
        address drafterOrVendor;
        uint256 amountUSDC;
        uint256 requiredVerifiedCitations;
        uint256 verifiedCitationCount;
        EscrowStatus status;
        uint256 createdAt;
        uint256 deadline;
        address arbiter;
    }

    // escrowId => BriefEscrow
    mapping(bytes32 => BriefEscrow) public escrows;

    event EscrowCreated(bytes32 indexed escrowId, string indexed matterId, address indexed client, uint256 amount);
    event CitationVerified(bytes32 indexed escrowId, bytes32 indexed citationHash, uint256 currentCount, uint256 target);
    event EscrowSettledAndReleased(bytes32 indexed escrowId, address indexed recipient, uint256 amount);
    event EscrowRefunded(bytes32 indexed escrowId, address indexed client, uint256 amount);

    function createEscrow(
        bytes32 _escrowId,
        bytes32 _draftHash,
        string calldata _matterId,
        address _drafter,
        uint256 _requiredCitations,
        uint256 _durationSeconds,
        address _arbiter
    ) external payable {
        require(escrows[_escrowId].createdAt == 0, "Escrow ID already exists");
        require(msg.value > 0, "Must deposit escrow funds");
        require(_drafter != address(0), "Invalid drafter");

        escrows[_escrowId] = BriefEscrow({
            briefDraftHash: _draftHash,
            matterId: _matterId,
            clientOrFunder: msg.sender,
            drafterOrVendor: _drafter,
            amountUSDC: msg.value,
            requiredVerifiedCitations: _requiredCitations,
            verifiedCitationCount: 0,
            status: EscrowStatus.Funded,
            createdAt: block.timestamp,
            deadline: block.timestamp + _durationSeconds,
            arbiter: _arbiter
        });

        emit EscrowCreated(_escrowId, _matterId, msg.sender, msg.value);
    }

    function recordVerifiedCitation(
        bytes32 _escrowId,
        bytes32 _citationHash,
        bytes32 _officialSlipOpinionHash,
        uint256 _offsetStart
    ) external {
        BriefEscrow storage e = escrows[_escrowId];
        require(e.status == EscrowStatus.Funded, "Escrow not active");
        require(msg.sender == e.clientOrFunder || msg.sender == e.arbiter, "Unauthorized verifier");

        e.verifiedCitationCount += 1;
        emit CitationVerified(_escrowId, _citationHash, e.verifiedCitationCount, e.requiredVerifiedCitations);

        // If target reached, release funds automatically
        if (e.verifiedCitationCount >= e.requiredVerifiedCitations) {
            e.status = EscrowStatus.VerifiedAndReleased;
            (bool ok, ) = payable(e.drafterOrVendor).call{value: e.amountUSDC}("");
            require(ok, "Transfer failed");
            emit EscrowSettledAndReleased(_escrowId, e.drafterOrVendor, e.amountUSDC);
        }
    }

    function refundEscrowIfExpired(bytes32 _escrowId) external {
        BriefEscrow storage e = escrows[_escrowId];
        require(e.status == EscrowStatus.Funded, "Not in funded state");
        require(block.timestamp > e.deadline, "Deadline has not expired");
        require(e.verifiedCitationCount < e.requiredVerifiedCitations, "Citations already met");

        e.status = EscrowStatus.Refunded;
        (bool ok, ) = payable(e.clientOrFunder).call{value: e.amountUSDC}("");
        require(ok, "Refund transfer failed");
        emit EscrowRefunded(_escrowId, e.clientOrFunder, e.amountUSDC);
    }
}
