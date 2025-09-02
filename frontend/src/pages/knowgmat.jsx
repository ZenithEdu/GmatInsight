import React, { useState, useEffect } from 'react';
import { Calculator, Book, BarChart3, Clock, ChevronDown, ChevronUp, ArrowUp, Play, Target, Users, Award, CheckCircle, TrendingUp, FileText, Timer, BookOpen, Brain, Zap, Star, ArrowRight } from 'lucide-react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';





const testSections = [
  {
    id: 'quant',
    title: 'Quantitative (Q)',
    subtitle: '21 Questions / 45 Minutes',
    icon: Calculator,
    questions: 21,
    time: 45,
    color: 'quant',
    questionTypes: ['Problem Solving'],
    description: 'Test your mathematical reasoning and problem-solving skills with quantitative questions covering arithmetic, algebra, and geometry.',
    topics: [
      'Overlapping Sets',
      'Statistics', 
      'Arithmetic Word Problems',
      'Work Problems',
      'Speed Distance Time',
      'Percentage / Profit and Loss/ Interest Problems',
      'Number Properties',
      'Exponents',
      'Series',
      'Functions',
      'Algebra',
      'Inequality',
      'Permutations and Combinations',
      'Probability'
    ]
  },
  {
    id: 'verbal',
    title: 'Verbal (V)',
    subtitle: '23 Questions / 45 Minutes',
    icon: Book,
    questions: 23,
    time: 45,
    color: 'verbal',
    questionTypes: [
      'Critical Reasoning (CR)',
      'Reading Comprehension (RC)'
    ],
    description: 'Evaluate your ability to read and comprehend written material, reason critically, and correct written material.',
    topics: [
      'Strengthening (CR)',
      'Weakening (CR)',
      'Assumptions (CR)',
      'Inference (CR)',
      'Boldface (CR)',
      'Short RC',
      'Long RC'
    ]
  },
  {
    id: 'data-insight',
    title: 'Data Insight (DI)',
    subtitle: '20 Questions / 45 Minutes',
    icon: BarChart3,
    questions: 20,
    time: 45,
    color: 'data-insight',
    questionTypes: [
      'Data Sufficiency (DS)',
      'Table Analysis',
      'Graphs',
      'Two Part Analysis (TPA)',
      'Multi Source Reasoning (MSR)',
      '(Set of 3 questions)'
    ],
    description: 'Analyze complex data sets and solve multi-step problems using quantitative reasoning and data interpretation skills.',
    topics: [
      'Overlapping Sets',
      'Statistics',
      'Arithmetic Word Problems',
      'Work Problems',
      'Speed Distance Time',
      'Percentage / Profit and Loss/ Interest Problems',
      'Number Properties',
      'Exponents',
      'Series',
      'Permutations and Combinations',
      'Probability',
      'Non-Math Problems'
    ]
    
  }
];

const calculateTimePerQuestion = (questions, time) => {
  const timePerQuestion = Math.round((time / questions) * 10) / 10;
  return `${timePerQuestion}min`;
};

