import { Injectable } from '@nestjs/common';

interface Category {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

import PrismaService from '../prisma/prisma.service';

import CreateCategoryDto from './dto/create-category.dto';
import UpdateCategoryDto from './dto/update-category.dto';

@Injectable()
class CategoryService {
  constructor(private prisma: PrismaService) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: createCategoryDto,
    });
  }

  findAll() {
    return this.prisma.category.findMany();
  }

  async findOne(id: number): Promise<Category> {
    const category = this.prisma.category.findUnique({
      where: {
        id,
      },
    });

    return category;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  remove(id: number) {
    return this.prisma.category.delete({
      where: { id },
    });
  }
}

export default CategoryService;
