export const PEER_ID = "peerId";
export const PUBLIC_KEY = "publicKey";

export const getStoragePeerId = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
        return localStorage.getItem(PEER_ID);
    } else {
        return ""
    }
}

export const setStoragePeerId = (peerId: string) => {
    localStorage.setItem(PEER_ID, peerId);
}

export const removeStoragePeerId = () => {
    localStorage.removeItem(PEER_ID);
}

export const setStoragePublicKey = (publicKey: string) => {
    localStorage.setItem(PUBLIC_KEY, publicKey);
}

export const removeStoragePublicKey = () => {
    localStorage.removeItem(PUBLIC_KEY);
}
