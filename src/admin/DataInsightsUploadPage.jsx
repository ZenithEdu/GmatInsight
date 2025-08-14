import React, { useState } from 'react';
import { FileText, BarChart3, Table, GitBranch, Database } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DataInsightsUploadPage = () => {
  const [selectedType, setSelectedType] = useState('');
  const navigate = useNavigate();

  const questionTypes = [
    {
      id: 'multi-source',
      title: 'Multi-source Reasoning',
      icon: <FileText className="w-5 h-5" />,
      description: 'Click on the tabs and examine all relevant information from text, charts, and tables to answer questions.',
      color: 'from-pink-500 to-red-500'
    },
    {
      id: 'table-analysis',
      title: 'Table Analysis',
      icon: <Table className="w-5 h-5" />,
      description: 'Analyze a table and determine whether statements are accurate.',
      color: 'from-emerald-500 to-green-500'
    },
    {
      id: 'graphics-interpretation',
      title: 'Graphics Interpretation',
      icon: <BarChart3 className="w-5 h-5" />,
      description: 'Interpret a graph or image and choose the correct completion.',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      id: 'two-part-analysis',
      title: 'Two-part Analysis',
      icon: <GitBranch className="w-5 h-5" />,
      description: 'Solve a two-component problem with answers in a two-column table.',
      color: 'from-orange-500 to-yellow-500'
    },
    {
      id: 'data-sufficiency',
      title: 'Data Sufficiency',
      icon: <Database className="w-5 h-5" />,
      description: 'Decide whether the provided data is sufficient to answer the question.',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const handleTypeSelect = (typeId) => {
    setSelectedType(typeId);
    navigate(`/${typeId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Data Insights Question Upload
          </h1>
          <p className="text-lg text-gray-600">
            Create and upload analytical questions with structured formats
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
            <h2 className="text-2xl font-semibold text-white mb-1">Question Type Selection</h2>
            <p className="text-blue-100 text-sm">
              Click on a card to start creating that type of question
            </p>
          </div>

          <div className="p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {questionTypes.map((type) => (
                <div
                  key={type.id}
                  onClick={() => handleTypeSelect(type.id)}
                  className={`p-5 rounded-xl border-2 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-lg hover:scale-[1.02] ${
                    selectedType === type.id
                      ? `border-transparent bg-gradient-to-r ${type.color} text-white`
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex items-center mb-3">
                    <div
                      className={`p-3 rounded-lg mr-3 transition-all duration-200 ${
                        selectedType === type.id
                          ? 'bg-white/20'
                          : `bg-gradient-to-r ${type.color} text-white`
                      }`}
                    >
                      {type.icon}
                    </div>
                    <h3
                      className={`font-semibold ${
                        selectedType === type.id ? 'text-white' : 'text-gray-800'
                      }`}
                    >
                      {type.title}
                    </h3>
                  </div>
                  <p
                    className={`text-sm leading-relaxed ${
                      selectedType === type.id ? 'text-white/90' : 'text-gray-600'
                    }`}
                  >
                    {type.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataInsightsUploadPage;
