import { getStoragePrivateKey } from '@/lib/storage';
import { unmarshalPrivateKey } from "@libp2p/crypto/keys";
import { PrivateKey, PublicKey } from '@libp2p/interface';
import bs58 from 'bs58';

export interface SignedMessageObject {
    signature: string;
    content: string;
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

    await verifySignature(contentBase58, signatureBase58);

    return {
        signature: signatureBase58,
        content: contentBase58
    };
}

export async function verifySignature(contentBase58: string, signatureBase58: string): Promise<boolean> {
    const privateKey = await getPrivateKey();

    if (!privateKey) {
        return false;
    }

    const signature = bs58.decode(signatureBase58);
    const data = bs58.decode(contentBase58);

    const publicKey: PublicKey = privateKey.public;

    const valid = await publicKey.verify(data, signature)

    return valid;
}

export async function getPrivateKey() {
    const privateKeyBuff = getStoragePrivateKey();

    if (!privateKeyBuff) {
        return null;
    }

    const privateKey: PrivateKey = await unmarshalPrivateKey(privateKeyBuff);

    return privateKey;
}