import React, {Fragment, useCallback, useEffect, useState} from "react";
import {providers, utils} from "near-api-js";
import type {
    AccountView,
    CodeResult,
} from "near-api-js/lib/providers/provider";
import {
    verifyFullKeyBelongsToUser,
    verifySignature,
    type SignedMessage,
    type SignMessageParams,
} from "@near-wallet-selector/core";
import BN from "bn.js";

import {useWalletSelector} from "../contexts/WalletSelectorContext";
import Button from "./button/button";
import {requestChallenge} from "src/api/login";

export interface Message {
    premium: boolean;
    sender: string;
    text: string;
}

export type Account = AccountView & {
    account_id: string;
};

type Submitted = SubmitEvent & {
    target: {elements: {[key: string]: HTMLInputElement;};};
};


const Content: React.FC = () => {
    const {selector, accounts, modal, accountId} = useWalletSelector();
    const [account, setAccount] = useState<Account | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const appName = "only-peers";

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

    const handleVerifyOwner = async () => {
        const wallet = await selector.wallet();
        try {
            const owner = await wallet.verifyOwner({
                message: "test message for verification",
            });

            if (owner) {
                alert(`Signature for verification: ${ JSON.stringify(owner) }`);
            }
        } catch (err) {
            const message =
                err instanceof Error ? err.message : "Something went wrong";
            alert(message);
        }
    };

    async function verifyMessage(
        message: SignMessageParams,
        signedMessage: SignedMessage
    ) {
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

        const alertMessage = isMessageVerified
            ? "Successfully verified"
            : "Failed to verify";

        alert(
            `${ alertMessage } signed message: '${ message.message
            }': \n ${ JSON.stringify(signedMessage) }`
        );
    };

    const verifyMessageBrowserWallet = useCallback(async () => {
        const urlParams = new URLSearchParams(
            window.location.hash.substring(1) // skip the first char (#)
        );
        const accId = urlParams.get("accountId") as string;
        const publicKey = urlParams.get("publicKey") as string;
        const signature = urlParams.get("signature") as string;

        if (!accId && !publicKey && !signature) {
            return;
        }

        const message: SignMessageParams = JSON.parse(
            localStorage.getItem("message")!
        );

        const signedMessage = {
            accountId: accId,
            publicKey,
            signature,
        };

        await verifyMessage(message, signedMessage);

        const url = new URL(location.href);
        url.hash = "";
        url.search = "";
        window.history.replaceState({}, document.title, url);
        localStorage.removeItem("message");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function handleSignMessage() {
        const {challenge, applicationId} = await requestChallenge();

        const wallet = await selector.wallet();
        const message = challenge;
        const nonce = Buffer.from(crypto.getRandomValues(new Uint8Array(32)));
        const recipient = appName;

        if (wallet.type === "browser") {
            localStorage.setItem(
                "message",
                JSON.stringify({
                    message,
                    nonce: [...nonce],
                    recipient,
                    callbackUrl: location.href,
                })
            );
        }

        try {
            const signedMessage = await wallet.signMessage({
                message,
                nonce,
                recipient,
            });
            if (signedMessage) {
                await verifyMessage({message, nonce, recipient}, signedMessage);
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
                <Button onClick={handleVerifyOwner} title="Verify Owner" backgroundColor={""} backgroundColorHover={""} />
                <Button onClick={handleSignMessage} title="Sign Message" backgroundColor={""} backgroundColorHover={""} />
                {accounts.length > 1 && (
                    <Button onClick={handleSwitchAccount} title="Switch Account" backgroundColor={""} backgroundColorHover={""} />
                )}
            </div>

        </Fragment>
    );
};

export default Content;