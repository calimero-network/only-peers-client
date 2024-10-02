'use client';

import { getAccessToken } from '@calimero-is-near/calimero-p2p-sdk';
import { JsonWebToken } from '../types/types';

export const APP_URL = 'app-url';
export const CONTEXT_ID = 'context-id';
export const APPLICATION_ID = 'application-id';
export const ACCESS_TOKEN = 'access-token';
export const REFRESH_TOKEN = 'refresh-token';

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
