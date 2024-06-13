import "../styles/tailwind.css";

import type { AppProps } from "next/app";
import "@near-wallet-selector/modal-ui/styles.css";
import WithIdAuth from "../components/auth/auth";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WithIdAuth>
      <Component {...pageProps} />
    </WithIdAuth>
  );
}
