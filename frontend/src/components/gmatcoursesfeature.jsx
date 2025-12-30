import React from "react";
import {
  Award,
  Users,
  GraduationCap,
  Zap,
  CheckSquare,
  BarChart3,
} from "lucide-react";

export default function GMATCourseFeatures() {
  const features = [
    {
      icon: Award,
      title: "Master the GMAT",
      description:
        "Master every concept, strategy, tool, and technique to earn a top GMAT score.",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      icon: Users,
      title: "Personalized for You",
      description:
        "Get a personalized study plan that guides you through each step of your GMAT preparation.",
      gradient: "from-violet-500 to-purple-500",
    },
    {
      icon: GraduationCap,
      title: "Learn from the Experts",
      description:
        "More than 2,200 wisdom-packed instructional videos led by GMAT teachers.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Zap,
      title: "AI-Powered",
      description:
        "AI-powered resources seamlessly integrated into your course to make your GMAT study more efficient and strategic.",
      gradient: "from-yellow-500 to-amber-500",
    },
    {
      icon: CheckSquare,
      title: "Infinite Question Bank",
      description:
        "4,000+ GMAT questions crafted by experts, plus practice with unlimited AI-generated questions.",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      icon: BarChart3,
      title: "Smart Analytics",
      description:
        "Home in on weak areas with robust analytics and error tracking, and turn weaknesses into strengths.",
      gradient: "from-pink-500 to-rose-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className=" text-3xl md:text-4xl font-bold leading-tight text-slate-900">
            Why{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              GMAT INSIGHT
            </span>{" "}
            is the course
          </h1>

          <h2 className="mt-1 text-lg md:text-xl font-medium text-slate-600">
            made for you
          </h2>

          <div className="mt-4 flex justify-center">
            <div className="h-0.5 w-14 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative flex h-full flex-col rounded-xl bg-white p-6 transition-all duration-500"
                style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.07)" }}
              >
                {/* Gradient border */}
                <div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-br ${feature.gradient}`}
                  style={{ padding: "1.25px" }}
                >
                  <div className="h-full w-full rounded-xl bg-white" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div
                    className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br ${feature.gradient} text-white shadow-md group-hover:scale-105 transition-all duration-300`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3
                    className={`text-xl font-semibold  text-slate-900 mb-2 transition-all duration-300
  group-hover:bg-gradient-to-r ${feature.gradient}
  group-hover:bg-clip-text group-hover:text-transparent`}
                  >
                    {feature.title}
                  </h3>

                  <p className="text-sm text-slate-800 leading-relaxed mb-4">
                    {feature.description}
                  </p>

                  <div className="h-0.5 w-0 bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 group-hover:w-full transition-all duration-700 ease-out" />
                </div>

                {/* Soft glow */}
                <div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-br ${feature.gradient} opacity-10 blur-lg`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
