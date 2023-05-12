import { NestFactory } from '@nestjs/core';
import { INestMicroservice, ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { join } from 'node:path';

import { AppModule } from './app.module';
import { protobufPackage } from './proto/user.pb';

async function bootstrap() {
  const app: INestMicroservice = await NestFactory.createMicroservice(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: 'localhost:50052',
        package: protobufPackage,
        protoPath: join(
          'node_modules/grpc-nest-proto/proto/event-broker.proto',
        ),
      },
      bufferLogs: true,
    },
  );

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  await app.listen();
}

bootstrap();
