import { getAppEndpointKey } from "../../utils/storage";
import { HttpClient } from "../httpClient";
import {
  NodeChallenge,
  LoginResponse,
  NodeApi,
  LoginRequest,
  HealthRequest,
  HealthStatus,
} from "../nodeApi";
import { ApiResponse } from "../response";

export class NodeApiDataSource implements NodeApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  async requestChallenge(): ApiResponse<NodeChallenge> {
    return await this.client.post<NodeChallenge>(
      `${getAppEndpointKey()}/admin-api/request-challenge`,
      {
        applicationId: process.env["NEXT_APPLICATION_ID"],
      }
    );
  }

  async login(loginRequest: LoginRequest): ApiResponse<LoginResponse> {
    console.log("Send request to node with params", loginRequest);

    return await this.client.post<LoginRequest>(
      `${getAppEndpointKey()}/admin-api/add-client-key`,
      {
        ...loginRequest,
      }
    );
  }

  async health(request: HealthRequest): ApiResponse<HealthStatus> {
    return await this.client.get<HealthStatus>(
      `${request.url}/admin-api/health`
    );
  }
}
