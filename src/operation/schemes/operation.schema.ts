import { Operation } from '../models';
import { ApiProperty } from '@nestjs/swagger';

export class OperationSchema extends Operation {
  /** Идентификатор операции */
  @ApiProperty({
    format: 'uuid',
    description: 'Идентификатор операции',
  })
  id: string;

  /** Дата создания операции */
  @ApiProperty({
    type: Date,
    description: 'Дата создания операции',
  })
  createdAt: Date;

  /** Дата изменения операции */
  @ApiProperty({ type: Date, description: 'Дата изменения операции' })
  updatedAt: Date;
}

export type OperationSchemaType = OperationSchema | Operation;
