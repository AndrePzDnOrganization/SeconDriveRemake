import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, of } from 'rxjs';

@Controller('product')
export class ProductController {
  constructor(
    @Inject('INVENTORY_SERVICE')
    private readonly productHubService: ClientProxy,
  ) {}

  @Post()
    createExercise(@Body() category: any): Observable<any> {
        return this.productHubService.send('createProduct', category);
    }

    @Get()
    getExercises(): Observable<any> {
        return this.productHubService.send('findAllProducts', {});
    }

    @Get(':id')
    getExerciseById(@Param('id') id: string): Observable<any> {
        return this.productHubService.send('findProductById', id);
    }

    @Get('name/:name')
    getExerciseByName(@Param('name') name: string): Observable<any> {
        return this.productHubService.send('findProductByName', name);
    }

    @Get('category/:categoryid')
    getExerciseByCategoryId(@Param('categoryid') categoryid: string): Observable<any> {
        return this.productHubService.send('findProductByCategoryId', categoryid);
    }

    @Patch(':id')
    updateExercise(@Param('id') id: string, @Body() category: any): Observable<any> {
        return this.productHubService.send('updateProduct', { id, category });
    }

    @Delete(':id')
    deleteExercise(@Param('id') id: string): Observable<any> {
        return this.productHubService.send('deleteProduct', id);
    }

}