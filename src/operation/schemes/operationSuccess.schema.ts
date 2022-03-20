import { ApiProperty } from '@nestjs/swagger';

import { OperationSchema, OperationSchemaType } from './operation.schema';

export class OperationSuccessSchema {
  /**
   * Измененный баланс пользователя
   */
  @ApiProperty({ title: 'Измененный баланс пользователя' })
  userCurrentBalance: number;

  /**
   * Успешная операция
   */
  @ApiProperty({ title: 'Успешная операция', type: OperationSchema })
  performedOperation: OperationSchemaType;
}
