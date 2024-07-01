import {
  ClientApi,
  ClientMethod,
  CreateCommentRequest,
  CreatePostRequest,
  FeedRequest,
  PostRequest,
} from '../clientApi';
import { ApiResponse } from '../response';
import { Post } from '../../types/types';
import {
  JsonRpcClient,
  RequestConfig,
} from '@calimero-is-near/calimero-p2p-sdk';
import { AxiosHeader, createAuthHeader } from '../../crypto/crypto';
import { getAppEndpointKey } from '../../utils/storage';

export function getJsonRpcClient() {
  return new JsonRpcClient(
    getAppEndpointKey()?.toString(),
    process.env['NEXT_PUBLIC_RPC_PATH'],
  );
}

const contextId = process.env['NEXT_PUBLIC_CONTEXT_ID'];

export class ClientApiDataSource implements ClientApi {
  async fetchFeed(params: FeedRequest): ApiResponse<Post[]> {
    const authHeaders: AxiosHeader = await createAuthHeader(
      JSON.stringify(params),
    );

    const config: RequestConfig = {
      headers: authHeaders,
    };

    const response = await getJsonRpcClient().query<FeedRequest, Post[]>(
      {
        contextId: contextId,
        method: ClientMethod.POSTS,
        argsJson: params,
      },
      config,
    );

    return {
      data: response.result?.output ?? [],
      error: null,
    };
  }

  async fetchPost(params: PostRequest): ApiResponse<Post> {
    const authHeaders: AxiosHeader = await createAuthHeader(
      JSON.stringify(params),
    );

    const config: RequestConfig = {
      headers: authHeaders,
    };

    const response = await getJsonRpcClient().query<PostRequest, Post>(
      {
        contextId: contextId,
        method: ClientMethod.POST,
        argsJson: params,
      },
      config,
    );
    return {
      data: response?.result?.output,
      error: null,
    };
  }

  async createPost(params: CreatePostRequest): ApiResponse<Post> {
    const authHeaders: AxiosHeader = await createAuthHeader(
      JSON.stringify(params),
    );

    const config: RequestConfig = {
      headers: authHeaders,
    };

    const response = await getJsonRpcClient().mutate<CreatePostRequest, Post>(
      {
        contextId: contextId,
        method: ClientMethod.CREATE_POST,
        argsJson: params,
      },
      config,
    );
    return {
      data: response?.result?.output,
      error: null,
    };
  }

  async createComment(params: CreateCommentRequest): ApiResponse<Comment> {
    const authHeaders: AxiosHeader = await createAuthHeader(
      JSON.stringify(params),
    );

    const config: RequestConfig = {
      headers: authHeaders,
    };

    const response = await getJsonRpcClient().mutate<
      CreateCommentRequest,
      Comment
    >(
      {
        contextId: contextId,
        method: ClientMethod.CREATE_COMMENT,
        argsJson: params,
      },
      config,
    );
    return {
      data: response?.result?.output,
      error: null,
    };
  }
}
