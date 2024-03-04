import { useEffect, useState } from "react";
import { Post } from "@/types/types";
import { GET_POSTS } from "@/graphql/queries";
import { CREATE_POST } from "@/graphql/mutations";
import { useQuery, useMutation } from "@apollo/client";

import ErrorPopup from "@/components/error/errorPopup";
import Feed from "@/components/feed/feed";
import Header from "@/components/header/header";
import Loader from "@/components/loader/loader";

export default function Index() {
  const { loading, error: FetchError, data, refetch } = useQuery(GET_POSTS);
  const [openCreatePost, setOpenCreatePost] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState("");

  const [createPostMutation] = useMutation(CREATE_POST, {
    onCompleted: () => {
      setOpenCreatePost(false);
      refetch();
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const createPost = (title: string, content: string) => {
    createPostMutation({
      variables: {
        input: {
          title,
          content,
        },
      },
    });
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
