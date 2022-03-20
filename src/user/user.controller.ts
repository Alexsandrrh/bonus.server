import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiOkResponse,
} from '@nestjs/swagger';

import { UserWithBalanceOkResponse, UsersOkResponse } from './responses';
import { AuthGuard } from '../auth/auth.guard';
import { AuthUser } from '../auth/decorators';
import { UserService } from './user.service';

@ApiTags('Пользователь')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Получение пользователя
   * */
  @ApiOperation({
    summary: 'Получение пользователя',
  })
  @ApiBearerAuth()
  @Get('user/me')
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    type: UserWithBalanceOkResponse,
  })
  async getUser(
    @AuthUser('id') userId: string,
  ): Promise<UserWithBalanceOkResponse> {
    const user = await this.userService.getUser(userId);
    return this.userService.buildUserOkResponse(user);
  }

  /**
   *  Получение всех пользователей без авторизированного пользователя
   *  */
  @ApiOperation({
    summary: 'Получение всех пользователей без авторизированного пользователя',
  })
  @ApiBearerAuth()
  @Get('usersWithoutMe')
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    type: UsersOkResponse,
  })
  async getUsers(@AuthUser('id') userId: string): Promise<UsersOkResponse> {
    const users = await this.userService.getUsersWithoutAuthUser(userId);
    return this.userService.buildUsersOkResponse(users);
  }
}
