import {
  ApiResponse,
  getAppEndpointKey,
  handleRpcError,
  JsonRpcClient,
  prepareAuthenticatedRequestConfig,
  RpcError,
} from "@calimero-network/calimero-client";

import {
  ClientApi,
  ClientMethod,
  CreateCommentRequest,
  CreatePostRequest,
  PostRequest,
} from "../clientApi";
import { Comment, Post } from "../../types/types";

export function getJsonRpcClient() {
  const appEndpointKey = getAppEndpointKey();
  if (!appEndpointKey) {
    throw new Error(
      "Application endpoint key is missing. Please check your configuration.",
    );
  }
  return new JsonRpcClient(appEndpointKey, "/jsonrpc");
}

export class ClientApiDataSource implements ClientApi {
  private async handleError(
    error: RpcError,
    params: any,
    callbackFunction: any,
  ) {
    if (error && error.code) {
      const response = await handleRpcError(error, getAppEndpointKey);
      if (response.code === 403) {
        return await callbackFunction(params);
      }
      return {
        error: await handleRpcError(error, getAppEndpointKey),
      };
    }
  }

  async fetchFeed(): ApiResponse<Post[]> {
    try {
      const { config, error, contextId, publicKey } =
        prepareAuthenticatedRequestConfig();

      if (error) {
        return {
          data: null,
          error: {
            code: error.code,
            message: error.message,
          },
        };
      }

      const response = await getJsonRpcClient().execute<any, Post[]>(
        {
          contextId,
          method: ClientMethod.POSTS,
          argsJson: {},
          executorPublicKey: publicKey,
        },
        config,
      );

      if (response?.error) {
        return await this.handleError(response.error, {}, this.fetchFeed);
      }

      return {
        data: response.result?.output ?? [],
        error: null,
      };
    } catch (error) {
      console.error("fetchFeed failed:", error);
      let errorMessage = "An unexpected error occurred during fetchFeed";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }
      return {
        error: {
          code: 500,
          message: errorMessage,
        },
      };
    }
  }

  async fetchPost(params: PostRequest): ApiResponse<Post> {
    try {
      const { config, error, contextId, publicKey } =
        prepareAuthenticatedRequestConfig();

      if (error) {
        return {
          data: null,
          error: {
            code: error.code,
            message: error.message,
          },
        };
      }

      const response = await getJsonRpcClient().execute<PostRequest, Post>(
        {
          contextId,
          method: ClientMethod.POST,
          argsJson: params,
          executorPublicKey: publicKey,
        },
        config,
      );

      if (response?.error) {
        return await this.handleError(response.error, {}, this.fetchFeed);
      }

      if (!response?.result?.output) {
        return {
          data: null,
          error: {
            code: 404,
            message: "Post not found",
          },
        };
      }

      return {
        data: response?.result?.output,
        error: null,
      };
    } catch (error) {
      console.error("fetchPost failed:", error);
      let errorMessage = "An unexpected error occurred during fetchPost";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }
      return {
        error: {
          code: 500,
          message: errorMessage,
        },
      };
    }
  }

  async createPost(params: CreatePostRequest): ApiResponse<Post> {
    try {
      const { config, error, contextId, publicKey } =
        prepareAuthenticatedRequestConfig();

      if (error) {
        return {
          data: null,
          error: {
            code: error.code,
            message: error.message,
          },
        };
      }

      const response = await getJsonRpcClient().execute<
        CreatePostRequest,
        Post
      >(
        {
          contextId,
          method: ClientMethod.CREATE_POST,
          argsJson: params,
          executorPublicKey: publicKey,
        },
        config,
      );
      if (response?.error) {
        return await this.handleError(response.error, {}, this.fetchFeed);
      }

      if (!response?.result?.output) {
        return {
          data: null,
          error: {
            code: 500,
            message: "Error creating post",
          },
        };
      }

      return {
        data: response?.result?.output,
        error: null,
      };
    } catch (error) {
      console.error("createPost failed:", error);
      let errorMessage = "An unexpected error occurred during createPost";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }
      return {
        error: {
          code: 500,
          message: errorMessage,
        },
      };
    }
  }

  async createComment(params: CreateCommentRequest): ApiResponse<Comment> {
    try {
      const { config, error, contextId, publicKey } =
        prepareAuthenticatedRequestConfig();

      if (error) {
        return {
          data: null,
          error: {
            code: error.code,
            message: error.message,
          },
        };
      }

      const response = await getJsonRpcClient().execute<
        CreateCommentRequest,
        Comment
      >(
        {
          contextId,
          method: ClientMethod.CREATE_COMMENT,
          argsJson: params,
          executorPublicKey: publicKey,
        },
        config,
      );
      if (response?.error) {
        return await this.handleError(response.error, {}, this.fetchFeed);
      }

      if (!response?.result?.output) {
        return {
          data: null,
          error: {
            code: 500,
            message: "Error creating post",
          },
        };
      }

      return {
        data: response?.result?.output,
        error: null,
      };
    } catch (error) {
      console.error("createComment failed:", error);
      let errorMessage = "An unexpected error occurred during createComment";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }
      return {
        error: {
          code: 500,
          message: errorMessage,
        },
      };
    }
  }
}
