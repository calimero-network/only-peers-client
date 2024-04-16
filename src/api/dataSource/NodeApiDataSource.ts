import { HttpClient } from "../httpClient";
import {
  NodeChallenge,
  LoginResponse,
  NodeApi,
  LoginRequest,
} from "../nodeApi";
import { ApiResponse } from "../response";

export class NodeApiDataSource implements NodeApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  async requestChallenge(): ApiResponse<NodeChallenge> {
    return await this.client.post<NodeChallenge>(
      `${process.env["NEXT_PUBLIC_RPC_BASE_URL"]}/admin-api/request-challenge`,
      {
        applicationId: process.env["NEXT_APPLICATION_ID"],
      }
    );
  }

  async login(loginRequest: LoginRequest): ApiResponse<LoginResponse> {
    console.log("Send request to node with params", loginRequest);

    return await this.client.post<LoginRequest>(
      `${process.env["NEXT_PUBLIC_RPC_BASE_URL"]}/admin-api/add-client-key`,
      {
        ...loginRequest,
      }
    );
  }
}
