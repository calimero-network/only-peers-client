'use client';

import { marshalPublicKey } from '@libp2p/crypto/keys';
import bs58 from 'bs58';

export const CLIENT_KEY = 'client-key';
export const APP_URL = 'app-url';
export const AUTHORIZED = 'node-authorized';

export interface ClientKey {
  privateKey: string;
  publicKey: string;
}

export const setStorageClientKey = (clientKey: ClientKey) => {
  localStorage.setItem(CLIENT_KEY, JSON.stringify(clientKey));
};

export const getStorageClientKey = (): ClientKey | null => {
  if (typeof window !== 'undefined' && window.localStorage) {
    let clientKeystore: ClientKey = JSON.parse(
      localStorage.getItem(CLIENT_KEY),
    );
    if (clientKeystore) {
      return clientKeystore;
    }
  }
  return null;
};

export const getExecutorPublicKey = (): Uint8Array | null => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      let clientKeystore: ClientKey = JSON.parse(
        localStorage.getItem(CLIENT_KEY),
      );
      const decodedPk = bs58.decode(clientKeystore.publicKey);

      const publicKey = marshalPublicKey(
        { bytes: decodedPk.slice(0, 32) },
        'ed25519',
      );
      if (publicKey) {
        return publicKey;
      }
    }
    return null;
  } catch (e) {
    return null;
  }
};

export const clearClientKey = () => {
  localStorage.removeItem(CLIENT_KEY);
};

export const setStorageNodeAuthorized = () => {
  localStorage.setItem(AUTHORIZED, JSON.stringify(true));
};

export const getStorageNodeAuthorized = (): boolean | null => {
  if (typeof window !== 'undefined' && window.localStorage) {
    let authorized: boolean = JSON.parse(
      window.localStorage.getItem(AUTHORIZED),
    );
    if (authorized) {
      return authorized;
    }
  }
  return null;
};

export const clearNodeAuthorized = () => {
  localStorage.removeItem(AUTHORIZED);
};

export const clearAppEndpoint = () => {
  localStorage.removeItem(APP_URL);
};

export const setAppEndpointKey = (url: string) => {
  localStorage.setItem(APP_URL, JSON.stringify(url));
};

export const getAppEndpointKey = (): string | null => {
  if (typeof window !== 'undefined' && window.localStorage) {
    let url: string = JSON.parse(localStorage.getItem(APP_URL));
    if (url) {
      return url;
    }
  }
  return null;
};
