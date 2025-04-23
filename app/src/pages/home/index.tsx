import { useNavigate } from "react-router-dom";
import { getAccessToken } from "@calimero-network/calimero-client";
import { useEffect } from "react";
import Loading from "../../components/common/Loader";

function Home() {
  const navigate = useNavigate();
  const accessToken = getAccessToken();

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    } else {
      navigate("/feed");
    }
  }, [accessToken, navigate]);

  return (
    <>
      <Loading />
    </>
  );
}

export default Home;
