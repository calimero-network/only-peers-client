import "../styles/tailwind.css";

import {WithApollo} from "../lib/provider";

import type {AppProps} from "next/app";
import "@near-wallet-selector/modal-ui/styles.css";
import WithIdAuth from "src/components/auth/auth";

export default function App({Component, pageProps}: AppProps) {

  return (
    <WithApollo>
      <WithIdAuth>
        <Component {...pageProps} />
      </WithIdAuth>
    </WithApollo>
  );
}
