import {MetaMaskButton, useAccount, useSDK, useSignMessage} from "@metamask/sdk-react-ui";

export default function LoginWithMetamask() {
    const {
        data: signData,
        isError: isSignError,
        isLoading: isSignLoading,
        isSuccess: isSignSuccess,
        signMessage,
    } = useSignMessage({
        message: "gm wagmi frens",
    });
    const {isConnected, address} = useAccount();

    const {ready} = useSDK();

    if (!ready) {
        return <div>Loading...</div>;
    }

    return (
        <div className=" flex bg-slate-400 align-middle p-2">
            <header>
                <MetaMaskButton theme={"light"} color="white"></MetaMaskButton>
                {isConnected && (
                    <>
                        <div className="mt-5 bg-white">
                            <button
                                disabled={isSignLoading}
                                onClick={() => signMessage()}
                            >
                                Sign message
                            </button>
                            {isSignSuccess && <div>Signature: {signData}</div>}
                            {isSignSuccess && <div>Address: {address}</div>}
                            {isSignError && <div>Error signing message</div>}
                        </div>
                    </>
                )}
            </header>
        </div>
    );
}