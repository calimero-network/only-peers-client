import { useEffect, useState } from "react";

import translations from "../../constants/en.global.json";

export default function Header() {
  const t = translations.header;

  const [identityPublicKey, setIdentityPublicKey] = useState<string | null>(
    null,
  );
  const [walletPublicKey, setWalletPublicKey] = useState<string | null>(null);
  const [copyNotification, setCopyNotification] = useState<string | null>(null);

  useEffect(() => {
    const setPublicKeys = async () => {
      const identityPk = localStorage.getItem("identity-public-key");
      const walletPk = localStorage.getItem("public-key");
      if (identityPk && walletPk) {
        setIdentityPublicKey(identityPk);
        setWalletPublicKey(walletPk);
      } else {
        window.alert(
          "There is error with application, please return to applications dashboard and try again.",
        );
      }
    };
    setPublicKeys();
  }, []);

  function copyToClipboard(text: string, type: "identity" | "wallet") {
    navigator.clipboard.writeText(text);
    setCopyNotification(type);
    setTimeout(() => {
      setCopyNotification(null);
    }, 2000);
  }

  return (
    <header className="border-b-2 border-[#1c2123] mx-2 md:mx-10">
      <nav
        className="mx-auto flex md:flex-row flex-col items-center justify-between p-4"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a
            href="/feed"
            className="-m-1.5 p-1.5 flex justify-center items-center"
          >
            <div className="text-white text-xl font-bold font-serif">
              {t.logoText}
            </div>
          </a>
        </div>
        <div className="flex flex-1 justify-end items-center gap-2 mt-4 md:mt-0">
          {identityPublicKey && walletPublicKey && (
            <div className="flex gap-4 items-center">
              <div className="relative">
                <button
                  className="text-sm font-semibold leading-6 cursor-pointer border-[1px] border-white rounded-2xl px-2 py-1 text-white  hover:text-white transition"
                  onClick={() => copyToClipboard(identityPublicKey, "identity")}
                  title="Copy node identity public key"
                >
                  Identity public key:{" "}
                  <span className="pl-1 text-pink-400 hover:bg-pink-500">
                    {`${identityPublicKey.slice(0, 4).toLocaleLowerCase()}...${identityPublicKey
                      .slice(identityPublicKey.length - 4)
                      .toLocaleLowerCase()}`}
                  </span>
                </button>
                {copyNotification === "identity" && (
                  <div className="absolute z-10 top-14 md:top-8 right-2 md:left-1/2 -translate-x-1/2 text-xs text-green-400">
                    Copied!
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  className="text-sm font-semibold leading-6 cursor-pointer border-[1px] border-white rounded-2xl px-2 py-1 text-white  hover:text-white transition"
                  onClick={() => copyToClipboard(walletPublicKey, "wallet")}
                  title="Copy wallet public key"
                >
                  Wallet public key:{" "}
                  <span className="pl-1 text-pink-400 hover:bg-pink-500">
                    {`${walletPublicKey.slice(0, 4).toLocaleLowerCase()}...${walletPublicKey
                      .slice(walletPublicKey.length - 4)
                      .toLocaleLowerCase()}`}
                  </span>
                </button>
                {copyNotification === "wallet" && (
                  <div className="absolute z-10 top-14 md:top-8 right-2 md:left-1/2 -translate-x-1/2 text-xs text-green-400">
                    Copied!
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
