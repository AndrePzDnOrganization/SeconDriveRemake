import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import {
  StripeCardCvcElementChangeEvent,
  StripeCardExpiryElementChangeEvent,
  StripeCardNumberElementChangeEvent,
} from '@stripe/stripe-js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [cardNumberComplete, setCardNumberComplete] = useState(false);
  const [expiryComplete, setExpiryComplete] = useState(false);
  const [cvcComplete, setCvcComplete] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const cardElement = elements?.getElement(CardNumberElement);

    if (!stripe || !elements) {
      return;
    }

    if (!cardElement) {
      return;
    }

    const { error: cardError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

    if (cardError) {
      setErrorMessage(cardError.message || 'An error occurred');
      setLoading(false);
      return;
    }

    const { id } = paymentMethod;
    try {
      const response = await fetch('/api/stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          amount: 1000,
        }),
      });

      if (!response.ok) {
        throw new Error('Payment failed');
      }

      await response.json().then(() => {
        cardElement?.clear();
        setErrorMessage('Payment successful!');
        setTimeout(() => {
          navigate('/invoice');
        }, 3000);
      });
    } catch (error) {
      setErrorMessage('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCardNumberChange = (
    event: StripeCardNumberElementChangeEvent
  ) => {
    setCardNumberComplete(event.complete);
  };

  const handleExpiryChange = (event: StripeCardExpiryElementChangeEvent) => {
    setExpiryComplete(event.complete);
  };

  const handleCvcChange = (event: StripeCardCvcElementChangeEvent) => {
    setCvcComplete(event.complete);
  };

  return (
    <form onSubmit={handleSubmit} className='max-w-md mx-auto mt-8'>
      <div
        className='border p-4 rounded-md custom-border'
        style={{ borderWidth: '2px', borderColor: 'black' }}
      >
        <div className='mb-4'>
          <label htmlFor='cardNumber'>
            Card Number
            {/* <input type='text' /> */}
          </label>
          <CardNumberElement
            onChange={handleCardNumberChange}
            options={{
              showIcon: true,
              iconStyle: 'solid', // or 'default'
            }}
            className='border p-2 w-full'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='expiryDate'>
            Expiration Date
            {/* <input type='text' /> */}
          </label>
          <CardExpiryElement
            onChange={handleExpiryChange}
            className='border p-2 w-full'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='cvc'>
            CVC
            {/* <input type='text' /> */}
          </label>
          <CardCvcElement
            onChange={handleCvcChange}
            className='border p-2 w-full'
          />
        </div>
        {errorMessage && (
          <div className='text-red-500 mb-4'>{errorMessage}</div>
        )}
        <div className='flex justify-center'>
          <button
            type='submit'
            disabled={
              !stripe ||
              loading ||
              !(cardNumberComplete && expiryComplete && cvcComplete)
            }
            className={`px-4 py-2 rounded text-white ${
              !stripe ||
              loading ||
              !(cardNumberComplete && expiryComplete && cvcComplete)
                ? 'bg-blue-200'
                : 'bg-blue-500 hover:bg-blue-600 focus:outline-none'
            }`}
          >
            {loading ? 'Processing...' : 'Submit Payment'}
          </button>
        </div>
      </div>
    </form>
  );
}

export default CheckoutForm;
