import { useEffect } from 'react';
import { useRouter } from 'next/router.js';
import { getAppEndpointKey } from '../../utils/storage';
import { getStorageApplicationId } from '../../utils/node';
import {
  getAccessToken,
  getRefreshToken,
} from '@calimero-is-near/calimero-p2p-sdk';

export default function WithIdAuth({ children }: any) {
  const router = useRouter();

  useEffect(() => {
    const url = getAppEndpointKey();
    const applicationId = getStorageApplicationId();
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();

    if (!url || !applicationId) {
      if (!router.pathname.startsWith('/setup')) {
        router.push('/setup');
      }
    } else if (!accessToken || !refreshToken) {
      if (!router.pathname.startsWith('/auth')) {
        router.push('/auth');
      }
    } else if (router.pathname.startsWith('/auth')) {
      router.push('/feed');
    }
  }, [router]);

  return <>{children}</>;
}
