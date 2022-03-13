import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';

import { User } from './models';
import { UserOkResponse } from './responses';
import { UsersOkResponse } from './responses/usersOk.response';

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
   * Получить всех пользователей без авторизированного пользователя
   * */
  getUsersWithoutAuthUser = (userId: string) =>
    this.userModel.find({ _id: { $ne: userId } });

  /**
   * Создать ответ пользователя
   * */
  buildUserOkResponse = (user: User): UserOkResponse => ({ response: user });

  /**
   * Создать ответ пользователей
   * */
  buildUsersOkResponse = (users: User[]): UsersOkResponse => ({
    response: users,
  });
}
