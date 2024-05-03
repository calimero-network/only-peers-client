import {
  ClientApi,
  ClientMethod,
  CreateCommentRequest,
  CreatePostRequest,
  FeedRequest,
  PostRequest,
} from "../clientApi";
import { ApiResponse } from "../response";
import { Post } from "src/types/types";
import {
  JsonRpcClient,
  RequestConfig,
} from "@calimero-is-near/calimero-p2p-sdk/lib";
import { AxiosHeader, createAuthHeader } from "src/crypto/crypto";

export function getJsonRpcClient() {
  return new JsonRpcClient(
    process.env["NEXT_PUBLIC_RPC_BASE_URL"],
    process.env["NEXT_PUBLIC_RPC_PATH"]
  );
}

const applicationId = process.env["NEXT_PUBLIC_APPLICATION_ID"];

export class ClientApiDataSource implements ClientApi {
  async fetchFeed(params: FeedRequest): ApiResponse<Post[]> {
    const authHeaders: AxiosHeader = await createAuthHeader(
      JSON.stringify(params)
    );

    const config: RequestConfig = {
      headers: authHeaders,
    };

    const response = await getJsonRpcClient().query<FeedRequest, Post[]>(
      {
        applicationId: applicationId,
        method: ClientMethod.POSTS,
        argsJson: params,
      },
      config
    );

    return {
      data: response.result?.output ?? [],
      error: null,
    };

  }

  async fetchPost(params: PostRequest): ApiResponse<Post> {
    const authHeaders: AxiosHeader = await createAuthHeader(
      JSON.stringify(params)
    );

    const config: RequestConfig = {
      headers: authHeaders,
    };

    const response = await getJsonRpcClient().query<PostRequest, Post>(
      {
        applicationId: applicationId,
        method: ClientMethod.POST,
        argsJson: params,
      },
      config
    );
    return {
      data: response?.result?.output,
      error: null,
    };
  }

  async createPost(params: CreatePostRequest): ApiResponse<Post> {
    const authHeaders: AxiosHeader = await createAuthHeader(
      JSON.stringify(params)
    );

    const config: RequestConfig = {
      headers: authHeaders,
    };

    const response = await getJsonRpcClient().mutate<CreatePostRequest, Post>(
      {
        applicationId: applicationId,
        method: ClientMethod.CREATE_POST,
        argsJson: params,
      },
      config
    );
    return {
      data: response?.result?.output,
      error: null,
    };
  }

  async createComment(params: CreateCommentRequest): ApiResponse<Comment> {
    const authHeaders: AxiosHeader = await createAuthHeader(
      JSON.stringify(params)
    );

    const config: RequestConfig = {
      headers: authHeaders,
    };

    const response = await getJsonRpcClient().mutate<
      CreateCommentRequest,
      Comment
    >(
      {
        applicationId: applicationId,
        method: ClientMethod.CREATE_COMMENT,
        argsJson: params,
      },
      config
    );
    return {
      data: response?.result?.output,
      error: null,
    };
  }
}
