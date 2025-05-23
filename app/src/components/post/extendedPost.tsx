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
import { useState } from "react";

interface ExtendedPostProps {
  post: Post | null;
  createComment: (content: string) => void;
  openCreateComment: boolean;
  setOpenCreateComment: (openCreateComment: boolean) => void;
  fetchPost: (postId: number | null) => Promise<void>;
}

const isImageUrl = (url: string): boolean => {
  try {
    new URL(url);
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
  } catch {
    return false;
  }
};

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
  const [copyNotification, setCopyNotification] = useState<boolean>(false);
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

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    setCopyNotification(true);
    setTimeout(() => {
      setCopyNotification(false);
    }, 2000);
  }

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
          <div
            className={`fixed top-4 right-4 transform transition-all duration-300 ease-in-out
            ${copyNotification 
              ? 'translate-x-0 opacity-100' 
              : 'translate-x-full opacity-0'
            }
            bg-green-900 text-white text-sm px-6 rounded-lg shadow-lg
            flex items-center space-x-2`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7"></path>
            </svg>
            <span className="font-medium">Copied!</span>
          </div>
          <div className="flex flex-col cursor-pointer px-4 pt-2 pb-2 mt-1 w-full md:w-3/5">
            <div className="flex flex-col">
              <h4 className="text-white text-2xl">{post.title}</h4>
              <p className="text-gray-600 text-sm font-light text-end">
                by:{" "}
                <span
                  className="text-gray-300"
                  onClick={() => copyToClipboard(post.username)}
                >
                  {post.username.slice(0, 4)}...{post.username.slice(-4)}
                </span>
              </p>
            </div>
            {isImageUrl(post.content) ? (
              <img
                src={post.content}
                alt="Post content"
                className="max-w-full h-auto rounded-lg my-2"
                onContextMenu={(e) => e.preventDefault()}
                draggable="false"
                style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
              />
            ) : (
              <div className="text-white text-sm font-light">
                {post.content}
              </div>
            )}
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
                  <CommentComponent commentItem={commentItem} onClickUser={copyToClipboard}/>
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
