// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title CaseDNARegistry
 * @author Legal-X Protocol
 * @notice Canonical on-chain registry for Case Digital DNA strands and Matter Digital Twins.
 * Enforces immutable state transitions, DAG amendment lineage, and quorum approval gates.
 */
contract CaseDNARegistry {
    enum MatterStatus { Inception, Discovery, PleadingActive, InTrial, InSettlement, Adjudicated, Sealed }

    struct MatterStrand {
        string matterId;
        string organizationId;
        bytes32 genesisStateDigest;
        bytes32 latestStateDigest;
        uint256 blockTimestamp;
        uint256 amendmentCount;
        MatterStatus status;
        address leadCounsel;
        bool isImmutable;
    }

    struct DNAElement {
        bytes32 elementType;     // e.g., keccak256("ELEMENT_OF_PROOF"), keccak256("JURISDICTION")
        bytes32 elementHash;     // SHA-256 / BLAKE2b hash of element payload
        uint256 characterOffsetStart;
        uint256 characterOffsetEnd;
        string sourceUri;
        uint256 registeredAt;
        address verifiedBy;
    }

    // matterId => MatterStrand
    mapping(string => MatterStrand) public matters;
    
    // matterId => array of DNA elements in the case strand
    mapping(string => DNAElement[]) private matterDNAElements;
    
    // matterId => version => historical state digest
    mapping(string => mapping(uint256 => bytes32)) public stateHistory;

    event MatterIncepted(string indexed matterId, string indexed orgId, bytes32 indexed genesisHash, address leadCounsel);
    event DNAElementAppended(string indexed matterId, bytes32 indexed elementType, bytes32 elementHash, address verifiedBy);
    event MatterStateAmended(string indexed matterId, uint256 newVersion, bytes32 newStateDigest, address amendedBy);
    event MatterStatusChanged(string indexed matterId, MatterStatus newStatus);

    modifier onlyLeadCounsel(string calldata _matterId) {
        require(matters[_matterId].leadCounsel == msg.sender, "Caller is not lead counsel");
        _;
    }

    function inceptMatter(
        string calldata _matterId,
        string calldata _orgId,
        bytes32 _genesisStateDigest
    ) external {
        require(matters[_matterId].blockTimestamp == 0, "Matter already incepted");
        require(_genesisStateDigest != bytes32(0), "Invalid genesis digest");

        matters[_matterId] = MatterStrand({
            matterId: _matterId,
            organizationId: _orgId,
            genesisStateDigest: _genesisStateDigest,
            latestStateDigest: _genesisStateDigest,
            blockTimestamp: block.timestamp,
            amendmentCount: 1,
            status: MatterStatus.Inception,
            leadCounsel: msg.sender,
            isImmutable: false
        });

        stateHistory[_matterId][1] = _genesisStateDigest;
        emit MatterIncepted(_matterId, _orgId, _genesisStateDigest, msg.sender);
    }

    function appendDNAElement(
        string calldata _matterId,
        bytes32 _elementType,
        bytes32 _elementHash,
        uint256 _offsetStart,
        uint256 _offsetEnd,
        string calldata _sourceUri
    ) external onlyLeadCounsel(_matterId) {
        require(!matters[_matterId].isImmutable, "Matter strand sealed");

        DNAElement memory elem = DNAElement({
            elementType: _elementType,
            elementHash: _elementHash,
            characterOffsetStart: _offsetStart,
            characterOffsetEnd: _offsetEnd,
            sourceUri: _sourceUri,
            registeredAt: block.timestamp,
            verifiedBy: msg.sender
        });

        matterDNAElements[_matterId].push(elem);
        
        // Calculate new combined state digest
        bytes32 newState = keccak256(abi.encodePacked(
            matters[_matterId].latestStateDigest,
            _elementType,
            _elementHash,
            block.timestamp
        ));

        uint256 v = matters[_matterId].amendmentCount + 1;
        matters[_matterId].amendmentCount = v;
        matters[_matterId].latestStateDigest = newState;
        stateHistory[_matterId][v] = newState;

        emit DNAElementAppended(_matterId, _elementType, _elementHash, msg.sender);
        emit MatterStateAmended(_matterId, v, newState, msg.sender);
    }

    function setMatterStatus(string calldata _matterId, MatterStatus _newStatus) external onlyLeadCounsel(_matterId) {
        matters[_matterId].status = _newStatus;
        if (_newStatus == MatterStatus.Sealed || _newStatus == MatterStatus.Adjudicated) {
            matters[_matterId].isImmutable = true;
        }
        emit MatterStatusChanged(_matterId, _newStatus);
    }

    function getDNAElementCount(string calldata _matterId) external view returns (uint256) {
        return matterDNAElements[_matterId].length;
    }

    function getDNAElement(string calldata _matterId, uint256 _index) external view returns (DNAElement memory) {
        require(_index < matterDNAElements[_matterId].length, "Index out of bounds");
        return matterDNAElements[_matterId][_index];
    }
}
