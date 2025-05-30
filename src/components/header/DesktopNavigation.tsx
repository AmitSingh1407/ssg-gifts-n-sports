
import React from 'react';
import { useHeaderNavigation } from './useHeaderNavigation';

const DesktopNavigation = () => {
  const { scrollToSection, goToDelivery, goToAdminLogin, goToHome } = useHeaderNavigation();

  return (
    <nav className="hidden md:flex items-center gap-6">
      <a 
        href="#" 
        className="text-foreground hover:text-shop-purple transition-colors"
        onClick={(e) => {
          e.preventDefault();
          goToHome();
        }}
      >
        Home
      </a>
      <a 
        href="#categories" 
        className="text-foreground hover:text-shop-purple transition-colors"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection('categories');
        }}
      >
        Categories
      </a>
      <a 
        href="#products" 
        className="text-foreground hover:text-shop-purple transition-colors"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection('products');
        }}
      >
        Products
      </a>
      <a 
        href="#about" 
        className="text-foreground hover:text-shop-purple transition-colors"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection('about');
        }}
      >
        About Us
      </a>
      <a 
        href="#contact" 
        className="text-foreground hover:text-shop-purple transition-colors"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection('contact');
        }}
      >
        Contact
      </a>
      <a 
        href="/delivery" 
        className="text-foreground hover:text-shop-purple transition-colors"
        onClick={(e) => {
          e.preventDefault();
          goToDelivery();
        }}
      >
        Delivery
      </a>
      <a 
        href="/admin/login" 
        className="text-foreground hover:text-shop-purple transition-colors"
        onClick={(e) => {
          e.preventDefault();
          goToAdminLogin();
        }}
      >
        Admin
      </a>
    </nav>
  );
};

export default DesktopNavigation;
