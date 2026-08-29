// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title BankruptcyCreditorWaterfall
 * @author Legal-X & LegacyChain Sovereign Protocol
 * @notice Chapter 11 / Insolvency Reorganization & Absolute Priority Rule Creditor Waterfall.
 * Enforces strict priority hierarchy: Senior Secured > Administrative Claims > Unsecured Creditors > Equity.
 */
contract BankruptcyCreditorWaterfall {
    enum PriorityTier { SeniorSecured, AdministrativeExpense, GeneralUnsecured, SubordinatedDebt, EquityHolder }

    struct CreditorClaim {
        address creditorWallet;
        string creditorName;
        PriorityTier tier;
        uint256 allowedClaimAmountUSDC;
        uint256 cumulativePaidUSDC;
        bool isAllowedByCourt;
    }

    string public bankruptcyCaseNumber;
    address public bankruptcyTrusteeOrExaminer;
    uint256 public totalLiquidationPoolUSDC;

    CreditorClaim[] public claims;

    event ClaimRegistered(uint256 indexed claimId, string creditorName, PriorityTier tier, uint256 amount);
    event LiquidationProceedsDeposited(uint256 amount);
    event WaterfallDistributed(uint256 totalDistributed);

    constructor(string memory _caseNo) {
        bankruptcyCaseNumber = _caseNo;
        bankruptcyTrusteeOrExaminer = msg.sender;
    }

    modifier onlyTrustee() {
        require(msg.sender == bankruptcyTrusteeOrExaminer, "Only bankruptcy trustee");
        _;
    }

    function registerAllowedClaim(
        address _creditor,
        string calldata _name,
        PriorityTier _tier,
        uint256 _amount
    ) external onlyTrustee {
        claims.push(CreditorClaim({
            creditorWallet: _creditor,
            creditorName: _name,
            tier: _tier,
            allowedClaimAmountUSDC: _amount,
            cumulativePaidUSDC: 0,
            isAllowedByCourt: true
        }));

        emit ClaimRegistered(claims.length - 1, _name, _tier, _amount);
    }

    function depositEstateProceeds() external payable {
        require(msg.value > 0, "Zero deposit");
        totalLiquidationPoolUSDC += msg.value;
        emit LiquidationProceedsDeposited(msg.value);
    }

    function executeAbsolutePriorityWaterfall() external onlyTrustee {
        require(totalLiquidationPoolUSDC > 0, "No estate funds available");
        uint256 pool = totalLiquidationPoolUSDC;

        // Iterate tiers in strict order 0 to 4
        for (uint8 t = 0; t <= 4; t++) {
            PriorityTier targetTier = PriorityTier(t);
            for (uint256 i = 0; i < claims.length; i++) {
                if (claims[i].tier == targetTier && claims[i].isAllowedByCourt) {
                    uint256 remaining = claims[i].allowedClaimAmountUSDC - claims[i].cumulativePaidUSDC;
                    if (remaining > 0 && pool > 0) {
                        uint256 payout = pool >= remaining ? remaining : pool;
                        pool -= payout;
                        claims[i].cumulativePaidUSDC += payout;
                        (bool ok, ) = payable(claims[i].creditorWallet).call{value: payout}("");
                        require(ok, "Transfer failed");
                    }
                }
            }
        }

        uint256 distributed = totalLiquidationPoolUSDC - pool;
        totalLiquidationPoolUSDC = pool;
        emit WaterfallDistributed(distributed);
    }
}
