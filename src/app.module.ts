import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfilesModule } from './profiles/profiles.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProfilesModel } from './profiles';
import { ContractsModule } from './contracts/contracts.module';

@Module({
  imports: [
    ProfilesModule,
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: './database.sqlite3',
      models: [ProfilesModel],
    }),
    ContractsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
