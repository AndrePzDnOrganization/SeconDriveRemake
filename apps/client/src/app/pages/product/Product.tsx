import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getUniqueProduct, ProductApi } from '@/api/productApi';
import Button from '@/app/components/button/Button';
import cartStore from '@/app/store/cartStore';

import CheckboxPrice from '../../components/checkbox-price/checkboxprice';

function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductApi | undefined>(undefined);
  const [isAvailable, setIsAvailable] = useState(true);
  const [changePrice, setChangePrice] = useState(false);
  const [price, setPrice] = useState(0);
  const { addItem } = cartStore.getState();
  const navigate = useNavigate();

  useEffect(() => {
    getUniqueProduct(String(id))
      .then((res: Response) => res.json())
      .then((data: ProductApi) => {
        if (data.stock < 1) setIsAvailable(false);
        setProduct(data);
        setPrice(data.price);
      })
      .catch((err: Error) => {
        return err;
      });
  }, [id]);

  const toggleIsUsd = () => {
    setChangePrice(false);
    if (changePrice) {
      setPrice(price / 6.97);
    }
  };

  const toggleIsBol = () => {
    setChangePrice(true);
    if (!changePrice) {
      setPrice(price * 6.97);
    }
  };

  if (!product)
    return (
      <div className='h-full w-full grid place-content-center'>
        <h2 className='text-4xl font-bold'>Product Not Found</h2>
      </div>
    );

  return (
    <div className='w-full flex'>
      <div className='w-1/2 grid place-content-center'>
        <img src={product.image} alt={product.name} height={300} width={472} />
      </div>
      {Number(product.discount) > 0 && (
        <div className='right-0 top-24 absolute text-2xl px-5 py-7  font-bold bg-[#DC0700] text-white first-letter: font-ropa text-[55px]'>
          {product.discount}%
        </div>
      )}
      <div className='w-1/2 flex flex-col gap-5 px-20 py-10 bg-[#ded9e1] text-[40px]'>
        <h2 className='text-center text-[60px]'>{product.name}</h2>
        <div className='flex gap-32'>
          <CheckboxPrice
            valuePrice='USD'
            checked={!changePrice}
            onToggle={toggleIsUsd}
          />
          <CheckboxPrice
            valuePrice='BOL'
            checked={changePrice}
            onToggle={toggleIsBol}
          />
          <span className='text-[25px]'>Change 1 (USD) = 6,97 (Bs)</span>
        </div>
        Description:
        <p className='text-[30px]'>{product.description}</p>
        <h3>
          Brand:&nbsp;&nbsp;&nbsp;
          <span className='text-[30px]'>{product.brand}</span>
        </h3>
        <h3>
          Category:&nbsp;&nbsp;&nbsp;
          <span className='text-[30px]'>{product.category.name}</span>
        </h3>
        <h3>
          Price:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {!changePrice ? `[USD]` : `[BOL]`}&nbsp;
          {product.discount > 0 ? (
            <>
              <span className='line-through text-[35px]'>
                {price.toFixed(2)}
              </span>
              <span className='text-red-600'>
                &nbsp;{(price - (price * product.discount) / 100).toFixed(2)}
              </span>
            </>
          ) : (
            price.toFixed(2)
          )}
        </h3>
        <Button
          className='flex items-center text-[35px] justify-center bg-white w-full p-4 font-medium font-ropa'
          onClick={() => {
            addItem({
              id: Number(product.id),
              image: product.image,
              price: product.price,
              discount: product.discount,
              stock: product.stock,
              title: product.name,
              quantity: 1,
            });
            navigate('/cart');
          }}
        >
          Add to Cart +
        </Button>
        <h3 className='text-center text-[30px]'>
          {isAvailable ? 'Available' : 'Out of stock'}
        </h3>
      </div>
    </div>
  );
}

export default ProductPage;
