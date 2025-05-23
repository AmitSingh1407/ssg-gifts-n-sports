
import React from 'react';
import { Button } from "@/components/ui/button";
import ProductCard from './ProductCard';
import { Product } from '@/data/products';

interface ProductsGridProps {
  products: Product[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

const ProductsGrid: React.FC<ProductsGridProps> = ({ products, selectedCategory, setSelectedCategory }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">No products found for this category.</p>
        <Button 
          onClick={() => setSelectedCategory(null)}
          className="bg-shop-purple hover:bg-shop-dark-purple"
        >
          Show All Products
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsGrid;
