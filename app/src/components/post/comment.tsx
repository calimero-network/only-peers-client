import { UserIcon } from '@heroicons/react/24/solid';
import { Comment } from '../../types/types';

interface CommentProps {
  commentItem: Comment;
}

export default function CommentComponent({ commentItem }: CommentProps) {
  return (
    <div className="mt-2 mb-2 flex flex-col">
      <div className="flex items-center gap-2">
        <UserIcon className="w-6 h-6 rounded-full text-white border-[1px] border-white px-1" />
        <div className="text-white">{commentItem.user}</div>
      </div>
      <div className="text-white font-light text-sm pl-4 pt-2">
        {commentItem.text}
      </div>
    </div>
  );
}
