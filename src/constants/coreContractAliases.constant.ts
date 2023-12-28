import { ContractAlias } from '../interfaces';
import { FlowNetwork } from '../types';
import { MakeRequired, Subset } from '../types/internal';

type CoreContractNetwork = Subset<FlowNetwork, 'testnet' | 'mainnet'>;

interface CoreContractAlias extends Omit<ContractAlias, 'addresses'> {
  addresses: MakeRequired<ContractAlias['addresses'], CoreContractNetwork>;
}

export const coreContractAliases: CoreContractAlias[] = [
  {
    alias: '0xFlowToken',
    addresses: {
      testnet: '0x7e60df042a9c0868',
      mainnet: '0x1654653399040a61',
    },
  },
  {
    alias: '0xNonFungibleToken',
    addresses: {
      testnet: '0x631e88ae7f1d7c20',
      mainnet: '0x1d7e57aa55817448',
    },
  },
  {
    alias: '0xFungibleToken',
    addresses: {
      testnet: '0x9a0766d93b6608b7',
      mainnet: '0xf233dcee88fe0abe',
    },
  },
] as const;
