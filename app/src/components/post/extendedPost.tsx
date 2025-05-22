import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { Post } from "../../types/types";
import CommentComponent from "./comment";
import CreateCommentPopup from "./createCommentPopup";
import translations from "../../constants/en.global.json";
import Button from "../button/button";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { ClientApiDataSource } from "../../api/dataSource/ClientApiDataSource";

interface ExtendedPostProps {
  post: Post | null;
  createComment: (content: string) => void;
  openCreateComment: boolean;
  setOpenCreateComment: (openCreateComment: boolean) => void;
  fetchPost: (postId: number | null) => Promise<void>;
}

export default function ExtendedPost({
  post,
  createComment,
  openCreateComment,
  setOpenCreateComment,
  fetchPost,
}: ExtendedPostProps) {
  const t = translations.extendedPost;
  const identityPublicKey = localStorage.getItem("identity-public-key");
  const publicKey = localStorage.getItem("public-key");
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/feed");
  };

  const handleLike = async () => {
    if (publicKey && identityPublicKey && post?.id) {
      await new ClientApiDataSource().likePost({
        post_id: post.id,
        calimero_user_id: identityPublicKey,
        username: publicKey,
      });
      await fetchPost(post.id);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex justify-start items-center gap-2 w-full px-4 md:px-20 mt-2 cursor-pointer">
        <div
          className="flex gap-2 items-center justify-start"
          onClick={handleBack}
        >
          {" "}
          <ArrowLeftIcon className="h-7 w-5 text-white" />
          <div className="text-white text-md font-light">Back</div>
        </div>
      </div>
      {post && (
        <>
          <div className="w-full md:w-1/5" />
          <div className="flex flex-col cursor-pointer px-4 pt-2 pb-2 mt-1 w-full md:w-3/5">
            <div className="flex items-center justify-between">
              <h4 className="text-white text-2xl">{post.title}</h4>
              <p className="text-gray-600 text-sm font-light">
                by {post.username.slice(0, 4)}...{post.username.slice(-4)}
              </p>
            </div>
            <div className="text-gray-300 text-sm font-light mt-4">
              {post.content}
            </div>
            <div className="flex gap-2 mt-2">
              {" "}
              <div
                className="flex items-center gap-1 bg-[#142f37] rounded-2xl w-fit px-4 mt-2"
                onClick={() => handleLike()}
              >
                {identityPublicKey && post.likes.includes(identityPublicKey) ? (
                  <HeartIcon className="h-7 w-5 text-white" />
                ) : (
                  <HeartIconOutline className="h-7 w-5 text-white" />
                )}
                <span className="text-white text-md font-light">
                  {post.likes.length}
                </span>
              </div>
              <div
                className="flex items-center gap-1 bg-[#142f37] rounded-2xl w-fit px-4 mt-2"
                onClick={() => navigate(`/post/${post.id}`)}
              >
                <ChatBubbleLeftIcon className="h-7 w-5 text-white" />
                <span className="text-white text-md font-light">
                  {post.comments.length}
                </span>
              </div>
            </div>
            <div className="mt-8">
              <Button
                title={t.addButtonText}
                onClick={() => setOpenCreateComment(true)}
                backgroundColor="border-gray-400"
                backgroundColorHover="hover:border-white"
              />
            </div>
            <div className="mt-4">
              {post.comments.map((commentItem, id) => (
                <div key={id}>
                  <CommentComponent commentItem={commentItem} />
                </div>
              ))}
            </div>
          </div>
          <div className="w-1/5" />
          {openCreateComment && (
            <CreateCommentPopup
              createComment={createComment}
              open={openCreateComment}
              setOpen={setOpenCreateComment}
            />
          )}
        </>
      )}
    </div>
  );
}
