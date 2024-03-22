import {WalletSignData, login, requestChallenge} from "../../api/login";
import {createAndStoreKeypair as createKeypair} from "../../crypto/ed25519";
import {MetaMaskButton, useAccount, useSDK, useSignMessage} from "@metamask/sdk-react-ui";
import {useRouter} from "next/router";
import {useCallback, useEffect, useState} from "react";

export default function LoginWithMetamask() {
    const {isConnected, address} = useAccount();
    const [walletSignData, setWalletSignData] = useState<WalletSignData>({
        challenge: undefined,
        pubKey: undefined,
        applicationId: undefined
    });
    const [keys, setKeys] = useState({
        privateKey: "",
        publicKey: ""
    });

    const {ready} = useSDK();
    const router = useRouter();

    const {
        data: signData,
        isError: isSignError,
        isLoading: isSignLoading,
        isSuccess: isSignSuccess,
        signMessage,
    } = useSignMessage({
        message: walletSignData != null ? JSON.stringify(walletSignData) : undefined,
    });

    const generatePKey = useCallback(async () => {
        const {privateKeyString, publicKeyString} = await createKeypair();

        setKeys({
            privateKey: privateKeyString,
            publicKey: publicKeyString
        });

        setWalletSignData(prevState => ({
            ...prevState,
            pubKey: publicKeyString
        }));

    }, []);


    const requestNodeData = useCallback(async () => {
        const {challenge, applicationId} = await requestChallenge();

        setWalletSignData(prevState => ({
            ...prevState,
            challenge,
            applicationId
        }));

    }, []);

    useEffect(() => {
        if (isConnected) {
            //TODO prevent double creation
            generatePKey();
            requestNodeData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isConnected]);

    useEffect(() => {
        if (isSignSuccess && walletSignData) {
            //send request to node
            console.log("signature", signData);
            console.log("address", address);

            if (!signData) {
                console.log("signature is empty");
            } else if (!address) {
                console.log("address is empty");
            } else {
                //request challenge
                login(walletSignData, signData, address).then((result) => {
                    if (result) {
                        localStorage.setItem("client-key", JSON.stringify({
                            privateKey: keys.privateKey,
                            publicKey: keys.publicKey
                        }));
                        router.push("/feed");
                    }
                }).catch(() => {
                    console.log("error while login");
                });
            }

        }
    }, [address, walletSignData, isSignSuccess, signData, keys.privateKey, keys.publicKey, router]);

    if (!ready) {
        return <div>Loading...</div>;
    }

    return (
        <div className=" flex align-middle p-2">
            <div className="grid text-white  text-center">
                Metamask
                <header>
                    <MetaMaskButton theme={"light"} color="white"></MetaMaskButton>
                    {isConnected && walletSignData && (
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