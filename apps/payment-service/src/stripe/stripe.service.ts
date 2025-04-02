import { Injectable, Inject } from '@nestjs/common';
import Stripe from 'stripe';
import { CreateIntentDto } from './dto/create-intent.dto';

@Injectable()
export class StripeService {
  constructor(@Inject('STRIPE_CLIENT') private readonly stripe: Stripe) {}

  async createPaymentIntent(createIntentDto: CreateIntentDto) {
    try {
      const { amount, currency } = createIntentDto;
      
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency,
        payment_method_types: ['card'],
      });

      return {
        clientSecret: paymentIntent.client_secret,
        paymentId: paymentIntent.id,
      };
    } catch (error) {
      throw new Error(`Stripe error: ${error.message}`);
    }
  }
}