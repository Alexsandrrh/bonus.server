import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { OperationController } from './operation.controller';
import { OperationService } from './operation.service';
import { Operation } from './models';

@Module({
  imports: [TypegooseModule.forFeature([Operation])],
  controllers: [OperationController],
  providers: [OperationService],
  exports: [OperationService],
})
export class OperationModule {}
