import {
  setAppEndpointKey,
  SetupModal,
} from "@calimero-is-near/calimero-p2p-sdk";
import { getNodeUrl, getStorageApplicationId } from "../../utils/node";

import ContentWrapper from "../../components/common/ContentWrapper";
import { setStorageApplicationId } from "../../utils/storage";
import { useNavigate } from "react-router-dom";

export default function SetupPage() {
  const navigate = useNavigate();
  return (
    <ContentWrapper>
      <SetupModal
        successRoute={() => navigate("/feed")}
        getNodeUrl={getNodeUrl}
        setNodeUrl={setAppEndpointKey}
        setApplicationId={setStorageApplicationId}
        getApplicationId={getStorageApplicationId}
      />
    </ContentWrapper>
  );
}
