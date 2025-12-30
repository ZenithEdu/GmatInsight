import React, { useState, useEffect, useRef } from "react";
import {
  MessageCircle,
  X,
  ArrowRight,
  Brain,
  Zap,
  Target,
  Check,
} from "lucide-react";

const GMATPrep = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Could you explain the method for finding the number of factors of a number?",
      isUser: false,
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef([]);

  const tabs = [
    {
      title: "Achieve",
      highlight: "Quant",
      subtitle: "Mastery",
      image:
        "https://d6mmsse0kchai.cloudfront.net/standalone/20250702/images/features/GMAT/home/achieve-quant-mastery@3x.webp",
      theme: {
        primary: "bg-blue-500",
        light: "bg-blue-400",
        text: "text-blue-400",
        border: "border-blue-400",
        bg: "bg-blue-500/20",
        dot: "bg-blue-400",
        headerBg:
          "bg-gradient-to-r from-blue-500/20 via-blue-500/10 to-transparent",
        headerBorder: "border-blue-400/30",
      },
    },
    {
      title: "Conquer Every",
      highlight: "Verbal",
      subtitle: "Question Type",
      image:
        "https://d6mmsse0kchai.cloudfront.net/standalone/20250702/images/features/GMAT/home/conquer-every-verbal@2x.webp",
      theme: {
        primary: "bg-purple-500",
        light: "bg-purple-400",
        text: "text-purple-400",
        border: "border-purple-400",
        bg: "bg-purple-500/20",
        dot: "bg-purple-400",
        headerBg:
          "bg-gradient-to-r from-purple-500/20 via-purple-500/10 to-transparent",
        headerBorder: "border-purple-400/30",
      },
    },
    {
      title: "Crush the",
      highlight: "Data Insights",
      subtitle: "Section",
      image:
        "https://d6mmsse0kchai.cloudfront.net/standalone/20250702/images/features/GMAT/home/crush-data-insights@2x.png",
      theme: {
        primary: "bg-teal-500",
        light: "bg-teal-400",
        text: "text-teal-400",
        border: "border-teal-400",
        bg: "bg-teal-500/20",
        dot: "bg-teal-400",
        headerBg:
          "bg-gradient-to-r from-teal-500/20 via-teal-500/10 to-transparent",
        headerBorder: "border-teal-400/30",
      },
    },
  ];

  const content = [
    {
      title: "Quantitative Aptitude",
      subtitle: "There will be no surprises on test day.",
      features: [
        {
          text: "Crystal-clear, in-depth explanations of every Quant concept",
          icon: true,
        },
        {
          text: "Easy-to-digest lessons, build knowledge and skills",
          icon: true,
        },
        {
          text: "Pro tips, tricks, shortcuts, and insights to up your game",
          icon: true,
        },
        {
          text: "5000+ practice questions with detailed solutions",
          icon: true,
        },
        {
          text: "Personalized difficulty adjustment based on performance",
          icon: true,
        },
      ],
      stats: [
        { label: "Average Score Improvement", value: "+40 points" },
        { label: "Success Rate", value: "94%" },
        { label: "Completion Time", value: "6 weeks" },
      ],
    },
    {
      title: "Verbal Reasoning",
      subtitle: "GMAT Verbal has never been this easy to beat.",
      features: [
        {
          text: "Strategies for Critical Reasoning and Reading Comprehension",
          icon: true,
        },
        {
          text: 'Insider knowledge of every answer type "trick of the trade"',
          icon: true,
        },
        {
          text: "Realistic practice that builds key skills at every level",
          icon: true,
        },
        { text: "Advanced grammar and logic frameworks", icon: true },
        { text: "Time management strategies for verbal section", icon: true },
      ],
      stats: [
        { label: "Reading Speed Improvement", value: "+60%" },
        { label: "Accuracy Rate", value: "92%" },
        { label: "Average Verbal Score", value: "V40+" },
      ],
    },
    {
      title: "Data Insights",
      subtitle: "Develop the accuracy and speed to excel in Data Insights.",
      features: [
        { text: "Comprehensive lessons break complex into simple", icon: true },
        {
          text: "Every DI concept, strategy, and skill demystified",
          icon: true,
        },
        { text: "Ample practice in all 5 DI question types", icon: true },
        {
          text: "Data interpretation and visualization techniques",
          icon: true,
        },
        {
          text: "Integrated reasoning with real business scenarios",
          icon: true,
        },
      ],
      stats: [
        { label: "Data Analysis Speed", value: "+50% faster" },
        { label: "Problem Solving Accuracy", value: "96%" },
        { label: "DI Section Score", value: "85+" },
      ],
    },
  ];

  useEffect(() => {
    if (tabRefs.current[activeTab]) {
      const tabElement = tabRefs.current[activeTab];
      const { offsetLeft, offsetWidth } = tabElement;
      setUnderlineStyle({
        left: `${offsetLeft}px`,
        width: `${offsetWidth}px`,
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      });
    }
  }, [activeTab]);

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (inputMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          text: inputMessage,
          isUser: true,
        },
      ]);
      setInputMessage("");
    }
  };

  const getThemeColor = (type) => {
    return tabs[activeTab].theme[type];
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] ${getThemeColor(
            "primary"
          )}/10 rounded-full blur-[120px] animate-pulse`}
        />
        <div
          className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] ${getThemeColor(
            "primary"
          )}/5 rounded-full blur-[120px] animate-pulse`}
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-[40%] left-[60%] w-[30%] h-[30%] bg-teal-600/10 rounded-full blur-[100px] animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Enhanced Tab Navigation with Pre-colored Headers and Animated Underline */}
        <div className="relative mb-12">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center relative">
            {tabs.map((tab, index) => (
              <button
                key={index}
                ref={(el) => (tabRefs.current[index] = el)}
                onClick={() => setActiveTab(index)}
                className={`
                  relative text-left md:text-center transition-all duration-300
                  group px-6 py-4 rounded-xl md:rounded-t-xl md:rounded-b-none
                  ${
                    activeTab === index
                      ? `${tab.theme.headerBg} border ${tab.theme.headerBorder} shadow-lg`
                      : "hover:bg-white/5"
                  }
                `}
              >
                {/* Tab Header with Pre-colored Background */}
                <div className="flex flex-col md:flex-row md:items-baseline md:gap-1.5">
                  <span
                    className={`
                    text-lg font-medium transition-colors
                    ${activeTab === index ? "text-white" : tab.theme.text}
                  `}
                  >
                    {tab.title}
                  </span>
                  <span
                    className={`
                    text-lg font-bold transition-colors
                    ${activeTab === index ? "text-white" : tab.theme.text}
                  `}
                  >
                    {tab.highlight}
                  </span>
                  <span
                    className={`
                    text-lg hidden md:inline transition-colors
                    ${activeTab === index ? "text-white" : "text-gray-300"}
                  `}
                  >
                    {tab.subtitle}
                  </span>
                </div>
                <span className="md:hidden text-sm text-gray-400 mt-1 block">
                  {tab.subtitle}
                </span>

                {/* Active Tab Indicator (colored dot) */}
                {activeTab === index && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                    <div
                      className={`w-2 h-2 rounded-full ${tab.theme.light}`}
                    />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Animated Underline */}
          <div className="relative mt-2 hidden md:block">
            <div className="absolute h-0.5 bg-white/10 w-full rounded-full" />
            <div
              className={`absolute h-0.5 rounded-full ${getThemeColor(
                "primary"
              )}`}
              style={underlineStyle}
            />
          </div>
        </div>

        {/* Content Section with Theme Influence */}
        <div
          className={`
          backdrop-blur-xl rounded-3xl border border-white/10 
          p-6 md:p-12 transition-all duration-500 overflow-hidden
          relative
          ${getThemeColor("bg")}
        `}
        >
          {/* Theme Color Gradient Overlay */}
          <div
            className={`absolute inset-0 opacity-5 bg-gradient-to-br ${getThemeColor(
              "primary"
            )} to-transparent`}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
            {/* Organized Text Content */}
            <div className="space-y-8 order-2 lg:order-1">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`w-3 h-3 rounded-full ${getThemeColor("dot")}`}
                  />
                  <span
                    className={`text-sm font-semibold ${getThemeColor(
                      "text"
                    )} uppercase tracking-wider`}
                  >
                    Featured Module
                  </span>
                </div>
                <h2
                  className={`text-3xl md:text-5xl font-bold leading-tight ${getThemeColor(
                    "text"
                  )}`}
                >
                  {content[activeTab].title}
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  {content[activeTab].subtitle}
                </p>
              </div>

              {/* Organized Features List */}
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-white">
                  What You'll Master
                </h3>
                <ul className="space-y-3">
                  {content[activeTab].features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start space-x-3 group"
                    >
                      <div className="flex-shrink-0 mt-1">
                        <Check className={`w-5 h-5 ${getThemeColor("text")}`} />
                      </div>
                      <span className="text-gray-300 text-lg group-hover:text-white transition-colors">
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Performance Stats */}
              <div className="pt-6 border-t border-white/10">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Performance Metrics
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {content[activeTab].stats.map((stat, index) => (
                    <div
                      key={index}
                      className={`text-center p-3 rounded-lg ${getThemeColor(
                        "bg"
                      )}`}
                    >
                      <div
                        className={`text-2xl font-bold ${getThemeColor(
                          "text"
                        )}`}
                      >
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-300 mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className={`
                group flex items-center gap-2 px-8 py-3 rounded-full font-semibold 
                text-white ${getThemeColor("primary")} hover:${getThemeColor(
                  "light"
                )}
                transition-all transform hover:scale-105 border-2 border-transparent
                hover:border-white/20
              `}
              >
                Start Learning
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Image with Theme Border */}
            <div className="order-1 lg:order-2 h-64 md:h-96 lg:h-[500px] relative">
              <div
                className={`absolute inset-0 rounded-2xl ${getThemeColor(
                  "primary"
                )}/10 blur-xl`}
              />
              <img
                src={tabs[activeTab].image}
                alt={content[activeTab].title}
                className="w-full h-full object-contain rounded-2xl transition-transform duration-300 hover:scale-105 relative z-10"
              />
              {/* Theme Overlay */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-t ${getThemeColor(
                  "primary"
                )}/5 via-transparent to-transparent pointer-events-none`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      {showChat && (
        <div className="fixed bottom-24 right-6 w-80 md:w-96 backdrop-blur-xl bg-white/10 rounded-2xl overflow-hidden z-50 border border-white/20">
          <div className="bg-white/5 p-4 border-b border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 ${getThemeColor(
                  "dot"
                )} rounded-full animate-pulse`}
              ></div>
              <h3 className="font-semibold">Study Assistant</h3>
            </div>
            <button
              onClick={() => setShowChat(false)}
              className="text-gray-400 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          <div className="h-80 overflow-y-auto p-4 space-y-4 bg-black/20">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.isUser
                      ? `${getThemeColor("primary")} text-white rounded-tr-none`
                      : "bg-white/10 text-gray-200 rounded-tl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSendMessage}
            className="p-4 bg-white/5 border-t border-white/10"
          >
            <div className="relative">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask a question..."
                className="w-full bg-black/40 border border-white/10 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:border-blue-500 placeholder:text-gray-500"
              />
              <button
                type="submit"
                className={`absolute right-1 top-1 p-1.5 ${getThemeColor(
                  "primary"
                )} rounded-full hover:${getThemeColor(
                  "light"
                )} transition-colors`}
              >
                <ArrowRight size={14} />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Chat Toggle Button */}
      <button
        onClick={() => setShowChat(!showChat)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg flex items-center justify-center z-50 transition-all hover:scale-110 ${
          showChat
            ? "bg-red-500 hover:bg-red-600"
            : `${getThemeColor("primary")} hover:${getThemeColor("light")}`
        } backdrop-blur-sm border border-white/20`}
      >
        {showChat ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
};

export default GMATPrep;
