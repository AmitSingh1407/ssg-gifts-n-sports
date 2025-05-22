
import React from 'react';
import { 
  Gift, 
  ShoppingBag, 
  Bath, // Using Bath as a replacement since Bat is not available
  FlagTriangleRight, 
  Gamepad2,
  Beer 
} from "lucide-react";

const categories = [
  {
    id: 1,
    name: 'Sports Goods',
    icon: <FlagTriangleRight className="w-10 h-10" />,
    color: 'bg-shop-soft-yellow',
    description: 'Quality sports equipment for professionals and enthusiasts'
  },
  {
    id: 2,
    name: 'Cricket Gear',
    icon: <Bath className="w-10 h-10" />, // Using Bath as a temporary icon
    color: 'bg-shop-soft-green',
    description: 'Professional cricket bats, balls and accessories'
  },
  {
    id: 3,
    name: 'Drones',
    icon: <Gamepad2 className="w-10 h-10" />,
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
    icon: <Gift className="w-10 h-10" />,
    color: 'bg-shop-light-purple',
    description: 'Perfect gifts for every occasion'
  },
  {
    id: 6,
    name: 'Water Bottles',
    icon: <Beer className="w-10 h-10" />,
    color: 'bg-shop-soft-green',
    description: 'Stylish and functional drinking bottles'
  }
];

const CategorySection = () => {
  const handleCategoryClick = (categoryName: string) => {
    console.log(`Category ${categoryName} clicked`);
    
    // Dispatch custom event with category name
    const event = new CustomEvent('categorySelected', {
      detail: { category: categoryName }
    });
    window.dispatchEvent(event);
    
    // Scroll to the products section
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

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
            <div
              key={category.id}
              className={`category-card ${category.color} cursor-pointer hover:shadow-lg transition-all transform hover:scale-105`}
              onClick={() => handleCategoryClick(category.name)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleCategoryClick(category.name);
                }
              }}
            >
              <div className="mb-3 text-gray-800">
                {category.icon}
              </div>
              <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
              <p className="text-sm text-gray-700 text-center hidden md:block">
                {category.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
