
import React from 'react';
import { Button } from "@/components/ui/button";

const products = [
  {
    id: 1,
    name: 'Premium Cricket Bat',
    price: 1999,
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&q=80&w=500',
    category: 'Sports',
  },
  {
    id: 2,
    name: 'Mini Drone with Camera',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1487887235947-a955ef187fcc?auto=format&fit=crop&q=80&w=500',
    category: 'Drones',
  },
  {
    id: 3,
    name: 'Educational Building Blocks',
    price: 599,
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&q=80&w=500',
    category: 'Toys',
  },
  {
    id: 4,
    name: 'Artificial Flower Pot',
    price: 349,
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&q=80&w=500',
    category: 'Gifts',
  }
];

const ProductShowcase = () => {
  return (
    <section id="products" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most popular products, handpicked for quality and value.
            From premium sports equipment to unique gifts, we have something for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
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
                <div className="flex justify-between items-center">
                  <p className="font-bold text-shop-dark-purple">₹{product.price}</p>
                  <Button size="sm" className="bg-shop-purple hover:bg-shop-dark-purple">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button size="lg" variant="outline" className="border-shop-purple text-shop-purple hover:bg-shop-light-purple">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
