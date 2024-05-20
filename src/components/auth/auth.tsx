import { useEffect, useState } from "react";
import { useRouter } from "next/router.js";
import {
  getAppEndpointKey,
  getStorageClientKey,
  getStorageNodeAuthorized,
} from "src/lib/storage";

export default function WithIdAuth({ children }: any) {
  const router = useRouter();

  useEffect(() => {
    const clientKey = getStorageClientKey();
    const nodeAuthorized = getStorageNodeAuthorized();
    const url = getAppEndpointKey();

    if (!url) {
      if (!router.pathname.startsWith("/setup")) {
        router.push("/setup");
      }
    } else if (!clientKey || !nodeAuthorized) {
      if (!router.pathname.startsWith("/auth")) {
        router.push("/auth");
      }
    } else if (router.pathname.startsWith("/auth")) {
      router.push("/feed");
    }
  }, [router]);

  return <>{children}</>;
}
