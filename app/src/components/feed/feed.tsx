import PostFeed from './post';
import CreatePostPopup from '../post/createPostPopup';
import translations from '../../constants/en.global.json';
import Button from '../button/button';
import { Post } from '../../types/types';

interface FeedProps {
  posts: Post[];
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
  const t = translations.feedPage;
  return (
    <div className="flex justify-center pt-4">
      <div className="w-1/5" />
      <div className="w-3/5">
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
