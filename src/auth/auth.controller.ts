import { Controller, Post, Body, HttpCode } from '@nestjs/common';
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
  @HttpCode(200)
  @ApiOkResponse({
    description: 'Ответ успешной регистрации пользователя',
    type: AuthOkResponse,
    status: 200,
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
  @HttpCode(200)
  @ApiOkResponse({
    description: 'Ответ успешного входа пользователя',
    type: AuthOkResponse,
    status: 200,
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
