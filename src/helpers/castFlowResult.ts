export const castFlowResult = <T>(result: unknown): T => {
  // TODO - this should be extracted and verified from the script code.
  // Cadut library don't have this feature yet.
  // So maybe regex is a good option.
  if (typeof result === 'string' && !isNaN(result as unknown as number)) {
    return Number(result) as T;
  }
  return result as T;
};
