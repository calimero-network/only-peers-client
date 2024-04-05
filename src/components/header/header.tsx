import {useEffect, useState} from "react";

import Link from "next/link";
import translations from "../../constants/en.global.json";
import {useRouter} from "next/router";
import {getPeerId} from "src/lib/peerId";
import {getStorageClientKey, clearClientKey, clearNodeAuthorized} from "src/lib/storage";
import Button from "../button/button";

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
            <svg
              viewBox="-20.62 0.53 820.42 555.49"
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="36"
            >
              <path
                d="M266.82.53c35 0 69.65 6.91 101.98 20.34s61.71 33.11 86.45 57.93c24.75 24.81 44.37 54.27 57.77 86.7a267.919 267.919 0 0 1 20.29 102.27c0 108.09-64.93 205.53-164.51 246.89s-214.2 18.5-290.41-57.93C2.18 380.3-20.62 265.36 20.62 165.5 61.87 65.64 159.04.53 266.82.53zm0 347.4c10.5.01 20.9-2.05 30.61-6.07s18.52-9.93 25.95-17.38 13.31-16.29 17.33-26.02a80.365 80.365 0 0 0 6.06-30.7c0-32.43-19.48-61.66-49.35-74.07s-64.26-5.55-87.12 17.38-29.7 57.41-17.33 87.37 41.53 49.49 73.86 49.49z"
                fill="#ECB159"
              />
              <path
                d="M566.35 200.96c67.71 19.54 147.63 0 147.63 0-23.19 101.55-96.75 165.15-202.81 172.89a266.766 266.766 0 0 1-40.48 65.86 266.208 266.208 0 0 1-57.62 51.43c-21.6 14.24-45.15 25.25-69.92 32.68s-50.48 11.19-76.33 11.18l79.95-254.81C428.95 18.28 471.08.54 665.98.54H799.8c-22.38 98.88-99.54 174.41-233.44 200.42z"
                fill="#B67352"
              />
            </svg>
            <div className="text-white text-xl font-bold font-serif">
              {t.logoText}
            </div>
          </Link>
        </div>
        <div className="flex flex-1 justify-end items-center gap-2">
          {peerId && (
            <div className="text-sm font-semibold leading-6 text-white cursor-pointer">
              {t.peerIdText}:{" "}
              <span
                className="text-purple-500 pl-1"
              >
                {`${ peerId.slice(0, 4).toLocaleLowerCase() }...${ peerId
                  .slice(peerId.length - 4, peerId.length)
                  .toLocaleLowerCase() }`}
              </span>
            </div>
          )}
          {getStorageClientKey() && (
            <Button
              title={"LogOut"}
              onClick={logout}
              backgroundColor={""}
              backgroundColorHover={""} />
          )}
        </div>
      </nav>
    </header>
  );
}
