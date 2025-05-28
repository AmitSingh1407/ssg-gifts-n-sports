import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CreditCard, QrCode, Coins, Truck, Shield, Lock, CheckCircle, Timer, Plus, Minus, X } from "lucide-react";
import { Product } from "@/data/products";

interface CartItem extends Product {
  quantity: number;
}

const PaymentPage = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState('standard');
  const [pincode, setPincode] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  // Card details state
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
    saveCard: false
  });

  // UPI details state
  const [upiDetails, setUpiDetails] = useState({
    id: '',
    qrScanned: false
  });

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    } else {
      // If no items in cart, redirect to home
      navigate('/');
    }
  }, [navigate]);

  // Base product price from selected product
  const gstRate = 0.18;

  // Calculate order details based on all cart items
  const calculateOrderDetails = () => {
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const gst = Math.round(subtotal * gstRate);
    const deliveryFee = subtotal >= 2000 ? 0 : (deliveryMethod === 'express' ? 99 : 49);
    const codFee = paymentMethod === 'cod' ? 40 : 0;
    const total = subtotal + gst + deliveryFee + codFee;
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    return {
      subtotal,
      gst,
      deliveryFee,
      codFee,
      total,
      totalItems
    };
  };

  const orderDetails = calculateOrderDetails();

  // Timer countdown effect
  useEffect(() => {
    if (isTimerActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (isTimerActive && timeLeft === 0) {
      // Timer expired
      setIsTimerActive(false);
      toast({
        title: "Payment Timeout",
        description: "Your order has been automatically canceled due to timeout.",
        variant: "destructive",
      });
      setTimeout(() => navigate('/'), 2000);
    }
  }, [isTimerActive, timeLeft, navigate]);

  // Handle quantity change for specific item
  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    if (newQuantity >= 1) {
      const updatedItems = cartItems.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      setCartItems(updatedItems);
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    }
  };

  // Remove item from cart
  const handleRemoveItem = (itemId: number) => {
    const updatedItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    
    if (updatedItems.length === 0) {
      navigate('/');
    }
  };

  // Handle payment method change
  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value);
    if (value === 'upi') {
      setIsTimerActive(true);
      setTimeLeft(30);
    } else {
      setIsTimerActive(false);
    }
  };

  // Handle card input changes
  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;
    
    // Format card number with spaces
    if (name === 'number') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) formattedValue = formattedValue.slice(0, 19);
    }
    
    // Format expiry date
    if (name === 'expiry') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
      if (formattedValue.length > 5) formattedValue = formattedValue.slice(0, 5);
    }
    
    setCardDetails(prev => ({ ...prev, [name]: formattedValue }));
  };

  // Handle UPI input changes
  const handleUpiInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpiDetails(prev => ({ ...prev, [name]: value }));
  };

  // Simulate QR scan
  const handleQrScan = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setUpiDetails(prev => ({ ...prev, qrScanned: true }));
      setIsProcessing(false);
      toast({
        title: "QR Code Scanned",
        description: "Waiting for payment confirmation..."
      });
    }, 1500);
  };

  // Handle payment submission
  const handleSubmitPayment = () => {
    if (paymentMethod === 'card') {
      if (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv) {
        toast({
          title: "Missing Information",
          description: "Please fill in all card details",
          variant: "destructive",
        });
        return;
      }
      
      if (cardDetails.number.replace(/\s/g, '').length < 16 || cardDetails.cvv.length < 3) {
        toast({
          title: "Invalid Card Details",
          description: "Please check your card information",
          variant: "destructive",
        });
        return;
      }
    } else if (paymentMethod === 'upi' && !upiDetails.qrScanned && !upiDetails.id) {
      toast({
        title: "Missing Information",
        description: "Please enter your UPI ID or scan the QR code",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setIsTimerActive(false);
    
    setTimeout(() => {
      setIsProcessing(false);
      localStorage.removeItem('cartItems');
      toast({
        title: `${paymentMethod === 'cod' ? 'Order Placed' : 'Payment Successful'}`,
        description: `Your order of ${orderDetails.totalItems} items has been ${paymentMethod === 'cod' ? 'placed' : 'processed'} successfully!`,
      });
      
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }, 2000);
  };

  // Render payment method content
  const renderPaymentMethodContent = () => {
    switch (paymentMethod) {
      case 'cod':
        return (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mt-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                <Coins className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-amber-800">Cash on Delivery</h3>
                <p className="text-sm text-amber-600">Pay with cash when your order arrives</p>
              </div>
            </div>
            <div className="bg-white rounded-md p-4 border border-amber-200">
              <p className="text-sm text-gray-600 mb-2">Additional COD handling fee applies</p>
              <p className="text-lg font-semibold text-amber-700">+ ₹{orderDetails.codFee}</p>
            </div>
          </div>
        );

      case 'card':
        return (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-800">Credit/Debit Card</h3>
                <p className="text-sm text-blue-600">Secure payment with SSL encryption</p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 border border-blue-200">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="cardNumber" className="text-sm font-medium text-gray-700">Card Number</Label>
                  <Input 
                    id="cardNumber" 
                    name="number" 
                    value={cardDetails.number} 
                    onChange={handleCardInputChange} 
                    placeholder="1234 5678 9012 3456" 
                    className="mt-1 h-12 text-lg tracking-wide"
                  />
                </div>
                <div>
                  <Label htmlFor="cardName" className="text-sm font-medium text-gray-700">Cardholder Name</Label>
                  <Input 
                    id="cardName" 
                    name="name" 
                    value={cardDetails.name} 
                    onChange={handleCardInputChange} 
                    placeholder="Enter name as on card" 
                    className="mt-1 h-12"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cardExpiry" className="text-sm font-medium text-gray-700">Expiry Date</Label>
                    <Input 
                      id="cardExpiry" 
                      name="expiry" 
                      value={cardDetails.expiry} 
                      onChange={handleCardInputChange} 
                      placeholder="MM/YY" 
                      className="mt-1 h-12"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardCvv" className="text-sm font-medium text-gray-700">CVV</Label>
                    <Input 
                      id="cardCvv" 
                      name="cvv" 
                      value={cardDetails.cvv} 
                      onChange={handleCardInputChange} 
                      placeholder="123" 
                      type="password" 
                      className="mt-1 h-12"
                      maxLength={4}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-3 pt-2">
                  <Checkbox 
                    id="saveCard" 
                    checked={cardDetails.saveCard} 
                    onCheckedChange={(checked) => 
                      setCardDetails(prev => ({ ...prev, saveCard: checked === true }))
                    } 
                  />
                  <label htmlFor="saveCard" className="text-sm text-gray-600 cursor-pointer">
                    Save this card for faster checkout next time
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 'upi':
        return (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <QrCode className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-green-800">UPI Payment</h3>
                <p className="text-sm text-green-600">Instant & secure UPI payments</p>
              </div>
              {isTimerActive && (
                <div className="flex items-center gap-2 bg-red-100 px-3 py-2 rounded-lg">
                  <Timer className="h-4 w-4 text-red-600" />
                  <span className="font-mono text-sm font-semibold text-red-600">
                    {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                  </span>
                </div>
              )}
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 border border-green-200">
                <h4 className="font-medium mb-4">Scan PhonePe QR Code</h4>
                <div className="flex flex-col items-center">
                  <div className="w-48 h-48 bg-white rounded-lg mb-4 flex items-center justify-center border-2 border-green-200 overflow-hidden">
                    <img 
                      src="/lovable-uploads/5e470996-07c9-4102-b014-9896f83a8b13.png" 
                      alt="PhonePe QR Code" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  {!upiDetails.qrScanned ? (
                    <Button 
                      variant="outline" 
                      onClick={handleQrScan} 
                      disabled={isProcessing}
                      className="w-full border-green-300 text-green-700 hover:bg-green-50"
                    >
                      {isProcessing ? "Scanning..." : "Confirm Payment"}
                    </Button>
                  ) : (
                    <div className="flex items-center gap-2 text-green-600 font-medium">
                      <CheckCircle size={20} />
                      <span>Payment Confirmed</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-green-200">
                <h4 className="font-medium mb-4">Enter UPI ID</h4>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="upiId" className="text-sm font-medium text-gray-700">UPI ID</Label>
                    <Input 
                      id="upiId" 
                      name="id" 
                      value={upiDetails.id} 
                      onChange={handleUpiInputChange} 
                      placeholder="yourname@phonepe" 
                      className="mt-1 h-12"
                    />
                  </div>
                  <div className="text-xs text-gray-500">
                    <p className="mb-2 font-medium">Supported UPI Apps:</p>
                    <div className="grid grid-cols-2 gap-1">
                      <span className="px-2 py-1 bg-gray-100 rounded text-center">PhonePe</span>
                      <span className="px-2 py-1 bg-gray-100 rounded text-center">Google Pay</span>
                      <span className="px-2 py-1 bg-gray-100 rounded text-center">Paytm</span>
                      <span className="px-2 py-1 bg-gray-100 rounded text-center">BHIM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Don't render if no items in cart
  if (cartItems.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Secure Checkout</h1>
              <p className="text-gray-600">Complete your purchase safely and securely</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Payment Methods */}
              <div className="lg:col-span-2">
                {/* Cart Items */}
                <Card className="shadow-sm mb-6">
                  <CardHeader>
                    <CardTitle>Order Details</CardTitle>
                    <CardDescription>Review and manage your cart items</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center gap-4">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div>
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-sm text-gray-600">₹{item.price.toLocaleString()} per item</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="font-semibold text-lg w-12 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRemoveItem(item.id)}
                            className="ml-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Payment method card */}
                <Card className="shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-green-600" />
                      Payment Method
                    </CardTitle>
                    <CardDescription>Choose your preferred payment option</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup 
                      value={paymentMethod} 
                      onValueChange={handlePaymentMethodChange}
                      className="space-y-3"
                    >
                      <div className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value="card" id="card" />
                            <Label htmlFor="card" className="flex items-center gap-3 cursor-pointer font-medium">
                              <CreditCard className="h-5 w-5 text-blue-600" />
                              Credit/Debit Card
                            </Label>
                          </div>
                          <span className="text-sm text-green-600 font-medium">Recommended</span>
                        </div>
                      </div>
                      
                      <div className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${paymentMethod === 'upi' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="upi" id="upi" />
                          <Label htmlFor="upi" className="flex items-center gap-3 cursor-pointer font-medium">
                            <QrCode className="h-5 w-5 text-green-600" />
                            PhonePe / UPI Payment
                          </Label>
                        </div>
                      </div>
                      
                      <div className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-amber-500 bg-amber-50' : 'border-gray-200 hover:border-gray-300'}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value="cod" id="cod" />
                            <Label htmlFor="cod" className="flex items-center gap-3 cursor-pointer font-medium">
                              <Coins className="h-5 w-5 text-amber-600" />
                              Cash on Delivery
                            </Label>
                          </div>
                          <span className="text-sm text-amber-600 font-medium">+ ₹40 fee</span>
                        </div>
                      </div>
                    </RadioGroup>
                    
                    {renderPaymentMethodContent()}
                  </CardContent>
                </Card>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="shadow-sm sticky top-8">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Items ({orderDetails.totalItems})</span>
                        <span>₹{orderDetails.subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">GST (18%)</span>
                        <span>₹{orderDetails.gst}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Delivery Fee</span>
                        <span className={orderDetails.deliveryFee === 0 ? 'text-green-600 font-medium' : ''}>
                          {orderDetails.deliveryFee === 0 ? 'FREE' : `₹${orderDetails.deliveryFee}`}
                        </span>
                      </div>
                      {orderDetails.deliveryFee === 0 && (
                        <p className="text-xs text-green-600">🎉 Free delivery on orders ≥ ₹2000</p>
                      )}
                      {orderDetails.codFee > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">COD Fee</span>
                          <span>₹{orderDetails.codFee}</span>
                        </div>
                      )}
                      <hr className="my-3" />
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>₹{orderDetails.total.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <Label htmlFor="pincode" className="text-sm font-medium text-gray-700">Delivery Pincode</Label>
                      <Input
                        id="pincode"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="Enter pincode"
                        className="mt-1"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {orderDetails.deliveryFee === 0 ? 'Free delivery applied!' : 'Order ₹2000+ for free delivery'}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Truck className="h-4 w-4" />
                      <span>Standard Delivery (3-5 days)</span>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex flex-col space-y-3">
                    <Button 
                      className="w-full h-12 bg-shop-purple hover:bg-shop-dark-purple text-lg font-semibold"
                      onClick={handleSubmitPayment}
                      disabled={isProcessing || (paymentMethod === 'upi' && timeLeft === 0)}
                    >
                      {isProcessing ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Processing...
                        </div>
                      ) : (
                        <>
                          <Lock className="h-4 w-4 mr-2" />
                          {paymentMethod === 'cod' ? 'Place Order' : `Pay ₹${orderDetails.total.toLocaleString()}`}
                        </>
                      )}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigate('/')}
                      disabled={isProcessing}
                    >
                      Back to Shopping
                    </Button>
                    
                    <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                      <Shield className="h-3 w-3" />
                      <span>Secured by SSL encryption</span>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentPage;
