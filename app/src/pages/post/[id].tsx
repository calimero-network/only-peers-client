import Header from '../../components/header/header';
import ExtendedPost from '../../components/post/extendedPost';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import Loader from '../../components/loader/loader';
import ErrorPopup from '../../components/error/errorPopup';
import { Post } from '../../types/types';
import { ClientApiDataSource } from '../../api/dataSource/ClientApiDataSource';
import { CreateCommentRequest, PostRequest } from '../../api/clientApi';
import { getJWTObject } from '../../utils/storage';

export default function PostPage() {
  const router = useRouter();
  const { id } = router.query;
  const [error, setError] = useState('');
  const [post, setPost] = useState<Post | null>(null);
  const [openCreateComment, setOpenCreateComment] = useState(false);
  const postId = id ? parseInt(id as string, 10) : null;
  const [loading, setLoading] = useState(true);

  const createComment = async (text: string) => {
    const jwt = getJWTObject();
    const commentRequest: CreateCommentRequest = {
      post_id: postId,
      text: text,
      user: jwt.executor_public_key,
    };
    const result = await new ClientApiDataSource().createComment(
      commentRequest,
    );
    if (result.error) {
      setError(result.error.message);
      return;
    }

    setOpenCreateComment(false);
    // TODO implement pagination
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

  return (
    <>
      <Header />
      {loading && <Loader />}
      {error && <ErrorPopup error={error} />}
      {!loading && post && (
        <ExtendedPost
          post={post}
          openCreateComment={openCreateComment}
          setOpenCreateComment={setOpenCreateComment}
          createComment={createComment}
        />
      )}
    </>
  );
}
