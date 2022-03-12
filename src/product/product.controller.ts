import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { Product } from './models';

@Controller()
export class ProductController {
  @Get('products')
  @ApiOkResponse({ type: Product })
  getProducts() {
    return 'getProducts';
  }
}
