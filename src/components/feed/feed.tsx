import { useState } from "react";
import PostFeed, { PostItem } from "./post";
import CreatePostPopup from "../post/createPostPopup";

const posts: PostItem[] = [
  {
    id: "1",
    title: "New post title",
    content: "Hello this is new p2p post content",
    comments: [
      {
        text: "hello there too",
        user: "0x1sn3ok4asan03nas",
      },
    ],
  },
  {
    id: "2",
    title: "New post title",
    content: "Hello this is new p2p post content",
    comments: [
      {
        text: "hello there too",
        user: "0x1sn3ok4asan03nas",
      },
    ],
  },
  {
    id: "3",
    title: "New post title",
    content: "Hello this is new p2p post content",
    comments: [
      {
        text: "hello there too",
        user: "0x1sn3ok4asan03nas",
      },
    ],
  },
  {
    id: "4",
    title: "New post title",
    content: "Hello this is new p2p post content",
    comments: [
      {
        text: "hello there too",
        user: "0x1sn3ok4asan03nas",
      },
    ],
  },
];

export default function Feed() {
  const [openCreatePost, setOpenCreatePost] = useState(false);
  const createPost = () => {
    console.log("Post created");
  };
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
        <div className="flex flex-col gap-y-1">
          {posts.map((post, id) => (
            <PostFeed post={post} key={id} />
          ))}
        </div>
      </div>
      <div className="w-1/5" />
      {openCreatePost && (
        <CreatePostPopup
          createPost={createPost}
          open={openCreatePost}
          setOpen={setOpenCreatePost}
        />
      )}
    </div>
  );
}
