import WithIdAuth from "@/components/auth/auth";
import {WithApollo} from "@/lib/provider";
import "@/styles/globals.css";
import {MetaMaskUIProvider} from "@metamask/sdk-react-ui";
import type {AppProps} from "next/app";

export default function App({Component, pageProps}: AppProps) {

  return (

    <WithApollo>
      <WithIdAuth>
        <MetaMaskUIProvider
          sdkOptions={{
            dappMetadata: {
              name: "Only Peers",
              // url: window.location.href,
            },
          }}
        >
          <Component {...pageProps} />
        </MetaMaskUIProvider>
      </WithIdAuth>
    </WithApollo>
  );
}
