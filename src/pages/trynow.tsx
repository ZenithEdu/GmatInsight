import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  Users, 
  Trophy, 
  Shield, 
  Play, 
  BookOpen, 
  MessageSquare, 
  CheckCircle,
  Star,
  ArrowRight
} from 'lucide-react';

const TryNowPage = () => {
  const [animatedNumber, setAnimatedNumber] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedNumber(prev => {
        if (prev < 10000) {
          return prev + 100;
        }
        clearInterval(interval);
        return 10000;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const usps = [
    {
      icon: <Brain className="h-8 w-8 text-blue-600" />,
      title: "Personalized Learning",
      description: "AI-driven adaptive study plans tailored to your strengths and weaknesses"
    },
    {
      icon: <Trophy className="h-8 w-8 text-blue-600" />,
      title: "Highest Success Rate",
      description: "90% of students improve by 100+ points with our proven methodology"
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Expert Instructors",
      description: "Learn from 99th percentile GMAT tutors with years of teaching experience"
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "Money-Back Guarantee",
      description: "Score improvement guaranteed or get your money back, no questions asked"
    }
  ];

  const highlights = [
    { icon: <Play className="h-6 w-6" />, text: "100+ hours of HD video lessons" },
    { icon: <BookOpen className="h-6 w-6" />, text: "5,000+ practice questions with detailed explanations" },
    { icon: <CheckCircle className="h-6 w-6" />, text: "10 full-length adaptive mock tests" },
    { icon: <MessageSquare className="h-6 w-6" />, text: "Live doubt-solving sessions with experts" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Ace the GMAT with the 
              <span className="text-blue-600"> Smartest</span> Prep Course
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Higher Scores Guaranteed – Join {animatedNumber.toLocaleString()}+ Successful Test Takers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg">
                Start Free Trial
              </button>
              <div className="flex items-center space-x-2 text-gray-600">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm">4.9/5 from 2,500+ reviews</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose GMAT Master?</h2>
            <p className="text-xl text-gray-600">Experience the difference with our proven approach</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {usps.map((usp, index) => (
              <div key={index} className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                <div className="flex justify-center mb-4">
                  {usp.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{usp.title}</h3>
                <p className="text-gray-600">{usp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Highlights */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Complete GMAT Preparation</h2>
            <p className="text-xl text-gray-600">Everything you need to succeed, all in one place</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {highlights.map((highlight, index) => (
              <div key={index} className="flex items-center space-x-4 bg-white p-6 rounded-lg shadow-sm">
                <div className="text-blue-600">
                  {highlight.icon}
                </div>
                <span className="text-lg text-gray-700">{highlight.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Trusted by Top Universities</h3>
            <p className="text-gray-600">Students from our program have been accepted to</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 opacity-60">
            {['Harvard', 'Stanford', 'Wharton', 'MIT', 'INSEAD'].map((school) => (
              <div key={school} className="text-center">
                <div className="h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-lg font-semibold text-gray-600">{school}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your GMAT Score?</h2>
          <p className="text-xl text-blue-100 mb-8">Join thousands of successful students who achieved their dream scores</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105">
              Start Free Trial Now
            </button>
            <Link 
              to="/course-details" 
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <span>See Full Course Details</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TryNowPage;