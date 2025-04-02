import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, of } from 'rxjs';

@Controller('category')
export class CategoryController {
  constructor(
    @Inject('INVENTORY_SERVICE')
    private readonly categoryHubService: ClientProxy,
  ) {}

  @Post()
    createExercise(@Body() category: any): Observable<any> {
        return this.categoryHubService.send('createCategory', category);
    }
  
  @Get()
  getExercises(): Observable<any> {
    return this.categoryHubService.send('findAllCategories', {});
  }

  @Get(':id')
  getExerciseById(@Param('id') id: string): Observable<any> {
      return this.categoryHubService.send('findCategoryById', id);
  }

  @Patch(':id')
    updateExercise(@Param('id') id: string, @Body() category: any): Observable<any> {
        return this.categoryHubService.send('updateCategory', { id, category });
    }

    @Delete(':id')
    deleteExercise(@Param('id') id: string): Observable<any> {
        return this.categoryHubService.send('deleteCategory', id);
    }
}