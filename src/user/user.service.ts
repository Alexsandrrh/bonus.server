import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';

import { User } from './models';
import { UserOkResponse } from './responses';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private readonly userModel: ModelType<User>) {}

  /**
   * Получить пользователя через id
   * */
  getUser = (userId: string) =>
    this.userModel
      .findById(userId)
      .orFail(new NotFoundException('Пользователь не найден!'));

  /**
   * Создать ответ пользователя
   * */
  buildUserResponse = (user: User): UserOkResponse => ({ response: user });
}
