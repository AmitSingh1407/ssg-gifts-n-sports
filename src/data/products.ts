
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

export const products: Product[] = [
  // Cricket Gear category
  {
    id: 1,
    name: 'Premium Cricket Bat',
    price: 1999,
    image: 'https://images.unsplash.com/photo-1593766788306-28561775e01d?auto=format&fit=crop&q=80&w=500',
    category: 'Cricket Gear',
  },
  {
    id: 7,
    name: 'Professional Cricket Ball',
    price: 499,
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=500',
    category: 'Cricket Gear',
  },
  {
    id: 8,
    name: 'Cricket Helmet',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1584714268709-c3dd9c92b378?auto=format&fit=crop&q=80&w=500',
    category: 'Cricket Gear',
  },
  
  // Drones category
  {
    id: 2,
    name: 'Mini Drone with Camera',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?auto=format&fit=crop&q=80&w=500',
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
    image: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&q=80&w=500',
    category: 'Drones',
  },
  
  // Toys category
  {
    id: 3,
    name: 'Educational Building Blocks',
    price: 599,
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=500',
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
    image: 'https://images.unsplash.com/photo-1558679908-541bcf1249ff?auto=format&fit=crop&q=80&w=500',
    category: 'Toys',
  },
  
  // Gift Items category
  {
    id: 4,
    name: 'Artificial Flower Pot',
    price: 349,
    image: 'https://images.unsplash.com/photo-1616500163246-c0afa6eaf032?auto=format&fit=crop&q=80&w=500',
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
    image: 'https://images.unsplash.com/photo-1531040825271-32d3163a9fc5?auto=format&fit=crop&q=80&w=500',
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
    image: 'https://images.unsplash.com/photo-1617082052996-513db5a4aeef?auto=format&fit=crop&q=80&w=500',
    category: 'Sports Goods',
  },
  
  // Water Bottles category
  {
    id: 18,
    name: 'Insulated Water Bottle',
    price: 599,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=500',
    category: 'Water Bottles',
  },
  {
    id: 19,
    name: 'Sports Water Bottle',
    price: 399,
    image: 'https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&q=80&w=500',
    category: 'Water Bottles',
  },
  {
    id: 20,
    name: 'Glass Water Bottle',
    price: 499,
    image: 'https://images.unsplash.com/photo-1556401615-c909c3d67480?auto=format&fit=crop&q=80&w=500',
    category: 'Water Bottles',
  }
];
