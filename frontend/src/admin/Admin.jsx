import React from 'react';
import { Archive, FileText, HelpCircle, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from './components/AdminHeader';

export default function Admin() {
  const navigate = useNavigate();

  return (
    <>
      <AdminHeader />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden flex flex-col">
        {/* Background Decorations */}
        <div className="absolute top-10 left-10 w-12 h-12 bg-blue-200 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-12 h-12 bg-indigo-200 rounded-full opacity-20 blur-xl"></div>

        {/* Main Content */}
        <main className="flex-1 relative max-w-5xl mx-auto py-6 px-6">
          {/* Welcome Message */}
          <div className="rounded-lg p-5 mb-4">
            <div className="flex items-center justify-center space-x-4">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-full">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-blue-700 mb-2">Welcome back!</h2>
                <p className="text-blue-900 text-sm sm:text-base">Choose a vault to get started.</p>
              </div>
            </div>
          </div>

          {/* Vault Cards */}
          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Assessment Vault Card */}
            <div className="group">
              <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden">
                {/* Card Header */}
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-5 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-white/20 p-3 rounded-lg">
                        <FileText className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">Assessment Manager</h3>
                        <p className="text-blue-100 text-sm">Create, update assessments</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5">
                  <p className="text-gray-600 mb-6 text-sm sm:text-base leading-relaxed">
                    Curated assessments to evaluate knowledge and skills.
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700 text-sm sm:text-base">Analytics & insights</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      <span className="text-gray-700 text-sm sm:text-base">Performance tracking</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-gray-700 text-sm sm:text-base">Customizable parameters</span>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate('/assessment-manager')}
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2.5 px-5 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg cursor-pointer" // Added cursor-pointer
                  >
                    <Archive className="h-5 w-5" />
                    <span>Assessment Manager</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Question Vault Card */}
            <div className="group">
              <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden">
                {/* Card Header */}
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-5 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-white/20 p-3 rounded-lg">
                        <HelpCircle className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">Question Vault</h3>
                        <p className="text-emerald-100 text-sm">Question library</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5">
                  <p className="text-gray-600 mb-6 text-sm sm:text-base leading-relaxed">
                    Thoughtfully crafted questions by category and difficulty.
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-gray-700 text-sm sm:text-base">Smart categorization</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                      <span className="text-gray-700 text-sm sm:text-base">Difficulty filtering</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                      <span className="text-gray-700 text-sm sm:text-base">Multiple formats</span>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate('/question-vault')}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-2.5 px-5 rounded-lg font-medium hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg cursor-pointer" // Added cursor-pointer
                  >
                    <Archive className="h-5 w-5" />
                    <span>Enter Question Vault</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}