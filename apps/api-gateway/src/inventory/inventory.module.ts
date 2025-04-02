import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CategoryController } from './category/category.controller';
import { ProductController } from './product/product.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'INVENTORY_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'host.docker.internal',
          port: 5001,
        },
      },
    ]),
  ],
  controllers: [
    CategoryController,
    ProductController,
  ],
  providers: [],
})
export class InventoryModule {}
