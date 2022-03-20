import { ApiProperty } from '@nestjs/swagger';

import { OperationSuccessSchema } from '../schemes';

export class OperationSuccessOkResponse {
  @ApiProperty({ type: OperationSuccessSchema })
  response: OperationSuccessSchema;
}
