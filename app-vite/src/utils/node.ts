import {
  getAppEndpointKey,
  getApplicationId,
  getContextId,
  setAppEndpointKey,
  setContextId,
  setStorageApplicationId,
} from './storage';

export function getNodeUrl(): string {
  if (typeof window === 'undefined') {
    return "";
  }
  const storageKey = getAppEndpointKey();

  if (!storageKey) {
    const envKey: string = import.meta.env.VITE_RPC_BASE_URL ?? '';
    setAppEndpointKey(envKey);
    return envKey;
  }

  return storageKey ?? '';
}

export function getStorageContextId(): string {
  const storageContextId = getContextId();

  if (!storageContextId) {
    const envKey: string = import.meta.env.VITE_CONTEXT_ID ?? '';
    setContextId(envKey);
    return envKey;
  }

  return storageContextId ?? '';
}

export function getStorageApplicationId(): string {
  const storageApplicationId = getApplicationId();

  if (!storageApplicationId) {
    const envKey: string = import.meta.env.VITE_APPLICATION_ID ?? '';
    setStorageApplicationId(envKey);
    return envKey;
  }

  return storageApplicationId ?? '';
}

export function getNearEnvironment(): string {
  return import.meta.env.VITE_NEAR_ENV ?? 'testnet';
}
