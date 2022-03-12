import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { ApiProperty } from '@nestjs/swagger';

export class Product extends TimeStamps {
  /** Идентификатор продукта */
  @ApiProperty({
    format: 'uuid',
    description: 'Идентификатор продукта',
  })
  id: string;
}
