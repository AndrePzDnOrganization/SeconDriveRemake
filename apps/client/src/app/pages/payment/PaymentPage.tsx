import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import CheckoutForm from '@/app/components/stripe/paymentForm';

const stripePromise = loadStripe(
  'pk_test_51OCWakGYBnnyXwbreTANxcBZfKW1MAJi7VZR8cEph766JGvO53JtXmrSu5JmYKpVItc7bJWWRJ2YvvvOSMakronA00aLOFylco',
  { locale: 'en' }
);

function PaymentPage() {
  return (
    <Elements stripe={stripePromise}>
      <div className='container p-4'>
        <div className='row h-100'>
          <div className='col-md-4 offset-md-4 h-100'>
            <CheckoutForm />
          </div>
        </div>
      </div>
    </Elements>
  );
}

export default PaymentPage;
