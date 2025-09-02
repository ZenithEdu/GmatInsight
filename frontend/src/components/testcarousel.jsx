import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "MBA Candidate",
      score: "750",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      text: "The comprehensive study materials and practice tests were game-changers for my GMAT prep. Improved my score by 120 points in just 3 months!"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Finance Professional",
      score: "720",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      text: "Outstanding platform with detailed explanations for every question. The adaptive learning system helped me focus on my weak areas effectively."
    },
    {
      id: 3,
      name: "Priya Patel",
      role: "Consultant",
      score: "740",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      text: "The mock tests were incredibly realistic and helped build my confidence. The analytics dashboard showed exactly where I needed improvement."
    },
    {
      id: 4,
      name: "James Wilson",
      role: "Engineer",
      score: "710",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      text: "Excellent question bank with detailed solutions. The mobile app made it easy to study during my commute. Highly recommended!"
    },
    {
      id: 5,
      name: "Lisa Zhang",
      role: "Marketing Manager",
      score: "760",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      text: "The personalized study plan adapted to my schedule perfectly. Achieved my target score on the first attempt. Thank you for the amazing support!"
    },
    {
      id: 6,
      name: "David Kumar",
      role: "Data Analyst",
      score: "730",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      text: "The video explanations were crystal clear and helped me understand complex concepts quickly. Best investment for my GMAT preparation."
    },
    {
      id: 7,
      name: "Emily Johnson",
      role: "Product Manager",
      score: "720",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      text: "Comprehensive coverage of all GMAT topics with excellent practice questions. The progress tracking feature kept me motivated throughout."
    },
    {
      id: 8,
      name: "Alex Thompson",
      role: "Investment Banker",
      score: "750",
      image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face",
      text: "The strategic approach to solving problems saved me valuable time during the actual exam. Couldn't have achieved my score without this platform."
    },
    {
      id: 9,
      name: "Rachel Kim",
      role: "Entrepreneur",
      score: "740",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      text: "The community support and doubt-clearing sessions were incredibly helpful. The platform truly understands what GMAT aspirants need."
    }
  ];

  // Update items per page based on screen size
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1); // Mobile
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2); // Tablet
      } else {
        setItemsPerPage(3); // Desktop
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const totalSlides = Math.ceil(testimonials.length / itemsPerPage);

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, totalSlides]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-blue-900 min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl w-full">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-4 px-4">
            Success Stories from
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400"> GMAT</span>
          </h1>
          <p className="text-base sm:text-lg text-blue-200 px-4">
            Hear from students who achieved their dream scores
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Navigation Buttons - Hidden on mobile */}
          {/* <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2 sm:p-3 text-white transition-all duration-300 hover:scale-110 hidden sm:block"
          >
            <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2 sm:p-3 text-white transition-all duration-300 hover:scale-110 hidden sm:block"
          >
            <ChevronRight size={20} className="sm:w-6 sm:h-6" />
          </button> */}

          {/* Testimonial Cards */}
          <div className="overflow-hidden mx-2 sm:mx-4 lg:mx-8">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="min-w-full flex gap-3 sm:gap-4 lg:gap-6">
                  {testimonials.slice(slideIndex * itemsPerPage, (slideIndex + 1) * itemsPerPage).map((testimonial) => (
                    <div
                      key={testimonial.id}
                      className="flex-1 bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 hover:bg-white/15 transition-all duration-300 hover:transform hover: border border-white/20 shadow-xl"
                    >
                      {/* Profile Section */}
                      <div className="flex items-center mb-4 sm:mb-6">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full object-cover border-2 sm:border-3 border-cyan-400 shadow-lg"
                        />
                        <div className="ml-3 sm:ml-4">
                          <h3 className="text-lg sm:text-xl font-semibold text-white">{testimonial.name}</h3>
                          <p className="text-blue-200 text-xs sm:text-sm">{testimonial.role}</p>
                          <div className="flex items-center mt-1">
                            <span className="text-cyan-400 font-semibold text-sm sm:text-base lg:text-lg">GMAT {testimonial.score}</span>
                            <div className="flex ml-2">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} size={10} className="sm:w-3 sm:h-3 text-yellow-400 fill-current" />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Testimonial Text */}
                      <blockquote className="text-blue-100 text-sm sm:text-base lg:text-lg leading-relaxed italic">
                        "{testimonial.text}"
                      </blockquote>

                      {/* Decorative Element */}
                      <div className="mt-4 sm:mt-6 h-1 w-8 sm:w-12 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"></div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Navigation Buttons */}
          <div className="flex justify-center mt-6 space-x-4 sm:hidden">
            <button
              onClick={prevSlide}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 text-white transition-all duration-300"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 text-white transition-all duration-300"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-cyan-400 w-6 sm:w-8' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;