/* eslint-disable @typescript-eslint/no-explicit-any */
import * as fcl from '@onflow/fcl';
import { ec as EC } from 'elliptic';
import { SHA3 } from 'sha3';

const ec = new EC('p256');

export interface GenerateAuthorizationFunctionProps {
  address: string;
  privateKey: string;
  keyIndex?: number;
}

export const generateAuthorizationFunction = ({
  address,
  privateKey,
  keyIndex = 0,
}: GenerateAuthorizationFunctionProps) => {
  if (!address) {
    throw new Error('No address provided');
  }
  if (!privateKey) {
    throw new Error('No private key provided');
  }
  if (!keyIndex && keyIndex !== 0) {
    throw new Error('No key index provided');
  }

  return async (account: any) => {
    const user = await fcl.account(address);
    const key = user.keys[keyIndex];
    if (!key) {
      throw new Error(
        `Account ${address} does not have key with index ${keyIndex}`,
      );
    }
    if (key.revoked) {
      throw new Error(
        `Key with index ${keyIndex} of account ${address} has been revoked`,
      );
    }
    let sequenceNum;
    if (account.role.proposer) {
      sequenceNum = key.sequenceNumber;
    }
    const signingFunction = async (data: any) => {
      return {
        addr: user.address,
        keyId: key.index,
        signature: signWithKey(privateKey, data.message),
      };
    };
    return {
      ...account,
      tempId: `${user.address}-${key.index}`,
      addr: user.address,
      keyId: key.index,
      sequenceNum,
      signature: account.signature || null,
      signingFunction,
      resolve: null,
      roles: account.roles,
    };
  };
};

const signWithKey = (privateKey: string, message: string) => {
  const key = ec.keyFromPrivate(Buffer.from(privateKey, 'hex'));
  const sig = key.sign(hashMessage(message));
  const n = 32;
  const r = sig.r.toArrayLike(Buffer, 'be', n);
  const s = sig.s.toArrayLike(Buffer, 'be', n);
  return Buffer.concat([r, s]).toString('hex');
};

const hashMessage = (message: string) => {
  const sha = new SHA3(256);
  sha.update(Buffer.from(message, 'hex'));
  return sha.digest();
};
