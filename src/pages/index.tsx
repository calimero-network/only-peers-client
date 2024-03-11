import { useEffect, useState } from "react";
import { Post } from "@/types/types";
import { GET_POSTS } from "@/graphql/queries";
import { CREATE_POST } from "@/graphql/mutations";
import { useQuery, useMutation } from "@apollo/client";

import ErrorPopup from "@/components/error/errorPopup";
import Feed from "@/components/feed/feed";
import Header from "@/components/header/header";
import Loader from "@/components/loader/loader";
import { SignedMessageObject, signMessage } from "@/crypto/crypto";

export default function Index() {
  const [queryHeaders, setQueryHeaders] = useState<SignedMessageObject>();
  const {
    loading,
    error: FetchError,
    data,
    refetch,
  } = useQuery(GET_POSTS, {
    context: {
      headers: {
        Signature: queryHeaders?.signature,
        Content: queryHeaders?.content,
      },
    },
  });
  const [openCreatePost, setOpenCreatePost] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState("");
  const [mutationHeaders, setMutationHeaders] = useState<SignedMessageObject>();

  const [createPostMutation] = useMutation(CREATE_POST, {
    context: {
      headers: {
        Signature: mutationHeaders?.signature,
        Content: mutationHeaders?.content,
      },
    },
    onCompleted: () => {
      setOpenCreatePost(false);
      refetch();
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const createPost = async (title: string, content: string) => {
    const payload = {
      variables: {
        input: {
          title,
          content,
        },
      },
    };
    const tempHeaders = await signMessage(JSON.stringify(payload));

    if (tempHeaders) {
      setMutationHeaders(tempHeaders);

      createPostMutation(payload);
    }
  };

  useEffect(() => {
    const signGetPostRequest = async () => {
      const headers: SignedMessageObject | null = await signMessage(
        JSON.stringify(GET_POSTS)
      );
      if (headers) {
        setQueryHeaders(headers);
      }
    };
    signGetPostRequest();
  }, []);

  useEffect(() => {
    if (!loading && data) {
      const reversedPosts = data.posts.slice().reverse();
      setPosts(reversedPosts);
    }
    if (FetchError) {
      setError(FetchError.message);
    }
  }, [data, loading, FetchError]);

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
