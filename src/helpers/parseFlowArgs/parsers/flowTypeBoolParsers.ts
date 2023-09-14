import * as t from '@onflow/types';

import { FlowPrimitiveType } from '../../../interfaces';
import { FlowPrimitiveTypeParserMap } from '../flowTypeParser.interface';
import { validateParserTypes } from '../validateParserTypes';

export const getFlowTypeBoolParsers = (): FlowPrimitiveTypeParserMap => {
  return {
    Bool: {
      type: () => t.Bool,
      validate: (argName: string, value: FlowPrimitiveType, index: number) => {
        validateParserTypes(argName, value, index, ['boolean']);
      },
    },
  };
};
