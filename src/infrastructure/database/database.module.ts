import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { getTypeOrmOptions } from './helpers/getTypeOrmOptions';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getTypeOrmOptions,
      inject: [ConfigService],
    }),
  ],
})
export class DataBaseModule {}
