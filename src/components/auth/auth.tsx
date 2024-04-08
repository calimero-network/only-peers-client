import {useEffect, useState} from "react";
import {useRouter} from "next/router.js";
import {ClientKey, getStorageClientKey, getStorageNodeAuthorized} from "src/lib/storage";

export default function WithIdAuth({children}: any) {
  const router = useRouter();

  useEffect(() => {
    const clientKey = getStorageClientKey();
    const nodeAuthorized = getStorageNodeAuthorized();
    if (!clientKey || !nodeAuthorized) {
      if (!router.pathname.startsWith("/auth")) {
        router.push("/auth");
      }
    } else if (router.pathname.startsWith("/auth")) {
      router.push("/feed");
    }
  }, [router]);

  return (
    <>{children}</>
  );
}
