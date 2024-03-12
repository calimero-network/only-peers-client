import bs58 from "bs58";

export const PRIVATE_KEY = "privateKey";

export const setStoragePrivateKey = (privateKeyBuff: Uint8Array) => {
    const encodedPrivateKey = bs58.encode(privateKeyBuff);
    localStorage.setItem(PRIVATE_KEY, encodedPrivateKey);
}

export const getStoragePrivateKey = (): Uint8Array | null => {
    if (typeof window !== 'undefined' && window.localStorage) {
        let encodedPrivateKey = localStorage.getItem(PRIVATE_KEY);
        if (!encodedPrivateKey) {
            return null;
        }
        const decodedPrivateKey = new Uint8Array(bs58.decode(encodedPrivateKey));
        return decodedPrivateKey;
    } else {
        return null
    }
}

export const clearIdentity = () => {
    localStorage.removeItem(PRIVATE_KEY);
}
