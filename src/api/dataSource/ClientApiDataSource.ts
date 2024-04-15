import { ClientApi, ClientMethod, CreateCommentRequest, CreatePostRequest, QueryPostsRequest, QueryPostRequest } from "../clientApi";
import { ApiResponse } from "../response";
import { Post } from "src/types/types";
import { JsonRpcClient } from "@calimero-is-near/calimero-p2p-sdk";

export function getJsonRpcClient() {
    return new JsonRpcClient(
        process.env["NEXT_PUBLIC_RPC_BASE_URL"],
        process.env["NEXT_PUBLIC_RPC_PATH"],
    );
}

export class ClientApiDataSource implements ClientApi {
    async queryPosts(params: QueryPostsRequest): ApiResponse<Post[]> {
        const response = await getJsonRpcClient().query<QueryPostsRequest, Post[]>({
            applicationId: "/calimero/experimental/app/9SFTEoc6RBHtCn9b6cm4PPmhYzrogaMCd5CRiYAQichP",
            method: ClientMethod.POSTS,
            argsJson: params
        });
        return {
            data: response.output,
            error: null
        };
    }

    async queryPost(params: QueryPostRequest): ApiResponse<Post> {
        const response = await getJsonRpcClient().query<QueryPostRequest, Post>({
            applicationId: "/calimero/experimental/app/9SFTEoc6RBHtCn9b6cm4PPmhYzrogaMCd5CRiYAQichP",
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
            applicationId: "/calimero/experimental/app/9SFTEoc6RBHtCn9b6cm4PPmhYzrogaMCd5CRiYAQichP",
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
            applicationId: "/calimero/experimental/app/9SFTEoc6RBHtCn9b6cm4PPmhYzrogaMCd5CRiYAQichP",
            method: ClientMethod.CREATE_COMMENT,
            argsJson: params
        });
        return {
            data: response.output,
            error: null
        };
    }
}