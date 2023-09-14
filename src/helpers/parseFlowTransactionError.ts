import { FlowTransactionError } from '../interfaces';

export const parseFlowTransactionError = (
  errorMessage: string | undefined,
): FlowTransactionError => {
  if (!errorMessage) {
    return {
      type: 'unknownError',
      message: 'Unknown error',
    };
  }
  if (errorMessage.startsWith('Declined:')) {
    return {
      type: 'closedPopUpError',
      message: errorMessage,
    };
  }
  return {
    type: 'transactionError',
    message: errorMessage,
  };
};
