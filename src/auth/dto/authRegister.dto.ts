import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthRegisterDto {
  /** Имя пользователя */
  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Иванов Иван Иванович',
  })
  @IsNotEmpty()
  name: string;

  /** Фотография пользователя */
  @ApiProperty({
    description: 'Фотография пользователя',
    example: '',
  })
  @IsNotEmpty()
  photo: string;

  /** Электронная почта пользователя */
  @ApiProperty({
    description: 'Электронная почта пользователя',
    example: 'root@email.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /** Пароль пользователя */
  @ApiProperty({
    description: 'Пароль пользователя',
    example: 'supper123',
  })
  @IsNotEmpty()
  password: string;
}
