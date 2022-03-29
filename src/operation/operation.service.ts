import { Inject, Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';

import { Operation } from './models';
import { OperationsOkResponse, OperationSuccessOkResponse } from './responses';
import { User, UserModelName } from '../user/models';
import { PAYMENT_TYPE } from './const';
import { UserService } from '../user/user.service';
import { CreateUserPurchaseDto, CreateUserTransferDto } from './dto';
import { OperationSuccessSchema } from './schemes';
import { ProductService } from '../product/product.service';
import { ProductModelName } from '../product/models';

@Injectable()
export class OperationService {
  constructor(
    @InjectModel(Operation)
    private readonly operationModel: ModelType<Operation>,
    @Inject(UserService) private readonly userService: UserService,
    @Inject(ProductService) private readonly productService: ProductService,
  ) {}

  /**
   * Получить все операции пользователя
   * */
  getUserOperations = (userId: string) =>
    this.operationModel
      .find({
        $or: [
          {
            incomingAccount: new Types.ObjectId(userId),
            incomingAccountType: UserModelName,
          },
          {
            outgoingAccount: new Types.ObjectId(userId),
            outgoingAccountType: UserModelName,
          },
        ],
      })
      .exec();

  /**
   * Получить баланс пользователя
   * */
  getUserBalance = async (userId: string): Promise<number> => {
    return (await this.getUserOperations(userId)).reduce(
      (
        result,
        {
          incomingAccount,
          incomingAccountType,
          paymentAmount,
          outgoingAccount,
          outgoingAccountType,
        },
      ) => {
        if (
          incomingAccountType === UserModelName &&
          incomingAccount.id === userId
        )
          return result + paymentAmount;
        else if (
          outgoingAccountType === UserModelName &&
          outgoingAccount?.id === userId
        ) {
          return result - paymentAmount;
        }

        return result;
      },
      0,
    );
  };

  /**
   * Проверить на принадлежность переводимой суммы
   * */
  getBalanceAfterSpend = async (userId: string, paymentAmount: number) => {
    const balance = await this.getUserBalance(userId);
    const subtract = balance - Math.abs(paymentAmount);
    if (subtract < 0)
      throw new NotAcceptableException(
        'Не достаточно средств на балансе пользователя!',
      );
    return subtract;
  };

  /**
   * Создать операцию
   * */
  createOperation = async (
    params: Omit<Operation, 'id' | 'createdAt' | 'updatedAt'>,
  ) => {
    const operation = await this.operationModel.create(params);
    return this.operationModel.findById(operation.id);
  };

  /**
   * Создать подарок
   * */
  createPresent = async (
    user: User,
    paymentAmount = 500,
  ): Promise<OperationSuccessSchema> => {
    const performedOperation = await this.createOperation({
      incomingAccount: user.id,
      incomingAccountType: UserModelName,
      outgoingAccount: null,
      outgoingAccountType: null,
      paymentAmount,
      paymentType: PAYMENT_TYPE.present,
    });

    const userCurrentBalance = await this.getUserBalance(user.id);

    await this.userService.updateUserBalance(user.id, userCurrentBalance);

    return { userCurrentBalance, performedOperation };
  };

  /**
   * Создать перевод
   * */
  createTransfer = async (
    userId: string,
    { incomingAccount, paymentAmount }: CreateUserTransferDto,
  ): Promise<OperationSuccessSchema> => {
    const userCurrentBalance = await this.getBalanceAfterSpend(
      userId,
      paymentAmount,
    );

    const performedOperation = await this.createOperation({
      incomingAccount,
      incomingAccountType: UserModelName,
      outgoingAccount: userId,
      outgoingAccountType: UserModelName,
      paymentType: PAYMENT_TYPE.transfer,
      paymentAmount,
    });

    await this.userService.updateUserBalance(userId, userCurrentBalance);
    await this.userService.updateUserBalance(
      incomingAccount,
      await this.getUserBalance(incomingAccount),
    );

    return {
      userCurrentBalance,
      performedOperation,
    };
  };

  /**
   * Создать покупку товара
   * */
  createPurchase = async (
    userId: string,
    { productId }: CreateUserPurchaseDto,
  ): Promise<OperationSuccessSchema> => {
    const product = await this.productService.getProductById(productId);

    const userCurrentBalance = await this.getBalanceAfterSpend(
      userId,
      product.price,
    );

    const performedOperation = await this.createOperation({
      incomingAccount: product.id,
      incomingAccountType: ProductModelName,
      outgoingAccount: userId,
      outgoingAccountType: UserModelName,
      paymentType: PAYMENT_TYPE.purchase,
      paymentAmount: product.price,
    });

    return {
      userCurrentBalance,
      performedOperation,
    };
  };

  /**
   * Создать ответ по операциям
   * */
  buildOperationsResponse = (
    operations: Operation[],
  ): OperationsOkResponse => ({
    response: operations,
  });

  /**
   * Создать ответ по успешной операции
   * */
  buildOperationOkResponse = (
    operation: OperationSuccessSchema,
  ): OperationSuccessOkResponse => {
    return {
      response: operation,
    };
  };
}
