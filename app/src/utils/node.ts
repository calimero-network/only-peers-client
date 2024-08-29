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
    return;
  }
  let storageKey = getAppEndpointKey();

  if (!storageKey) {
    let envKey: string = process.env['NEXT_PUBLIC_RPC_BASE_URL'] ?? '';
    setAppEndpointKey(envKey);
    return envKey;
  }

  return storageKey ?? '';
}

export function getStorageContextId(): string {
  let storageContextId = getContextId();

  if (!storageContextId) {
    let envKey: string = process.env['NEXT_PUBLIC_CONTEXT_ID'] ?? '';
    setContextId(envKey);
    return envKey;
  }

  return storageContextId ?? '';
}

export function getStorageApplicationId(): string {
  let storageApplicationId = getApplicationId();

  if (!storageApplicationId) {
    let envKey: string = process.env['NEXT_PUBLIC_APPLICATION_ID'] ?? '';
    setStorageApplicationId(envKey);
    return envKey;
  }

  return storageApplicationId ?? '';
}

export function getNearEnvironment(): string {
  return process.env['NEXT_PUBLIC_NEAR_ENV'] ?? 'testnet';
}
