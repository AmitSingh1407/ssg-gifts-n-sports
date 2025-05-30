
import React from 'react';
import { Button } from "@/components/ui/button";
import { ShoppingCart, Truck, User, UserCog } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useHeaderNavigation } from './useHeaderNavigation';

interface MobileNavigationProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

const MobileNavigation = ({ isMenuOpen, setIsMenuOpen }: MobileNavigationProps) => {
  const { getTotalItems } = useCart();
  const { 
    scrollToSection, 
    goToDelivery, 
    goToCart, 
    goToCustomerLogin, 
    goToAdminLogin, 
    handleShopNow,
    goToHome 
  } = useHeaderNavigation();

  const closeMenuAndExecute = (action: () => void) => {
    setIsMenuOpen(false);
    action();
  };

  if (!isMenuOpen) return null;

  return (
    <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b shadow-lg">
      <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
        <a 
          href="#" 
          className="py-2 text-foreground hover:text-shop-purple transition-colors"
          onClick={(e) => {
            e.preventDefault();
            closeMenuAndExecute(goToHome);
          }}
        >
          Home
        </a>
        <a 
          href="#categories" 
          className="py-2 text-foreground hover:text-shop-purple transition-colors"
          onClick={(e) => {
            e.preventDefault();
            closeMenuAndExecute(() => scrollToSection('categories'));
          }}
        >
          Categories
        </a>
        <a 
          href="#products" 
          className="py-2 text-foreground hover:text-shop-purple transition-colors"
          onClick={(e) => {
            e.preventDefault();
            closeMenuAndExecute(() => scrollToSection('products'));
          }}
        >
          Products
        </a>
        <a 
          href="#about" 
          className="py-2 text-foreground hover:text-shop-purple transition-colors"
          onClick={(e) => {
            e.preventDefault();
            closeMenuAndExecute(() => scrollToSection('about'));
          }}
        >
          About Us
        </a>
        <a 
          href="#contact" 
          className="py-2 text-foreground hover:text-shop-purple transition-colors"
          onClick={(e) => {
            e.preventDefault();
            closeMenuAndExecute(() => scrollToSection('contact'));
          }}
        >
          Contact
        </a>
        <a 
          href="/delivery" 
          className="py-2 text-foreground hover:text-shop-purple transition-colors flex items-center gap-2"
          onClick={(e) => {
            e.preventDefault();
            closeMenuAndExecute(goToDelivery);
          }}
        >
          <Truck className="h-4 w-4" />
          Delivery
        </a>
        <a 
          href="/cart" 
          className="py-2 text-foreground hover:text-shop-purple transition-colors flex items-center gap-2"
          onClick={(e) => {
            e.preventDefault();
            closeMenuAndExecute(goToCart);
          }}
        >
          <ShoppingCart className="h-4 w-4" />
          Cart ({getTotalItems()})
        </a>
        <a 
          href="/admin/login" 
          className="py-2 text-foreground hover:text-shop-purple transition-colors"
          onClick={(e) => {
            e.preventDefault();
            closeMenuAndExecute(goToAdminLogin);
          }}
        >
          Admin
        </a>
        <div className="border-t pt-4 mt-2">
          <div className="flex flex-col gap-2">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => closeMenuAndExecute(goToCustomerLogin)}
            >
              <User className="h-4 w-4 mr-2" />
              Customer Login
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => closeMenuAndExecute(goToAdminLogin)}
            >
              <UserCog className="h-4 w-4 mr-2" />
              Admin Login
            </Button>
          </div>
        </div>
        <Button 
          className="w-full bg-shop-purple hover:bg-shop-dark-purple mt-2"
          onClick={() => closeMenuAndExecute(handleShopNow)}
        >
          Shop Now
        </Button>
      </nav>
    </div>
  );
};

export default MobileNavigation;
