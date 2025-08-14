import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Users, 
  Clock, 
  BookOpen, 
  Award, 
  CheckCircle, 
  Star, 
  MessageCircle,
  ChevronDown,
  ChevronRight,
  Calculator,
  BarChart,
  PieChart,
  Target,
  TrendingUp,
  ChevronLeft
} from 'lucide-react';
import { PlayCircle, Video, HelpCircle } from 'lucide-react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';


import { Check, Shield, CreditCard, Smartphone, Building2 } from 'lucide-react';

const PricingPaymentSection = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [paymentMethod, setPaymentMethod] = useState('card');

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: { monthly: 9, yearly: 7 },
      description: 'Perfect for individuals getting started',
      features: [
        'Up to 5 projects',
        '10GB storage',
        'Email support',
        'Basic analytics',
        'Mobile app access',
        'API access',
        'Custom integrations'
      ],
      popular: false
    },
    {
      id: 'pro',
      name: 'Professional',
      price: { monthly: 29, yearly: 24 },
      description: 'Best for growing businesses and teams',
      features: [
        'Unlimited projects',
        '100GB storage',
        'Priority support',
        'Advanced analytics',
        'Team collaboration',
        'API access',
        'Custom integrations'
      ],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: { monthly: 99, yearly: 79 },
      description: 'For large organizations with custom',
      features: [
        'Everything in Pro',
        'Unlimited storage',
        '24/7 phone support',
        'Custom reporting',
        'SSO integration',
        'Dedicated account manager',
        'SLA guarantee'
      ],
      popular: false
    }
  ];

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
    { id: 'paypal', name: 'PayPal', icon: Shield },
    { id: 'apple', name: 'Apple Pay', icon: Smartphone },
    { id: 'google', name: 'Google Pay', icon: Building2 }
  ];

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
  };

  const calculateSavings = (monthly, yearly) => {
    const monthlyCost = monthly * 12;
    const yearlyCost = yearly * 12;
    return Math.round(((monthlyCost - yearlyCost) / monthlyCost) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Scale your business with our flexible pricing options. No hidden fees, cancel anytime.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-12">
            <div className="bg-slate-800 p-1 rounded-lg border border-slate-700">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-md transition-all duration-300 ${
                  billingCycle === 'monthly'
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2 rounded-md transition-all duration-300 ${
                  billingCycle === 'yearly'
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Yearly
                <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border transition-all duration-300  cursor-pointer ${
                plan.popular
                  ? 'border-purple-500 shadow-2xl shadow-purple-500/20'
                  : selectedPlan === plan.id
                  ? 'border-blue-500 shadow-xl shadow-blue-500/20'
                  : 'border-slate-700 hover:border-slate-600'
              }`}
              onClick={() => handlePlanSelect(plan.id)}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-4">{plan.description}</p>
                
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-4xl font-bold text-white">
                    ${plan.price[billingCycle]}
                  </span>
                  <span className="text-gray-400 ml-2">/month</span>
                </div>
                
                {billingCycle === 'yearly' && (
                  <p className="text-green-400 text-sm">
                    Save {calculateSavings(plan.price.monthly, plan.price.yearly)}% annually
                  </p>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                  selectedPlan === plan.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl'
                    : plan.popular
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg'
                    : 'bg-slate-700 text-white hover:bg-slate-600'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlanSelect(plan.id);
                }}
              >
                {selectedPlan === plan.id ? 'Selected' : 'Choose Plan'}
              </button>
            </div>
          ))}
        </div>

        {/* Payment Section */}
        

        {/* Trust Indicators */}
        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">Trusted by over 10,000+ businesses worldwide</p>
          <div className="flex justify-center items-center space-x-8 text-gray-500">
            <div className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              <span>30-day money back</span>
            </div>
            <div className="flex items-center">
              <Check className="w-5 h-5 mr-2" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center">
              <Star className="w-5 h-5 mr-2" />
              <span>24/7 support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};





export default function GMATCoursePage() {
  const [expandedModule, setExpandedModule] = useState(null);

  const modules = [
    {
      id: 1,
      title: "Arithmetic Fundamentals",
      icon: <Calculator className="w-6 h-6" />,
      lessons: 12,
      duration: "4 hours",
      level: "Beginner",
      topics: [
        { name: "Number Properties & Operations", duration: "45 min", lessons: 3 },
        { name: "Fractions, Decimals & Percentages", duration: "60 min", lessons: 4 },
        { name: "Ratios and Proportions", duration: "35 min", lessons: 2 },
        { name: "Word Problems & Applications", duration: "40 min", lessons: 3 }
      ]
    },
    {
      id: 2,
      title: "Algebra Mastery",
      icon: <Target className="w-6 h-6" />,
      lessons: 15,
      duration: "6 hours",
      level: "Intermediate",
      topics: [
        { name: "Linear Equations & Inequalities", duration: "90 min", lessons: 4 },
        { name: "Quadratic Equations", duration: "75 min", lessons: 4 },
        { name: "Systems of Equations", duration: "60 min", lessons: 3 },
        { name: "Functions & Coordinate Geometry", duration: "105 min", lessons: 4 }
      ]
    },
    {
      id: 3,
      title: "Geometry Concepts",
      icon: <PieChart className="w-6 h-6" />,
      lessons: 10,
      duration: "3.5 hours",
      level: "Intermediate",
      topics: [
        { name: "Lines, Angles & Triangles", duration: "50 min", lessons: 3 },
        { name: "Quadrilaterals & Polygons", duration: "45 min", lessons: 2 },
        { name: "Circles & Arc Length", duration: "55 min", lessons: 3 },
        { name: "3D Geometry & Volume", duration: "60 min", lessons: 2 }
      ]
    },
    {
      id: 4,
      title: "Data Analysis",
      icon: <BarChart className="w-6 h-6" />,
      lessons: 8,
      duration: "3 hours",
      level: "Advanced",
      topics: [
        { name: "Statistics & Probability", duration: "70 min", lessons: 3 },
        { name: "Data Interpretation", duration: "45 min", lessons: 2 },
        { name: "Graphs & Charts", duration: "35 min", lessons: 2 },
        { name: "Combinatorics", duration: "50 min", lessons: 1 }
      ]
    }
  ];

  const getLevelColor = (level) => {
    switch(level) {
      case 'Beginner': return 'bg-green-100 text-green-700 border-green-200';
      case 'Intermediate': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Advanced': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getModuleGradient = (id) => {
    const gradients = [
      'from-slate-800 via-slate-900 to-blue-900',
      'from-slate-800 via-slate-900 to-blue-900',
      'from-slate-800 via-slate-900 to-blue-900',
      'from-slate-800 via-slate-900 to-blue-900'
    ];
    return gradients[id - 1] || gradients[0];
  };

  const testimonials = [
    {
      name: "Sarah Chen",
      score: "730",
      text: "The data sufficiency section was incredibly helpful. Improved my score by 120 points!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Michael Rodriguez", 
      score: "710",
      text: "Comprehensive content and excellent video explanations. Highly recommend!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Priya Patel",
      score: "750",
      text: "The practice questions were exactly like the real GMAT. Perfect preparation!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 mt-14">
      {/* Hero Section */}
      <Navbar/>

      {/* Course Overview */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-xl p-8 mb-16 border-2 border-dashed border-gray-300">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center bg-blue-100 rounded-full px-4 py-2 text-blue-600 text-sm font-medium">
                <Target className="w-4 h-4 mr-2" />
                Course Overview
              </div>
            </div>
            <h2 className="text-4xl font-semibold text-gray-800 mb-4">
              Master <span className="text-blue-600">GMAT Math Concepts</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Master GMAT math concepts with our structured course featuring video lessons, quizzes, and official practice questions. 
              Get the confidence and skills needed to excel in the quantitative section.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-transparent rounded-xl shadow-sm border border-gray-200">
              <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">45 Lessons</h3>
              <p className="text-gray-600">Comprehensive video content</p>
            </div>
            <div className="text-center p-6 bg-transparent rounded-xl shadow-sm border border-gray-200">
              <Clock className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">4 Months</h3>
              <p className="text-gray-600">Self-paced learning</p>
            </div>
            <div className="text-center p-6 bg-transparent rounded-xl shadow-sm border border-gray-200">
              <Target className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">1000+</h3>
              <p className="text-gray-600">Practice questions with solutions</p>
            </div>
          </div>
        </div>

        {/* Course Content/Curriculum */}
         <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center bg-white shadow-lg rounded-full px-6 py-3 text-indigo-600 font-semibold border border-indigo-100">
              <BookOpen className="w-5 h-5 mr-3" />
              Course Curriculum
            </div>
          </div>
          <h1 className="text-5xl font-semibold text-gray-900 mb-4">
            Structured <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Learning Path</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Master mathematics through our carefully crafted curriculum designed by education experts
          </p>
          
          {/* Course Stats */}
          
        </div>

        {/* Course Modules */}
        <div className="space-y-6 mb-16">
          {modules.map((module) => (
            <div key={module.id} className="bg-transparent rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300">
              {/* Module Header */}
              <div 
                className="cursor-pointer"
                onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
              >
                <div className={`h-2 bg-gradient-to-r ${getModuleGradient(module.id)}`}></div>
                <div className="p-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div className={`p-4 rounded-2xl bg-gradient-to-br ${getModuleGradient(module.id)} shadow-lg`}>
                        <div className="text-white">
                          {module.icon}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h2 className="text-2xl font-semibold text-gray-900">{module.title}</h2>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getLevelColor(module.level)}`}>
                            {module.level}
                          </span>
                        </div>
                        <div className="flex items-center space-x-6 text-gray-600">
                          <div className="flex items-center">
                            <Play className="w-4 h-4 mr-2" />
                            <span className="font-medium">{module.lessons} lessons</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            <span className="font-medium">{module.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="bg-gray-50 rounded-full p-3">
                        {expandedModule === module.id ? 
                          <ChevronDown className="w-6 h-6 text-gray-600" /> : 
                          <ChevronRight className="w-6 h-6 text-gray-600" />
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Module Content */}
              {expandedModule === module.id && (
                <div className="border-t border-gray-100 bg-transparent">
                  <div className="p-8">
                    <div className="grid gap-4">
                      {module.topics.map((topic, index) => (
                        <div key={index} className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl text-gray-600 font-semibold text-sm">
                                {index + 1}
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">{topic.name}</h3>
                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                  <div className="flex items-center">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {topic.duration}
                                  </div>
                                  <div className="flex items-center">
                                    <Play className="w-3 h-3 mr-1" />
                                    {topic.lessons} lessons
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <button className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl text-white shadow-lg hover:shadow-xl transition-all duration-200 group">
                                <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Data Sufficiency Section */}
        <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-blue-900 rounded-2xl shadow-xl p-8 mb-16 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-100/10 to-blue-100/10"></div>
          </div>
          <div className="relative z-10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-medium mb-4">
                <Award className="w-4 h-4 mr-2" />
                Special Feature
              </div>
              <h2 className="text-4xl font-bold mb-4">Data Sufficiency Mastery</h2>
              <p className="text-xl opacity-90">Master the most challenging GMAT question type</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/10 backdrop-blur rounded-lg p-6 text-center hover:bg-white/20 transition-colors duration-300">
                <Play className="w-8 h-8 mx-auto mb-3 text-purple-300" />
                <h3 className="font-semibold mb-2">DS Concept Videos</h3>
                <p className="text-sm opacity-80">Step-by-step explanations</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-6 text-center hover:bg-white/20 transition-colors duration-300">
                <BookOpen className="w-8 h-8 mx-auto mb-3 text-purple-300" />
                <h3 className="font-semibold mb-2">Question Format</h3>
                <p className="text-sm opacity-80">Complete format breakdown</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-6 text-center hover:bg-white/20 transition-colors duration-300">
                <Target className="w-8 h-8 mx-auto mb-3 text-purple-300" />
                <h3 className="font-semibold mb-2">Advanced Strategies</h3>
                <p className="text-sm opacity-80">Proven solving techniques</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-6 text-center hover:bg-white/20 transition-colors duration-300">
                <Award className="w-8 h-8 mx-auto mb-3 text-purple-300" />
                <h3 className="font-semibold mb-2">1000+ DS Questions</h3>
                <p className="text-sm opacity-80">With video solutions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        {/* <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-xl p-8 mb-16 text-center border-2 border-dashed border-gray-300">
          <div className="mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center bg-green-100 rounded-full px-4 py-2 text-green-600 text-sm font-medium">
                <Award className="w-4 h-4 mr-2" />
                Special Pricing
              </div>
            </div>
            <h2 className="text-4xl font-semibold text-gray-800 mb-4">
              Affordable <span className="text-green-600">Excellence</span>
            </h2>
          </div>
          
          <div className="max-w-md mx-auto">
            <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-8 text-white shadow-xl">
              <h3 className="text-2xl font-bold mb-4">Complete Course Access</h3>
              <div className="text-6xl font-bold mb-4">¥4,999</div>
              <p className="mb-6 opacity-90">One-time payment, lifetime access</p>
              <button className="w-full bg-white text-orange-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                Enroll Now
              </button>
            </div>
            <div className="mt-6 space-y-2 text-gray-600">
              <p className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                30-day money-back guarantee
              </p>
              <p className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Flexible payment plans available
              </p>
            </div>
          </div>
        </div> */}
        

        {/* Features/Benefits */}
        {/* <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center bg-blue-100 rounded-full px-4 py-2 text-blue-600 text-sm font-medium">
                <Star className="w-4 h-4 mr-2" />
                Course Features
              </div>
            </div>
            <h2 className="text-4xl font-semibold text-gray-800">
              Why Choose <span className="text-blue-600">Our Course</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 hover:bg-gray-50 rounded-lg transition-colors duration-300">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Play className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Video Solutions</h3>
              <p className="text-gray-600">Every question explained with detailed video solutions</p>
            </div>
            <div className="text-center p-6 hover:bg-gray-50 rounded-lg transition-colors duration-300">
              <div className="bg-orange-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Award className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Official Questions</h3>
              <p className="text-gray-600">GMAT official questions plus additional practice</p>
            </div>
            <div className="text-center p-6 hover:bg-gray-50 rounded-lg transition-colors duration-300">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <BarChart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
              <p className="text-gray-600">Monitor your improvement with detailed analytics</p>
            </div>
          </div>
        </div> */}

        {/* Testimonials */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-xl p-8 mb-16 border-2 border-dashed border-gray-300">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center bg-yellow-100 rounded-full px-4 py-2 text-yellow-600 text-sm font-medium">
                <Users className="w-4 h-4 mr-2" />
                Success Stories
              </div>
            </div>
            <h2 className="text-4xl font-semibold text-gray-800 mb-4">
              Student <span className="text-yellow-600">Success Stories</span>
            </h2>
            <p className="text-lg text-gray-600">Join thousands who achieved their GMAT goals</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">GMAT Score: {testimonial.score}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <div className="bg-white rounded-lg p-6 inline-block shadow-md">
              <p className="text-2xl font-bold text-gray-900 mb-2">
                90% of students improved scores by 100+ points
              </p>
              <p className="text-gray-600">Based on 10,000+ student outcomes</p>
            </div>
          </div>
        </div>

        {/* Support Section */}
        {/* <div className="bg-white rounded-2xl shadow-xl p-8 mb-16 text-center">
          <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <MessageCircle className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Need Help?</h2>
          <p className="text-gray-600 mb-6">Our support team is here to help you succeed</p>
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-md">
            Chat with Us
          </button>
        </div> */}

        {/* Final CTA */}
        <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-blue-900 rounded-2xl shadow-xl p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-100/10 to-red-100/10"></div>
          </div>
          <div className="relative z-10">
                          <h2 className="text-4xl font-bold mb-4">Ready to Master GMAT Quantitative?</h2>
              <p className="text-xl opacity-90 mb-8">Join thousands of students who achieved their target scores</p>
              <button className="bg-white text-orange-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg text-lg">
                Enroll Now - Start Your Journey
              </button>
              <p className="mt-6 text-orange-100">Limited spots available for personalized coaching</p>
            </div>
          </div>
        </div>
        <PricingPaymentSection/>
        <Footer/>
      </div>
    
  );
}