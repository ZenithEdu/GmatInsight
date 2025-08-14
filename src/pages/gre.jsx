import React, { useState, useEffect } from 'react';
import { Clock, BookOpen, Users, Star, Award, Target, TrendingUp, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';


const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop",
      title: "Comprehensive GRE Prep"
    },
    {
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
      title: "Vocabulary Mastery"
    },
    {
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop",
      title: "Quantitative Excellence"
    },
    {
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
      title: "Analytical Writing"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const features = [
    {
      icon: <Target className="w-6 h-6 text-blue-600" />,
      title: "Score 320+",
      description: "Proven strategies to achieve top GRE scores"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-green-600" />,
      title: "95% Success Rate",
      description: "Students achieve their target scores"
    },
    {
      icon: <Award className="w-6 h-6 text-purple-600" />,
      title: "Expert Instructors",
      description: "Learn from GRE specialists with 10+ years experience"
    }
  ];

  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden mt-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-purple-100/20"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-30" style={{backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"}}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center bg-blue-100 backdrop-blur-sm rounded-full px-4 py-2 text-blue-800 text-sm font-medium">
                <Star className="w-4 h-4 mr-2 fill-current text-blue-600" />
                Top-Rated GRE Preparation Platform
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-semibold leading-tight">
                Ace the
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> GRE</span>
                <br />
                with Confidence
              </h1>
              
              <p className="text-lg text-gray-600">
                Join thousands of successful students who achieved their dream graduate school admissions. 
                Our comprehensive GRE prep courses combine expert instruction, vocabulary building, 
                and proven strategies to maximize your score.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="bg-white backdrop-blur-sm rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3">
                    {feature.icon}
                    <div>
                      <h3 className="font-semibold text-sm text-gray-800">{feature.title}</h3>
                      <p className="text-xs text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white  font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform shadow-lg">
                Start Free Trial
              </button>
              <button className="bg-white hover:bg-gray-50 text-gray-800 font-semibold py-4 px-8 rounded-lg transition-all duration-300 border border-gray-300 hover:border-gray-400 shadow-sm">
                View Course Details
              </button>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-8 pt-6 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">30,000+</div>
                <div className="text-sm text-gray-600">Students Enrolled</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">325</div>
                <div className="text-sm text-gray-600">Average Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">95%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Right Content - Image Carousel */}
          <div className="relative">
            <div className="relative h-96 lg:h-[500px] rounded-tl-[4.5rem] rounded-br-[4.5rem] overflow-hidden shadow-2xl">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{slide.title}</h3>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-white/90">Proven GRE Success Method</span>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800 p-2 rounded-full transition-all duration-300 shadow-md"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800 p-2 rounded-full transition-all duration-300 shadow-md"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-blue-600 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CourseCard = ({ course }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? 'fill-blue-500 text-blue-500' 
            : i < rating 
            ? 'fill-blue-300 text-blue-300' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg shadow-lg border-2 border-dashed border-gray-300 p-6 hover:shadow-xl transition-shadow duration-300">
      {/* Course Image */}
      <div className="relative mb-4">
        <img 
          src={course.image} 
          alt={course.title}
          className="w-full h-48 object-cover rounded-lg"
        />
        <div className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md">
          <Award className="w-5 h-5 text-blue-500" />
        </div>
      </div>

      {/* Rating and Price */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="flex">{renderStars(course.rating)}</div>
          <span className="text-gray-600 text-sm">{course.rating}</span>
        </div>
        <span className="text-2xl font-bold text-blue-600">${course.price}</span>
      </div>

      {/* Course Title */}
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{course.title}</h3>

      {/* Course Stats */}
      <div className="flex items-center gap-6 mb-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <BookOpen className="w-4 h-4" />
          <span>{course.lessons} Lessons</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          <span>{course.modules} Modules</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{course.duration} Months</span>
        </div>
      </div>

      {/* Course Description */}
      <p className="text-gray-600 mb-4 text-sm leading-relaxed">
        {course.description}
      </p>

      {/* Credential */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-800 mb-2">Credential</h4>
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-blue-500" />
          <span className="text-sm text-gray-600">{course.credential}</span>
        </div>
      </div>

      {/* Enroll Button */}
      <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
        <span>Enroll</span>
        <div className="bg-blue-600 rounded-full p-1">
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </button>
    </div>
  );
};

const GreCoursesSection = () => {
  const courses = [
    {
      id: 1,
      title: "GRE Verbal Reasoning",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
      rating: 4.8,
      price: 499,
      lessons: 42,
      modules: 7,
      duration: 3,
      description: "Master text completion, sentence equivalence, and reading comprehension with our vocabulary-building strategies and practice exercises.",
      credential: "GRE Official Partner Certification"
    },
    {
      id: 2,
      title: "GRE Quantitative Reasoning",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop",
      rating: 4.7,
      price: 499,
      lessons: 38,
      modules: 6,
      duration: 3,
      description: "Cover arithmetic, algebra, geometry, and data analysis with problem-solving techniques tailored for the GRE quantitative section.",
      credential: "GRE Official Partner Certification"
    },
    {
      id: 3,
      title: "GRE Complete Prep Course",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop",
      rating: 4.9,
      price: 799,
      lessons: 80,
      modules: 12,
      duration: 6,
      description: "Comprehensive GRE preparation covering all sections with vocabulary building, math review, writing strategies, and full-length practice tests.",
      credential: "GRE Official Partner Certification"
    }
  ];

  return (
    <>
      <Navbar/>
      <HeroSection />
      
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center bg-blue-100 rounded-full px-4 py-2 text-blue-600 text-sm font-medium">
              <Target className="w-4 h-4 mr-2" />
              GRE Success Programs
            </div>
          </div>
          
          <h2 className="text-5xl font-semibold text-gray-800 mb-4">
            Most <span className="text-blue-600">Popular GRE Courses</span>
          </h2>
          
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Master the GRE with our expertly designed courses. Achieve your target score with proven strategies, 
            vocabulary building, and comprehensive content review for all sections.
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
      

      <Footer/>
    </>
  );
};

export default GreCoursesSection;