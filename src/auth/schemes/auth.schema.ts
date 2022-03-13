import { ApiProperty } from '@nestjs/swagger';

export class AuthSchema {
  /** Access токен */
  @ApiProperty({
    description: 'Access токен',
    format: 'uuid',
  })
  accessToken: string;
}
