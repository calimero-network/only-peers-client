import {
  ClientKey,
  getStorageClientKey as getStoragePrivateKey,
} from "../lib/storage";
import { unmarshalPrivateKey } from "@libp2p/crypto/keys";
import { PrivateKey } from "@libp2p/interface";
import bs58 from "bs58";

export enum WalletType {
  NEAR = "NEAR",
  ETH = "ETH",
}

export interface Header {
  [key: string]: string;
}

export interface AuthHeader {
  walletTypeHeader: Header;
  signingKeyHeader: Header;
  signatureHeader: Header;
  challengeHeader: Header;
}

export async function createAuthHeader(
  payload: string
): Promise<AuthHeader | null> {
  const privateKey: PrivateKey = await getPrivateKey();

  if (!privateKey) {
    return null;
  }

  const encoder = new TextEncoder();
  const contentBuff = encoder.encode(payload);

  const signing_key = bs58.encode(privateKey.public.bytes);

  const hashBuffer = await crypto.subtle.digest("SHA-256", contentBuff);
  const hashArray = new Uint8Array(hashBuffer);

  const signature = await privateKey.sign(hashArray);
  const signatureBase58 = bs58.encode(signature);
  const contentBase58 = bs58.encode(hashArray);

  let walletTypeHeader: Header = {
    wallet_type: WalletType.NEAR,
  };

  let signingKeyHeader: Header = {
    signing_key: signing_key,
  };

  let challengeHeader: Header = {
    challenge: contentBase58,
  };

  let signatureHeader: Header = {
    signature: signatureBase58,
  };

  return {
    walletTypeHeader,
    signingKeyHeader,
    signatureHeader,
    challengeHeader,
  };
}

export async function getPrivateKey(): Promise<PrivateKey | null> {
  try {
    const clientKey: ClientKey | null = getStoragePrivateKey();
    if (!clientKey) {
      return null;
    }
    return await unmarshalPrivateKey(bs58.decode(clientKey.privateKey));
  } catch (error) {
    console.error("Error extracting private key:", error);
    return null;
  }
}
