import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthRegisterDto {
  /**
   * Имя пользователя
   * */
  @ApiProperty({
    title: 'Имя пользователя',
    example: 'Иванов Иван Иванович',
  })
  @IsNotEmpty()
  name: string;

  /**
   * Фотография пользователя
   * */
  @ApiProperty({
    title: 'Фотография пользователя',
    example: 'https://avatars.dicebear.com/api/human/yard.svg',
  })
  @IsNotEmpty()
  photo: string;

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
