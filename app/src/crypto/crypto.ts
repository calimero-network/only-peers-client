import {
  ClientKey,
  getStorageClientKey as getStoragePrivateKey,
} from '../utils/storage';
import { unmarshalPrivateKey } from '@libp2p/crypto/keys';
import { PrivateKey } from '@libp2p/interface';
import bs58 from 'bs58';
import { WalletType } from '@calimero-is-near/calimero-p2p-sdk';

export interface AxiosHeader {
  [key: string]: string;
}

const contextId = process.env['NEXT_PUBLIC_CONTEXT_ID'];

export async function createAuthHeader(
  payload: string,
): Promise<AxiosHeader | null> {
  const privateKey: PrivateKey = await getPrivateKey();

  if (!privateKey) {
    return null;
  }

  const encoder = new TextEncoder();
  const contentBuff = encoder.encode(payload);

  const signing_key = bs58.encode(privateKey.public.bytes);

  const hashBuffer = await crypto.subtle.digest('SHA-256', contentBuff);
  const hashArray = new Uint8Array(hashBuffer);

  const signature = await privateKey.sign(hashArray);
  const signatureBase58 = bs58.encode(signature);
  const contentBase58 = bs58.encode(hashArray);

  const headers: AxiosHeader = {
    wallet_type: JSON.stringify(WalletType.NEAR),
    signing_key: signing_key,
    signature: signatureBase58,
    challenge: contentBase58,
    contextId,
  };

  return headers;
}

export async function getPrivateKey(): Promise<PrivateKey | null> {
  try {
    const clientKey: ClientKey | null = getStoragePrivateKey();
    if (!clientKey) {
      return null;
    }
    return await unmarshalPrivateKey(bs58.decode(clientKey.privateKey));
  } catch (error) {
    console.error('Error extracting private key:', error);
    return null;
  }
}
