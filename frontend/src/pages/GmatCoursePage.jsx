import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Users,
  Clock,
  BookOpen,
  Award,
  CheckCircle,
  ArrowRight,
  ChevronRight,
  Star,
  BarChart,
  Target,
  Shield,
  Globe,
} from "lucide-react";

import LessonPlayer from "./LessonPlayer";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function GMATCoursePage() {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    // Check for mobile devices
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Cleanup for potential Vanta.js (if loaded externally)
    return () => {
      const vantaScript = document.querySelector(
        'script[src*="vanta.birds.min.js"]'
      );
      const threeScriptEl = document.querySelector(
        'script[src*="three.min.js"]'
      );
      if (vantaScript) document.body.removeChild(vantaScript);
      if (threeScriptEl) document.body.removeChild(threeScriptEl);
      if (window.VANTA && window.VANTA.current) window.VANTA.current.destroy();

      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const handleStartCourse = () => {
    setSelectedLesson({ id: 1 });
  };

  const handleBuyNow = () => {
    setSelectedLesson({ id: 1 });
  };

  const features = [
    {
      icon: <Star className="w-6 h-6" />,
      title: "750+ Score Guarantee",
      desc: "Proven strategies for high scores",
    },
    {
      icon: <BarChart className="w-6 h-6" />,
      title: "Adaptive Practice",
      desc: "AI-powered question bank",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Personalized Plan",
      desc: "Custom study schedule",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Money Back Guarantee",
      desc: "Score improvement guarantee",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Community",
      desc: "Connect with peers worldwide",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Certification",
      desc: "Official completion certificate",
    },
  ];

  const courseDetails = [
    {
      icon: <BookOpen size={20} />,
      title: "Comprehensive Lessons",
      desc: "Structured lessons covering all GMAT topics with real examples.",
    },
    {
      icon: <Clock size={20} />,
      title: "Flexible Duration",
      desc: "Learn at your own pace with access to all modules for 12 months.",
    },
    {
      icon: <Award size={20} />,
      title: "Certification",
      desc: "Receive an official certificate upon successful completion.",
    },
    {
      icon: <Users size={20} />,
      title: "Expert Tutors",
      desc: "Learn from experienced instructors with proven track records.",
    },
    {
      icon: <BookOpen size={20} />,
      title: "Practice Tests",
      desc: "Test your knowledge with regular quizzes and mock exams.",
    },
    {
      icon: <Clock size={20} />,
      title: "Time Management Tips",
      desc: "Learn strategies to manage your time effectively during exams.",
    },
  ];

  const courseIncludes = [
    "No Pre-requisite Required",
    "170+ hours Video Content",
    "450+ Curated Practice Questions",
    "MEGA Problem-Solving Classes",
    "Live Resume & Interview Preparation",
    "Quant - Beginner to Advanced",
    "Dedicated Doubt Forum",
    "Course Completion Certificate",
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
        {/* Hero Section */}
        <div
          ref={heroRef}
          className="relative pt-24 pb-16 md:pt-28 md:pb-20 lg:pt-32 lg:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />

          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-blue-500/10 animate-pulse" />

          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-1 gap-8 lg:gap-12 items-center">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center bg-blue-500/10 backdrop-blur-md border border-blue-600 rounded-full px-3 py-1 animate-fade-in mb-4">
                  <span className="flex h-1 w-1 bg-cyan-400 rounded-full mr-2 animate-ping"></span>
                  <span className="text-xs font-base text-white">
                    New Syllabus Updated 2025
                  </span>
                </div>
                <h1 className="text-6xl font-bold tracking-tight text-white mb-4 leading-tight">
                  GMAT
                  <span className="text-transparent bg-clip-text bg-gradient-to-r  from-cyan-200 to-blue-300 animate-gradient">
                    {" "}
                    Quantitative Reasoning
                  </span>
                </h1>
                <p className="text-lg text-gray-200 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Join thousands of students who crushed the GMAT. Structured
                  video lessons, adaptive quizzes, and proven strategies to hit
                  750+.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <button
                    onClick={handleStartCourse}
                    className="px-4 sm:px-6 py-2.5 sm:py-3 bg-white text-slate-900 rounded-xl font-bold text-sm sm:text-base hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center transform hover:-translate-y-1"
                  >
                    Start Learning <ArrowRight className="ml-1.5 w-4 h-4" />
                  </button>

                  <button className="px-4 sm:px-6 py-2.5 sm:py-3 bg-transparent border-2 border-white/50 text-white rounded-xl font-bold text-sm sm:text-base hover:bg-white/10 transition-all duration-300 backdrop-blur-sm flex items-center justify-center transform hover:-translate-y-1">
                    <Play className="mr-1.5 w-4 h-4" /> Watch Demo
                  </button>
                </div>

                <div className="mt-7 mb-2 flex flex-col sm:flex-row items-center gap-4 text-sm font-medium text-gray-300">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-slate-800 overflow-hidden ring-2 ring-slate-900"
                      >
                        <img
                          src={`https://i.pravatar.cc/100?img=${i + 10}`}
                          alt="User"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <p>Trusted by 10,000+ students</p>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-4 h-4 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                    <span className="ml-2">4.9/5 (2.4k reviews)</span>
                  </div>
                </div>
              </div>

              {/* Hero side card for mobile/tablet */}
              <div className="lg:hidden mt-10">
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl shadow-2xl p-6 text-white border border-gray-800">
                  <div className="mb-6">
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl font-bold">₹3499</span>
                      <span className="text-xl text-gray-500 line-through">
                        ₹7000
                      </span>
                      <span className="text-sm bg-red-500 px-2 py-1 rounded-full">
                        50% OFF
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mt-2">
                      Limited Time Offer
                    </p>
                  </div>
                  <button
                    onClick={handleBuyNow}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-xl transform hover:-translate-y-1"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative -mt-10 lg:-mt-20 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Left Column - About Course */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl border border-gray-100 ">
                  <h2 className="text-4xl font-semibold mb-4 text-blue-900">
                    About this Course
                  </h2>
                  <p className="text-lg leading-relaxed text-gray-700 mb-4">
                    A comprehensive program that covers the fundamentals of GMAT
                    Quantitative Reasoning. It includes lectures and exercises
                    to help students master problem-solving and data
                    sufficiency. This course is suitable for beginners and
                    experienced test-takers and aims to prepare students for
                    achieving top scores in the Quant section.
                  </p>

                  {/* Course Features */}
                  <div>
                    <h3 className="text-2xl font-semibold mb-4 text-blue-900">
                      Course Features :-
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 bg-blue-50/50 p-6 rounded-2xl border border-blue-200">
                      {features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-4">
                          {/* Icon */}
                          <div className="flex-shrink-0 text-blue-600 text-lg sm:text-xl mt-1">
                            {feature.icon}
                          </div>

                          {/* Text */}
                          <div>
                            <h4 className="text-gray-900 font-semibold text-sm sm:text-base leading-snug">
                              {feature.title}
                            </h4>
                            <p className="mt-1 text-gray-600 text-xs sm:text-sm leading-relaxed">
                              {feature.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Course Preview Image - Responsive */}
                <div className="mt-5 rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
                  <div className="relative">
                    <div className="absolute" />
                    <img
                      src="/courseplayerImg.png"
                      alt="Course Player Preview"
                      className="relative w-full max-w-4xl mx-auto shadow-2xl transform transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column - Pricing Card (Desktop) */}
              <div className="hidden lg:block">
                <div className="sticky top-20 -mt-80">
                  <div className="bg-gradient-to-br from-slate-800 to-gray-900 rounded-2xl border border-gray-500 shadow-xl p-6 text-white">
                    {/* Thumbnail */}
                    <div className="mb-8 rounded-2xl overflow-hidden shadow-xl">
                      <div className="relative aspect-video bg-gradient-to-br from-cyan-500 to-blue-600">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <Play className="w-10 h-10 text-white" />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-4 ">
                        <div className="flex -space-x-2">
                          {[1, 2, 3].map((i) => (
                            <img
                              key={i}
                              src={`https://i.pravatar.cc/80?img=${i + 50}`}
                              alt="Instructor"
                              className="w-10 h-10 rounded-full border-3 border-gray-900"
                            />
                          ))}
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Instructor</p>
                          <p className="font-bold">Expert GMAT Faculty</p>
                        </div>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="mb-8">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold">₹3499</span>
                        <span className="text-xl text-gray-400 line-through">
                          ₹7000
                        </span>
                        <span className="text-xs bg-red-500/50 border border-red-500 px-1.5 py-0.5 rounded-full">
                          50% Off
                        </span>
                      </div>
                    </div>

                    {/* Course Includes */}
                    <div className="mb-8">
                      <h3 className="text-xl font-bold mb-4">
                        This Course Includes :
                      </h3>
                      <ul className="space-y-3">
                        {courseIncludes.map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={handleBuyNow}
                      className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center"
                    >
                      Enroll Now
                      <ChevronRight className="ml-2 w-5 h-5" />
                    </button>

                    {/* Additional Info */}
                    <div className="mt-6 text-center">
                      <p className="text-sm text-gray-400">
                        <span className="text-green-400">30-Day</span> Money
                        Back Guarantee
                      </p>
                      <div className="flex items-center justify-center mt-4 text-sm text-gray-400">
                        <Shield className="w-4 h-4 mr-2" />
                        <span>Secure Payment</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating CTA for mobile */}
        {isMobile && (
          <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 shadow-2xl z-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold">Start Learning Today</p>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold">₹3499</span>
                  <span className="text-sm line-through">₹7000</span>
                </div>
              </div>
              <button
                onClick={handleBuyNow}
                className="bg-white text-purple-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition-all"
              >
                Buy Now
              </button>
            </div>
          </div>
        )}

        {/* Lesson Player Overlay */}
        {selectedLesson && (
          <LessonPlayer
            selectedLesson={selectedLesson}
            onClose={() => setSelectedLesson(null)}
          />
        )}
      </div>
      <Footer />
    </>
  );
}
