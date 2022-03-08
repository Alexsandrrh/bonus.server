import { ApiProperty } from '@nestjs/swagger';

export class Auth {
  /** Access токен */
  @ApiProperty({
    description: 'Access токен',
  })
  accessToken: string;
}
