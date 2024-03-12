import { getStoragePrivateKey } from "./storage";
import { unmarshalPrivateKey } from "@libp2p/crypto/keys";
import { peerIdFromKeys } from "@libp2p/peer-id";

export async function getPeerId() {
    let privateKeyBuff = getStoragePrivateKey();

    if (!privateKeyBuff) {
        return "";
    }

    let privateKey = await unmarshalPrivateKey(privateKeyBuff);

    let peerId = await peerIdFromKeys(privateKey.public.bytes, privateKey.bytes);
    
    return peerId.toString();
};
