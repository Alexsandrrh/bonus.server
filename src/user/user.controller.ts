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

@ApiTags('Пользователь')
@Controller('user')
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
  @Get('me')
  @UseGuards(AuthGuard)
  async getUser(@AuthUser('id') userId: string): Promise<UserOkResponse> {
    const user = await this.userService.getUser(userId);
    return this.userService.buildUserResponse(user);
  }
}