const TestSections = () => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // Color definitions for each section
const sectionColors = {
  quant: {
    primary: 'bg-[#4cc9f0]', // Purple/Light Blue
    gradient: 'bg-gradient-to-br from-slate-800 via-slate-900 to-blue-900',
    light: 'bg-[#4cc9f0]/20',
    border: 'border-[#4cc9f0]',
    text: 'text-[#4cc9f0]'
  },
  verbal: {
    primary: 'bg-[#4cc9f0]', // Purple/Light Blue
    gradient: 'bg-gradient-to-br from-slate-800 via-slate-900 to-blue-900',
    light: 'bg-[#4cc9f0]/20',
    border: 'border-[#4cc9f0]',
    text: 'text-[#4cc9f0]'
  },
  'data-insight': {
    primary: 'bg-[#4cc9f0]', // Purple/Light Blue
    gradient: 'bg-gradient-to-br from-slate-800 via-slate-900 to-blue-900',
    light: 'bg-[#4cc9f0]/20',
    border: 'border-[#4cc9f0]',
    text: 'text-[#4cc9f0]'
  }
};


  return (
    <>
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
  <div className="max-w-7xl mx-auto px-4">
    <div className="text-center mb-16">
      <h2 className="text-5xl font-semibold bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 bg-clip-text text-transparent mb-4">Section Details</h2>
      <p className="text-lg text-gray-600">Deep dive into each section's structure and content</p>
    </div>
    
    {/* Horizontal Layout */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {testSections.map((section) => {
        const colors = sectionColors[section.id];
        
        return (
          <div key={section.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 bg-indigo-100 rounded-xl shadow-md">
            {/* Header */}
            <div className={`${colors.primary} text-white p-6 relative overflow-hidden rounded-t-xl`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-90`}></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <section.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{section.questions}</div>
                    <div className="text-sm text-white/80">Questions</div>
                  </div>
                </div>
                <h3 className="text-2xl font-semibold mb-2">{section.title}</h3>
                <p className="text-white/90 text-sm mb-2">{section.subtitle}</p>
                <div className="flex items-center text-white/80 text-xs">
                  <Clock className="w-4 h-4 mr-1" />
                  ~{calculateTimePerQuestion(section.questions, section.time)} per question
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              <p className="text-gray-600 text-sm leading-relaxed">{section.description}</p>
              
              {/* Question Types - Full List */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center text-sm">
                  <FileText className="w-4 h-4 mr-2 text-gray-500" />
                  Question Types
                </h4>
                <div className="space-y-2">
                  {section.questionTypes.map((type, idx) => (
                    <div key={idx} className={`flex items-center p-3 ${colors.light} rounded-lg border ${colors.border}/20`}>
                      <div className={`w-2 h-2 ${colors.primary} rounded-full mr-3 flex-shrink-0`}></div>
                      <span className="text-gray-800 text-xs font-medium">{type}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Topics Section - Full List */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center text-sm">
                  <TrendingUp className={`w-4 h-4 mr-2 ${colors.text}`} />
                  Key Topics
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {section.topics.map((topic, idx) => (
                    <div 
                      key={idx} 
                      className={`flex items-center p-2 ${colors.light} rounded-lg border ${colors.border}/20 hover:shadow-sm transition-all`}
                    >
                      <Star className={`w-3 h-3 ${colors.text} mr-2 flex-shrink-0`} />
                      <span className="text-gray-800 text-xs">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Special Topics for Data Insight - Full List */}
              {section.id === 'data-insight' && section.dsTopics && (
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center text-sm">
                    <Target className={`w-4 h-4 mr-2 ${colors.text}`} />
                    DS & TPA Topics
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {section.dsTopics.map((topic, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-center p-2 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-sm transition-all"
                      >
                        <div className={`w-2 h-2 ${colors.primary} rounded-full mr-2 flex-shrink-0`}></div>
                        <span className="text-gray-800 text-xs">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  </div>
    </section>
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
  <div className="max-w-7xl mx-auto px-4">
    <div className="text-center mb-16">
      <h2 className="text-5xl font-semibold bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 bg-clip-text text-transparent leading-tight mb-4">Official Sample Questions</h2>
      <p className="text-lg text-gray-600">Practice with authentic question formats from each section</p>
    </div>

    <div className="bg-indigo-100 rounded-xl shadow-md overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-12  p-4 border-b border-gray-200">
        <div className="col-span-4 font-semibold text-gray-700">Section</div>
        <div className="col-span-3 font-semibold text-gray-700">Question Type</div>
        <div className="col-span-3 font-semibold text-gray-700">Questions</div>
        <div className="col-span-2 font-semibold text-gray-700">Action</div>
      </div>

      {/* Quantitative Row */}
      <div className="grid grid-cols-12 items-center p-4 border-b border-gray-100  transition-colors">
        <div className="col-span-4 flex items-center">
          <div className={`w-10 h-10 rounded-lg bg-[#4361ee]/10 flex items-center justify-center mr-3`}>
            <Calculator className={`w-5 h-5 text-[#4361ee]`} />
          </div>
          <span className="font-medium">Quantitative</span>
        </div>
        <div className="col-span-3 text-sm text-gray-600">Problem Solving</div>
        <div className="col-span-3 text-sm font-medium">5 Questions</div>
        <div className="col-span-2">
          <button className="px-4 py-2 bg-gradient-to-br from-slate-800 via-slate-900 to-blue-900  text-white rounded-lg text-sm font-medium transition-colors">
            Start Quiz
          </button>
        </div>
      </div>

      {/* Verbal Rows */}
      <div className="grid grid-cols-12 items-center p-4 border-b border-gray-100  transition-colors">
        <div className="col-span-4 flex items-center">
          <div className={`w-10 h-10 rounded-lg bg-[#f72585]/10 flex items-center justify-center mr-3`}>
            <Book className={`w-5 h-5 text-[#f72585]`} />
          </div>
          <span className="font-medium">Verbal</span>
        </div>
        <div className="col-span-3 text-sm text-gray-600">Critical Reasoning</div>
        <div className="col-span-3 text-sm font-medium">5 Questions</div>
        <div className="col-span-2">
          <button className="px-4 py-2 bg-gradient-to-br from-slate-800 via-slate-900 to-blue-900  text-white rounded-lg text-sm font-medium transition-colors">
            Start Quiz
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 items-center p-4 border-b border-gray-100  transition-colors">
        <div className="col-span-4"></div>
        <div className="col-span-3 text-sm text-gray-600">Reading Comprehension</div>
        <div className="col-span-3 text-sm font-medium">2 Sets</div>
        <div className="col-span-2">
          <button className="px-4 py-2 bg-gradient-to-br from-slate-800 via-slate-900 to-blue-900  text-white rounded-lg text-sm font-medium transition-colors">
            Start Quiz
          </button>
        </div>
      </div>

      {/* Data Insight Rows */}
      <div className="grid grid-cols-12 items-center p-4 border-b border-gray-100  transition-colors">
        <div className="col-span-4 flex items-center">
          <div className={`w-10 h-10 rounded-lg bg-[#4cc9f0]/10 flex items-center justify-center mr-3`}>
            <BarChart3 className={`w-5 h-5 text-[#4cc9f0]`} />
          </div>
          <span className="font-medium">Data Insight</span>
        </div>
        <div className="col-span-3 text-sm text-gray-600">Data Sufficiency</div>
        <div className="col-span-3 text-sm font-medium">5 Questions</div>
        <div className="col-span-2">
          <button className="px-4 py-2 bg-gradient-to-br from-slate-800 via-slate-900 to-blue-900  text-white rounded-lg text-sm font-medium transition-colors">
            Start Quiz
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 items-center p-4 border-b border-gray-100  transition-colors">
        <div className="col-span-4"></div>
        <div className="col-span-3 text-sm text-gray-600">Table Analysis</div>
        <div className="col-span-3 text-sm font-medium">2 Questions</div>
        <div className="col-span-2">
          <button className="px-4 py-2 bg-gradient-to-br from-slate-800 via-slate-900 to-blue-900  text-white rounded-lg text-sm font-medium transition-colors">
            Start Quiz
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 items-center p-4 border-b border-gray-100  transition-colors">
        <div className="col-span-4"></div>
        <div className="col-span-3 text-sm text-gray-600">Graph Interpretation</div>
        <div className="col-span-3 text-sm font-medium">2 Questions</div>
        <div className="col-span-2">
          <button className="px-4 py-2 bg-gradient-to-br from-slate-800 via-slate-900 to-blue-900  text-white rounded-lg text-sm font-medium transition-colors">
            Start Quiz
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 items-center p-4 border-b border-gray-100  transition-colors">
        <div className="col-span-4"></div>
        <div className="col-span-3 text-sm text-gray-600">Two-Part Analysis</div>
        <div className="col-span-3 text-sm font-medium">2 Questions</div>
        <div className="col-span-2">
          <button className="px-4 py-2 bg-gradient-to-br from-slate-800 via-slate-900 to-blue-900 text-white rounded-lg text-sm font-medium transition-colors">
            Start Quiz
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 items-center p-4  transition-colors">
        <div className="col-span-4"></div>
        <div className="col-span-3 text-sm text-gray-600">Multi-Source Reasoning</div>
        <div className="col-span-3 text-sm font-medium">2 Sets</div>
        <div className="col-span-2">
          <button className="px-4 py-2 bg-gradient-to-br from-slate-800 via-slate-900 to-blue-900  text-white rounded-lg text-sm font-medium transition-colors">
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  </div>
</section>
</>
  );
}

const GMATFocusFormat = () => {

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };



  const sampleQuestions = [
    {
      section: 'Quantitative',
      type: 'Problem Solving',
      question: 'A company produces widgets at a rate of 150 widgets per hour. If the company operates 8 hours per day for 5 days a week, how many widgets are produced in 4 weeks?',
      options: ['18,000', '20,000', '24,000', '30,000', '32,000'],
      correct: 2,
      explanation: 'Widgets per hour: 150. Hours per day: 8. Days per week: 5. Weeks: 4. Total = 150 × 8 × 5 × 4 = 24,000 widgets.'
    },
    {
      section: 'Verbal',
      type: 'Critical Reasoning',
      question: 'Company X implemented a new employee wellness program last year. Since then, employee sick days have decreased by 25% and productivity has increased by 15%. The company concludes that the wellness program caused these improvements.',
      prompt: 'Which of the following, if true, would most weaken the company\'s conclusion?',
      options: [
        'Other companies with similar programs have seen comparable results',
        'The company also implemented a new performance bonus system last year',
        'Employee satisfaction surveys show increased happiness with workplace benefits',
        'The wellness program cost more than initially budgeted',
        'Some employees have not participated in the wellness program'
      ],
      correct: 1,
      explanation: 'Option B weakens the conclusion by providing an alternative explanation (the bonus system) for the improvements, making it unclear whether the wellness program was the actual cause.'
    },
    {
      section: 'Data Insight',
      type: 'Data Sufficiency',
      question: 'Is the average of five consecutive integers greater than 20?',
      prompt: 'Statement 1: The smallest of the five integers is greater than 18.\nStatement 2: The largest of the five integers is less than 25.',
      options: [
        'Statement 1 alone is sufficient',
        'Statement 2 alone is sufficient', 
        'Both statements together are sufficient',
        'Each statement alone is sufficient',
        'Statements together are not sufficient'
      ],
      correct: 0,
      explanation: 'For five consecutive integers, the average equals the middle number. If the smallest is greater than 18, then the integers are at least 19, 20, 21, 22, 23, making the average at least 21. Statement 1 alone is sufficient.'
    }
  ];



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
     <Navbar/>

      

      {/* Test Structure Flow */}
      <section id="sections" className="py-20 bg-gradient-to-br from-slate-800 via-slate-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-semibold mb-4">GMAT Focus Test Structure</h2>
            <p className="text-lg text-slate-300">Three sections, adaptive testing, total duration: 2 hours 15 minutes</p>
          </div>

          {/* Horizontal Flow */}
          <div className="relative max-w-7xl mx-auto">
            {/* Main Flow Container */}
            <div className="flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-4">
              
              {/* Section 1 - Quantitative */}
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl mb-6 transform hover:scale-105 transition-transform duration-300">
                  <Calculator className="w-16 h-16 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">Quantitative</h3>
                <p className="text-slate-300 mb-2">21 Questions • 45 Minutes</p>
                <p className="text-slate-400 text-sm max-w-48">Mathematical problem-solving and data analysis</p>
              </div>

              {/* Arrow 1 */}
              <div className="hidden lg:flex flex-col items-center">
                <ArrowRight className="w-8 h-8 text-slate-400" />
              </div>

              {/* Optional Break 1 */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-yellow-500/20 backdrop-blur-sm rounded-full border border-yellow-400/30 flex items-center justify-center mb-4">
                  <Clock className="w-8 h-8 text-yellow-300" />
                </div>
                <p className="text-yellow-300 font-medium text-sm text-center">Optional Break<br />10 minutes</p>
              </div>

              {/* Arrow 2 */}
              <div className="hidden lg:flex flex-col items-center">
                <ArrowRight className="w-8 h-8 text-slate-400" />
              </div>

              {/* Section 2 - Verbal */}
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl mb-6 transform hover:scale-105 transition-transform duration-300">
                  <Book className="w-16 h-16 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">Verbal</h3>
                <p className="text-slate-300 mb-2">23 Questions • 45 Minutes</p>
                <p className="text-slate-400 text-sm max-w-48">Reading comprehension and critical reasoning</p>
              </div>

              {/* Arrow 3 */}
              <div className="hidden lg:flex flex-col items-center">
                <ArrowRight className="w-8 h-8 text-slate-400" />
              </div>

              {/* Optional Break 2 */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-yellow-500/20 backdrop-blur-sm rounded-full border border-yellow-400/30 flex items-center justify-center mb-4">
                  <Clock className="w-8 h-8 text-yellow-300" />
                </div>
                <p className="text-yellow-300 font-medium text-sm text-center">Optional Break<br />10 minutes</p>
              </div>

              {/* Arrow 4 */}
              <div className="hidden lg:flex flex-col items-center">
                <ArrowRight className="w-8 h-8 text-slate-400" />
              </div>

              {/* Section 3 - Data Insight */}
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl mb-6 transform hover:scale-105 transition-transform duration-300">
                  <BarChart3 className="w-16 h-16 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">Data Insight</h3>
                <p className="text-slate-300 mb-2">20 Questions • 45 Minutes</p>
                <p className="text-slate-400 text-sm max-w-48">Data analysis and multi-source reasoning</p>
              </div>
            </div>

            {/* Mobile Flow Arrows */}
            <div className="lg:hidden flex flex-col items-center space-y-4 mt-8">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <div className="w-8 h-0.5 bg-slate-400"></div>
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <div className="w-8 h-0.5 bg-slate-400"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Important Note */}
          <div className="text-center mt-16">
            <div className="inline-block px-8 py-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <p className="text-slate-300">
                <span className="text-yellow-300 font-semibold">Important:</span> Only one optional break available during the entire test
              </p>
            </div>
          </div>
        </div>
      </section>
      

      {/* Detailed Sections */}
      <TestSections/>

      {/* Sample Questions Section */}
      

      

      {/* Footer */}
      <Footer/>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:-translate-y-1 z-50 hover:shadow-cyan-500/25"
          aria-label="Back to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default GMATFocusFormat