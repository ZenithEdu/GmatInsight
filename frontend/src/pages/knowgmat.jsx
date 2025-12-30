import React, { useState, useEffect } from "react";
import { Calculator, Book, BarChart3, Clock, ArrowRight, Target, Trophy, Zap } from "lucide-react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";

const testSections = [
  {
    id: "quant",
    title: "Quantitative (Q)",
    subtitle: "21 Questions / 45 Minutes",
    icon: Calculator,
    questions: 21,
    time: 45,
    color: "quant",
    questionTypes: ["Problem Solving"],
    description:
      "Test your mathematical reasoning and problem-solving skills with quantitative questions covering arithmetic, algebra, and geometry.",
    topics: [
      "Overlapping Sets",
      "Statistics",
      "Arithmetic Word Problems",
      "Work Problems",
      "Speed Distance Time",
      "Percentage / Profit and Loss/ Interest Problems",
      "Number Properties",
      "Exponents",
      "Series",
      "Functions",
      "Algebra",
      "Inequality",
      "Permutations and Combinations",
      "Probability",
    ],
  },
  {
    id: "verbal",
    title: "Verbal (V)",
    subtitle: "23 Questions / 45 Minutes",
    icon: Book,
    questions: 23,
    time: 45,
    color: "verbal",
    questionTypes: ["Critical Reasoning (CR)", "Reading Comprehension (RC)"],
    description:
      "Evaluate your ability to read and comprehend written material, reason critically, and correct written material.",
    topics: [
      "Strengthening (CR)",
      "Weakening (CR)",
      "Assumptions (CR)",
      "Inference (CR)",
      "Boldface (CR)",
      "Short RC",
      "Long RC",
    ],
  },
  {
    id: "data-insight",
    title: "Data Insight (DI)",
    subtitle: "20 Questions / 45 Minutes",
    icon: BarChart3,
    questions: 20,
    time: 45,
    color: "data-insight",
    questionTypes: [
      "Data Sufficiency (DS)",
      "Table Analysis",
      "Graphs",
      "Two Part Analysis (TPA)",
      "Multi Source Reasoning (MSR)",
      "(Set of 3 questions)",
    ],
    description:
      "Analyze complex data sets and solve multi-step problems using quantitative reasoning and data interpretation skills.",
    topics: [
      "Overlapping Sets",
      "Statistics",
      "Arithmetic Word Problems",
      "Work Problems",
      "Speed Distance Time",
      "Percentage / Profit and Loss/ Interest Problems",
      "Number Properties",
      "Exponents",
      "Series",
      "Permutations and Combinations",
      "Probability",
      "Non-Math Problems",
    ],
  },
];

const calculateTimePerQuestion = (questions, time) => {
  const timePerQuestion = Math.round((time / questions) * 10) / 10;
  return `${timePerQuestion}min`;
};

