export const PRIVATE_KEY = "client-key";

export interface ClientKey {
    privateKey: string;
    publicKey: string;
}

export const setStorageClientKey = (clientKey: ClientKey) => {
    localStorage.setItem(PRIVATE_KEY, JSON.stringify(clientKey));
};

export const getStorageClientKey = (): ClientKey | null => {
    if (typeof window !== 'undefined' && window.localStorage) {
        let clientKeystore: ClientKey = JSON.parse(localStorage.getItem(PRIVATE_KEY));
        if (!clientKeystore) {
            return null;
        }
        return clientKeystore;
    } else {
        return null;
    }
};

export const clearClientKey = () => {
    localStorage.removeItem(PRIVATE_KEY);
};
