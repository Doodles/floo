import { InvalidFlowArgumentError } from '../../errors';
import { FlowType } from '../../interfaces';

export const validateParserTypes = <T>(
  templateArgName: string,
  arg: FlowType,
  index: number,
  validJsTypes: string[],
): T => {
  if (validJsTypes?.includes(typeof arg) === false) {
    const valueTypesErrorMessage =
      validJsTypes.length > 1
        ? `one of the following types: (${validJsTypes.join(', ')})`
        : `type ${validJsTypes[0]}`;
    const reason = `Expected ${valueTypesErrorMessage} but found ${typeof arg}`;
    throw new InvalidFlowArgumentError(templateArgName, arg, reason, index);
  }
  return arg as T;
};
