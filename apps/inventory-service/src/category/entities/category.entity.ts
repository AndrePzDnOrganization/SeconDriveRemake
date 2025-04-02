import { ApiProperty } from '@nestjs/swagger';
interface Category {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export default class CategoryEntity implements Category {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
