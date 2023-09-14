import * as fcl from '@onflow/fcl';

import { FlowEvent, FlowTransactionError } from '../interfaces';
import { parseFlowTransactionError } from './parseFlowTransactionError';

export interface FlowTransactionStatusPending {
  status: 'pending';
  transactionId: string;
}

export interface FlowTransactionStatusSealed {
  status: 'sealed';
  transactionId: string;
  blockId: string;
  events: FlowEvent[];
}

export interface FlowTransactionStatusError {
  status: 'error';
  transactionId: string;
  blockId: string;
  error: FlowTransactionError;
}

export type FlowTransactionStatus =
  | FlowTransactionStatusPending
  | FlowTransactionStatusSealed
  | FlowTransactionStatusError;

export interface IFclTransactionStatus {
  blockId: string;
  errorMessage: string;
  status: number;
  statusCode: number;
  statusString: string;
  events: FlowEvent[];
}

export interface TransactionSealedResult {
  transactionId: string;
  blockId: string;
  events: FlowEvent[];
}

export class TransactionSubscriber {
  private firstStatusEmitted = false;
  private finished = false;

  constructor(readonly transactionId: string) {}

  async wait(): Promise<TransactionSealedResult> {
    const transactionSealed = await fcl.tx(this.transactionId).onceSealed();
    return {
      transactionId: this.transactionId,
      blockId: transactionSealed.blockId,
      events: transactionSealed.events,
    };
  }

  subscribe(
    cb: (transactionStatus: FlowTransactionStatus) => void,
  ): () => void {
    const unsubscribe = fcl
      .tx(this.transactionId)
      .subscribe((fclTransactionStatus: IFclTransactionStatus) => {
        if (this.finished) {
          return;
        }
        if (!this.firstStatusEmitted) {
          this.firstStatusEmitted = true;
          cb({
            status: 'pending',
            transactionId: this.transactionId,
          });
        } else if (fclTransactionStatus.errorMessage !== '') {
          this.finished = true;
          cb({
            status: 'error',
            transactionId: this.transactionId,
            blockId: fclTransactionStatus.blockId,
            error: parseFlowTransactionError(fclTransactionStatus.errorMessage),
          });
          unsubscribe();
        } else if (fclTransactionStatus.statusString === 'SEALED') {
          this.finished = true;
          cb({
            status: 'sealed',
            transactionId: this.transactionId,
            blockId: fclTransactionStatus.blockId,
            events: fclTransactionStatus.events,
          });
          unsubscribe();
        }
      });
    return unsubscribe;
  }
}
