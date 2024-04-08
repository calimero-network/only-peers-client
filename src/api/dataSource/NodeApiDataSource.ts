import {HttpClient} from "../httpClient";
import {NodeChallenge, LoginResponse, NodeApi, WalletSignatureData, LoginRequest} from "../nodeApi";
import {ApiResponse, ResponseData} from "../response";

export class NodeApiDataSource implements NodeApi {
    private client: HttpClient;

    constructor (client: HttpClient) {
        this.client = client;
    }

    async requestChallenge(): ApiResponse<NodeChallenge> {
        const apiResponse: ResponseData<NodeChallenge> = {
            data: {
                nonce: Buffer.from("challenge123"),
                applicationId: "app123",
                timestamp: Math.floor(Date.now() / 1000),
                nodeSignature: "abcdefhgjsdajbadk"
            }
        };
        return apiResponse;

        // return await this.client.get<Challenge>(
        //     `http://matej/api/request_challenge`,
        // );
    }

    async login(loginRequest: LoginRequest): ApiResponse<LoginResponse> {
        console.log("Send request to node with params", loginRequest);

        return await this.client.post<LoginRequest>(
            `http://localhost:2428/admin-api/add-client-key`,
            {
                ...loginRequest
            }
        );
    }
}