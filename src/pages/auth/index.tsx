import {useRouter} from "next/router";
import {Fragment} from "react";
import Content from "src/components/Content";
import {WalletSelectorContextProvider} from "src/contexts/WalletSelectorContext";

export default function Auth() {
    const router = useRouter();

    function onMetamaskSelected() {
        router.push("/auth/metamask");
    }

    return (
        <div className="flex w-screen h-screen bg-red justify-center">
            <div className="flex justify-center items-center  ">
                <div className="items-center bg-gray-500 p-8 gap-y-4 rounded-lg">
                    <div className="w-full text-center text-white mb-4 text-xl">
                        Select login option
                    </div>
                    <div className="flex space-x-4 text-white  justify-between">
                        <Fragment>
                            <button onClick={onMetamaskSelected} >
                                Login with Metamask
                            </button>
                        </Fragment>
                        <WalletSelectorContextProvider>
                            <Content />
                        </WalletSelectorContextProvider>
                    </div>
                </div>
            </div >
        </div>
    );
}