import { useEffect, useState } from "react";

import translations from "../../constants/en.global.json";

import Button from "../button/button";
import {
  clientLogout,
  getAccessToken,
  getExecutorPublicKey,
} from "@calimero-network/calimero-client";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const t = translations.header;
  const navigate = useNavigate();
  const [accessToken] = useState(getAccessToken());
  const [executorPublicKey, setExecutorPublicKey] = useState<string | null>(
    null,
  );

  useEffect(() => {
    const setExecutorPk = async () => {
      const publicKey = getExecutorPublicKey();
      setExecutorPublicKey(publicKey);
    };
    if (accessToken) {
      setExecutorPk();
    }
  }, [accessToken]);

  function logout() {
    clientLogout();
    navigate("/");
  }

  return (
    <header className="border-b-2 border-[#1c2123] mx-10">
      <nav
        className="mx-auto flex items-center justify-between p-4"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a
            href="/only-peers-client/feed"
            className="-m-1.5 p-1.5 flex justify-center items-center"
          >
            <div className="text-white text-xl font-bold font-serif">
              {t.logoText}
            </div>
          </a>
        </div>
        <div className="flex flex-1 justify-end items-center gap-2">
          {executorPublicKey && (
            <div className="flex gap-4 items-center">
              <div className="text-sm font-semibold leading-6 text-white cursor-pointer">
                <span>{t.executorPk}: </span>
                <span className="text-purple-500 pl-1">
                  {`${executorPublicKey.slice(0, 4).toLocaleLowerCase()}...${executorPublicKey
                    .slice(
                      executorPublicKey.length - 4,
                      executorPublicKey.length,
                    )
                    .toLocaleLowerCase()}`}
                </span>
              </div>
              <div>
                <Button
                  title={t.logoutButtonText}
                  backgroundColor="border-gray-400"
                  backgroundColorHover="hover:border-white"
                  onClick={logout}
                />
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
