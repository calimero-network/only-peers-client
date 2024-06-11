import { useRouter } from "next/router";
import { useState } from "react";
import CalimeroLogo from "src/components/icons/Logo";
import LoginSelector from "@calimero-is-near/calimero-p2p-sdk/lib/wallets/LoginSelector";
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
                  <LoginSelector
                    navigateMetamaskLogin={onMetamaskSelected}
                    navigateNearLogin={onNearSelected}
                    cardBackgroundColor={""}
                  />
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
