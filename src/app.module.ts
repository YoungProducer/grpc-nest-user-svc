import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { DataBaseModule } from './infrastructure/database/database.module';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: './configs/development.env',
      isGlobal: true,
    }),
    DataBaseModule,
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
        // install 'pino-pretty' package in order to use the following option
        transport:
          process.env.NODE_ENV !== 'production'
            ? { target: 'pino-pretty' }
            : undefined,

        // and all the other fields of:
        // - https://github.com/pinojs/pino-http#api
        // - https://github.com/pinojs/pino/blob/HEAD/docs/api.md#options-object
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
