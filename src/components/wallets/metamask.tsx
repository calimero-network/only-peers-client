import {getOrCreateKeypair} from "../../crypto/ed25519";
import {MetaMaskButton, useAccount, useSDK, useSignMessage} from "@metamask/sdk-react-ui";
import {useRouter} from "next/router";
import {useCallback, useEffect, useState} from "react";
import apiClient from "src/api";
import {Challenge, WalletSignatureData} from "src/api/nodeApi";
import {ResponseData} from "src/api/response";

export default function LoginWithMetamask() {
    const {isConnected, address} = useAccount();
    const [walletSignatureData, setWalletSignatureData] = useState<WalletSignatureData | null>(null);

    const {ready} = useSDK();
    const router = useRouter();

    const {
        data: signData,
        isError: isSignError,
        isLoading: isSignLoading,
        isSuccess: isSignSuccess,
        signMessage,
    } = useSignMessage({
        message: walletSignatureData != null ? JSON.stringify(walletSignatureData) : undefined,
    });

    const requestNodeData = useCallback(async () => {
        const challengeResponseData: ResponseData<Challenge> = await apiClient.node().requestChallenge();
        const clientKey = await getOrCreateKeypair();

        if (challengeResponseData.error) {
            console.log("requestNodeData error", challengeResponseData.error);
            return;
        }

        setWalletSignatureData(prevState => ({
            ...prevState,
            challenge: challengeResponseData.data,
            clientPubKey: clientKey.publicKey
        }));

    }, []);

    const login = useCallback(async () => {
        if (!signData) {
            console.log("signature is empty");
        } else if (!address) {
            console.log("address is empty");
        } else {
            //request challenge
            await apiClient.node().login(walletSignatureData, signData, address).then((result) => {
                if (result.error) {
                    console.log("login error", result.error);
                } else {
                    router.push("/feed");
                }
            }).catch(() => {
                console.log("error while login");
            });
        }
    }, [address, router, signData, walletSignatureData]);


    useEffect(() => {
        if (isConnected) {
            requestNodeData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isConnected]);

    useEffect(() => {
        if (isSignSuccess && walletSignatureData) {
            //send request to node
            console.log("signature", signData);
            console.log("address", address);
            login();
        }
    }, [address, isSignSuccess, login, signData, walletSignatureData]);

    if (!ready) {
        return <div>Loading...</div>;
    }

    return (
        <div className=" flex align-middle p-2">
            <div className="grid text-white  text-center">
                Metamask
                <header>
                    <MetaMaskButton theme={"light"} color="white"></MetaMaskButton>
                    {isConnected && walletSignatureData && (
                        <>
                            <div className="mt-5">
                                <button
                                    disabled={isSignLoading}
                                    onClick={() => signMessage()}
                                >
                                    Sign authentication transaction
                                </button>
                                {isSignError && <div>Error signing message</div>}
                            </div>
                        </>
                    )}
                </header>
            </div>
        </div>
    );
}