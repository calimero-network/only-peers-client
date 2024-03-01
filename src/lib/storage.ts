export const PEER_ID = "peerId";

export const getStoragePeerId = () => {
    return localStorage.getItem(PEER_ID);
}

export const setStoragePeerId = (peerId: string) => {
    localStorage.setItem(PEER_ID, peerId);
}

export const resetStoragePeerId = () => {
    localStorage.removeItem(PEER_ID);
}