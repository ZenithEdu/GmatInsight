import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Play, HelpCircle } from 'lucide-react';

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    lessons: 0,
    hours: 0,
    questions: 0
  });
  
  const sectionRef = useRef(null);
  
  const finalCounts = {
    lessons: 54885934,
    hours: 2063288,
    questions: 80518145
  };

  // Intersection Observer to detect when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animate counters when visible
  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60; // 60 steps for smooth animation
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      // Easing function for smooth animation
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      setCounts({
        lessons: Math.floor(finalCounts.lessons * easeProgress),
        hours: Math.floor(finalCounts.hours * easeProgress),
        questions: Math.floor(finalCounts.questions * easeProgress)
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setCounts(finalCounts);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [isVisible]);

  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  return (
    <div 
      ref={sectionRef}
      className="min-h-[80vh]-screen bg-gradient-to-br from-slate-800 via-slate-900 to-blue-900 flex items-center justify-center px-4 py-20 mb-20"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-cyan-400 rounded-full blur-lg"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-blue-500 rounded-full blur-xl"></div>
        <div className="absolute bottom-40 right-1/3 w-12 h-12 bg-cyan-500 rounded-full blur-lg"></div>
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Header */}
        <h2 className="text-4xl md:text-5xl lg:text-4xl font-semibold text-white mb-4 leading-tight">
          Join over 190,000 students who have
        </h2>
        <h2 className="text-4xl md:text-5xl lg:text-4xl font-semibold text-white mb-16 leading-tight">
          chosen TTP for their GMAT prep
        </h2>
        
        {/* Decorative Line */}
        {/* <div className="w-16 h-1 bg-white mx-auto "></div> */}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Lessons Studied */}
          <div className="text-center group">
            <div className="flex items-center justify-center mb-4">
              <BookOpen className="w-8 h-8 text-cyan-400 mr-3" />
              <span className="text-5xl lg:text-4xl font-bold text-cyan-400 transition-all duration-300">
                {formatNumber(counts.lessons)}
              </span>
            </div>
            <p className="text-white text-m font-medium tracking-wide">
              GMAT LESSONS STUDIED
            </p>
          </div>

          {/* Hours Watched */}
          <div className="text-center group">
            <div className="flex items-center justify-center mb-4">
              <Play className="w-8 h-8 text-cyan-400 mr-3" />
              <span className="text-5xl lg:text-4xl font-bold text-cyan-400 transition-all duration-300">
                {formatNumber(counts.hours)}
              </span>
            </div>
            <p className="text-white text-m font-medium tracking-wide">
              HOURS OF VIDEO WATCHED
            </p>
          </div>

          {/* Questions Solved */}
          <div className="text-center group">
            <div className="flex items-center justify-center mb-4">
              <HelpCircle className="w-8 h-8 text-cyan-400 mr-3" />
              <span className="text-5xl lg:text-4xl font-bold text-cyan-400 transition-all duration-300 ">
                {formatNumber(counts.questions)}
              </span>
            </div>
            <p className="text-white text-m font-medium tracking-wide">
              PRACTICE QUESTIONS SOLVED
            </p>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-20 animate-pulse"></div>
        {/* <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full opacity-20 animate-pulse delay-1000"></div> */}
      </div>
    </div>
  );
};

export default Stats;