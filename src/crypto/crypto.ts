import {ClientKey, getStorageClientKey as getStoragePrivateKey} from '../lib/storage';
import {unmarshalPrivateKey} from "@libp2p/crypto/keys";
import {PrivateKey} from '@libp2p/interface';
import bs58 from 'bs58';
import {generatePrivateKey} from './ed25519';

export interface SignedMessageObject {
    signature: string;
    challenge: string;
}

export async function signMessage(content: string): Promise<SignedMessageObject | null> {
    const privateKey = await getPrivateKey();

    if (!privateKey) {
        return null;
    }

    const encoder = new TextEncoder();
    const contentBuff = encoder.encode(content);

    const hashBuffer = await crypto.subtle.digest('SHA-256', contentBuff);
    const hashArray = new Uint8Array(hashBuffer);

    const signature = await privateKey.sign(hashArray);

    const signatureBase58 = bs58.encode(signature);
    const contentBase58 = bs58.encode(hashArray);

    return {
        signature: signatureBase58,
        challenge: contentBase58
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
        console.error('Error extracting private key:', error);
        return null;
    }
}