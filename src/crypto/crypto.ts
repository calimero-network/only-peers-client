import { getStoragePrivateKey, getStoragePublicKey } from '@/lib/storage';
import * as bs58 from 'bs58';
import * as elliptic from 'elliptic';

export interface SignedMessageObject {
    signature: string;
    content: string;
}

export function signMessage(content: string): SignedMessageObject | null {
    const privateKey = getStoragePrivateKey();

    if (!privateKey) {
        return null;
    }

    const ec = new elliptic.ec('secp256k1');
    const key = ec.keyFromPrivate(privateKey, 'hex');
    const encodedContent: string = encodeContent(content);
    const signature = key.sign(encodedContent);
    const base58Signature = encodeSignature(signature);
    
    return {
        signature: base58Signature,
        content: encodedContent
    };
}

function encodeContent(content: string): string {
    const contentBuffer: Buffer = Buffer.from(content);
    return bs58.encode(contentBuffer).toString();
}

function encodeSignature(signature: elliptic.ec.Signature): string {
    const derEncodedSignature = signature.toDER('hex');
    const base64Signature = Buffer.from(derEncodedSignature, 'hex').toString('base64');
    return bs58.encode(Buffer.from(base64Signature, 'base64')).toString();
}

export function verifySignature(signature: string, encodedContent: string): boolean {
    const publicKey = getStoragePublicKey();
    if (!publicKey) {
        return false;
    }

    const ec = new elliptic.ec('secp256k1');
    const key = ec.keyFromPublic(publicKey, 'hex');
    const derSignature = decodeSignature(signature);
    
    return key.verify(encodedContent, derSignature);
}

function decodeSignature(signature: string): Buffer {
    const base64Signature = Buffer.from(bs58.decode(signature)).toString('base64');
    return Buffer.from(base64Signature, 'base64');
}