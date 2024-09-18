import '../styles/tailwind.css';

import type { AppProps } from 'next/app';
import '@near-wallet-selector/modal-ui/styles.css';
import WithIdAuth from '../components/auth/auth';
import { AccessTokenWrapper } from '@calimero-is-near/calimero-p2p-sdk';
import { getNodeUrl } from '../utils/node';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WithIdAuth>
      <AccessTokenWrapper getNodeUrl={getNodeUrl}>
        <Component {...pageProps} />
      </AccessTokenWrapper>
    </WithIdAuth>
  );
}
