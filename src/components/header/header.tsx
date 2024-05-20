import { useEffect, useState } from "react";

import Link from "next/link";
import translations from "../../constants/en.global.json";
import { useRouter } from "next/router";
import { getPeerId } from "src/lib/peerId";
import {
  getStorageClientKey,
  clearClientKey,
  clearNodeAuthorized,
  clearAppEndpoint,
} from "src/lib/storage";

export default function Header() {
  const t = translations.header;
  const router = useRouter();
  const [privateKey, _setPrivateKey] = useState(getStorageClientKey());
  const [peerId, setPeerId] = useState("");

  useEffect(() => {
    const setPeer = async () => {
      let peerIdString = await getPeerId();
      setPeerId(peerIdString);
    };
    if (privateKey) {
      setPeer();
    }
  }, [privateKey]);

  function logout() {
    clearClientKey();
    clearNodeAuthorized();
    clearAppEndpoint();
    router.reload();
  }

  return (
    <header className="border-b-2 border-[#1c2123] mx-10">
      <nav
        className="mx-auto flex items-center justify-between p-4"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link
            href="/"
            className="-m-1.5 p-1.5 flex justify-center items-center"
          >
            <div className="text-white text-xl font-bold font-serif">
              {t.logoText}
            </div>
          </Link>
        </div>
        <div className="flex flex-1 justify-end items-center gap-2">
          {peerId && (
            <div className="text-sm font-semibold leading-6 text-white cursor-pointer">
              {t.peerIdText}:{" "}
              <span className="text-purple-500 pl-1" onClick={logout}>
                {`${peerId.slice(0, 4).toLocaleLowerCase()}...${peerId
                  .slice(peerId.length - 4, peerId.length)
                  .toLocaleLowerCase()}`}
              </span>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
