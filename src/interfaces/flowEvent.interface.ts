export interface FlowEvent {
  type: string;
  transactionId: string;
  transactionIndex: number;
  eventIndex: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}
