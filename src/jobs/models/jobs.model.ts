import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ContractsModel } from '../../contracts';

@Table({ tableName: 'Jobs' })
export class JobsModel extends Model {
  @AllowNull(false)
  @Column(DataType.TEXT)
  description: string;

  @AllowNull(false)
  @Column({ type: DataType.DECIMAL(12, 2) })
  price: number;

  @Column
  paid: boolean;

  @Column
  paymentDate: Date;

  @ForeignKey(() => ContractsModel)
  @Column
  ContractId: number;

  @BelongsTo(() => ContractsModel)
  contract: ContractsModel;
}
