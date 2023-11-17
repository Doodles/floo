import { getTemplateInfo, splitArgs } from '@onflow/flow-cadut';
import * as t from '@onflow/types';

import { FlowType } from '../../interfaces';
import { getFlowTypeParser } from './getFlowTypeParser';

export interface ParseFlowArgsProps {
  code: string;
  args?: FlowType[];
}

export const parseFlowArgs = ({ code, args = [] }: ParseFlowArgsProps) => {
  const templateArgs = getTemplateInfo(code).args;

  if (templateArgs.length !== args.length) {
    throw new Error(
      `Number of arguments does not match template. Expected ${templateArgs.length} but got ${args.length}.`,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return (arg: (value: FlowType, type: unknown) => unknown, _: unknown) =>
    templateArgs.map((templateArg: unknown, index: number) => {
      const [templateArgName, templateArgType] = splitArgs(templateArg);
      return parseFlowArg(
        arg,
        args[index],
        index,
        templateArgName,
        templateArgType,
      );
    });
};

export const parseFlowArg = (
  argFunction: (value: FlowType, type: unknown) => unknown,
  arg: FlowType,
  index: number,
  templateArgName: string,
  templateArgType: string,
) => {
  const parser = getFlowTypeParser(templateArgType);
  if (!parser) {
    return argFunction(arg, t[templateArgType]);
  }
  parser.validate(templateArgName, arg, index);
  return argFunction(parser.parse ? parser.parse(arg) : arg, parser.type());
};
