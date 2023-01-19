import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JobsModel } from './models';

@Module({
  imports: [SequelizeModule.forFeature([JobsModel])],
})
export class JobsModule {}
