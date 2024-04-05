import React, {Fragment, useCallback, useEffect, useState} from "react";
import {providers} from "near-api-js";
import type {
    AccountView,
} from "near-api-js/lib/providers/provider";
import {
    verifyFullKeyBelongsToUser,
    verifySignature,
    type SignedMessage,
    type SignMessageParams,
} from "@near-wallet-selector/core";

import {useWalletSelector} from "../contexts/WalletSelectorContext";
import Button from "./button/button";
import {getOrCreateKeypair} from "src/crypto/ed25519";
import apiClient from "src/api";
import {WalletSignatureData, NodeChallenge, Payload, SignatureMessage, SignatureMetadata, NearSignatureMessageMetadata, LoginRequest, WalletMetadata, WalletType, SignatureMessageMetadata} from "src/api/nodeApi";
import {ResponseData} from "src/api/response";
import {useRouter} from "next/router";
import {setStorageNodeAuthorized} from "src/lib/storage";

export interface Message {
    premium: boolean;
    sender: string;
    text: string;
}

export type Account = AccountView & {
    account_id: string;
};

const Content: React.FC = () => {
    const {selector, accounts, modal, accountId} = useWalletSelector();
    const [account, setAccount] = useState<Account | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const appName = "only-peers";
    const router = useRouter();

    const getAccount = useCallback(async (): Promise<Account | null> => {
        if (!accountId) {
            return null;
        }

        const {network} = selector.options;
        const provider = new providers.JsonRpcProvider({url: network.nodeUrl});

        return provider
            .query<AccountView>({
                request_type: "view_account",
                finality: "final",
                account_id: accountId,
            })
            .then((data) => ({
                ...data,
                account_id: accountId,
            }));
    }, [accountId, selector]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            verifyMessageBrowserWallet();
        }, 500);

        return () => {
            clearTimeout(timeoutId);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!accountId) {
            return setAccount(null);
        }

        setLoading(true);

        getAccount().then((nextAccount: any) => {
            setAccount(nextAccount);
            setLoading(false);
        });
    }, [accountId, getAccount]);

    function handleSignIn() {
        modal.show();
    };

    async function handleSignOut() {
        const wallet = await selector.wallet();

        wallet.signOut().catch((err: any) => {
            console.log("Failed to sign out");
            console.error(err);
        });
    };

    function handleSwitchWallet() {
        modal.show();
    };

    function handleSwitchAccount() {
        const currentIndex = accounts.findIndex((x) => x.accountId === accountId);
        const nextIndex = currentIndex < accounts.length - 1 ? currentIndex + 1 : 0;

        const nextAccountId = accounts[nextIndex].accountId;

        selector.setActiveAccount(nextAccountId);

        alert("Switched account to " + nextAccountId);
    };

    const verifyMessage = useCallback(async (
        message: SignMessageParams,
        signedMessage: SignedMessage,
    ): Promise<boolean> => {
        console.log("verifyMessage", {message, signedMessage});

        const verifiedSignature = verifySignature({
            message: message.message,
            nonce: message.nonce,
            recipient: message.recipient,
            publicKey: signedMessage.publicKey,
            signature: signedMessage.signature,
            callbackUrl: message.callbackUrl,
        });
        const verifiedFullKeyBelongsToUser = await verifyFullKeyBelongsToUser({
            publicKey: signedMessage.publicKey,
            accountId: signedMessage.accountId,
            network: selector.options.network,
        });

        const isMessageVerified = verifiedFullKeyBelongsToUser && verifiedSignature;

        const resultMessage = isMessageVerified
            ? "Successfully verified"
            : "Failed to verify";

        console.log(
            `${ resultMessage } signed message: '${ message.message
            }': \n ${ JSON.stringify(signedMessage) }`
        );

        return isMessageVerified;
    }, [selector.options.network]);

    const verifyMessageBrowserWallet = useCallback(async () => {
        const urlParams = new URLSearchParams(
            window.location.hash.substring(1) // skip the first char (#)
        );
        const accId = urlParams.get("accountId") as string;
        const publicKey = urlParams.get("publicKey") as string;
        const signature = urlParams.get("signature") as string;

        if (!accId && !publicKey && !signature) {
            console.error("Missing params in url.");
            return;
        }

        const message: SignMessageParams = JSON.parse(
            localStorage.getItem("message")!
        );

        const state: SignatureMessageMetadata = JSON.parse(message.state);

        const signedMessage = {
            accountId: accId,
            publicKey,
            signature,
        };

        const isMessageVerified: boolean = await verifyMessage(message, signedMessage);

        const url = new URL(location.href);
        url.hash = "";
        url.search = "";
        window.history.replaceState({}, document.title, url);
        localStorage.removeItem("message");
        // eslint-disable-next-line react-hooks/exhaustive-deps

        if (isMessageVerified) {
            const signatureMetadata: NearSignatureMessageMetadata = {
                recipient: message.recipient,
                callbackUrl: message.callbackUrl,
                nonce: message.nonce.toString("base64"),
            };
            const payload: Payload = {
                message: state,
                metadata: signatureMetadata
            };
            const walletSignatureData: WalletSignatureData = {
                payload: payload,
                clientPubKey: publicKey
            };
            const walletMetadata: WalletMetadata = {
                type: WalletType.NEAR,
                signingKey: publicKey
            };
            const loginRequest: LoginRequest = {
                walletSignature: signature,
                payload: walletSignatureData.payload,
                walletMetadata: walletMetadata
            };

            await apiClient.node().login(loginRequest).then((result) => {
                console.log("result", result);
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
        } else {
            //TODO handle error
            console.error("Message not verified");
        }
    }, [router, verifyMessage]);

    async function handleSignMessage() {
        const challengeResponseData: ResponseData<NodeChallenge> = await apiClient.node().requestChallenge();
        const {publicKey} = await getOrCreateKeypair();

        if (challengeResponseData.error) {
            console.log("requestChallenge api error", challengeResponseData.error);
            return;
        }

        const wallet = await selector.wallet();
        const nonce = Buffer.from(crypto.getRandomValues(new Uint8Array(32)));
        const recipient = appName;
        const callbackUrl = location.href;
        const applicationId = challengeResponseData.data.applicationId;
        const nodeSignature = challengeResponseData.data.nodeSignature;
        const timestamp = challengeResponseData.data.timestamp;


        const signatureMessage: SignatureMessage = {
            nodeSignature,
            clientPublicKey: publicKey
        };
        const message: string = JSON.stringify(signatureMessage);

        const state: SignatureMessageMetadata = {
            clientPublicKey: publicKey,
            nodeSignature,
            nonce: nonce.toString("base64"),
            applicationId,
            timestamp,
            message
        };

        if (wallet.type === "browser") {
            console.log("browser");

            localStorage.setItem(
                "message",
                JSON.stringify({
                    message,
                    nonce: [...nonce],
                    recipient,
                    callbackUrl,
                    state: JSON.stringify(state),
                })
            );
        }

        try {
            const signedMessage: void | SignedMessage = await wallet.signMessage({
                message,
                nonce,
                recipient,
            });

            if (signedMessage) { //return void
                console.log("signedMessage", signedMessage);
                const isMessageVerified = await verifyMessage({message, nonce, recipient}, signedMessage);
                console.log("isMesssss", isMessageVerified);
                //LOGIN????
            }


        } catch (err) {
            const errMsg =
                err instanceof Error ? err.message : "Something went wrong";
            alert(errMsg);
        }
    };

    if (loading) {
        return null;
    }

    if (!account) {
        return (
            <Fragment>
                <div>
                    <Button
                        title="Log in with NEAR"
                        onClick={handleSignIn}
                        backgroundColor={""}
                        backgroundColorHover={""} />
                </div>
            </Fragment>
        );
    }

    return (
        <Fragment>
            <div className="flex space-x-2">
                <Button onClick={handleSignOut} title="Log out" backgroundColor={""} backgroundColorHover={""} />
                <Button onClick={handleSwitchWallet} title="Switch Wallet" backgroundColor={""} backgroundColorHover={""} />
                <Button onClick={handleSignMessage} title="Authenticate" backgroundColor={""} backgroundColorHover={""} />
                {accounts.length > 1 && (
                    <Button onClick={handleSwitchAccount} title="Switch Account" backgroundColor={""} backgroundColorHover={""} />
                )}
            </div>

        </Fragment>
    );
};

export default Content;