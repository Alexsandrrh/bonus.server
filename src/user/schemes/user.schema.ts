import { User } from '../models';
import { ApiProperty } from '@nestjs/swagger';

export class UserSchema extends User {
  /** Идентификатор пользователя */
  @ApiProperty({
    description: 'Идентификатор пользователя',
    format: 'uuid',
  })
  id: string;

  /** Дата создания пользователя */
  @ApiProperty({
    description: 'Дата создания пользователя',
    type: Date,
  })
  createdAt: Date;

  /** Дата последнего изменения информации о пользователе */
  @ApiProperty({
    description: 'Дата последнего изменения информации о пользователе',
    type: Date,
  })
  updatedAt: Date;
}

export type UserSchemaType = UserSchema | User;
