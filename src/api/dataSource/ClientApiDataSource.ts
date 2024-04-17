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
import { AxiosHeaders } from "axios";
import { createAuthHeader } from "src/crypto/crypto";

export function getJsonRpcClient() {
  return new JsonRpcClient(
    process.env["NEXT_PUBLIC_RPC_BASE_URL"],
    process.env["NEXT_PUBLIC_RPC_PATH"]
  );
}

const applicationId = process.env["NEXT_PUBLIC_APPLICATION_ID"];

export class ClientApiDataSource implements ClientApi {
  async fetchFeed(params: FeedRequest): ApiResponse<Post[]> {
    const authHeaders = await createAuthHeader(JSON.stringify(params));

    const headers = new AxiosHeaders();
    headers.set(
      "wallet_type",
      "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
      true
    );
    headers.set("signing_key", "s");
    headers.set("signature", "ss");
    headers.set("challenge", "xx");
    headers.set("Authorization", "dinamo");

    console.log("headers", headers);

    const config: RequestConfig = {
      headers: headers,
    };

    let params22: CreatePostRequest = {
      title: "ddd",
      content: "sss",
    };

    const response = await getJsonRpcClient().mutate<CreatePostRequest, Post>(
      {
        applicationId: applicationId,
        method: ClientMethod.CREATE_POST,
        argsJson: params22,
      },
      config
    );
    return {
      data: [],
      error: null,
    };

    // const response = await getJsonRpcClient().query<FeedRequest, Post[]>(
    //   {
    //     applicationId: applicationId,
    //     method: ClientMethod.POSTS,
    //     argsJson: params,
    //   },
    //   config
    // );

    // console.log("response", response);

    // return {
    //   data: response.result.output,
    //   error: null,
    // };
  }

  async fetchPost(params: PostRequest): ApiResponse<Post> {
    const response = await getJsonRpcClient().query<PostRequest, Post>({
      applicationId: applicationId,
      method: ClientMethod.POST,
      argsJson: params,
    });
    return {
      data: response.result.output,
      error: null,
    };
  }

  async createPost(params: CreatePostRequest): ApiResponse<Post> {
    const response = await getJsonRpcClient().mutate<CreatePostRequest, Post>({
      applicationId: applicationId,
      method: ClientMethod.CREATE_POST,
      argsJson: params,
    });
    return {
      data: response.result.output,
      error: null,
    };
  }

  async createComment(params: CreateCommentRequest): ApiResponse<Comment> {
    const response = await getJsonRpcClient().mutate<
      CreateCommentRequest,
      Comment
    >({
      applicationId: applicationId,
      method: ClientMethod.CREATE_COMMENT,
      argsJson: params,
    });
    return {
      data: response.result.output,
      error: null,
    };
  }
}
