import * as fcl from '@onflow/fcl';

import { Authz } from '../interfaces';

export const getDefaultAuthz = async (): Promise<Authz> => await fcl.authz;
