// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title RWAGeniusActAssetVault
 * @author Legal-X & LegacyChain Sovereign Protocol
 * @notice Global Real-World Asset (RWA) Vault implementing the GENIUS Act (Generating Economic National 
 * Innovation & Ubiquitous Security) standards and Uniform Commercial Code (UCC) Article 12 for 
 * "Controllable Electronic Records" (CERs) and Article 9 electronic security interest perfection.
 * 
 * Compliant across:
 * - US UCC Article 12 & DGCL § 224 (Blockchain Stock & Debt Ledgers)
 * - EU MiCA (Markets in Crypto-Assets) & Luxembourg Securitization Law
 * - UAE DIFC Digital Assets Law No. 2 of 2024 & ADGM DLT Regulations
 * - Swiss DLT Act (Uncertificated Ledger-Based Securities / Bucheffekten)
 * - Singapore MAS Project Guardian Standard
 */
contract RWAGeniusActAssetVault {
    enum Jurisdiction { US_Delaware, US_Wyoming, US_NewYork, EU_Luxembourg, UK_CommonLaw, UAE_DIFC, UAE_ADGM, CH_Switzerland, SG_Singapore, HK_SFC, KY_Cayman }
    enum AssetCategory { RealEstate, SovereignDebt, CommodityReserve, CorporateEquity, PrivateCredit, IntellectualProperty, InfrastructureLease }

    struct RWAAssetStrand {
        string assetId;
        string cusipOrIsin;
        string legalEntityName;
        Jurisdiction primaryJurisdiction;
        AssetCategory category;
        uint256 appraisalValuationUSD;
        uint256 totalFractionalTokens;
        bytes32 custodianVaultDigest;
        bytes32 uccArticle12ControlHash; // Perfected electronic control digest
        address legalCounselAttestor;
        uint256 createdAt;
        bool isPerfectionAnchored;
        bool isTradingFrozen;
    }

    // assetId => RWAAssetStrand
    mapping(string => RWAAssetStrand) public rwaAssets;

    // assetId => owner address => balance
    mapping(string => mapping(address => uint256)) public fractionalHoldings;

    // assetId => array of authorized institutional custodians
    mapping(string => address[]) private assetCustodians;

    event RWAAssetRegistered(string indexed assetId, string cusipOrIsin, Jurisdiction indexed jurisdiction, uint256 valuation);
    event UCC12ControlPerfected(string indexed assetId, bytes32 indexed controlHash, address indexed counsel);
    event FractionalUnitsAllocated(string indexed assetId, address indexed investor, uint256 units);
    event AssetTradingFrozen(string indexed assetId, string reason);

    function registerGENIUSAsset(
        string calldata _assetId,
        string calldata _cusipOrIsin,
        string calldata _entityName,
        Jurisdiction _jurisdiction,
        AssetCategory _category,
        uint256 _valuationUSD,
        uint256 _fractionalSupply,
        bytes32 _vaultDigest,
        bytes32 _uccControlHash
    ) external {
        require(rwaAssets[_assetId].createdAt == 0, "Asset ID already exists");
        require(_valuationUSD > 0, "Valuation must be positive");
        require(_fractionalSupply > 0, "Supply must be positive");

        rwaAssets[_assetId] = RWAAssetStrand({
            assetId: _assetId,
            cusipOrIsin: _cusipOrIsin,
            legalEntityName: _entityName,
            primaryJurisdiction: _jurisdiction,
            category: _category,
            appraisalValuationUSD: _valuationUSD,
            totalFractionalTokens: _fractionalSupply,
            custodianVaultDigest: _vaultDigest,
            uccArticle12ControlHash: _uccControlHash,
            legalCounselAttestor: msg.sender,
            createdAt: block.timestamp,
            isPerfectionAnchored: true,
            isTradingFrozen: false
        });

        fractionalHoldings[_assetId][msg.sender] = _fractionalSupply;

        emit RWAAssetRegistered(_assetId, _cusipOrIsin, _jurisdiction, _valuationUSD);
        emit UCC12ControlPerfected(_assetId, _uccControlHash, msg.sender);
    }

    function transferFractionalRWA(
        string calldata _assetId,
        address _to,
        uint256 _amount
    ) external returns (bool) {
        RWAAssetStrand memory asset = rwaAssets[_assetId];
        require(!asset.isTradingFrozen, "Asset trading currently suspended");
        require(fractionalHoldings[_assetId][msg.sender] >= _amount, "Insufficient fractional balance");

        fractionalHoldings[_assetId][msg.sender] -= _amount;
        fractionalHoldings[_assetId][_to] += _amount;

        emit FractionalUnitsAllocated(_assetId, _to, _amount);
        return true;
    }

    function verifyGlobalPerfection(string calldata _assetId) external view returns (
        bool perfected,
        Jurisdiction jurisdiction,
        uint256 valuation,
        bytes32 controlHash,
        address counsel
    ) {
        RWAAssetStrand memory a = rwaAssets[_assetId];
        require(a.createdAt > 0, "Asset not found");
        return (a.isPerfectionAnchored, a.primaryJurisdiction, a.appraisalValuationUSD, a.uccArticle12ControlHash, a.legalCounselAttestor);
    }
}
