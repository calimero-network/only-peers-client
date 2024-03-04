export const PEER_ID = "peerId";

export const getStoragePeerId = () => {
    return localStorage.getItem(PEER_ID);
}

export const setStoragePeerId = (peerId: string) => {
    localStorage.setItem(PEER_ID, peerId);
}

export const removeStoragePeerId = () => {
    localStorage.removeItem(PEER_ID);
}