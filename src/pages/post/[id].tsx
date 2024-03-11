import Header from "@/components/header/header";
import ExtendedPost from "@/components/post/extendedPost";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GET_POST } from "@/graphql/queries";
import Loader from "@/components/loader/loader";
import ErrorPopup from "@/components/error/errorPopup";
import { useQuery, useMutation } from "@apollo/client";
import { CREATE_COMMENT } from "@/graphql/mutations";
import { Post } from "@/types/types";
import { SignedMessageObject, signMessage } from "@/crypto/crypto";
import { getPeerId } from "@/lib/peerId";

export default function Post() {
  const router = useRouter();
  const { id } = router.query;
  const [error, setError] = useState("");
  const [post, setPost] = useState<Post | null>(null);
  const [openCreateComment, setOpenCreateComment] = useState(false);
  const [queryHeaders, setQueryHeaders] = useState<SignedMessageObject>();
  const postId = id ? parseInt(id as string, 10) : null;
  const {
    loading,
    error: FetchError,
    data,
    refetch,
  } = useQuery(GET_POST, {
    variables: { id: postId },
    context: {
      headers: {
        Signature: queryHeaders?.signature,
        Content: queryHeaders?.content,
      },
    },
  });
  const [mutationHeaders, setMutationHeaders] = useState<SignedMessageObject>();
  const [createCommentMutation] = useMutation(CREATE_COMMENT, {
    context: {
      headers: {
        Signature: mutationHeaders?.signature,
        Content: mutationHeaders?.content,
      },
    },
    onCompleted: () => {
      setOpenCreateComment(false);
      refetch();
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const createComment = async (text: string) => {
    const user = getPeerId();
    const payload = {
      variables: {
        input: {
          postId,
          text,
          user,
        },
      },
    };

    const tempHeaders = await signMessage(JSON.stringify(payload));

    if (tempHeaders) {
      setMutationHeaders(tempHeaders);

      createCommentMutation(payload);
    }
  };

  useEffect(() => {
    const signGetPostRequest = async () => {
      const headers: SignedMessageObject | null = await signMessage(
        JSON.stringify(GET_POST)
      );
      if (headers) {
        setQueryHeaders(headers);
      }
    };
    signGetPostRequest();
  }, []);

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
