import {
  FlowPrimitiveTypeParserMap,
  FlowTypeParser,
} from './flowTypeParser.interface';
import {
  getFlowTypeAddressParsers,
  getFlowTypeBoolParsers,
  getFlowTypeFixParsers,
  getFlowTypeIntParsers,
  getFlowTypeStringParsers,
  getFlowTypeWordParsers,
} from './parsers';

export const getFlowPrimitiveTypeParser = (key: string): FlowTypeParser => {
  return _getCachedFlowPrimitiveTypeParsers()[key] as FlowTypeParser;
};

export const isPrimitiveType = (key: string): boolean => {
  return !!_getCachedFlowPrimitiveTypeParsers()[key];
};

let _flowPrimitiveTypeParsers: FlowPrimitiveTypeParserMap;

const _getCachedFlowPrimitiveTypeParsers = (): FlowPrimitiveTypeParserMap => {
  if (!_flowPrimitiveTypeParsers) {
    _flowPrimitiveTypeParsers = {
      ...getFlowTypeAddressParsers(),
      ...getFlowTypeBoolParsers(),
      ...getFlowTypeFixParsers(),
      ...getFlowTypeIntParsers(),
      ...getFlowTypeStringParsers(),
      ...getFlowTypeWordParsers(),
    };
  }
  return _flowPrimitiveTypeParsers;
};
