import { useState } from 'react';

import { ProductApi } from '@/api/productApi';

import ProductCard from '../../product-Card/ProductCard';
import leftIcon from '../assets/left.png';
import rightIcon from '../assets/right.png';

function Carousel({
  title,
  data,
  filters,
  setFilters,
  defaultFilter,
}: {
  title: string;
  data: ProductApi[];
  filters: Set<string>;
  setFilters: (e: string) => void;
  defaultFilter: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  function handleCarousel(direction: 'prev' | 'next') {
    if (data.length < 5) return;
    if (direction === 'prev' && currentIndex === 0) return;
    if (
      direction === 'next' &&
      (currentIndex + 5 === 10 || currentIndex + 5 === data.length)
    )
      return;
    const maxCards = 10;
    const newIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;
    const maxIndex = Math.min(data.length - 1, maxCards - 1);
    const newCurrentIndex = Math.max(0, Math.min(newIndex, maxIndex));
    setCurrentIndex(newCurrentIndex);
  }
  return (
    <div className='h-full w-full flex flex-col'>
      <div className='flex gap-5 items-center'>
        <h1 className='text-[40px] pl-24'>{title}</h1>
        <select
          className='bg-transparent border border-black p-2 text-[20px]'
          defaultValue={defaultFilter}
          placeholder={defaultFilter}
          onChange={e => {
            setCurrentIndex(0);
            setFilters(e.target.value);
          }}
        >
          <option>{defaultFilter}</option>
          {Array.from(filters).map(item => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>
      <div
        className={`flex gap-2 w-full h-full min-h-[280px] ${
          data.length > 5 ? 'justify-between' : 'justify-center'
        }`}
      >
        {data.length > 5 && (
          <button
            type='button'
            className='py-2'
            onClick={() => handleCarousel('prev')}
          >
            <img src={leftIcon} alt='left icon' />
          </button>
        )}
        {data.length === 0 ? (
          <div className='h-full grid place-content-center w-full'>
            <h1 className='text-2xl font-bold text-center'>
              No offers found with this Brand
            </h1>
          </div>
        ) : (
          data
            .slice(currentIndex, Math.min(10, data.length - currentIndex))
            .slice(0, 5)
            .map(item => (
              <ProductCard
                key={item.id}
                id={item.id}
                discount={Number(item.discount)}
                image={item.image}
                price={Number(item.price)}
                alt={item.name}
                stock={item.stock}
              >
                {item.name}
              </ProductCard>
            ))
        )}
        {data.length > 5 && (
          <button
            type='button'
            className=' py-2 '
            onClick={() => handleCarousel('next')}
          >
            <img src={rightIcon} alt='right icon' />
          </button>
        )}
      </div>
    </div>
  );
}
export default Carousel;
