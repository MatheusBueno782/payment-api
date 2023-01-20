import {
  Model,
  Table,
  Column,
  AllowNull,
  DataType,
  HasMany,
} from 'sequelize-typescript';
import { ProfileType } from '../types';
import { profileTypeConstant } from '../profile.constant';
import { ContractsModel } from '../../contracts/models/contracts.model';

@Table({ modelName: 'Profiles' })
export class ProfilesModel extends Model {
  @AllowNull(false)
  @Column
  firstName: string;

  @AllowNull(false)
  @Column
  lastName: string;

  @AllowNull(false)
  @Column
  profession: string;

  @Column({ type: DataType.DECIMAL(12, 2) })
  balance: number;

  @Column(DataType.ENUM(...profileTypeConstant))
  type: ProfileType;

  @HasMany(() => ContractsModel, {
    as: 'Contractor',
    foreignKey: 'ContractorId',
  })
  contractors: ContractsModel[];

  @HasMany(() => ContractsModel, {
    as: 'Client',
    foreignKey: 'ClientId',
  })
  clients: ContractsModel[];
}
