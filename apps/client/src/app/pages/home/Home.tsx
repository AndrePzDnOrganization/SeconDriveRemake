import ProductCarousel from '@/app/components/carousel/productcarousel';

import carBanner from './assets/car.png';

function Home() {
  return (
    <div className='h-full w-full flex flex-col px-40'>
      <div className='w-full flex justify-center items-center'>
        <img src={carBanner} alt='offers icon' />
      </div>
      <ProductCarousel />
    </div>
  );
}
export default Home;
