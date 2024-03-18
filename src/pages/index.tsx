import ErrorPopup from "@/components/error/errorPopup";
import Header from "@/components/header/header";
import Loader from "@/components/loader/loader";
import LoginWithMetamask from "@/components/wallets/metamask";

export default function Index() {
    return (
        <>
            <Header />
            <LoginWithMetamask />
        </>
    );

}
