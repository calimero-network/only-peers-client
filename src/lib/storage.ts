export const PEER_ID = "peerId";
export const PRIVATE_KEY = "privateKey";
export const PUBLIC_KEY = "publicKey";

export const getPeerId = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
        return localStorage.getItem(PEER_ID);
    } else {
        return ""
    }
}

export const setStoragePeerId = (peerId: string) => {
    localStorage.setItem(PEER_ID, peerId);
}

export const setStoragePrivateKey = (privateKey: string) => {
    localStorage.setItem(PRIVATE_KEY, privateKey);
}

export const setStoragePublicKey = (publicKey: string) => {
    localStorage.setItem(PUBLIC_KEY, publicKey);
}

export const clearIdentity = () => {
    localStorage.removeItem(PEER_ID);
    localStorage.removeItem(PUBLIC_KEY);
    localStorage.removeItem(PRIVATE_KEY);
}
