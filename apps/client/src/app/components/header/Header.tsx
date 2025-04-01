import SearchIcon from '@mui/icons-material/Search';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import userStore from '@/app/store/userStore';

import Button from '../button/Button';
import cart from './assets/cart.png';
import logo from './assets/logo.png';
import menu from './assets/menu.png';
import userLogo from './assets/user.png';

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  close: () => void;
};

function Header({ setIsOpen, close }: Props) {
  const [search, setSearch] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { user, logout } = userStore.getState();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (/^[A-Za-z0-9\s-]*$/.test(inputValue)) {
      setSearch(inputValue);
    }
  };

  return (
    <div className='w-full bg-[#fed700] py-2 px-5 flex justify-between content-center place-items-center'>
      <div className='flex gap-6'>
        <Button
          onClick={() => {
            setIsOpen(prev => !prev);
            close();
          }}
        >
          <img src={menu} alt='menu' className='h-[45px]' />
        </Button>
        <a
          href='/'
          className='transition duration-100 active:transform active:scale-90 cursor-pointer'
        >
          <img src={logo} alt='logo' className='h-[45px]' />
        </a>
      </div>
      <div>
        <div
          className={`bg-white py-1 px-2 flex rounded-md gap-2 outline outline-2 ${
            isFocused ? 'outline-black' : 'outline-transparent'
          }`}
        >
          <input
            className='bg-transparent outline-none'
            placeholder='Search...'
            value={search}
            onChange={handleSearch}
            ref={ref}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                const trimmedSearch = search.trim();
                if (trimmedSearch !== '') {
                  navigate(`/search/${trimmedSearch}`);
                }
              }
            }}
          />
          <Button
            onClick={() => {
              const trimmedSearch = search.trim();
              if (trimmedSearch !== '') {
                navigate(`/search/${trimmedSearch}`);
              }
            }}
          >
            <SearchIcon />
          </Button>
        </div>
      </div>
      <div className='flex gap-6'>
        <Button
          onClick={() => {
            if (user.firstName) {
              setIsMenuOpen(prev => !prev);
            } else {
              navigate('/login');
            }
          }}
        >
          <img src={userLogo} alt='user' className='h-[45px]' />
          <span>{user.firstName ? user.firstName : 'Login'}</span>
          {isMenuOpen && (
            <div className='absolute  px-7 py-2 rounded-xl shadow-xl text-white bg-black'>
              <Button className='h-full w-full' onClick={() => logout()}>
                Logout
              </Button>
            </div>
          )}
        </Button>
        <Button
          onClick={() => {
            if (user.firstName) {
              navigate('/cart');
            } else {
              navigate('/login');
            }
          }}
        >
          <img src={cart} alt='cart' className='h-[45px]' />
        </Button>
      </div>
    </div>
  );
}

export default Header;
