
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';
import { Truck, Package } from "lucide-react";

const DeliveryPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    email: '',
  });

  const [deliveryMethod, setDeliveryMethod] = useState('standard');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const requiredFields = ['fullName', 'address', 'city', 'state', 'pincode', 'phone'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Process delivery information
    toast({
      title: "Delivery Details Saved",
      description: "Your delivery details have been saved successfully",
    });

    // Navigate to payment page
    navigate('/payment');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8">Delivery Details</h1>
            
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
                <CardDescription>Enter your delivery details to proceed</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium mb-1">Full Name *</label>
                      <Input 
                        id="fullName" 
                        name="fullName" 
                        value={formData.fullName} 
                        onChange={handleInputChange} 
                        placeholder="Enter your full name" 
                      />
                    </div>

                    <div>
                      <label htmlFor="address" className="block text-sm font-medium mb-1">Address *</label>
                      <Input 
                        id="address" 
                        name="address" 
                        value={formData.address} 
                        onChange={handleInputChange} 
                        placeholder="Enter your street address" 
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium mb-1">City *</label>
                        <Input 
                          id="city" 
                          name="city" 
                          value={formData.city} 
                          onChange={handleInputChange} 
                          placeholder="City" 
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium mb-1">State *</label>
                        <Input 
                          id="state" 
                          name="state" 
                          value={formData.state} 
                          onChange={handleInputChange} 
                          placeholder="State" 
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="pincode" className="block text-sm font-medium mb-1">Pincode *</label>
                        <Input 
                          id="pincode" 
                          name="pincode" 
                          value={formData.pincode} 
                          onChange={handleInputChange} 
                          placeholder="Pincode" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number *</label>
                        <Input 
                          id="phone" 
                          name="phone" 
                          value={formData.phone} 
                          onChange={handleInputChange} 
                          placeholder="Phone number" 
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email"
                          value={formData.email} 
                          onChange={handleInputChange} 
                          placeholder="Email address" 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-lg font-medium mb-4">Delivery Method</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div 
                        className={`p-4 border rounded-lg cursor-pointer flex items-start ${deliveryMethod === 'standard' ? 'border-shop-purple bg-shop-light-purple' : ''}`}
                        onClick={() => setDeliveryMethod('standard')}
                      >
                        <Truck className="w-5 h-5 mr-3 mt-1 text-shop-purple" />
                        <div>
                          <h4 className="font-medium">Standard Delivery</h4>
                          <p className="text-sm text-gray-500">Delivery in 3-5 business days</p>
                          <p className="font-medium mt-1">₹49</p>
                        </div>
                      </div>
                      
                      <div 
                        className={`p-4 border rounded-lg cursor-pointer flex items-start ${deliveryMethod === 'express' ? 'border-shop-purple bg-shop-light-purple' : ''}`}
                        onClick={() => setDeliveryMethod('express')}
                      >
                        <Package className="w-5 h-5 mr-3 mt-1 text-shop-purple" />
                        <div>
                          <h4 className="font-medium">Express Delivery</h4>
                          <p className="text-sm text-gray-500">Delivery in 1-2 business days</p>
                          <p className="font-medium mt-1">₹99</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-6">
                <Button 
                  variant="outline" 
                  className="border-shop-purple text-shop-purple hover:bg-shop-light-purple"
                  onClick={() => navigate('/')}
                >
                  Back to Shopping
                </Button>
                <Button 
                  className="bg-shop-purple hover:bg-shop-dark-purple"
                  onClick={handleSubmit}
                >
                  Proceed to Payment
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DeliveryPage;
