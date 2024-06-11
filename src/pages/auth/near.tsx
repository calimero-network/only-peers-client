import { WalletSelectorContextProvider } from "@calimero-is-near/calimero-p2p-sdk/lib/wallets/NearLogin/WalletSelectorContext";
import NearLogin from "@calimero-is-near/calimero-p2p-sdk/lib/wallets/NearLogin/NearLogin";
import CalimeroLogo from "src/components/icons/Logo";
import { useRouter } from "next/router";
import { nodeConfig } from "src/utils/nodeConfig";
import { NetworkId } from "@near-wallet-selector/core/src";

import "@near-wallet-selector/modal-ui/styles.css";

export default function Near() {
  const router = useRouter();
  
  return (
    <div className="flex w-full h-screen justify-center bg-[#111111]">
      <div className="flex flex-col justify-center items-center">
        <WalletSelectorContextProvider network={nodeConfig.network as NetworkId}>
          <NearLogin
            appId={nodeConfig.applicationId}
            rpcBaseUrl={nodeConfig.nodeServerUrl}
            successRedirect={() => router.push("/feed")}
            navigateBack={() => router.push("/auth")}
            cardBackgroundColor={"#1C1C1C"}
            nearTitleColor={"white"}
          />
        </WalletSelectorContextProvider>
        <div className="mt-6">
          <CalimeroLogo />
        </div>
      </div>
    </div>
  );
}
