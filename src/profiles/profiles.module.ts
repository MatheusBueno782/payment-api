import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProfilesModel } from './models/profiles.model';
import { ProfileGuard } from './guards/profile.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [SequelizeModule.forFeature([ProfilesModel])],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ProfileGuard,
    },
  ],
})
export class ProfilesModule {}
