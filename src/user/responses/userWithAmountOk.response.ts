import { ApiProperty } from '@nestjs/swagger';

import { UserWithAmountSchema, UserWithAmountSchemaType } from '../schemes';

export class UserWithAmountOkResponse {
  @ApiProperty({ type: UserWithAmountSchema })
  response: UserWithAmountSchemaType;
}
