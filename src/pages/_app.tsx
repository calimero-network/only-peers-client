import { WithApollo } from "@/lib/provider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WithApollo>
      <Component {...pageProps} />
    </WithApollo>
  );
}
