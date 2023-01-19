import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfilesModule } from './profiles/profiles.module';
import { SequelizeModule } from '@nestjs/sequelize';

import { ContractsModule } from './contracts/contracts.module';
import { JobsModule } from './jobs/jobs.module';
import { ProfilesModel } from './profiles';
import { ContractsModel } from './contracts';
import { JobsModel } from './jobs';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: './database.sqlite3',
      models: [ProfilesModel, ContractsModel, JobsModel],
    }),
    ProfilesModule,
    ContractsModule,
    JobsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
