import { IsEnum, IsNumber, Min } from 'class-validator';
import { CurrencyTypes } from '../enums/intent-currency.enum';

export class CreateIntentDto {
  @IsNumber()
  @Min(50)
  amount: number;

  @IsEnum(CurrencyTypes)
  currency: CurrencyTypes;
}