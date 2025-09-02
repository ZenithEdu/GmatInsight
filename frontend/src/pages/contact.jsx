import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, User, MessageCircle } from 'lucide-react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    workEmail: '',
    companyName: '',
    productInterest: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navbar/>
      {/* Hero Section with Background Image */}
      <div className="relative h-96 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-500 overflow-hidden">
        {/* Background Pattern/Texture */}
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>
        
        {/* Geometric Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute top-20 right-20 w-48 h-48 bg-cyan-300/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-purple-300/20 rounded-full blur-3xl"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-semibold text-white mb-6 tracking-tight">
              Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300">us</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 font-light max-w-2xl mx-auto">
              Ready to transform your business? Let's start the conversation.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16 relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Side - Contact Info */}
          <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-3xl p-8 shadow-2xl border border-gray-100">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Let's Talk</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>

            <div className="space-y-6">
              {/* Phone */}
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-600 text-lg">+91 93609 61919</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Mail</h3>
                  <p className="text-gray-600">For Business - sales@iamneo.ai</p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                <h3 className="font-semibold text-gray-900 mb-2">Business Hours</h3>
                <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-3xl p-8 shadow-2xl border border-gray-100">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Looking for a solution?</h2>
              <p className="text-gray-600 text-lg">
                We'd love to hear from you. Fill out the form below and we'll get back to you shortly.
              </p>
            </div>

            <div className="space-y-6">
              {/* Work Email */}
              <div>
                <label htmlFor="workEmail" className="block text-sm font-semibold text-gray-900 mb-2">
                  Work Email ID <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    id="workEmail"
                    name="workEmail"
                    value={formData.workEmail}
                    onChange={handleInputChange}
                    placeholder="your.email@company.com"
                    required
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-500"
                  />
                </div>
              </div>

              {/* Company Name */}
              <div>
                <label htmlFor="companyName" className="block text-sm font-semibold text-gray-900 mb-2">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Your Company Name"
                    required
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-500"
                  />
                </div>
              </div>

              {/* Product Interest */}
              <div>
                <label htmlFor="productInterest" className="block text-sm font-semibold text-gray-900 mb-2">
                  Product Interest
                </label>
                <select
                  id="productInterest"
                  name="productInterest"
                  value={formData.productInterest}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900"
                >
                  <option value="">Select a product</option>
                  <option value="ai-solutions">AI Solutions</option>
                  <option value="cloud-services">Cloud Services</option>
                  <option value="data-analytics">Data Analytics</option>
                  <option value="consulting">Consulting</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                  Message
                </label>
                <div className="relative">
                  <MessageCircle className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Tell us about your project or requirements..."
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-500 resize-none"
                  ></textarea>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={() => handleSubmit()}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      
      <Footer/>
    </div>
  );
};

export default ContactUs;