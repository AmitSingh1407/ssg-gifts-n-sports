
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    toast({
      title: product.name,
      description: `Price: ₹${product.price} - View product details`,
    });
  };

  const handleAddToCart = () => {
    // Store the selected product in localStorage and navigate to payment
    localStorage.setItem('selectedProduct', JSON.stringify(product));
    
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart`,
    });
    
    // Navigate to payment page after a short delay
    setTimeout(() => {
      navigate('/payment');
    }, 1000);
  };

  return (
    <div className="product-card group">
      <div className="relative overflow-hidden h-60">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 bg-white/90 px-2 py-1 rounded-full text-xs font-medium text-gray-700">
          {product.category}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-lg mb-2">{product.name}</h3>
        <div className="flex justify-between items-center mb-3">
          <p className="font-bold text-shop-dark-purple">₹{product.price}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button 
            size="sm" 
            className="bg-shop-purple hover:bg-shop-dark-purple"
            onClick={handleViewDetails}
          >
            View Details
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-shop-purple text-shop-purple hover:bg-shop-light-purple"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
