export type FlowType =
  | FlowPrimitiveType
  | FlowType[]
  | FlowDictionaryType
  | undefined;

export type FlowPrimitiveType = string | number | boolean | FlowPathType;
export type FlowPathType = {
  domain: 'public' | 'private' | 'storage';
  identifier: string;
};
export type FlowArrayType = FlowType[];
export type FlowDictionaryType =
  | FlowDictionaryObjectType
  | FlowDictionaryArrayType;
export type FlowDictionaryObjectType = { [key: string]: FlowType };
export type FlowDictionaryArrayType = { key: FlowType; value: FlowType }[];
