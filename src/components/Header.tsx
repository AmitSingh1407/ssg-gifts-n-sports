import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, X, Truck } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useCart } from "@/contexts/CartContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { getTotalItems } = useCart();

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleShopNow = () => {
    // Close menu if open
    setIsMenuOpen(false);
    // Scroll to products section
    scrollToSection('products');
  };

  const goToDelivery = () => {
    setIsMenuOpen(false);
    navigate('/delivery');
  };

  const goToCart = () => {
    setIsMenuOpen(false);
    navigate('/cart');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a 
          href="/" 
          className="flex items-center gap-2"
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <span className="text-2xl font-bold text-shop-purple">SSG</span>
          <span className="hidden sm:inline-block font-medium text-lg">GIFTS & SPORTS</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a 
            href="#" 
            className="text-foreground hover:text-shop-purple transition-colors"
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Home
          </a>
          <a 
            href="#categories" 
            className="text-foreground hover:text-shop-purple transition-colors"
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
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
              navigate('/');
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
              navigate('/');
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
              navigate('/');
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
        </nav>

        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-foreground hover:text-shop-purple relative"
            onClick={() => goToCart()}
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
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b shadow-lg">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <a 
              href="#" 
              className="py-2 text-foreground hover:text-shop-purple transition-colors"
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setIsMenuOpen(false);
              }}
            >
              Home
            </a>
            <a 
              href="#categories" 
              className="py-2 text-foreground hover:text-shop-purple transition-colors"
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
                scrollToSection('categories');
              }}
            >
              Categories
            </a>
            <a 
              href="#products" 
              className="py-2 text-foreground hover:text-shop-purple transition-colors"
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
                scrollToSection('products');
              }}
            >
              Products
            </a>
            <a 
              href="#about" 
              className="py-2 text-foreground hover:text-shop-purple transition-colors"
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
                scrollToSection('about');
              }}
            >
              About Us
            </a>
            <a 
              href="#contact" 
              className="py-2 text-foreground hover:text-shop-purple transition-colors"
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
                scrollToSection('contact');
              }}
            >
              Contact
            </a>
            <a 
              href="/delivery" 
              className="py-2 text-foreground hover:text-shop-purple transition-colors flex items-center gap-2"
              onClick={(e) => {
                e.preventDefault();
                goToDelivery();
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
                goToCart();
              }}
            >
              <ShoppingCart className="h-4 w-4" />
              Cart ({getTotalItems()})
            </a>
            <Button 
              className="w-full bg-shop-purple hover:bg-shop-dark-purple mt-2"
              onClick={handleShopNow}
            >
              Shop Now
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
