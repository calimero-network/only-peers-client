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
                nonce: "challenge123",
                applicationId: "app123",
                timestamp: 123,
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
        const apiResponse: ResponseData<LoginResponse> = {
            data: {

            }
        };
        return apiResponse;
    }
}