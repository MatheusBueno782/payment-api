import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ContractStatus } from '../types';
import { contractStatusConstant } from '../constants';
import { ProfilesModel } from '../../profiles';
import { JobsModel } from '../../jobs';

@Table({ tableName: 'Contracts' })
export class ContractsModel extends Model {
  @AllowNull(false)
  @Column(DataType.TEXT)
  terms: string;

  @Column(DataType.ENUM(...contractStatusConstant))
  status: ContractStatus;

  @BelongsTo(() => ProfilesModel, { as: 'Contractor' })
  contractor: ProfilesModel;

  @ForeignKey(() => ProfilesModel)
  @Column
  ClientId: number;

  @ForeignKey(() => ProfilesModel)
  @Column
  ContractorId: number;

  @BelongsTo(() => ProfilesModel, { as: 'Client' })
  client: ProfilesModel;

  @HasMany(() => JobsModel)
  jobs: JobsModel[];
}
