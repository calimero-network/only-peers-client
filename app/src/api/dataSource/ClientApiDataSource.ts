import {
  ClientApi,
  ClientMethod,
  CreateCommentRequest,
  CreatePostRequest,
  FeedRequest,
  PostRequest,
} from '../clientApi';
import { ApiResponse } from '../response';
import { JsonWebToken, Post } from '../../types/types';
import {
  JsonRpcClient,
  RequestConfig,
} from '@calimero-is-near/calimero-p2p-sdk';
import { AxiosHeader, createJwtHeader } from '../../crypto/crypto';
import {
  getAppEndpointKey,
  getContextId,
  getExecutorPkByteArray,
  getJWTObject,
} from '../../utils/storage';

export function getJsonRpcClient() {
  const jwt: JsonWebToken | null = getJWTObject();
  return new JsonRpcClient(getAppEndpointKey()?.toString(), jwt?.context_id ?? '');
}

export class ClientApiDataSource implements ClientApi {
  async fetchFeed(params: FeedRequest): ApiResponse<Post[]> {
    const jwtObject: JsonWebToken = getJWTObject();
    const headers: AxiosHeader = createJwtHeader();

    const publicKey = getExecutorPkByteArray(jwtObject.executor_public_key);
    if (publicKey === null) {
      return {
        error: { message: 'Failed to get executor public key', code: 500 },
      };
    }

    const config: RequestConfig = {
      headers: headers,
    };

    const response = await getJsonRpcClient().query<FeedRequest, Post[]>(
      {
        contextId: getContextId(),
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
    const jwtObject: JsonWebToken = getJWTObject();
    const headers: AxiosHeader = createJwtHeader();

    const publicKey = getExecutorPkByteArray(jwtObject.executor_public_key);
    if (publicKey === null) {
      return {
        error: { message: 'Failed to get executor public key', code: 500 },
      };
    }

    const config: RequestConfig = {
      headers: headers,
    };

    const response = await getJsonRpcClient().query<PostRequest, Post>(
      {
        contextId: getContextId(),
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
    const jwtObject: JsonWebToken = getJWTObject();
    const headers: AxiosHeader = createJwtHeader();

    const publicKey = getExecutorPkByteArray(jwtObject.executor_public_key);
    if (publicKey === null) {
      return {
        error: { message: 'Failed to get executor public key', code: 500 },
      };
    }

    const config: RequestConfig = {
      headers: headers,
    };

    const response = await getJsonRpcClient().mutate<CreatePostRequest, Post>(
      {
        contextId: getContextId(),
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
    const jwtObject: JsonWebToken = getJWTObject();
    const headers: AxiosHeader = createJwtHeader();

    const publicKey = getExecutorPkByteArray(jwtObject.executor_public_key);
    if (publicKey === null) {
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
        contextId: getContextId(),
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
