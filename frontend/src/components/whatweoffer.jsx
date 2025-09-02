import React from 'react';
import { ArrowRight, BookOpen, Target, Users, Sparkles, Zap, Star } from 'lucide-react';

const WhatWeOffer = () => {
  const services = [
  {
    id: 1,
    icon: <BookOpen className="w-7 h-7" />,
    title: (
      <div className="leading-tight">
        AI-Empowered <br/>
        Smart Learning <br/>
        OnDemand Course<br/>
      </div>
    ),
    description:
      "A fully updated, expert-designed curriculum tailored for the new GMAT Focus Edition, covering all three sections: Quantitative Reasoning, Verbal Reasoning, and Data Insights (Special Emphasis).",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    points: [
      "Detailed Concept Videos on all GMAT Focus sections",
      "100% Video solutions for all Data Insights and Quant questions",
      "2000+ high-quality practice questions",
      "Smart, adaptive learning paths",
      "Practice questions with real exam simulations replicating exact GMAT TEST like Interface"
    ],
    gradient: "from-blue-500 via-blue-600 to-blue-700",
    bgGradient: "from-blue-100 to-blue-200",
    iconBg: "bg-gradient-to-br from-blue-500 to-blue-600",
    buttonColor:
      "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
  },
  {
    id: 2,
    icon: <Target className="w-7 h-7" />,
      title: (
      <div className="leading-tight">
        100% Adaptive <br/>
        15+ FULL LENGTH TESTS <br/>
        with Detailed Analysis<br/>
      </div>
    ),
    
    description:
      "Get exam-ready with over 15 full-length, fully adaptive tests designed to mirror the actual GMAT Focus Edition experience — from interface to scoring.Gain real confidence and test-day readiness with every practice session.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    points: [
      "Exact GMAT Focus test-like interface",
      "Smart adaptive testing — just like the real exam",
      "Detailed performance analysis after each test",
      "Section-wise breakdown to identify strengths & gaps",
      "(Refund Guarantee) if not satisfied*"
    ],
    gradient: "from-purple-500 via-purple-600 to-purple-700",
    bgGradient: "from-purple-50 to-purple-100",
    iconBg: "bg-gradient-to-br from-purple-500 to-purple-600",
    buttonColor:
      "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
  },
  {
    id: 3,
    icon: <Users className="w-7 h-7" />,
    title: (
      <div className="leading-tight">
        Personalised 1-on-1 <br/>
        Online Private Tutoring <br/>
        & Group Classes in Delhi<br/>
      </div>
    ),
    
    description:
      "Achieve your highest potential with personalized coaching through expert-led 1-on-1 online tutoring or small-group classes in Delhi — tailored to your unique strengths and goals.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    points: [
      "Live 1-on-1 private tutoring (online)",
      "Small, focused group classes in Delhi",
      "Customized study plans and mentorship",
      "Expert faculty with proven GMAT Focus success",
      "Free access to our complete On-Demand GMAT Focus Course",
      "Regular progress tracking and feedback"
    ],
    gradient: "from-teal-500 via-teal-600 to-teal-700",
    bgGradient: "from-teal-50 to-teal-100",
    iconBg: "bg-gradient-to-br from-teal-500 to-teal-600",
    buttonColor:
      "bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700"
  }
];


  return (
    <section className="py-4 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-36 h-36 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-semibold text-purple-700">Our Curated Services</span>
          </div>
          <h2 className="text-5xl font-semibold bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 bg-clip-text text-transparent mb-6 leading-tight pb-2">
  Try 1– FREE Full length Diagnostic Test
</h2>

          {/* <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive GMAT preparation designed to help you achieve your target score and get into your dream business school
          </p> */}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`group relative bg-gradient-to-br ${service.bgGradient} rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 overflow-hidden transform`}
            >
              {/* Gradient Border Effect */}
              {/* <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}></div> */}
              <div className="absolute inset-[1px] bg-transparent-500 rounded-2xl"></div>
              
              {/* Card Content */}
              <div className="relative z-10 p-8">
                {/* Image */}
                <div className="mb-6 relative overflow-hidden rounded-xl">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${service.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}></div>
                  <div className="absolute top-4 left-4">
                    <div className={`w-12 h-12 ${service.iconBg} rounded-xl flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                      {service.icon}
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Points */}
                <ul className="space-y-3 mb-8">
                  {service.points.map((point, idx) => (
                    <li key={idx} className="flex items-start group/item">
                      <div className={`w-2 h-2 bg-gradient-to-r ${service.gradient} rounded-full mt-2.5 mr-3 flex-shrink-0 transform group-hover/item:scale-125 transition-transform duration-300`}></div>
                      <span className="text-gray-700 leading-relaxed text-sm font-medium">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Impressive Explore Button */}
                <div className="relative">
                  <button className={`w-full ${service.buttonColor} text-white px-6 py-4 rounded-xl font-bold transition-all duration-500 shadow-lg hover:shadow-2xl transform hover:scale-105 flex items-center justify-center group/btn relative overflow-hidden`}>
                    {/* Animated Background */}
                    <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                    
                    {/* Button Content */}
                    <div className="relative z-10 flex items-center">
                      <span className="mr-3 group-hover/btn:mr-4 transition-all duration-300">Start Learning</span>
                      <div className="relative">
                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-white/30 rounded-full scale-0 group-hover/btn:scale-150 transition-transform duration-300"></div>
                      </div>
                    </div>
                    
                    {/* Pulse Effect */}
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 rounded-xl bg-white/10 animate-pulse"></div>
                    </div>
                  </button>
                  
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} rounded-xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500 -z-10`}></div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <Star className="w-6 h-6 text-yellow-400 animate-pulse" />
              </div>
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                <Zap className="w-5 h-5 text-orange-400 animate-bounce" />
              </div>
            </div>
          ))}
        </div>

        
      </div>
    </section>
  );
};

export default WhatWeOffer;