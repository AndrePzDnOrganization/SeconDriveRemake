import { useEffect, useState } from 'react';

import { Category, getAllCategories } from '@/app/api/CategoryAPI';

import settingsIcon from './assets/setting.png';

type Props = {
  isOpen: boolean;
  openSettings: () => void;
  onClose: () => void;
};

function SideBar({ isOpen, openSettings, onClose }: Props): JSX.Element {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    getAllCategories()
      .then((res: Response) => res.json())
      .then((data: Category[]) => {
        setCategories(data);
      })
      .catch((err: Error) => {
        setError(err);
      });
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div
      className={`fixed left-0 h-full z-20 w-[349px] bg-[#fed700] py-3 px-5 transform transition-transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className='p-4 h-full flex flex-col'>
        <h2 className='text-[26px] text-black mb-1 text-base font-ropa-sans'>
          CATEGORIES:
        </h2>
        <hr className='border-black border-[1.2px] mb-3' />
        <ul>
          {categories.map(category => (
            <li key={category.id}>
              <a
                href={`/category/${category.id}`}
                className='text-[26px] text-black hover:text-blue-500 text-base font-ropa-sans'
              >
                {category.name}
              </a>
            </li>
          ))}
        </ul>
        <hr className='border-black border-[1.2px]' />
        <div className='h-full flex justify-end flex-col'>
          <div className='mb-10 pb-10'>
            <button
              type='button'
              className='text-black hover:text-blue-500 text-base font-ropa-sans'
              onClick={() => {
                onClose();
                openSettings();
              }}
            >
              <img src={settingsIcon} alt='settings logo' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
