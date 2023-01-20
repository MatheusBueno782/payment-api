import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ContractsModel } from './models/contracts.model';
import { ContractsController } from './contracts.controller';
import { ContractsService } from './contracts.service';

@Module({
  imports: [SequelizeModule.forFeature([ContractsModel])],
  controllers: [ContractsController],
  providers: [ContractsService],
})
export class ContractsModule {}
