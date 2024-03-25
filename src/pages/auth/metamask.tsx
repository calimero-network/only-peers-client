import LoginWithMetamask from "../../components/wallets/metamask";
import {MetaMaskUIProvider} from "@metamask/sdk-react-ui";

export default function Metamask() {

    return (
        <div className="flex w-full h-screen justify-center">
            <MetaMaskUIProvider
                sdkOptions={{
                    dappMetadata: {
                        name: "Only Peers",
                        // url: window.location.href,
                    },
                    checkInstallationOnAllCalls: true
                }}
            >
                <div className="flex w-full h-screen justify-center">
                    <div className="flex justify-center items-center">
                        <div className="items-center bg-gray-500 p-8 gap-y-4 rounded-lg">
                            <div>
                                <LoginWithMetamask />
                            </div>
                        </div>
                    </div>
                </div >
            </MetaMaskUIProvider>
        </div>
    );
}