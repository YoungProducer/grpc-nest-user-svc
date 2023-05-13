import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './config/configuration';
import { DataBaseModule } from './infrastructure/database/database.module';
import { LoggerModule } from 'nestjs-pino';
import { UserModule } from './domain/user/user.module';

@Module({
  imports: [
    UserModule,
    DataBaseModule,
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: './configs/development.env',
      isGlobal: true,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
        transport:
          process.env.NODE_ENV !== 'production'
            ? { target: 'pino-pretty' }
            : undefined,
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
