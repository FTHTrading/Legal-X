// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title AttorneySignOffQuorum
 * @author Legal-X Protocol
 * @notice Multi-Counsel Ethical Governance and Signature Threshold Quorum Contract.
 * Implements ABA Model Rules 5.1 & 5.3 supervisory compliance and FRCP Rule 11(b) lead counsel certification.
 */
contract AttorneySignOffQuorum {
    struct AttorneyRecord {
        string fullName;
        string barJurisdiction;   // e.g. "DE", "SDNY", "CA", "TX"
        string barNumber;
        address walletAddress;
        bool isActive;
        uint256 admittedTimestamp;
    }

    struct FilingPleadingApproval {
        string matterId;
        string documentUuid;
        bytes32 finalBriefHash;
        uint256 requiredQuorum;     // e.g. 2 lead partners
        uint256 currentApprovalCount;
        bool isFilingApproved;
        uint256 approvalTimestamp;
    }

    // wallet => AttorneyRecord
    mapping(address => AttorneyRecord) public attorneys;
    
    // documentUuid => FilingPleadingApproval
    mapping(string => FilingPleadingApproval) public filingApprovals;
    
    // documentUuid => attorney address => hasApproved
    mapping(string => mapping(address => bool)) public hasAttorneySigned;

    event AttorneyEnrolled(address indexed wallet, string fullName, string jurisdiction, string barNumber);
    event PleadingCreatedForApproval(string indexed matterId, string indexed documentUuid, bytes32 indexed briefHash, uint256 quorum);
    event AttorneySigned(string indexed documentUuid, address indexed attorney, string barNumber, bytes32 briefHash);
    event PleadingFullyApproved(string indexed matterId, string indexed documentUuid, bytes32 indexed briefHash);

    address public admin;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Caller is not admin");
        _;
    }

    function enrollAttorney(
        address _wallet,
        string calldata _name,
        string calldata _jurisdiction,
        string calldata _barNo
    ) external onlyAdmin {
        attorneys[_wallet] = AttorneyRecord({
            fullName: _name,
            barJurisdiction: _jurisdiction,
            barNumber: _barNo,
            walletAddress: _wallet,
            isActive: true,
            admittedTimestamp: block.timestamp
        });

        emit AttorneyEnrolled(_wallet, _name, _jurisdiction, _barNo);
    }

    function initiateFilingApproval(
        string calldata _matterId,
        string calldata _documentUuid,
        bytes32 _briefHash,
        uint256 _requiredQuorum
    ) external {
        require(filingApprovals[_documentUuid].approvalTimestamp == 0, "Approval workflow already active");
        require(_requiredQuorum > 0, "Quorum must be at least 1");

        filingApprovals[_documentUuid] = FilingPleadingApproval({
            matterId: _matterId,
            documentUuid: _documentUuid,
            finalBriefHash: _briefHash,
            requiredQuorum: _requiredQuorum,
            currentApprovalCount: 0,
            isFilingApproved: false,
            approvalTimestamp: 0
        });

        emit PleadingCreatedForApproval(_matterId, _documentUuid, _briefHash, _requiredQuorum);
    }

    function signAndApprovePleading(string calldata _documentUuid) external {
        AttorneyRecord memory atty = attorneys[msg.sender];
        require(atty.isActive, "Signer is not an active enrolled attorney");
        
        FilingPleadingApproval storage p = filingApprovals[_documentUuid];
        require(p.requiredQuorum > 0, "Filing not initialized");
        require(!p.isFilingApproved, "Filing is already fully approved");
        require(!hasAttorneySigned[_documentUuid][msg.sender], "Attorney has already signed");

        hasAttorneySigned[_documentUuid][msg.sender] = true;
        p.currentApprovalCount += 1;

        emit AttorneySigned(_documentUuid, msg.sender, atty.barNumber, p.finalBriefHash);

        if (p.currentApprovalCount >= p.requiredQuorum) {
            p.isFilingApproved = true;
            p.approvalTimestamp = block.timestamp;
            emit PleadingFullyApproved(p.matterId, _documentUuid, p.finalBriefHash);
        }
    }
}
