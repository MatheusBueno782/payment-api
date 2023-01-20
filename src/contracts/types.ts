import { contractStatusConstant } from './constants/contract-status.constant';

export type ContractStatus = (typeof contractStatusConstant)[number];
