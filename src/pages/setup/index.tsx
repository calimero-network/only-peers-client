import { SetupModal } from '@calimero-is-near/calimero-p2p-sdk';
import { useRouter } from 'next/router';
import ContentWrapper from '../../components/login/ContentWrapper';
import { getNodeUrl } from '../../utils/node';
import { setAppEndpointKey } from '../../utils/storage';

export default function SetupPage() {
  const router = useRouter();

  return (
    <ContentWrapper>
      <SetupModal
        successRoute={() => router.push('/auth')}
        getNodeUrl={getNodeUrl}
        setNodeUrl={setAppEndpointKey}
      />
    </ContentWrapper>
  );
}
