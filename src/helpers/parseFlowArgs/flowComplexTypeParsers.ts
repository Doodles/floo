import { getArrayType, getDictionaryTypes } from '@onflow/flow-cadut';

import { FlowTypeParser } from './flowTypeParser.interface';
import { getFlowTypeParser } from './getFlowTypeParser';
import {
  getFlowTypeArrayParser,
  getFlowTypeDictionaryParser,
  getFlowTypeOptionalParser,
  getFlowTypePathParser,
} from './parsers';

export const getFlowComplexTypeParser = (key: string): FlowTypeParser => {
  if (isFlowArray(key)) {
    const type = getArrayType(key);
    const flowTypeParser: FlowTypeParser = getFlowTypeParser(type);
    return getFlowTypeArrayParser(flowTypeParser) as FlowTypeParser;
  }
  if (isFlowDictionary(key)) {
    const [keyType, valueType] = getDictionaryTypes(key);
    const keyFlowTypeParser: FlowTypeParser = getFlowTypeParser(keyType);
    const valueFlowTypeParser: FlowTypeParser = getFlowTypeParser(valueType);
    return getFlowTypeDictionaryParser(keyFlowTypeParser, valueFlowTypeParser);
  }
  if (isFlowOptional(key)) {
    const type = key.slice(0, -1);
    const flowTypeParser: FlowTypeParser = getFlowTypeParser(type);
    return getFlowTypeOptionalParser(flowTypeParser);
  }
  if (isFlowPath(key)) {
    return getFlowTypePathParser() as FlowTypeParser;
  }

  throw new Error(`Type ${key} is not supported as complex type.`);
};

export const isComplexType = (key: string): boolean => {
  return (
    isFlowArray(key) ||
    isFlowDictionary(key) ||
    isFlowOptional(key) ||
    isFlowPath(key)
  );
};

export const isFlowArray = (key: string): boolean =>
  key.startsWith('[') && key.endsWith(']');

export const isFlowDictionary = (key: string): boolean =>
  key.startsWith('{') && key.endsWith('}');

export const isFlowOptional = (key: string): boolean => key.endsWith('?');

export const isFlowPath = (key: string): boolean =>
  ['PublicPath', 'PrivatePath', 'StoragePath'].includes(key);
