import BigNumber from 'bignumber.js';

import { FlowPrimitiveTypeParserMap } from '../flowTypeParser.interface';
import { generateFixTypeParser } from '../generateFlowTypeParsers';

export const getFlowTypeFixParsers = (): FlowPrimitiveTypeParserMap => {
  return {
    Fix64: generateFixTypeParser(
      'Fix64',
      BigNumber(-2).pow(63).minus(1).div(BigNumber(10).pow(8)),
      BigNumber(2).pow(63).minus(1).div(BigNumber(10).pow(8)),
    ),
    UFix64: generateFixTypeParser(
      'UFix64',
      BigNumber(0),
      BigNumber(2).pow(64).minus(1).div(BigNumber(10).pow(8)),
    ),
  };
};
