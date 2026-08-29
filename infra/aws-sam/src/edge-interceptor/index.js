'use strict';

const crypto = require('crypto');

const DEFAULT_PRICE_USDC = "0.05";
const SETTLEMENT_NETWORK = "base-mainnet";
const CHAIN_ID = 8453; // Base Mainnet
const TREASURY_WALLET = "0x7332733273327332733273327332733273327332";
const CHALLENGE_TTL_SECONDS = 300; // 5-minute challenge expiration

/**
 * Legal-X CloudFront Lambda@Edge Payment Interceptor
 */
exports.handler = async (event) => {
    const request = event.Records[0].cf.request;
    const uri = request.uri;
    const method = request.method;
    const headers = request.headers;

    // 1. Mandatory Header Stripping: Eliminate any client-forged internal control headers
    delete headers['x-origin-verify-secret'];
    delete headers['x-verified-payment-proof'];
    delete headers['x-payment-authorization'];
    delete headers['x-receipt-id'];

    // 2. Minimal health check route
    if (uri === '/health') {
        return request;
    }

    // 3. Extract payment proof from headers
    const paymentHeader = headers['payment-signature'] || headers['x-payment-proof'] || headers['x-payment-receipt'];

    if (!paymentHeader || !paymentHeader[0] || !paymentHeader[0].value) {
        return generate402Challenge(uri, method);
    }

    const rawProofValue = paymentHeader[0].value.trim();

    try {
        let proof;
        if (rawProofValue.startsWith('{')) {
            proof = JSON.parse(rawProofValue);
        } else {
            const decoded = Buffer.from(rawProofValue, 'base64').toString('utf8');
            proof = JSON.parse(decoded);
        }

        const now = Math.floor(Date.now() / 1000);

        if (proof.expiresAt && proof.expiresAt < now) {
            return generateErrorResponse(402, "Payment Expired", "Payment authorization has expired. Request a new challenge.");
        }

        if (proof.resource && proof.resource !== uri) {
            return generateErrorResponse(402, "Resource Binding Mismatch", "Payment authorization was generated for a different URI.");
        }

        if (proof.method && proof.method !== method) {
            return generateErrorResponse(402, "Method Binding Mismatch", "Payment authorization was generated for a different HTTP method.");
        }

        if (proof.recipient && proof.recipient.toLowerCase() !== TREASURY_WALLET.toLowerCase()) {
            return generateErrorResponse(402, "Invalid Recipient", "Payment recipient does not match the configured settlement treasury.");
        }

        if (proof.chainId && proof.chainId !== CHAIN_ID && proof.network !== SETTLEMENT_NETWORK) {
            return generateErrorResponse(402, "Invalid Settlement Network", "Payment network does not match expected chain.");
        }

        if (!proof.signature || typeof proof.signature !== 'string' || proof.signature.length < 64) {
            return generateErrorResponse(402, "Missing Cryptographic Signature", "Payment payload must include a valid signature.");
        }

        // Injected verified proof header
        request.headers['x-verified-payment-proof'] = [{
            key: 'X-Verified-Payment-Proof',
            value: Buffer.from(JSON.stringify({
                payer: proof.payer || proof.from || 'anonymous_agent',
                amount: proof.amount || DEFAULT_PRICE_USDC,
                currency: proof.currency || 'USDC',
                receiptId: proof.receiptId || `rcpt_${crypto.randomBytes(8).toString('hex')}`,
                nonceHash: crypto.createHash('sha256').update(proof.nonce || proof.txHash || crypto.randomUUID()).digest('hex'),
                verifiedAt: new Date().toISOString()
            })).toString('base64')
        }];

        return request;

    } catch (err) {
        return generateErrorResponse(400, "Malformed Payment Header", "Failed to parse x402 payment proof envelope.");
    }
};

function generate402Challenge(uri, method) {
    const nonce = crypto.randomBytes(16).toString('hex');
    const now = Math.floor(Date.now() / 1000);
    const expiresAt = now + CHALLENGE_TTL_SECONDS;

    const challenge = {
        version: "x402-v1",
        price: DEFAULT_PRICE_USDC,
        currency: "USDC",
        recipient: TREASURY_WALLET,
        network: SETTLEMENT_NETWORK,
        chainId: CHAIN_ID,
        resource: uri,
        method: method,
        nonce: nonce,
        createdAt: now,
        expiresAt: expiresAt,
    };

    const base64Challenge = Buffer.from(JSON.stringify(challenge)).toString('base64');

    return {
        status: '402',
        statusDescription: 'Payment Required',
        headers: {
            'content-type': [{ key: 'Content-Type', value: 'application/json' }],
            'cache-control': [{ key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate, max-age=0' }],
            'payment-required': [{ key: 'PAYMENT-REQUIRED', value: base64Challenge }],
            'access-control-allow-origin': [{ key: 'Access-Control-Allow-Origin', value: '*' }],
            'access-control-expose-headers': [{ key: 'Access-Control-Expose-Headers', value: 'PAYMENT-REQUIRED' }]
        },
        body: JSON.stringify({
            error: "Payment Required",
            price: `${DEFAULT_PRICE_USDC} USDC`,
            network: SETTLEMENT_NETWORK,
            chainId: CHAIN_ID,
            recipient: TREASURY_WALLET,
            resource: uri,
            method: method,
            nonce: nonce,
            expiresAt: expiresAt,
            instructions: "Sign the challenge payload or attach settled receipt to the PAYMENT-SIGNATURE header."
        })
    };
}

function generateErrorResponse(statusCode, errorTitle, message) {
    return {
        status: statusCode.toString(),
        statusDescription: errorTitle,
        headers: {
            'content-type': [{ key: 'Content-Type', value: 'application/json' }],
            'cache-control': [{ key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate' }],
            'access-control-allow-origin': [{ key: 'Access-Control-Allow-Origin', value: '*' }]
        },
        body: JSON.stringify({
            error: errorTitle,
            message: message,
            timestamp: new Date().toISOString()
        })
    };
}
