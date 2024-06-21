import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { Post } from '../../types/types';
import CommentComponent from './comment';
import CreateCommentPopup from './createCommentPopup';
import translations from '../../constants/en.global.json';
import Button from '../button/button';

interface ExtendedPostProps {
  post: Post | null;
  createComment: (content: string) => void;
  openCreateComment: boolean;
  setOpenCreateComment: (openCreateComment: boolean) => void;
}

export default function ExtendedPost({
  post,
  createComment,
  openCreateComment,
  setOpenCreateComment,
}: ExtendedPostProps) {
  const t = translations.extendedPost;
  return (
    <div className="flex justify-center w-full">
      {post && (
        <>
          <div className="w-1/5" />
          <div className="flex flex-col cursor-pointer px-4 pt-2 pb-2 mt-1 w-3/5">
            <h4 className="text-white text-2xl">{post.title}</h4>
            <div className="text-gray-300 text-sm font-light mt-4">
              {post.content}
            </div>
            <div className="flex items-center gap-1 bg-[#142f37] rounded-2xl w-fit px-4 mt-6">
              <ChatBubbleLeftIcon className="h-7 w-5 text-white" />
              <span className="text-white text-md font-light">
                {post.comments.length}
              </span>
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
                  <CommentComponent commentItem={commentItem} />
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
