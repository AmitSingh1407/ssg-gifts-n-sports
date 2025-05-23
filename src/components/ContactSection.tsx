
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactSection = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, we would handle form submission here
    console.log("Form submitted");
  };

  return (
    <section id="contact" className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Get In Touch</h2>
            <p className="text-gray-600 mb-8">
              Have questions about our products or need assistance with your order? 
              Send us a message and our team will get back to you as soon as possible.
            </p>
            
            <div className="bg-gray-50 p-6 rounded-xl mb-6">
              <h3 className="font-semibold mb-4 text-lg">Store Location</h3>
              <p className="text-gray-700 mb-2">123 Main Street</p>
              <p className="text-gray-700 mb-2">Bangalore, Karnataka 560001</p>
              <p className="text-gray-700 mb-2">India</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="font-semibold mb-4 text-lg">Contact Information</h3>
              <p className="text-gray-700 mb-2">Phone: +91 98765 43210</p>
              <p className="text-gray-700 mb-2">Email: info@ssggiftsandsports.com</p>
              <p className="text-gray-700">Hours: 9:00 AM - 8:00 PM, Mon - Sat</p>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-2xl font-semibold mb-6">Send us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <Input id="name" placeholder="Your name" />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <Input id="subject" placeholder="How can we help?" />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <Textarea id="message" placeholder="Type your message here" rows={4} />
                </div>
                
                <Button type="submit" className="w-full bg-shop-purple hover:bg-shop-dark-purple">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
