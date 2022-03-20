import { ApiProperty } from '@nestjs/swagger';

import { User } from '../models';
import { UserSchema } from './user.schema';

export class UserWithBalanceSchema extends UserSchema {
  /**
   * Баланс пользователя
   * */
  @ApiProperty({ title: 'Баланс пользователя' })
  balance: number;
}

export type UserWithBalanceSchemaType = UserWithBalanceSchema | User;
