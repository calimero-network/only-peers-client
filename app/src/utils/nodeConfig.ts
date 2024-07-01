import { getNearEnvironment } from './node';
import { getAppEndpointKey } from './storage';

interface NodeConfig {
  network: string;
  contextId: string;
  nodeServerUrl: string;
}

export const nodeConfig: NodeConfig = {
  network: getNearEnvironment() === 'testnet' ? 'testnet' : 'mainnet',
  contextId: process.env['NEXT_PUBLIC_CONTEXT_ID'],
  nodeServerUrl: getAppEndpointKey() as string,
};
