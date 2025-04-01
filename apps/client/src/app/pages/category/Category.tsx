import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useParams } from 'react-router-dom';

import { ProductApi } from '@/api/productApi';
import { GetProductByCategory } from '@/app/api/ProductAPI';
import CategoryCarousel from '@/app/components/carousel/categoryCarousel';
import ProductCard from '@/app/components/product-Card/ProductCard';

function Category() {
  const { name } = useParams<{ name: string }>();

  const [gridData, setGridData] = useState<ProductApi[]>([]);
  const [products, setProducts] = useState<ProductApi[]>([]);
  const [subData, setSubData] = useState<ProductApi[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [brands, setBrands] = useState<Set<string>>(new Set());
  const [gridBrand, setGridBrand] = useState<string>('Brand');
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState<Error>();
  const { id } = useParams<{ id: string }>();
  const itemsPerPage = 25;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  useEffect(() => {
    GetProductByCategory(String(id))
      .then(res => {
        return res.json();
      })
      .then((data: ProductApi[]) => {
        setProducts(data);
      })
      .catch((err: Error) => {
        setError(err);
      });
  }, [id]);

  useEffect(() => {
    setTotalPages(Math.ceil(products.length / itemsPerPage));
    setGridData(products);
  }, [currentPage, products]);

  useEffect(() => {
    const slice = gridData.slice(startIndex, endIndex);
    setSubData(slice);
  }, [gridData, currentPage, startIndex, endIndex]);

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
    if (gridBrand === 'Brand') {
      setGridData(products);
    } else {
      const griddata = products.filter(item => item.brand === gridBrand);
      setGridData(griddata);
    }
  }, [gridBrand, products]);
  if (error) {
    return (
      <div>
        Error: {error.message} :--{error.name} :--{error.stack}
      </div>
    );
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className='h-full w-full flex flex-col gap-2 px-40 py-10'>
      <h1 className='text-[60px]'>{name}</h1>
      <div className='mb-10'>
        <CategoryCarousel categoryproducts={products} categorybrands={brands} />
        <div className='flex gap-5 items-center'>
          <h1 className='text-[40px]'>All</h1>
          <select
            className='bg-transparent border border-black p-2 text-[20px]'
            defaultValue='Brand'
            placeholder='Brand'
            onChange={e => {
              setGridBrand(e.target.value);
            }}
          >
            <option>Brand</option>
            {Array.from(brands).map(brand => (
              <option className='' key={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
        <div className='h-full flex flex-col justify-center gap-10'>
          <div
            className={`grid gap-20 h-full w-full ${
              gridData.length === 0 ? '' : 'grid-cols-5'
            }`}
          >
            {gridData.length === 0 ? (
              <div className='h-full grid place-content-center w-full'>
                <h1 className='text-2xl font-bold text-center'>
                  No products found with this Brand
                </h1>
              </div>
            ) : (
              subData.map(card => (
                <ProductCard
                  key={card.id}
                  id={card.id}
                  discount={Number(card.discount)}
                  image={card.image}
                  price={Number(card.price)}
                  alt={card.name}
                  stock={Number(card.stock)}
                >
                  {card.name}
                </ProductCard>
              ))
            )}
          </div>
          <div className={`${gridData.length < 26 ? 'hidden' : ''}`}>
            <ReactPaginate
              pageCount={totalPages}
              onPageChange={(e: { selected: number }) =>
                handlePageChange(e.selected)
              }
              containerClassName='w-full flex justify-center gap-10 items-center text-3xl'
              activeClassName='text-[#0038FF]'
              previousLabel=''
              nextLabel=''
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
