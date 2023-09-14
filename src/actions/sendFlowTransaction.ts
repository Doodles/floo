import * as fcl from '@onflow/fcl';

import {
  TransactionSubscriber,
  formatFlowAddress,
  generateAuthorizationFunction,
  parseFlowArgs,
} from '../helpers';
import { AuthorizationFunction, FlowType } from '../interfaces';
import { XOR } from '../types';

export type SendFlowTransactionProps = XOR<
  SendFlowTransactionAuthorizationsProps,
  SendFlowTransactionPrivateKeyProps
>;

export interface SendFlowTransactionAuthorizationsProps {
  code: string;
  args?: FlowType[];
  limit?: number;
  auth?: {
    payer?: AuthorizationFunction;
    proposer?: AuthorizationFunction;
    authorizations?: AuthorizationFunction[];
  };
}

export interface SendFlowTransactionPrivateKeyProps {
  code: string;
  args?: FlowType[];
  limit?: number;
  auth: {
    address: string;
    privateKey: string;
    keyIndex?: number;
  };
}

export const sendFlowTransaction = async (
  options: SendFlowTransactionProps,
): Promise<TransactionSubscriber> => {
  const parsedAuth = parseAuth(options);

  const transactionId = await fcl.mutate({
    cadence: options.code,
    limit: options.limit,
    payer: parsedAuth.payer,
    proposer: parsedAuth.proposer,
    authorizations: parsedAuth.authorizations,
    args: parseFlowArgs({ code: options.code, args: options.args ?? [] }),
  });

  return new TransactionSubscriber(transactionId);
};

const parseAuth = ({ auth }: SendFlowTransactionProps) => {
  if (!auth) {
    return {
      payer: fcl.authz,
      proposer: fcl.authz,
      authorizations: [fcl.authz],
    };
  }

  if ('privateKey' in auth) {
    const authorizationFunction = generateAuthorizationFunction({
      address: formatFlowAddress(auth.address, true),
      privateKey: auth.privateKey,
      keyIndex: auth.keyIndex,
    });
    return {
      payer: authorizationFunction,
      proposer: authorizationFunction,
      authorizations: [authorizationFunction],
    };
  } else {
    return {
      payer: auth.payer ?? fcl.authz,
      proposer: auth.proposer ?? fcl.authz,
      authorizations: auth.authorizations ?? [fcl.authz],
    };
  }
};
