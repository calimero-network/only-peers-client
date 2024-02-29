import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { PostProps } from "../feed/post";
import Comment from "./comment";
import { useState } from "react";
import CreateCommentPopup from "./createCommentPopup";

export default function ExtendedPost({ post }: PostProps) {
  const [openCreateComment, setOpenCreateComment] = useState(false);
  const createComment = () => {
    console.log("comment created");
  };
  return (
    <div className="flex justify-center w-full">
      <div className="w-1/5" />
      <div className="flex flex-col cursor-pointer px-4 pt-2 pb-2 mt-1 w-3/5">
        <h4 className="text-white text-2xl">{post.title}</h4>
        <text className="text-gray-300 text-sm font-light mt-4">
          {post.content}
        </text>
        <div className="flex items-center gap-1 bg-[#142f37] rounded-2xl w-fit px-4 mt-6">
          <ChatBubbleLeftIcon className="h-7 w-5 text-white" />
          <span className="text-white text-md font-light">
            {post.comments.length}
          </span>
        </div>
        <div
          className="border-[1px] border-gray-400 hover:border-white rounded-lg w-fit 
          px-4 py-2 text-white cusor-pointer font-light cursor-pointer text-sm mt-10"
          onClick={() => setOpenCreateComment(true)}
        >
          Add a comment
        </div>
        <div className="mt-4">
          {post.comments.map((commentItem, id) => (
            <div key={id}>
              <Comment commentItem={commentItem} />
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
    </div>
  );
}
