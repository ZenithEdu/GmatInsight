import React from 'react';
import { Award, Users, GraduationCap, Zap, CheckSquare, BarChart3 } from 'lucide-react';

export default function GMATCourseFeatures() {
  const features = [
    {
      icon: <Award className="w-8 h-8 text-blue-500" />,
      title: "Master the GMAT",
      description: "Master every concept, strategy, tool, and technique to earn a top GMAT score."
    },
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      title: "Personalized for You",
      description: "Get a personalized study plan that guides you through each step of your GMAT preparation."
    },
    {
      icon: <GraduationCap className="w-8 h-8 text-blue-500" />,
      title: "Learn from the Experts",
      description: "More than 2,200 wisdom-packed instructional videos led by GMAT teachers."
    },
    {
      icon: <Zap className="w-8 h-8 text-blue-500" />,
      title: "AI-Powered",
      description: "AI-powered resources seamlessly integrated into your course to make your GMAT study more efficient, strategic."
    },
    {
      icon: <CheckSquare className="w-8 h-8 text-blue-500" />,
      title: "Infinite Question Bank",
      description: "4,000+ GMAT questions crafted by experts, plus practice with unlimited AI-generated questions."
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-blue-500" />,
      title: "Smart Analytics",
      description: "Home in on weak areas with robust analytics and error tracking, and turn weaknesses into strengths."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-4xl font-semibold bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 bg-clip-text text-transparent mb-4 leading-tight pb-2">
            Why GMAT INSIGHT is the GMAT Course
          </h1>
          <h2 className="text-4xl md:text-4xl font-semibold text-blue-600 mb-8">
            for you
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="styles_item__EcdjI benefit bg-transparent rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex"
            >
              <div className="styles_icon__Fi4p4 mr-6 flex-shrink-0">
                {feature.icon}
              </div>
              <div className="flex-1">
                <h3 className="styles_title__vKWTg text-xl font-semibold text-gray-800 mb-4">
                  {feature.title}
                </h3>
                <div className="styles_description__2jAxO text-gray-600 leading-relaxed">
                  {feature.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom decorative elements */}
        <div className="flex justify-center mt-16 space-x-2">
          <div className="w-3 h-3 bg-blue-300 rounded-full"></div>
          <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}