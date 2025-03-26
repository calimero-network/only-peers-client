import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./pages/home";
import SetupPage from "./pages/setup";
import { getNodeUrl } from "./utils/node";
import { AccessTokenWrapper } from "@calimero-is-near/calimero-p2p-sdk";

function App() {
  return (
    <AccessTokenWrapper getNodeUrl={getNodeUrl}>
      <BrowserRouter basename="/only-peers-client/">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/setup" element={<SetupPage />} />
        </Routes>
      </BrowserRouter>
    </AccessTokenWrapper>
  );
}

export default App;
