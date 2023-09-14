export interface FlowTransactionError {
  type: FlowTransactionErrorType;
  message: string;
}

export type FlowTransactionErrorType =
  | 'unknownError'
  | 'transactionError'
  | 'closedPopUpError';
