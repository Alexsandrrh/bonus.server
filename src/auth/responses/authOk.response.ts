import { ApiProperty } from '@nestjs/swagger';

import { AuthSchema } from '../schemes';

export class AuthOkResponse {
  @ApiProperty()
  response: AuthSchema;
}
