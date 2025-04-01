import { getProductPageLink } from '@/globals/links';

import AddToCartButton from './components/AddToCartButton';
import OfferBadge from './components/OfferBadge';

function ProductCard({
  children,
  id,
  image,
  price,
  discount,
  alt,
  stock,
}: ProductCardProps) {
  const cutTitle = (text: string, maxLength: number) => {
    if (text.length <= maxLength) {
      return text;
    }
    return `${text.slice(0, maxLength - 3)}...`;
  };

  const productPage = getProductPageLink(id);
  const spanStyles = 'flex w-full text-base font-ropa';

  return (
    <div className='relative w-[230px] text-black bg-[#ded9e1] p-5 rounded-lg h-fit'>
      <a
        className='relative bg-white rounded flex items-center justify-center h-24 overflow-hidden'
        href={productPage}
      >
        <img
          src={image}
          alt={alt}
          className='max-h-[95%] max-w-[95%] object-cover rounded'
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
        <div>
          <span className={spanStyles}>Price:</span>
          <span className={spanStyles}>
            <span>[USD]&nbsp;</span>{' '}
            {discount > 0 ? (
              <>
                <span className='line-through'>{Number(price).toFixed(2)}</span>
                <span className='ml-1 text-[#DC0700]'>
                  {Number(price - (price * discount) / 100).toFixed(2)}
                </span>
              </>
            ) : (
              Number(price).toFixed(2)
            )}
          </span>
        </div>
      </div>

      <AddToCartButton
        disabled={!(stock > 0)}
        id={Number(id)}
        image={image}
        price={price}
        discount={discount}
        stock={Number(stock)}
        title={String(children)}
      />
    </div>
  );
}

export default ProductCard;
