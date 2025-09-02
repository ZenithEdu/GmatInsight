import React, { useState, useEffect } from 'react';
import { Star, ChevronRight, User, Quote, Award, TrendingUp, Target } from 'lucide-react';

const GMATTestimonialsBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const gmatTestimonials = [
    {
      id: 1,
      name: "Connor Walsh",
      score: "755",
      percentile: "99.9th percentile",
      quote: "The people that work on TTP's material are truly Masters. They've spent a lot of time trying out what the best way to learn all of this content is and what content specifically should be learned in what order.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face&auto=format&q=80",
      background: "from-blue-600 via-blue-700 to-indigo-800",
      badge: "99.9th percentile",
      improvement: "+105 points",
      profession: "Investment Banking Analyst"
    },
    {
      id: 2,
      name: "Priya Sharma",
      score: "740",
      percentile: "97th percentile",
      quote: "The quantitative strategies helped me ace the most challenging sections in just 8 weeks. The structured approach made complex concepts click instantly and boosted my confidence dramatically.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b6b612b86?w=400&h=500&fit=crop&crop=face&auto=format&q=80",
      background: "from-purple-600 via-pink-600 to-rose-700",
      badge: "Quant Master",
      improvement: "+90 points",
      profession: "Management Consultant"
    },
    {
      id: 3,
      name: "Michael Rodriguez",
      score: "750",
      percentile: "98th percentile",
      quote: "From 650 to 750 - this program transformed my approach completely. The verbal frameworks are revolutionary and the practice questions mirror the actual test perfectly.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face&auto=format&q=80",
      background: "from-emerald-600 via-teal-600 to-cyan-700",
      badge: "Top 2%",
      improvement: "+100 points",
      profession: "Strategy Director"
    },
    {
      id: 4,
      name: "Sarah Chen",
      score: "730",
      percentile: "96th percentile",
      quote: "The comprehensive study plan and adaptive learning system helped me identify my weak areas and turn them into strengths. Couldn't have achieved this score without their methodology.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&crop=face&auto=format&q=80",
      background: "from-orange-500 via-amber-600 to-yellow-600",
      badge: "Elite Score",
      improvement: "+80 points",
      profession: "Product Manager"
    },
    {
      id: 5,
      name: "David Kim",
      score: "760",
      percentile: "99th percentile",
      quote: "The personalized feedback and detailed explanations for every question helped me understand not just what the right answer is, but why it's right. This depth of understanding was game-changing.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&crop=face&auto=format&q=80",
      background: "from-slate-600 via-gray-700 to-zinc-800",
      badge: "Top 1%",
      improvement: "+110 points",
      profession: "Financial Analyst"
    },
    {
      id: 6,
      name: "Amanda Foster",
      score: "720",
      percentile: "94th percentile",
      quote: "The timing strategies and question prioritization techniques were invaluable. I went from running out of time to finishing with 5 minutes to spare in both sections.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=500&fit=crop&crop=face&auto=format&q=80",
      background: "from-violet-600 via-purple-700 to-indigo-800",
      badge: "Top 6%",
      improvement: "+95 points",
      profession: "Marketing Director"
    }
  ];

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === gmatTestimonials.length - 1 ? 0 : prevIndex + 1
        );
      }, 7000);
      return () => clearInterval(interval);
    }
  }, [isPaused, gmatTestimonials.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Award className="w-4 h-4 mr-2" />
            Proven Results • 50,000+ Students
          </div>
          <h2 className="text-5xl md:text-5xl font-semibold text-gray-900 mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              GMAT Masters
            </span>{" "}
            <span className="text-gray-800">Success Stories</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Join thousands of professionals who've achieved <span className="font-bold text-blue-600">top 1% scores</span> 
            {" "}and transformed their careers with our proven methodology
          </p>
        </div>

        {/* Testimonials Slider */}
        <div 
          className="relative bg-transparent rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative h-auto min-h-[450px]">
            {gmatTestimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="flex flex-col lg:flex-row h-full">
                  {/* Student Image Section - Full Cover */}
                  <div className={`w-full lg:w-2/5 h-80 lg:h-full bg-gradient-to-br ${testimonial.background} relative overflow-hidden`}>
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 left-0 w-full h-full"
                           style={{
                             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                             backgroundSize: '60px 60px'
                           }}>
                      </div>
                    </div>
                    
                    {/* Student Image */}
                    <div className="absolute inset-0">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-fit"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      {/* Fallback */}
                      <div className={`w-full h-full bg-gradient-to-br ${testimonial.background} flex items-center justify-center hidden`}>
                        <User className="w-24 h-24 text-white opacity-60" />
                      </div>
                    </div>
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    
                    {/* Student Info at Bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <div className="flex items-center mb-4">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30">
                          <span className="text-sm font-bold">{testimonial.badge}</span>
                        </div>
                        <div className="ml-3 bg-green-500/90 backdrop-blur-sm rounded-full px-3 py-1 border border-green-400/30">
                          <span className="text-xs font-semibold flex items-center">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            {testimonial.improvement}
                          </span>
                        </div>
                      </div>
                      
                      <h3 className="text-3xl font-bold mb-2">{testimonial.name}</h3>
                      <p className="text-lg opacity-90 mb-2">{testimonial.profession}</p>
                      
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className="text-4xl font-bold">{testimonial.score}</div>
                          <div className="text-sm opacity-80">GMAT Score</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold">{testimonial.percentile}</div>
                          <div className="text-sm opacity-80">Percentile</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="w-full lg:w-3/5 p-8 md:p-12 lg:p-16">
                    <div className="max-w-2xl">
                      {/* Rating */}
                      <div className="flex items-center mb-6">
                        <div className="flex mr-3">
                          {renderStars(testimonial.rating)}
                        </div>
                        <span className="text-sm text-gray-500 font-medium">Perfect 5.0 Rating</span>
                      </div>
                      
                      {/* Quote */}
                      <blockquote className="text-2xl md:text-xl text-gray-800 leading-relaxed mb-10 relative">
                        <Quote className="absolute -top-4 -left-4 w-10 h-10 text-blue-200 -rotate-180" />
                        <p className="relative z-10 pl-6 italic">{testimonial.quote}</p>
                        <Quote className="absolute -bottom-2 right-0 w-10 h-10 text-blue-200" />
                      </blockquote>
                      
                      {/* Achievement Stats */}
                      <div className="grid grid-cols-2 gap-6 mb-8">
                        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                          <div className="flex items-center text-blue-600 mb-2">
                            <Target className="w-5 h-5 mr-2" />
                            <span className="font-semibold">Score Achievement</span>
                          </div>
                          <div className="text-2xl font-bold text-blue-700">{testimonial.score}</div>
                        </div>
                        <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                          <div className="flex items-center text-green-600 mb-2">
                            <TrendingUp className="w-5 h-5 mr-2" />
                            <span className="font-semibold">Improvement</span>
                          </div>
                          <div className="text-2xl font-bold text-green-700">{testimonial.improvement}</div>
                        </div>
                      </div>
                      
                      {/* Master Student Badge */}
                      {/* <div className="inline-flex items-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-full shadow-lg">
                        <Star className="w-5 h-5 fill-current mr-2" />
                        <span className="font-semibold">Verified Master Student</span>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {gmatTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-blue-600 scale-125 shadow-lg' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default GMATTestimonialsBanner;