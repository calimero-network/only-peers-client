import Header from "../../components/header/header";
import ExtendedPost from "../../components/post/extendedPost";
import { useCallback, useEffect, useState } from "react";
import Loader from "../../components/loader/loader";
import ErrorPopup from "../../components/error/errorPopup";
import { Post } from "../../types/types";
import {
  ClientApiDataSource,
  getWsSubscriptionsClient,
} from "../../api/dataSource/ClientApiDataSource";
import { CreateCommentRequest, PostRequest } from "../../api/clientApi";
import { useParams } from "react-router-dom";
import {
  getContextId,
  NodeEvent,
  SubscriptionsClient,
} from "@calimero-network/calimero-client";

export default function PostPage() {
  const { id } = useParams();
  const [error, setError] = useState("");
  const [post, setPost] = useState<Post | null>(null);
  const [openCreateComment, setOpenCreateComment] = useState(false);
  const postId = id ? parseInt(id as string, 10) : null;
  const [loading, setLoading] = useState(true);

  const createComment = async (text: string) => {
    const identityPublicKey = localStorage.getItem("identity-public-key");
    const publicKey = localStorage.getItem("public-key");
    const username = localStorage.getItem("username");

    if (!identityPublicKey || !publicKey) {
      setError("User not authenticated");
      return;
    }

    const commentRequest: CreateCommentRequest = {
      post_id: postId ?? 0,
      text: text,
      calimero_user_id: identityPublicKey,
      username: `${username ? `${username} -` : ""}${publicKey}`,
    };
    const result = await new ClientApiDataSource().createComment(
      commentRequest
    );
    if (result.error) {
      setError(result.error.message);
      return;
    }

    setOpenCreateComment(false);
    fetchPost(postId);
  };

  const fetchPost = useCallback(async (postId: number | null) => {
    if (postId === null) {
      return;
    }
    const postRequest: PostRequest = { id: postId };
    const result = await new ClientApiDataSource().fetchPost(postRequest);
    if (result.error) {
      setError(result.error.message);
      return;
    }
    setPost(result.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    const signGetPostRequest = async () => {
      fetchPost(postId);
    };
    signGetPostRequest();
  }, [fetchPost, postId]);

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
              await fetchPost(postId);
            } catch (error: any) {
              console.error(error.message);
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
      {!loading && post && (
        <ExtendedPost
          feedPost={post}
          openCreateComment={openCreateComment}
          setOpenCreateComment={setOpenCreateComment}
          createComment={createComment}
          fetchPost={fetchPost}
        />
      )}
    </>
  );
}
