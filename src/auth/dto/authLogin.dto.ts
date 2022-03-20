import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginDto {
  /**
   * Электронная почта пользователя
   * */
  @ApiProperty({
    title: 'Электронная почта пользователя',
    example: 'root@email.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * Пароль пользователя
   * */
  @ApiProperty({
    title: 'Пароль пользователя',
    example: 'supper123',
  })
  @IsNotEmpty()
  password: string;
}
