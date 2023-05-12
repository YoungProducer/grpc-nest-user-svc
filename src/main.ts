import { NestFactory } from '@nestjs/core';
import { INestMicroservice, ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { join } from 'node:path';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app.module';
import { protobufPackage } from './proto/user.pb';
import { RpcExceptionFilter } from './lib/filters/rpc-exception.filter';
import { HttpExceptionFilter } from './lib/filters/http-exception.filter';
import { PGExceptionFilter } from './lib/filters/pg-exception.filter';

async function bootstrap() {
  const app: INestMicroservice = await NestFactory.createMicroservice(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: 'localhost:50053',
        package: protobufPackage,
        protoPath: join('node_modules/grpc-nest-proto/proto/user.proto'),
      },
      bufferLogs: true,
    },
  );

  app.useLogger(app.get(Logger));
  app.useGlobalFilters(
    new PGExceptionFilter(),
    new RpcExceptionFilter(),
    new HttpExceptionFilter(),
  );
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  await app.listen();
}

bootstrap();
