import * as t from '@onflow/types';

import { InvalidFlowArgumentError } from '../../../errors';
import { FlowType } from '../../../interfaces';
import {
  FlowTypeArrayParser,
  FlowTypeParser,
} from '../flowTypeParser.interface';

export const getFlowTypeArrayParser = <
  TValue extends FlowType = FlowType,
  TParsedValue extends FlowType = TValue,
>(
  flowTypeParser: FlowTypeParser<FlowType, TParsedValue>,
): FlowTypeArrayParser<TValue, TParsedValue> => {
  return {
    type: () => t.Array(flowTypeParser.type()),
    validate: (argName: string, value: TValue[], index: number) => {
      if (!Array.isArray(value)) {
        throw new InvalidFlowArgumentError(
          argName,
          value,
          `Value must be an array`,
          index,
        );
      }
      for (const [i, item] of value.entries()) {
        try {
          flowTypeParser.validate(argName, item, index);
        } catch (error) {
          let reason = `Invalid value at index ${i} of the array`;
          if (error instanceof InvalidFlowArgumentError) {
            const invalidFlowArgumentError = error as InvalidFlowArgumentError;
            reason = reason.concat(`: ${invalidFlowArgumentError.reason}`);
          }
          throw new InvalidFlowArgumentError(argName, item, reason, index);
        }
      }
    },
    parse: (array: TValue[]): TParsedValue[] => {
      return array.map(
        (value) =>
          flowTypeParser.parse?.(value) ?? (value as unknown as TParsedValue),
      );
    },
  };
};
