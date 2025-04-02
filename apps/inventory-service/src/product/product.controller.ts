import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';

import Product from './entities/product.entity';
import ProductService from './product.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('product')
export default class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern('createProduct')
  async create(@Body() product: Product): Promise<Product> {
    const prd = await this.productService.create(product);
    return prd;
  }

  @MessagePattern('findAllProducts')
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @MessagePattern('findProductById')
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productService.findOne(Number(id));
  }

  @MessagePattern('findProductByName')
  async findAllByName(@Param('name') name: string) {
    const products = await this.productService.findAllByName(name);
    return { products };
  }

  @MessagePattern('findProductByCategoryId')
  findAllByCategoryId(
    @Param('categoryid') categoryid: string
  ): Promise<Product[]> {
    return this.productService.findAllByCategoryId(Number(Number(categoryid)));
  }

  @MessagePattern('updateProduct')
  update(@Param('id') id: string, @Body() product: Product): Promise<Product> {
    return this.productService.update(Number(id), product);
  }

  @MessagePattern('deleteProduct')
  remove(@Param('id') id: string): Promise<Product> {
    return this.productService.remove(Number(id));
  }
}
