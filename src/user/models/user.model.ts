import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { ModelOptions, Prop } from '@typegoose/typegoose';
import { IsEmail, IsUrl } from 'class-validator';

import { toJSON } from '../../utils';
import { ApiProperty } from '@nestjs/swagger';

export const UserCollection = 'users';

export interface User extends Base {}

@ModelOptions({
  schemaOptions: {
    collection: UserCollection,
    toJSON,
  },
})
export class User extends TimeStamps {
  /** Идентификатор пользователя */
  @ApiProperty({
    description: 'Идентификатор пользователя',
    example: '621e83bc3b4e54c81af4f3ed',
  })
  id: string;

  /** Имя пользователя */
  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Иванов Иван Иванович',
  })
  @Prop({ type: String, required: true })
  name: string;

  /** Фотография пользователя */
  @ApiProperty({ description: 'Фотография пользователя', example: '' })
  @Prop({ type: String, default: null })
  @IsUrl()
  photo: string;

  /** Электронная почта */
  @ApiProperty({ description: 'Электронная почта', example: 'root@email.com' })
  @Prop({ type: String, unique: true, required: true })
  @IsEmail()
  email: string;

  /** Захэшированный пароль */
  @Prop({ type: String, required: true, select: false })
  hashedPassword: string;

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
