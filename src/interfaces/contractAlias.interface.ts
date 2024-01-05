import { FlowNetwork, ZeroXString } from '../types';

export type ContractAlias = {
  readonly alias: ZeroXString;
  readonly addresses: {
    readonly [K in FlowNetwork]?: ZeroXString;
  };
};
