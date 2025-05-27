import { UserIcon } from "@heroicons/react/24/solid";
import { Comment } from "../../types/types";
import { getUsername } from "../../utils/username";

interface CommentProps {
  commentItem: Comment;
  onClickUser: (username: string) => void;
}

export default function CommentComponent({
  commentItem,
  onClickUser,
}: CommentProps) {
  return (
    <div className="mt-2 mb-2 flex flex-col">
      <div className="flex items-center gap-2">
        <UserIcon className="w-6 h-6 rounded-full text-white border-[1px] border-white px-1" />
        <div className="text-white">
          <span onClick={() => onClickUser(commentItem.username)}>
            {getUsername(commentItem.username)}
          </span>
        </div>
      </div>
      <div className="text-white font-light text-sm pl-4 pt-2">
        {commentItem.text}
      </div>
    </div>
  );
}
