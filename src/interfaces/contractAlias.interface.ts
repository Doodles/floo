import { FlowNetwork, ZeroXString } from '../types';

export type ContractAlias = {
  alias: ZeroXString;
  addresses: {
    [K in FlowNetwork]?: ZeroXString;
  };
};
