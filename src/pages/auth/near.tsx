import {Fragment} from "react";
import {WalletSelectorContextProvider} from "../../contexts/WalletSelectorContext";
import Content from "../../components/Content";

export default function Near() {
    return (
        <Fragment>
            <WalletSelectorContextProvider>
                <Content />
            </WalletSelectorContextProvider>
        </Fragment>
    );
};