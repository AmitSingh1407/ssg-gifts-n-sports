
import React from 'react';

const AboutSection = () => {
  return (
    <section id="about" className="py-16 bg-shop-light-purple/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">About SSG GIFTS AND SPORTS</h2>
          <p className="text-gray-700 mb-6 text-lg">
            At SSG GIFTS AND SPORTS, we offer an extensive selection of products including drones, toys for young children, 
            artificial flower pots, cricket bats and balls, tiffin boxes, ladies' purses, drinking bottles, and much more. 
            Whether you're looking for the perfect gift or quality sports equipment, we have something for everyone.
          </p>
          <p className="text-gray-700 mb-6 text-lg">
            Through our website, customers can browse product photos, explore our offerings, and place orders online with ease. 
            We also provide home delivery through trusted delivery partners to ensure fast, reliable, and secure service right 
            to your doorstep.
          </p>
          
          <div className="mt-8 flex flex-wrap justify-center gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md w-64">
              <div className="text-4xl font-bold text-shop-purple mb-2">500+</div>
              <div className="text-gray-600">Product Range</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md w-64">
              <div className="text-4xl font-bold text-shop-purple mb-2">1000+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md w-64">
              <div className="text-4xl font-bold text-shop-purple mb-2">24/7</div>
              <div className="text-gray-600">Customer Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
