// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @dev Interface for standard ERC20 token (e.g. USDC on Base)
 */
interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function transfer(address recipient, uint256 amount) external returns (bool);
}

/**
 * @title X402EscrowSettlement
 * @dev Machine-to-machine x402 payment settlement contract on Base (Chain ID 8453).
 */
contract X402EscrowSettlement {
    address public immutable treasury;
    IERC20 public immutable usdcToken;

    struct PaymentReceipt {
        bytes32 nonceHash;
        address payer;
        uint256 amount;
        uint256 settledAt;
        bool isConsumed;
    }

    mapping(bytes32 => PaymentReceipt) public receipts;
    event PaymentSettled(bytes32 indexed receiptId, bytes32 indexed nonceHash, address indexed payer, uint256 amount);
    event ReceiptConsumed(bytes32 indexed receiptId);

    constructor(address _treasury, address _usdcToken) {
        treasury = _treasury;
        usdcToken = IERC20(_usdcToken);
    }

    /**
     * @notice Settles a machine-to-machine payment for an x402 resource challenge
     */
    function settlePayment(
        bytes32 _receiptId,
        bytes32 _nonceHash,
        uint256 _amount
    ) external {
        require(receipts[_receiptId].settledAt == 0, "Receipt already exists");
        require(usdcToken.transferFrom(msg.sender, treasury, _amount), "USDC transfer failed");

        receipts[_receiptId] = PaymentReceipt({
            nonceHash: _nonceHash,
            payer: msg.sender,
            amount: _amount,
            settledAt: block.timestamp,
            isConsumed: false
        });

        emit PaymentSettled(_receiptId, _nonceHash, msg.sender, _amount);
    }
}
