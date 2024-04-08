import {Fragment} from "react";
import {WalletSelectorContextProvider} from "../../contexts/WalletSelectorContext";
import Content from "../../components/Content";

export default function Near() {
    return (

        <div className="flex w-full h-screen justify-center">
            <div className="flex justify-center items-center">
                <div className="items-center bg-gray-500 p-8 gap-y-4 rounded-lg">
                    <div className="w-full text-center text-white mb-4 text-xl">
                        NEAR
                    </div>
                    <div className="flex space-x-4 text-white justify-between">
                        <Fragment>
                            <WalletSelectorContextProvider>
                                <Content />
                            </WalletSelectorContextProvider>
                        </Fragment>
                    </div>
                </div>
            </div >
        </div>

    );
};
