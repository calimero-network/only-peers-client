import axios from "axios";

import { NodeApi } from "./nodeApi";
import { NodeApiDataSource } from "./dataSource/NodeApiDataSource";
import { AxiosHttpClient, HttpClient } from "./httpClient";

class ApiClient {
  private nodeApi: NodeApi;

  constructor(httpClient: HttpClient) {
    this.nodeApi = new NodeApiDataSource(httpClient);
  }

  node() {
    return this.nodeApi;
  }
}

const apiClient = new ApiClient(new AxiosHttpClient(axios));

export default apiClient;
