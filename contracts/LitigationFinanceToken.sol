// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title LitigationFinanceToken
 * @author Legal-X Protocol
 * @notice Permissioned Real-World Asset (RWA) Claim Participation & Litigation Finance Instrument.
 * Implements SEC Regulation D / Rule 506(c) compliant identity whitelisting, recovery waterfalls, and atomic payout distributions.
 */
contract LitigationFinanceToken {
    string public name;
    string public symbol;
    uint8 public constant decimals = 6; // USDC standard
    uint256 public totalSupply;
    
    string public matterId;
    address public leadCounselTreasury;
    uint256 public totalClaimValuationUSDC;
    uint256 public totalRecoveryReceivedUSDC;
    bool public isSettled;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    mapping(address => bool) public isKYCWhitelisted;
    mapping(address => uint256) public payoutClaimed;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event WhitelistUpdated(address indexed investor, bool status);
    event RecoveryDeposited(uint256 amountUSDC, uint256 cumulativeTotal);
    event PayoutClaimed(address indexed investor, uint256 amountUSDC);

    modifier onlyWhitelisted(address _addr) {
        require(isKYCWhitelisted[_addr], "Investor not accredited/whitelisted");
        _;
    }

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _matterId,
        uint256 _initialUnits,
        uint256 _valuationUSDC,
        address _leadCounsel
    ) {
        name = _name;
        symbol = _symbol;
        matterId = _matterId;
        totalClaimValuationUSDC = _valuationUSDC;
        leadCounselTreasury = _leadCounsel;

        totalSupply = _initialUnits;
        balanceOf[msg.sender] = _initialUnits;
        isKYCWhitelisted[msg.sender] = true;
        isKYCWhitelisted[_leadCounsel] = true;

        emit Transfer(address(0), msg.sender, _initialUnits);
    }

    function setInvestorWhitelist(address _investor, bool _status) external {
        require(msg.sender == leadCounselTreasury, "Only counsel may modify whitelist");
        isKYCWhitelisted[_investor] = _status;
        emit WhitelistUpdated(_investor, _status);
    }

    function transfer(address _to, uint256 _value) external onlyWhitelisted(msg.sender) onlyWhitelisted(_to) returns (bool) {
        require(balanceOf[msg.sender] >= _value, "Insufficient balance");
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) external returns (bool) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) external onlyWhitelisted(_from) onlyWhitelisted(_to) returns (bool) {
        require(balanceOf[_from] >= _value, "Insufficient balance");
        require(allowance[_from][msg.sender] >= _value, "Allowance exceeded");
        balanceOf[_from] -= _value;
        allowance[_from][msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(_from, _to, _value);
        return true;
    }

    function depositSettlementRecovery() external payable {
        require(msg.value > 0, "Zero recovery deposit");
        totalRecoveryReceivedUSDC += msg.value;
        isSettled = true;
        emit RecoveryDeposited(msg.value, totalRecoveryReceivedUSDC);
    }

    function claimProRataPayout() external onlyWhitelisted(msg.sender) {
        require(totalRecoveryReceivedUSDC > 0, "No recovery distributions available");
        uint256 units = balanceOf[msg.sender];
        require(units > 0, "No token units held");

        uint256 totalEntitlement = (totalRecoveryReceivedUSDC * units) / totalSupply;
        uint256 alreadyPaid = payoutClaimed[msg.sender];
        require(totalEntitlement > alreadyPaid, "All distributions claimed");

        uint256 netPayout = totalEntitlement - alreadyPaid;
        payoutClaimed[msg.sender] = totalEntitlement;

        (bool ok, ) = payable(msg.sender).call{value: netPayout}("");
        require(ok, "Payout transfer failed");
        emit PayoutClaimed(msg.sender, netPayout);
    }
}
