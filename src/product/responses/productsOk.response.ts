import { ApiProperty } from '@nestjs/swagger';

import { ProductSchema, ProductSchemaType } from '../schemes';

export class ProductsOkResponse {
  @ApiProperty({ type: [ProductSchema] })
  response: ProductSchemaType[];
}
