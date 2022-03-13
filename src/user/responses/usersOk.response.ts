import { ApiProperty } from '@nestjs/swagger';

import { UserSchema, UserSchemaType } from '../schemes';

export class UsersOkResponse {
  @ApiProperty({ type: [UserSchema] })
  response: UserSchemaType[];
}
