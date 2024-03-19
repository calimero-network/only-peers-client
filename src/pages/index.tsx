import {useEffect, useState} from "react";
import {Post} from "@/types/types";
import {GET_POSTS} from "@/graphql/queries";
import {CREATE_POST} from "@/graphql/mutations";
import {useMutation, useLazyQuery} from "@apollo/client";

import ErrorPopup from "@/components/error/errorPopup";
import Feed from "@/components/feed/feed";
import Header from "@/components/header/header";
import Loader from "@/components/loader/loader";
import {SignedMessageObject, signMessage} from "@/crypto/crypto";

export default function Index() {
  const [getPosts, {loading, error: FetchError, data, refetch}] =
    useLazyQuery(GET_POSTS);

  useEffect(() => {
    const signGetPostRequest = async () => {
      const headers: SignedMessageObject | null = await signMessage(
        JSON.stringify(GET_POSTS)
      );
      if (headers) {
        getPosts({
          context: {
            headers: {
              Signature: headers.signature,
              Challenge: headers.challenge,
            },
          },
        });
      }
    };
    signGetPostRequest();
  }, []);

  const [openCreatePost, setOpenCreatePost] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState("");

  const [createPostMutation] = useMutation(CREATE_POST, {
    context: {},
    onCompleted: () => {
      setOpenCreatePost(false);
      refetch();
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const createPost = async (title: string, content: string) => {
    let payload = {
      variables: {
        input: {
          title,
          content,
        },
      },
      context: {},
    };
    const mutationHeaders = await signMessage(JSON.stringify(payload));

    if (mutationHeaders) {
      payload["context"] = {
        headers: {
          Signature: mutationHeaders.signature,
          Challenge: mutationHeaders.challenge,
        },
      };
      createPostMutation(payload);
    }
  };

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
