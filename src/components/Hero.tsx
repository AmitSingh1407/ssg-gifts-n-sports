
import React from 'react';
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

const Hero = () => {
  return (
    <section className="w-full min-h-[70vh] hero-gradient text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-white/10"></div>
      <div className="absolute top-1/2 -left-32 w-64 h-64 rounded-full bg-white/5"></div>
      <div className="absolute -bottom-20 right-1/3 w-48 h-48 rounded-full bg-white/5"></div>
      
      <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0 z-10 text-center md:text-left">
          <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
            Your One-Stop <span className="text-shop-soft-yellow">Gift & Sports</span> Destination
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-xl mx-auto md:mx-0 text-white/90">
            Discover an extensive selection of gifts, toys, sports equipment and more. Quality products delivered to your doorstep.
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <Button size="lg" className="bg-white text-shop-dark-purple hover:bg-gray-100 font-medium">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Shop Now
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Explore Categories
            </Button>
          </div>
        </div>

        <div className="md:w-1/2 flex justify-center md:justify-end relative z-10">
          <div className="relative w-full max-w-md">
            {/* Main Hero Image */}
            <div className="rounded-xl overflow-hidden shadow-2xl animate-float">
              <img
                src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&q=80&w=800"
                alt="SSG Gifts Display"
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-lg overflow-hidden border-4 border-white shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&q=80&w=200" 
                alt="Toys"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-28 h-28 rounded-lg overflow-hidden border-4 border-white shadow-lg rotate-6">
              <img 
                src="https://images.unsplash.com/photo-1487887235947-a955ef187fcc?auto=format&fit=crop&q=80&w=200" 
                alt="Drones" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
