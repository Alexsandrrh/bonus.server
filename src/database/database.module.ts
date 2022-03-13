import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ConfigService } from '@nestjs/config';

import { ConfigServiceInterface } from '../types';

@Module({
  imports: [
    TypegooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigServiceInterface) => ({
        uri: configService.get<string>('DATABASE_URI'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
