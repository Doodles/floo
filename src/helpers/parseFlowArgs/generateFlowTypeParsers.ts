import * as t from '@onflow/types';
import BigNumber from 'bignumber.js';

import { InvalidFlowArgumentError } from '../../errors';
import { FlowPrimitiveType } from '../../interfaces';
import { FlowTypeParser } from './flowTypeParser.interface';
import { validateParserTypes } from './validateParserTypes';

export const generateIntTypeParser = (
  type: string,
  minValue: BigNumber,
  maxValue: BigNumber,
): FlowTypeParser<FlowPrimitiveType> => {
  return {
    type: () => t[type],
    validate: (argName: string, value: FlowPrimitiveType, index: number) => {
      const validatedValue = validateParserTypes<number | string>(
        argName,
        value,
        index,
        ['number', 'string'],
      );
      const valueBn = BigNumber(validatedValue);
      if (!valueBn.isInteger()) {
        throw new InvalidFlowArgumentError(
          argName,
          value,
          'Value must be an integer',
          index,
        );
      }
      if (valueBn.lt(minValue) || valueBn.gt(maxValue)) {
        throw new InvalidFlowArgumentError(
          argName,
          value,
          `Value must be between ${minValue.toPrecision(
            8,
          )} and ${maxValue.toPrecision(8)}`,
          index,
        );
      }
    },
    parse: (arg: FlowPrimitiveType) => arg.toString(),
  };
};

export const generateFixTypeParser = (
  type: string,
  minValue: BigNumber,
  maxValue: BigNumber,
): FlowTypeParser<FlowPrimitiveType> => {
  return {
    type: () => t[type],
    validate: (argName: string, value: FlowPrimitiveType, index: number) => {
      const validatedValue = validateParserTypes<number | string>(
        argName,
        value,
        index,
        ['number', 'string'],
      );
      const valueBn = BigNumber(validatedValue);
      if (!valueBn.isFinite()) {
        throw new InvalidFlowArgumentError(
          argName,
          value,
          'Value must be a number',
          index,
        );
      }
      if (valueBn.lt(minValue) || valueBn.gt(maxValue)) {
        throw new InvalidFlowArgumentError(
          argName,
          value,
          `Value must be between ${minValue.toPrecision(
            8,
          )} and ${maxValue.toPrecision(8)}`,
          index,
        );
      }
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      if (valueBn.decimalPlaces()! > 8) {
        throw new InvalidFlowArgumentError(
          argName,
          value,
          'Value must have max 8 decimals',
          index,
        );
      }
    },
    parse: (arg: FlowPrimitiveType) => parseFloat(arg.toString()).toFixed(8),
  };
};
