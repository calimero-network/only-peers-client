import { useEffect, useState } from "react";
import { PostItem } from "@/components/feed/post";
import { GET_POSTS } from "@/graphql/queries";
import { CREATE_POST } from "@/graphql/mutations";

import ErrorPopup from "@/components/error/errorPopup";
import Feed from "@/components/feed/feed";
import Header from "@/components/header/header";
import Loader from "@/components/loader/loader";

import { useQuery, useMutation } from "@apollo/client";

export default function Index() {
  const { loading, error: FetchError, data, refetch } = useQuery(GET_POSTS);
  const [openCreatePost, setOpenCreatePost] = useState(false);
  const [posts, setPosts] = useState<PostItem[]>([]);
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

  useEffect(() => {
    if (!loading && data) {
      const reversedPosts = data.posts.slice().reverse();
      setPosts(reversedPosts);
    }
    if (FetchError) {
      setError(FetchError.message);
    }
  }, [data, loading, FetchError]);

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

  return (
    <>
      <Header />
      {loading && <Loader />}
      {error && <ErrorPopup error={error} />}
      {!loading && data && (
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
