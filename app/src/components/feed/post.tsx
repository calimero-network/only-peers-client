import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { Post } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { ClientApiDataSource } from "../../api/dataSource/ClientApiDataSource";

export interface PostProps {
  post: Post;
  fetchFeed: () => void;
}

const isImageUrl = (url: string): boolean => {
  try {
    new URL(url);
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
  } catch {
    return false;
  }
};

export default function PostFeed({ post, fetchFeed }: PostProps) {
  const identityPublicKey = localStorage.getItem("identity-public-key");
  const publicKey = localStorage.getItem("public-key");
  const navigate = useNavigate();

  const handleLike = async () => {
    if (publicKey && identityPublicKey) {
      await new ClientApiDataSource().likePost({
        post_id: post.id,
        calimero_user_id: identityPublicKey,
        username: publicKey,
      });
      fetchFeed();
    }
  };

  return (
    <div className="border-t-2 border-[#1c2123]">
      <div className="rounded-lg flex flex-col cursor-pointer px-4 pt-2 pb-2 mt-1">
        <div className="flex justify-between items-center gap-2">
          <h4 className="text-white text-lg">{post.title}</h4>
          <p className="text-gray-600 text-sm font-light">
            by {post.username.slice(0, 4)}...{post.username.slice(-4)}
          </p>
        </div>
        {isImageUrl(post.content) ? (
          <img 
            src={post.content} 
            alt="Post content" 
            className="max-w-full h-auto rounded-lg my-2"
          />
        ) : (
          <div className="text-white text-sm font-light">{post.content}</div>
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
      </div>
    </div>
  );
}
