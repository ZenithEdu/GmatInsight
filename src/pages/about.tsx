import React, { useState, useEffect } from 'react';
import { ChevronRight, Award, Users, BookOpen, Target, TrendingUp, Star, Globe, Clock, CheckCircle, ArrowRight, Sparkles, Zap, Calendar, User } from 'lucide-react';
import Navbar from '../components/navbar';
import FoundersComponent from '../components/founders';
import Footer from '../components/footer';
import Stats from '../components/stats';

const AboutPage = () => {
  const [activeSection, setActiveSection] = useState('');
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: true
          }));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1
    });

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const achievements = [
    { number: '10,000+', label: 'Students Trained', icon: Users, color: 'bg-blue-500' },
    { number: '750+', label: 'Average Score Improvement', icon: TrendingUp, color: 'bg-emerald-500' },
    { number: '95%', label: 'Success Rate', icon: Award, color: 'bg-purple-500' },
    { number: '8+', label: 'Years of Excellence', icon: Clock, color: 'bg-orange-500' }
  ];

  const services = [
    {
      title: 'Comprehensive GMAT',
      description: 'Complete preparation covering all sections with personalized study plans',
      icon: BookOpen,
      features: ['Quantitative Reasoning', 'Verbal Reasoning', 'Analytical Writing', 'Integrated Reasoning'],
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Expert Mentorship',
      description: 'One-on-one guidance from GMAT experts with proven track records',
      icon: Target,
      features: ['Personal Study Plans', 'Weekly Progress Reviews', 'Mock Test Analysis', 'Strategy Sessions'],
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Practice Tests',
      description: 'Extensive practice materials with detailed performance analytics',
      icon: TrendingUp,
      features: ['Adaptive Practice Tests', 'Performance Analytics', 'Weakness Identification', 'Progress Tracking'],
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      title: 'Global Community',
      description: 'Connect with fellow GMAT aspirants and alumni worldwide',
      icon: Globe,
      features: ['Study Groups', 'Alumni Network', 'Success Stories', 'Peer Support'],
      gradient: 'from-orange-500 to-red-500'
    },
    
{
  title: 'Expert Mentorship',
  description: 'Get personalized guidance from 700+ GMAT scorers and top MBA graduates',
  icon: Users,
  features: ['1-on-1 Coaching', 'Strategy Sessions', 'Mock Interviews', 'Application Review'],
  gradient: 'from-purple-500 to-indigo-500'
},
{
  title: 'Smart Analytics',
  description: 'Track your progress with AI-powered insights and performance analytics',
  icon: User,
  features: ['Performance Tracking', 'Weakness Analysis', 'Progress Reports', 'Adaptive Learning'],
  gradient: 'from-cyan-500 to-blue-500'
}
  ];

  const founders = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Co-Founder & Chief Academic Officer',
      bio: 'Former McKinsey consultant with an MBA from Wharton. Sarah scored 780 on the GMAT and has helped over 5,000 students achieve their target scores.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b332c8a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      credentials: ['MBA, Wharton School', 'GMAT Score: 780', 'Ex-McKinsey Consultant', '10+ Years Teaching']
    },
    {
      name: 'Michael Rodriguez',
      role: 'Co-Founder & CEO',
      bio: 'Technology entrepreneur with an MBA from Stanford. Michael built the first AI-powered GMAT prep platform and has revolutionized test preparation.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      credentials: ['MBA, Stanford GSB', 'GMAT Score: 770', 'Tech Entrepreneur', 'AI/ML Expert']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar/>
      {/* Compact Hero Section */}
       <section className="relative h-[500px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden flex items-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-12 left-12 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-12 right-12 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <div className="space-y-6">
          {/* Brand Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm text-white/80 border border-white/20">
            <Sparkles className="w-4 h-4" />
            <span>Award-Winning GMAT Preparation</span>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-tight">
              About
              <span className="block text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text">
                GMAT<span className="text-blue-400">Master</span>
              </span>
            </h1>
          </div>
          
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 mx-auto rounded-full"></div>
          
          <p className="text-lg md:text-xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            Transforming aspirations into achievements through 
            <span className="text-white font-medium"> world-class GMAT preparation</span>
          </p>
          
          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <button className="group bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2.5 font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
              Our Story
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group border border-white/30 text-white px-6 py-2.5 font-semibold rounded-lg hover:bg-white hover:text-slate-900 transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-2">
              Meet Our Team
              <Users className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>

      {/* Our Story Section */}
 <section 
  id="story"
  data-animate
  className={`py-24 px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
  }`}
>
  <div className="max-w-6xl mx-auto">
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
            <Star className="w-4 h-4" />
            Our Journey
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 bg-clip-text text-transparent leading-tight">
            Our Story
          </h2>
        </div>
        
        <div className="space-y-4 text-lg text-slate-600">
          <p>
            Founded in 2016, GMATMaster emerged from a simple yet powerful vision: to democratize access to world-class GMAT preparation. Our founders, both successful business school graduates, recognized the gap between traditional test prep and the personalized, adaptive learning students truly needed.
          </p>
          <p>
            What started as a small tutoring service has evolved into a comprehensive platform that combines cutting-edge technology with proven pedagogical methods. We've helped thousands of students not just improve their scores, but transform their approach to learning.
          </p>
          <p>
            Today, we're recognized as one of the leading GMAT preparation companies globally, with a track record of consistent results spanning across continents.
          </p>
        </div>
      </div>
      
      <div className="relative">
        <div className="relative overflow-hidden rounded-tr-[4.5rem] rounded-bl-[4.5rem] shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
            alt="Professional students collaborating and studying together"
            className="w-full h-[500px] object-cover"
          />
          
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-20 blur-xl"></div>
      </div>
    </div>
  </div>
</section>

      {/* Our Achievements Section */}
      <Stats/>

      {/* What We Do Section */}
      <section 
        id="services"
        data-animate
        className={`py-24 bg-gradient-to-br from-blue-50 to-indigo-100 px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Our Services
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 bg-clip-text text-transparent mb-6">
              What We Do
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive GMAT preparation services designed to maximize your potential and achieve your target score.
            </p>
          </div>
          
         <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
  {services.map((service, index) => {
    const Icon = service.icon;
    return (
      <div 
        key={index}
        className="group relative bg-gradient-to-br from-blue-50 to-indigo-100 backdrop-blur-sm rounded-xl border border-gray-200/60 hover:border-gray-300/80 transition-all duration-500 hover:shadow-lg hover:-translate-y-1 overflow-hidden"
      >
        {/* Top accent bar */}
        <div className={`h-1 bg-gradient-to-r ${service.gradient} w-full`} />
        
        {/* Main content */}
        <div className="p-6">
          {/* Icon and title section */}
          <div className="flex items-center mb-6">
            <div className={`flex items-center justify-center w-12 h-12 bg-gradient-to-br ${service.gradient} rounded-2xl mr-4 group-hover:scale-105 transition-transform duration-300 shadow-sm`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              {service.title}
            </h3>
          </div>
          
          {/* Description */}
          <p className="text-m text-gray-600 mb-6 leading-relaxed">
            {service.description}
          </p>
          
          {/* Features list */}
          <div className="space-y-3">
            {service.features.map((feature, featureIndex) => (
              <div 
                key={featureIndex}
                className="flex items-start space-x-3 group-hover:translate-x-1 transition-transform duration-300"
                style={{ transitionDelay: `${featureIndex * 50}ms` }}
              >
                <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                  <CheckCircle className="w-3 h-3 text-emerald-600" />
                </div>
                <span className="text-gray-700 text-sm font-medium leading-relaxed">
                  {feature}
                </span>
              </div>
            ))}
          </div>
          
          {/* Bottom section */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-300 rounded-full" />
                <div className="w-2 h-2 bg-gray-300 rounded-full" />
                <div className="w-2 h-2 bg-gray-300 rounded-full" />
              </div>
              <span className="text-xs text-gray-500 font-semibold uppercase tracking-wide">
                Premium
              </span>
            </div>
          </div>
        </div>
        
        {/* Subtle hover gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`} />
      </div>
    );
  })}
</div>
        </div>
      </section>

      {/* Our Founders Section */}
      <FoundersComponent/>

      <Footer/>
    </div>
  );
};

export default AboutPage;