import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { OperationModule } from './operation/operation.module';
import { ProductModule } from './product/product.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    AuthModule,
    UserModule,
    OperationModule,
    ProductModule,
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
