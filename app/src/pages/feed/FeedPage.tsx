import { useCallback, useEffect, useState } from "react";
import { Post } from "../../types/types";

import ErrorPopup from "../../components/error/errorPopup";
import Feed from "../../components/feed/feed";
import Header from "../../components/header/header";
import Loader from "../../components/loader/loader";
import { CreatePostRequest } from "../../api/clientApi";
import { ClientApiDataSource } from "../../api/dataSource/ClientApiDataSource";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "@calimero-network/calimero-client";

export default function FeedPage() {
  const navigate = useNavigate();
  const accessToken = getAccessToken();
  const [openCreatePost, setOpenCreatePost] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    } else {
      navigate("/feed");
    }
  }, [accessToken, navigate]);

  const fetchFeed = useCallback(async () => {
    try {
      const response = await new ClientApiDataSource().fetchFeed();
      if (response.error) {
        setError(response.error.message);
        setLoading(false);
      }
      setPosts(response?.data?.slice().reverse() ?? []);
      setLoading(false);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Unknown error");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const signGetPostRequest = async () => {
      fetchFeed();
    };
    signGetPostRequest();
  }, [fetchFeed]);

  const createPost = async (title: string, content: string) => {
    setError("");
    setLoading(true);
    const createPostRequest: CreatePostRequest = {
      title,
      content,
    };
    const result = await new ClientApiDataSource().createPost(
      createPostRequest,
    );
    if (result.error) {
      setError(result.error.message);
      setLoading(false);
      setOpenCreatePost(false);
      return;
    }

    setOpenCreatePost(false);
    setLoading(false);
    fetchFeed();
  };

  return (
    <>
      <Header />
      {loading && <Loader />}
      {error && <ErrorPopup error={error} />}
      {!loading && posts && (
        <Feed
          posts={posts}
          createPost={createPost}
          openCreatePost={openCreatePost}
          setOpenCreatePost={setOpenCreatePost}
        />
      )}
    </>
  );
}
