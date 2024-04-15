import { Post } from "src/types/types";
import { ApiResponse } from "./response";

export interface QueryPostsRequest {
    // ignore
}

export interface QueryPostRequest {
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
    CREATE_COMMENT = "create_comment",
    POST = "post",
    CREATE_POST = "create_post",
    POSTS = "posts"
}

export interface ClientApi {
    queryPosts(params: QueryPostsRequest): ApiResponse<Post[]>;
    queryPost(params: QueryPostRequest): ApiResponse<Post>;
    createPost(params: CreatePostRequest): ApiResponse<Post>;
    createComment(params: CreateCommentRequest): ApiResponse<Comment>;
}