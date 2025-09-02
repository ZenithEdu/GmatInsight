import React, { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';
import Footer from './footer';
import Navbar from './navbar';


export default function TestimonialPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock API call - replace with your actual API endpoint
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        // Simulating API call with setTimeout
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - replace with actual API call
        const mockData = [
          {
            id: 1,
            name: "Gloria Morrison",
            title: "MBA Operational",
            score: 715,
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face&auto=format&q=80",
            testimonial: [
              "This GMAT prep platform is fantastic! The study materials are well-structured, with comprehensive practice questions and clear explanations. I've improved my quantitative score by 10 points in just two months.",
              "The platform provides excellent analytics and personalized study plans that helped me identify my weak areas and focus my preparation effectively. The interface is intuitive and the content is regularly updated.",
              "Definitely worth checking out for anyone serious about business school!"
            ]
          }
        ];
        
        setTestimonials(mockData);
        setError(null);
      } catch (err) {
        setError('Failed to load testimonials');
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading testimonials...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='mt-14'>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center justify-center mb-4 lg:mb-6">
            <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>
            <Quote className="mx-2 sm:mx-4 text-green-500 w-6 h-6 sm:w-8 sm:h-8" />
            <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-800 mb-3 lg:mb-4 tracking-wide">
            Client <span className="font-semibold text-green-600">Testimonials</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed px-4">
            Hear what our valued clients say about their experiences working with us
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="space-y-8 lg:space-y-12">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className="max-w-6xl mx-auto">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl lg:rounded-3xl border-2 border-dashed border-green-200 p-4 sm:p-6 lg:p-8 shadow-lg">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
                  
                  {/* Left Side - Client Information */}
                  <div className="flex-shrink-0 w-full lg:w-64 flex flex-row lg:flex-col items-center lg:items-start gap-4 lg:gap-0">
                    {/* Avatar */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full lg:rounded-xl overflow-hidden border-4 border-white shadow-lg flex-shrink-0">
                      <img 
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=4f46e5&color=fff&size=200`;
                        }}
                      />
                    </div>
                    
                    {/* Client Details */}
                    <div className="flex-1 lg:flex-none lg:mt-4">
                      <div className="space-y-1 lg:space-y-2 mb-3 lg:mb-6">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600 font-medium">
                          {testimonial.title}
                        </p>
                      </div>

                      {/* Score Badge */}
                      <div className="inline-block bg-blue-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-semibold text-sm sm:text-lg">
                        {testimonial.score}
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Testimonial Content */}
                  <div className="flex-1 w-full">
                    {/* Quote Icon */}
                    <Quote className="text-3xl lg:text-4xl text-blue-300 mb-3 lg:mb-4 opacity-60" />
                    
                    {/* Testimonial Text */}
                    <div className="space-y-3 lg:space-y-4 text-gray-700 leading-relaxed">
                      {testimonial.testimonial.map((paragraph, pIndex) => (
                        <p key={pIndex} className={`text-base sm:text-lg ${
                          pIndex === testimonial.testimonial.length - 1 ? 'font-medium text-gray-800' : ''
                        }`}>
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Decorative Element */}
        <div className="mt-8 lg:mt-12 text-center">
          <div className="inline-flex items-center space-x-4 text-gray-400">
            <div className="w-6 sm:w-8 h-px bg-gray-300"></div>
            <Quote className="w-4 h-4 sm:w-5 sm:h-5" />
            <div className="w-6 sm:w-8 h-px bg-gray-300"></div>
          </div>
        </div>
        
      </div>
      
    </div>
    <Footer/>
    </div>
  );
}