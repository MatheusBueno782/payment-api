import { contractStatusConstant } from './constants';

export type ContractStatus = (typeof contractStatusConstant)[number];
