import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getStorageClientKey } from '../utils/storage';

export default function Index() {
  const router = useRouter();
  const clientKey = getStorageClientKey();

  useEffect(() => {
    if (!clientKey) {
      router.push('/setup');
    } else {
      router.push('/feed');
    }
  }, [clientKey, router]);

  return <></>;
}
