import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('payments')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('create')
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    const payment = await this.paymentService.createPayment(createPaymentDto);
    
    // Generar token JWT para el frontend
    const token = this.jwtService.sign({
      sub: payment.clientSecret,
      name: createPaymentDto.name,
      description: createPaymentDto.description,
      image_url: createPaymentDto.imageUrl,
      amount: createPaymentDto.amount,
      currency: createPaymentDto.currency,
      paymentId: payment.paymentId,
    });

    return { token, paymentId: payment.paymentId };
  }

  @Post('confirm')
  async confirmPayment(@Body() confirmPaymentDto: ConfirmPaymentDto) {
    return this.paymentService.confirmPayment(confirmPaymentDto);
  }

  @Get('verify')
  async verifyToken(@Query('token') token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      return { valid: true, decoded };
    } catch (e) {
      return { valid: false, reason: e.message };
    }
  }
}