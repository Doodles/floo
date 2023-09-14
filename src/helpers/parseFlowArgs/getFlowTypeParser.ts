import * as t from '@onflow/types';

import {
  getFlowComplexTypeParser,
  isComplexType,
} from './flowComplexTypeParsers';
import {
  getFlowPrimitiveTypeParser,
  isPrimitiveType,
} from './flowPrimitiveTypeParsers';
import { FlowTypeParser } from './flowTypeParser.interface';

export const getFlowTypeParser = (key: string): FlowTypeParser => {
  if (isPrimitiveType(key)) {
    return getFlowPrimitiveTypeParser(key);
  }
  if (isComplexType(key)) {
    return getFlowComplexTypeParser(key);
  }
  return {
    type: t[key],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    validate: () => {},
  };
};
