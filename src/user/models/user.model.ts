import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { ModelOptions, Prop } from '@typegoose/typegoose';
import { IsEmail, IsUrl } from 'class-validator';

export const UserCollection = 'users';

export interface User extends Base {}

@ModelOptions({
  schemaOptions: {
    collection: UserCollection,
  },
})
export class User extends TimeStamps {
  /** Имя пользователя */
  @Prop({ type: String, required: true })
  name: string;

  /** Фотография пользователя */
  @Prop({ type: String, default: null })
  @IsUrl()
  photo: string;

  /** Электронная почта */
  @Prop({ type: String, unique: true, required: true })
  @IsEmail()
  email: string;

  /** Захэшированный пароль */
  @Prop({ type: String, required: true, select: false })
  hashedPassword: string;
}
