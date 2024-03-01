import Header from "@/components/header/header";
import ExtendedPost from "@/components/post/extendedPost";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GET_POST } from "@/graphql/queries";
import Loader from "@/components/loader/loader";
import ErrorPopup from "@/components/error/errorPopup";
import { useQuery, useMutation } from "@apollo/client";
import { CREATE_COMMENT } from "@/graphql/mutations";
import { PEER_ID_LS, Post } from "@/types/types";

export default function Post() {
  const router = useRouter();
  const { id } = router.query;
  const [error, setError] = useState("");
  const [post, setPost] = useState<Post | null>(null);
  const [openCreateComment, setOpenCreateComment] = useState(false);
  const postId = id ? parseInt(id as string, 10) : null;
  const {
    loading,
    error: FetchError,
    data,
    refetch,
  } = useQuery(GET_POST, {
    variables: { id: postId },
  });
  const [createCommentMutation] = useMutation(CREATE_COMMENT, {
    onCompleted: () => {
      setOpenCreateComment(false);
      refetch();
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const createComment = (text: string) => {
    const user = localStorage.getItem(PEER_ID_LS);
    createCommentMutation({
      variables: {
        input: {
          post: postId,
          text: text,
          user: user,
        },
      },
    });
  };

  useEffect(() => {
    if (id && !loading && data && data.post) {
      setPost(data.post);
    }
    if (FetchError) {
      setError(FetchError?.message);
    }
  }, [id, data, loading, FetchError]);

  return (
    <>
      <Header />
      {loading && <Loader />}
      {error && <ErrorPopup error={error} />}
      {!loading && data && (
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
