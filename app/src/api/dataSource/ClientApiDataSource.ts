import {
  ClientApi,
  ClientMethod,
  CreateCommentRequest,
  CreatePostRequest,
  FeedRequest,
  PostRequest,
} from '../clientApi';
import { ApiResponse } from '../response';
import { Comment, JsonWebToken, Post } from '../../types/types';
import {
  JsonRpcClient,
  RequestConfig,
  getNewJwtToken,
  getRefreshToken
} from '@calimero-is-near/calimero-p2p-sdk';
import { AxiosHeader, createJwtHeader } from '../../crypto/crypto';
import { getAppEndpointKey, getJWTObject } from '../../utils/storage';
import { getNodeUrl } from '../../utils/node';

export function getJsonRpcClient() {
  return new JsonRpcClient(
    getAppEndpointKey()?.toString(),
    process.env['NEXT_PUBLIC_RPC_PATH'],
  );
}

export class ClientApiDataSource implements ClientApi {
  async fetchFeed(params: FeedRequest): ApiResponse<Post[]> {
    const jwtObject: JsonWebToken = getJWTObject();
    const headers: AxiosHeader = createJwtHeader();
    const refreshToken = getRefreshToken();
    if (!jwtObject) {
      return {
        error: { message: 'Failed to get JWT token', code: 500 },
      };
    }
    if (jwtObject.executor_public_key === null) {
      return {
        error: { message: 'Failed to get executor public key', code: 500 },
      };
    }

    const config: RequestConfig = {
      headers: headers,
    };

    const response = await getJsonRpcClient().query<FeedRequest, Post[]>(
      {
        contextId: jwtObject.context_id,
        method: ClientMethod.POSTS,
        argsJson: params,
        executorPublicKey: jwtObject.executor_public_key,
      },
      config,
    );
    // @ts-expect-error: Property 'inner' does not exist on type 'RpcError'
    if (response.error?.inner?.response?.data === "Token not valid.") {
      await getNewJwtToken({refreshToken, getNodeUrl});
      return {
        error: { message: 'Your session expired, but we have refreshed it. Please try again.', code: 500 }
      };
    }

    return {
      data: response.result?.output ?? [],
      error: null,
    };
  }

  async fetchPost(params: PostRequest): ApiResponse<Post> {
    const jwtObject: JsonWebToken = getJWTObject();
    const headers: AxiosHeader = createJwtHeader();
    const refreshToken = getRefreshToken();
    if (!jwtObject) {
      return {
        error: { message: 'Failed to get JWT token', code: 500 },
      };
    }
    if (jwtObject.executor_public_key === null) {
      return {
        error: { message: 'Failed to get executor public key', code: 500 },
      };
    }

    const config: RequestConfig = {
      headers: headers,
    };

    const response = await getJsonRpcClient().query<PostRequest, Post>(
      {
        contextId: jwtObject.context_id,
        method: ClientMethod.POST,
        argsJson: params,
        executorPublicKey: jwtObject.executor_public_key,
      },
      config,
    );
    // @ts-expect-error: Property 'inner' does not exist on type 'RpcError'
    if (response.error?.inner?.response?.data === "Token not valid.") {
      await getNewJwtToken({refreshToken, getNodeUrl});
      return {
        error: { message: 'Your session expired, but we have refreshed it. Please try again.', code: 500 }
      };
    }

    return {
      data: response?.result?.output,
      error: null,
    };
  }

  async createPost(params: CreatePostRequest): ApiResponse<Post> {
    const jwtObject: JsonWebToken = getJWTObject();
    const headers: AxiosHeader = createJwtHeader();
    const refreshToken = getRefreshToken();
    if (!jwtObject) {
      return {
        error: { message: 'Failed to get JWT token', code: 500 },
      };
    }
    if (jwtObject.executor_public_key === null) {
      return {
        error: { message: 'Failed to get executor public key', code: 500 },
      };
    }

    const config: RequestConfig = {
      headers: headers,
    };

    const response = await getJsonRpcClient().mutate<CreatePostRequest, Post>(
      {
        contextId: jwtObject.context_id,
        method: ClientMethod.CREATE_POST,
        argsJson: params,
        executorPublicKey: jwtObject.executor_public_key,
      },
      config,
    );
    // @ts-expect-error: Property 'inner' does not exist on type 'RpcError'
    if (response.error?.inner?.response?.data === "Token not valid.") {
      await getNewJwtToken({refreshToken, getNodeUrl});
      return {
        error: { message: 'Your session expired, but we have refreshed it. Please try again.', code: 500 }
      };
    }

    return {
      data: response?.result?.output,
      error: null,
    };
  }

  async createComment(params: CreateCommentRequest): ApiResponse<Comment> {
    const jwtObject: JsonWebToken = getJWTObject();
    const headers: AxiosHeader = createJwtHeader();
    const refreshToken = getRefreshToken();
    if (!jwtObject) {
      return {
        error: { message: 'Failed to get JWT token', code: 500 },
      };
    }
    if (jwtObject.executor_public_key === null) {
      return {
        error: { message: 'Failed to get executor public key', code: 500 },
      };
    }

    const config: RequestConfig = {
      headers: headers,
    };

    const response = await getJsonRpcClient().mutate<
      CreateCommentRequest,
      Comment
    >(
      {
        contextId: jwtObject.context_id,
        method: ClientMethod.CREATE_COMMENT,
        argsJson: params,
        executorPublicKey: jwtObject.executor_public_key,
      },
      config,
    );
    // @ts-expect-error: Property 'inner' does not exist on type 'RpcError'
    if (response.error?.inner?.response?.data === "Token not valid.") {
      await getNewJwtToken({refreshToken, getNodeUrl});
      return {
        error: { message: 'Your session expired, but we have refreshed it. Please try again.', code: 500 }
      };
    }

    return {
      data: response?.result?.output,
      error: null,
    };
  }
}
