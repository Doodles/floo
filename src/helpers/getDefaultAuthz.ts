import * as fcl from '@onflow/fcl';

import { Authz } from '../interfaces';

export const getDefaultAuthz = (): Authz => fcl.authz;
