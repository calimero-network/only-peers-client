import { Route, BrowserRouter, Routes } from "react-router-dom";

import Home from "./pages/home";
import FeedPage from "./pages/feed/FeedPage";
import PostPage from "./pages/post/[id]";

function App() {
  return (
    <BrowserRouter basename="/only-peers-client/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/post/:id" element={<PostPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
