import { useCallback, useEffect, useState } from "react";
import { Post } from "../../types/types";

import ErrorPopup from "../../components/error/errorPopup";
import Feed from "../../components/feed/feed";
import Header from "../../components/header/header";
import Loader from "../../components/loader/loader";
import { CreatePostRequest } from "../../api/clientApi";
import {
  ClientApiDataSource,
  getWsSubscriptionsClient,
} from "../../api/dataSource/ClientApiDataSource";
import {
  getContextId,
  NodeEvent,
  SubscriptionsClient,
} from "@calimero-network/calimero-client";

export default function FeedPage() {
  const [openCreatePost, setOpenCreatePost] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

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

  const [leaderBoard, setLeaderBoard] = useState<Post[]>([]);

  const fetchLeaderBoard = useCallback(async () => {
    try {
      const response = await new ClientApiDataSource().getLeaderBoard();
      if (response.error) {
        setError(response.error.message);
        setLoading(false);
      }
      setLeaderBoard(response?.data ?? []);
      setLoading(false);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Unknown error");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const signGetPostRequest = async () => {
      fetchFeed();
      fetchLeaderBoard();
    };
    signGetPostRequest();
  }, [fetchFeed, fetchLeaderBoard]);

  const createPost = async (title: string, content: string) => {
    setError("");
    setLoading(true);
    const createPostRequest: CreatePostRequest = {
      title,
      content,
      calimero_user_id: localStorage.getItem("identity-public-key") ?? "",
      username: localStorage.getItem("public-key") ?? "",
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

  const observeNodeEvents = async () => {
    try {
      const subscriptionsClient: SubscriptionsClient =
        getWsSubscriptionsClient();
      await subscriptionsClient.connect();
      subscriptionsClient.subscribe([getContextId() ?? ""]);

      subscriptionsClient?.addCallback(async (data: NodeEvent) => {
        try {
          // @ts-expect-error - TODO
          if (data.data.newRoot && data.type === "StateMutation") {
            try {
              await fetchFeed();
              await fetchLeaderBoard();
            } catch (error: any) {
              console.error("WS: error", error);
            }
          }
        } catch (callbackError) {
          console.error("Error in subscription callback:", callbackError);
        }
      });
    } catch (error) {
      console.error("Error in node websocket:", error);
    }
  };

  useEffect(() => {
    observeNodeEvents();
  }, []);

  return (
    <>
      <Header />
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      )}
      {error && <ErrorPopup error={error} />}
      {!loading && posts && (
        <Feed
          posts={posts}
          createPost={createPost}
          openCreatePost={openCreatePost}
          setOpenCreatePost={setOpenCreatePost}
          fetchFeed={fetchFeed}
          leaderBoard={leaderBoard}
        />
      )}
    </>
  );
}
