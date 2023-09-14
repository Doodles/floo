import * as fcl from '@onflow/fcl';

export type FlowDiscoveryWalletMethod =
  | 'IFRAME/RPC'
  | 'POP/RPC'
  | 'TAB/RPC'
  | 'HTTP/POST'
  | 'EXT/RPC';

export type FlowNetwork = 'local' | 'canarynet' | 'testnet' | 'mainnet';

export interface ConfigureChainsProps {
  title: string;
  icon?: string;
  accessNodeApi: string;
  discoveryWallet: string;
  discoveryWalletMethod?: FlowDiscoveryWalletMethod;
  discoveryAuthnEndpoint?: string;
  network: FlowNetwork;
  limit?: number;
}

export const configureChains = (
  {
    title,
    icon,
    accessNodeApi,
    discoveryWallet,
    discoveryWalletMethod = 'POP/RPC',
    discoveryAuthnEndpoint,
    network,
    limit = 100,
  }: ConfigureChainsProps,
  extraConfigs: Record<string, unknown> = {},
) => {
  fcl.config({
    'app.detail.title': title,
    'app.detail.icon': icon,
    'accessNode.api': accessNodeApi,
    'discovery.wallet': discoveryWallet,
    'discovery.wallet.method': discoveryWalletMethod,
    'discovery.authn.endpoint': discoveryAuthnEndpoint,
    'flow.network': network,
    'fcl.limit': limit,
  });

  for (const [key, value] of Object.entries(extraConfigs)) {
    fcl.config.put(key, value);
  }
};
