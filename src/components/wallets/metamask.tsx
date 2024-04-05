import {getOrCreateKeypair} from "../../crypto/ed25519";
import {MetaMaskButton, useAccount, useSDK, useSignMessage} from "@metamask/sdk-react-ui";
import {useRouter} from "next/router";
import {useCallback, useEffect, useState} from "react";
import apiClient from "src/api";
import {EthSignatureMessageMetadata, LoginRequest, NodeChallenge, Payload, SignatureMessage, SignatureMessageMetadata, WalletMetadata, WalletSignatureData, WalletType} from "src/api/nodeApi";
import {ResponseData} from "src/api/response";
import {setStorageNodeAuthorized} from "src/lib/storage";

export default function LoginWithMetamask() {
    const {isConnected, address} = useAccount();
    const [walletSignatureData, setWalletSignatureData] = useState<WalletSignatureData | null>(null);

    const {ready} = useSDK();
    const router = useRouter();

    const signatureMessage = useCallback((): string => {
        return walletSignatureData != null ? walletSignatureData?.payload.message.message : undefined;
    }, [walletSignatureData]);


    const {
        data: signData,
        isError: isSignError,
        isLoading: isSignLoading,
        isSuccess: isSignSuccess,
        signMessage,
    } = useSignMessage({
        message: signatureMessage(),
    });

    const requestNodeData = useCallback(async () => {
        const challengeResponseData: ResponseData<NodeChallenge> = await apiClient.node().requestChallenge();
        const {publicKey} = await getOrCreateKeypair();

        if (challengeResponseData.error) {
            console.error("requestNodeData error", challengeResponseData.error);
            //TODO handle error
            return;
        }

        const signatureMessage: SignatureMessage = {
            nodeSignature: challengeResponseData.data.nodeSignature,
            clientPublicKey: publicKey
        };

        const signatureMessageMetadata: SignatureMessageMetadata = {
            nodeSignature: challengeResponseData.data.nodeSignature,
            clientPublicKey: publicKey,
            nonce: challengeResponseData.data.nonce.toString("base64"),
            applicationId: challengeResponseData.data.applicationId,
            timestamp: challengeResponseData.data.timestamp,
            message: JSON.stringify(signatureMessage)
        };
        const signatureMetadata: EthSignatureMessageMetadata = {};
        const payload: Payload = {
            message: signatureMessageMetadata,
            metadata: signatureMetadata
        };
        const wsd: WalletSignatureData = {
            payload: payload,
            clientPubKey: publicKey
        };
        setWalletSignatureData(wsd);
    }, []);

    const login = useCallback(async () => {
        if (!signData) {
            console.error("signature is empty");
            //TODO handle error
        } else if (!address) {
            console.error("address is empty");
            //TODO handle error
        } else {
            const walletMetadata: WalletMetadata = {
                type: WalletType.ETH,
                signingKey: address
            };
            const loginRequest: LoginRequest = {
                walletSignature: signData,
                payload: walletSignatureData.payload,
                walletMetadata: walletMetadata
            };
            await apiClient.node().login(loginRequest).then((result) => {
                if (result.error) {
                    console.error("login error", result.error);
                    //TODO handle error
                } else {
                    setStorageNodeAuthorized();
                    router.push("/feed");
                }
            }).catch(() => {
                console.error("error while login");
                //TODO handle error
            });
        }
    }, [address, router, signData, walletSignatureData?.payload]);


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