import BigNumber from 'bignumber.js';

import { FlowPrimitiveTypeParserMap } from '../flowTypeParser.interface';
import { generateIntTypeParser } from '../generateFlowTypeParsers';

export const getFlowTypeWordParsers = (): FlowPrimitiveTypeParserMap => {
  return {
    Word8: generateIntTypeParser(
      'Word8',
      BigNumber(0),
      BigNumber(2).pow(8).minus(1),
    ),
    Word16: generateIntTypeParser(
      'Word16',
      BigNumber(0),
      BigNumber(2).pow(16).minus(1),
    ),
    Word32: generateIntTypeParser(
      'Word32',
      BigNumber(0),
      BigNumber(2).pow(32).minus(1),
    ),
    Word64: generateIntTypeParser(
      'Word64',
      BigNumber(0),
      BigNumber(2).pow(64).minus(1),
    ),
  };
};
