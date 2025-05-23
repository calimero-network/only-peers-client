import { ApiResponse } from "@calimero-network/calimero-client";
import { Comment, Post } from "../types/types";

export type LeaderBoardRequest = object;

export interface PostRequest {
  id: number;
}

export interface CreatePostRequest {
  title: string;
  content: string;
  calimero_user_id: string;
  username: string;
}

export interface CreateCommentRequest {
  post_id: number;
  calimero_user_id: string;
  username: string;
  text: string;
}

export enum ClientMethod {
  CREATE_COMMENT = "create_comment",
  POST = "post",
  CREATE_POST = "create_post",
  POSTS = "posts",
  LIKE_POST = "like_post",
  GET_LEADERBOARD = "get_leaderboard",
}

export interface LikePostRequest {
  post_id: number;
  calimero_user_id: string;
  username: string;
}

export interface ClientApi {
  fetchFeed(): ApiResponse<Post[]>;
  fetchPost(params: PostRequest): ApiResponse<Post>;
  createPost(params: CreatePostRequest): ApiResponse<Post>;
  createComment(params: CreateCommentRequest): ApiResponse<Comment>;
  likePost(params: LikePostRequest): ApiResponse<Post>;
  getLeaderBoard(): ApiResponse<Post[]>;
}
