import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Loading } from '../components/Loading';
import { getAccessToken } from '@calimero-is-near/calimero-p2p-sdk';

export default function Index() {
  const router = useRouter();
  const accessToken = getAccessToken();

  useEffect(() => {
    if (!accessToken) {
      router.push('/setup');
    } else {
      router.push('/feed');
    }
  }, [accessToken, router]);

  return (
    <>
      <Loading />
    </>
  );
}
