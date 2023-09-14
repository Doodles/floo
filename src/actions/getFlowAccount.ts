import * as fcl from '@onflow/fcl';

import { FlowAccount } from '../interfaces';

export const getFlowAccount = (): FlowAccount => {
  const user = fcl.currentUser.snapshot();
  return {
    address: user?.addr,
  };
};
