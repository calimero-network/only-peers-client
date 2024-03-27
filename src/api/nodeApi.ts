import {ApiResponse} from "./response";

enum AlgorithmType {
    Ed25519
}

enum WalletType {
    ETH,
    NEAR,
}

enum VerifiableCredentialType {
    Wallet,
}

// Interfaces
interface WalletVerifiableCredential {
    wallet_type: WalletType;
    address: String;
    public_key: number[];
    peer_id: String;
}
interface VerifiableCredential {
    algorithm_type: AlgorithmType;
    credential_subject: VerifiableCredentialType | WalletVerifiableCredential;
    proof: number[];
}

interface VerifiablePresentation {
    challenge: String;
    verifiable_credential: VerifiableCredential;
    signature: number[];
}

export interface Challenge {
    nonce: String;
    applicationId: String;
    timestamp: number;
}

export interface WalletSignatureData {
    challenge: Challenge | undefined;
    clientPubKey: String | undefined;
}

export interface LoginResponse {

}

export interface NodeApi {
    login(walletSignatureData: WalletSignatureData, signature: String, address: String): ApiResponse<LoginResponse>;
    requestChallenge(): ApiResponse<Challenge>;
}