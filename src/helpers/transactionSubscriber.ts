import * as fcl from '@onflow/fcl';
import { TransactionStatus } from '@onflow/fcl/types/transaction';

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
      .subscribe((transactionStatus: TransactionStatus) => {
        if (this.finished) {
          return;
        }
        if (!this.firstStatusEmitted) {
          this.firstStatusEmitted = true;
          cb({
            status: 'pending',
            transactionId: this.transactionId,
          });
        } else if (transactionStatus.errorMessage !== '') {
          this.finished = true;
          cb({
            status: 'error',
            transactionId: this.transactionId,
            blockId: transactionStatus.blockId,
            error: parseFlowTransactionError(transactionStatus.errorMessage),
          });
          unsubscribe();
        } else if (transactionStatus.statusString === 'SEALED') {
          this.finished = true;
          cb({
            status: 'sealed',
            transactionId: this.transactionId,
            blockId: transactionStatus.blockId,
            events: transactionStatus.events,
          });
          unsubscribe();
        }
      });
    return unsubscribe;
  }
}
