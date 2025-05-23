
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { ShoppingCart } from "lucide-react";

const products = [
  // Cricket Gear category
  {
    id: 1,
    name: 'Premium Cricket Bat',
    price: 1999,
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&q=80&w=500',
    category: 'Cricket Gear',
  },
  {
    id: 7,
    name: 'Professional Cricket Ball',
    price: 499,
    image: 'https://images.unsplash.com/photo-1617354232539-5cf20380ee38?auto=format&fit=crop&q=80&w=500',
    category: 'Cricket Gear',
  },
  {
    id: 8,
    name: 'Cricket Helmet',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=500',
    category: 'Cricket Gear',
  },
  
  // Drones category
  {
    id: 2,
    name: 'Mini Drone with Camera',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1487887235947-a955ef187fcc?auto=format&fit=crop&q=80&w=500',
    category: 'Drones',
  },
  {
    id: 9,
    name: 'Professional Drone',
    price: 4999,
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80&w=500',
    category: 'Drones',
  },
  {
    id: 10,
    name: 'Racing Drone Kit',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&q=80&w=500',
    category: 'Drones',
  },
  
  // Toys category
  {
    id: 3,
    name: 'Educational Building Blocks',
    price: 599,
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&q=80&w=500',
    category: 'Toys',
  },
  {
    id: 11,
    name: 'Remote Control Car',
    price: 899,
    image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&q=80&w=500',
    category: 'Toys',
  },
  {
    id: 12,
    name: 'Plush Animal Collection',
    price: 449,
    image: 'https://images.unsplash.com/photo-1556012018-50c5c0da73bf?auto=format&fit=crop&q=80&w=500',
    category: 'Toys',
  },
  
  // Gift Items category
  {
    id: 4,
    name: 'Artificial Flower Pot',
    price: 349,
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&q=80&w=500',
    category: 'Gift Items',
  },
  {
    id: 13,
    name: 'Scented Candle Set',
    price: 599,
    image: 'https://images.unsplash.com/photo-1608181831718-74c4d3381076?auto=format&fit=crop&q=80&w=500',
    category: 'Gift Items',
  },
  {
    id: 14,
    name: 'Personalized Photo Frame',
    price: 499,
    image: 'https://images.unsplash.com/photo-1564925312877-0e82d44d462b?auto=format&fit=crop&q=80&w=500',
    category: 'Gift Items',
  },
  
  // Sports Goods category
  {
    id: 15,
    name: 'Basketball',
    price: 699,
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=500',
    category: 'Sports Goods',
  },
  {
    id: 16,
    name: 'Yoga Mat',
    price: 799,
    image: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&q=80&w=500',
    category: 'Sports Goods',
  },
  {
    id: 17,
    name: 'Tennis Racket',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&q=80&w=500',
    category: 'Sports Goods',
  },
  
  // Water Bottles category
  {
    id: 18,
    name: 'Insulated Water Bottle',
    price: 599,
    image: 'https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&q=80&w=500',
    category: 'Water Bottles',
  },
  {
    id: 19,
    name: 'Sports Water Bottle',
    price: 399,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=500',
    category: 'Water Bottles',
  },
  {
    id: 20,
    name: 'Glass Water Bottle',
    price: 499,
    image: 'https://images.unsplash.com/photo-1610631578088-403e8ba6444a?auto=format&fit=crop&q=80&w=500',
    category: 'Water Bottles',
  }
];

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

  const handleViewDetails = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      toast({
        title: product.name,
        description: `Price: ₹${product.price} - View product details`,
      });
    }
  };

  const handleAddToCart = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      // In a real app, this would add to cart state/storage
      toast({
        title: "Added to Cart",
        description: `${product.name} has been added to your cart`,
      });
    }
  };

  const handleViewAllProducts = () => {
    // Reset the category filter
    setSelectedCategory(null);
    
    toast({
      title: "View All Products",
      description: "Browsing all available products",
    });
  };

  return (
    <section id="products" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {selectedCategory ? `${selectedCategory}` : 'Featured Products'}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {selectedCategory 
              ? `Browse our selection of ${selectedCategory.toLowerCase()}`
              : 'Discover our most popular products, handpicked for quality and value. From premium sports equipment to unique gifts, we have something for everyone.'
            }
          </p>
          {selectedCategory && (
            <Button 
              onClick={() => setSelectedCategory(null)}
              className="mt-4 bg-shop-purple hover:bg-shop-dark-purple"
            >
              Show All Products
            </Button>
          )}
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card group">
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
                      onClick={() => handleViewDetails(product.id)}
                    >
                      View Details
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-shop-purple text-shop-purple hover:bg-shop-light-purple"
                      onClick={() => handleAddToCart(product.id)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No products found for this category.</p>
            <Button 
              onClick={() => setSelectedCategory(null)}
              className="bg-shop-purple hover:bg-shop-dark-purple"
            >
              Show All Products
            </Button>
          </div>
        )}
        
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
