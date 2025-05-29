import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { Post } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { ClientApiDataSource } from "../../api/dataSource/ClientApiDataSource";
import { getUsername } from "../../utils/username";
import { useState } from "react";

export interface PostProps {
  feedPost: Post;
  fetchLeaderBoard: () => void;
}

const isImageUrl = (url: string): boolean => {
  try {
    new URL(url);
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
  } catch {
    return false;
  }
};

export default function PostFeed({ feedPost, fetchLeaderBoard }: PostProps) {
  const navigate = useNavigate();
  const [post, setPost] = useState<Post>(feedPost);
  const identityPublicKey = localStorage.getItem("identity-public-key");
  const publicKey = localStorage.getItem("public-key");
  const [isLiking, setIsLiking] = useState(false);

  const handleLike = async () => {
    if (isLiking) return;
    if (!publicKey || !identityPublicKey) return;

    setIsLiking(true);
    const isLiked = post.likes.includes(identityPublicKey);
    const optimisticLikes = isLiked
      ? post.likes.filter(like => like !== identityPublicKey)
      : [...post.likes, identityPublicKey];

    setPost(prev => ({ ...prev, likes: optimisticLikes }));

    try {
      const updatedPost = await new ClientApiDataSource().likePost({
        post_id: post.id,
        calimero_user_id: identityPublicKey,
        username: publicKey,
      });

      if (updatedPost.data) {
        setPost(updatedPost.data);
      }
    } catch (error) {
      console.error("Error liking post:", error);
      setPost(prev => ({ ...prev, likes: post.likes }));
    } finally {
      setIsLiking(false);
      fetchLeaderBoard();
    }
  };

  return (
    <div className="border-t-2 border-[#1c2123]">
      <div className="rounded-lg flex flex-col cursor-pointer px-4 pt-2 pb-2 mt-1">
        <div className="flex flex-col">
          <h4 className="text-white text-lg">{post.title}</h4>
          <p className="text-gray-600 text-sm font-light text-end">
            by {getUsername(post.username)}
          </p>
        </div>
        {isImageUrl(post.content) ? (
          <div className="relative">
            <img
              src={post.content}
              alt="Post content"
              className="hidden"
              onLoad={(e) => {
                const img = e.target as HTMLImageElement;
                const container = img.parentElement;
                if (container) {
                  if (img.naturalHeight > img.naturalWidth) {
                    container.className = "relative w-full aspect-square max-h-[260px] md:max-h-[580px] bg-black/30 backdrop-blur-sm rounded-lg my-2 flex items-center justify-center";
                    img.className = "max-h-full max-w-full object-contain";
                  } else {
                    container.className = "relative";
                    img.className = "w-full rounded-lg my-2 max-h-[260px] md:max-h-[580px] object-contain";
                  }
                }
                img.style.display = "block";
              }}
              onContextMenu={(e) => e.preventDefault()}
              draggable="false"
              style={{ userSelect: "none", WebkitUserSelect: "none" }}
            />
          </div>
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
