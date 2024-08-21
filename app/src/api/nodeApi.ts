import { ApiResponse } from './response';

enum AlgorithmType {
  Ed25519,
}

export enum WalletType {
  ETH = 'ETH',
  NEAR = 'NEAR',
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

export interface LoginRequest {
  walletSignature: String;
  payload: Payload;
  walletMetadata: WalletMetadata;
}

export interface NodeChallenge {
  nonce: String;
  applicationId: String;
  timestamp: number;
  nodeSignature: String;
}

export interface SignatureMessage {
  nodeSignature: String;
  clientPublicKey: String;
}

export interface SignatureMessageMetadata {
  clientPublicKey: String;
  nodeSignature: String;
  nonce: String;
  applicationId: String;
  timestamp: number;
  message: string; //signed message by wallet
}

export interface Payload {
  message: SignatureMessageMetadata;
  metadata: SignatureMetadata;
}

export interface WalletMetadata {
  type: WalletType;
  signingKey: String;
}

export interface NearMetadata extends WalletMetadata {
  type: WalletType.NEAR;
  signingKey: 'e.g.: ed25519:DfRy7qn3upQS4KFTLChpMG9DmiR29zDMdR1YuUG7cYML';
}

export interface EthMetadata extends WalletMetadata {
  type: WalletType.ETH;
  signingKey: 'e.g.: 0x63f9a92d8d61b48a9fff8d58080425a3012d05c8';
}

export interface SignatureMetadata {
  //
}

export interface NearSignatureMessageMetadata extends SignatureMetadata {
  recipient: String;
  callbackUrl: String;
  nonce: String;
}

export interface EthSignatureMessageMetadata extends SignatureMetadata {
  //
}

export interface WalletSignatureData {
  payload: Payload | undefined;
  clientPubKey: String | undefined;
}

export interface LoginResponse {}

export interface HealthRequest {
  url: String;
}

export interface HealthStatus {
  status: String;
}

export interface Context {
  id: string,
  application_id: string,
  last_transaction_hash: string,
}

export interface ContextResponse {
  context: Context
  contextIdentities: string[];
}

export interface NodeApi {
  login(loginRequest: LoginRequest): ApiResponse<LoginResponse>;
  requestChallenge(): ApiResponse<NodeChallenge>;
  health(request: HealthRequest): ApiResponse<HealthStatus>;
  getContext(): ApiResponse<ContextResponse>;
}
