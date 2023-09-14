import * as t from '@onflow/types';

import { FlowType } from '../../../interfaces';
import { FlowTypeParser } from '../flowTypeParser.interface';

export const getFlowTypeOptionalParser = (
  flowTypeParser: FlowTypeParser,
): FlowTypeParser => {
  return {
    type: () => t.Optional(flowTypeParser.type()),
    validate: (argName: string, value: FlowType, index: number) => {
      if (value === undefined || value === null) {
        return;
      }
      flowTypeParser.validate(argName, value, index);
    },
    parse: (value: FlowType): FlowType => {
      if (value === undefined || value === null) {
        return value;
      }
      return flowTypeParser.parse ? flowTypeParser.parse(value) : value;
    },
  };
};
