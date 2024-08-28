import { peerIdFromKeys } from '@libp2p/peer-id';
import { ClientKey, getStorageClientKey } from '../utils/storage';

export async function getPeerId() {
  let clientKey: ClientKey = getStorageClientKey();
  if (!clientKey) {
    return '';
  }
  let publicKey = Uint8Array.from(
    Array.from(clientKey.publicKey).map((letter) => letter.charCodeAt(0)),
  );
  let peerId = await peerIdFromKeys(publicKey);
  return peerId.toString();
}
