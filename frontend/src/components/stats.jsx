import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Play, HelpCircle, TrendingUp } from 'lucide-react';

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

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animate counters
  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 80;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      const easeProgress = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      
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

  const stats = [
    {
      id: 1,
      count: counts.lessons,
      title: "GMAT LESSONS STUDIED",
      icon: BookOpen,
      color: "cyan",
      gradient: "from-cyan-400 to-blue-500",
      borderColor: "border-cyan-500/50",
      glowColor: "shadow-cyan-500/20",
      bgGradient: "from-cyan-500/10 to-blue-500/10",
      textColor: "text-cyan-400",
    },
    {
      id: 2,
      count: counts.hours,
      title: "HOURS OF VIDEO WATCHED",
      icon: Play,
      color: "purple",
      gradient: "from-purple-400 to-pink-500",
      borderColor: "border-purple-500/50",
      glowColor: "shadow-purple-500/20",
      bgGradient: "from-purple-500/10 to-pink-500/10",
      textColor: "text-purple-400",
    },
    {
      id: 3,
      count: counts.questions,
      title: "PRACTICE QUESTIONS SOLVED",
      icon: HelpCircle,
      color: "green",
      gradient: "from-green-400 to-emerald-500",
      borderColor: "border-green-500/50",
      glowColor: "shadow-green-500/20",
      bgGradient: "from-green-500/10 to-emerald-500/10",
      textColor: "text-green-400",
    }
  ];

  return (
    <div 
      ref={sectionRef}
      className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 py-16 sm:py-20"
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Join over{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              190,000 students
            </span>{' '}
            who have chosen{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              TTP for their GMAT prep
            </span>
          </h1>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {stats.map((stat) => {
            const Icon = stat.icon;
            
            return (
              <div
                key={stat.id}
                className="relative group"
              >
                {/* Glow Effect Behind Card */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${stat.gradient} rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-500 ${stat.glowColor}`} />
                
                {/* Main Card with Colored Border */}
                <div className={`relative bg-gray-900/80 rounded-xl p-6 border ${stat.borderColor} backdrop-blur-sm hover:border-${stat.color}-400/70 transition-all duration-300 hover:shadow-lg ${stat.glowColor} hover:shadow-${stat.color}-500/30`}>
                  
                  {/* Icon with matching color */}
                  <div className="flex items-center justify-center mb-5">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.bgGradient} border ${stat.borderColor}`}>
                      <Icon className={`w-8 h-8 ${stat.textColor}`} />
                    </div>
                  </div>
                  
                  {/* Animated Counter */}
                  <div className="text-center mb-4">
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <span className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                        {formatNumber(stat.count)}
                      </span>
                      <TrendingUp className={`w-7 h-7 ${stat.textColor}`} />
                    </div>
                    
                    {/* Progress Bar with matching gradient */}
                    <div className="h-1.5 w-32 mx-auto overflow-hidden rounded-full bg-gray-800">
                      <div 
                        className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: isVisible ? '100%' : '0%' }}
                      />
                    </div>
                  </div>
                  
                  {/* Card Content */}
                  <div className="text-center space-y-3">
                    <h3 className={`text-sm font-bold ${stat.textColor} uppercase tracking-wider`}>
                      {stat.title}
                    </h3>
                  
                  </div>
                  
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-cyan-400/30 rounded-tl-xl" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-cyan-400/30 rounded-tr-xl" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-cyan-400/30 rounded-bl-xl" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-cyan-400/30 rounded-br-xl" />
                </div>
              </div>
            );
          })}
        </div>

        {/* CSS for dynamic shadow colors */}
        <style jsx>{`
          .shadow-cyan-500/20 {
            box-shadow: 0 0 20px rgba(34, 211, 238, 0.2);
          }
          .shadow-purple-500/20 {
            box-shadow: 0 0 20px rgba(168, 85, 247, 0.2);
          }
          .shadow-green-500/20 {
            box-shadow: 0 0 20px rgba(34, 197, 94, 0.2);
          }
          
          .hover\\:shadow-cyan-500\\/30:hover {
            box-shadow: 0 0 30px rgba(34, 211, 238, 0.3);
          }
          .hover\\:shadow-purple-500\\/30:hover {
            box-shadow: 0 0 30px rgba(168, 85, 247, 0.3);
          }
          .hover\\:shadow-green-500\\/30:hover {
            box-shadow: 0 0 30px rgba(34, 197, 94, 0.3);
          }
        `}</style>
      </div>
    </div>
  );
};

export default Stats;