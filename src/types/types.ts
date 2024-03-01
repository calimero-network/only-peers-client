export const PEER_ID_LS = "peerId";

export interface Comment {
  text: string;
  user: string;
  };
  
export interface Post {
  id: string;
  title: string;
  content: string;
  comments: Comment[];
};
