import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const GMATInterface = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [showChat, setShowChat] = useState(true);
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: 'Student',
      text: 'Could you explain the method for finding the number of factors of a number?',
      avatar: '/api/placeholder/32/32'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const tabs = [
    {
      title: 'Achieve',
      highlight: 'Quant',
      subtitle: 'Mastery',
      color: 'blue',
      image: 'https://d6mmsse0kchai.cloudfront.net/standalone/20250702/images/features/GMAT/home/achieve-quant-mastery@3x.webp'
    },
    {
      title: 'Conquer Every',
      highlight: 'Verbal',
      subtitle: 'Question Type',
      color: 'purple',
      image: 'https://d6mmsse0kchai.cloudfront.net/standalone/20250702/images/features/GMAT/home/conquer-every-verbal@2x.webp'
    },
    {
      title: 'Crush the',
      highlight: 'Data Insights',
      subtitle: 'Section',
      color: 'teal',
      image: 'https://d6mmsse0kchai.cloudfront.net/standalone/20250702/images/features/GMAT/home/crush-data-insights@2x.png'
    }
  ];

  const content = [
    {
      title: 'Achieve Quant mastery',
      subtitle: 'There will be no surprises on test day.',
      features: [
        'Crystal-clear, in-depth explanations of every Quant concept',
        'Easy-to-digest lessons that progressively build knowledge and skills',
        'Pro tips, tricks, shortcuts, and insights to up your game'
      ],
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Conquer every Verbal question',
      subtitle: 'GMAT Verbal has never been this easy to beat.',
      features: [
        'Specific strategies for each Critical Reasoning and Reading Comprehension',
        'Insider knowledge of every trap answer type and "trick of the trade"',
        'Realistic practice that builds key skills at every level'
      ],
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Crush the Data Insights section',
      subtitle: 'Develop the accuracy and speed required to excel in Data Insights.',
      features: [
        'Comprehensive lessons that break complex problems into simple steps',
        'Every DI concept, strategy, and skill demystified',
        'Ample practice in all 5 DI question types'
      ],
      bgColor: 'bg-teal-50'
    }
  ];

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        user: 'You',
        text: inputMessage,
        avatar: '/api/placeholder/32/32'
      }]);
      setInputMessage('');
    }
  };

  const getTabColorClasses = (index) => {
    const colors = {
      0: 'text-blue-600 border-blue-600',
      1: 'text-purple-600 border-purple-600',
      2: 'text-teal-600 border-teal-600'
    };
    return colors[index] || 'text-gray-600 border-gray-300';
  };

  const getHighlightColor = (index) => {
    const colors = {
      0: 'text-blue-600',
      1: 'text-purple-600',
      2: 'text-teal-600'
    };
    return colors[index] || 'text-gray-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 relative">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-6 sm:mb-8 lg:mb-12">
          <div className="flex flex-col sm:flex-row bg-transparent w-full sm:w-auto">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-md font-medium text-sm sm:text-lg lg:text-2xl transition-all duration-100 text-center mb-2 sm:mb-0 ${
                  activeTab === index
                    ? `${getTabColorClasses(index)} bg-transparent border-b-2 sm:border-b-2 border-l-4 sm:border-l-0`
                    : 'text-gray-600 hover:text-gray-800 border-l-4 border-transparent sm:border-l-0'
                }`}
              >
                <span className="block sm:inline">
                  {tab.title} <span className={getHighlightColor(index)}>{tab.highlight}</span>
                </span>
                <span className="block sm:inline sm:ml-1">
                  {tab.subtitle}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className={`${content[activeTab].bgColor} rounded-xl lg:rounded-2xl overflow-hidden`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-start lg:items-center p-4 sm:p-6 lg:p-8 xl:p-12">
            {/* Left Column - Text Content */}
            <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 leading-tight">
                {content[activeTab].title.split(' ').map((word, index) => (
                  <span key={index} className={word === 'Quant' || word === 'Verbal' || word === 'Data' || word === 'Insights' ? getHighlightColor(activeTab) : ''}>
                    {word}{' '}
                  </span>
                ))}
              </h2>
              
              <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6">
                {content[activeTab].subtitle}
              </p>

              <ul className="space-y-3 sm:space-y-4">
                {content[activeTab].features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-700 leading-relaxed">
                      <strong>{feature.split(' ')[0]} {feature.split(' ')[1]}</strong>
                      {' ' + feature.split(' ').slice(2).join(' ')}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column - Mock Interface */}
            <div className="relative order-1 lg:order-2">
              <div className="bg-white rounded-lg sm:rounded-xl shadow-lg border overflow-hidden">
                {/* Header */}
                <div className="bg-gray-800 text-white p-3 sm:p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm sm:text-base">GMAT Prep Platform</h3>
                    <div className="flex space-x-1 sm:space-x-2">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-3 sm:p-4 lg:p-6 h-48 sm:h-64 lg:h-80 bg-gray-50">
                  <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm h-full flex flex-col">
                    <div className="flex-1 overflow-hidden">
                      <img 
                        src={tabs[activeTab].image} 
                        alt={content[activeTab].title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="mt-3 sm:mt-4">
                      <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">
                        {content[activeTab].title}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                        {content[activeTab].subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Interface - Hidden in this responsive version but structure maintained */}
      {showChat && (
        <div className="fixed bottom-4 right-4 w-80 sm:w-96 bg-white rounded-lg shadow-xl border z-50 hidden">
          {/* Chat content would go here */}
        </div>
      )}

      {/* Chat Toggle Button */}
      {!showChat && (
        <button
          onClick={() => setShowChat(true)}
          className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 w-12 h-12 sm:w-14 sm:h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center z-50"
        >
          <MessageCircle size={20} className="sm:w-6 sm:h-6" />
        </button>
      )}
    </div>
  );
};

export default GMATInterface;