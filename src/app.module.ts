import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { TypegooseModule } from 'nestjs-typegoose';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ConfigServiceInterface } from './types';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.string().default(3000),
        DATABASE_URI: Joi.string().default(
          'mongodb://localhost:27017/bonus-db',
        ),
        ACCESS_TOKEN_SECRET: Joi.string().default('secret_key'),
      }),
    }),
    TypegooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigServiceInterface) => ({
        uri: configService.get<string>('DATABASE_URI'),
      }),
    }),
    AuthModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
