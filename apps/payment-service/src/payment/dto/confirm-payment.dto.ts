import { IsNotEmpty, IsString } from 'class-validator';

export class ConfirmPaymentDto {
  @IsNotEmpty()
  @IsString()
  paymentId: string;

  @IsNotEmpty()
  @IsString()
  stripeId: string;

  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  currency: string;
}