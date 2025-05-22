import PostFeed from "./post";
import CreatePostPopup from "../post/createPostPopup";
import translations from "../../constants/en.global.json";
import Button from "../button/button";
import { Post } from "../../types/types";
import { useNavigate } from "react-router-dom";

interface FeedProps {
  posts: Post[];
  createPost: (title: string, content: string) => void;
  openCreatePost: boolean;
  setOpenCreatePost: (open: boolean) => void;
  fetchFeed: () => void;
  leaderBoard: Post[];
}

export default function Feed({
  posts,
  createPost,
  openCreatePost,
  setOpenCreatePost,
  fetchFeed,
  leaderBoard,
}: FeedProps) {
  const t = translations.feedPage;
  const navigate = useNavigate();
  return (
    <div className="flex justify-center pt-4">
      <div className="md:w-1/5" />
      <div className="px-4 md:px-0 w-full md:w-3/5">
        <div className="flex flex-col gap-4 border-b-[1px] border-[#1c2123] mb-4 pb-4">
          <h2 className="text-2xl font-bold text-white">Leaderboard</h2>
          <div className="flex flex-col gap-4">
            <div className="flex text-white gap-1 text-sm font-semibold">
              <div className="w-12">ID</div>
              <div className="w-12">Likes</div>
              <div className="flex-grow">Creator</div>
              <div className="w-16"></div>
            </div>
            {leaderBoard.map((post, id) => (
              <div key={id} className="flex text-white gap-1 items-center">
                <div className="w-12 font-bold">
                  {post.id+1}.
                </div>
                <div className="w-12">{post.likes.length}</div>
                <div className="flex-grow">
                  {post.username.substring(0, 4)}...
                  {post.username.substring(post.username.length - 4)}
                </div>
                <button 
                  onClick={() => navigate(`/post/${post.id}`)}
                  className="w-16 px-2 py-1 text-sm border border-gray-400 rounded hover:border-white cursor-pointer"
                >
                  Visit
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold text-white">{t.feedTitle}</h2>
          <Button
            title={t.createButtonText}
            onClick={() => setOpenCreatePost(true)}
            backgroundColor="border-gray-400"
            backgroundColorHover="hover:border-white"
          />
        </div>
        {posts.length === 0 ? (
          <div className="text-white text-lg border-t-2 border-[#1c2123] text-center mt-4 pt-4">
            {t.noPostsText}
          </div>
        ) : (
          <div className="flex flex-col gap-y-1">
            {posts.map((post, id) => (
              <PostFeed post={post} key={id} fetchFeed={fetchFeed} />
            ))}
          </div>
        )}
        <div className="w-1/5" />
        {openCreatePost && (
          <CreatePostPopup
            createPost={createPost}
            open={openCreatePost}
            setOpen={setOpenCreatePost}
          />
        )}
      </div>
      <div className="md:w-1/5" />
    </div>
  );
}
