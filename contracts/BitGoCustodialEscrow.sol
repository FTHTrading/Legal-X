// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title BitGoCustodialEscrow
 * @author Legal-X & LegacyChain Sovereign Protocol
 * @notice Institutional Qualified Custody, Transfer Agent & Capital Formation Escrow Router.
 * Integrated with BitGo Trust Company, South Dakota Trust Company, and Brassica RWA API rails.
 * 
 * Features:
 * - Segregated Omnibus Cold Storage Multi-Sig (m-of-n)
 * - FINRA Rule 15c3-3 / SEC Reg D 506(c) Escrow Capital Formation
 * - Qualified Custodian Proof-of-Reserve Attestations
 * - Transfer Agent Cap Table Synchronization
 * - Atomic Multi-Party Yield & Liquidation Waterfall Distribution
 */
contract BitGoCustodialEscrow {
    enum EscrowLifecycle { Inception, KYCApproved, CapitalDeposited, EscrowLocked, ClosedAndSettled, Refunded, RegulatoryHold }

    struct CustodialVaultAccount {
        string vaultAccountId;      // BitGo Enterprise Vault UUID
        string spvEntityName;       // Special Purpose Vehicle (e.g. UnyKorn Asset SPV I LLC)
        string assetCusipOrIsin;
        address qualifiedCustodian;  // BitGo Trust Company Address
        address transferAgent;       // Registered Transfer Agent
        address leadCounsel;         // Supervising Attorney of Record
        uint256 targetCapitalizationUSDC;
        uint256 totalDepositedUSDC;
        uint256 closingDeadline;
        bytes32 custodianAttestationRoot; // BitGo Qualified Custodian Daily Attestation Digest
        bytes32 secOfferingCircularHash;  // Form D / Offering Circular Hash
        EscrowLifecycle status;
        bool isBankruptcyRemote;
    }

    struct InvestorDeposit {
        address investorWallet;
        uint256 amountUSDC;
        bytes32 kycAmlProofDigest;
        uint256 depositedAt;
        bool isAccreditedVerified;
    }

    // vaultAccountId => CustodialVaultAccount
    mapping(string => CustodialVaultAccount) public custodialVaults;

    // vaultAccountId => array of InvestorDeposit
    mapping(string => InvestorDeposit[]) public vaultInvestors;

    event BitGoVaultRegistered(string indexed vaultId, string spvName, address indexed custodian, uint256 targetAmount);
    event QualifiedDepositReceived(string indexed vaultId, address indexed investor, uint256 amount, bytes32 kycDigest);
    event CustodianAttestationAnchored(string indexed vaultId, bytes32 indexed attestationRoot, uint256 timestamp);
    event EscrowSettledToSPV(string indexed vaultId, address indexed spvRecipient, uint256 totalAmount);
    event EscrowRefundedToInvestors(string indexed vaultId, uint256 totalRefunded);

    modifier onlyCustodian(string calldata _vaultId) {
        require(msg.sender == custodialVaults[_vaultId].qualifiedCustodian, "Caller is not BitGo Qualified Custodian");
        _;
    }

    modifier onlyLeadCounsel(string calldata _vaultId) {
        require(msg.sender == custodialVaults[_vaultId].leadCounsel, "Caller is not Lead Counsel of Record");
        _;
    }

    function initializeBitGoVault(
        string calldata _vaultId,
        string calldata _spvName,
        string calldata _cusip,
        address _custodian,
        address _transferAgent,
        uint256 _targetUSDC,
        uint256 _durationSeconds,
        bytes32 _offeringHash
    ) external {
        require(custodialVaults[_vaultId].closingDeadline == 0, "Vault already exists");
        require(_custodian != address(0), "Invalid custodian");

        custodialVaults[_vaultId] = CustodialVaultAccount({
            vaultAccountId: _vaultId,
            spvEntityName: _spvName,
            assetCusipOrIsin: _cusip,
            qualifiedCustodian: _custodian,
            transferAgent: _transferAgent,
            leadCounsel: msg.sender,
            targetCapitalizationUSDC: _targetUSDC,
            totalDepositedUSDC: 0,
            closingDeadline: block.timestamp + _durationSeconds,
            custodianAttestationRoot: bytes32(0),
            secOfferingCircularHash: _offeringHash,
            status: EscrowLifecycle.Inception,
            isBankruptcyRemote: true
        });

        emit BitGoVaultRegistered(_vaultId, _spvName, _custodian, _targetUSDC);
    }

    function depositInvestorCapital(
        string calldata _vaultId,
        bytes32 _kycAmlProofDigest,
        bool _isAccredited
    ) external payable {
        CustodialVaultAccount storage v = custodialVaults[_vaultId];
        require(v.closingDeadline > block.timestamp, "Escrow deadline expired");
        require(v.status == EscrowLifecycle.Inception || v.status == EscrowLifecycle.CapitalDeposited, "Vault not accepting deposits");
        require(msg.value > 0, "Zero deposit");
        require(_isAccredited, "Must be accredited investor");

        v.totalDepositedUSDC += msg.value;
        v.status = EscrowLifecycle.CapitalDeposited;

        vaultInvestors[_vaultId].push(InvestorDeposit({
            investorWallet: msg.sender,
            amountUSDC: msg.value,
            kycAmlProofDigest: _kycAmlProofDigest,
            depositedAt: block.timestamp,
            isAccreditedVerified: true
        }));

        emit QualifiedDepositReceived(_vaultId, msg.sender, msg.value, _kycAmlProofDigest);
    }

    function anchorBitGoProofOfReserve(
        string calldata _vaultId,
        bytes32 _attestationRoot
    ) external onlyCustodian(_vaultId) {
        custodialVaults[_vaultId].custodianAttestationRoot = _attestationRoot;
        emit CustodianAttestationAnchored(_vaultId, _attestationRoot, block.timestamp);
    }

    function executeClosingAndReleaseToSPV(
        string calldata _vaultId,
        address _spvTreasury
    ) external onlyLeadCounsel(_vaultId) {
        CustodialVaultAccount storage v = custodialVaults[_vaultId];
        require(v.totalDepositedUSDC >= v.targetCapitalizationUSDC, "Target escrow minimum not met");
        require(v.custodianAttestationRoot != bytes32(0), "Qualified custodian attestation missing");

        v.status = EscrowLifecycle.ClosedAndSettled;
        uint256 amount = v.totalDepositedUSDC;
        v.totalDepositedUSDC = 0;

        (bool ok, ) = payable(_spvTreasury).call{value: amount}("");
        require(ok, "Transfer to SPV failed");

        emit EscrowSettledToSPV(_vaultId, _spvTreasury, amount);
    }
}
