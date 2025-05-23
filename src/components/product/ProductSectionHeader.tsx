
import React from 'react';
import { Button } from "@/components/ui/button";

interface ProductSectionHeaderProps {
  title: string;
  description: string;
  showBackButton: boolean;
  onBackButtonClick: () => void;
}

const ProductSectionHeader: React.FC<ProductSectionHeaderProps> = ({ 
  title, 
  description, 
  showBackButton,
  onBackButtonClick 
}) => {
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
      <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
      {showBackButton && (
        <Button 
          onClick={onBackButtonClick}
          className="mt-4 bg-shop-purple hover:bg-shop-dark-purple"
        >
          Show All Products
        </Button>
      )}
    </div>
  );
};

export default ProductSectionHeader;
