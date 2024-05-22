interface NodeConfig {
    network: string;
    applicationId: string;
    nodeServerUrl: string;
}

export const nodeConfig: NodeConfig = {
  network: process.env["NEXT_PUBLIC_NEAR_ENV"] === "testnet" ? "testnet" : "mainnet",
  applicationId: process.env["NEXT_PUBLIC_APPLICATION_ID"],
  nodeServerUrl: process.env["NEXT_PUBLIC_RPC_BASE_URL"],
};
