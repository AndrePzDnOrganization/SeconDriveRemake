import { Injectable } from '@nestjs/common';

interface Product {
  id: number;
  categoryId: number;
  name: string;
  description: string;
  brand: string;
  image: string;
  price: number;
  stock: number;
  unitSold: number;
  discount: number;
  createdAt: Date;
  updatedAt: Date;
}


import PrismaService from '../prisma/prisma.service';

import CreateProductDto from './dto/create-product.dto';
import UpdateProductDto from './dto/update-product.dto';

@Injectable()
export default class ProductService {
  constructor(private prisma: PrismaService) {}

  create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({ data: createProductDto });
  }

  findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async findOne(id: number): Promise<Product> {
    const product = this.prisma.product.findUnique({
        where: { id },
        include : {
          category : {
            select : {
              name: true
            }
          }
        }
      });
      return product;
    }

   async findAllByName(name: string) {
    const products = await this.prisma.product.findMany({
      where: {
        name: {
          contains: String(name),
          mode: 'insensitive',
        },
      },
    });

    return products;
  }

  findAllByCategoryId(categoryId: number): Promise<Product[]> {
    return this.prisma.product.findMany({ where: { categoryId } });
  }

  update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  remove(id: number): Promise<Product> {
    return this.prisma.product.delete({ where: { id } });
  }
}
