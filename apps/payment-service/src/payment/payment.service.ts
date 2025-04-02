import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { StripeService } from '../stripe/stripe.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    private stripeService: StripeService,
  ) {}

  async createPayment(createPaymentDto: CreatePaymentDto) {
    const { amount, currency, name, description, imageUrl } = createPaymentDto;

    const { clientSecret, paymentId } = await this.stripeService.createPaymentIntent({
      amount,
      currency,
    });

   
    const payment = this.paymentRepository.create({
      paymentId,
      amount,
      currency,
      status: 'pending',
      productName: name,
      productDescription: description,
      productImage: imageUrl,
    });

    await this.paymentRepository.save(payment);

    return { clientSecret, paymentId };
  }

  async confirmPayment(confirmPaymentDto: ConfirmPaymentDto) {
    const payment = await this.paymentRepository.findOne({
      where: { paymentId: confirmPaymentDto.paymentId },
    });

    if (!payment) {
      throw new Error('Payment not found');
    }

    // Actualizar campos
    payment.status = 'completed';
    payment.stripeId = confirmPaymentDto.stripeId;
    payment.completedAt = new Date();

    await this.paymentRepository.save(payment);

    return { success: true, paymentId: payment.paymentId };
  }
}