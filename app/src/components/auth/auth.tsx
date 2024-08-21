import { useEffect } from 'react';
import { useRouter } from 'next/router.js';
import {
  getAppEndpointKey,
  getStorageClientKey,
  getStorageNodeAuthorized,
  setExecutorPublicKey,
} from '../../utils/storage';
import apiClient from '../../api';

export default function WithIdAuth({ children }: any) {
  const router = useRouter();

  useEffect(() => {
    const setContextIdentity = async () => {
      const response = await apiClient.node().getContext();
      if (
        response?.data?.contextIdentities &&
        response.data.contextIdentities.length > 0
      ) {
        setExecutorPublicKey(response.data.contextIdentities[0]);
      }
    };
    setContextIdentity();
  }, []);

  useEffect(() => {
    const clientKey = getStorageClientKey();
    const nodeAuthorized = getStorageNodeAuthorized();
    const url = getAppEndpointKey();

    if (!url) {
      if (!router.pathname.startsWith('/setup')) {
        router.push('/setup');
      }
    } else if (!clientKey || !nodeAuthorized) {
      if (!router.pathname.startsWith('/auth')) {
        router.push('/auth');
      }
    } else if (router.pathname.startsWith('/auth')) {
      router.push('/feed');
    }
  }, [router]);

  return <>{children}</>;
}
