import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import Content from "src/components/Content";
import LoginButton from "src/components/button/LoginButton";
import CalimeroLogo from "src/components/icons/Logo";
import Metamask from "src/components/icons/Metamask";
import NearIcon from "src/components/icons/Near";
import OnlyPeers from "src/components/icons/Onlypeers";
import Spinner from "src/components/icons/Spinner";
import { WalletSelectorContextProvider } from "src/contexts/WalletSelectorContext";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function onMetamaskSelected() {
    setLoading(true);
    router.push("/auth/metamask");
  }

  function onNearSelected() {
    setLoading(true);
    router.push("/auth/near");
  }

  return (
    <div className="flex w-full h-screen justify-center bg-[#111111]">
      <div className="flex flex-col justify-center items-center">
        <div className="items-center bg-[#1C1C1C] p-8 gap-y-4 rounded-lg">
          <div className="flex justify-center items-center gap-3 px-14">
            <div>
              <OnlyPeers />
            </div>
            <div className="text-white text-4xl font-semibold">Only Peers</div>
          </div>
          {loading ? (
            <div className="flex flex-col gap-4 justify-center items-center mt-6">
              <Spinner />
              <span className="text-white text-2xl font-semibold">
                Loading ...
              </span>
            </div>
          ) : (
            <>
              <div className="w-full text-center text-white mt-6 mb-6 text-2xl font-medium">
                Continue With wallet
              </div>
              <div className="flex flex-col w-full gap-2 pt-[50px]">
                <LoginButton
                  title="Metamask"
                  onClick={onMetamaskSelected}
                  backgroundColor={"bg-[#FF7A00]"}
                  textColor={"text-white"}
                  icon={<Metamask />}
                />
                <LoginButton
                  title="Near Wallet"
                  onClick={onNearSelected}
                  backgroundColor={"bg-[#D1D5DB]"}
                  textColor={"text-black"}
                  icon={<NearIcon />}
                />
              </div>
            </>
          )}
        </div>
        <div className="mt-6">
          <CalimeroLogo />
        </div>
      </div>
    </div>
  );
}
