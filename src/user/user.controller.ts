import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiOkResponse,
} from '@nestjs/swagger';

import { UserWithAmountOkResponse } from './responses';
import { AuthGuard } from '../auth/auth.guard';
import { AuthUser } from '../auth/decorators';
import { UserService } from './user.service';
import { UsersOkResponse } from './responses/usersOk.response';

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
    type: UserWithAmountOkResponse,
    description: 'Ответ при успешном получении пользователя',
  })
  async getUser(
    @AuthUser('id') userId: string,
  ): Promise<UserWithAmountOkResponse> {
    const user = await this.userService.getAggregatedUser(userId);
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
    description:
      'Ответ при успешном получении пользователей без авторизированного пользователя',
  })
  async getUsers(@AuthUser('id') userId: string): Promise<UsersOkResponse> {
    const users = await this.userService.getUsersWithoutAuthUser(userId);
    return this.userService.buildUsersOkResponse(users);
  }
}
