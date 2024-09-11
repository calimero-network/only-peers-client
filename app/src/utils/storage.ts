'use client';

import { getAccessToken } from '@calimero-is-near/calimero-p2p-sdk';
import { JsonWebToken } from '../types/types';

export const CLIENT_KEY = 'client-key';
export const APP_URL = 'app-url';
export const AUTHORIZED = 'node-authorized';
export const CONTEXT_IDENTITY = 'context-identity';
export const CONTEXT_ID = 'context-id';
export const APPLICATION_ID = 'application-id';
export const ACCESS_TOKEN = 'access-token';
export const REFRESH_TOKEN = 'refresh-token';

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

export const getExecutorPublicKey = (): String | null => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      let contextIdentity: string = JSON.parse(
        localStorage.getItem(CONTEXT_IDENTITY),
      );
      return contextIdentity;
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

export const clearApplicationId = () => {
  localStorage.removeItem(APPLICATION_ID);
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

export const getContextId = (): string | null => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storageContextId = localStorage.getItem(CONTEXT_ID);
    if (storageContextId) {
      return JSON.parse(storageContextId);
    }
  }
  return null;
};

export const setContextId = (contextId: string) => {
  localStorage.setItem(CONTEXT_ID, JSON.stringify(contextId));
};

export const getApplicationId = (): string | null => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storageApplicationId = localStorage.getItem(APPLICATION_ID);
    if (storageApplicationId) {
      return JSON.parse(storageApplicationId);
    }
  }
  return null;
};

export const setStorageApplicationId = (applicationId: string) => {
  localStorage.setItem(APPLICATION_ID, JSON.stringify(applicationId));
};

export const getJWTObject = (): JsonWebToken | null => {
  const token = getAccessToken();
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 3) {
    console.error('Invalid JWT token');
    return;
  }
  const payload = JSON.parse(atob(parts[1]));
  return payload;
};

export const getJWT = (): string | null => {
  return getAccessToken();
};

export const clearJWT = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
};
