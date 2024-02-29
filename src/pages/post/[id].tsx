import Header from "@/components/header/header";
import ExtendedPost from "@/components/post/extendedPost";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PostItem } from "@/components/feed/post";

export default function Post() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<PostItem | null>();

  useEffect(() => {
    //fetch post
  }, []);
  return (
    <div>
      <Header />
      {!post && (
        <ExtendedPost
          post={{
            id: "1",
            title: "New post title",
            content: "Hello this is new p2p post content",
            comments: [
              {
                text: "hello there too",
                user: "0x1sn3ok4asan03nas",
              },
            ],
          }}
        />
      )}
    </div>
  );
}
