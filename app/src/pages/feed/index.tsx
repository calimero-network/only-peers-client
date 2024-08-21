import { useEffect, useState } from 'react';
import { Post } from '../../types/types';

import ErrorPopup from '../../components/error/errorPopup';
import Feed from '../../components/feed/feed';
import Header from '../../components/header/header';
import Loader from '../../components/loader/loader';
import { CreatePostRequest, FeedRequest } from '../../api/clientApi';
import { ClientApiDataSource } from '../../api/dataSource/ClientApiDataSource';
import apiClient from '../../api';

export default function FeedPage() {
  const [openCreatePost, setOpenCreatePost] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchFeed = async (request: FeedRequest) => {
    await apiClient
      .node()
      .getContext()
      .then(async (response) => {
        if (response.error) {
          setError(response.error.message);
          setLoading(false);
          return;
        } else {
          const response = await new ClientApiDataSource().fetchFeed(request);
          if (response.error) {
            setError(response.error.message);
            setLoading(false);
            return;
          }
          setPosts(response.data.slice().reverse());
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    const signGetPostRequest = async () => {
      const feedRequest: FeedRequest = {};
      fetchFeed({ feedRequest });
    };
    signGetPostRequest();
  }, []);

  const createPost = async (title: string, content: string) => {
    const createPostRequest: CreatePostRequest = {
      title,
      content,
    };
    const result = await new ClientApiDataSource().createPost(
      createPostRequest,
    );
    if (result.error) {
      setError(result.error.message);
      return;
    }

    setOpenCreatePost(false);

    //TODO solve pagination
    const feedRequest: FeedRequest = {};
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
