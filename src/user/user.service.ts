import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { Types } from 'mongoose';

import { User } from './models';
import { UserWithBalanceOkResponse, UsersOkResponse } from './responses';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private readonly userModel: ModelType<User>) {}

  /**
   * Получить пользователя через id
   * */
  getUser = (userId: string) =>
    this.userModel
      .findById(userId)
      .select('+balance')
      .orFail(new NotFoundException('Пользователь не найден!'));

  /**
   * Получить всех пользователей без авторизированного пользователя
   * */
  getUsersWithoutAuthUser = (userId: string) =>
    this.userModel.find({ _id: { $ne: new Types.ObjectId(userId) } });

  /**
   * Обновить баланс пользователя
   * */
  updateUserBalance = (userId: string, balance: number) =>
    this.userModel
      .findByIdAndUpdate(userId, { $set: { balance } }, { new: true })
      .select('+balance');
  /**
   * Создать ответ пользователя
   * */
  buildUserOkResponse = (user: User): UserWithBalanceOkResponse => ({
    response: user,
  });

  /**
   * Создать ответ пользователей
   * */
  buildUsersOkResponse = (users: User[]): UsersOkResponse => ({
    response: users,
  });
}
