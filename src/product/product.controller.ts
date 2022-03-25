import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

import { ProductsOkResponse } from './responses';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  /**
   * Получить все товары для покупки
   * */
  @ApiOperation({
    tags: ['Товары'],
    summary: 'Получить все товары для покупки',
  })
  @Get('products')
  @HttpCode(200)
  @ApiOkResponse({
    type: ProductsOkResponse,
    description: 'Успешный ответ списка товаров',
    status: 200,
  })
  async getProducts(): Promise<ProductsOkResponse> {
    const products = await this.productService.getProducts();
    return this.productService.buildProductsOkResponse(products);
  }
}
