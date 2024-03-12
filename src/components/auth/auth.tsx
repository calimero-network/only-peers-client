import { getStoragePrivateKey, setStoragePrivateKey } from "@/lib/storage";
import { useEffect, useState } from "react";
import Login from "../login/Login";
import bs58 from "bs58";
import { unmarshalPrivateKey } from "@libp2p/crypto/keys";

export default function WithIdAuth({ children }: any) {
  const [privateKey, setPrivateKey] = useState(getStoragePrivateKey());
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [keyError, setKeyError] = useState(false);

  useEffect(() => {
    if (privateKey) {
      setIsLoggedIn(true);
    }
  }, [privateKey]);

  const generateAndSaveKey = async (encodedPrivateKey: string) => {
    setKeyError(false);
    try {
      const decodedKey = new Uint8Array(bs58.decode(encodedPrivateKey));
      // key validation
      (await unmarshalPrivateKey(decodedKey)).bytes;
      setStoragePrivateKey(decodedKey);
      setPrivateKey(decodedKey);
    } catch (error) {
      console.error(error);
      setKeyError(true);
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <>{children}</>
      ) : (
        <Login generateAndSaveKey={generateAndSaveKey} keyError={keyError} />
      )}
    </>
  );
}
