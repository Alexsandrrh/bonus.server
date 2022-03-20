import { ApiProperty } from '@nestjs/swagger';
import { sign } from 'jsonwebtoken';
import { Types } from 'mongoose';
import { nanoid } from 'nanoid';

export class AuthSchema {
  /**
   * Access токен
   * */
  @ApiProperty({
    title: 'Access токен',
    example: sign(
      {
        sub: new Types.ObjectId(),
        name: 'Иванов Иван Иванович',
        email: 'root@email.com',
        hash_at: nanoid(),
      },
      'SECRET',
    ),
  })
  accessToken: string;
}
