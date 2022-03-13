import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from '../user/models';
import { OperationModule } from '../operation/operation.module';

@Module({
  imports: [TypegooseModule.forFeature([User]), OperationModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
