import { useState } from "react";
import PostFeed, { PostItem } from "./post";
import CreatePostPopup from "../post/createPostPopup";

interface FeedProps {
  posts: PostItem[];
  createPost: (title: string, content: string) => void;
  openCreatePost: boolean;
  setOpenCreatePost: (open: boolean) => void;
}

export default function Feed({
  posts,
  createPost,
  openCreatePost,
  setOpenCreatePost,
}: FeedProps) {
  return (
    <div className="flex justify-center pt-4">
      <div className="w-1/5" />
      <div className="w-3/5">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold text-white">Posts</h2>
          <div
            className="border-[1px] border-gray-400 hover:border-white rounded-md w-fit 
                      px-4 text-white cusor-pointer font-light cursor-pointer text-sm"
            onClick={() => setOpenCreatePost(true)}
          >
            Create a post
          </div>
        </div>
        {posts.length == 0 ? (
          <div className="text-white text-lg border-t-2 border-[#1c2123] text-center mt-4 pt-4">
            No posts yet
          </div>
        ) : (
          <div className="flex flex-col gap-y-1">
            {posts.map((post, id) => (
              <PostFeed post={post} key={id} />
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
      <div className="w-1/5" />
    </div>
  );
}
