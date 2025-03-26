import { useNavigate } from "react-router-dom";
import { getAccessToken } from "@calimero-is-near/calimero-p2p-sdk";
import { useEffect } from "react";
import Loading from "../../components/common/Loader";

function Home() {
  const navigate = useNavigate();
  const accessToken = getAccessToken();

  useEffect(() => {
    if (!accessToken) {
      navigate("/setup");
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
