import * as fcl from '@onflow/fcl';

export const PayerAuthzKey = 'floo_payer_authz';
export const ProposerAuthzKey = 'floo_proposer_authz';
export const AuthorizationsAuthzKey = 'floo_authorizations_authz';

type Authz = (account: unknown) => Promise<unknown>;

interface SetAuthzOptions {
  payer?: Authz;
  proposer?: Authz;
  authorizations?: Authz[];
}

export const setAuthz = async (authz: SetAuthzOptions | Authz) => {
  const authzIsFunction = typeof authz === 'function';
  await Promise.all([
    setPayerAuthz(authzIsFunction ? authz : authz.payer),
    setProposerAuthz(authzIsFunction ? authz : authz.proposer),
    setAuthorizationsAuthz(authzIsFunction ? [authz] : authz.authorizations),
  ]);
};

export const setPayerAuthz = async (authz?: Authz) =>
  fcl.config().put(PayerAuthzKey, authz);

export const setProposerAuthz = async (authz?: Authz) =>
  fcl.config().put(ProposerAuthzKey, authz);

export const setAuthorizationsAuthz = async (authz?: Authz[]) =>
  fcl.config().put(AuthorizationsAuthzKey, authz);
