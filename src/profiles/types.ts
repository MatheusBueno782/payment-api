import { profileTypeConstant } from './constants/profile.constant';

export type ProfileType = (typeof profileTypeConstant)[number];
