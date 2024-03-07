import WithIdAuth from "@/components/auth/auth";
import { WithApollo } from "@/lib/provider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WithApollo>
      <WithIdAuth>
        <Component {...pageProps} />
      </WithIdAuth>
    </WithApollo>
  );
}
