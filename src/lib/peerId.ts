import {peerIdFromKeys} from "@libp2p/peer-id";
import {ClientKey, getStorageClientKey} from "./storage";
import {unmarshalPrivateKey} from "@libp2p/crypto/keys";
import * as bs58 from "bs58";

export async function getPeerId() {
    let clientKey: ClientKey = getStorageClientKey();
    if (!clientKey) {
        return "";
    }

    let privateKey = await unmarshalPrivateKey(new Uint8Array(bs58.decode(clientKey.privateKey)));
    let peerId = await peerIdFromKeys(privateKey.public.bytes, privateKey.bytes);
    return peerId.toString();
};
