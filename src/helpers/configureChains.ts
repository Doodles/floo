import * as fcl from '@onflow/fcl';

import { coreContractAliases } from '../constants';
import { ContractAlias } from '../interfaces';
import { FlowNetwork } from '../types';

export type FlowDiscoveryWalletMethod =
  | 'IFRAME/RPC'
  | 'POP/RPC'
  | 'TAB/RPC'
  | 'HTTP/POST'
  | 'EXT/RPC';

export interface ConfigureChainsProps {
  title: string;
  icon?: string;
  accessNodeApi: string;
  discoveryWallet: string;
  discoveryWalletMethod?: FlowDiscoveryWalletMethod;
  discoveryAuthnEndpoint?: string;
  network: FlowNetwork;
  limit?: number;
  /**
   * Add core contracts as imports inside Flow interactions.
   * Only works for `testnet` and `mainnet`.
   *
   * @default true
   */
  addCoreContracts?: boolean;
  /**
   * Add custom contracts as imports inside Flow interactions. The network will be automatically selected based on the `network` property.
   *
   * Contract aliases must start with '0x'.
   *
   * Example:
   *
   * ```ts
   * const contractAddresses = {
   *  '0xDoodles': {
   *    mainnet: '0xe81193c424cfd3fb',
   *  }
   * }
   * ```
   * And inside a Flow interaction:
   * ```cadence
   * import Doodles from 0xDoodles
   * ```
   */
  contractAddresses?: ContractAlias[];
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
    contractAddresses,
    addCoreContracts = true,
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

  if (addCoreContracts && (network === 'testnet' || network === 'mainnet')) {
    for (const coreContractAlias of coreContractAliases) {
      const contractAddress = coreContractAlias.addresses[network];
      fcl.config.put(coreContractAlias.alias, contractAddress);
    }
  }

  if (contractAddresses) {
    for (const contractAlias of contractAddresses) {
      const contractAddress = contractAlias.addresses[network];
      fcl.config.put(contractAlias.alias, contractAddress);
    }
  }

  for (const [key, value] of Object.entries(extraConfigs)) {
    fcl.config.put(key, value);
  }
};
