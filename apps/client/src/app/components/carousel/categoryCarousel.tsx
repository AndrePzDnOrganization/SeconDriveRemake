import { useEffect, useState } from 'react';

import { ProductApi } from '@/api/productApi';

import Carousel from './components/carousel';

function CategoryCarousel({
  categoryproducts,
  categorybrands,
}: {
  categoryproducts: ProductApi[];
  categorybrands: Set<string>;
}) {
  const [offersData, setOffersData] = useState<ProductApi[]>([]);
  const [offersBrand, setOffersBrand] = useState<string>('Brand');

  useEffect(() => {
    if (offersBrand === 'Brand') {
      const offers = categoryproducts
        .filter(product => product.discount > 0)
        .sort((a, b) => Number(b.stock) - Number(a.stock));
      setOffersData(offers);
    } else {
      const offers = categoryproducts
        .filter(product => product.brand === offersBrand)
        .filter(product => product.discount > 0)
        .sort((a, b) => Number(b.stock) - Number(a.stock));
      setOffersData(offers);
    }
  }, [categoryproducts, offersBrand]);

  return (
    <div className=' w-full flex flex-col px-40'>
      <Carousel
        title='Offers'
        data={offersData}
        filters={categorybrands}
        setFilters={setOffersBrand}
        defaultFilter='Brand'
      />
    </div>
  );
}

export default CategoryCarousel;
