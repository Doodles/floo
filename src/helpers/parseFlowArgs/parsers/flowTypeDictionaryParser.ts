import * as t from '@onflow/types';

import { InvalidFlowArgumentError } from '../../../errors';
import {
  FlowDictionaryArrayType,
  FlowDictionaryType,
  FlowType,
} from '../../../interfaces';
import { FlowTypeParser } from '../flowTypeParser.interface';

export const getFlowTypeDictionaryParser = (
  keyFlowTypeParser: FlowTypeParser,
  valueFlowTypeParser: FlowTypeParser,
): FlowTypeParser => {
  return {
    type: () =>
      t.Dictionary({
        key: keyFlowTypeParser.type(),
        value: valueFlowTypeParser.type(),
      }),
    validate: (argName: string, value: FlowType, index: number) => {
      if (!isDictionary(value)) {
        throw new InvalidFlowArgumentError(
          argName,
          value,
          `Value must be an object or an array of key-value pairs`,
          index,
        );
      }
      const dictionary: FlowDictionaryArrayType = formatDictionary(
        value as FlowDictionaryType,
      );
      for (const { key, value } of dictionary) {
        try {
          keyFlowTypeParser.validate(argName, key, index);
        } catch (error) {
          let reason = `Invalid key of the dictionary`;
          if (error instanceof InvalidFlowArgumentError) {
            const invalidFlowArgumentError = error as InvalidFlowArgumentError;
            reason = reason.concat(`: ${invalidFlowArgumentError.reason}`);
          }
          throw new InvalidFlowArgumentError(argName, key, reason, index);
        }
        try {
          valueFlowTypeParser.validate(argName, value, index);
        } catch (error) {
          let reason = `Invalid value at key '${key}' of the dictionary`;
          if (error instanceof InvalidFlowArgumentError) {
            const invalidFlowArgumentError = error as InvalidFlowArgumentError;
            reason = reason.concat(`: ${invalidFlowArgumentError.reason}`);
          }
          throw new InvalidFlowArgumentError(argName, value, reason, index);
        }
      }
    },
    parse: (value: FlowType): FlowType => {
      const dictionary: FlowDictionaryArrayType = formatDictionary(
        value as FlowDictionaryType,
      );
      return dictionary.map((item) => {
        return {
          key: keyFlowTypeParser.parse?.(item.key) ?? item.key,
          value: valueFlowTypeParser.parse?.(item.value) ?? item.value,
        };
      });
    },
  };
};

const isDictionary = (value: unknown): boolean => {
  return (
    (typeof value === 'object' && value !== null && !Array.isArray(value)) ||
    (Array.isArray(value) &&
      value.every((item) => {
        return (
          typeof item === 'object' &&
          item !== null &&
          Object.prototype.hasOwnProperty.call(item, 'key') &&
          Object.prototype.hasOwnProperty.call(item, 'value')
        );
      }))
  );
};

const formatDictionary = (
  dictionary: FlowDictionaryType,
): FlowDictionaryArrayType => {
  if (Array.isArray(dictionary)) {
    return dictionary;
  }
  return Object.entries(dictionary).map(([key, value]) => {
    return {
      key,
      value,
    };
  });
};
