
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ShoppingBag, Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-shop-purple">SSG</span>
          <span className="hidden sm:inline-block font-medium text-lg">GIFTS & SPORTS</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-foreground hover:text-shop-purple transition-colors">Home</a>
          <a href="#categories" className="text-foreground hover:text-shop-purple transition-colors">Categories</a>
          <a href="#products" className="text-foreground hover:text-shop-purple transition-colors">Products</a>
          <a href="#about" className="text-foreground hover:text-shop-purple transition-colors">About Us</a>
          <a href="#contact" className="text-foreground hover:text-shop-purple transition-colors">Contact</a>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-foreground hover:text-shop-purple">
            <ShoppingBag className="h-5 w-5" />
          </Button>
          <Button className="hidden md:flex bg-shop-purple hover:bg-shop-dark-purple">Shop Now</Button>
          
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
            <a href="#" className="py-2 text-foreground hover:text-shop-purple transition-colors">Home</a>
            <a href="#categories" className="py-2 text-foreground hover:text-shop-purple transition-colors">Categories</a>
            <a href="#products" className="py-2 text-foreground hover:text-shop-purple transition-colors">Products</a>
            <a href="#about" className="py-2 text-foreground hover:text-shop-purple transition-colors">About Us</a>
            <a href="#contact" className="py-2 text-foreground hover:text-shop-purple transition-colors">Contact</a>
            <Button className="w-full bg-shop-purple hover:bg-shop-dark-purple mt-2">Shop Now</Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
