import {
  setAppEndpointKey,
  SetupModal,
} from "@calimero-is-near/calimero-p2p-sdk";
import { getNodeUrl, getStorageApplicationId } from "../../utils/node";

import ContentWrapper from "../../components/common/ContentWrapper";
import { setStorageApplicationId } from "../../utils/storage";

export default function SetupPage() {

  return (
    <ContentWrapper>
      <SetupModal
        successRoute={() => console.log("success")}
        getNodeUrl={getNodeUrl}
        setNodeUrl={setAppEndpointKey}
        setApplicationId={setStorageApplicationId}
        getApplicationId={getStorageApplicationId}
      />
    </ContentWrapper>
  );
}
