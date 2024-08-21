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
import { getAppEndpointKey, getExecutorPublicKey } from '../../utils/storage';

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

    const publicKey = getExecutorPublicKey();
    if (publicKey === null) {
      return {
        error: { message: "Failed to get executor public key", code: 500}
      };
    }

    const config: RequestConfig = {
      headers: authHeaders,
    };

    const response = await getJsonRpcClient().query<FeedRequest, Post[]>(
      {
        contextId,
        method: ClientMethod.POSTS,
        argsJson: params,
        executorPublicKey: Array.from(publicKey),
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

    const publicKey = getExecutorPublicKey();
    if (publicKey === null) {
      return {
        error: { message: "Failed to get executor public key", code: 500}
      };
    }

    const config: RequestConfig = {
      headers: authHeaders,
    };

    const response = await getJsonRpcClient().query<PostRequest, Post>(
      {
        contextId,
        method: ClientMethod.POST,
        argsJson: params,
        executorPublicKey: Array.from(publicKey),
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

    const publicKey = getExecutorPublicKey();
    if (publicKey === null) {
      return {
        error: { message: "Failed to get executor public key", code: 500}
      };
    }

    const config: RequestConfig = {
      headers: authHeaders,
    };

    const response = await getJsonRpcClient().mutate<CreatePostRequest, Post>(
      {
        contextId,
        method: ClientMethod.CREATE_POST,
        argsJson: params,
        executorPublicKey: Array.from(publicKey),
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

    const publicKey = getExecutorPublicKey();
    if (publicKey === null) {
      return {
        error: { message: "Failed to get executor public key", code: 500}
      };
    }

    const config: RequestConfig = {
      headers: authHeaders,
    };

    const response = await getJsonRpcClient().mutate<
      CreateCommentRequest,
      Comment
    >(
      {
        contextId,
        method: ClientMethod.CREATE_COMMENT,
        argsJson: params,
        executorPublicKey: Array.from(publicKey),
      },
      config,
    );
    return {
      data: response?.result?.output,
      error: null,
    };
  }
}
