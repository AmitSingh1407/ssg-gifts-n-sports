
import React from 'react';
import { 
  GiftBox, 
  ShoppingBag, 
  Bat, 
  Football, 
  Drone, 
  Gamepad2, 
  Bottle
} from "lucide-react";

const categories = [
  {
    id: 1,
    name: 'Sports Goods',
    icon: <Football className="w-10 h-10" />,
    color: 'bg-shop-soft-yellow',
    description: 'Quality sports equipment for professionals and enthusiasts'
  },
  {
    id: 2,
    name: 'Cricket Gear',
    icon: <Bat className="w-10 h-10" />,
    color: 'bg-shop-soft-green',
    description: 'Professional cricket bats, balls and accessories'
  },
  {
    id: 3,
    name: 'Drones',
    icon: <Drone className="w-10 h-10" />,
    color: 'bg-shop-light-purple',
    description: 'High-tech drones with advanced features'
  },
  {
    id: 4,
    name: 'Toys',
    icon: <Gamepad2 className="w-10 h-10" />,
    color: 'bg-shop-soft-orange',
    description: 'Fun and educational toys for all ages'
  },
  {
    id: 5,
    name: 'Gift Items',
    icon: <GiftBox className="w-10 h-10" />,
    color: 'bg-shop-light-purple',
    description: 'Perfect gifts for every occasion'
  },
  {
    id: 6,
    name: 'Water Bottles',
    icon: <Bottle className="w-10 h-10" />,
    color: 'bg-shop-soft-green',
    description: 'Stylish and functional drinking bottles'
  }
];

const CategorySection = () => {
  return (
    <section id="categories" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Our Categories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse through our wide range of products across multiple categories designed to meet all your gifting and sporting needs.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <a
              key={category.id}
              href="#"
              className={`category-card ${category.color}`}
            >
              <div className="mb-3 text-gray-800">
                {category.icon}
              </div>
              <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
              <p className="text-sm text-gray-700 text-center hidden md:block">
                {category.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
