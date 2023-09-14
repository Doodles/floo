import * as t from '@onflow/types';

import { InvalidFlowArgumentError } from '../../../errors';
import { FlowPrimitiveType } from '../../../interfaces';
import { FlowPrimitiveTypeParserMap } from '../flowTypeParser.interface';
import { validateParserTypes } from '../validateParserTypes';

export const getFlowTypeStringParsers = (): FlowPrimitiveTypeParserMap => {
  return {
    Character: {
      type: () => t.Character,
      validate: (argName: string, value: FlowPrimitiveType, index: number) => {
        const validatedValue = validateParserTypes<string>(
          argName,
          value,
          index,
          ['string'],
        );
        if (validatedValue.length !== 1 || validatedValue.startsWith('\\u')) {
          throw new InvalidFlowArgumentError(
            argName,
            value,
            'Value must be a single character or Unicode scalars',
            index,
          );
        }
      },
    },
    String: {
      type: () => t.String,
      validate: (argName: string, value: FlowPrimitiveType, index: number) => {
        validateParserTypes(argName, value, index, ['string']);
      },
    },
  };
};
