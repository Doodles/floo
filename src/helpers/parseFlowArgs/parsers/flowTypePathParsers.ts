import * as t from '@onflow/types';

import { InvalidFlowArgumentError } from '../../../errors';
import { FlowPathType, FlowPrimitiveType } from '../../../interfaces';
import { FlowPrimitiveTypeParserMap } from '../flowTypeParser.interface';

export const getFlowTypePathParsers = (): FlowPrimitiveTypeParserMap => {
  return {
    Path: {
      type: () => t.Path,
      validate: (argName: string, value: FlowPrimitiveType, index: number) => {
        const path = parseFlowPath(value);
        if (typeof path !== 'object' || !path) {
          throw new InvalidFlowArgumentError(
            argName,
            path,
            'Value must be an object with domain and identifier properties',
            index,
          );
        }
        if (typeof path.domain !== 'string') {
          throw new InvalidFlowArgumentError(
            argName,
            path.domain,
            'Invalid "domain" property',
            index,
          );
        }
        if (typeof path.identifier !== 'string') {
          throw new InvalidFlowArgumentError(
            argName,
            path.identifier,
            'Invalid "identifier" property',
            index,
          );
        }
        if (!['public', 'private', 'storage'].includes(path.domain)) {
          throw new InvalidFlowArgumentError(
            argName,
            path.domain,
            'Domain property must be "public", "private" or "storage"',
            index,
          );
        }
      },
      parse: (value: FlowPrimitiveType) => parseFlowPath(value) as FlowPathType,
    },
  };
};

const parseFlowPath = (path: FlowPrimitiveType) => {
  if (typeof path === 'string') {
    if (path.startsWith('/')) {
      path = path.slice(1);
    }
    const [domain, ...splittedIdentifier] = path.trim().split('/');
    const identifier = splittedIdentifier.join('/');
    return { domain, identifier };
  }
  return path;
};
