import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

export interface Comment {
  text: string;
  user: string;
}

export interface PostItem {
  id: string;
  title: string;
  content: string;
  comments: Comment[];
}

export interface PostProps {
  post: PostItem;
}

export default function PostFeed({ post }: PostProps) {
  const router = useRouter();
  return (
    <div className="border-t-2 border-[#1c2123]">
      <div
        className="rounded-lg hover:bg-[rgba(144,155,158,0.09)] flex flex-col cursor-pointer px-4 pt-2 pb-2 mt-1"
        onClick={() => router.push(`/post/${post.id}`)}
      >
        <h4 className="text-white text-lg">{post.title}</h4>
        <text className="text-white text-sm font-light">{post.content}</text>
        <div className="flex items-center gap-1 bg-[#142f37] rounded-2xl w-fit px-4 mt-2">
          <ChatBubbleLeftIcon className="h-7 w-5 text-white" />
          <span className="text-white text-md font-light">
            {post.comments.length}
          </span>
        </div>
      </div>
    </div>
  );
}
