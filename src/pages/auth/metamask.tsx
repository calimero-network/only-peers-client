import LoginWithMetamask from "../../components/wallets/metamask";
import {MetaMaskUIProvider} from "@metamask/sdk-react-ui";

export default function Metamask() {

    return (
        <MetaMaskUIProvider
            sdkOptions={{
                dappMetadata: {
                    name: "Only Peers",
                    // url: window.location.href,
                },
                checkInstallationOnAllCalls: true
            }}
        >
            <div className="flex w-screen h-screen bg-black justify-center">
                <div className="flex justify-center items-center  ">
                    <div className="items-center bg-gray-500 p-8 gap-y-4 rounded-lg">
                        <div>
                            <LoginWithMetamask />
                        </div>
                    </div>
                </div>
            </div >
        </MetaMaskUIProvider>
    );
}