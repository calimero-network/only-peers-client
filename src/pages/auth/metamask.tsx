import CalimeroLogo from "src/components/icons/Logo";
import LoginWithMetamask from "../../components/wallets/metamask";
import { MetaMaskUIProvider } from "@metamask/sdk-react-ui";

export default function Metamask() {
  return (
    <div className="flex w-full h-screen justify-center">
      <MetaMaskUIProvider
        sdkOptions={{
          dappMetadata: {
            name: "Only Peers",
            // url: window.location.href,
          },
          checkInstallationOnAllCalls: true,
        }}
      >
        <div className="flex w-full h-screen justify-center bg-[#111111]">
          <div className="flex flex-col justify-center items-center">
            <div className="items-center bg-[#1C1C1C] p-8 gap-y-4 rounded-lg">
              <div>
                <LoginWithMetamask />
              </div>
            </div>
            <div className="mt-6">
              <CalimeroLogo />
            </div>
          </div>
        </div>
      </MetaMaskUIProvider>
    </div>
  );
}
