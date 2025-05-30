
import React from 'react';
import { useHeaderNavigation } from './useHeaderNavigation';

const Logo = () => {
  const { goToHome } = useHeaderNavigation();

  return (
    <a 
      href="/" 
      className="flex items-center gap-2"
      onClick={(e) => {
        e.preventDefault();
        goToHome();
      }}
    >
      <span className="text-2xl font-bold text-shop-purple">SSG</span>
      <span className="hidden sm:inline-block font-medium text-lg">GIFTS & SPORTS</span>
    </a>
  );
};

export default Logo;
