// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title CorporateMergersEscrow
 * @author Legal-X & LegacyChain Sovereign Protocol
 * @notice M&A Share Purchase Agreements, Earn-Outs, and Indemnification Escrow.
 * Governed under Delaware General Corporation Law (DGCL § 224 & § 251).
 */
contract CorporateMergersEscrow {
    enum DealStatus { InEscrow, ConditionsSatisfied, EarnOutActive, Completed, InDispute }

    struct MergerTransaction {
        string dealId;
        string targetEntity;
        string acquirerEntity;
        uint256 totalPurchasePriceUSDC;
        uint256 indemnificationEscrowAmountUSDC;
        uint256 earnOutMilestoneAmountUSDC;
        uint256 closingTimestamp;
        uint256 indemnificationExpiryTimestamp;
        address sellerRepresentative;
        address buyerRepresentative;
        address independentEscrowAgent;
        bytes32 mergerAgreementHash;
        DealStatus status;
    }

    // dealId => MergerTransaction
    mapping(string => MergerTransaction) public deals;

    event MergerEscrowFunded(string indexed dealId, string target, string acquirer, uint256 totalAmount);
    event IndemnificationClaimAsserted(string indexed dealId, uint256 claimAmount, bytes32 claimNoticeHash);
    event DealSettledAndReleased(string indexed dealId, address indexed recipient, uint256 amount);

    function createMergerDeal(
        string calldata _dealId,
        string calldata _target,
        string calldata _acquirer,
        uint256 _indemnityHoldback,
        uint256 _earnOutAmount,
        uint256 _indemnityDurationSeconds,
        address _sellerRep,
        address _buyerRep,
        address _escrowAgent,
        bytes32 _agreementHash
    ) external payable {
        require(deals[_dealId].closingTimestamp == 0, "Deal ID already exists");
        require(msg.value > 0, "Must fund initial escrow");

        deals[_dealId] = MergerTransaction({
            dealId: _dealId,
            targetEntity: _target,
            acquirerEntity: _acquirer,
            totalPurchasePriceUSDC: msg.value,
            indemnificationEscrowAmountUSDC: _indemnityHoldback,
            earnOutMilestoneAmountUSDC: _earnOutAmount,
            closingTimestamp: block.timestamp,
            indemnificationExpiryTimestamp: block.timestamp + _indemnityDurationSeconds,
            sellerRepresentative: _sellerRep,
            buyerRepresentative: _buyerRep,
            independentEscrowAgent: _escrowAgent,
            mergerAgreementHash: _agreementHash,
            status: DealStatus.InEscrow
        });

        emit MergerEscrowFunded(_dealId, _target, _acquirer, msg.value);
    }

    function releaseIndemnityHoldback(string calldata _dealId) external {
        MergerTransaction storage d = deals[_dealId];
        require(d.status == DealStatus.InEscrow || d.status == DealStatus.EarnOutActive, "Invalid deal status");
        require(block.timestamp >= d.indemnificationExpiryTimestamp, "Indemnification period not yet expired");
        require(msg.sender == d.sellerRepresentative || msg.sender == d.independentEscrowAgent, "Unauthorized caller");

        uint256 amountToRelease = d.indemnificationEscrowAmountUSDC;
        d.indemnificationEscrowAmountUSDC = 0;
        d.status = DealStatus.Completed;

        (bool ok, ) = payable(d.sellerRepresentative).call{value: amountToRelease}("");
        require(ok, "Transfer failed");

        emit DealSettledAndReleased(_dealId, d.sellerRepresentative, amountToRelease);
    }
}
