import { getAppEndpointKey } from "src/lib/storage";

interface NodeConfig {
    network: string;
    applicationId: string;
    nodeServerUrl: string;
}

export const nodeConfig: NodeConfig = {
  network: process.env["NEXT_PUBLIC_NEAR_ENV"] === "testnet" ? "testnet" : "mainnet",
  applicationId: process.env["NEXT_PUBLIC_APPLICATION_ID"],
  nodeServerUrl: getAppEndpointKey() as string,
};
