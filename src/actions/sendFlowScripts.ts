import * as fcl from '@onflow/fcl';

import { castFlowResult, parseFlowArgs } from '../helpers';
import { SendFlowScriptProps } from './sendFlowScript';

export interface SendFlowScriptsProps {
  scripts: SendFlowScriptProps[];
  autoCast?: boolean;
}

export const sendFlowScripts = async <T extends unknown[]>({
  scripts,
  autoCast = true,
}: SendFlowScriptsProps): Promise<T> => {
  const parsedFlowArgs = scripts.map((script) =>
    parseFlowArgs({ code: script.code, args: script.args }),
  );
  const results = await Promise.all(
    scripts.map((script, index) =>
      fcl.query({
        cadence: script.code,
        limit: script.limit,
        args: parsedFlowArgs[index],
      }),
    ),
  );
  if (autoCast) {
    return results.map(castFlowResult) as T;
  }
  return results as T;
};
