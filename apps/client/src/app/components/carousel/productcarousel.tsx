import { useEffect, useState } from 'react';

import { getAllProducts, ProductApi } from '@/api/productApi';

import Carousel from './components/carousel';

function ProductCarousel() {
  const [brands, setBrands] = useState<Set<string>>(new Set());
  const [offersData, setOffersData] = useState<ProductApi[]>([]);
  const [bestSellersData, setBestSellersData] = useState<ProductApi[]>([]);
  const [offersBrand, setOffersBrand] = useState<string>('Brand');
  const [bestSellersBrand, setBestSellersBrand] = useState<string>('Brand');
  const [products, setProducts] = useState<ProductApi[]>([]);

  useEffect(() => {
    getAllProducts()
      .then((res: Response) => res.json())
      .then((data: ProductApi[]) => {
        setProducts(data);
      })
      .catch((err: Error) => {
        return err;
      });
  }, []);

  useEffect(() => {
    const uniqueBrandsSet = new Set<string>();

    products
      .sort((a, b) => Number(b.stock) - Number(a.stock))
      .forEach(product => {
        uniqueBrandsSet.add(product.brand);
      });

    setBrands(uniqueBrandsSet);
  }, [products]);

  useEffect(() => {
    if (offersBrand === 'Brand') {
      const offers = products
        .filter(product => product.discount > 0)
        .sort((a, b) => Number(b.stock) - Number(a.stock));
      setOffersData(offers);
    } else {
      const offers = products
        .filter(product => product.brand === offersBrand)
        .filter(product => product.discount > 0)
        .sort((a, b) => Number(b.stock) - Number(a.stock));
      setOffersData(offers);
    }
  }, [products, offersBrand]);

  useEffect(() => {
    if (bestSellersBrand === 'Brand') {
      const bestSellers = products
        .filter(product => product.discount === 0)
        .sort((a, b) => b.unitSold - a.unitSold);
      setBestSellersData(bestSellers);
    } else {
      const bestSellers = products
        .filter(product => product.discount === 0)
        .filter(product => product.brand === bestSellersBrand)
        .sort((a, b) => b.unitSold - a.unitSold);
      setBestSellersData(bestSellers);
    }
  }, [bestSellersBrand, products]);
  return (
    <div className=' w-full flex flex-col px-40'>
      <Carousel
        title='Offers'
        data={offersData}
        filters={brands}
        setFilters={setOffersBrand}
        defaultFilter='Brand'
      />
      <Carousel
        title='Best sellers'
        data={bestSellersData}
        filters={brands}
        setFilters={setBestSellersBrand}
        defaultFilter='Brand'
      />
    </div>
  );
}

export default ProductCarousel;
