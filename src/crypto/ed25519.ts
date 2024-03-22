import {generateKeyPair} from "@libp2p/crypto/keys";
import {PrivateKey, Ed25519} from "@libp2p/interface";

export async function generatePrivateKey(): Promise<PrivateKey> {
    return await generateKeyPair(Ed25519);
}

export async function createAndStoreKeypair() {
    const privateKey = await generatePrivateKey();
    const privateKeyMarshall = privateKey.marshal();
    const privateKeyString = Buffer.from(privateKeyMarshall).toString('hex');
    console.log("privateKeyString", privateKeyString);

    const publicKey = privateKey.public.marshal();
    const publicKeyString = Buffer.from(publicKey).toString('hex');
    console.log("publicKeyString", publicKeyString);

    return {privateKeyString, publicKeyString};
}