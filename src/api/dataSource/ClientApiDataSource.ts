import { ClientApi, ClientMethod, CreateCommentRequest, CreatePostRequest, FeedRequest, PostRequest } from "../clientApi";
import { ApiResponse } from "../response";
import { Post } from "src/types/types";
import { JsonRpcClient } from "@calimero-is-near/calimero-p2p-sdk/lib";

export function getJsonRpcClient() {
    return new JsonRpcClient(
        process.env["NEXT_PUBLIC_RPC_BASE_URL"],
        process.env["NEXT_PUBLIC_RPC_PATH"],
    );
}

const applicationId = process.env["NEXT_APPLICATION_ID"]

export class ClientApiDataSource implements ClientApi {
    async fetchFeed(params: FeedRequest): ApiResponse<Post[]> {
        const response = await getJsonRpcClient().query<FeedRequest, Post[]>({
            applicationId: applicationId,
            method: ClientMethod.POSTS,
            argsJson: params
        });
        return {
            data: response.output,
            error: null
        };
    }

    async fetchPost(params: PostRequest): ApiResponse<Post> {
        const response = await getJsonRpcClient().query<PostRequest, Post>({
            applicationId: applicationId,
            method: ClientMethod.POST,
            argsJson: params
        });
        return {
            data: response.output,
            error: null
        };
    }

    async createPost(params: CreatePostRequest): ApiResponse<Post> {
        const response = await getJsonRpcClient().mutate<CreatePostRequest, Post>({
            applicationId: applicationId,
            method: ClientMethod.CREATE_POST,
            argsJson: params
        });
        return {
            data: response.output,
            error: null
        };
    }

    async createComment(params: CreateCommentRequest): ApiResponse<Comment> {
        const response = await getJsonRpcClient().mutate<CreateCommentRequest, Comment>({
            applicationId: applicationId,
            method: ClientMethod.CREATE_COMMENT,
            argsJson: params
        });
        return {
            data: response.output,
            error: null
        };
    }
}