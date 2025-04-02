import { IsEnum, IsNotEmpty, IsNumber, IsString, IsUrl, Min } from 'class-validator';
import { CurrencyTypes } from '../../stripe/enums/intent-currency.enum';

export class CreatePaymentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsUrl()
  imageUrl: string;

  @IsNumber()
  @Min(50)
  amount: number;

  @IsEnum(CurrencyTypes)
  currency: CurrencyTypes;
}