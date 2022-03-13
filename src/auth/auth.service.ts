import {
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { compare, genSalt, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';

import { User } from '../user/models';
import { ConfigServiceInterface } from '../types';
import { AuthRegisterDto } from './dto';
import { OperationService } from '../operation/operation.service';
import { PAYMENT_TYPE } from '../operation/consts';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly userModel: ModelType<User>,
    @Inject(OperationService)
    private readonly operationService: OperationService,
    @Inject(ConfigService)
    private readonly configService: ConfigServiceInterface,
  ) {}

  /**
   * Зашифровать пароль пользователя
   * */
  hashPassword = async (password: string) => {
    const salt = await genSalt(10);
    return await hash(password, salt);
  };

  /**
   * Создать пользователя
   * */
  createUser = async ({ password, ...authRegisterDto }: AuthRegisterDto) => {
    const hashedPassword = await this.hashPassword(password);
    const user = await this.userModel.create({
      ...authRegisterDto,
      hashedPassword,
    });

    await this.operationService.createOperation({
      incomingAccount: user.id,
      incomingAccountType: 'UserModel',
      outgoingAccount: null,
      outgoingAccountType: null,
      paymentAmount: 500,
      paymentType: PAYMENT_TYPE.present,
    });

    return user;
  };

  /**
   *  Создать access токен для пользователя
   * */
  createAccessToken(user: User): string {
    return sign(
      {
        sub: user.id,
        email: user.email,
      },
      this.configService.get<string>('ACCESS_TOKEN_SECRET'),
    );
  }

  /**
   * Получить пользователя по email
   * */
  getUserByEmail = (email: string) =>
    this.userModel
      .findOne({ email })
      .select('+hashedPassword')
      .orFail(new NotFoundException('Пользователь не найден!'));

  /**
   * Проверка пароля пользователя
   * */
  matchPasswords = async (dtoPassword: string, userPassword: string) => {
    const isPasswordCorrect = await compare(dtoPassword, userPassword);

    if (!isPasswordCorrect)
      throw new UnprocessableEntityException(
        'Не корректный пароль пользователя!',
      );
  };

  /**
   * Создать ответ авторизации
   * */
  buildAuthResponse = (user: User) => ({
    accessToken: this.createAccessToken(user),
  });
}
