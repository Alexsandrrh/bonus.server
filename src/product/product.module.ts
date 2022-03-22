import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product } from './models';

@Module({
  imports: [TypegooseModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
