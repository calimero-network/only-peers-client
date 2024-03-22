import {generateKeyPair} from "@libp2p/crypto/keys";
import {Ed25519, PrivateKey} from "@libp2p/interface";

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

export interface WalletSignData {
    challenge: String | undefined;
    pubKey: String | undefined;
    applicationId: String | undefined;
}



export async function requestChallenge() {
    return {
        challenge: "challenge123",
        applicationId: "app123"
    };
}

export async function login(walletSignData: WalletSignData, signature: String, address: String): Promise<boolean> {
    console.log("Send request to node with params", {walletSignData, signature, address});

    return true;
}