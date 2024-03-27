import {HttpClient} from "../httpClient";
import {Challenge, LoginResponse, NodeApi, WalletSignatureData} from "../nodeApi";
import {ApiResponse, ResponseData} from "../response";


export class NodeApiDataSource implements NodeApi {
    private client: HttpClient;

    constructor (client: HttpClient) {
        this.client = client;
    }

    async requestChallenge(): ApiResponse<Challenge> {
        const apiResponse: ResponseData<Challenge> = {
            data: {
                nonce: "challenge123",
                applicationId: "app123",
                timestamp: 123
            }
        };
        return apiResponse;

        // return await this.client.get<Challenge>(
        //     `http://matej/api/request_challenge`,
        // );
    }

    async login(walletSignatureData: WalletSignatureData, signature: String, address: String): ApiResponse<LoginResponse> {
        console.log("Send request to node with params", {walletSignatureData, signature, address});
        const apiResponse: ResponseData<LoginResponse> = {
            data: {

            }
        };
        return apiResponse;
    }
}