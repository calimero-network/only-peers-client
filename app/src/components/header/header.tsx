import { useEffect, useState } from 'react';

import Link from 'next/link';
import translations from '../../constants/en.global.json';
import { useRouter } from 'next/router';
import {
  clearAppEndpoint,
  getJWTObject,
  clearJWT,
  clearApplicationId,
} from '../../utils/storage';
import { getAccessToken } from '@calimero-is-near/calimero-p2p-sdk';
import Button from '../button/button';

export default function Header() {
  const t = translations.header;
  const router = useRouter();
  const [accessToken] = useState(getAccessToken());
  const [executorPublicKey, setExecutorPublicKey] = useState('');

  useEffect(() => {
    const setExecutorPk = async () => {
      let publicKey = getJWTObject()?.executor_public_key;
      setExecutorPublicKey(publicKey);
    };
    if (accessToken) {
      setExecutorPk();
    }
  }, [accessToken]);

  function logout() {
    clearAppEndpoint();
    clearJWT();
    clearApplicationId();
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
