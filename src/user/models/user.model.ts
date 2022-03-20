import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { ModelOptions, Prop } from '@typegoose/typegoose';
import { IsEmail, IsUrl } from 'class-validator';

import { toJSON } from '../../utils';
import { ApiProperty } from '@nestjs/swagger';

export const UserModelName = 'User';
export const UserCollection = 'users';

export interface User extends Base {}

@ModelOptions({
  options: { customName: UserModelName },
  schemaOptions: {
    collection: UserCollection,
    toJSON,
  },
})
export class User extends TimeStamps {
  /**
   * Имя пользователя
   * */
  @ApiProperty({
    title: 'Имя пользователя',
    example: 'Иванов Иван Иванович',
  })
  @Prop({ type: String, required: true })
  name: string;

  /**
   * Фотография пользователя
   * */
  @ApiProperty({
    title: 'Фотография пользователя',
    example: 'https://avatars.dicebear.com/api/human/yard.svg',
  })
  @Prop({
    type: String,
    default: 'https://avatars.dicebear.com/api/human/yard.svg',
  })
  @IsUrl()
  photo: string;

  /**
   * Электронная почта
   * */
  @ApiProperty({ title: 'Электронная почта', example: 'root@email.com' })
  @Prop({ type: String, unique: true, required: true })
  @IsEmail()
  email: string;

  /**
   * Баланс пользователя
   * */
  @Prop({ type: Number, default: 0, select: false })
  balance: number;

  /**
   * Захэшированный пароль
   * */
  @Prop({ type: String, required: true, select: false })
  hashedPassword: string;
}
