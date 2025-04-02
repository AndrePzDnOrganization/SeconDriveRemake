import {
  Body,
  Controller,
  Param,
} from '@nestjs/common';

interface Category {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

import CategoryService from './category.service';
import { MessagePattern } from '@nestjs/microservices';
@Controller('category')
export default class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @MessagePattern('createCategory')
  create(@Body() category: Category): Promise<Category> {
    return this.categoryService.create(category);
  }

  @MessagePattern('findAllCategories')
  findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @MessagePattern('findCategoryById')
  findOne(@Param('id') id: string): Promise<Category> {
    return this.categoryService.findOne(Number(id));
  }

  @MessagePattern('updateCategory')
  update(
    @Param('id') id: string,
    @Body() category: Category
  ): Promise<Category> {
    return this.categoryService.update(Number(id), category);
  }

  @MessagePattern('deleteCategory')
  remove(@Param('id') id: string): Promise<Category> {
    return this.categoryService.remove(Number(id));
  }
}
