import * as nearAPI from "near-api-js";
import {WalletConnection, connect} from "near-api-js";
import {Fragment, useEffect, useState} from "react";
import {setupWalletSelector} from "@near-wallet-selector/core";
import {setupModal} from "@near-wallet-selector/modal-ui";
import {WalletSelectorContextProvider} from "../../contexts/WalletSelectorContext";
import Content from "../../components/Content";
import {setupMyNearWallet} from "@near-wallet-selector/my-near-wallet";

export default function Near() {
    const [walletConnection, setWalletConnection] = useState<nearAPI.WalletConnection | undefined>(undefined);
    const [nearConnection, setNearConnection] = useState<nearAPI.Near | undefined>(undefined);


    async function setWalletSelector() {
        const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore();

        const connectionConfig = {
            networkId: "testnet",
            keyStore: keyStore,
            nodeUrl: "https://rpc.testnet.near.org",
            walletUrl: "https://testnet.mynearwallet.com/",
            helperUrl: "https://helper.testnet.near.org",
            explorerUrl: "https://testnet.nearblocks.io",
        };

        const selector = await setupWalletSelector({
            network: "testnet",

            modules: [setupMyNearWallet(connectionConfig)],
        });

        const modal = setupModal(selector, {
            contractId: "test.testnet",
        });

        console.log("show");
        modal.show();
    }

    useEffect(() => {
        setWalletSelector();
    }, []);

    async function createWalletConnection() {
        const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore();

        const connectionConfig = {
            networkId: "testnet",
            keyStore: keyStore,
            nodeUrl: "https://rpc.testnet.near.org",
            walletUrl: "https://testnet.mynearwallet.com/",
            helperUrl: "https://helper.testnet.near.org",
            explorerUrl: "https://testnet.nearblocks.io",
        };

        // connect to NEAR
        const nearConnection: nearAPI.Near = await connect(connectionConfig);

        const walletConnection: nearAPI.WalletConnection = new WalletConnection(nearConnection, "OnlyPeers");
        setNearConnection(nearConnection);
        setWalletConnection(walletConnection);
    }

    useEffect(() => {
        createWalletConnection();
    }, []);

    if (!walletConnection) {
        return "Loading...";
    }

    // create wallet connection

    async function signIn() {
        console.log("sign in");
        if (walletConnection) {
            await walletConnection.requestSignIn({
                // contractId: "example-contract.testnet.REPLACE_ME",
                // methodNames: [], // optional
                // successUrl: "REPLACE_ME://.com/success", // optional redirect URL on success
                // failureUrl: "REPLACE_ME://.com/failure", // optional redirect URL on failure
            });
        }


    };

    const signOut = () => {
        console.log("sign out");
        walletConnection.signOut();
    };

    async function signMsg() {
        if (nearConnection) {

            const signature = await nearConnection.connection.signer.signMessage(new TextEncoder().encode("blabla"), "vuki.testnet", "testnet");
            console.log("signature", signature);
        }
    }


    return (
        <Fragment>
            <div className="">
            </div>
            <WalletSelectorContextProvider>
                <Content />
            </WalletSelectorContextProvider>
        </Fragment>
        // <div className="flex w-screen h-screen bg-black justify-center">
        //     <div className="flex justify-center items-center  ">
        //         <div className="items-center bg-gray-500 p-8 gap-y-4 rounded-lg">
        //             {walletConnection.isSignedIn() ? (
        //                 <div>
        //                     <div onClick={signOut}>
        //                         SIGN OUT
        //                     </div>
        //                     <div onClick={signMsg}>
        //                         SIGN MESSAGE
        //                     </div>
        //                 </div>
        //             ) : (
        //                 <div onClick={signIn}>
        //                     SIGN IN
        //                 </div>
        //             )
        //             }
        //         </div>
        //     </div>
        // </div >


    );
};