const TestSections = () => {
  // Neon Color definitions for each section - VERBAL and DATA INSIGHT COLORS INVERTED
  const neonColors = {
    quant: {
      primary: "bg-cyan-500",
      gradient: "bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-cyan-500/10",
      light: "bg-cyan-500/10",
      border: "border-cyan-500/60",
      text: "text-cyan-600",
      glow: "shadow-[0_0_30px_rgba(34,211,238,0.2)]",
      dark: "from-white/95 via-gray-50 to-gray-100",
      chartColor: "#22d3ee",
      headerBg: "bg-gradient-to-r from-cyan-500/15 to-blue-500/15",
      chartGradient: "from-cyan-400 to-cyan-300",
    },
    verbal: {
      // CHANGED: Purple color for verbal (was green)
      primary: "bg-purple-500",
      gradient: "bg-gradient-to-br from-purple-500/20 via-violet-500/10 to-purple-500/10",
      light: "bg-purple-500/10",
      border: "border-purple-500/60",
      text: "text-purple-600",
      glow: "shadow-[0_0_30px_rgba(168,85,247,0.2)]",
      dark: "from-white/95 via-gray-50 to-gray-100",
      chartColor: "#a855f7",
      headerBg: "bg-gradient-to-r from-purple-500/15 to-violet-500/15",
      chartGradient: "from-purple-400 to-purple-300",
    },
    "data-insight": {
      // CHANGED: Green color for data insight (was purple)
      primary: "bg-emerald-500",
      gradient: "bg-gradient-to-br from-emerald-500/20 via-green-500/10 to-emerald-500/10",
      light: "bg-emerald-500/10",
      border: "border-emerald-500/60",
      text: "text-emerald-600",
      glow: "shadow-[0_0_30px_rgba(52,211,153,0.2)]",
      dark: "from-white/95 via-gray-50 to-gray-100",
      chartColor: "#34d399",
      headerBg: "bg-gradient-to-r from-emerald-500/15 to-green-500/15",
      chartGradient: "from-emerald-400 to-emerald-300",
    },
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Compact Header with Neon Effect - MAIN HEADING DARK BLUE */}
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-900/20 to-blue-500/20 rounded-lg blur-lg opacity-50"></div>
            <h2 className="relative text-4xl font-bold text-blue-900">
              Section <span className="text-blue-600">Details</span>
            </h2>
          </div>
          <p className="text-base text-gray-600 mt-4">
            Deep dive into each section's structure and content
          </p>
        </div>

        {/* Horizontal Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testSections.map((section) => {
            const colors = neonColors[section.id];
            const timePerQuestion = calculateTimePerQuestion(section.questions, section.time);

            return (
              <div
                key={section.id}
                className="group transition-all duration-500 relative"
              >
                {/* Card with Neon Glow - BORDER THICKNESS INCREASED */}
                <div className={`relative rounded-xl overflow-hidden border-2 ${colors.border} bg-white ${colors.glow} hover:shadow-lg hover:${colors.glow.replace('0.2', '0.3')} transition-all duration-500`}>
                  
                  {/* Header with Neon Accent */}
                  <div className={`relative p-6 ${colors.headerBg} border-b-2 ${colors.border}`}>
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-40"></div>
                    
                    <div className="flex items-center justify-between mb-4">
                      {/* Icon with Neon Glow */}
                      <div className="relative">
                        <div className={`absolute -inset-2 ${colors.primary}/20 rounded-full blur-md`}></div>
                        <div className={`relative w-14 h-14 ${colors.light} backdrop-blur-sm rounded-2xl flex items-center justify-center border-2 ${colors.border}`}>
                          <section.icon className={`w-7 h-7 ${colors.text} drop-shadow-lg`} />
                        </div>
                      </div>
                      
                      {/* Stats Section (Replaced chart) */}
                      <div className="text-right">
                        <div className="flex flex-col items-end gap-1">
                          <div className={`text-3xl font-bold ${colors.text}`}>
                            {section.questions}
                          </div>
                          <div className={`text-xs ${colors.text}/70 font-medium`}>Questions</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* MAIN HEADING - DARK BLUE */}
                    <h3 className={`text-xl font-bold text-blue-900 mb-2`}>
                      {section.title}
                    </h3>
                    
                    {/* Subtitle with time per question */}
                    <div className="flex items-center justify-between">
                      <p className="text-gray-700 text-sm">
                        {section.subtitle}
                      </p>
                      {/* ADDED: Time per question display next to subtitle */}
                      <div className={`flex items-center gap-1 px-2 py-1 ${colors.light} rounded-full`}>
                        <Clock className="w-3 h-3" />
                        <span className={`text-xs font-medium ${colors.text}`}>
                          {timePerQuestion}/Q
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-6">
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {section.description}
                    </p>

                    {/* Question Types with Vibrant Accents */}
                    <div>
                      <h4 className={`font-semibold ${colors.text} mb-3 flex items-center text-sm`}>
                        <div className={`w-2 h-2 ${colors.primary} rounded-full mr-2 animate-pulse`} 
                             style={{ animationDuration: '1.5s' }}></div>
                        Question Types
                      </h4>
                      <div className="space-y-3">
                        {section.questionTypes.map((type, idx) => (
                          <div
                            key={idx}
                            className={`flex items-center p-3 ${colors.light} rounded-lg border-2 ${colors.border} hover:${colors.border.replace('60', '80')} transition-all duration-300 hover:bg-white/50`}
                          >
                            <div
                              className={`w-2 h-2 ${colors.primary} rounded-full mr-3 flex-shrink-0`}
                            ></div>
                            <span className="text-gray-800 text-xs font-medium">
                              {type}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Topics Section with Vibrant Grid - CHANGED TO FILLED BG WITH SEPARATION */}
                    <div className={`bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl p-4 border ${colors.border}/20`}>
                      <h4 className={`font-semibold ${colors.text} mb-3 flex items-center text-sm`}>
                        <div className={`w-2 h-2 ${colors.primary} rounded-full mr-2`}></div>
                        Key Topics
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {section.topics.map((topic, idx) => (
                          <div
                            key={idx}
                            className={`relative flex items-center p-2 ${colors.light} rounded-lg hover:bg-white/80 transition-all duration-300`}
                          >
                            <div 
                              className={`w-1.5 h-1.5 ${colors.primary} rounded-full mr-2 flex-shrink-0`}
                            ></div>
                            <span className="text-gray-700 text-xs truncate">
                              {topic}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Corner Neon Accents - THICKER BORDERS */}
                  <div className={`absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 ${colors.border.replace('60', '80')} rounded-tl-xl`}></div>
                  <div className={`absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 ${colors.border.replace('60', '80')} rounded-tr-xl`}></div>
                  <div className={`absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 ${colors.border.replace('60', '80')} rounded-bl-xl`}></div>
                  <div className={`absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 ${colors.border.replace('60', '80')} rounded-br-xl`}></div>
                </div>

                {/* Floating Vibrant Dot */}
                <div className={`absolute -top-2 -right-2 w-3 h-3 ${colors.primary} rounded-full opacity-80 animate-pulse shadow-lg`} 
                     style={{ animationDuration: '1.5s' }}></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const GMATFocusFormat = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 overflow-x-hidden">
      <Navbar />

      {/* Compact Test Structure Flow - UPDATED COLORS FOR VERBAL AND DATA INSIGHT */}
      <section
        id="sections"
        className="py-14 bg-gradient-to-br from-slate-800 via-slate-900 to-blue-900 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 mt-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-3">
              GMAT Full Length Test Structure
            </h2>
            <p className="text-base text-slate-300">
              Three sections, adaptive testing, total duration: 2 hours 15
              minutes
            </p>
          </div>

          {/* Horizontal Flow */}
          <div className="relative max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-center space-y-6 lg:space-y-0 lg:space-x-4">
              {/* Section 1 - Quantitative */}
              <div className="flex flex-col items-center text-center group">
                {/* Enhanced Glow Effect Container */}
                <div className="relative mb-5">
                  {/* Triple Layer Glow */}
                  <div
                    className="absolute -inset-4 bg-blue-500/40 rounded-full blur-2xl group-hover:bg-blue-400/50 transition-all duration-700 animate-pulse"
                    style={{ animationDuration: "3s" }}
                  ></div>
                  <div className="absolute -inset-3 bg-blue-400/30 rounded-full blur-xl group-hover:bg-blue-300/40 transition-all duration-500"></div>
                  <div className="absolute -inset-2 bg-blue-300/20 rounded-full blur-lg group-hover:bg-blue-200/30 transition-all duration-300"></div>

                  {/* Main Icon Circle - Bigger Size */}
                  <div className="relative w-28 h-28 bg-gradient-to-br from-blue-300/20 to-blue-400/30 rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-all duration-300 border-2 border-blue-300/60 backdrop-blur-sm">
                    <Calculator className="w-16 h-16 text-white drop-shadow-2xl" />
                  </div>

                  {/* Floating Particles */}
                  <div
                    className="absolute -top-2 -right-2 w-4 h-4 bg-blue-400 rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300 animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="absolute -bottom-2 -left-2 w-3 h-3 bg-blue-300 rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300 animate-bounce"
                    style={{ animationDelay: "0.3s" }}
                  ></div>
                </div>
                <h3 className="text-xl font-semibold mb-1 group-hover:text-blue-300 transition-colors duration-300">
                  Quantitative
                </h3>
                <p className="text-slate-300 text-sm">21 Q • 45 min</p>
              </div>

              {/* Arrow 1 with subtle glow */}
              <div className="hidden lg:flex flex-col items-center">
                <div className="relative">
                  <div className="absolute -inset-1 bg-blue-500/10 rounded-full blur-sm"></div>
                  <ArrowRight className="relative w-7 h-7 text-slate-300" />
                </div>
              </div>

              {/* Optional Break 1 */}
              <div className="flex flex-col items-center group">
                <div className="relative mb-3">
                  {/* Enhanced Glow */}
                  <div
                    className="absolute -inset-2 bg-amber-500/30 rounded-full blur-xl group-hover:bg-amber-400/40 transition-all duration-500 animate-pulse"
                    style={{ animationDuration: "4s" }}
                  ></div>
                  <div className="absolute -inset-1 bg-amber-400/20 rounded-full blur-lg group-hover:bg-amber-300/30 transition-all duration-300"></div>

                  {/* Break Circle */}
                  <div className="relative w-12 h-12 bg-gradient-to-br from-amber-300/20 to-amber-400/30 rounded-full flex items-center justify-center border-2 border-amber-300/50 backdrop-blur-sm">
                    <Clock className="w-6 h-6 text-amber-300 drop-shadow-lg" />
                  </div>
                </div>
                <p className="text-amber-300 text-xs text-center group-hover:text-amber-200 transition-colors duration-300">
                  Optional Break
                  <br />
                  10 min
                </p>
              </div>

              {/* Arrow 2 */}
              <div className="hidden lg:flex flex-col items-center">
                <div className="relative">
                  <div className="absolute -inset-1 bg-amber-500/10 rounded-full blur-sm"></div>
                  <ArrowRight className="relative w-7 h-7 text-slate-300" />
                </div>
              </div>

              {/* Section 2 - Verbal - CHANGED TO PURPLE */}
              <div className="flex flex-col items-center text-center group">
                <div className="relative mb-5">
                  {/* Triple Layer Glow - PURPLE */}
                  <div
                    className="absolute -inset-4 bg-purple-500/40 rounded-full blur-2xl group-hover:bg-purple-400/50 transition-all duration-700 animate-pulse"
                    style={{ animationDuration: "3s", animationDelay: "0.5s" }}
                  ></div>
                  <div className="absolute -inset-3 bg-purple-400/30 rounded-full blur-xl group-hover:bg-purple-300/40 transition-all duration-500"></div>
                  <div className="absolute -inset-2 bg-purple-300/20 rounded-full blur-lg group-hover:bg-purple-200/30 transition-all duration-300"></div>

                  {/* Main Icon Circle - Bigger Size - PURPLE */}
                  <div className="relative w-28 h-28 bg-gradient-to-br from-purple-300/20 to-purple-400/30 rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-all duration-300 border-2 border-purple-300/60 backdrop-blur-sm">
                    <Book className="w-16 h-16 text-white drop-shadow-2xl" />
                  </div>

                  {/* Floating Particles - PURPLE */}
                  <div
                    className="absolute -top-2 -right-2 w-4 h-4 bg-purple-400 rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300 animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="absolute -bottom-2 -left-2 w-3 h-3 bg-purple-300 rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300 animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
                <h3 className="text-xl font-semibold mb-1 group-hover:text-purple-300 transition-colors duration-300">
                  Verbal
                </h3>
                <p className="text-slate-300 text-sm">23 Q • 45 min</p>
              </div>

              {/* Arrow 3 - PURPLE */}
              <div className="hidden lg:flex flex-col items-center">
                <div className="relative">
                  <div className="absolute -inset-1 bg-purple-500/10 rounded-full blur-sm"></div>
                  <ArrowRight className="relative w-7 h-7 text-slate-300" />
                </div>
              </div>

              {/* Optional Break 2 */}
              <div className="flex flex-col items-center group">
                <div className="relative mb-3">
                  {/* Enhanced Glow */}
                  <div
                    className="absolute -inset-2 bg-amber-500/30 rounded-full blur-xl group-hover:bg-amber-400/40 transition-all duration-500 animate-pulse"
                    style={{ animationDuration: "4s", animationDelay: "1s" }}
                  ></div>
                  <div className="absolute -inset-1 bg-amber-400/20 rounded-full blur-lg group-hover:bg-amber-300/30 transition-all duration-300"></div>

                  {/* Break Circle */}
                  <div className="relative w-12 h-12 bg-gradient-to-br from-amber-300/20 to-amber-400/30 rounded-full flex items-center justify-center border-2 border-amber-300/50 backdrop-blur-sm">
                    <Clock className="w-6 h-6 text-amber-300 drop-shadow-lg" />
                  </div>
                </div>
                <p className="text-amber-300 text-xs text-center group-hover:text-amber-200 transition-colors duration-300">
                  Optional Break
                  <br />
                  10 min
                </p>
              </div>

              {/* Arrow 4 */}
              <div className="hidden lg:flex flex-col items-center">
                <div className="relative">
                  <div className="absolute -inset-1 bg-amber-500/10 rounded-full blur-sm"></div>
                  <ArrowRight className="relative w-7 h-7 text-slate-300" />
                </div>
              </div>

              {/* Section 3 - Data Insight - CHANGED TO GREEN */}
              <div className="flex flex-col items-center text-center group">
                <div className="relative mb-5">
                  {/* Triple Layer Glow - GREEN */}
                  <div
                    className="absolute -inset-4 bg-emerald-500/40 rounded-full blur-2xl group-hover:bg-emerald-400/50 transition-all duration-700 animate-pulse"
                    style={{ animationDuration: "3s", animationDelay: "1s" }}
                  ></div>
                  <div className="absolute -inset-3 bg-emerald-400/30 rounded-full blur-xl group-hover:bg-emerald-300/40 transition-all duration-500"></div>
                  <div className="absolute -inset-2 bg-emerald-300/20 rounded-full blur-lg group-hover:bg-emerald-200/30 transition-all duration-300"></div>

                  {/* Main Icon Circle - Bigger Size - GREEN */}
                  <div className="relative w-28 h-28 bg-gradient-to-br from-emerald-300/20 to-emerald-400/30 rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-all duration-300 border-2 border-emerald-300/60 backdrop-blur-sm">
                    <BarChart3 className="w-16 h-16 text-white drop-shadow-2xl" />
                  </div>

                  {/* Floating Particles - GREEN */}
                  <div
                    className="absolute -top-2 -right-2 w-4 h-4 bg-emerald-400 rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300 animate-bounce"
                    style={{ animationDelay: "0.3s" }}
                  ></div>
                  <div
                    className="absolute -bottom-2 -left-2 w-3 h-3 bg-emerald-300 rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300 animate-bounce"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                </div>
                <h3 className="text-xl font-semibold mb-1 group-hover:text-emerald-300 transition-colors duration-300">
                  Data Insight
                </h3>
                <p className="text-slate-300 text-sm">20 Q • 45 min</p>
              </div>
            </div>

            {/* Mobile Flow Arrows with Glow - UPDATED COLORS */}
            <div className="lg:hidden flex flex-col items-center space-y-3 mt-8">
              <div className="flex items-center space-x-1">
                <div className="relative">
                  <div className="absolute -inset-1 bg-blue-500/20 rounded-full blur-sm"></div>
                  <div className="relative w-2.5 h-2.5 bg-blue-400 rounded-full shadow-lg shadow-blue-500/50"></div>
                </div>
                <div className="w-8 h-0.5 bg-slate-400/50"></div>
                <div className="relative">
                  <div className="absolute -inset-1 bg-purple-500/20 rounded-full blur-sm"></div>
                  <div className="relative w-2.5 h-2.5 bg-purple-400 rounded-full shadow-lg shadow-purple-500/50"></div>
                </div>
                <div className="w-8 h-0.5 bg-slate-400/50"></div>
                <div className="relative">
                  <div className="absolute -inset-1 bg-emerald-500/20 rounded-full blur-sm"></div>
                  <div className="relative w-2.5 h-2.5 bg-emerald-400 rounded-full shadow-lg shadow-emerald-500/50"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Important Note - Compact without box */}
          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-orange-500/10 to-orange-600/10 border-2 border-orange-500/30">
              <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse"></div>
              <p className="text-sm font-medium">
                <span className="text-orange-300">Note:</span>
                <span className="text-orange-200 ml-1">
                  Only one optional break available during the test
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Sections */}
      <TestSections />

      {/* NEW: Call to Action Section */}
<section className="py-16 bg-gradient-to-br from-white to-blue-50 dark:from-slate-900 dark:to-slate-800">
  <div className="max-w-7xl mx-auto px-4">
    
    {/* Heading */}
    <div className="text-center mb-12">
      <div className="relative inline-block">
        <div className="absolute -inset-1 bg-gradient-to-r 
          from-blue-500/20 via-purple-500/20 to-blue-600/20 
          rounded-lg blur-lg opacity-50 dark:opacity-70">
        </div>
        <h2 className="relative text-4xl font-bold text-blue-900 dark:text-slate-100">
          Ready to <span className="text-blue-600 dark:text-blue-400">Test Your Skills?</span>
        </h2>
      </div>
    </div>

    {/* Main Card */}
    <div className="bg-gradient-to-br from-white to-blue-50 
      dark:from-slate-800 dark:to-slate-900
      rounded-2xl p-8 shadow-xl border-2 
      border-blue-200 dark:border-slate-700 
      max-w-4xl mx-auto">

      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

        {/* Left Side */}
        <div className="lg:w-2/3">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-blue-900 dark:text-slate-100">
              Why Start Your Practice Test Now?
            </h3>

            <div className="space-y-4">
              
              {/* Item 1 */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-500/20 rounded-full flex items-center justify-center">
                  <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800 dark:text-slate-200">
                    Identify Your Strengths
                  </h4>
                  <p className="text-gray-600 dark:text-slate-400 text-sm mt-1">
                    Discover which sections you excel at and which need more practice
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-500/20 rounded-full flex items-center justify-center">
                  <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-purple-800 dark:text-slate-200">
                    Real Exam Experience
                  </h4>
                  <p className="text-gray-600 dark:text-slate-400 text-sm mt-1">
                    Experience the actual test format, timing, and pressure
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-emerald-800 dark:text-slate-200">
                    Track Your Progress
                  </h4>
                  <p className="text-gray-600 dark:text-slate-400 text-sm mt-1">
                    Get detailed analytics to monitor your improvement over time
                  </p>
                </div>
              </div>
            </div>

            {/* Pro Tip */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 
              dark:from-blue-500/10 dark:to-blue-600/10 
              p-4 rounded-xl border-2 border-blue-300 dark:border-blue-500/30">
              <p className="text-sm text-blue-800 dark:text-blue-300 font-medium">
                <span className="font-bold">Pro Tip:</span>  
                The best way to prepare is by taking full-length practice tests under realistic conditions.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side CTA */}
        <div className="lg:w-1/3 flex flex-col items-center justify-center">
          <div className="relative group">

            {/* Glow */}
            <div className="absolute -inset-4 bg-gradient-to-r 
              from-blue-500/30 via-purple-500/30 to-blue-600/30 
              rounded-full blur-xl opacity-70 group-hover:opacity-100 transition-opacity">
            </div>

            {/* Button */}
            <button
              onClick={() => navigate('/flt')}
               className="relative px-10 py-5 bg-gradient-to-r 
               from-blue-600 via-blue-500 to-purple-600 
               text-white font-bold text-lg rounded-2xl shadow-lg 
               transform group-hover:scale-105 transition-all 
               hover:shadow-blue-500/30 flex flex-col items-center gap-2 cursor-pointer">
               <span className="text-2xl">Get Started</span>

              <div className="absolute -right-4 top-1/2 -translate-y-1/2 
                w-8 h-8 bg-white bg-white 
                rounded-full flex items-center justify-center shadow-lg 
                group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4 text-blue-700" />
              </div>
            </button>

            {/* Floating Dots */}
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping opacity-40"></div>
            <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-cyan-400 rounded-full animate-ping opacity-40" style={{ animationDelay: "0.2s" }}></div>
          </div>

          {/* Info */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 dark:text-slate-400">
              <span className="font-semibold text-blue-600 dark:text-blue-400">Free Trial</span> / Detailed Analytics
            </p>
            <p className="text-xs text-gray-400 mt-2">
              No credit card required
            </p>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>


      {/* Footer */}
      <Footer />
    </div>
  );
};

export default GMATFocusFormat;