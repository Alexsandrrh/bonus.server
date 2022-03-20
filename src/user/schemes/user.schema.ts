import { User } from '../models';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class UserSchema extends User {
  /**
   * Идентификатор пользователя
   * */
  @ApiProperty({
    title: 'Идентификатор пользователя',
    example: new Types.ObjectId(),
  })
  id: string;

  /**
   * Дата создания пользователя
   * */
  @ApiProperty({
    title: 'Дата создания пользователя',
    type: Date,
  })
  createdAt: Date;

  /**
   * Дата последнего изменения информации о пользователе
   * */
  @ApiProperty({
    title: 'Дата последнего изменения информации о пользователе',
    type: Date,
  })
  updatedAt: Date;
}

export type UserSchemaType = UserSchema | User;
