// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title IntellectualPropertyRoyaltySplitter
 * @author Legal-X & LegacyChain Sovereign Protocol
 * @notice Patent, Trademark, Software & Copyright Licensing Royalty Automation Contract.
 * Enforces 35 U.S.C. patent rights, automated split waterfalls, and zero-leakage licensing receipts.
 */
contract IntellectualPropertyRoyaltySplitter {
    struct IPRoyaltyContract {
        string ipAssetId;
        string registrationNumber; // USPTO / WIPO registration ID
        bytes32 patentClaimDigest;
        address primaryLicensor;
        uint256 totalCumulativeRoyaltiesUSDC;
        uint256 totalPayoutsDistributedUSDC;
        bool isLicenseActive;
    }

    struct PayeeShare {
        address payee;
        uint256 basisPoints; // e.g. 2500 = 25%
    }

    // ipAssetId => IPRoyaltyContract
    mapping(string => IPRoyaltyContract) public ipAssets;

    // ipAssetId => array of PayeeShare
    mapping(string => PayeeShare[]) public royaltySplits;

    event RoyaltyContractRegistered(string indexed ipAssetId, string registrationNo, address indexed licensor);
    event RoyaltyDeposited(string indexed ipAssetId, address indexed licensee, uint256 amountUSDC);
    event SplitDistributed(string indexed ipAssetId, address indexed recipient, uint256 payoutAmount);

    function registerIPAsset(
        string calldata _ipAssetId,
        string calldata _regNo,
        bytes32 _claimDigest,
        address[] calldata _payees,
        uint256[] calldata _basisPoints
    ) external {
        require(ipAssets[_ipAssetId].primaryLicensor == address(0), "IP Asset ID already registered");
        require(_payees.length == _basisPoints.length, "Array length mismatch");
        
        uint256 totalPoints = 0;
        for (uint256 i = 0; i < _basisPoints.length; i++) {
            totalPoints += _basisPoints[i];
            royaltySplits[_ipAssetId].push(PayeeShare({
                payee: _payees[i],
                basisPoints: _basisPoints[i]
            }));
        }
        require(totalPoints == 10000, "Total basis points must equal 10,000 (100%)");

        ipAssets[_ipAssetId] = IPRoyaltyContract({
            ipAssetId: _ipAssetId,
            registrationNumber: _regNo,
            patentClaimDigest: _claimDigest,
            primaryLicensor: msg.sender,
            totalCumulativeRoyaltiesUSDC: 0,
            totalPayoutsDistributedUSDC: 0,
            isLicenseActive: true
        });

        emit RoyaltyContractRegistered(_ipAssetId, _regNo, msg.sender);
    }

    function depositAndDistributeRoyalty(string calldata _ipAssetId) external payable {
        require(msg.value > 0, "Zero royalty deposit");
        IPRoyaltyContract storage asset = ipAssets[_ipAssetId];
        require(asset.isLicenseActive, "IP licensing agreement inactive");

        asset.totalCumulativeRoyaltiesUSDC += msg.value;
        emit RoyaltyDeposited(_ipAssetId, msg.sender, msg.value);

        PayeeShare[] memory splits = royaltySplits[_ipAssetId];
        for (uint256 i = 0; i < splits.length; i++) {
            uint256 payout = (msg.value * splits[i].basisPoints) / 10000;
            (bool ok, ) = payable(splits[i].payee).call{value: payout}("");
            require(ok, "Royalty transfer failed");
            emit SplitDistributed(_ipAssetId, splits[i].payee, payout);
        }
        asset.totalPayoutsDistributedUSDC += msg.value;
    }
}
