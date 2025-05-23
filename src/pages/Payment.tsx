
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
import { CreditCard, QrCode, Coins, Truck } from "lucide-react";

const PaymentPage = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isProcessing, setIsProcessing] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState('standard');
  const [pincode, setPincode] = useState('');
  
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

  // Order details - in a real app, these would come from your cart state
  const [orderDetails, setOrderDetails] = useState({
    subtotal: 2499,
    gst: 450,
    deliveryFee: 49,
    codFee: 0,
    distanceFee: 0,
    total: 2998
  });

  // Update delivery fee based on pincode/distance
  useEffect(() => {
    // Calculate delivery fee based on pincode
    // This is a simplified example - in a real app, you might call an API
    const calculateDeliveryFee = () => {
      if (!pincode) return 49; // Default fee
      
      // Example logic: higher fee for certain areas
      const pincodeNum = parseInt(pincode, 10);
      if (isNaN(pincodeNum)) return 49;
      
      if (pincodeNum >= 500000 && pincodeNum < 600000) {
        return 99; // Higher fee for this region
      } else if (pincodeNum >= 600000) {
        return 149; // Even higher fee for far regions
      }
      
      return 49; // Default fee
    };
    
    const newDeliveryFee = deliveryMethod === 'express' ? 99 : calculateDeliveryFee();
    const codFee = paymentMethod === 'cod' ? 40 : 0;
    
    setOrderDetails(prev => {
      const newTotal = prev.subtotal + prev.gst + newDeliveryFee + codFee;
      return {
        ...prev,
        deliveryFee: newDeliveryFee,
        codFee: codFee,
        total: newTotal
      };
    });
  }, [pincode, deliveryMethod, paymentMethod]);

  // Handle payment method change
  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value);
  };

  // Handle card input changes
  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({ ...prev, [name]: value }));
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
    // Validate based on payment method
    if (paymentMethod === 'card') {
      if (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv) {
        toast({
          title: "Missing Information",
          description: "Please fill in all card details",
          variant: "destructive",
        });
        return;
      }
      
      // Simple card validation
      if (cardDetails.number.length < 16 || cardDetails.cvv.length < 3) {
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

    // Processing payment
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: `${paymentMethod === 'cod' ? 'Order Placed' : 'Payment Successful'}`,
        description: `Your order has been ${paymentMethod === 'cod' ? 'placed' : 'processed'} successfully!`,
      });
      
      // In a real app, you would save the order to your database here
      
      // Redirect to home or order confirmation page
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }, 2000);
  };

  // Render payment method content based on selection
  const renderPaymentMethodContent = () => {
    switch (paymentMethod) {
      case 'cod':
        return (
          <div className="p-4 border rounded-md mt-4">
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <Coins className="h-5 w-5 text-shop-purple" />
              Cash on Delivery
            </h3>
            <p className="text-gray-600 mb-4">Pay with cash when your order is delivered.</p>
            <p className="text-sm font-medium">Additional COD fee: ₹{orderDetails.codFee}</p>
          </div>
        );

      case 'card':
        return (
          <div className="p-4 border rounded-md mt-4">
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-shop-purple" />
              Credit/Debit Card
            </h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input 
                  id="cardNumber" 
                  name="number" 
                  value={cardDetails.number} 
                  onChange={handleCardInputChange} 
                  placeholder="1234 5678 9012 3456" 
                  maxLength={16}
                />
              </div>
              <div>
                <Label htmlFor="cardName">Cardholder Name</Label>
                <Input 
                  id="cardName" 
                  name="name" 
                  value={cardDetails.name} 
                  onChange={handleCardInputChange} 
                  placeholder="John Doe" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cardExpiry">Expiry Date</Label>
                  <Input 
                    id="cardExpiry" 
                    name="expiry" 
                    value={cardDetails.expiry} 
                    onChange={handleCardInputChange} 
                    placeholder="MM/YY" 
                    maxLength={5}
                  />
                </div>
                <div>
                  <Label htmlFor="cardCvv">CVV</Label>
                  <Input 
                    id="cardCvv" 
                    name="cvv" 
                    value={cardDetails.cvv} 
                    onChange={handleCardInputChange} 
                    placeholder="123" 
                    type="password" 
                    maxLength={3}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="saveCard" 
                  checked={cardDetails.saveCard} 
                  onCheckedChange={(checked) => 
                    setCardDetails(prev => ({ ...prev, saveCard: checked === true }))
                  } 
                />
                <label htmlFor="saveCard" className="text-sm text-gray-600 cursor-pointer">
                  Save card for future payments
                </label>
              </div>
            </div>
          </div>
        );

      case 'upi':
        return (
          <div className="p-4 border rounded-md mt-4">
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <QrCode className="h-5 w-5 text-shop-purple" />
              UPI / QR Payment
            </h3>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <p className="text-gray-600 mb-4">Option 1: Scan this QR code with your UPI app</p>
                <div className="border border-dashed border-gray-300 rounded-lg p-4 mb-4 flex flex-col items-center justify-center">
                  <div className="w-48 h-48 bg-gray-100 rounded-md mb-4 flex items-center justify-center">
                    <QrCode size={120} className="text-gray-500" />
                  </div>
                  {!upiDetails.qrScanned ? (
                    <Button 
                      variant="outline" 
                      onClick={handleQrScan} 
                      className="mt-2"
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Processing..." : "Simulate QR Scan"}
                    </Button>
                  ) : (
                    <span className="text-green-600 font-medium">QR Scanned ✓</span>
                  )}
                </div>
              </div>

              <div className="flex-1">
                <p className="text-gray-600 mb-4">Option 2: Enter your UPI ID</p>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="upiId">UPI ID</Label>
                    <Input 
                      id="upiId" 
                      name="id" 
                      value={upiDetails.id} 
                      onChange={handleUpiInputChange} 
                      placeholder="name@upi" 
                    />
                  </div>
                  <div className="text-sm text-gray-500">
                    <p>Supported UPI apps:</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="px-2 py-1 bg-gray-100 rounded-md text-xs">Google Pay</span>
                      <span className="px-2 py-1 bg-gray-100 rounded-md text-xs">PhonePe</span>
                      <span className="px-2 py-1 bg-gray-100 rounded-md text-xs">Paytm</span>
                      <span className="px-2 py-1 bg-gray-100 rounded-md text-xs">Amazon Pay</span>
                      <span className="px-2 py-1 bg-gray-100 rounded-md text-xs">BHIM</span>
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

  // Order summary component
  const OrderSummary = () => {    
    return (
      <div className="border rounded-md p-4 space-y-4">
        <h3 className="font-medium text-lg">Order Summary</h3>
        <div className="space-y-2 divide-y">
          <div className="flex justify-between pb-2">
            <span>Subtotal</span>
            <span>₹{orderDetails.subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between py-2">
            <span>GST (18%)</span>
            <span>₹{orderDetails.gst}</span>
          </div>
          <div className="flex justify-between py-2">
            <span>Delivery Fee</span>
            <span>₹{orderDetails.deliveryFee}</span>
          </div>
          {orderDetails.codFee > 0 && (
            <div className="flex justify-between py-2">
              <span>COD Fee</span>
              <span>₹{orderDetails.codFee}</span>
            </div>
          )}
          <div className="flex justify-between py-2 font-medium">
            <span>Total</span>
            <span>₹{orderDetails.total.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="pt-4">
          <Label htmlFor="pincode" className="mb-1 block">Delivery Pincode</Label>
          <Input
            id="pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            placeholder="Enter delivery pincode"
            className="mb-2"
          />
          <p className="text-xs text-gray-500">
            Delivery charges may vary based on your location
          </p>
        </div>
        
        <div className="pt-2">
          <div className="flex items-center gap-2 mb-2">
            <Truck className="h-4 w-4 text-shop-purple" />
            <span className="font-medium">Delivery Method:</span>
            <span>
              {deliveryMethod === 'standard' ? 'Standard (3-5 days)' : 'Express (1-2 days)'}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8">Payment</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Choose Payment Method</CardTitle>
                    <CardDescription>Select how you would like to pay for your order</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup 
                      value={paymentMethod} 
                      onValueChange={handlePaymentMethodChange}
                      className="grid gap-4"
                    >
                      <div className="flex items-center space-x-2 border rounded-md p-4 hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="cod" id="cod" />
                        <Label htmlFor="cod" className="flex items-center flex-1 cursor-pointer">
                          <span className="ml-2">Cash on Delivery</span>
                          <span className="ml-auto text-sm text-gray-500">+ ₹40 fee</span>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2 border rounded-md p-4 hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex items-center flex-1 cursor-pointer">
                          <span className="ml-2">Credit/Debit Card</span>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2 border rounded-md p-4 hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="upi" id="upi" />
                        <Label htmlFor="upi" className="flex items-center flex-1 cursor-pointer">
                          <span className="ml-2">UPI / QR Payment</span>
                          <span className="ml-auto text-sm text-gray-500">GooglePay, PhonePe, Paytm</span>
                        </Label>
                      </div>
                    </RadioGroup>
                    
                    {renderPaymentMethodContent()}
                  </CardContent>
                </Card>
              </div>
              
              <div className="md:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <OrderSummary />
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-4">
                    <Button 
                      className="w-full bg-shop-purple hover:bg-shop-dark-purple"
                      onClick={handleSubmitPayment}
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Processing..." : (paymentMethod === 'cod' ? 'Place Order' : 'Make Payment')}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full border-shop-purple text-shop-purple hover:bg-shop-light-purple"
                      onClick={() => navigate('/delivery')}
                      disabled={isProcessing}
                    >
                      Back to Delivery
                    </Button>
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
