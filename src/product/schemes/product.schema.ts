import { Product } from '../models';
import { ApiProperty } from '@nestjs/swagger';

export class ProductSchema extends Product {
  /** Идентификатор продукта */
  @ApiProperty({
    format: 'uuid',
    description: 'Идентификатор продукта',
  })
  id: string;

  /** Дата создания продукта */
  @ApiProperty({
    description: 'Дата создания продукта',
    type: Date,
  })
  createdAt: Date;

  /** Дата последнего изменения информации о продукте */
  @ApiProperty({
    description: 'Дата последнего изменения информации о продукте',
    type: Date,
  })
  updatedAt: Date;
}

export type ProductSchemaType = ProductSchema | Product;
