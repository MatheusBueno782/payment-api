import { Module } from '@nestjs/common';
import { ProfilesModule } from './profiles/profiles.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ContractsModule } from './contracts/contracts.module';
import { JobsModule } from './jobs/jobs.module';
import { ProfilesModel } from './profiles/models/profiles.model';
import { ContractsModel } from './contracts/models/contracts.model';
import { JobsModel } from './jobs/models/jobs.model';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ProfilesModule,
    ContractsModule,
    JobsModule,
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: './database.sqlite3',
      models: [JobsModel, ContractsModel, ProfilesModel],
    }),
    AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
