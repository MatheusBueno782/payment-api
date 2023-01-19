import {
  Model,
  Table,
  Column,
  AllowNull,
  DataType,
} from 'sequelize-typescript';
import { ProfileType } from '../types';
import { profileTypeConstant } from '../constants';

@Table({ modelName: 'Profile' })
export class ProfilesModel extends Model {
  @Column
  @AllowNull(false)
  firstName: string;

  @Column
  @AllowNull(false)
  lastName: string;

  @Column
  @AllowNull(false)
  profession: string;

  @Column({ type: DataType.DECIMAL(12, 2) })
  balance: number;

  @Column(DataType.ENUM(...profileTypeConstant))
  type: ProfileType;
}
