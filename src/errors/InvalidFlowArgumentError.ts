export class InvalidFlowArgumentError extends Error {
  constructor(
    public argName: string,
    public value: unknown,
    public reason: string,
    public index: number,
  ) {
    const formattedValue = typeof value === 'string' ? `"${value}"` : value;
    super(
      `Invalid argument '${argName}' at index ${index}. ${reason}. Current value is ${formattedValue}.`,
    );
  }
}
