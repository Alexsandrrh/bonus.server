import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';

import { Operation } from './models';
import { OperationsOkResponse } from './responses';

@Injectable()
export class OperationService {
  constructor(
    @InjectModel(Operation)
    private readonly operationModel: ModelType<Operation>,
  ) {}

  /**
   * Получить все операции пользователя
   * */
  getUserOperations = (userId: string) =>
    this.operationModel.find({ $or: [{ to: userId }, { from: userId }] });

  /**
   * Создать ответ по операциям
   * */
  buildOperationsResponse = (
    operations: Operation[],
  ): OperationsOkResponse => ({
    response: operations,
  });
}
