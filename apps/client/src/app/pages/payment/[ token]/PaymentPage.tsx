'use client';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../checkoutForm';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'sonner';

const stripePromise = loadStripe("pk_test_51QPq60FYtJtMV7wezKhB6hXK55IPc9EGW5zHrmq3KV0sSVoGYilVUXtkxwjgb5gvWhLqh4T1dGlb67pYkwdtQdvr001sxdImvA!");

interface DecodedToken {
  sub: string;
  name: string;
  description: string;
  image_url: string;
  amount: number;
  currency: string;
  paymentId: string;
}

export default function PaymentPage() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentInfo, setPaymentInfo] = useState<DecodedToken | null>(null);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get('token');

    if (token) {
      try {
    
        const decoded = jwtDecode<DecodedToken>(token);
        
        if (!decoded.sub || !decoded.amount || !decoded.currency) {
          throw new Error('Invalid token structure');
        }

        setClientSecret(decoded.sub);
        setPaymentInfo(decoded);
      } catch (error) {
        console.error('Token error:', error);
        toast.error('Invalid payment token');
        window.location.href = '/';
      }
    } else {
      toast.error('Missing payment token');
      window.location.href = '/';
    }
  }, []);

  if (!clientSecret || !paymentInfo) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading payment...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Elements
        stripe={stripePromise}
        options={{
          clientSecret,
          appearance: {
            theme: 'stripe',
            labels: 'floating',
          },
        }}
      >
        <CheckoutForm paymentInfo={paymentInfo} />
      </Elements>
    </div>
  );
}