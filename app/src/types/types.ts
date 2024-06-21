export interface Comment {
  text: string;
  user: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  comments: Comment[];
}
