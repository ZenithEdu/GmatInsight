import React from "react";
import { ArrowRight, BookOpen, Target, Users, Sparkles } from "lucide-react";

const WhatWeOffer = () => {
  const services = [
    {
      id: 1,
      icon: <BookOpen className="w-6 h-6" />,
      title: "AI-Empowered Smart Learning",
      subtitle: "On-Demand Course",
      description:
        "Expert-designed GMAT Focus curriculum with adaptive learning paths.",
      points: [
        "Concept-wise video lessons",
        "2000+ practice questions",
        "Adaptive learning paths",
        "Real GMAT-like interface",
      ],
      color: "cyan",
    },
    {
      id: 2,
      icon: <Target className="w-6 h-6" />,
      title: "15+ Adaptive Full-Length Tests",
      subtitle: "with Deep Analysis",
      description:
        "Fully adaptive mock tests that mirror the real exam with performance analytics.",
      points: [
        "Exact GMAT-Focus interface",
        "Adaptive difficulty",
        "Detailed score analytics",
        "Strength & gap reports",
      ],
      color: "violet",
    },
    {
      id: 3,
      icon: <Users className="w-6 h-6" />,
      title: "Personalised Mentorship",
      subtitle: "1-on-1 & Group Classes",
      description:
        "Personal coaching via online tutoring or small focused group classes.",
      points: [
        "Live 1-on-1 tutoring",
        "Small group batches",
        "Custom study plans",
        "Expert mentors",
      ],
      color: "emerald",
    },
  ];

  const colorMap = {
    cyan: {
      bg: "bg-gradient-to-br from-blue-500/15 via-blue-400/10 to-cyan-500/15",
      icon: "bg-gradient-to-br from-cyan-500 to-blue-500",
      text: "text-cyan-600",
      button:
        "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600",
      border: "border-cyan-400/40",
      dot: "bg-cyan-500",
      glow: "group-hover:shadow-cyan-500/30",
      iconBg: "bg-cyan-500/10",
    },
    violet: {
      bg: "bg-gradient-to-br from-violet-500/15 via-violet-400/10 to-purple-500/15",
      icon: "bg-gradient-to-br from-violet-500 to-purple-500",
      text: "text-violet-600",
      button:
        "bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600",
      border: "border-violet-400/40",
      dot: "bg-violet-500",
      glow: "group-hover:shadow-violet-500/30",
      iconBg: "bg-violet-500/10",
    },
    emerald: {
      bg: "bg-gradient-to-br from-emerald-500/15 via-emerald-400/10 to-teal-500/15",
      icon: "bg-gradient-to-br from-emerald-500 to-teal-500",
      text: "text-emerald-600",
      button:
        "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600",
      border: "border-emerald-400/40",
      dot: "bg-emerald-500",
      glow: "group-hover:shadow-emerald-500/30",
      iconBg: "bg-emerald-500/10",
    },
  };

  return (
    <section className="min-h-screen py-16 bg-gradient-to-br from-white via-blue-50 to-blue-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-600 mb-4 font-medium shadow-sm">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-semibold tracking-wide uppercase">
              What we offer
            </span>
          </div>

          <h2 className="text-4xl md:text-[2.75rem] font-bold text-slate-900 leading-tight">
            Try 1{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-blue-600">FREE</span>
              <span className="absolute bottom-0 left-0 w-full h-[6px] bg-blue-100 rounded-md -z-0" />
            </span>{" "}
            Full-Length Diagnostic Test
          </h2>

          <p className="mt-4 text-base md:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed italic">
            Experience our comprehensive{" "}
            <span className="font-medium text-slate-700">
              GMAT preparation platform
            </span>{" "}
            with a free diagnostic test that clearly highlights your strengths
            and improvement areas.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className={`group relative rounded-2xl ${
                colorMap[service.color].bg
              } border-2 ${
                colorMap[service.color].border
              } backdrop-blur-sm transition-all duration-500 hover:scale-[1.02]
              shadow-lg hover:shadow-2xl ${
                colorMap[service.color].glow
              } overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative p-6 z-10">
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${
                    colorMap[service.color].iconBg
                  } mb-6 group-hover:scale-110 transition-all duration-300`}
                >
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      colorMap[service.color].icon
                    } text-white shadow-lg`}
                  >
                    {service.icon}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {service.title}
                </h3>

                <p
                  className={`text-sm font-bold ${
                    colorMap[service.color].text
                  } mb-4`}
                >
                  {service.subtitle}
                </p>

                <p className="text-gray-700 text-base mb-8 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {service.points.map((point, i) => (
                    <li
                      key={i}
                      className="flex items-start text-base text-gray-800"
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          colorMap[service.color].dot
                        } mt-2 mr-3 flex-shrink-0`}
                      />
                      <span className="font-medium">{point}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3.5 rounded-xl text-white text-base font-bold ${
                    colorMap[service.color].button
                  } transition-all duration-300 flex items-center justify-center gap-3
                  shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]`}
                >
                  Start Learning
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;
