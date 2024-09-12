import { getJWT } from '../utils/storage';

export interface AxiosHeader {
  [key: string]: string;
}

export function createJwtHeader(): AxiosHeader | null {
  const token: string = getJWT();

  if (!token) {
    return null;
  }

  const headers: AxiosHeader = {
    authorization: `Bearer ${token}`,
  };
  return headers;
}
