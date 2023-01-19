import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ContractsModel } from './models';

@Module({
  imports: [SequelizeModule.forFeature([ContractsModel])],
})
export class ContractsModule {}
