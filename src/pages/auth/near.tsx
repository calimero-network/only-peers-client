import { Fragment } from "react";
import { WalletSelectorContextProvider } from "../../contexts/WalletSelectorContext";
import Content from "../../components/Content";
import NearIcon from "src/components/icons/Near";
import CalimeroLogo from "src/components/icons/Logo";

export default function Near() {
  return (
    <div className="flex w-full h-screen justify-center bg-[#111111]">
      <div className="flex flex-col justify-center items-center">
        <div className="items-center bg-[#1C1C1C] p-8 gap-y-4 rounded-lg">
          <div className="flex justify-center items-center w-full gap-2">
            <div className="text-white text-4xl font-semibold">NEAR Wallet</div>
          </div>
          <div className="flex mt-6 space-x-4 text-white justify-center">
            <Fragment>
              <WalletSelectorContextProvider>
                <Content />
              </WalletSelectorContextProvider>
            </Fragment>
          </div>
        </div>
        <div className="mt-6">
          <CalimeroLogo />
        </div>
      </div>
    </div>
  );
}
