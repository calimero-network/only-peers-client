import { getAppEndpointKey, setAppEndpointKey } from './storage';

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

export function getNearEnvironment(): string {
  return process.env['NEXT_PUBLIC_NEAR_ENV'] ?? 'testnet';
}
