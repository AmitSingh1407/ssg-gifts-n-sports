
import React from 'react';
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useHeaderNavigation } from './useHeaderNavigation';

interface HeaderActionsProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

const HeaderActions = ({ isMenuOpen, setIsMenuOpen }: HeaderActionsProps) => {
  const { getTotalItems } = useCart();
  const { goToCart, handleShopNow } = useHeaderNavigation();

  return (
    <div className="flex items-center gap-4">
      <Button 
        variant="ghost" 
        size="icon" 
        className="text-foreground hover:text-shop-purple relative"
        onClick={goToCart}
      >
        <ShoppingCart className="h-5 w-5" />
        {getTotalItems() > 0 && (
          <span className="absolute -top-1 -right-1 bg-shop-purple text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {getTotalItems()}
          </span>
        )}
      </Button>
      <Button 
        className="hidden md:flex bg-shop-purple hover:bg-shop-dark-purple"
        onClick={handleShopNow}
      >
        Shop Now
      </Button>
      
      {/* Mobile Menu Button */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="md:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>
    </div>
  );
};

export default HeaderActions;
