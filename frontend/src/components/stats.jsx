import React, { useState, useEffect, useRef } from "react";
import { BookOpen, Play, HelpCircle, TrendingUp } from "lucide-react";

const Stats = ({ theme = "dark" }) => {
  // Default dark, /about se 'light' pass karo
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    lessons: 0,
    hours: 0,
    questions: 0,
  });

  const sectionRef = useRef(null);

  const finalCounts = {
    lessons: 54885934,
    hours: 2063288,
    questions: 80518145,
  };

  // Theme configurations
  const themeConfigs = {
    dark: {
      background: "bg-gradient-to-br from-gray-900 via-black to-gray-900",
      textPrimary: "text-white",
      textSecondary: "text-gray-300",
      cardBg: "bg-gray-900/80",
      borderColor: "border-gray-800",
      progressBg: "bg-gray-800",
      headerGradient: "from-cyan-400 to-blue-400",
    },
    light: {
      background: "bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200",
      textPrimary: "text-slate-900",
      textSecondary: "text-gray-600",
      cardBg: "bg-white shadow-md",
      borderColor: "border-slate-300",
      progressBg: "bg-gray-300",
      headerGradient: "from-blue-800 to-blue-800",
    },
  };

  const currentTheme = themeConfigs[theme];

  const stats = [
    {
      id: 1,
      count: counts.lessons,
      title: "GMAT LESSONS STUDIED",
      icon: BookOpen,
      color: "cyan",
      gradient:
        theme === "dark"
          ? "from-cyan-400 to-blue-500"
          : "from-cyan-500/80 to-blue-600/80",
      borderColor: theme === "dark" ? "border-cyan-500/50" : "border-cyan-500",
      glowColor: theme === "dark" ? "shadow-cyan-500/20" : "shadow-cyan-500/20",
      bgGradient:
        theme === "dark"
          ? "from-cyan-500/10 to-blue-500/10"
          : "from-cyan-100/40 to-blue-100/40",
      textColor: theme === "dark" ? "text-cyan-400" : "text-slate-800",
    },
    {
      id: 2,
      count: counts.hours,
      title: "HOURS OF VIDEO WATCHED",
      icon: Play,
      color: "purple",
      gradient:
        theme === "dark"
          ? "from-purple-400 to-pink-500"
          : "from-purple-500/80 to-pink-600/80",
      borderColor:
        theme === "dark" ? "border-purple-500/50" : "border-purple-500",
      glowColor:
        theme === "dark" ? "shadow-purple-500/20" : "shadow-purple-500/20",
      bgGradient:
        theme === "dark"
          ? "from-purple-500/10 to-pink-500/10"
          : "from-purple-100/40 to-pink-100/40",
      textColor: theme === "dark" ? "text-purple-400" : "text-slate-800",
    },
    {
      id: 3,
      count: counts.questions,
      title: "PRACTICE QUESTIONS SOLVED",
      icon: HelpCircle,
      color: "green",
      gradient:
        theme === "dark"
          ? "from-green-400 to-emerald-500"
          : "from-green-500/80 to-emerald-600/80",
      borderColor:
        theme === "dark" ? "border-green-500/50" : "border-green-500",
      glowColor:
        theme === "dark" ? "shadow-green-500/20" : "shadow-green-500/20",
      bgGradient:
        theme === "dark"
          ? "from-green-500/10 to-emerald-500/10"
          : "from-green-100/40 to-emerald-100/40",
      textColor: theme === "dark" ? "text-green-400" : "text-slate-800",
    },
  ];

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

      const easeProgress =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      setCounts({
        lessons: Math.floor(finalCounts.lessons * easeProgress),
        hours: Math.floor(finalCounts.hours * easeProgress),
        questions: Math.floor(finalCounts.questions * easeProgress),
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
      className={`relative ${currentTheme.background} py-16 sm:py-20`}
    >
      {/* Subtle background glow - only for dark mode */}
      {theme === "dark" && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
        </div>
      )}

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1
            className={`text-3xl sm:text-4xl font-bold ${currentTheme.textPrimary} mb-4 line-height-2 `}
          >
            Join over{" "}
            <span
              className={`bg-gradient-to-r ${currentTheme.headerGradient} bg-clip-text text-transparent`}
            >
              190,000 students
            </span>{" "}
            who have chosen <br />
            <span
              className={`bg-gradient-to-r ${currentTheme.headerGradient} bg-clip-text text-transparent`}
            >
              GMATInsight prep
            </span>
          </h1>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div key={stat.id} className="relative group">
                {/* Glow Effect Behind Card */}
                {theme === "dark" && (
                  <div
                    className={`absolute -inset-1 bg-gradient-to-r ${stat.gradient} rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-500 ${stat.glowColor}`}
                  />
                )}

                {/* Main Card with Colored Border */}
                <div
                  className={`relative ${currentTheme.cardBg} rounded-xl p-6 border ${stat.borderColor} ${currentTheme.borderColor} backdrop-blur-sm hover:border-${stat.color}-400/70 transition-all duration-300 hover:shadow-lg ${stat.glowColor}`}
                >
                  {/* Icon with matching color */}
                  <div className="flex items-center justify-center mb-5">
                    <div
                      className={`p-3 rounded-lg bg-gradient-to-br ${stat.bgGradient} border ${stat.borderColor}`}
                    >
                      <Icon className={`w-8 h-8 ${stat.textColor}`} />
                    </div>
                  </div>

                  {/* Animated Counter */}
                  <div className="text-center mb-4">
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <span
                        className={`text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
                      >
                        {formatNumber(stat.count)}
                      </span>
                      <TrendingUp className={`w-7 h-7 ${stat.textColor}`} />
                    </div>

                    {/* Progress Bar with smooth finish */}
                    <div
                      className={`h-1 w-28 mx-auto overflow-hidden rounded-full ${currentTheme.progressBg}`}
                    >
                      <div
                        className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full
      transition-[width] duration-[1800ms] ease-in-out`}
                        style={{ width: isVisible ? "100%" : "0%" }}
                      />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="text-center space-y-3">
                    <h3
                      className={`text-sm font-bold ${stat.textColor} uppercase `}
                    >
                      {stat.title}
                    </h3>
                  </div>

                  {/* Corner accents - only for dark mode */}
                  {theme === "dark" && (
                    <>
                      <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-cyan-400/30 rounded-tl-xl" />
                      <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-cyan-400/30 rounded-tr-xl" />
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-cyan-400/30 rounded-bl-xl" />
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-cyan-400/30 rounded-br-xl" />
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Stats;
