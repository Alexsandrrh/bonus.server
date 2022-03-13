import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { Types } from 'mongoose';

import { User } from './models';
import { UserWithAmountOkResponse } from './responses';
import { UsersOkResponse } from './responses/usersOk.response';
import { UserWithAmountSchemaType } from './schemes';
import { OperationCollection } from '../operation/models';

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
   * Получение пользователя с дополнительными информационными полями
   * */
  getAggregatedUser = async (userId: string) => {
    const [user] = await this.userModel.aggregate<UserWithAmountSchemaType>([
      { $match: { _id: new Types.ObjectId(userId) } },
      {
        $lookup: {
          from: OperationCollection,
          as: 'incoming',
          pipeline: [
            {
              $match: {
                incomingAccount: new Types.ObjectId(userId),
                incomingAccountType: 'UserModel',
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: OperationCollection,
          as: 'outgoing',
          pipeline: [
            {
              $match: {
                outgoingAccount: new Types.ObjectId(userId),
                outgoingAccountType: 'UserModel',
              },
            },
          ],
        },
      },
      {
        $addFields: {
          id: '$_id',
          amount: {
            $subtract: [
              {
                $sum: '$incoming.paymentAmount',
              },
              {
                $sum: '$outgoing.paymentAmount',
              },
            ],
          },
        },
      },
      {
        $project: {
          _id: 0,
          __v: 0,
          hashedPassword: 0,
          outgoing: 0,
          incoming: 0,
        },
      },
    ]);

    if (!user) throw new NotFoundException('Пользователь не найден!');

    return user;
  };

  /**
   * Получить всех пользователей без авторизированного пользователя
   * */
  getUsersWithoutAuthUser = (userId: string) =>
    this.userModel.find({ _id: { $ne: userId } });

  /**
   * Создать ответ пользователя
   * */
  buildUserOkResponse = (user: User): UserWithAmountOkResponse => ({
    response: user,
  });

  /**
   * Создать ответ пользователей
   * */
  buildUsersOkResponse = (users: User[]): UsersOkResponse => ({
    response: users,
  });
}
