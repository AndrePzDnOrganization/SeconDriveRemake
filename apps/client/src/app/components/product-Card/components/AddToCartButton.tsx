import { useNavigate } from 'react-router-dom';

import cartStore from '@/app/store/cartStore';

import Button from '../../button/Button';

interface ButtonProps {
  disabled: boolean;
  id: number;
  image: string;
  price: number;
  discount: number;
  stock: number;
  title: string;
}
function AddToCartButton({
  disabled,
  id,
  image,
  price,
  discount,
  stock,
  title,
}: ButtonProps) {
  const navigate = useNavigate();
  const { addItem } = cartStore.getState();

  return (
    <Button
      className='flex items-center text-xl justify-center bg-white rounded w-full p-2 font-medium font-ropa'
      onClick={() => {
        addItem({
          id,
          image,
          price,
          discount,
          stock,
          title,
          quantity: 1,
        });
        navigate('/cart');
      }}
      disabled={disabled}
    >
      {disabled ? 'Out of stock' : 'Add to cart +'}
    </Button>
  );
}

export default AddToCartButton;
