export const CLIENT_KEY = "client-key";

export interface ClientKey {
    privateKey: string;
    publicKey: string;
}

export const setStorageClientKey = (clientKey: ClientKey) => {
    localStorage.setItem(CLIENT_KEY, JSON.stringify(clientKey));
};

export const getStorageClientKey = (): ClientKey | null => {
    if (typeof window !== 'undefined' && window.localStorage) {
        let clientKeystore: ClientKey = JSON.parse(localStorage.getItem(CLIENT_KEY));
        if (clientKeystore) {
            return clientKeystore;
        }
    }
    return null;
};

export const clearClientKey = () => {
    localStorage.removeItem(CLIENT_KEY);
};
