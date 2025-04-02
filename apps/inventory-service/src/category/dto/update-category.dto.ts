import { PartialType } from '@nestjs/swagger';

import CreateCategoryDto from './create-category.dto';

class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}

export default UpdateCategoryDto;
