import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';

import { Product } from './models';
import { ProductsOkResponse } from './responses';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product) private readonly productModel: ModelType<Product>,
  ) {}

  /**
   * Получить список товаров для приобритения
   * */
  getProducts = () => this.productModel.find();

  /**
   * Получить продукт по полю ID
   * */
  getProductById = (productId: string) =>
    this.productModel
      .findById(productId)
      .orFail(
        new NotFoundException(
          `Товар под идентификатором ${productId} не найден!`,
        ),
      )
      .exec();

  /**
   * Построить ответ успешного запроса товаров
   * */
  buildProductsOkResponse = (products: Product[]): ProductsOkResponse => ({
    response: products,
  });
}
