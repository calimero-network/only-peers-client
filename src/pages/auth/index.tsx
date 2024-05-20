import { useRouter } from "next/router";
import { useState } from "react";
import LoginButton from "src/components/button/LoginButton";
import Header from "src/components/header/header";
import CalimeroLogo from "src/components/icons/Logo";
import Metamask from "src/components/icons/Metamask";
import NearIcon from "src/components/icons/Near";
import Spinner from "src/components/icons/Spinner";
import { clearAppEndpoint } from "src/lib/storage";

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

  function onSetupClick() {
    clearAppEndpoint();
    router.push("/setup");
  }

  return (
    <>
      <div className="flex w-full h-screen bg-[#111111]">
        <div
          className="h-fit text-white p-4 cursor-pointer"
          onClick={onSetupClick}
        >
          Return to setup
        </div>

        <div className="w-full h-full flex justify-items-center justify-center">
          <div className="flex flex-col justify-center items-center">
            <div className="items-center bg-[#1C1C1C] p-8 gap-y-4 rounded-lg">
              <div className="flex justify-center items-center gap-3 px-14">
                <div className="text-white text-4xl font-semibold">
                  Only Peers
                </div>
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
                    Continue with wallet
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
      </div>
    </>
  );
}
