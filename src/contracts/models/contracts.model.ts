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
import { contractStatusConstant } from '../constants/contract-status.constant';
import { ProfilesModel } from '../../profiles/models/profiles.model';
import { JobsModel } from '../../jobs/models/jobs.model';

@Table({ tableName: 'Contracts' })
export class ContractsModel extends Model {
  @AllowNull(false)
  @Column(DataType.TEXT)
  terms: string;

  @Column(DataType.ENUM(...contractStatusConstant))
  status: ContractStatus;

  @ForeignKey(() => ProfilesModel)
  @Column
  ContractorId: number;

  @BelongsTo(() => ProfilesModel, { as: 'Contractor' })
  contractor: ProfilesModel;

  @ForeignKey(() => ProfilesModel)
  @Column
  ClientId: number;

  @BelongsTo(() => ProfilesModel, { as: 'Client' })
  client: ProfilesModel;

  @HasMany(() => JobsModel)
  jobs: JobsModel[];
}
