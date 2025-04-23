import { Route, BrowserRouter, Routes } from "react-router-dom";
import { AccessTokenWrapper } from "@calimero-network/calimero-client";

import Home from "./pages/home";
import LoginPage from "./pages/login";
import FeedPage from "./pages/feed/FeedPage";
import PostPage from "./pages/post/[id]";

function App() {
  return (
    <AccessTokenWrapper>
      <BrowserRouter basename="/only-peers-client/">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/post/:id" element={<PostPage />} />
        </Routes>
      </BrowserRouter>
    </AccessTokenWrapper>
  );
}

export default App;
