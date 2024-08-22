import { MetamaskWrapper } from '@calimero-is-near/calimero-p2p-sdk';
import { useRouter } from 'next/router';
import { nodeConfig } from '../../utils/nodeConfig';
import { getContextId } from '../../utils/storage';

export default function Metamask() {
  const router = useRouter();
  return (
    <div className="flex w-full h-screen justify-center bg-[#111111]">
      <div className="flex flex-col justify-center items-center">
        <MetamaskWrapper
          contextId={getContextId()}
          rpcBaseUrl={nodeConfig.nodeServerUrl}
          successRedirect={() => router.push('/feed')}
          navigateBack={() => router.push('/auth')}
          cardBackgroundColor={'#1C1C1C'}
          metamaskTitleColor={''}
        />
      </div>
    </div>
  );
}
