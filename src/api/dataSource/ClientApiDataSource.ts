import {ClientApi, ClientMethod, CreateCommentRequest, CreatePostRequest, FeedRequest, PostRequest} from "../clientApi";
import {ApiResponse, ResponseData} from "../response";
import {Post} from "src/types/types";
import {RpcClient, RpcResponse} from "jsonrpc-ts";
import {AxiosResponse} from "axios";
import {v4 as uuid} from "uuid";

interface JsonRpcService {
    query: (JsonRpc);
    mutate: (JsonRpc);
}

export function getJsonRpcClient() {
    return new RpcClient<JsonRpcService>({
        url: process.env["NEXT_PUBLIC_RPC_URL"]
    });
}

export class ClientApiDataSource implements ClientApi {
    async createComment(params: CreateCommentRequest): ApiResponse<Comment> {
        const jsonrpc: JsonRpcParams = {
            applicationId: "/calimero/experimental/app/9SFTEoc6RBHtCn9b6cm4PPmhYzrogaMCd5CRiYAQichP",
            method: ClientMethod.CREATE_COMMENT,
            argsJson: params
        };
        return parseJsonRpcResponse<Comment>(await getJsonRpcClient().makeRequest({
            method: JsonRpcMethod.MUTATE,
            params: jsonrpc,
            id: uuid(),
            jsonrpc: JSON_RPC_VERSION
        }));
    }

    async fetchPost(params: PostRequest): ApiResponse<Post> {
        const jsonrpc: JsonRpcParams = {
            applicationId: "/calimero/experimental/app/9SFTEoc6RBHtCn9b6cm4PPmhYzrogaMCd5CRiYAQichP",
            method: ClientMethod.POST,
            argsJson: params
        };
        return parseJsonRpcResponse<Post>(await getJsonRpcClient().makeRequest({
            method: JsonRpcMethod.QUERY,
            params: jsonrpc,
            id: uuid(),
            jsonrpc: JSON_RPC_VERSION
        }));
    }

    async createPost(params: CreatePostRequest): ApiResponse<Post> {
        const jsonrpc: JsonRpcParams = {
            applicationId: "/calimero/experimental/app/9SFTEoc6RBHtCn9b6cm4PPmhYzrogaMCd5CRiYAQichP",
            method: ClientMethod.CREATE_POST,
            argsJson: params
        };
        return parseJsonRpcResponse<Post>(await getJsonRpcClient().makeRequest({
            method: JsonRpcMethod.MUTATE,
            params: jsonrpc,
            id: uuid(),
            jsonrpc: JSON_RPC_VERSION
        }));
    }

    async fetchFeed(params: FeedRequest): ApiResponse<Post[]> {
        const jsonrpc: JsonRpcParams = {
            applicationId: "/calimero/experimental/app/9SFTEoc6RBHtCn9b6cm4PPmhYzrogaMCd5CRiYAQichP",
            method: ClientMethod.POSTS,
            argsJson: params
        };
        return parseJsonRpcResponse<Post[]>(await getJsonRpcClient().makeRequest({
            method: JsonRpcMethod.QUERY,
            params: jsonrpc,
            id: uuid(),
            jsonrpc: JSON_RPC_VERSION
        }));
    }
}

enum JsonRpcMethod {
    QUERY = "query",
    MUTATE = "mutate"
}

const JSON_RPC_VERSION = "2.0";

export interface JsonRpc { };

interface JsonRpcParams extends JsonRpc {
    applicationId: String;
    method: ClientMethod;
    argsJson: unknown;
}

interface JsonRpcRequest {
    jsonrpc: String;
    id: String;
    method: JsonRpcMethod,
    params: JsonRpcParams;
}

export function createJsonRpcRequest(method: JsonRpcMethod, jsonRpcParams: JsonRpcParams) {
    return {
        method: method,
        params: jsonRpcParams,
        id: "1",
        jsonrpc: "2.0"
    };
}

function parseJsonRpcResponse<T>(response: AxiosResponse<RpcResponse<any, any>, any>): ResponseData<T> {
    return {
        data: response.data.result.output,
        error: response.data.error
    };
}