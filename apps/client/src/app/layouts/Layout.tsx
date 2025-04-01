import React from 'react';
import { Outlet } from 'react-router-dom';

import SetBillingInfo from '../components/billingAndShipping/SetBillingInfo';
import Header from '../components/header/Header';
import SideBar from '../components/side-bar/SideBar';
import userStore from '../store/userStore';

function Layout() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [settings, setSettings] = React.useState<boolean>(false);
  const { user } = userStore.getState();

  return (
    <div className='h-screen flex flex-col overflow-y-scroll relative'>
      <header className='w-full z-30 top-0 flex sticky'>
        <Header setIsOpen={setIsOpen} close={() => setSettings(false)} />
      </header>
      <main className='flex grow'>
        <div
          className={`fixed left-0 h-full z-10 w-full bg-black/20 py-3 px-5 transform transition-transform ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        />
        <SideBar
          isOpen={isOpen}
          openSettings={() => setSettings(user.userId != null)}
          onClose={() => setIsOpen(false)}
        />
        {settings && (
          <SetBillingInfo
            onClose={() => {
              setSettings(false);
              window.location.reload();
            }}
          />
        )}
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
