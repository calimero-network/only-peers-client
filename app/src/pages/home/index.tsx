import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import {
  setAppEndpointKey,
  setApplicationId,
  setContextId,
  setExecutorPublicKey,
} from "@calimero-network/calimero-client";

import Loading from "../../components/common/Loader";

function Home() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if items are already set in localStorage
    const params = new URLSearchParams(location.search);
    const existingPublicKey = localStorage.getItem("public-key");
    const existingIdentityPublicKey = localStorage.getItem(
      "identity-public-key",
    );
    const existingNodeUrl = localStorage.getItem("node-url");
    const reloadCreds = params.get("reload-creds");

    // If all items are already set, navigate to feed directly
    if (
      existingPublicKey &&
      existingIdentityPublicKey &&
      existingNodeUrl &&
      (reloadCreds === "false" || reloadCreds === null)
    ) {
      navigate("/feed");
      return;
    }

    const publicKey = params.get("publicKey");
    const identityPublicKey = params.get("identityPublicKey");
    const nodeUrl = params.get("nodeUrl");
    const callbackUrl = params.get("callbackUrl");
    const username = params.get("username");
    
    if (username) {
      localStorage.setItem("username", username);
    }

    if (publicKey && identityPublicKey && nodeUrl) {
      localStorage.setItem("public-key", publicKey);
      localStorage.setItem("identity-public-key", identityPublicKey);
      localStorage.setItem("node-url", nodeUrl);
      const applicationId = import.meta.env.VITE_APPLICATION_ID;
      const contextId = import.meta.env.VITE_CONTEXT_ID;
      setApplicationId(applicationId);
      setContextId(contextId);
      setAppEndpointKey(nodeUrl);
      setExecutorPublicKey(identityPublicKey);
      navigate("/feed");
    } else if (callbackUrl) {
      const currentUrl = window.location.href;
      const encodedUrl = encodeURIComponent(currentUrl);
      window.location.href = `${callbackUrl}?redirect=${encodedUrl}`;
    } else {
      window.alert(
        "There is error with application, please return to applications dashboard and try again.",
      );
    }
  }, [location.search, navigate]);

  return (
    <>
      <Loading />
    </>
  );
}

export default Home;
