import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { toast } from 'sonner';

interface PaymentInfo {
  name: string;
  description: string;
  amount: number;
  image_url: string;
  currency: string;
  paymentId: string;
}

export default function CheckoutForm({ paymentInfo }: { paymentInfo: PaymentInfo }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.error('Stripe not initialized');
      return;
    }

    setIsProcessing(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment/success`,
          receipt_email: 'customer@example.com', 
        },
        redirect: 'if_required',
      });

      if (error) {
        toast.error(error.message || 'Payment failed');
      } else if (paymentIntent?.status === 'succeeded') {

        await fetch('/api/payments/confirm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentId: paymentInfo.paymentId,
            stripeId: paymentIntent.id,
            amount: paymentInfo.amount,
            currency: paymentInfo.currency,
          }),
        });

        toast.success('Payment successful!');
        window.location.href = `/payment/success?id=${paymentIntent.id}`;
      }
    } catch (err) {
      console.error('Payment error:', err);
      toast.error('An unexpected error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold">{paymentInfo.name}</h2>
        <p className="text-gray-600">{paymentInfo.description}</p>
        <p className="text-xl font-semibold mt-2">
          {(paymentInfo.amount / 100).toFixed(2)} {paymentInfo.currency.toUpperCase()}
        </p>
        <img
          src={paymentInfo.image_url}
          alt={paymentInfo.name}
          className="mx-auto my-4 rounded-full w-24 h-24 object-cover"
        />
      </div>

      <PaymentElement className="mb-6" />

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded disabled:opacity-50 transition-colors"
      >
        {isProcessing ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
}