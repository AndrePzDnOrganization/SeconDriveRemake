import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class CreateProductDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  categoryId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  brand: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  stock: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  unitSold: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  discount: number;
}
