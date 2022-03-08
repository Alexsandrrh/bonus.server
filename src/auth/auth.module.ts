import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from '../user/models';

@Module({
  imports: [TypegooseModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
