import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { JobsModel } from '../jobs/models/jobs.model';

@Module({
  imports: [SequelizeModule.forFeature([JobsModel])],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
