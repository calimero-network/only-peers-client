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

export interface JsonWebToken {
  context_id: string;
  token_type: string;
  exp: number;
  sub: string;
  executor_public_key: string;
}
