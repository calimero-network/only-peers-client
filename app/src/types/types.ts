export interface Comment {
  text: string;
  calimero_user_id: string;
  username: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  comments: Comment[];
  likes: string[];
  calimero_user_id: string;
  username: string;
}

export interface JsonWebToken {
  context_id: string;
  token_type: string;
  exp: number;
  sub: string;
  executor_public_key: string;
}
