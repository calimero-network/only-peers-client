import { getNearEnvironment } from './node';
import { getAppEndpointKey } from './storage';

interface NodeConfig {
  network: string;
  applicationId: string;
  nodeServerUrl: string;
}

export const nodeConfig: NodeConfig = {
  network: getNearEnvironment() === 'testnet' ? 'testnet' : 'mainnet',
  applicationId: process.env['NEXT_PUBLIC_APPLICATION_ID'],
  nodeServerUrl: getAppEndpointKey() as string,
};
