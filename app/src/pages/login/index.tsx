import { useNavigate } from "react-router-dom";
import { ClientLogin } from "@calimero-network/calimero-client";

import ContentWrapper from "../../components/common/ContentWrapper";

export default function LoginPage() {
  const navigate = useNavigate();
  return (
    <ContentWrapper>
      <ClientLogin successRedirect={() => navigate("/feed")} />
    </ContentWrapper>
  );
}
