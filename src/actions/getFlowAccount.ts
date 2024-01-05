import * as fcl from '@onflow/fcl';

import { FlowAccount } from '../interfaces';

export const getFlowAccount = async (): Promise<FlowAccount> => {
  const user = await fcl.currentUser.snapshot();
  return {
    address: user?.addr,
  };
};
