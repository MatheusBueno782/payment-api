import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JobsModel } from './models/jobs.model';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';

@Module({
  imports: [SequelizeModule.forFeature([JobsModel])],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}
