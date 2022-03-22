import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { OperationController } from './operation.controller';
import { OperationService } from './operation.service';
import { Operation } from './models';
import { UserModule } from '../user/user.module';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [TypegooseModule.forFeature([Operation]), UserModule, ProductModule],
  controllers: [OperationController],
  providers: [OperationService],
  exports: [OperationService],
})
export class OperationModule {}
