import { useState } from 'react';

import cartStore from '@/app/store/cartStore';
import { getProductPageLink } from '@/globals/links';

import Button from '../button/Button';
import NumericInput from './components/NumericInput';
import OfferBadge from './components/OfferBadge';

function CartProductCard({
  children,
  id,
  image,
  price,
  discount,
  alt,
  stock,
  initialValue = 1,
  remove,
}: CartProductCardProps) {
  const [stockMessage, setStockMessage] = useState<string>();
  const discountedPrice = price - (price * discount) / 100;
  const [subtotal, setSubtotal] = useState<number>(
    discountedPrice * initialValue
  );
  const { updateQuantity } = cartStore.getState();
  const productPage = getProductPageLink(String(id));
  const spanStyles = 'flex w-full text-base font-ropa';

  const handleQuantityChange = (newQuantity: number) => {
    setSubtotal(newQuantity * discountedPrice);
    updateQuantity(id, newQuantity);
  };

  const handleStockError = (error: string) => {
    setStockMessage(error);
  };

  const cutTitle = (text: string, maxLength: number) => {
    if (text.length <= maxLength) {
      return text;
    }
    return `${text.slice(0, maxLength - 3)}...`;
  };

  return (
    <div className='relative w-[230px] text-black bg-[#ded9e1] px-5 py-2 h-fit'>
      <a
        className='relative bg-white rounded flex items-center justify-center h-24 overflow-hidden'
        href={productPage}
      >
        <img
          src={image}
          alt={alt}
          className='max-h-[90%] max-w-[90%] object-cover rounded'
        />
      </a>
      {discount > 0 && <OfferBadge discount={discount} />}
      <div className='py-2 font-ropa'>
        <a
          className='font-bold text-3xl flex items-center justify-center font-ropa text-center'
          href={productPage}
        >
          {cutTitle(children as string, 15)}
        </a>

        <div className='flex flex-col'>
          <div className='flex flex-row'>
            <span className={spanStyles}>
              <span className='text-sm'>Price: [USD]</span>
              {discount > 0 ? (
                <>
                  <span className='line-through text-sm'>
                    {price.toFixed(2)}
                  </span>
                  <span className='ml-1 text-[#DC0700]'>
                    {(price - (price * discount) / 100).toFixed(2)}
                  </span>
                </>
              ) : (
                price.toFixed(2)
              )}
            </span>
          </div>
          <div className='flex flex-row space-x-3'>
            <p>Quantity: </p>
            <NumericInput
              max={stock}
              onChange={handleQuantityChange}
              onError={handleStockError}
              initialValue={initialValue}
            />
          </div>

          <span>Subtotal: {subtotal.toFixed(2)}</span>

          <p className='text-[#DC0700] text-sm w-full text-center'>
            {stockMessage} &nbsp;
          </p>
          <Button
            className='flex items-center text-xl justify-center bg-white w-full h-8 p-2 font-medium font-ropa'
            onClick={() => {
              remove();
            }}
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CartProductCard;
