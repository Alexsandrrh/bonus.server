import { ApiProperty } from '@nestjs/swagger';

import { UserSchema, UserSchemaType } from '../schemes';

export class UserOkResponse {
  @ApiProperty({ type: UserSchema })
  response: UserSchemaType;
}
