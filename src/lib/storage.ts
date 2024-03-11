export const PRIVATE_KEY = "privateKey";

export const setStoragePrivateKey = (privateKeyBuff: Uint8Array) => {
    localStorage.setItem(PRIVATE_KEY, privateKeyBuff.toString());
}

export const getStoragePrivateKey = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
        return localStorage.getItem(PRIVATE_KEY);
    } else {
        return ""
    }
}

export const clearIdentity = () => {
    localStorage.removeItem(PRIVATE_KEY);
}
