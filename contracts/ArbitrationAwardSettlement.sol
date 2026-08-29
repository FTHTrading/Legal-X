// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title ArbitrationAwardSettlement
 * @author Legal-X & LegacyChain Sovereign Protocol
 * @notice Autonomous International Arbitration Award Enforcement & Settlement Engine.
 * Enforceable globally under the 1958 New York Convention on the Recognition and 
 * Enforcement of Foreign Arbitral Awards (172 Contracting States) & UNCITRAL Rules.
 */
contract ArbitrationAwardSettlement {
    enum TribunalStatus { InArbitration, AwardRendered, FinalSettled, Annulled }

    struct ArbitralProceeding {
        string tribunalMatterId;
        string claimantEntity;
        string respondentEntity;
        string arbitrationSeat; // e.g. "Paris", "London (LCIA)", "New York (AAA/ICDR)", "Singapore (SIAC)"
        uint256 escrowedSecurityForCostsUSDC;
        bytes32 arbitrationClauseHash;
        bytes32 finalAwardDigest;
        address presidingArbitrator;
        TribunalStatus status;
        address prevailingParty;
        uint256 awardAmountUSDC;
    }

    // tribunalMatterId => ArbitralProceeding
    mapping(string => ArbitralProceeding) public proceedings;

    event ArbitrationCommenced(string indexed matterId, string seat, address indexed arbitrator, uint256 securityDeposit);
    event ArbitralAwardRendered(string indexed matterId, bytes32 indexed awardDigest, address indexed prevailingParty, uint256 awardAmount);
    event AwardExecutedAndReleased(string indexed matterId, address indexed recipient, uint256 amount);

    function commenceArbitration(
        string calldata _matterId,
        string calldata _claimant,
        string calldata _respondent,
        string calldata _seat,
        bytes32 _clauseHash,
        address _arbitrator
    ) external payable {
        require(proceedings[_matterId].presidingArbitrator == address(0), "Matter already pending");
        require(msg.value > 0, "Must deposit security for costs");

        proceedings[_matterId] = ArbitralProceeding({
            tribunalMatterId: _matterId,
            claimantEntity: _claimant,
            respondentEntity: _respondent,
            arbitrationSeat: _seat,
            escrowedSecurityForCostsUSDC: msg.value,
            arbitrationClauseHash: _clauseHash,
            finalAwardDigest: bytes32(0),
            presidingArbitrator: _arbitrator,
            status: TribunalStatus.InArbitration,
            prevailingParty: address(0),
            awardAmountUSDC: 0
        });

        emit ArbitrationCommenced(_matterId, _seat, _arbitrator, msg.value);
    }

    function renderFinalAward(
        string calldata _matterId,
        bytes32 _awardDigest,
        address _prevailingParty,
        uint256 _awardAmountUSDC
    ) external {
        ArbitralProceeding storage p = proceedings[_matterId];
        require(p.status == TribunalStatus.InArbitration, "Arbitration not active");
        require(msg.sender == p.presidingArbitrator, "Only presiding arbitrator may enter award");

        p.finalAwardDigest = _awardDigest;
        p.prevailingParty = _prevailingParty;
        p.awardAmountUSDC = _awardAmountUSDC;
        p.status = TribunalStatus.AwardRendered;

        emit ArbitralAwardRendered(_matterId, _awardDigest, _prevailingParty, _awardAmountUSDC);

        // Execute release of escrowed security
        uint256 payout = p.escrowedSecurityForCostsUSDC;
        p.escrowedSecurityForCostsUSDC = 0;
        p.status = TribunalStatus.FinalSettled;

        (bool ok, ) = payable(_prevailingParty).call{value: payout}("");
        require(ok, "Transfer failed");

        emit AwardExecutedAndReleased(_matterId, _prevailingParty, payout);
    }
}
