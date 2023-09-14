import BigNumber from 'bignumber.js';

import { FlowPrimitiveTypeParserMap } from '../flowTypeParser.interface';
import { generateIntTypeParser } from '../generateFlowTypeParsers';

export const getFlowTypeIntParsers = (): FlowPrimitiveTypeParserMap => {
  return {
    Int: generateIntTypeParser(
      'Int',
      BigNumber(-2).pow(255).minus(1),
      BigNumber(2).pow(255).minus(1),
    ),
    Int8: generateIntTypeParser('Int8', BigNumber('-127'), BigNumber('127')),
    Int16: generateIntTypeParser(
      'Int16',
      BigNumber('-32767'),
      BigNumber('32767'),
    ),
    Int32: generateIntTypeParser(
      'Int32',
      BigNumber('-2147483647'),
      BigNumber('2147483647'),
    ),
    Int64: generateIntTypeParser(
      'Int64',
      BigNumber(-2).pow(63).minus(1),
      BigNumber(2).pow(63).minus(1),
    ),
    Int128: generateIntTypeParser(
      'Int128',
      BigNumber(-2).pow(127).minus(1),
      BigNumber(2).pow(127).minus(1),
    ),
    Int256: generateIntTypeParser(
      'Int256',
      BigNumber(-2).pow(255).minus(1),
      BigNumber(2).pow(255).minus(1),
    ),
    UInt8: generateIntTypeParser('UInt8', BigNumber('0'), BigNumber('255')),
    UInt16: generateIntTypeParser('UInt16', BigNumber('0'), BigNumber('65535')),
    UInt32: generateIntTypeParser(
      'UInt32',
      BigNumber('0'),
      BigNumber('4294967295'),
    ),
    UInt64: generateIntTypeParser(
      'UInt64',
      BigNumber(0),
      BigNumber(2).pow(64).minus(1),
    ),
    UInt128: generateIntTypeParser(
      'UInt128',
      BigNumber(0),
      BigNumber(2).pow(128).minus(1),
    ),
    UInt256: generateIntTypeParser(
      'UInt256',
      BigNumber(0),
      BigNumber(2).pow(256).minus(1),
    ),
  };
};
