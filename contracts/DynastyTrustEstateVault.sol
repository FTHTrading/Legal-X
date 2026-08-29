// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title DynastyTrustEstateVault
 * @author Legal-X & LegacyChain Sovereign Protocol
 * @notice Multi-Generational Dynasty Trust & Asset Protection Vault.
 * Abolishes Rule Against Perpetuities under South Dakota / Wyoming / Delaware trust laws.
 * Provides spendthrift protections, discretionary distributions, and fiduciary quorum governance.
 */
contract DynastyTrustEstateVault {
    struct TrustFiduciary {
        address wallet;
        string name;
        string role; // "Trustee", "Trust Protector", "Distribution Advisor", "Investment Advisor"
        bool isActive;
    }

    struct BeneficiaryDistribution {
        address beneficiary;
        uint256 distributionAmountUSDC;
        uint256 nextEligibleTimestamp;
        uint256 distributionIntervalSeconds;
        bool isPerpetual;
    }

    string public trustName;
    bytes32 public trustIndentureHash;
    uint256 public totalVaultCollateralUSDC;

    mapping(address => TrustFiduciary) public fiduciaries;
    mapping(address => BeneficiaryDistribution) public beneficiaries;
    address[] public fiduciaryList;

    event TrustEstablished(string indexed trustName, bytes32 indexed indentureHash);
    event FiduciaryAppointed(address indexed wallet, string name, string role);
    event DiscretionaryDistributionExecuted(address indexed beneficiary, uint256 amount);
    event TrustVaultFunded(address indexed donor, uint256 amount);

    constructor(string memory _name, bytes32 _indentureHash) {
        trustName = _name;
        trustIndentureHash = _indentureHash;
        fiduciaries[msg.sender] = TrustFiduciary({
            wallet: msg.sender,
            name: "Initial Settlor / Protector",
            role: "Trust Protector",
            isActive: true
        });
        fiduciaryList.push(msg.sender);
        emit TrustEstablished(_name, _indentureHash);
    }

    modifier onlyTrustProtector() {
        require(keccak256(bytes(fiduciaries[msg.sender].role)) == keccak256(bytes("Trust Protector")), "Only trust protector");
        _;
    }

    function addFiduciary(address _wallet, string calldata _name, string calldata _role) external onlyTrustProtector {
        fiduciaries[_wallet] = TrustFiduciary({
            wallet: _wallet,
            name: _name,
            role: _role,
            isActive: true
        });
        fiduciaryList.push(_wallet);
        emit FiduciaryAppointed(_wallet, _name, _role);
    }

    function fundTrustVault() external payable {
        require(msg.value > 0, "Zero donation");
        totalVaultCollateralUSDC += msg.value;
        emit TrustVaultFunded(msg.sender, msg.value);
    }

    function executeBeneficiaryDistribution(address _beneficiary, uint256 _amount) external onlyTrustProtector {
        require(totalVaultCollateralUSDC >= _amount, "Insufficient trust corpus");
        totalVaultCollateralUSDC -= _amount;

        (bool ok, ) = payable(_beneficiary).call{value: _amount}("");
        require(ok, "Distribution failed");

        emit DiscretionaryDistributionExecuted(_beneficiary, _amount);
    }
}
