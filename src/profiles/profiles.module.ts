import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProfilesModel } from './models';

@Module({
  imports: [SequelizeModule.forFeature([ProfilesModel])],
})
export class ProfilesModule {}
