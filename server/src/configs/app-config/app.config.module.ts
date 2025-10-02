import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './app.config';
//import { DatabaseConfig } from '../database-config/database-config.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: ['.env'],
    }),
    //DatabaseConfig,
  ],
})
export class AppConfigModule {}
