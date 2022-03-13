import { ApiProperty } from '@nestjs/swagger';

import { UserSchema } from './user.schema';
import { User } from '../models';

export class UserWithAmountSchema extends UserSchema {
  /** Сумма на счете пользователя */
  @ApiProperty({ type: Number, description: 'Сумма на счете пользователя' })
  amount: number;
}

export type UserWithAmountSchemaType = UserWithAmountSchema | User;
