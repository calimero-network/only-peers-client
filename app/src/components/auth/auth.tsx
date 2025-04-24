import { useEffect } from "react";
import {
  getAccessToken,
  getAppEndpointKey,
  getApplicationId,
  getRefreshToken,
} from "@calimero-network/calimero-client";
import { useLocation, useNavigate } from "react-router-dom";

interface AuthProps {
  children: React.ReactNode;
}

export default function WithIdAuth({ children }: AuthProps) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const url = getAppEndpointKey();
    const applicationId = getApplicationId();
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();

    if (!url || !applicationId) {
      if (!location.pathname.startsWith("/login")) {
        navigate("/login");
      }
    } else if (!accessToken || !refreshToken) {
      if (!location.pathname.startsWith("/auth")) {
        navigate("/auth");
      }
    } else if (location.pathname.startsWith("/auth")) {
      navigate("/feed");
    }
  }, [navigate]);

  return <>{children}</>;
}
