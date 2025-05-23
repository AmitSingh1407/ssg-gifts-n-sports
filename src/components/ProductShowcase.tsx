
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import ProductsGrid from './product/ProductsGrid';
import ProductSectionHeader from './product/ProductSectionHeader';
import { products } from '@/data/products';

const ProductShowcase = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Listen for custom event from CategorySection
  useEffect(() => {
    const handleCategorySelected = (event: CustomEvent) => {
      setSelectedCategory(event.detail.category);
    };

    // Add event listener
    window.addEventListener('categorySelected', handleCategorySelected as EventListener);

    // Clean up
    return () => {
      window.removeEventListener('categorySelected', handleCategorySelected as EventListener);
    };
  }, []);

  // Filter products when selectedCategory changes
  useEffect(() => {
    if (selectedCategory) {
      const filtered = products.filter(product => product.category === selectedCategory);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategory]);

  const handleViewAllProducts = () => {
    // Reset the category filter
    setSelectedCategory(null);
    
    toast({
      title: "View All Products",
      description: "Browsing all available products",
    });
  };

  const getSectionTitle = () => {
    return selectedCategory ? `${selectedCategory}` : 'Featured Products';
  };

  const getSectionDescription = () => {
    return selectedCategory 
      ? `Browse our selection of ${selectedCategory.toLowerCase()}`
      : 'Discover our most popular products, handpicked for quality and value. From premium sports equipment to unique gifts, we have something for everyone.';
  };

  return (
    <section id="products" className="py-16">
      <div className="container mx-auto px-4">
        <ProductSectionHeader 
          title={getSectionTitle()}
          description={getSectionDescription()}
          showBackButton={!!selectedCategory}
          onBackButtonClick={() => setSelectedCategory(null)}
        />

        <ProductsGrid 
          products={filteredProducts} 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        
        {!selectedCategory && (
          <div className="mt-12 text-center">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-shop-purple text-shop-purple hover:bg-shop-light-purple"
              onClick={handleViewAllProducts}
            >
              View All Products
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductShowcase;
