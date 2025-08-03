import React, { useState } from 'react';
import Sidebar from './layouts/sidebar';
import Header from './layouts/header';

import HomePage from './home';

const Dashboard = () => {
  const [activeMenuItem, setActiveMenuItem] = useState('Home');

  const handleMenuItemClick = (menuKey) => {
    setActiveMenuItem(menuKey);
  };

  return (
    <div className="flex h-screen bg-slate-900 overflow-hidden">
      <Sidebar 
        activeItem={activeMenuItem} 
        onMenuItemClick={handleMenuItemClick} 
      />
      <div className="flex-1 flex flex-col">
        <Header userName="John" />
        <HomePage />
      </div>
    </div>
  );
};

export default Dashboard;