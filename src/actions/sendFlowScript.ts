import * as fcl from '@onflow/fcl';

import { castFlowResult, parseFlowArgs } from '../helpers';
import { FlowType } from '../interfaces';

export interface SendFlowScriptProps {
  code: string;
  args?: FlowType[];
  limit?: number;
  autoCast?: boolean;
}

export const sendFlowScript = async <T>({
  code,
  args = [],
  limit,
  autoCast = true,
}: SendFlowScriptProps): Promise<T> => {
  const result = await fcl.query({
    cadence: code,
    limit,
    args: parseFlowArgs({ code, args }),
  });
  if (autoCast) {
    return castFlowResult<T>(result);
  }
  return result as T;
};
