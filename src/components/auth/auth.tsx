import { getStoragePeerId } from "@/lib/storage";
import { useEffect, useState } from "react";
import Login from "../login/Login";
import bs58 from "bs58";
import PeerId from "peer-id";
import { setStoragePeerId, setStoragePublicKey } from "@/lib/storage";

export default function WithIdAuth({ children }: any) {
  const [peerId, setPeerId] = useState(getStoragePeerId());
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [keyError, setKeyError] = useState(false);

  useEffect(() => {
    if (peerId) {
      setIsLoggedIn(true);
    }
  }, [peerId]);

  const generateAndSaveKey = async (privateKey: string) => {
    setKeyError(false);
    try {
      const decodedKey = new Uint8Array(bs58.decode(privateKey));
      const identity = (await PeerId.createFromPrivKey(decodedKey)).toJSON();
      setStoragePeerId(identity.id);
      setStoragePublicKey(identity.pubKey ?? "");
      setPeerId(identity.id);
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
