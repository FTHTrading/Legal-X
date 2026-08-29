// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title SovereignTitleDeedRegistry
 * @author Legal-X & LegacyChain Sovereign Protocol
 * @notice Real Estate & Fractional Land Title Deed Registry.
 * Enforces county recorder hash anchoring, GIS polygon coordinates, title insurance policy roots,
 * and encumbrance/lien perfection under state real property law.
 */
contract SovereignTitleDeedRegistry {
    struct PropertyDeed {
        string parcelIdentificationNumber; // PIN / APN
        string legalDescription;
        string countyAndState;
        int256 latitudeMicroDeg;
        int256 longitudeMicroDeg;
        bytes32 recorderBookPageHash;
        bytes32 titleInsurancePolicyHash;
        address currentFeeSimpleOwner;
        uint256 acquisitionTimestamp;
        bool hasActiveLienOrEncumbrance;
        bytes32 activeLienDigest;
    }

    // PIN => PropertyDeed
    mapping(string => PropertyDeed) public propertyDeeds;

    event DeedRecorded(string indexed pin, string countyState, address indexed owner, bytes32 bookPageHash);
    event TitleTransferred(string indexed pin, address indexed previousOwner, address indexed newOwner, uint256 considerationUSD);
    event EncumbranceRegistered(string indexed pin, bytes32 indexed lienDigest, string lienor);
    event EncumbranceSatisfiedAndReleased(string indexed pin, bytes32 indexed lienDigest);

    function recordInitialDeed(
        string calldata _pin,
        string calldata _legalDesc,
        string calldata _countyState,
        int256 _lat,
        int256 _long,
        bytes32 _recorderHash,
        bytes32 _titlePolicyHash
    ) external {
        require(propertyDeeds[_pin].acquisitionTimestamp == 0, "PIN already registered");

        propertyDeeds[_pin] = PropertyDeed({
            parcelIdentificationNumber: _pin,
            legalDescription: _legalDesc,
            countyAndState: _countyState,
            latitudeMicroDeg: _lat,
            longitudeMicroDeg: _long,
            recorderBookPageHash: _recorderHash,
            titleInsurancePolicyHash: _titlePolicyHash,
            currentFeeSimpleOwner: msg.sender,
            acquisitionTimestamp: block.timestamp,
            hasActiveLienOrEncumbrance: false,
            activeLienDigest: bytes32(0)
        });

        emit DeedRecorded(_pin, _countyState, msg.sender, _recorderHash);
    }

    function transferTitleWithWarranty(
        string calldata _pin,
        address _newOwner,
        bytes32 _newDeedRecordingHash,
        uint256 _considerationUSD
    ) external {
        PropertyDeed storage deed = propertyDeeds[_pin];
        require(deed.currentFeeSimpleOwner == msg.sender, "Caller is not fee simple owner");
        require(!deed.hasActiveLienOrEncumbrance, "Cannot transfer title with unreleased encumbrances");
        require(_newOwner != address(0), "Invalid new owner");

        address previous = deed.currentFeeSimpleOwner;
        deed.currentFeeSimpleOwner = _newOwner;
        deed.recorderBookPageHash = _newDeedRecordingHash;
        deed.acquisitionTimestamp = block.timestamp;

        emit TitleTransferred(_pin, previous, _newOwner, _considerationUSD);
    }

    function perfectLien(string calldata _pin, bytes32 _lienDigest, string calldata _lienor) external {
        PropertyDeed storage deed = propertyDeeds[_pin];
        require(deed.acquisitionTimestamp > 0, "Property does not exist");
        deed.hasActiveLienOrEncumbrance = true;
        deed.activeLienDigest = _lienDigest;
        emit EncumbranceRegistered(_pin, _lienDigest, _lienor);
    }

    function releaseLien(string calldata _pin, bytes32 _lienDigest) external {
        PropertyDeed storage deed = propertyDeeds[_pin];
        require(deed.activeLienDigest == _lienDigest, "Lien digest mismatch");
        deed.hasActiveLienOrEncumbrance = false;
        deed.activeLienDigest = bytes32(0);
        emit EncumbranceSatisfiedAndReleased(_pin, _lienDigest);
    }
}
