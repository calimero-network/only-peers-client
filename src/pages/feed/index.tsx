import { useCallback, useEffect, useState } from "react";
import { Post } from "../../types/types";

import ErrorPopup from "../../components/error/errorPopup";
import Feed from "../../components/feed/feed";
import Header from "../../components/header/header";
import Loader from "../../components/loader/loader";
import { CreatePostRequest, QueryPostsRequest } from "src/api/clientApi";
import { ClientApiDataSource, getJsonRpcClient } from "src/api/dataSource/ClientApiDataSource";

export default function FeedPage() {
  const [openCreatePost, setOpenCreatePost] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchFeed = useCallback(async (request: QueryPostsRequest) => {
    const response = await new ClientApiDataSource().queryPosts(request);
    if (response.error) {
      setError(response.error.message);
    }
    setPosts(response.data.slice().reverse());
    setLoading(false);
  }, []);

  useEffect(() => {
    const signGetPostRequest = async () => {
      const feedRequest: QueryPostsRequest = {};
      fetchFeed({ feedRequest });
    };
    signGetPostRequest();
  }, [fetchFeed]);

  const createPost = async (title: string, content: string) => {
    const createPostRequest: CreatePostRequest = {
      title,
      content,
    };
    const result = await new ClientApiDataSource().createPost(createPostRequest);
    if (result.error) {
      setError(result.error.message);
      return;
    }

    setOpenCreatePost(false);

    //TODO solve pagination
    const feedRequest: QueryPostsRequest = {};
    fetchFeed({ feedRequest });
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
