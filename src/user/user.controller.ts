import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiOkResponse,
} from '@nestjs/swagger';

import { UserOkResponse } from './responses';
import { AuthGuard } from '../auth/auth.guard';
import { AuthUser } from '../auth/decorators/authUser.decorator';
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
  @ApiOkResponse({
    type: UserOkResponse,
    description: 'Ответ при успешном получении пользователя',
  })
  @Get('user/me')
  @UseGuards(AuthGuard)
  async getUser(@AuthUser('id') userId: string): Promise<UserOkResponse> {
    const user = await this.userService.getUser(userId);
    return this.userService.buildUserResponse(user);
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
    return this.userService.buildUsersResponse(users);
  }
}
