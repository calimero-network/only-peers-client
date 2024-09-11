import { Comment, Post } from '../types/types';
import { ApiResponse } from './response';

export interface FeedRequest {
  // ignore
}

export interface PostRequest {
  id: number;
}

export interface CreatePostRequest {
  title: string;
  content: string;
}

export interface CreateCommentRequest {
  post_id: number;
  text: string;
  user: string;
}

export enum ClientMethod {
  CREATE_COMMENT = 'create_comment',
  POST = 'post',
  CREATE_POST = 'create_post',
  POSTS = 'posts',
}

export interface ClientApi {
  fetchFeed(params: FeedRequest): ApiResponse<Post[]>;
  fetchPost(params: PostRequest): ApiResponse<Post>;
  createPost(params: CreatePostRequest): ApiResponse<Post>;
  createComment(params: CreateCommentRequest): ApiResponse<Comment>;
}
