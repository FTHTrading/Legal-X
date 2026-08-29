// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title LetterOfCreditSBLCRouter
 * @author Legal-X & LegacyChain Sovereign Protocol
 * @notice Standby Letter of Credit (SBLC), Documentary Credit, and Cross-Border Trade Router.
 * Structured under Uniform Customs and Practice for Documentary Credits (UCP 600) and 
 * International Standby Practices 1998 (ISP98 / ICC Publication No. 590).
 */
contract LetterOfCreditSBLCRouter {
    enum LCStatus { Issued, DocumentsPresented, DiscrepancyNoticed, HonorSettled, Expired, Cancelled }

    struct StandbyLetterOfCredit {
        string lcReferenceNumber;
        string issuingBankSwiftBic;
        string applicantEntity;
        string beneficiaryEntity;
        uint256 creditAmountUSDC;
        uint256 issueDate;
        uint256 expiryDate;
        bytes32 billOfLadingRequiredHash;
        bytes32 inspectionCertRequiredHash;
        address beneficiaryWallet;
        address confirmingBankOrEscrow;
        LCStatus status;
    }

    // lcReferenceNumber => StandbyLetterOfCredit
    mapping(string => StandbyLetterOfCredit) public lettersOfCredit;

    event SBLCIssued(string indexed lcRef, string indexed issuingBank, address indexed beneficiary, uint256 amount);
    event DocumentsConformingPresented(string indexed lcRef, bytes32 blHash, bytes32 certHash);
    event LCHonoredAndSettled(string indexed lcRef, address indexed beneficiary, uint256 amountSettled);

    function issueSBLC(
        string calldata _lcRef,
        string calldata _swiftBic,
        string calldata _applicant,
        string calldata _beneficiary,
        uint256 _durationSeconds,
        bytes32 _blHash,
        bytes32 _certHash,
        address _beneficiaryWallet
    ) external payable {
        require(lettersOfCredit[_lcRef].issueDate == 0, "LC Reference already active");
        require(msg.value > 0, "Must fund letter of credit collateral");

        lettersOfCredit[_lcRef] = StandbyLetterOfCredit({
            lcReferenceNumber: _lcRef,
            issuingBankSwiftBic: _swiftBic,
            applicantEntity: _applicant,
            beneficiaryEntity: _beneficiary,
            creditAmountUSDC: msg.value,
            issueDate: block.timestamp,
            expiryDate: block.timestamp + _durationSeconds,
            billOfLadingRequiredHash: _blHash,
            inspectionCertRequiredHash: _certHash,
            beneficiaryWallet: _beneficiaryWallet,
            confirmingBankOrEscrow: msg.sender,
            status: LCStatus.Issued
        });

        emit SBLCIssued(_lcRef, _swiftBic, _beneficiaryWallet, msg.value);
    }

    function presentConformingDocumentsAndDraw(
        string calldata _lcRef,
        bytes32 _presentedBLHash,
        bytes32 _presentedCertHash
    ) external {
        StandbyLetterOfCredit storage lc = lettersOfCredit[_lcRef];
        require(lc.status == LCStatus.Issued, "LC not in issued status");
        require(block.timestamp <= lc.expiryDate, "LC has expired");
        require(msg.sender == lc.beneficiaryWallet, "Only beneficiary can present documents");
        require(lc.billOfLadingRequiredHash == _presentedBLHash, "Bill of lading mismatch");
        require(lc.inspectionCertRequiredHash == _presentedCertHash, "Inspection certificate mismatch");

        lc.status = LCStatus.HonorSettled;
        uint256 amount = lc.creditAmountUSDC;
        lc.creditAmountUSDC = 0;

        (bool ok, ) = payable(lc.beneficiaryWallet).call{value: amount}("");
        require(ok, "SBLC Honor transfer failed");

        emit DocumentsConformingPresented(_lcRef, _presentedBLHash, _presentedCertHash);
        emit LCHonoredAndSettled(_lcRef, lc.beneficiaryWallet, amount);
    }
}
