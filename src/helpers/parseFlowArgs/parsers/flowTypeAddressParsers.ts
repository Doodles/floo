import * as t from '@onflow/types';

import { InvalidFlowArgumentError } from '../../../errors';
import { FlowPrimitiveType } from '../../../interfaces';
import { FlowPrimitiveTypeParserMap } from '../flowTypeParser.interface';
import { validateParserTypes } from '../validateParserTypes';

export const getFlowTypeAddressParsers = (): FlowPrimitiveTypeParserMap => {
  return {
    Address: {
      type: () => t.Address,
      validate: (argName: string, value: FlowPrimitiveType, index: number) => {
        const validatedValue = validateParserTypes<string>(
          argName,
          value,
          index,
          ['string'],
        );
        if (!validatedValue.startsWith('0x')) {
          throw new InvalidFlowArgumentError(
            argName,
            validatedValue,
            `Value must start with '0x'`,
            index,
          );
        }
        if (validatedValue.length !== 18) {
          throw new InvalidFlowArgumentError(
            argName,
            validatedValue,
            'Value must be 18 characters long',
            index,
          );
        }
      },
    },
  };
};
