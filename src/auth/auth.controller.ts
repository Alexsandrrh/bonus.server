import { Controller, Post, Body } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { AuthLoginDto, AuthRegisterDto } from './dto';
import { AuthOkResponse } from './responses';

@ApiTags('Авторизация пользователя')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Регистрация пользователя
   * */
  @ApiOperation({
    summary: 'Регистрация пользователя',
  })
  @Post('register')
  @ApiOkResponse({
    description: 'Ответ по успешной авторизации',
    type: AuthOkResponse,
  })
  async registerUser(@Body() authRegisterDto: AuthRegisterDto) {
    const user = await this.authService.createUser(authRegisterDto);
    return this.authService.buildAuthResponse(user);
  }

  /**
   * Вход пользователя
   * */
  @ApiOperation({
    summary: 'Вход пользователя',
  })
  @Post('login')
  @ApiOkResponse({
    description: 'Ответ по успешной авторизации',
    type: AuthOkResponse,
  })
  async loginUser(@Body() authLoginDto: AuthLoginDto) {
    const user = await this.authService.getUserByEmail(authLoginDto.email);
    await this.authService.matchPasswords(
      authLoginDto.password,
      user.hashedPassword,
    );
    return this.authService.buildAuthResponse(user);
  }
}
