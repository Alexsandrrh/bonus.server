import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { TypegooseModule } from 'nestjs-typegoose';

import { ConfigServiceInterface } from './types';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AuthMiddleware } from './auth/auth.middleware';

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
    UserModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
