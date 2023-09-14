import { FlowPrimitiveType, FlowType } from '../../interfaces';

export interface FlowTypeParser<TValue = FlowType, TParsedValue = TValue> {
  type(): unknown;
  validate: (argName: string, value: TValue, index: number) => void;
  parse?: (arg: TValue) => TParsedValue;
}

export type FlowPrimitiveTypeParser<
  TValue extends FlowPrimitiveType = FlowPrimitiveType,
  TParsedValue extends FlowPrimitiveType = TValue,
> = FlowTypeParser<TValue, TParsedValue>;

export type FlowTypeArrayParser<
  TValue extends FlowType = FlowType,
  TParsedValue extends FlowType = TValue,
> = FlowTypeParser<TValue[], TParsedValue[]>;

export interface FlowPrimitiveTypeParserMap {
  [key: string]: FlowTypeParser<FlowPrimitiveType, FlowPrimitiveType>;
}
